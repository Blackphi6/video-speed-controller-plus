/**
 * One-off helper to emit _locales locale folders and messages.json (UTF-8).
 * Run: node tools/generate-locales.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function msg(message, placeholders) {
  const o = { message };
  if (placeholders) o.placeholders = placeholders;
  return o;
}

/** Shown in chrome://extensions and toolbar (distinct from upstream store listing). */
const EXT_DISPLAY_NAME = 'Video Speed Controller Plus';

const en = {
  ext_name: msg(EXT_DISPLAY_NAME),
  ext_description: msg(
    'Fork of Video Speed Controller: keyboard shortcuts for HTML5 video/audio speed, plus customizable on-screen controller styling, themed popup/options, and locales (en, ja, zh_CN).',
  ),
  options_page_title: msg(`${EXT_DISPLAY_NAME}: Options`),
  popup_page_title: msg(EXT_DISPLAY_NAME),
  tab_settings: msg('Settings'),
  tab_advanced: msg('Advanced'),
  tab_faq: msg('FAQ'),
  btn_save: msg('Save'),
  btn_import: msg('Import'),
  btn_export: msg('Export'),
  btn_restore: msg('Reset'),
  btn_default: msg('Default'),
  btn_reset: msg('Reset'),
  aria_more_actions: msg('More actions'),
  shortcuts_heading: msg('Shortcuts'),
  preferences_heading: msg('Preferences'),
  add_new: msg('Add New'),
  prefs_audio_label: msg(
    'Audio support<br /><em>Show speed controls on audio elements.</em>',
  ),
  prefs_remember_label: msg(
    'Remember playback speed<br /><em>Store and auto-apply the last used speed to all new videos.</em>',
  ),
  prefs_start_hidden_label: msg(
    'Hide controller by default<br /><em>Controller stays hidden until toggled via shortcut.</em>',
  ),
  prefs_exclusive_label: msg(
    'Exclusive keyboard shortcuts<br /><em>When possible, prevent websites from also handling VSC shortcut keys.</em>',
  ),
  appearance_heading: msg('Appearance'),
  appearance_color_scheme_label: msg(
    'Color theme<br /><em>Use system setting, force light UI, or force dark UI.</em>',
  ),
  appearance_accent_label: msg(
    'Accent color<br /><em>Applied to popup, options, highlights, and focus rings.</em>',
  ),
  theme_system: msg('Match system'),
  theme_light: msg('Light'),
  theme_dark: msg('Dark'),
  accent_violet: msg('Violet'),
  accent_blue: msg('Blue'),
  accent_teal: msg('Teal'),
  accent_green: msg('Green'),
  accent_rose: msg('Rose'),
  accent_amber: msg('Amber'),
  controller_opacity_label: msg(
    'Controller opacity<br /><em>0 = fully transparent, 1 = fully opaque. Default: 0.3</em>',
  ),
  controller_button_size_label: msg(
    'Controller button size<br /><em>Font size in pixels for the speed display and buttons. Default: 14</em>',
  ),
  slider_transparent: msg('Transparent'),
  slider_opaque: msg('Opaque'),
  aria_controller_opacity: msg('Controller opacity'),
  aria_controller_button_size: msg('Controller button size in pixels'),
  preview_heading_label: msg(
    'Approximate preview<br /><em>Rough mock on a checker pattern (transparency). Updates live from the sliders above; empty saved values use defaults (0.3 / 14px).</em>',
  ),
  speed_text_color_label: msg(
    'Speed indicator text color<br /><em>Color of the playback-rate number on the in-page controller. Hex or CSS color; leave empty for default white. Use the spectrum for quick hex picks.</em>',
  ),
  panel_bg_label: msg(
    'Controller background<br /><em>Background color for the whole on-page control bar: the speed number and the control buttons (rewind, slower / faster, advance). The speed area is transparent so this color shows through behind the digits. Empty = default black. Use the text field or spectrum for hex.</em>',
  ),
  spectrum_title: msg('Color spectrum'),
  aria_spectrum_speed_text: msg('Spectrum for speed text color'),
  aria_spectrum_panel_bg: msg('Spectrum for controller background'),
  controller_font_label: msg(
    'Controller font family<br /><em>Font stack for the whole on-page controller (speed + buttons). Pick a preset below (Aa preview) or type a custom comma-separated stack. Use font family names as installed on your PC; the browser picks the first available face. Leave empty for the built-in defaults.</em>',
  ),
  placeholder_font_stack: msg('Inter, system-ui, sans-serif'),
  aria_font_presets: msg('Font presets'),
  font_tuning_title: msg('Font weight and width'),
  font_tuning_desc: msg(
    'Sliders apply to the whole controller in the page. Uses CSS <code>font-weight</code> (100 - 900) and <code>font-stretch</code> as a percentage (50% - 200%). Leave defaults (Reset) to keep the extension&apos;s built-in look. Imported settings may still use keywords (e.g. bold); those show a note until you move the weight slider.',
  ),
  font_weight_block: msg('Weight'),
  font_width_block: msg('Width'),
  slider_light: msg('Light'),
  slider_bold: msg('Bold'),
  slider_condensed: msg('Condensed'),
  slider_wide: msg('Wide'),
  aria_font_weight: msg('Font weight'),
  aria_font_width: msg('Font width stretch percent'),
  meter_weight_title: msg('Stroke weight from light (top) to bold (bottom)'),
  meter_width_title: msg('Width from condensed (top) to expanded (bottom)'),
  log_level_label: msg(
    'Console Log Level<br /><em>Set verbosity in the browser console</em>',
  ),
  log_none: msg('None'),
  log_error: msg('Error'),
  log_warning: msg('Warning'),
  log_info: msg('Info'),
  log_debug: msg('Debug'),
  log_verbose: msg('Verbose'),
  site_rules_label: msg(
    'Site rules<br /><em>Per-site overrides. Use a domain or <a href="https://www.regexpal.com/">regex</a> (e.g. <code>/\\.edu$/i</code>). Check &quot;Disable&quot; to turn off the extension on that site. Set a speed to override the default.</em>',
  ),
  site_rules_col_pattern: msg('Pattern'),
  site_rules_col_disable: msg('Disable'),
  site_rules_col_speed: msg('Speed'),
  add_site_rule: msg('Add Site Rule'),
  custom_css_label: msg(
    'Custom CSS<br /><em>Additional rules injected alongside the built-in defaults. Use to override positioning or add site-specific tweaks.</em>',
  ),
  custom_css_placeholder: msg(`/* Global override */
vsc-controller { top: 50px !important; }

/* Domain-specific */
:root[style*='--vsc-domain: &quot;example.com&quot;'] vsc-controller {
  display: none !important;
}`),
  about_btn: msg(`About ${EXT_DISPLAY_NAME}`),
  feedback_btn: msg('Send Feedback'),
  shortcut_slower: msg('Decrease speed'),
  shortcut_faster: msg('Increase speed'),
  shortcut_rewind: msg('Rewind'),
  shortcut_advance: msg('Advance'),
  shortcut_reset: msg('Reset speed'),
  shortcut_fast: msg('Preferred speed'),
  shortcut_muted: msg('Mute'),
  shortcut_softer: msg('Decrease volume'),
  shortcut_louder: msg('Increase volume'),
  shortcut_pause: msg('Pause'),
  shortcut_mark: msg('Set marker'),
  shortcut_jump: msg('Jump to marker'),
  shortcut_display: msg('Show/hide controller'),
  ph_press_key: msg('press a key'),
  ph_value_numeric: msg('value (0.10)'),
  ph_site_pattern: msg('youtube.com or /regex/'),
  ph_speed_global: msg('(global)'),
  preset_title_builtin: msg('Built-in fonts (leave custom field empty)'),
  warn_altgr: msg(
    'This combination may conflict with AltGr input on some keyboard layouts.',
  ),
  warn_meta: msg(
    'Some Cmd/Meta combinations are intercepted by the OS and may not work.',
  ),
  err_regex_invalid: msg('Error: Invalid site rule regex: "$1". Unable to save.'),
  err_speed_range: msg(
    'Error: Speed for "$1" must be between $2 and $3.',
  ),
  err_css_syntax: msg(
    'Error: Controller CSS has syntax errors. Fix them before saving.',
  ),
  err_css_size: msg(
    'Error: Controller CSS exceeds 8KB storage limit ($1KB). Reduce CSS size.',
  ),
  err_save_storage: msg('Error: failed to save options to storage'),
  err_save_generic: msg('Error saving options: $1'),
  err_load_options: msg('Error loading options: $1'),
  err_export: msg('Error exporting settings: $1'),
  err_import: msg('Import failed: $1'),
  err_restore: msg('Error restoring defaults: $1'),
  status_restoring: msg('Restoring defaults...'),
  status_restored: msg('Default options restored'),
  status_exported: msg('Settings exported'),
  status_imported: msg('Settings imported successfully'),
  css_no_rules: msg('No CSS rules parsed — check for syntax errors.'),
  css_syntax_err: msg('Syntax error: $1'),
  css_rules_warn: msg('$1 rule(s) parsed, $2 dropped: $3'),
  popup_toggle_disable: msg('Disable extension'),
  popup_toggle_enable: msg('Enable extension'),
  popup_settings: msg('Settings'),
  popup_status_enabled: msg('Enabled. Reload page.'),
  popup_status_disabled: msg('Disabled. Reload page.'),
  appearance_meta_opacity_default: msg(
    'opacity $1 (default 0.3 until saved)',
  ),
  appearance_meta_opacity_saved: msg('opacity $1'),
  appearance_meta_size_default: msg('$1px text (default 14 until saved)'),
  appearance_meta_size_saved: msg('$1px text'),
  font_cap_weight_live_default: msg(
    'Live preview $1 — built-in default until you move & Save',
  ),
  font_cap_weight_stored: msg('Stored font-weight: $1'),
  font_cap_weight_keyword: msg('Custom weight keyword saved (slider preview $1)'),
  font_cap_stretch_live_default: msg(
    'Live preview $1% — built-in default until you move & Save',
  ),
  font_cap_stretch_stored: msg('Stored font-stretch: $1%'),
  font_cap_stretch_keyword: msg('Saved keyword stretch — slider preview $1%'),
  font_hint_saved: msg(' (saved: $1)'),
  remove_row_aria: msg('Remove row'),
};

