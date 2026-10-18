export function initNavigation({about, site}, onShowHomepage) {
  const gui = document.querySelector('#gui');
  const terminal = document.querySelector('#terminal');
  const command = document.querySelector('#command');

  function route() {
    const showTerminal = location.hash === '#terminal';
    gui.hidden = showTerminal;
    terminal.hidden = !showTerminal;
    document.body.classList.toggle('in-terminal', showTerminal);
    document.title = `${about.name} — ${showTerminal ? 'Terminal' : site.titleSuffix}`;

    if (showTerminal) {
      window.scrollTo(0, 0);
      command.focus({preventScroll: true});
    } else {
      requestAnimationFrame(onShowHomepage);
    }
  }

  window.addEventListener('hashchange', route);
  route();
}
