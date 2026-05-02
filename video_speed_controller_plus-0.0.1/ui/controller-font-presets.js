(() => {
  window.VSC = window.VSC || {};

  /** Preset key maps to messages.json entries font_preset_* (hyphens become underscores). */
  const FONT_PRESETS = Object.freeze([
    {
      key: 'default',
      value: '',
      previewCss: '',
    },
    {
      key: 'gothic',
      value:
        '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", Meiryo, "Segoe UI", sans-serif',
      previewCss:
        '"Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", Meiryo, "Segoe UI", sans-serif',
    },
    {
      key: 'mincho',
      value: '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", "Yu Mincho", serif',
      previewCss:
        '"Hiragino Mincho ProN", "Yu Mincho", "MS PMincho", serif',
    },
    {
      key: 'system',
      value: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      previewCss: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    {
      key: 'mono',
      value:
        'ui-monospace, "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace',
      previewCss:
        'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace',
    },
    {
      key: 'latin-sans',
      value: 'Inter, ui-sans-serif, system-ui, sans-serif',
      previewCss: 'Inter, ui-sans-serif, system-ui, sans-serif',
    },
  ]);

  function presetMessageKey(key) {
    return `font_preset_${String(key).replace(/-/g, '_')}`;
  }

  function normalize(value) {
    return String(value == null ? '' : value).trim();
  }

  function findPresetIndex(cssValue) {
    const want = normalize(cssValue);
    return FONT_PRESETS.findIndex((p) => normalize(p.value) === want);
  }

  function initControllerFontPresets() {
    const strip = document.getElementById('controllerFontPresets');
    const input = document.getElementById('controllerFontFamily');
    if (!strip || !input) return;

    const buttons = [];

    function markActive(bestIndex) {
      buttons.forEach((btn, i) => {
        const on = bestIndex !== -1 && i === bestIndex;
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    function syncFromInput() {
      markActive(findPresetIndex(input.value));
    }

    FONT_PRESETS.forEach((preset) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'controller-font-preset';
      const msgKey = presetMessageKey(preset.key);
      btn.setAttribute(
        'title',
        preset.value === ''
          ? chrome.i18n.getMessage('preset_title_builtin')
          : preset.value,
      );
      btn.setAttribute('aria-label', chrome.i18n.getMessage(msgKey));

      const preview = document.createElement('span');
      preview.className = 'controller-font-preset-preview';
      preview.setAttribute('aria-hidden', 'true');
      preview.textContent = 'Aa';
      if (preset.previewCss) {
        preview.style.fontFamily = preset.previewCss;
      }

      const text = document.createElement('span');
      text.className = 'controller-font-preset-text';

      const lab = document.createElement('span');
      lab.className = 'controller-font-preset-label';
      lab.textContent = chrome.i18n.getMessage(msgKey);

      text.appendChild(lab);

      btn.appendChild(preview);
      btn.appendChild(text);

      btn.addEventListener('click', () => {
        input.value = preset.value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        markActive(findPresetIndex(input.value));
      });

      strip.appendChild(btn);
      buttons.push(btn);
    });

    input.addEventListener('input', syncFromInput);
    input.addEventListener('change', syncFromInput);
    syncFromInput();
  }

  window.VSC.initControllerFontPresets = initControllerFontPresets;
})();
