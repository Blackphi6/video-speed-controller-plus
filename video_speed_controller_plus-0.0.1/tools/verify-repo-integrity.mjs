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

for (const rel of [
  'background.js',
  'content-bridge.js',
  'inject.js',
  'ui/popup/popup.js',
  'ui/i18n.js',
]) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) fail(`missing ${rel}`);
}

console.log('verify-repo-integrity: OK');
