# Video Speed Controller Plus（日本語）

**[English README →](./README.md)**

## 概要

本プロジェクトは [Video Speed Controller（upstream）](https://github.com/igrigorik/videospeed) をベースにした **非公式の Chromium 拡張機能**です。MIT ライセンスのため、著作権表示とライセンス条項を維持したうえで派生・公開できます（[`LICENSE`](./LICENSE)）。

**HTML5 の動画・音声**の再生速度を **キーボードショートカット** で変更できる点は upstream と同様です。加えて **画面上コントローラーの見た目**（色・透明度・フォントなど）、**ポップアップ／設定画面のテーマ**、**多言語表示**（`en` / `ja` / `zh_CN`）を強化しています。

本リポジトリは [Chrome Web Store のオリジナル一覧](https://chromewebstore.google.com/detail/video-speed-controller/nffaoalbilbmmfgbnbgppjihopabppdk) そのものではありません。別途ビルドを配布する場合はそちらで公開してください。

**ソースコード・Issue（本フォーク）:** [github.com/Blackphi6/video-speed-controller-plus](https://github.com/Blackphi6/video-speed-controller-plus)

## Plus で強調している点

- **コントローラーの外観** — 速度表示とバーを別スタイルにできるほか、不透明度・サイズ・フォント・任意の色指定など。
- **ポップアップ／設定 UI** — アクセント色とライト／ダーク／システム設定との整合。
- **i18n** — Chrome の `_locales` と `chrome.i18n` を利用。

ショートカット、サイト別ルール、カスタム CSS の思想などは [upstream README](https://github.com/igrigorik/videospeed#readme) を参照してください。

## アセット

アイコンは `assets/icons/`（`icon16.png` など）。ファイル名やサイズキーを変える場合は [`manifest.json`](./manifest.json) も合わせて更新してください。

## インストール（開発者／パッケージ化なし）

1. リポジトリをクローンし、**`manifest.json` があるフォルダ**（この構成では **`video_speed_controller_plus-0.0.1/`**）を開く。
2. `chrome://extensions` → **デベロッパーモード** → **パッケージ化されていない拡張機能を読み込む** で、そのフォルダを指定する。

## コントリビューション・Issue

**Plus（本フォーク）**の Issue／PR は [Blackphi6/video-speed-controller-plus](https://github.com/Blackphi6/video-speed-controller-plus) でお願いします。ストック版と同じ手順で再現する不具合は [igrigorik/videospeed](https://github.com/igrigorik/videospeed) 向きの場合があります。

## ライセンス

MIT — [`LICENSE`](./LICENSE)。オリジナル © Ilya Grigorik。本リポジトリの変更も同ライセンスです。
