# Codeforces Beautifier Chrome Extension

A lightweight, premium, high-performance Chrome extension that transforms the classic Codeforces interface into a beautiful, modern, and highly readable responsive experience.

---

## Features

- **Modern Theme Switcher**: Instantly toggle between premium Slate Dark and clean Light modes via a switcher integrated directly in the top header.
- **Mobile Responsive Layout**: 
  - **Slide-down Navigation Drawer**: Collapses the top navigation tabs into a clean hamburger menu on mobile/tablet viewports (`≤ 768px`).
  - **Slide-out Sidebar Drawer**: Hides the dense sidebar widget list off-screen. Toggled via a floating action button (FAB) in the bottom-right corner, with a soft dimming backdrop.
- **Collapsible Blog Posts**: Automatically summarizes long blog entries into a neat two-line preview with an expandable "Read more" toggle pill, keeping lists clean and concise.
- **Responsive Tables & Typography**:
  - Implements horizontal scroll wrappers on wide tables (standings, problemsets) to prevent viewport breaks.
  - Adds text-wrapping rules to long preformatted code listings and pre blocks.
- **Subtle Rating Indicators**: Modernized rating color handles (from gray to legendary grandmaster) with vibrant, soft, high-contrast shades that align with contemporary accessibility guidelines.
- **Zebra-Striped Tables**: Styled with subtle hover effects and clean borders for standings, submissions, and dashboard pages.

---

## Installation Instructions (Local/Developer Mode)

To use this extension in Google Chrome (or any Chromium-based browser like Brave or Edge):

1. **Download/Clone this Repository**:
   Ensure all files (`manifest.json`, `content.js`, and `style.css`) are located in a folder on your computer.

2. **Open Extensions Page**:
   In Chrome, navigate to:
   ```text
   chrome://extensions/
   ```

3. **Enable Developer Mode**:
   Toggle the **Developer mode** switch in the top right corner of the page.

4. **Load Unpacked Extension**:
   - Click the **Load unpacked** button in the top left corner.
   - Select the folder containing `manifest.json`.

5. **Test**:
   - Open [Codeforces](https://codeforces.com/) in your browser.
   - Enjoy the new beautified, fully responsive interface!

---

## CI/CD Release Workflow

This project includes a automated GitHub Actions workflow to package and release the extension.

- **Trigger**: Manually triggered via GitHub's **Actions** tab (`workflow_dispatch`).
- **Functionality**: Packages the required code files (`manifest.json`, `content.js`, `style.css`) into a zip archive and uploads it as a release asset under a new GitHub Release.
- **Required Secrets**: Configure `PA_TOKEN` in your repository secrets to allow GitHub Actions to generate releases.
