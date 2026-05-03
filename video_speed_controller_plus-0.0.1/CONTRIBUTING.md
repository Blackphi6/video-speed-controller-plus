# Contributing

**Video Speed Controller Plus** is a derivative of **[Video Speed Controller](https://github.com/igrigorik/videospeed)** (upstream). It is MIT-licensed; contributions are welcome.

Use **[github.com/Blackphi6/video-speed-controller-plus](https://github.com/Blackphi6/video-speed-controller-plus)** for cloning and Plus-specific issues. For bugs that also occur in stock upstream, consider reporting to **[igrigorik/videospeed](https://github.com/igrigorik/videospeed)** first.

**Security:** see [SECURITY.md](../SECURITY.md) in the repository root.

### i18n (locale strings)

User-visible strings for `en` / `ja` / `zh_CN` are generated from **`tools/generate-locales.mjs`**. After editing that file, run:

```sh
cd video_speed_controller_plus-0.0.1
npm run locales
```

Keep **`REPO_HOME_URL`** in that script aligned with **`homepage_url`** in `manifest.json`. After editing either field, run **`npm run verify`** (see below) so CI and local checks stay in sync.

## Get Started

### Prerequisites

1. **Git** — to fork and push changes.
2. **Chromium-based browser** — Chrome, Brave, Edge, etc., with **Developer mode** enabled on `chrome://extensions`.
3. **Node.js 22+** (optional but recommended) — use the repo’s **`.nvmrc`** with [fnm](https://github.com/Schniz/fnm), nvm, or similar. Needed for `tools/generate-locales.mjs`, `tools/verify-repo-integrity.mjs`, and CI parity.

### Contribution Process

1. Sign in to GitHub and open **this Video Speed Controller Plus repository** (your fork or the canonical URL).
2. Fork if needed, then clone locally:

   ```sh
   git clone https://github.com/Blackphi6/video-speed-controller-plus.git
   cd video-speed-controller-plus
   ```

   Extension sources for **Load unpacked** live under **`video_speed_controller_plus-0.0.1/`** (the directory that contains **`manifest.json`**).

3. Create a branch:

   ```sh
   git checkout -b fix/short-description
   ```

4. Make your edits, then **validate locally** (from `video_speed_controller_plus-0.0.1/`):

   ```sh
   npm run verify
   ```

   This checks that **`homepage_url`** and **`REPO_HOME_URL`** match, locale JSON parses, and expected keys exist.

5. **Load unpacked** in the browser: choose the **`video_speed_controller_plus-0.0.1/`** folder (not a `dist/` output — this repo ships the loadable tree directly).

6. Manually exercise the flow you changed (popup, options, playback page).

7. Commit and push, then open a **Pull Request**. Ensure **GitHub Actions CI** is green.

> **Note:** There is no `npm run build` or `dist/` step in this repository; older upstream-style build docs do not apply here.

## Optional

### Pull upstream (original Video Speed Controller) changes

To merge fixes from the original project into your Plus fork, add **upstream**:

`git remote add upstream https://github.com/igrigorik/videospeed.git`

Then fetch and merge or rebase as needed (branch name may be `master` or `main`):

`git fetch upstream && git merge upstream/main`

(Use this when you want bugfixes from **igrigorik/videospeed** in addition to Plus-only work.)
