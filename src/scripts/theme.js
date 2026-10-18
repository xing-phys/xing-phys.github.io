export function initTheme(onChange) {
  const button = document.querySelector('.mode-toggle');

  try {
    if (localStorage.getItem('portfolio-theme') === 'dark') {
      document.body.classList.add('dark');
    }
  } catch {
    // The theme still works when browser storage is unavailable.
  }

  function updateLabel() {
    const dark = document.body.classList.contains('dark');
    button.textContent = dark ? '☀' : '☾';
    button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  }

  updateLabel();
  button.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    updateLabel();

    try {
      localStorage.setItem('portfolio-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    } catch {
      // Storage is optional.
    }

    onChange();
  });
}