const ja = {
  ...en,
  ext_name: msg(EXT_DISPLAY_NAME),
  ext_description: msg(
    'Video Speed Controller をベースにした派生版です。ショートカットで HTML5 の音声／動画の速度変更・早送り／巻き戻しに加え、コントローラーの文字色・背景・フォント・不透明度・UI テーマ・多言語表示などを調整できます。',
  ),
  options_page_title: msg(`${EXT_DISPLAY_NAME}: 設定`),
  popup_page_title: msg(EXT_DISPLAY_NAME),
  tab_settings: msg('設定'),
  tab_advanced: msg('詳細'),
  tab_faq: msg('ヘルプ'),
  btn_save: msg('保存'),
  btn_import: msg('読み込み'),
  btn_export: msg('書き出し'),
  btn_restore: msg('初期化'),
  btn_default: msg('既定'),
  btn_reset: msg('リセット'),
  aria_more_actions: msg('その他の操作'),
  shortcuts_heading: msg('ショートカット'),
  preferences_heading: msg('環境設定'),
  add_new: msg('追加'),
  prefs_audio_label: msg(
    '音声に対応<br /><em>音声要素にも速度コントローラーを表示します。</em>',
  ),
  prefs_remember_label: msg(
    '再生速度を記憶<br /><em>最後に使った速度を保存し、新しい動画に自動適用します。</em>',
  ),
  prefs_start_hidden_label: msg(
    '既定でコントローラーを非表示<br /><em>ショートカットで表示するまで非表示のままにします。</em>',
  ),
  prefs_exclusive_label: msg(
    'キーを強制的に取る<br /><em>可能な場合、サイト側が同じキーを処理しないようにします。</em>',
  ),
  appearance_heading: msg('外観'),
  appearance_color_scheme_label: msg(
    '配色テーマ<br /><em>システム設定に合わせる／ライト固定／ダーク固定。</em>',
  ),
  appearance_accent_label: msg(
    'アクセント色<br /><em>ポップアップ・設定・ハイライト・フォーカスリングに適用されます。</em>',
  ),
  theme_system: msg('システムに合わせる'),
  theme_light: msg('ライト'),
  theme_dark: msg('ダーク'),
  accent_violet: msg('バイオレット'),
  accent_blue: msg('ブルー'),
  accent_teal: msg('ティール'),
  accent_green: msg('グリーン'),
  accent_rose: msg('ローズ'),
  accent_amber: msg('アンバー'),
  controller_opacity_label: msg(
    'コントローラーの不透明度<br /><em>0＝完全な透明、1＝不透明。既定: 0.3</em>',
  ),
  controller_button_size_label: msg(
    'ボタン／文字サイズ<br /><em>速度表示とボタンのフォントサイズ（px）。既定: 14</em>',
  ),
  slider_transparent: msg('透明'),
  slider_opaque: msg('不透明'),
  aria_controller_opacity: msg('コントローラーの不透明度'),
  aria_controller_button_size: msg('コントローラーのボタンサイズ（ピクセル）'),
  preview_heading_label: msg(
    'おおよそのプレビュー<br /><em>チェック背景上の簡易表示です。上のスライダーに連動します。未保存の空値は既定（0.3／14px）を使います。</em>',
  ),
  speed_text_color_label: msg(
    '速度表示の文字色<br /><em>ページ内コントローラーの再生速度数字の色です。16進または CSS 色。空欄で既定の白。スペクトラムで簡単に選べます。</em>',
  ),
  panel_bg_label: msg(
    'コントローラーの背景<br /><em>バー全体（速度数字と巻き戻し・低速／高速・進むなど）の背景色です。速度エリアは透明のため、この色が数字の下に見えます。空欄で既定の黒。テキストまたはスペクトラムで指定。</em>',
  ),
  spectrum_title: msg('色スペクトラム'),
  aria_spectrum_speed_text: msg('速度文字色のスペクトラム'),
  aria_spectrum_panel_bg: msg('コントローラー背景のスペクトラム'),
  controller_font_label: msg(
    'コントローラーのフォント<br /><em>ページ内コントローラー全体（速度＋ボタン）のフォントスタックです。下のプリセット（Aa）を選ぶか、カスタムをカンマ区切りで入力。PC に入っているファミリー名を順に試します。空欄で拡張機能の既定。</em>',
  ),
  placeholder_font_stack: msg('Inter, system-ui, sans-serif'),
  aria_font_presets: msg('フォントのプリセット'),
  font_tuning_title: msg('フォントの太さと幅'),
  font_tuning_desc: msg(
    'スライダーはページ内コントローラー全体に適用されます。<code>font-weight</code>（100〜900）と <code>font-stretch</code>（50%〜200%）です。既定（リセット）のままなら拡張機能の組み込み見た目を維持します。インポートでキーワード（例: bold）が残っている場合は、太さスライダーを動かすまで注意メモが出ます。',
  ),
  font_weight_block: msg('太さ'),
  font_width_block: msg('幅'),
  slider_light: msg('細い'),
  slider_bold: msg('太い'),
  slider_condensed: msg('狭い'),
  slider_wide: msg('広い'),
  aria_font_weight: msg('フォントの太さ'),
  aria_font_width: msg('フォントの幅（ストレッチ％）'),
  meter_weight_title: msg('上から下へ細い→太いストローク'),
  meter_width_title: msg('上から下へ狭い→広いストローク'),
  log_level_label: msg(
    'コンソールのログレベル<br /><em>ブラウザーの開発者コンソールでの詳しさ</em>',
  ),
  log_none: msg('なし'),
  log_error: msg('エラー'),
  log_warning: msg('警告'),
  log_info: msg('情報'),
  log_debug: msg('デバッグ'),
  log_verbose: msg('詳細'),
  site_rules_label: msg(
    'サイト別ルール<br /><em>サイトごとの上書き。ドメインか <a href="https://www.regexpal.com/">正規表現</a>（例: <code>/\\.edu$/i</code>）。「無効」をオンにするとそのサイトでは拡張をオフ。速度を指定すると既定を上書き。</em>',
  ),
  site_rules_col_pattern: msg('パターン'),
  site_rules_col_disable: msg('無効'),
  site_rules_col_speed: msg('速度'),
  add_site_rule: msg('サイトルールを追加'),
  custom_css_label: msg(
    'カスタム CSS<br /><em>組み込みスタイルに追加で注入されます。位置調整やサイト固有の調整に。</em>',
  ),
  custom_css_placeholder: msg(en.custom_css_placeholder.message),
  about_btn: msg(`${EXT_DISPLAY_NAME} について`),
  feedback_btn: msg('フィードバックを送る'),
  shortcut_slower: msg('速度を下げる'),
  shortcut_faster: msg('速度を上げる'),
  shortcut_rewind: msg('巻き戻し'),
  shortcut_advance: msg('早送り'),
  shortcut_reset: msg('速度リセット'),
  shortcut_fast: msg('お気に入り速度'),
  shortcut_muted: msg('ミュート'),
  shortcut_softer: msg('音量を下げる'),
  shortcut_louder: msg('音量を上げる'),
  shortcut_pause: msg('一時停止'),
  shortcut_mark: msg('マーカー設定'),
  shortcut_jump: msg('マーカーへジャンプ'),
  shortcut_display: msg('コントローラー表示の切替'),
  ph_press_key: msg('キーを押す'),
  ph_value_numeric: msg('値（0.10）'),
  ph_site_pattern: msg('youtube.com または /regex/'),
  ph_speed_global: msg('（グローバル）'),
  preset_title_builtin: msg('組み込みフォント（カスタム欄は空のまま）'),
  warn_altgr: msg(
    '一部のキーボードでは AltGr 入力と競合する場合があります。',
  ),
  warn_meta: msg(
    '一部の Cmd/Meta の組み合わせは OS に取られることがあります。',
  ),
  err_regex_invalid: msg('エラー: サイトルールの正規表現が無効です: 「$1」。保存できません。'),
  err_speed_range: msg('エラー: 「$1」の速度は $2 〜 $3 の範囲にしてください。'),
  err_css_syntax: msg(
    'エラー: コントローラー CSS に構文エラーがあります。修正してから保存してください。',
  ),
  err_css_size: msg(
    'エラー: コントローラー CSS が 8KB の保存上限を超えています（$1KB）。サイズを減らしてください。',
  ),
  err_save_storage: msg('エラー: ストレージへの保存に失敗しました'),
  err_save_generic: msg('オプション保存エラー: $1'),
  err_load_options: msg('オプション読み込みエラー: $1'),
  err_export: msg('書き出しエラー: $1'),
  err_import: msg('読み込みに失敗: $1'),
  err_restore: msg('初期化エラー: $1'),
  status_restoring: msg('初期状態に戻しています…'),
  status_restored: msg('既定に戻しました'),
  status_exported: msg('設定を書き出しました'),
  status_imported: msg('設定を読み込みました'),
  css_no_rules: msg('CSS ルールが解析されませんでした。構文を確認してください。'),
  css_syntax_err: msg('構文エラー: $1'),
  css_rules_warn: msg('$1 件のルールを解析、$2 件を破棄: $3'),
  popup_toggle_disable: msg('拡張機能を無効にする'),
  popup_toggle_enable: msg('拡張機能を有効にする'),
  popup_settings: msg('設定'),
  popup_status_enabled: msg('有効にしました。ページを再読み込みしてください。'),
  popup_status_disabled: msg('無効にしました。ページを再読み込みしてください。'),
  appearance_meta_opacity_default: msg('不透明度 $1（保存まで既定 0.3）'),
  appearance_meta_opacity_saved: msg('不透明度 $1'),
  appearance_meta_size_default: msg('文字 $1px（保存まで既定 14）'),
  appearance_meta_size_saved: msg('文字 $1px'),
  font_cap_weight_live_default: msg(
    'ライブプレビュー $1 — スライダーを動かして保存するまで組み込み既定',
  ),
  font_cap_weight_stored: msg('保存済み font-weight: $1'),
  font_cap_weight_keyword: msg('キーワードの太さを保存中（スライダープレビュー $1）'),
  font_cap_stretch_live_default: msg(
    'ライブプレビュー $1% — スライダーを動かして保存するまで組み込み既定',
  ),
  font_cap_stretch_stored: msg('保存済み font-stretch: $1%'),
  font_cap_stretch_keyword: msg(
    'キーワードの幅を保存中 — スライダープレビュー $1%',
  ),
  font_hint_saved: msg(' （保存値: $1）'),
  remove_row_aria: msg('行を削除'),
};

