(() => {
  window.VSC = window.VSC || {};

  /**
   * @param {string} name
   * @param {string|string[]|undefined} substitutions
   */
  function t(name, substitutions) {
    const subs =
      substitutions === undefined
        ? []
        : Array.isArray(substitutions)
          ? substitutions
          : [substitutions];
    const out = chrome.i18n.getMessage(name, subs);
    return out && out !== '' ? out : name;
  }

  function applyOne(el) {
    if (el.hasAttribute('data-i18n')) {
      el.textContent = t(el.getAttribute('data-i18n'));
    }
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    }
    const ttl = el.getAttribute('data-i18n-title');
    if (ttl !== null && ttl !== '') {
      el.title = t(ttl);
    }
    const ph = el.getAttribute('data-i18n-placeholder');
    if (ph !== null && ph !== '') {
      el.placeholder = t(ph);
    }
    const aria = el.getAttribute('data-i18n-aria-label');
    if (aria !== null && aria !== '') {
      el.setAttribute('aria-label', t(aria));
    }
  }

  function applyDocument(root) {
    const r = root || document;
    const sel =
      '[data-i18n],[data-i18n-html],[data-i18n-title],[data-i18n-placeholder],[data-i18n-aria-label]';
    r.querySelectorAll(sel).forEach((el) => applyOne(el));
    try {
      document.documentElement.lang = chrome.i18n.getUILanguage();
    } catch {
      /* ignore */
    }
  }

  window.VSC.i18n = { t, applyDocument };
})();
