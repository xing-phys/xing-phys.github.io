import assert from 'node:assert/strict';
import test from 'node:test';
import {loadContent, validateContent} from '../scripts/content.mjs';
import {renderPage} from '../src/templates/page.js';
import {createTerminalProfile} from '../src/scripts/terminal-content.js';

const original = await loadContent();

test('a content edit reaches the static homepage and terminal together', () => {
  const content = structuredClone(original);
  content.about.bio = 'A new biography about quantum dynamics.';
  content.projects.items[0].description = 'An updated project description.';
  content.notes.items[0].title = 'My first physics note';
  content.publications.items.push({
    year: '2027', title: 'A new paper', authors: 'A. Author',
    venue: 'Example journal', url: 'https://example.com/paper',
  });
  validateContent(content);

  const html = renderPage(content);
  const terminal = createTerminalProfile(content);

  assert.ok(html.includes(`<p class="bio">${content.about.bio}</p>`));
  assert.ok(terminal.about.includes(content.about.bio));
  assert.ok(html.includes(content.projects.items[0].description));
  assert.ok(terminal.projects.includes(content.projects.items[0].description));
  assert.ok(html.includes(content.notes.items[0].title));
  assert.ok(terminal.notes.includes(content.notes.items[0].title));
  assert.ok(html.includes('<span class="paper-label">04</span>'));
  assert.ok(terminal.publications.includes('2027  A new paper'));
  assert.ok(!html.includes('undefined'));
});

test('the Scholar link is shared by publications, contact, and terminal', () => {
  const content = structuredClone(original);
  const url = 'https://example.com/new-scholar-profile?one=1&two=2';
  content.contact.links.find(link => link.id === 'scholar').url = url;

  const html = renderPage(content);
  assert.equal(html.split('href="https://example.com/new-scholar-profile?one=1&amp;two=2"').length - 1, 2);
  assert.ok(createTerminalProfile(content).contact.includes(url));
});

test('plain text content stays escaped in HTML and survives the terminal data block', () => {
  const content = structuredClone(original);
  content.about.bio = 'Entropy < energy & "information" </script><script>example</script>';
  content.about.name = 'A "quoted" name';

  const html = renderPage(content);
  assert.ok(html.includes('Entropy &lt; energy &amp; &quot;information&quot;'));
  assert.ok(!html.includes('</script><script>example'));

  const embedded = html.match(/<script id="portfolio-content" type="application\/json">(.*?)<\/script>/s)[1];
  const decoded = JSON.parse(embedded);
  assert.equal(decoded.about.bio, content.about.bio);
  assert.ok(createTerminalProfile(decoded).about.includes(content.about.bio));
});

test('content errors identify the file and field that needs editing', () => {
  const content = structuredClone(original);
  delete content.projects.items[0].description;
  assert.throws(() => validateContent(content), /content\/projects\.json\.items\[0\]\.description must be a string/);

  const brokenLink = structuredClone(original);
  brokenLink.publications.profileLinkId = 'missing';
  assert.throws(() => validateContent(brokenLink), /profileLinkId must match a link id/);
});

test('every homepage section is present before browser JavaScript runs', () => {
  const html = renderPage(original);
  for (const id of ['about', 'research', 'projects', 'publications', 'writing', 'contact']) {
    assert.match(html, new RegExp(`<section[^>]+id="${id}"`));
  }
  assert.equal((html.match(/class="publication"/g) || []).length, original.publications.items.length);
  assert.equal((html.match(/class="project-card"/g) || []).length, original.projects.items.length);
});
