# Video Speed Controller Plus

**Video Speed Controller Plus** is an unofficial Chromium extension fork of **[Video Speed Controller](https://github.com/igrigorik/videospeed)** (MIT).

Speed up or slow down **HTML5 video and audio** with **keyboard shortcuts** — same core idea as upstream — plus **customizable on-screen controller styling** (colors, transparency, fonts), **themed popup and settings**, and **locales** (`en`, `ja`, `zh_CN`).  
This repo is **not** the [original Chrome Web Store listing](https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk); publish separately if you ship your own build.

## Highlights vs upstream focus here

- **Controller appearance** — Style speed text vs. bar separately; opacity, sizes, fonts, optional hex colors.
- **Popup / options UI** — Accent color and light / dark / system theme alignment where applicable.
- **i18n** — Built via Chrome `_locales` and `chrome.i18n`.

See [upstream README](https://github.com/igrigorik/videospeed#readme) for shortcuts, per-site rules, custom CSS philosophy, and research notes.

### Japanese（概要）

[Video Speed Controller（upstream）](https://github.com/igrigorik/videospeed) をベースに、**画面上コントローラーの見た目**や **設定 UI**、**多言語（日本語など）** を強化した非公式の派生です。ライセンスは MIT で、`LICENSE` の著作権表示を維持しています。

## Assets

Icons live under `assets/icons/` (`icon16.png`, …). Replace files in place; if you rename sizes or filenames, update `manifest.json` accordingly.

## Install (unpacked)

1. Clone this repository (use folder **`…/0.10.2_0`** if your layout nests the unpacked extension — pick the directory whose root contains **`manifest.json`**).
2. Open `chrome://extensions` → **Developer mode** → **Load unpacked** → select that folder.

## Contributing & issues

Issues and PRs are welcome for **Plus**-specific behavior. Bugs that also occur on **[upstream videospeed](https://github.com/igrigorik/videospeed)** may fit better there.

## License

MIT — see [`LICENSE`](./LICENSE). Original © Ilya Grigorik; changes in this repo are under the same license.
