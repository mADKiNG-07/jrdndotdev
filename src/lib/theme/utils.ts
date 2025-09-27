export type Theme = "light" | "dark" | "system";

export function handleThemeChange(isDarkMode: boolean) {
  // Toggle dark class on document element
  document.documentElement.classList.toggle("dark", isDarkMode);

  // Update the theme-color meta for appropriate colors in the browser
  const themeColor = document.querySelector("meta[name=theme-color]");
  if (themeColor) {
    themeColor.setAttribute("content", isDarkMode ? "#1b1a18" : "#fdf9ef");
  }
}

export function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getInitialTheme(): Theme {
  const savedTheme = localStorage.getItem("theme") as Theme;

  if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
    return savedTheme;
  }

  return "system";
}

export function getEffectiveTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme;
}

export function applyTheme(theme: Theme) {
  const effectiveTheme = getEffectiveTheme(theme);
  handleThemeChange(effectiveTheme === "dark");
  localStorage.setItem("theme", theme);
}

export function initializeTheme() {
  const theme = getInitialTheme();
  applyTheme(theme);
  return theme;
}
