# Video Speed Controller Plus

**Video Speed Controller Plus** is an unofficial Chromium extension fork of **[Video Speed Controller](https://github.com/igrigorik/videospeed)** (MIT).

Speed up or slow down **HTML5 video and audio** with **keyboard shortcuts** — same core idea as upstream — plus **customizable on-screen controller styling** (colors, transparency, fonts), **themed popup and settings**, and **locales** (`en`, `ja`, `zh_CN`).  
This repo is **not** the [original Chrome Web Store listing](https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk); publish separately if you ship your own build.

**Source code & issues (Video Speed Controller Plus):** [github.com/Blackphi6/video-speed-controller-plus](https://github.com/Blackphi6/video-speed-controller-plus)

**Japanese:** [README.ja.md](./README.ja.md)

## Highlights vs upstream focus here

- **Controller appearance** — Style speed text vs. bar separately; opacity, sizes, fonts, optional hex colors.
- **Popup / options UI** — Accent color and light / dark / system theme alignment where applicable.
- **i18n** — Built via Chrome `_locales` and `chrome.i18n`.

See [upstream README](https://github.com/igrigorik/videospeed#readme) for shortcuts, per-site rules, custom CSS philosophy, and research notes.

## Assets

Icons live under `assets/icons/` (`icon16.png`, …). Replace files in place; if you rename sizes or filenames, update `manifest.json` accordingly.

## Install (unpacked)

1. Clone this repository and open **`video_speed_controller_plus-0.0.1/`** (the directory whose root contains **`manifest.json`**).
2. Open `chrome://extensions` → enable **Developer mode** → **Load unpacked** → select that folder.

## Contributing & issues

Use the **[Plus repository](https://github.com/Blackphi6/video-speed-controller-plus)** for issues and pull requests about this fork. Bugs that also reproduce on stock **[upstream videospeed](https://github.com/igrigorik/videospeed)** may fit better there first.

## License

MIT — see [`LICENSE`](./LICENSE). Original © Ilya Grigorik; changes in this repository are distributed under the same license.
