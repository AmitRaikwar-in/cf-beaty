/* Codeforces Beautifier — Theme Selector */

const THEMES = [
  {
    id: "dark",
    label: "Dark",
    icon: "🌑",
    vars: {
      "--bg-primary": "#1a1a1a",
      "--bg-secondary": "#282828",
      "--bg-card": "#282828",
      "--bg-card-hover": "#333333",
      "--bg-header": "#282828",
      "--border-color": "#383838",
      "--border-muted": "#2d2d2d",
      "--text-primary": "#eff1f6",
      "--text-secondary": "#abb2bf",
      "--text-muted": "#808080",
      "--accent-color": "#ffa116",
      "--accent-hover": "#ffb84d",
      "--accent-glow": "rgba(255,161,22,0.15)",
      "--accent-link": "#38bdf8",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    icon: "🌌",
    vars: {
      "--bg-primary": "#0d1117",
      "--bg-secondary": "#161b22",
      "--bg-card": "#161b22",
      "--bg-card-hover": "#1f2937",
      "--bg-header": "#161b22",
      "--border-color": "#21262d",
      "--border-muted": "#1a1f27",
      "--text-primary": "#e6edf3",
      "--text-secondary": "#8b949e",
      "--text-muted": "#484f58",
      "--accent-color": "#58a6ff",
      "--accent-hover": "#79b8ff",
      "--accent-glow": "rgba(88,166,255,0.15)",
      "--accent-link": "#58a6ff",
    },
  },
  {
    id: "forest",
    label: "Forest",
    icon: "🌲",
    vars: {
      "--bg-primary": "#0f1a12",
      "--bg-secondary": "#182a1e",
      "--bg-card": "#182a1e",
      "--bg-card-hover": "#1f3828",
      "--bg-header": "#182a1e",
      "--border-color": "#2a4a32",
      "--border-muted": "#1e3626",
      "--text-primary": "#d1fae5",
      "--text-secondary": "#6ee7b7",
      "--text-muted": "#34d399",
      "--accent-color": "#34d399",
      "--accent-hover": "#6ee7b7",
      "--accent-glow": "rgba(52,211,153,0.15)",
      "--accent-link": "#34d399",
    },
  },
  {
    id: "light",
    label: "Light",
    icon: "☀️",
    vars: {
      "--bg-primary": "#f8f9fa",
      "--bg-secondary": "#ffffff",
      "--bg-card": "#ffffff",
      "--bg-card-hover": "#f3f4f6",
      "--bg-header": "#ffffff",
      "--border-color": "#e5e7eb",
      "--border-muted": "#d1d5db",
      "--text-primary": "#111827",
      "--text-secondary": "#374151",
      "--text-muted": "#9ca3af",
      "--accent-color": "#f97316",
      "--accent-hover": "#fb923c",
      "--accent-glow": "rgba(249,115,22,0.12)",
      "--accent-link": "#2563eb",
    },
  },
];

const STORAGE_KEY = "cf-beaty-theme";

function applyTheme(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", themeId);
  localStorage.setItem(STORAGE_KEY, themeId);

  // Mark active button
  document.querySelectorAll(".cfb-theme-option").forEach((btn) => {
    btn.classList.toggle("cfb-theme-active", btn.dataset.theme === themeId);
  });
}

function buildThemePicker() {
  /* ── wrapper ── */
  const wrapper = document.createElement("div");
  wrapper.id = "cfb-theme-wrapper";

  /* ── toggle button ── */
  const toggle = document.createElement("button");
  toggle.id = "cfb-theme-toggle";
  toggle.title = "Switch theme";
  toggle.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>`;

  /* ── dropdown ── */
  const dropdown = document.createElement("div");
  dropdown.id = "cfb-theme-dropdown";

  const label = document.createElement("div");
  label.id = "cfb-theme-label";
  label.textContent = "Theme";
  dropdown.appendChild(label);

  THEMES.forEach((theme) => {
    const btn = document.createElement("button");
    btn.className = "cfb-theme-option";
    btn.dataset.theme = theme.id;
    btn.innerHTML = `<span class="cfb-theme-icon">${theme.icon}</span><span>${theme.label}</span>`;
    btn.addEventListener("click", () => {
      applyTheme(theme.id);
      dropdown.classList.remove("cfb-open");
    });
    dropdown.appendChild(btn);
  });

  /* ── toggle open/close ── */
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("cfb-open");
  });
  document.addEventListener("click", () =>
    dropdown.classList.remove("cfb-open"),
  );

  wrapper.appendChild(toggle);
  wrapper.appendChild(dropdown);
  return wrapper;
}

function initCollapsibleTopics() {
  // Do not collapse the blog post when viewing its dedicated detail page
  if (window.location.pathname.includes("/blog/entry/")) return;

  const topics = document.querySelectorAll(".topic");
  topics.forEach((topic) => {
    if (topic.classList.contains("cfb-collapsible-processed")) return;
    topic.classList.add("cfb-collapsible-processed");

    const content = topic.querySelector(".content");
    if (!content) return;

    const typography = content.querySelector(".ttypography");
    if (!typography) return;

    // 2 lines of text with 13.5px font-size and 1.7 line-height is ~46px.
    // Use 50px as the threshold for collapsible logic.
    if (typography.scrollHeight > 50) {
      topic.classList.add("collapsible-topic", "collapsed");

      const toggleRow = document.createElement("div");
      toggleRow.className = "collapsible-topic-options";

      const toggleLink = document.createElement("a");
      toggleLink.href = "javascript:void(0);";
      toggleLink.className = "cfb-toggle-link";
      toggleLink.innerHTML = `<span>Read more</span><svg class="cfb-toggle-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>`;

      toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        const isCollapsed = topic.classList.toggle("collapsed");
        toggleLink.querySelector("span").textContent = isCollapsed ? "Read more" : "Read less";
      });

      toggleRow.appendChild(toggleLink);
      content.appendChild(toggleRow);
    }
  });
}

function injectMobileMenu() {
  const header = document.querySelector("#header");
  if (!header) return;
  if (document.getElementById("cfb-mobile-menu-toggle")) return;

  const toggle = document.createElement("button");
  toggle.id = "cfb-mobile-menu-toggle";
  toggle.title = "Toggle menu";
  toggle.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const menuBox = document.querySelector(".roundbox.menu-box");
    if (menuBox) {
      menuBox.classList.toggle("cfb-nav-open");
    }
  });

  document.addEventListener("click", (e) => {
    const menuBox = document.querySelector(".roundbox.menu-box");
    const toggleBtn = document.getElementById("cfb-mobile-menu-toggle");
    if (menuBox && toggleBtn && !menuBox.contains(e.target) && !toggleBtn.contains(e.target)) {
      menuBox.classList.remove("cfb-nav-open");
    }
  });

  const firstChild = header.firstElementChild || header.firstChild;
  if (firstChild) {
    header.insertBefore(toggle, firstChild);
  } else {
    header.appendChild(toggle);
  }
}

function inject() {
  const langChooser = document.querySelector("#header .lang-chooser");
  if (!langChooser) return;
  if (document.getElementById("cfb-theme-wrapper")) return;
  langChooser.appendChild(buildThemePicker());
  const saved = localStorage.getItem(STORAGE_KEY) || "light";
  applyTheme(saved);
  initCollapsibleTopics();
  injectMobileMenu();
}
