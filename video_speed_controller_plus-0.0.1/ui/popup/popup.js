(() => {
  var u = {
    SET_SPEED: 'VSC_SET_SPEED',
    ADJUST_SPEED: 'VSC_ADJUST_SPEED',
    RESET_SPEED: 'VSC_RESET_SPEED',
    TOGGLE_DISPLAY: 'VSC_TOGGLE_DISPLAY',
  };
  document.addEventListener('DOMContentLoaded', () => {
    typeof window.VSC?.i18n?.applyDocument === 'function' &&
      window.VSC.i18n.applyDocument(document);
    let m = document.querySelector('#repo-link');
    if (m) {
      let e = chrome.runtime.getManifest().homepage_url;
      e && (m.href = e.replace(/\/$/, ''));
    }
    p();
    document.querySelector('#config').addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
    document.querySelector('#disable').addEventListener('click', function () {
      let e = !this.classList.contains('disabled');
      S(!e, E);
    });
    chrome.storage.sync.get({ enabled: !0 }, (e) => {
      c(e.enabled);
    });
    function S(e, t) {
      chrome.storage.sync.set({ enabled: e }, () => {
        c(e), t && t(e);
      });
    }
    function c(e) {
      let t = document.querySelector('#disable');
      t.classList.toggle('disabled', !e),
        (t.title = e
          ? chrome.i18n.getMessage('popup_toggle_disable')
          : chrome.i18n.getMessage('popup_toggle_enable'));
    }
    function E(e) {
      f(chrome.i18n.getMessage(e ? 'popup_status_enabled' : 'popup_status_disabled'));
    }
    function f(e) {
      let t = document.querySelector('#status');
      t.classList.toggle('hide', !1), (t.innerText = e);
    }
    function p() {
      chrome.storage.sync.get(null, (e) => {
        let t = 0.1,
          d = 0.1,
          s = 1;
        if (e.keyBindings && Array.isArray(e.keyBindings)) {
          let n = e.keyBindings.find((o) => o.action === 'slower'),
            i = e.keyBindings.find((o) => o.action === 'faster'),
            a = e.keyBindings.find((o) => o.action === 'fast');
          n && typeof n.value == 'number' && (t = n.value),
            i && typeof i.value == 'number' && (d = i.value),
            a && typeof a.value == 'number' && (s = a.value);
        }
        y(t, d, s), g();
      });
    }
    function y(e, t, d) {
      let s = document.querySelector('#speed-decrease');
      s &&
        ((s.dataset.delta = -e),
        (s.querySelector('span').textContent = `-${e}`));
      let n = document.querySelector('#speed-increase');
      n &&
        ((n.dataset.delta = t),
        (n.querySelector('span').textContent = `+${t}`));
      let i = document.querySelector('#speed-reset');
      i && (i.textContent = d.toString());
    }
    function g() {
      document.querySelector('#speed-decrease').addEventListener('click', function () {
          let e = parseFloat(this.dataset.delta);
          l(e);
        }),
        document.querySelector('#speed-increase').addEventListener('click', function () {
          let e = parseFloat(this.dataset.delta);
          l(e);
        }),
        document.querySelector('#speed-reset').addEventListener('click', function () {
          let e = parseFloat(this.textContent);
          r(e);
        }),
        document.querySelectorAll('.preset-btn').forEach((e) => {
          e.addEventListener('click', function () {
            let t = parseFloat(this.dataset.speed);
            r(t);
          });
        });
    }
    function r(e) {
      chrome.tabs.query({ active: !0, currentWindow: !0 }, (t) => {
        t[0] &&
          chrome.tabs.sendMessage(t[0].id, {
            type: u.SET_SPEED,
            payload: { speed: e },
          });
      });
    }
    function l(e) {
      chrome.tabs.query({ active: !0, currentWindow: !0 }, (t) => {
        t[0] &&
          chrome.tabs.sendMessage(t[0].id, {
            type: u.ADJUST_SPEED,
            payload: { delta: e },
          });
      });
    }
  });
})();