Object.assign(en, {
  font_preset_default: msg('Default'),
  font_preset_gothic: msg('Gothic / Sans'),
  font_preset_mincho: msg('Mincho / Serif'),
  font_preset_system: msg('System UI'),
  font_preset_mono: msg('Monospace'),
  font_preset_latin_sans: msg('Latin / UI sans'),
});
Object.assign(ja, {
  font_preset_default: msg('既定'),
  font_preset_gothic: msg('ゴシック'),
  font_preset_mincho: msg('明朝'),
  font_preset_system: msg('システム'),
  font_preset_mono: msg('等幅'),
  font_preset_latin_sans: msg('欧文サンセリフ'),
});

const zhCN = {
  ...en,
  ext_description: msg(
    '基于 Video Speed Controller 理念：使用快捷键控制 HTML5 音视频速度；Plus 额外支持控制器文字/背景配色、字体、透明度、界面主题与多语言。',
  ),
  options_page_title: msg(`${EXT_DISPLAY_NAME}：选项`),
  popup_page_title: msg(EXT_DISPLAY_NAME),
  tab_settings: msg('设置'),
  tab_advanced: msg('高级'),
  tab_faq: msg('常见问题'),
  btn_save: msg('保存'),
  btn_import: msg('导入'),
  btn_export: msg('导出'),
  btn_reset: msg('重置'),
  btn_restore: msg('恢复默认'),
  btn_default: msg('默认'),
  aria_more_actions: msg('更多操作'),
  shortcuts_heading: msg('快捷键'),
  preferences_heading: msg('偏好设置'),
  add_new: msg('新增'),
  prefs_audio_label: msg(
    '支持音频<br /><em>在音频元素上显示速度控件。</em>',
  ),
  prefs_remember_label: msg(
    '记住播放速度<br /><em>保存上次使用的速度并自动应用到新视频。</em>',
  ),
  prefs_start_hidden_label: msg(
    '默认隐藏控制器<br /><em>在使用快捷键切换前保持隐藏。</em>',
  ),
  prefs_exclusive_label: msg(
    '独占键盘快捷键<br /><em>在可能的情况下阻止网站同时处理 VSC 快捷键。</em>',
  ),
  appearance_heading: msg('外观'),
  appearance_color_scheme_label: msg(
    '配色主题<br /><em>跟随系统、强制浅色或强制深色界面。</em>',
  ),
  appearance_accent_label: msg(
    '强调色<br /><em>应用于弹出窗口、选项页、高亮与焦点环。</em>',
  ),
  theme_system: msg('跟随系统'),
  theme_light: msg('浅色'),
  theme_dark: msg('深色'),
  accent_violet: msg('紫'),
  accent_blue: msg('蓝'),
  accent_teal: msg('青绿'),
  accent_green: msg('绿'),
  accent_rose: msg('玫瑰'),
  accent_amber: msg('琥珀'),
  controller_opacity_label: msg(
    '控制器不透明度<br /><em>0 = 完全透明，1 = 不透明。默认：0.3</em>',
  ),
  controller_button_size_label: msg(
    '控制器按钮大小<br /><em>速度与按钮的字体像素大小。默认：14</em>',
  ),
  slider_transparent: msg('透明'),
  slider_opaque: msg('不透明'),
  aria_controller_opacity: msg('控制器不透明度'),
  aria_controller_button_size: msg('控制器按钮大小（像素）'),
  preview_heading_label: msg(
    '大致预览<br /><em>在棋盘背景上的示意（透明度）。随上方滑块实时更新；未保存的空值使用默认（0.3 / 14px）。</em>',
  ),
  speed_text_color_label: msg(
    '速度数字颜色<br /><em>页内控制器上播放速率数字的颜色。十六进制或 CSS 颜色；留空为默认白色。可用色谱快速选取。</em>',
  ),
  panel_bg_label: msg(
    '控制器背景<br /><em>整条控制栏（速度数字与控制按钮）的背景色。速度区域透明，因此该颜色显示在数字后方。留空为默认黑色。可用文本或色谱填写 hex。</em>',
  ),
  spectrum_title: msg('色谱'),
  aria_spectrum_speed_text: msg('速度文字色谱'),
  aria_spectrum_panel_bg: msg('控制器背景色谱'),
  controller_font_label: msg(
    '控制器字体族<br /><em>页内控制器整体（速度 + 按钮）的字体栈。在下方选择预设（Aa 预览）或输入自定义逗号分隔列表。按本机已安装字体名依次回退。留空使用内置默认。</em>',
  ),
  aria_font_presets: msg('字体预设'),
  font_tuning_title: msg('字重与宽度'),
  font_tuning_desc: msg(
    '滑块作用于页面中的整个控制器。使用 CSS <code>font-weight</code>（100–900）与 <code>font-stretch</code> 百分比（50%–200%）。保持默认（重置）可保留扩展内置外观。导入的设置若仍为关键字（如 bold），移动字重滑块前会显示提示。',
  ),
  font_weight_block: msg('字重'),
  font_width_block: msg('宽度'),
  slider_light: msg('细'),
  slider_bold: msg('粗'),
  slider_condensed: msg('窄'),
  slider_wide: msg('宽'),
  aria_font_weight: msg('字重'),
  aria_font_width: msg('字体拉伸百分比'),
  meter_weight_title: msg('笔画由细（上）到粗（下）'),
  meter_width_title: msg('宽度由窄（上）到宽（下）'),
  log_level_label: msg(
    '控制台日志级别<br /><em>在浏览器控制台中的详细程度</em>',
  ),
  log_none: msg('无'),
  log_error: msg('错误'),
  log_warning: msg('警告'),
  log_info: msg('信息'),
  log_debug: msg('调试'),
  log_verbose: msg('详细'),
  site_rules_label: msg(
    '站点规则<br /><em>按站点覆盖。使用域名或 <a href="https://www.regexpal.com/">正则</a>（例如 <code>/\\.edu$/i</code>）。勾选“禁用”可在该站关闭扩展。填写速度可覆盖默认。</em>',
  ),
  site_rules_col_pattern: msg('模式'),
  site_rules_col_disable: msg('禁用'),
  site_rules_col_speed: msg('速度'),
  add_site_rule: msg('添加站点规则'),
  custom_css_label: msg(
    '自定义 CSS<br /><em>与内置样式一起注入的额外规则。用于覆盖位置或站点微调。</em>',
  ),
  about_btn: msg(`关于 ${EXT_DISPLAY_NAME}`),
  feedback_btn: msg('发送反馈'),
  shortcut_slower: msg('减速'),
  shortcut_faster: msg('加速'),
  shortcut_rewind: msg('倒带'),
  shortcut_advance: msg('快进'),
  shortcut_reset: msg('重置速度'),
  shortcut_fast: msg('偏好速度'),
  shortcut_muted: msg('静音'),
  shortcut_softer: msg('降低音量'),
  shortcut_louder: msg('提高音量'),
  shortcut_pause: msg('暂停'),
  shortcut_mark: msg('设置标记'),
  shortcut_jump: msg('跳到标记'),
  shortcut_display: msg('显示/隐藏控制器'),
  ph_press_key: msg('按下按键'),
  ph_value_numeric: msg('数值（0.10）'),
  ph_site_pattern: msg('youtube.com 或 /regex/'),
  ph_speed_global: msg('（全局）'),
  preset_title_builtin: msg('内置字体（自定义框留空）'),
  warn_altgr: msg('某些键盘布局下可能与 AltGr 输入冲突。'),
  warn_meta: msg('某些 Cmd/Meta 组合可能被操作系统拦截。'),
  err_regex_invalid: msg('错误：站点规则正则无效：“$1”。无法保存。'),
  err_speed_range: msg('错误：“$1” 的速度必须在 $2 与 $3 之间。'),
  err_css_syntax: msg('错误：控制器 CSS 存在语法错误，请先修正再保存。'),
  err_css_size: msg('错误：控制器 CSS 超过 8KB 存储上限（$1KB）。请减小体积。'),
  err_save_storage: msg('错误：无法保存到存储'),
  err_save_generic: msg('保存选项时出错：$1'),
  err_load_options: msg('加载选项时出错：$1'),
  err_export: msg('导出设置时出错：$1'),
  err_import: msg('导入失败：$1'),
  err_restore: msg('恢复默认时出错：$1'),
  status_restoring: msg('正在恢复默认…'),
  status_restored: msg('已恢复默认选项'),
  status_exported: msg('已导出设置'),
  status_imported: msg('已成功导入设置'),
  css_no_rules: msg('未解析出 CSS 规则 — 请检查语法。'),
  css_syntax_err: msg('语法错误：$1'),
  css_rules_warn: msg('已解析 $1 条规则，丢弃 $2 条：$3'),
  popup_toggle_disable: msg('禁用扩展'),
  popup_toggle_enable: msg('启用扩展'),
  popup_settings: msg('设置'),
  popup_status_enabled: msg('已启用。请刷新页面。'),
  popup_status_disabled: msg('已禁用。请刷新页面。'),
  appearance_meta_opacity_default: msg('不透明度 $1（保存前默认 0.3）'),
  appearance_meta_opacity_saved: msg('不透明度 $1'),
  appearance_meta_size_default: msg('文字 $1px（保存前默认 14）'),
  appearance_meta_size_saved: msg('文字 $1px'),
  font_cap_weight_live_default: msg(
    '实时预览 $1 — 移动并保存前使用内置默认',
  ),
  font_cap_weight_stored: msg('已保存 font-weight：$1'),
  font_cap_weight_keyword: msg('已保存关键字粗细（滑块预览 $1）'),
  font_cap_stretch_live_default: msg(
    '实时预览 $1% — 移动并保存前使用内置默认',
  ),
  font_cap_stretch_stored: msg('已保存 font-stretch：$1%'),
  font_cap_stretch_keyword: msg('已保存关键字拉伸 — 滑块预览 $1%'),
  font_hint_saved: msg(' （已保存：$1）'),
  remove_row_aria: msg('删除此行'),
  font_preset_default: msg('默认'),
  font_preset_gothic: msg('黑体 / 无衬线'),
  font_preset_mincho: msg('明朝 / 衬线'),
  font_preset_system: msg('系统界面'),
  font_preset_mono: msg('等宽'),
  font_preset_latin_sans: msg('拉丁 / 界面无衬线'),
};

