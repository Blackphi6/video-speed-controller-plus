(() => {
  window.VSC = window.VSC || {};

  const DEFAULT_OPACITY = 0.3;
  const DEFAULT_BUTTON_PX = 14;

  function parseOpacity(raw) {
    const n = parseFloat(String(raw ?? '').trim());
    if (!Number.isFinite(n)) return null;
    return Math.min(1, Math.max(0, n));
  }

  function parseButtonPx(raw) {
    const n = parseFloat(String(raw ?? '').trim());
    if (!Number.isFinite(n)) return null;
    return Math.min(48, Math.max(8, Math.round(n)));
  }

  function emitHidden(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function updateValueLabels() {
    const sOp = document.getElementById('controllerOpacitySlider');
    const sSz = document.getElementById('controllerButtonSizeSlider');
    const lo = document.getElementById('controllerOpacityValueLabel');
    const ls = document.getElementById('controllerButtonSizeValueLabel');
    if (sOp && lo) {
      const v = parseFloat(sOp.value);
      lo.textContent = Number.isFinite(v) ? v.toFixed(2) : DEFAULT_OPACITY.toFixed(2);
    }
    if (sSz && ls) {
      const v = parseInt(sSz.value, 10);
      ls.textContent = `${Number.isFinite(v) ? v : DEFAULT_BUTTON_PX} px`;
    }
  }

  /** Sync range inputs from hidden fields (after load / restore / import). */
  function syncControllerAppearanceSliders() {
    const hOp = document.getElementById('controllerOpacity');
    const hSz = document.getElementById('controllerButtonSize');
    const sOp = document.getElementById('controllerOpacitySlider');
    const sSz = document.getElementById('controllerButtonSizeSlider');
    if (!hOp || !hSz || !sOp || !sSz) return;

    const op = parseOpacity(hOp.value);
    sOp.value = String(op ?? DEFAULT_OPACITY);

    const px = parseButtonPx(hSz.value);
    sSz.value = String(px ?? DEFAULT_BUTTON_PX);

    updateValueLabels();
  }

  function refreshControllerAppearancePreview() {
    syncControllerAppearanceSliders();

    const opEl = document.getElementById('controllerOpacity');
    const szEl = document.getElementById('controllerButtonSize');
    const mock = document.getElementById('controllerAppearanceMock');
    const meta = document.getElementById('controllerAppearancePreviewMeta');
    if (!opEl || !szEl || !mock) return;

    const opParsed = parseOpacity(opEl.value);
    const pxParsed = parseButtonPx(szEl.value);

    const opEff = opParsed ?? DEFAULT_OPACITY;
    const pxEff = pxParsed ?? DEFAULT_BUTTON_PX;

    mock.style.opacity = String(opEff);
    mock.style.fontSize = `${pxEff}px`;
    mock.style.lineHeight = `${pxEff}px`;

    const parts = [];
    parts.push(
      opParsed == null
        ? chrome.i18n.getMessage('appearance_meta_opacity_default', [opEff.toFixed(2)])
        : chrome.i18n.getMessage('appearance_meta_opacity_saved', [String(opParsed)]),
    );
    parts.push(
      pxParsed == null
        ? chrome.i18n.getMessage('appearance_meta_size_default', [String(pxEff)])
        : chrome.i18n.getMessage('appearance_meta_size_saved', [String(pxParsed)]),
    );

    if (meta) meta.textContent = parts.join(' · ');
  }

  function initControllerAppearancePreview() {
    const hOp = document.getElementById('controllerOpacity');
    const hSz = document.getElementById('controllerButtonSize');
    const sOp = document.getElementById('controllerOpacitySlider');
    const sSz = document.getElementById('controllerButtonSizeSlider');
    if (!hOp || !hSz || !sOp || !sSz) return;

    function pushOpacityFromSlider() {
      const v = parseFloat(sOp.value);
      if (!Number.isFinite(v)) return;
      hOp.value = String(Math.round(v * 100) / 100);
      emitHidden(hOp);
      updateValueLabels();
      refreshControllerAppearancePreview();
    }

    function pushSizeFromSlider() {
      const v = parseInt(sSz.value, 10);
      if (!Number.isFinite(v)) return;
      hSz.value = String(v);
      emitHidden(hSz);
      updateValueLabels();
      refreshControllerAppearancePreview();
    }

    sOp.addEventListener('input', pushOpacityFromSlider);
    sSz.addEventListener('input', pushSizeFromSlider);

    document.getElementById('controllerOpacityReset')?.addEventListener('click', () => {
      hOp.value = '';
      sOp.value = String(DEFAULT_OPACITY);
      emitHidden(hOp);
      updateValueLabels();
      refreshControllerAppearancePreview();
    });

    document.getElementById('controllerButtonSizeReset')?.addEventListener('click', () => {
      hSz.value = '';
      sSz.value = String(DEFAULT_BUTTON_PX);
      emitHidden(hSz);
      updateValueLabels();
      refreshControllerAppearancePreview();
    });

    refreshControllerAppearancePreview();
  }

  window.VSC.syncControllerAppearanceSliders = syncControllerAppearanceSliders;
  window.VSC.refreshControllerAppearancePreview = refreshControllerAppearancePreview;
  window.VSC.initControllerAppearancePreview = initControllerAppearancePreview;
})();
