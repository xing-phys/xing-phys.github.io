import {createTerminalProfile} from './terminal-content.js';

const help = `about         A little about me
research      What I study
projects      Ongoing research projects
publications  Selected work
cv            Open my curriculum vitae
notes         Notes and side projects
contact       Get in touch
themes        Available terminal colors
theme <name>  Choose a theme
whoami        Meet the visitor
clear         Clear the screen
gui           Return to the visual homepage

Use Tab to complete commands and ↑ / ↓ for history.`;

const themes = ['violet', 'espresso', 'light'];

export function initTerminal(content) {
  const profile = createTerminalProfile(content);
  const commands = ['help', ...Object.keys(profile), 'cv', 'themes', 'theme', 'clear', 'gui', 'whoami'];
  const terminal = document.querySelector('#terminal');
  const outputLog = document.querySelector('#terminal-output');
  const form = document.querySelector('#terminal-form');
  const input = document.querySelector('#command');
  const history = [];
  let historyIndex = 0;

  function output(command, value) {
    const entry = document.createElement('div');
    entry.className = 'output-entry';

    const prompt = document.createElement('div');
    prompt.className = 'output-prompt';
    prompt.textContent = `${content.site.terminal.visitor}@${content.site.terminal.host}:~$ ${command}`;

    const body = document.createElement('div');
    body.className = 'output-text';
    body.textContent = value;

    entry.append(prompt, body);
    outputLog.append(entry);
  }

  function execute(raw) {
    const value = raw.trim();
    if (!value) return;

    history.push(value);
    historyIndex = history.length;
    const [command, ...args] = value.toLowerCase().split(/\s+/);

    if (command === 'gui') {
      location.hash = '';
      return;
    }

    if (command === 'cv') {
      window.open(content.site.cvUrl, '_blank', 'noopener');
      output(value, `Opening curriculum vitae: ${content.site.cvUrl}`);
    } else if (command === 'clear') {
      outputLog.replaceChildren();
    } else if (Object.hasOwn(profile, command)) {
      output(value, profile[command]);
    } else if (command === 'help') {
      output(value, help);
    } else if (command === 'themes') {
      output(value, 'Available themes: violet (default), espresso, light\n\nTry: theme espresso');
    } else if (command === 'theme') {
      if (themes.includes(args[0])) {
        terminal.dataset.theme = args[0];
        output(value, `Theme changed to ${args[0]}.`);
      } else {
        output(value, 'Usage: theme violet | espresso | light');
      }
    } else if (command === 'whoami') {
      output(value, 'A curious visitor. Welcome!');
    } else {
      output(value, `Command not found: ${command}\nType help to see what you can explore.`);
    }

    input.value = '';
    input.focus({preventScroll: true});
    form.scrollIntoView({block: 'nearest'});
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    execute(input.value);
  });

  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => execute(button.dataset.command));
  });

  input.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const direction = event.key === 'ArrowUp' ? -1 : 1;
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + direction));
      input.value = history[historyIndex] || '';
    }

    if (event.key === 'Tab' && input.value.trim()) {
      const matches = commands.filter(command => command.startsWith(input.value.trim().toLowerCase()));
      if (matches.length) {
        event.preventDefault();
        if (matches.length === 1) input.value = matches[0];
        else output(input.value, matches.join('  '));
      }
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      outputLog.replaceChildren();
    }
  });
}