Object.assign(en, {
  faq_toc_local: msg('Local files / Incognito'),
  faq_toc_disable: msg('Disable on a site'),
  faq_toc_site_speed: msg('Default speed per site'),
  faq_toc_remember: msg('Remember speed'),
  faq_toc_keys: msg('Shortcut conflicts'),
  faq_toc_position: msg('Controller positioning'),
  faq_toc_missing: msg('Controller not showing'),
  faq_toc_spa: msg('Speed resets on navigate'),
  faq_toc_audio: msg('Audio support'),
  faq_block_local: msg(
    `<h4 id="faq-local">The speed controls are not showing up for local videos or Incognito mode?</h4>
<p>To enable playback of local media (e.g. File &gt; Open File) or Incognito mode, you need to manually grant additional permissions to the extension.</p>
<ul>
<li>In a new tab, navigate to <code>chrome://extensions</code></li>
<li>Find &quot;${EXT_DISPLAY_NAME}&quot; extension in the list and enable &quot;Allow access to file URLs&quot; and/or &quot;Allow in Incognito&quot;.</li>
</ul>`,
  ),
  faq_block_disable: msg(
    `<h4 id="faq-disable">How do I disable the extension on a specific site?</h4>
<p>Go to <strong>Advanced &gt; Site rules</strong> and add a rule with the site&apos;s domain (e.g. <code>example.com</code>). Check the <strong>Disable</strong> checkbox. The extension will not inject on that site. You can also use regex patterns like <code>/\\.edu$/i</code> to match multiple domains.</p>`,
  ),
  faq_block_site_speed: msg(
    `<h4 id="faq-site-speed">How do I set a default speed for a specific site?</h4>
<p>In <strong>Advanced &gt; Site rules</strong>, add a rule with the site&apos;s domain and set the <strong>Speed</strong> field to your desired value (e.g. <code>2</code> for 2x). Leave the Disable checkbox unchecked. Every new video on that site will start at that speed.</p>`,
  ),
  faq_block_remember: msg(
    `<h4 id="faq-remember">How does &quot;Remember playback speed&quot; interact with site rules?</h4>
<p>When <code>rememberSpeed</code> is <strong>off</strong> (default), each page load starts at 1x &mdash; or the site rule speed if one matches. Your in-session speed changes apply to all new videos but are forgotten on page reload.</p>
<p>When <code>rememberSpeed</code> is <strong>on</strong>, the last speed you set is stored and persists across sessions. This stored speed <strong>takes precedence</strong> over site rule defaults. To let a site rule win again, either turn off <code>rememberSpeed</code> or manually reset to 1x.</p>`,
  ),
  faq_block_keys: msg(
    `<h4 id="faq-keys">A site&apos;s keyboard shortcuts conflict with mine. What can I do?</h4>
<p>Three options:</p>
<ul>
<li><strong>Add a modifier:</strong> In Settings &gt; Shortcuts, add <code>Shift</code>, <code>Ctrl</code>, or <code>Alt</code> to your shortcut keys to create chord combinations the site won&apos;t intercept.</li>
<li><strong>Rebind to unused keys:</strong> Change the default key to one the site doesn&apos;t use.</li>
<li><strong>Enable exclusive mode:</strong> Turn on <code>Exclusive keyboard shortcuts</code> in Preferences to prevent sites from also handling your VSC shortcut keys.</li>
</ul>`,
  ),
  faq_block_position: msg(
    `<h4 id="faq-position">The controller overlaps with site controls. How do I reposition it?</h4>
<p>Go to <strong>Advanced &gt; Controller CSS</strong>. Add a domain rule targeting <code>vsc-controller</code> using the <code>--vsc-domain</code> CSS variable. Example:</p>
<p><code>:root[style*='--vsc-domain: &quot;example.com&quot;'] vsc-controller { position: relative; top: 60px; }</code></p>
<p>You can also drag the controller to a new position on any page. See the existing rules for YouTube, Netflix, etc. as reference.</p>`,
  ),
  faq_block_missing: msg(
    `<h4 id="faq-missing">The controller is not appearing on a site. Why?</h4>
<p>Common causes:</p>
<ul>
<li>The site is in your <strong>Site rules</strong> with Disable checked &mdash; remove or uncheck it.</li>
<li>The site uses Flash or a non-HTML5 player &mdash; the extension only works with native <code>&lt;video&gt;</code> and <code>&lt;audio&gt;</code> elements.</li>
<li><code>Hide controller by default</code> is enabled &mdash; press your display toggle shortcut (default: <code>V</code>) to show it.</li>
</ul>`,
  ),
  faq_block_spa: msg(
    `<h4 id="faq-spa">Speed resets when I navigate on YouTube or similar single-page apps?</h4>
<p>YouTube uses SPA navigation &mdash; the page doesn&apos;t fully reload, but the player may reinitialize. The extension restores speed from the in-session value automatically. If speed still resets, enable <code>rememberSpeed</code> in Preferences to persist speed across navigations and sessions.</p>`,
  ),
  faq_block_audio: msg(
    `<h4 id="faq-audio">Does this work with audio elements, not just video?</h4>
<p>Yes. When <code>Audio support</code> is enabled in Preferences (on by default), the controller appears on <code>&lt;audio&gt;</code> elements too. All speed controls and keyboard shortcuts work identically for audio.</p>`,
  ),
});

