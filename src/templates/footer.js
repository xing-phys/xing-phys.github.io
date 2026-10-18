import {escapeHtml as text} from './html.js';

export function renderFooter(about, site) {
  return `
    <footer class="wrap">
      <span>© <span id="current-year"></span> ${text(about.name)}</span>
      <span>${text(site.footerText)}</span>
      <a href="#terminal">${text(site.footerTerminalLinkLabel)}</a>
    </footer>`;
}
