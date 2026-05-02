(() => {
  window.VSC = window.VSC || {};

  const DEFAULT_OPACITY = 0.3;
  const DEFAULT_BUTTON_PX = 14;
  const DEFAULT_BORDER_W = 0;

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

  function parseBorderWidth(raw) {
    const n = parseInt(String(raw ?? '').trim(), 10);
    if (!Number.isFinite(n)) return null;
    return Math.min(12, Math.max(0, n));
  }

  /** Valid CSS color for border; fallback white */
  function resolveBorderColorCss(raw) {
    const s = String(raw ?? '').trim();
    if (!s) return '#ffffff';
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('color', s)) return s;
    if (typeof CSS !== 'undefined' && CSS.supports && CSS.supports('border-color', s)) return s;
    return '#ffffff';
  }

  function emitHidden(el) {
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function updateValueLabels() {
    const sOp = document.getElementById('controllerOpacitySlider');
    const sSz = document.getElementById('controllerButtonSizeSlider');
    const sBw = document.getElementById('controllerBorderWidthSlider');
    const lo = document.getElementById('controllerOpacityValueLabel');
    const ls = document.getElementById('controllerButtonSizeValueLabel');
    const lb = document.getElementById('controllerBorderWidthValueLabel');
    if (sOp && lo) {
      const v = parseFloat(sOp.value);
      lo.textContent = Number.isFinite(v) ? v.toFixed(2) : DEFAULT_OPACITY.toFixed(2);
    }
    if (sSz && ls) {
      const v = parseInt(sSz.value, 10);
      ls.textContent = `${Number.isFinite(v) ? v : DEFAULT_BUTTON_PX} px`;
    }
    if (sBw && lb) {
      const v = parseInt(sBw.value, 10);
      lb.textContent = `${Number.isFinite(v) ? v : DEFAULT_BORDER_W} px`;
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

    const hBw = document.getElementById('controllerBorderWidth');
    const sBw = document.getElementById('controllerBorderWidthSlider');
    if (hBw && sBw) {
      const bw = parseBorderWidth(hBw.value);
      sBw.value = String(bw ?? DEFAULT_BORDER_W);
    }

    updateValueLabels();
  }

  function refreshControllerAppearancePreview() {
    syncControllerAppearanceSliders();

    const opEl = document.getElementById('controllerOpacity');
    const szEl = document.getElementById('controllerButtonSize');
    const bwEl = document.getElementById('controllerBorderWidth');
    const bcEl = document.getElementById('controllerBorderColor');
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

    const bwParsed = bwEl ? parseBorderWidth(bwEl.value) : null;
    const bwEff = bwParsed ?? DEFAULT_BORDER_W;
    const bcRaw = bcEl ? String(bcEl.value ?? '').trim() : '';
    const bcCss = resolveBorderColorCss(bcRaw);
    if (bwEff > 0) {
      mock.style.border = `${bwEff}px solid ${bcCss}`;
    } else {
      mock.style.border = 'none';
    }

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
    if (bwEl) {
      parts.push(
        bwParsed == null || bwEff === 0
          ? chrome.i18n.getMessage('appearance_meta_border_default')
          : chrome.i18n.getMessage('appearance_meta_border_on', [
              String(bwEff),
              bcRaw || bcCss,
            ]),
      );
    }

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

    const hBw = document.getElementById('controllerBorderWidth');
    const sBw = document.getElementById('controllerBorderWidthSlider');
    if (hBw && sBw) {
      function pushBorderFromSlider() {
        const v = parseInt(sBw.value, 10);
        if (!Number.isFinite(v)) return;
        hBw.value = v === 0 ? '' : String(v);
        emitHidden(hBw);
        updateValueLabels();
        refreshControllerAppearancePreview();
      }

      sBw.addEventListener('input', pushBorderFromSlider);

      document.getElementById('controllerBorderWidthReset')?.addEventListener('click', () => {
        hBw.value = '';
        sBw.value = String(DEFAULT_BORDER_W);
        emitHidden(hBw);
        updateValueLabels();
        refreshControllerAppearancePreview();
      });
    }

    document.getElementById('controllerBorderColor')?.addEventListener('input', () => {
      refreshControllerAppearancePreview();
    });
    document.getElementById('controllerBorderColor')?.addEventListener('change', () => {
      refreshControllerAppearancePreview();
    });

    refreshControllerAppearancePreview();
  }

  window.VSC.syncControllerAppearanceSliders = syncControllerAppearanceSliders;
  window.VSC.refreshControllerAppearancePreview = refreshControllerAppearancePreview;
  window.VSC.initControllerAppearancePreview = initControllerAppearancePreview;
})();
