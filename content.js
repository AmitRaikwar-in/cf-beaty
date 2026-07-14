
/* Codeforces Beautifier — Theme Selector */

const STORAGE_KEY = "cf-beaty-theme";

function initCollapsibleTopics() {
  if (window.location.pathname.includes("/blog/entry/")) return;

  const topics = document.querySelectorAll(".topic");
  topics.forEach((topic) => {
    if (topic.classList.contains("cfb-collapsible-processed")) return;
    topic.classList.add("cfb-collapsible-processed");

    const content = topic.querySelector(".content");
    if (!content) return;

    const typography = content.querySelector(".ttypography");
    if (!typography) return;

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

function inject() {
  initCollapsibleTopics();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inject);
} else {
  inject();
}
