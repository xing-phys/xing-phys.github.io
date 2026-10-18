import {escapeHtml as text} from './html.js';

export function renderHeader(site) {
  return `
    <header class="header wrap">
      <a class="brand" href="#" aria-label="Home">${text(site.brand)}<span>.</span></a>
      <nav aria-label="Main navigation">
        ${site.navigation.map(link => `<a href="${text(link.href)}"${link.newTab ? ' target="_blank" rel="noopener"' : ''}>${text(link.label)}</a>`).join('\n        ')}
      </nav>
      <div class="header-actions">
        <button class="mode-toggle" aria-label="Switch to dark theme">☾</button>
        <a class="terminal-link" href="#terminal"><span>&gt;_</span> ${text(site.terminalLinkLabel)}</a>
      </div>
    </header>`;
}