Object.assign(ja, {
  faq_toc_local: msg('ローカルファイル／シークレット'),
  faq_toc_disable: msg('特定サイトで無効にする'),
  faq_toc_site_speed: msg('サイトごとの既定速度'),
  faq_toc_remember: msg('速度の記憶'),
  faq_toc_keys: msg('ショートカットの衝突'),
  faq_toc_position: msg('コントローラーの位置'),
  faq_toc_missing: msg('表示されないとき'),
  faq_toc_spa: msg('移動で速度が戻る'),
  faq_toc_audio: msg('音声への対応'),
  faq_block_local: msg(
    `<h4 id="faq-local">ローカル動画やシークレットでコントローラーが出ません</h4>
<p>ローカルメディア（ファイルを開くなど）やシークレットで使うには、拡張機能に追加の許可を手動で付与してください。</p>
<ul>
<li>新しいタブで <code>chrome://extensions</code> を開く</li>
<li>一覧から「${EXT_DISPLAY_NAME}」を見つけ、「ファイルの URL へのアクセスを許可」および／または「シークレットモードで許可」をオンにする</li>
</ul>`,
  ),
  faq_block_disable: msg(
    `<h4 id="faq-disable">特定のサイトだけ拡張を無効にするには？</h4>
<p><strong>詳細 &gt; サイト別ルール</strong> に、そのサイトのドメイン（例: <code>example.com</code>）でルールを追加し、<strong>無効</strong>にチェックします。そのサイトでは注入されません。<code>/\\.edu$/i</code> のような正規表現で複数ドメインに合わせることもできます。</p>`,
  ),
  faq_block_site_speed: msg(
    `<h4 id="faq-site-speed">サイトごとに既定の速度を設定するには？</h4>
<p><strong>詳細 &gt; サイト別ルール</strong> でドメインを追加し、<strong>速度</strong>欄に希望の値（例: 2 で 2 倍速）を入力します。無効にチェックしないでください。そのサイトの新しい動画はその速度で開始します。</p>`,
  ),
  faq_block_remember: msg(
    `<h4 id="faq-remember">「再生速度を記憶」とサイトルールはどう関係しますか？</h4>
<p><code>rememberSpeed</code> が<strong>オフ</strong>（既定）のときは、ページ読み込みごとに 1 倍速（または一致するサイトルールの速度）から始まります。セッション中に変えた速度は新しい動画にも当たりますが、再読み込みで忘れられます。</p>
<p><code>rememberSpeed</code> が<strong>オン</strong>のときは、最後に設定した速度が保存されセッションをまたぎます。この保存値はサイトルールの既定より<strong>優先</strong>されます。サイトルールを優先したいときは <code>rememberSpeed</code> をオフにするか、手動で 1 倍に戻してください。</p>`,
  ),
  faq_block_keys: msg(
    `<h4 id="faq-keys">サイトのショートカットと衝突します</h4>
<p>次のような方法があります。</p>
<ul>
<li><strong>修飾キーを付ける：</strong> 設定のショートカットで <code>Shift</code>・<code>Ctrl</code>・<code>Alt</code> を組み合わせ、サイトが拾わないキーにする。</li>
<li><strong>別のキーに割り当てる：</strong> サイトが使っていないキーへ変更する。</li>
<li><strong>排他モード：</strong> 環境設定で「キーを強制的に取る」をオンにして、サイト側の処理を抑止する。</li>
</ul>`,
  ),
  faq_block_position: msg(
    `<h4 id="faq-position">コントローラーがサイトの UI と重なる</h4>
<p><strong>詳細 &gt; カスタム CSS</strong> で、<code>--vsc-domain</code> を使って <code>vsc-controller</code> をサイトごとに調整します。例：</p>
<p><code>:root[style*='--vsc-domain: &quot;example.com&quot;'] vsc-controller { position: relative; top: 60px; }</code></p>
<p>ページ上でドラッグして位置を変えることもできます。YouTube や Netflix 向けのサンプル CSS も参考にしてください。</p>`,
  ),
  faq_block_missing: msg(
    `<h4 id="faq-missing">サイトでコントローラーが表示されない</h4>
<p>よくある原因：</p>
<ul>
<li><strong>サイト別ルール</strong>で無効になっている — 解除またはオフにする。</li>
<li>Flash や非 HTML5 プレーヤー — 拡張はネイティブの <code>&lt;video&gt;</code> / <code>&lt;audio&gt;</code> のみ対応。</li>
<li><code>既定でコントローラーを非表示</code>がオン — 表示切替ショートカット（既定 <code>V</code>）を押す。</li>
</ul>`,
  ),
  faq_block_spa: msg(
    `<h4 id="faq-spa">YouTube などで移動すると速度が戻る</h4>
<p>SPA ではページ全体は再読み込みされませんがプレーヤーが再初期化されることがあります。拡張はセッション内の値から速度を復元します。それでも戻る場合は環境設定で <code>rememberSpeed</code> をオンにしてください。</p>`,
  ),
  faq_block_audio: msg(
    `<h4 id="faq-audio">動画だけでなく音声にも使えますか？</h4>
<p>はい。環境設定で<code>音声に対応</code>がオン（既定）なら、<code>&lt;audio&gt;</code> にもコントローラーが表示されます。速度操作とキーボードショートカットは同様に動きます。</p>`,
  ),
});

