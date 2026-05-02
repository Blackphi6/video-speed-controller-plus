(() => {
  window.VSC = window.VSC || {};

  function normalizeWeightDigits(v) {
    const m = /^([1-9]\d{2})$/.exec(String(v || '').trim());
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n >= 100 && n <= 900 && n % 100 === 0) return String(n);
    return null;
  }

  function parseStretchPct(v) {
    const m = /^(\d{1,3})%$/.exec(String(v || '').trim());
    if (!m) return null;
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n >= 50 && n <= 200) return n;
    return null;
  }

  /** Build horizontal stroke rows inside the side meters (weight = thicker strokes, width = wider strokes). */
  function populateStrokeMeters() {
    const wEl = document.getElementById('controllerFontWeightBars');
    const sEl = document.getElementById('controllerFontStretchBars');
    [wEl, sEl].forEach((el) => {
      if (!el || el.querySelector('span')) return;
      for (let i = 0; i < 9; i += 1) {
        el.appendChild(document.createElement('span'));
      }
    });
  }

  function refreshFontTuningVisuals() {
    const wSlider = document.getElementById('controllerFontWeightSlider');
    const sSlider = document.getElementById('controllerFontStretchSlider');
    const wHidden = document.getElementById('controllerFontWeight');
    const sHidden = document.getElementById('controllerFontStretch');
    const wBars = document.querySelectorAll('#controllerFontWeightBars span');
    const sBars = document.querySelectorAll('#controllerFontStretchBars span');

    if (!wSlider || !sSlider || !wHidden || !sHidden) return;

    const w = parseInt(wSlider.value, 10);
    const st = parseInt(sSlider.value, 10);

    wBars.forEach((span, i) => {
      span.classList.toggle('is-active', Number.isFinite(w) && (i + 1) * 100 <= w);
    });

    sBars.forEach((span, i) => {
      const threshold = 50 + (i * 150) / 8;
      span.classList.toggle('is-active', Number.isFinite(st) && st >= threshold - 0.001);
    });

    const wLbl = document.getElementById('controllerFontWeightScaleLabel');
    const sLbl = document.getElementById('controllerFontStretchScaleLabel');
    if (wLbl) wLbl.textContent = Number.isFinite(w) ? String(w) : '400';
    if (sLbl) sLbl.textContent = Number.isFinite(st) ? `${st}%` : '100%';

    const aaW = document.getElementById('controllerFontWeightLiveAa');
    const aaS = document.getElementById('controllerFontStretchLiveAa');
    if (aaW && Number.isFinite(w)) aaW.style.fontWeight = String(w);
    if (aaS && Number.isFinite(st)) aaS.style.fontStretch = `${st}%`;

    const capW = document.getElementById('controllerFontWeightLiveCaption');
    const capS = document.getElementById('controllerFontStretchLiveCaption');

    const wStored = normalizeWeightDigits(wHidden.value);
    const weightUnset = !String(wHidden.value || '').trim();
    if (capW) {
      capW.textContent = weightUnset
        ? chrome.i18n.getMessage('font_cap_weight_live_default', [String(w)])
        : wStored
          ? chrome.i18n.getMessage('font_cap_weight_stored', [wStored])
          : chrome.i18n.getMessage('font_cap_weight_keyword', [String(w)]);
    }

    const stretchUnset = !String(sHidden.value || '').trim();
    const stPct = parseStretchPct(sHidden.value);
    if (capS) {
      capS.textContent = stretchUnset
        ? chrome.i18n.getMessage('font_cap_stretch_live_default', [String(st)])
        : stPct != null
          ? chrome.i18n.getMessage('font_cap_stretch_stored', [String(stPct)])
          : chrome.i18n.getMessage('font_cap_stretch_keyword', [String(st)]);
    }
  }

  function syncControllerFontTuningInputs() {
    const wHidden = document.getElementById('controllerFontWeight');
    const sHidden = document.getElementById('controllerFontStretch');
    const wSlider = document.getElementById('controllerFontWeightSlider');
    const sSlider = document.getElementById('controllerFontStretchSlider');
    const wHint = document.getElementById('controllerFontWeightHint');
    if (!wHidden || !sHidden || !wSlider || !sSlider) return;

    function refreshWeightHint() {
      if (!wHint) return;
      const raw = String(wHidden.value || '').trim();
      if (!raw) {
        wHint.textContent = '';
        return;
      }
      if (!normalizeWeightDigits(raw)) {
        wHint.textContent = chrome.i18n.getMessage('font_hint_saved', [raw]);
      } else {
        wHint.textContent = '';
      }
    }

    const wNum = normalizeWeightDigits(wHidden.value);
    if (!String(wHidden.value || '').trim()) {
      wSlider.value = '400';
    } else if (wNum) {
      wSlider.value = wNum;
    } else {
      wSlider.value = '400';
    }
    refreshWeightHint();

    const pct = parseStretchPct(sHidden.value);
    sSlider.value = String(pct != null ? pct : 100);

    populateStrokeMeters();
    refreshFontTuningVisuals();
  }

  function initControllerFontTuning() {
    const wHidden = document.getElementById('controllerFontWeight');
    const sHidden = document.getElementById('controllerFontStretch');
    const wSlider = document.getElementById('controllerFontWeightSlider');
    const sSlider = document.getElementById('controllerFontStretchSlider');

    if (!wHidden || !sHidden || !wSlider || !sSlider) return;

    populateStrokeMeters();

    function emitInput(el) {
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }

    wSlider.addEventListener('input', () => {
      wHidden.value = wSlider.value;
      const wh = document.getElementById('controllerFontWeightHint');
      if (wh) wh.textContent = '';
      emitInput(wHidden);
      refreshFontTuningVisuals();
    });

    sSlider.addEventListener('input', () => {
      sHidden.value = `${sSlider.value}%`;
      emitInput(sHidden);
      refreshFontTuningVisuals();
    });

    document.getElementById('controllerFontWeightReset')?.addEventListener('click', () => {
      wHidden.value = '';
      wSlider.value = '400';
      const wh = document.getElementById('controllerFontWeightHint');
      if (wh) wh.textContent = '';
      emitInput(wHidden);
      refreshFontTuningVisuals();
    });

    document.getElementById('controllerFontStretchReset')?.addEventListener('click', () => {
      sHidden.value = '';
      sSlider.value = '100';
      emitInput(sHidden);
      refreshFontTuningVisuals();
    });

    syncControllerFontTuningInputs();
  }

  window.VSC.syncControllerFontTuningInputs = syncControllerFontTuningInputs;
  window.VSC.initControllerFontTuning = initControllerFontTuning;
})();
