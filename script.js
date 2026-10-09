const toggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.dataset.theme = theme;
  toggle.setAttribute(
    "aria-label",
    theme === "dark"
      ? "Wechsel zu hellem Farbschema"
      : "Wechsel zu dunklem Farbschema",
  );
}

function readStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Speichern nicht möglich: das Theme gilt dann nur für diese Sitzung
  }
}

toggle.addEventListener("click", () => {
  const next = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  storeTheme(next);
});

const mq = window.matchMedia("(prefers-color-scheme: dark)");

mq.addEventListener("change", (event) => {
  // 1. Steht etwas in localStorage? Dann: nichts tun (return).
  if (readStoredTheme()) return;
  // 2. Sonst: je nach event.matches "dark" oder "light" anwenden.
  applyTheme(event.matches ? "dark" : "light");
});

applyTheme(root.dataset.theme);
