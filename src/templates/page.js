import {escapeHtml as text} from './html.js';
import {renderHeader} from './header.js';
import {renderFooter} from './footer.js';
import {renderTerminal} from './terminal.js';
import {renderAbout} from './sections/about.js';
import {renderResearch} from './sections/research.js';
import {renderProjects} from './sections/projects.js';
import {renderPublications} from './sections/publications.js';
import {renderNotes} from './sections/notes.js';
import {renderContact} from './sections/contact.js';

export function renderPage(content) {
  const {about, research, projects, publications, notes, contact, site} = content;
  // Escape '<' so even a literal </script> in a bio cannot end this data block.
  const terminalContent = JSON.stringify(content).replace(/</g, '\\u003c');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="${text(site.description)}">
  <title>${text(about.name)} — ${text(site.titleSuffix)}</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%237554df'/%3E%3Ctext x='12' y='45' font-size='43' fill='white'%3Eψ%3C/text%3E%3C/svg%3E">
  <link rel="stylesheet" href="style.css">
  <script src="app.js" type="module"></script>
</head>
<body>
  <div id="gui">
    ${renderHeader(site)}
    <main>
      ${renderAbout(about, site)}
      ${renderResearch(research)}
      ${renderProjects(projects)}
      ${renderPublications(publications, contact)}
      ${renderNotes(notes)}
      ${renderContact(contact)}
    </main>
    ${renderFooter(about, site)}
  </div>
  ${renderTerminal(about, site)}
  <script id="portfolio-content" type="application/json">${terminalContent}</script>
</body>
</html>
`.replace(/[\t ]+$/gm, '');
}
