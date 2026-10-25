(() => {
  const root = document.documentElement;
  const button = document.getElementById("theme-toggle");
  const label = button.querySelector(".theme-copy");
  const symbol = button.querySelector(".theme-symbol");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const storageKey = "zolda-theme";
  const validThemes = ["light", "dark"];

  function savedTheme() {
    try {
      const value = localStorage.getItem(storageKey);
      return validThemes.includes(value) ? value : "auto";
    } catch {
      return "auto";
    }
  }

  function renderTheme() {
    const preference = savedTheme();
    if (preference === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.dataset.theme = preference;
    }

    const activeTheme = preference === "auto"
      ? (systemTheme.matches ? "dark" : "light")
      : preference;
    const modeText = preference === "auto" ? `Auto · ${activeTheme === "dark" ? "Dark" : "Light"}` : `${activeTheme === "dark" ? "Dark" : "Light"} mode`;
    label.textContent = modeText;
    symbol.textContent = activeTheme === "dark" ? "☾" : "☼";
    themeColor.content = activeTheme === "dark" ? "#0d0d0d" : "#f4efe6";
    button.setAttribute("aria-label", `Color mode: ${modeText}. Activate to change.`);
    button.setAttribute("aria-pressed", preference !== "auto" ? "true" : "false");
  }

  button.addEventListener("click", () => {
    const preference = savedTheme();
    const next = preference === "auto" ? "light" : preference === "light" ? "dark" : "auto";
    try {
      if (next === "auto") localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, next);
    } catch {
      if (next === "auto") root.removeAttribute("data-theme");
      else root.dataset.theme = next;
    }
    renderTheme();
  });

  systemTheme.addEventListener?.("change", () => {
    if (savedTheme() === "auto") renderTheme();
  });

  renderTheme();
})();