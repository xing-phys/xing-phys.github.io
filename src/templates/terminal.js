import {escapeHtml as text} from './html.js';

export function renderTerminal(about, site) {
  return `
  <section id="terminal" hidden aria-label="Terminal portfolio">
    <div class="terminal-top">
      <a class="brand" href="#">${text(site.brand)}<span>.</span></a>
      <span>${text(site.terminal.host)} ~ portfolio</span>
      <a href="#" class="back-gui">↗ Back to GUI</a>
    </div>
    <div class="terminal-body">
      <div class="terminal-welcome">
        <p class="terminal-kicker">${text(site.terminal.kicker)}</p>
        <h1>${text(about.name)}<span>_</span></h1>
        <p>${text(about.role)} · ${text(about.shortInstitution)} · ${text(about.location)}</p>
        <p>${text(site.terminal.welcome[0])}<br>${text(site.terminal.welcome[1]).replace(/\bhelp\b/, '<strong>help</strong>')}</p>
        <div class="command-chips">
          ${['about', 'research', 'projects', 'publications', 'cv', 'notes', 'contact'].map(command => `<button data-command="${command}">${command}</button>`).join('\n          ')}
        </div>
      </div>
      <div id="terminal-output" role="log" aria-live="polite" aria-relevant="additions"></div>
      <form id="terminal-form" autocomplete="off">
        <label for="command"><span>${text(site.terminal.visitor)}</span>@${text(site.terminal.host)}<span>:~$</span></label>
        <input id="command" type="text" spellcheck="false" autocapitalize="off" aria-label="Terminal command" enterkeyhint="send">
      </form>
      <div class="terminal-hint">Tab to complete · ↑ ↓ history · Ctrl+L to clear · <button data-command="gui">gui</button> to return</div>
    </div>
    <div class="terminal-bottom">
      <span>${text(site.terminal.footerText)}</span>
      <button data-command="themes">Change theme ◐</button>
    </div>
  </section>`;
}
