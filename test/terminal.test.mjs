import assert from 'node:assert/strict';
import test from 'node:test';
import {loadContent} from '../scripts/content.mjs';
import {initTerminal} from '../src/scripts/terminal.js';

const content = await loadContent();

// A small event harness exercises the actual command handlers without adding a
// browser or DOM library to this dependency-free project.
class Element {
  listeners = new Map();
  children = [];
  dataset = {};
  value = '';
  textContent = '';

  addEventListener(type, callback) { this.listeners.set(type, callback); }
  append(...children) { this.children.push(...children); }
  replaceChildren() { this.children = []; }
  focus() {}
  scrollIntoView() {}
  fire(type, properties = {}) {
    this.listeners.get(type)?.({preventDefault() {}, ...properties});
  }
}

function setup(t) {
  const selectors = ['#terminal', '#terminal-output', '#terminal-form', '#command'];
  const elements = Object.fromEntries(selectors.map(selector => [selector, new Element()]));
  const aboutButton = new Element();
  aboutButton.dataset.command = 'about';
  const previous = {document: globalThis.document, window: globalThis.window, location: globalThis.location};
  const opened = [];

  globalThis.document = {
    querySelector: selector => elements[selector],
    querySelectorAll: () => [aboutButton],
    createElement: () => new Element(),
  };
  globalThis.window = {open: (...args) => opened.push(args)};
  globalThis.location = {hash: '#terminal'};
  t.after(() => {
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete globalThis[name];
      else globalThis[name] = value;
    }
  });

  initTerminal(content);
  const input = elements['#command'];
  const log = elements['#terminal-output'];
  return {
    elements, input, log, aboutButton, opened,
    run(value) {
      input.value = value;
      elements['#terminal-form'].fire('submit');
    },
    lastOutput() { return log.children.at(-1)?.children[1].textContent; },
  };
}

test('terminal commands, chips, themes, CV, and GUI route still work', t => {
  const terminal = setup(t);
  terminal.run('  ABOUT  ');
  assert.ok(terminal.lastOutput().includes(content.about.bio));
  assert.equal(terminal.input.value, '');

  terminal.aboutButton.fire('click');
  assert.ok(terminal.lastOutput().includes(content.about.name));

  terminal.run('theme espresso');
  assert.equal(terminal.elements['#terminal'].dataset.theme, 'espresso');
  terminal.run('theme unknown');
  assert.match(terminal.lastOutput(), /Usage: theme/);
  terminal.run('cv');
  assert.deepEqual(terminal.opened[0], [content.site.cvUrl, '_blank', 'noopener']);
  terminal.run('constructor');
  assert.match(terminal.lastOutput(), /Command not found/);
  terminal.run('gui');
  assert.equal(globalThis.location.hash, '');
});

test('terminal history, completion, and clearing still work', t => {
  const terminal = setup(t);
  terminal.run('about');
  terminal.run('projects');
  terminal.input.fire('keydown', {key: 'ArrowUp'});
  assert.equal(terminal.input.value, 'projects');
  terminal.input.fire('keydown', {key: 'ArrowUp'});
  assert.equal(terminal.input.value, 'about');
  terminal.input.fire('keydown', {key: 'ArrowDown'});
  assert.equal(terminal.input.value, 'projects');

  terminal.input.value = 'publ';
  terminal.input.fire('keydown', {key: 'Tab'});
  assert.equal(terminal.input.value, 'publications');
  terminal.input.value = 'the';
  terminal.input.fire('keydown', {key: 'Tab'});
  assert.match(terminal.lastOutput(), /themes\s+theme/);

  terminal.input.fire('keydown', {key: 'l', ctrlKey: true});
  assert.equal(terminal.log.children.length, 0);
  terminal.run('help');
  assert.match(terminal.lastOutput(), /publications/);
  terminal.run('clear');
  assert.equal(terminal.log.children.length, 0);
});
