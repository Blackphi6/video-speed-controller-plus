(() => {
  /** @typedef {'system'|'light'|'dark'} UiColorScheme */

  window.VSC = window.VSC || {};

  const STORAGE_SCHEME = "uiColorScheme";
  const STORAGE_ACCENT = "uiAccentPreset";

  /** Tone pairs for accent (follows Material-style primary / container semantics) */
  const ACCENT_VARS = {
    violet: {
      light: {
        "--md-primary": "#6750a4",
        "--md-primary-container": "#eaddff",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#21005d",
      },
      dark: {
        "--md-primary": "#d0bcff",
        "--md-primary-container": "#4f378b",
        "--md-on-primary": "#371e73",
        "--md-on-primary-container": "#eaddff",
      },
    },
    blue: {
      light: {
        "--md-primary": "#1565c0",
        "--md-primary-container": "#d1e4ff",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#001d35",
      },
      dark: {
        "--md-primary": "#9ecaff",
        "--md-primary-container": "#0842a0",
        "--md-on-primary": "#001d35",
        "--md-on-primary-container": "#d1e4ff",
      },
    },
    teal: {
      light: {
        "--md-primary": "#006a60",
        "--md-primary-container": "#adf0e7",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#00201c",
      },
      dark: {
        "--md-primary": "#83d5cb",
        "--md-primary-container": "#005049",
        "--md-on-primary": "#003731",
        "--md-on-primary-container": "#adf0e7",
      },
    },
    green: {
      light: {
        "--md-primary": "#2e6b2e",
        "--md-primary-container": "#dcf3dc",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#0c200c",
      },
      dark: {
        "--md-primary": "#98d498",
        "--md-primary-container": "#235223",
        "--md-on-primary": "#0c200c",
        "--md-on-primary-container": "#dcf3dc",
      },
    },
    rose: {
      light: {
        "--md-primary": "#b0224a",
        "--md-primary-container": "#ffd9e4",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#3e0018",
      },
      dark: {
        "--md-primary": "#ffb3c6",
        "--md-primary-container": "#872243",
        "--md-on-primary": "#561126",
        "--md-on-primary-container": "#ffd9e4",
      },
    },
    amber: {
      light: {
        "--md-primary": "#7c5800",
        "--md-primary-container": "#fde9a9",
        "--md-on-primary": "#ffffff",
        "--md-on-primary-container": "#261900",
      },
      dark: {
        "--md-primary": "#f1c048",
        "--md-primary-container": "#614600",
        "--md-on-primary": "#261900",
        "--md-on-primary-container": "#fde9a9",
      },
    },
  };

  function isDarkEffective(scheme, mql) {
    if (scheme === "dark") return true;
    if (scheme === "light") return false;
    return mql.matches;
  }

  const ACCENT_PROP_KEYS = [
    "--md-primary",
    "--md-primary-container",
    "--md-on-primary",
    "--md-on-primary-container",
  ];

  /**
   * @param {UiColorScheme|string} scheme
   * @param {string} accentPreset
   */
  function applyUiTheme(scheme, accentPreset) {
    const doc = document.documentElement;
    if (scheme === "system") {
      doc.removeAttribute("data-vsc-scheme");
    } else {
      doc.setAttribute("data-vsc-scheme", scheme);
    }

    ACCENT_PROP_KEYS.forEach((k) => doc.style.removeProperty(k));

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const dark = isDarkEffective(scheme, mql);

    const acc = ACCENT_VARS[accentPreset] ? accentPreset : "violet";
    const pane = ACCENT_VARS[acc][dark ? "dark" : "light"];
    Object.entries(pane).forEach(([k, v]) => {
      doc.style.setProperty(k, v);
    });
  }

  if (!window.VSC.__vscThemeMediaBound) {
    window.VSC.__vscThemeMediaBound = true;
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        try {
          if (typeof chrome === "undefined" || !chrome.storage?.sync?.get)
            return;
          chrome.storage.sync.get(
            { [STORAGE_SCHEME]: "system", [STORAGE_ACCENT]: "violet" },
            (r) => {
              if (chrome.runtime?.lastError) return;
              if (r[STORAGE_SCHEME] !== "system") return;
              applyUiTheme(r[STORAGE_SCHEME], r[STORAGE_ACCENT]);
            },
          );
        } catch (_) {
          /* ignore */
        }
      });
  }

  function applyUiThemeFromStorage(callback) {
    return new Promise((resolve) => {
      try {
        chrome.storage.sync.get(
          {
            [STORAGE_SCHEME]: "system",
            [STORAGE_ACCENT]: "violet",
          },
          (r) => {
            const err = chrome.runtime && chrome.runtime.lastError;
            if (err || !r) {
              resolve();
              callback && callback();
              return;
            }
            applyUiTheme(r[STORAGE_SCHEME], r[STORAGE_ACCENT]);
            resolve();
            callback && callback();
          },
        );
      } catch (_) {
        resolve();
        callback && callback();
      }
    });
  }

  chrome.storage?.onChanged?.addListener((changes, area) => {
    if (area !== "sync") return;
    if (!changes[STORAGE_SCHEME] && !changes[STORAGE_ACCENT]) return;
    applyUiThemeFromStorage();
  });

  window.VSC.applyUiTheme = applyUiTheme;
  window.VSC.applyUiThemeFromStorage = applyUiThemeFromStorage;

  function initUiThemeOptionsPage() {
    const cs = document.getElementById("ui-color-scheme");
    const ap = document.getElementById("ui-accent-preset");
    if (!cs || !ap) return;
    function preview() {
      applyUiTheme(cs.value, ap.value);
    }
    cs.addEventListener("change", preview);
    ap.addEventListener("change", preview);
  }

  window.VSC.initUiThemeOptionsPage = initUiThemeOptionsPage;

  document.addEventListener("DOMContentLoaded", () => {
    const path = typeof location !== "undefined" ? location.pathname : "";
    if (path.endsWith("/popup/popup.html") || path.includes("popup.html")) {
      applyUiThemeFromStorage();
    }
  });
})();
