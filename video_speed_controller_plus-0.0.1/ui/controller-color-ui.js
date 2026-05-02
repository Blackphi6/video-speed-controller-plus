(() => {
  window.VSC = window.VSC || {};

  function expandShortHex(hex) {
    const s = (hex || '').trim();
    if (/^#[0-9a-f]{3}$/i.test(s)) {
      const h = s.slice(1);
      return '#' + [0, 1, 2].map((i) => h[i] + h[i]).join('');
    }
    return s;
  }

  /** Map text value to a 6-digit hex for input[type=color]; otherwise return fallback. */
  function textToPickerHex(raw, fallbackHex) {
    const s = expandShortHex(String(raw || '').trim());
    if (/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase();
    return fallbackHex;
  }

  function bindTextAndSpectrum(textId, spectrumId, pickerFallbackHex) {
    const text = document.getElementById(textId);
    const spectrum = document.getElementById(spectrumId);
    if (!text || !spectrum) return;

    function syncSpectrumFromText() {
      spectrum.value = textToPickerHex(text.value, pickerFallbackHex);
    }

    spectrum.addEventListener('input', () => {
      text.value = spectrum.value.toLowerCase();
      text.dispatchEvent(new Event('input', { bubbles: true }));
      text.dispatchEvent(new Event('change', { bubbles: true }));
    });

    text.addEventListener('input', syncSpectrumFromText);
    text.addEventListener('change', syncSpectrumFromText);
    syncSpectrumFromText();
  }

  function initControllerColorPickers() {
    bindTextAndSpectrum(
      'controllerSpeedTextColor',
      'controllerSpeedTextColorSpectrum',
      '#ffffff',
    );
    bindTextAndSpectrum(
      'controllerPanelBackgroundColor',
      'controllerPanelBackgroundColorSpectrum',
      '#000000',
    );
  }

  window.VSC.initControllerColorPickers = initControllerColorPickers;
})();