Object.assign(zhCN, {
  faq_toc_local: msg('本地文件 / 无痕模式'),
  faq_toc_disable: msg('在网站上禁用'),
  faq_toc_site_speed: msg('按站点默认速度'),
  faq_toc_remember: msg('记住速度'),
  faq_toc_keys: msg('快捷键冲突'),
  faq_toc_position: msg('控制器位置'),
  faq_toc_missing: msg('控制器不显示'),
  faq_toc_spa: msg('导航时速度重置'),
  faq_toc_audio: msg('音频支持'),
  faq_block_local: msg(
    `<h4 id="faq-local">本地视频或无痕模式下不显示速度控件？</h4>
<p>若要播放本地媒体（例如“文件 &gt; 打开文件”）或在无痕模式使用，需要手动为扩展授予额外权限。</p>
<ul>
<li>在新标签页打开 <code>chrome://extensions</code></li>
<li>在列表中找到 “${EXT_DISPLAY_NAME}”，启用“允许访问文件网址”和/或“在无痕模式下允许”。</li>
</ul>`,
  ),
  faq_block_disable: msg(
    `<h4 id="faq-disable">如何在特定网站上禁用扩展？</h4>
<p>打开<strong>高级 &gt; 站点规则</strong>，使用该站点域名（例如 <code>example.com</code>）添加规则并勾选<strong>禁用</strong>。扩展将不会在该站点注入。也可用正则（如 <code>/\\.edu$/i</code>）匹配多个域名。</p>`,
  ),
  faq_block_site_speed: msg(
    `<h4 id="faq-site-speed">如何为特定站点设置默认速度？</h4>
<p>在<strong>高级 &gt; 站点规则</strong>中添加域名，并在<strong>速度</strong>栏填入所需值（例如 <code>2</code> 表示 2 倍速）。不要勾选禁用。该站点的新视频将以此速度开始。</p>`,
  ),
  faq_block_remember: msg(
    `<h4 id="faq-remember">“记住播放速度”与站点规则如何配合？</h4>
<p>当 <code>rememberSpeed</code> 为<strong>关闭</strong>（默认）时，每次加载页面从 1 倍速开始——若有匹配的站点规则则用规则速度。会话内更改会应用到新视频，但刷新后会丢失。</p>
<p>当 <code>rememberSpeed</code> 为<strong>开启</strong>时，上次设置的速度会保存并跨会话保留，且<strong>优先于</strong>站点规则默认值。若要让站点规则再次生效，请关闭 <code>rememberSpeed</code> 或手动重置为 1 倍速。</p>`,
  ),
  faq_block_keys: msg(
    `<h4 id="faq-keys">网站快捷键与我的冲突怎么办？</h4>
<p>可选做法：</p>
<ul>
<li><strong>添加修饰键：</strong>在设置 &gt; 快捷键中为快捷键加上 <code>Shift</code>、<code>Ctrl</code> 或 <code>Alt</code>。</li>
<li><strong>改用闲置按键：</strong>换成网站未使用的键。</li>
<li><strong>启用独占模式：</strong>在偏好设置中开启“独占键盘快捷键”。</li>
</ul>`,
  ),
  faq_block_position: msg(
    `<h4 id="faq-position">控制器与网站控件重叠如何移动？</h4>
<p>前往<strong>高级 &gt; 自定义 CSS</strong>，使用 <code>--vsc-domain</code> 针对 <code>vsc-controller</code> 书写域名规则。示例：</p>
<p><code>:root[style*='--vsc-domain: &quot;example.com&quot;'] vsc-controller { position: relative; top: 60px; }</code></p>
<p>也可在页面上拖动控制器。可参考内置的 YouTube、Netflix 等规则。</p>`,
  ),
  faq_block_missing: msg(
    `<h4 id="faq-missing">网站上不出现控制器的原因</h4>
<p>常见原因：</p>
<ul>
<li>站点规则中勾选了禁用——删除或取消勾选。</li>
<li>站点使用 Flash 或非 HTML5 播放器——扩展仅支持原生 <code>&lt;video&gt;</code> 与 <code>&lt;audio&gt;</code>。</li>
<li>启用了<code>默认隐藏控制器</code>——按下显示切换快捷键（默认 <code>V</code>）。</li>
</ul>`,
  ),
  faq_block_spa: msg(
    `<h4 id="faq-spa">在 YouTube 等单页应用导航时速度被重置？</h4>
<p>SPA 不会整页刷新，但播放器可能重新初始化。扩展会自动从会话内数值恢复速度。若仍会重置，请在偏好设置中启用 <code>rememberSpeed</code>。</p>`,
  ),
  faq_block_audio: msg(
    `<h4 id="faq-audio">是否支持音频而不只是视频？</h4>
<p>支持。当偏好设置中的<code>支持音频</code>开启（默认开启）时，控制器也会出现在 <code>&lt;audio&gt;</code> 上，速度与快捷键行为一致。</p>`,
  ),
});

function writeLocale(id, obj) {
  const dir = path.join(root, '_locales', id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'messages.json'), JSON.stringify(obj, null, 2), 'utf8');
}

// Clean en/zhCN/ja objects: remove helper artefacts
for (const k of Object.keys(en)) {
  if (en[k] === undefined) delete en[k];
}

writeLocale('en', en);
writeLocale('ja', ja);
writeLocale('zh_CN', zhCN);

console.log('Wrote _locales/{en,ja,zh_CN}/messages.json');
