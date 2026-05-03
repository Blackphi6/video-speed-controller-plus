/**
 * CI / pre-push checks: manifest vs locale generator, JSON locales, core paths.
 * Run from extension root: node tools/verify-repo-integrity.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fail(msg) {
  console.error(`verify-repo-integrity – ${msg}`);
  process.exit(1);
}

/** Every path manifest references must exist under extension root. */
function collectManifestFilePaths(manifest) {
  const paths = new Set();
  const add = (p) => {
    if (typeof p === 'string' && p.trim()) paths.add(p.trim());
  };
  if (manifest.action?.default_popup) add(manifest.action.default_popup);
  if (manifest.action?.default_icon) {
    for (const p of Object.values(manifest.action.default_icon)) add(p);
  }
  if (manifest.background?.service_worker) add(manifest.background.service_worker);
  if (manifest.options_ui?.page) add(manifest.options_ui.page);
  if (manifest.icons) {
    for (const p of Object.values(manifest.icons)) add(p);
  }
  if (Array.isArray(manifest.content_scripts)) {
    for (const cs of manifest.content_scripts) {
      if (Array.isArray(cs.js)) for (const p of cs.js) add(p);
      if (Array.isArray(cs.css)) for (const p of cs.css) add(p);
    }
  }
  return [...paths];
}

/** Resolve script/link/img references in bundled HTML (relative to that HTML file). */
function verifyBundledHtmlAssets(htmlRel) {
  const htmlPath = path.join(root, htmlRel);
  if (!fs.existsSync(htmlPath)) fail(`missing ${htmlRel}`);
  const dir = path.dirname(htmlPath);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const patterns = [
    /<script[^>]*\ssrc="([^"]+)"/gi,
    /<link[^>]*\shref="([^"]+)"/gi,
    /<img[^>]*\ssrc="([^"]+)"/gi,
  ];
  for (const re of patterns) {
    let m;
    while ((m = re.exec(html))) {
      const raw = m[1];
      if (raw.startsWith('data:') || raw.startsWith('chrome-extension:')) continue;
      const resolved = path.normalize(path.join(dir, decodeURI(raw)));
      const relFromRoot = path.relative(root, resolved);
      if (relFromRoot.startsWith('..') || path.isAbsolute(relFromRoot)) {
        fail(`${htmlRel}: asset escapes extension root: "${raw}"`);
      }
      if (!fs.existsSync(resolved)) {
        fail(`${htmlRel}: missing asset "${raw}" (${relFromRoot})`);
      }
    }
  }
}

const manifestPath = path.join(root, 'manifest.json');
if (!fs.existsSync(manifestPath)) fail('missing manifest.json');

const manifest = readJson(manifestPath);
if (manifest.manifest_version !== 3) fail('manifest_version must be 3');
if (!manifest.homepage_url) fail('manifest.json must set homepage_url');
const home = String(manifest.homepage_url).replace(/\/$/, '');
if (!/^https:\/\/github\.com\/[^/]+\/[^/]+/i.test(home)) {
  fail('homepage_url must look like https://github.com/org/repo');
}

const genPath = path.join(root, 'tools', 'generate-locales.mjs');
if (!fs.existsSync(genPath)) fail('missing tools/generate-locales.mjs');
const genSrc = fs.readFileSync(genPath, 'utf8');
const genMatch = genSrc.match(/const REPO_HOME_URL = '([^']+)'/);
if (!genMatch) fail('tools/generate-locales.mjs: missing const REPO_HOME_URL');
const repoConst = genMatch[1].replace(/\/$/, '');
if (repoConst !== home) {
  fail(
    `homepage_url (${manifest.homepage_url}) must equal REPO_HOME_URL (${genMatch[1]}) in generate-locales.mjs`,
  );
}

const expectedLocales = ['en', 'ja', 'zh_CN'];
if (manifest.default_locale && !expectedLocales.includes(manifest.default_locale)) {
  fail(`unexpected default_locale "${manifest.default_locale}"`);
}
for (const loc of expectedLocales) {
  const p = path.join(root, '_locales', loc, 'messages.json');
  if (!fs.existsSync(p)) fail(`missing ${path.relative(root, p)}`);
  const data = readJson(p);
  for (const key of ['popup_repo_link', 'popup_repo_link_title', 'faq_toc_source', 'faq_block_source']) {
    if (!data[key]) fail(`_locales/${loc}/messages.json: missing key "${key}"`);
  }
}

const popupHtmlPath = path.join(root, 'ui', 'popup', 'popup.html');
const popupHtml = fs.readFileSync(popupHtmlPath, 'utf8');
if (!popupHtml.includes(repoConst)) {
  fail('ui/popup/popup.html: fallback repo href should match REPO_HOME_URL');
}

const optionsJsPath = path.join(root, 'ui', 'options', 'options.js');
const optionsJs = fs.readFileSync(optionsJsPath, 'utf8');
if (!optionsJs.includes('chrome.runtime.getManifest().homepage_url')) {
  fail('ui/options/options.js should use getManifest().homepage_url for About/Feedback');
}
if (!optionsJs.includes(repoConst)) {
  fail('ui/options/options.js should include the same fallback URL as REPO_HOME_URL');
}

for (const rel of collectManifestFilePaths(manifest)) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    fail(`manifest references missing file: "${rel}"`);
  }
}

for (const htmlRel of ['ui/popup/popup.html', 'ui/options/options.html']) {
  verifyBundledHtmlAssets(htmlRel);
}

console.log('verify-repo-integrity: OK');
