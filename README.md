# Ze-Yu Xing — Personal Website

A personal research website with a visual homepage and an optional interactive terminal view.

Visit [xing-phys.github.io](https://xing-phys.github.io/).

## Editing the homepage

Start in **[`content/`](content/README.md)**. Each section has a separate JSON file; ordinary content changes do not require editing JavaScript or HTML. Both the visual homepage and the terminal use these files.

| What you want to edit | File |
| --- | --- |
| Name, biography, affiliation, and hero text | [`content/about.json`](content/about.json) |
| Research interests and tags | [`content/research.json`](content/research.json) |
| Ongoing projects, descriptions, and repository links | [`content/projects.json`](content/projects.json) |
| Publications, authors, venues, and paper links | [`content/publications.json`](content/publications.json) |
| Notes and side quests | [`content/notes.json`](content/notes.json) |
| Contact text and Google Scholar / ORCID / GitHub links | [`content/contact.json`](content/contact.json) |
| Navigation, metadata, footer, and terminal welcome text | [`content/site.json`](content/site.json) |
| Curriculum vitae | [`cv/cv.typ`](cv/cv.typ), then `npm run build:cv` |

The [content editing guide](content/README.md) explains the fields, adding entries, and JSON syntax with examples.

## Local development

Use Node.js 22 or later. There are no npm dependencies to install.

```sh
npm run dev
```

Open [127.0.0.1:4173](http://127.0.0.1:4173). The server builds the site at startup and rebuilds whenever you save a file in `content/` or `src/`. Refresh the browser after saving. Invalid content produces an error naming the file and field in the server output; fix it and save again.

```sh
npm run build   # Generate the static website in dist/
npm run check   # Build, validate content, check JavaScript, and run regression tests
```

## Project structure

```text
content/                 Editable text and links, one JSON file per section
  README.md              Content editing guide
src/
  templates/
    page.js              Page shell and section order
    sections/            One layout template per homepage section
    header.js            Navigation layout
    footer.js            Footer layout
    terminal.js          Terminal layout
    html.js              Shared HTML formatting and escaping
  styles/
    base.css             Fonts, colors, and shared defaults
    homepage.css         Homepage layout and section styles
    terminal.css         Terminal appearance and themes
    responsive.css       Mobile layouts and reduced-motion rules
  scripts/
    navigation.js        Switching between homepage and terminal
    theme.js             Light/dark theme and saved preference
    terminal.js          Commands, keyboard shortcuts, and history
    terminal-content.js  Formats the shared content for terminal output
    wave.js              Wave animation and pause control
  app.js                 Small browser entry point
scripts/                 Static build, content validation, and syntax checks
test/                    Content and interaction regression tests
cv/                      Editable Typst CV source and instructions
dist/                    Generated website and the compiled CV PDF
server.mjs               Local development server and file watching
.github/workflows/       GitHub Pages deployment
```

For layout changes, edit the corresponding template in `src/templates/`. To reorder sections, edit `src/templates/page.js`. For appearance changes, edit `src/styles/`.

Treat `dist/index.html`, `dist/app.js`, `dist/scripts/`, and `dist/style.css` as generated output: the next build overwrites them. The existing generated files remain committed for compatibility; the source of truth is `content/` and `src/`. The separately compiled `dist/cv.pdf` is preserved by homepage builds.

The Scholarly typography uses Source Serif 4 for headings, Source Sans 3 for body text, and Space Mono for the terminal and technical labels. Fonts load from Google Fonts with local fallback stacks. In `src/styles/base.css`, edit `--font-heading` or `--font-body` to change the font families; `--heading-weight` controls the serif headings (`500` is medium, `600` is semibold). Heading spacing is in `src/styles/homepage.css`.

All homepage content is rendered into static HTML, so it remains readable without browser JavaScript.

## Deployment

Every push to `main` runs the build and checks, then publishes `dist/` to GitHub Pages using [`.github/workflows/pages.yml`](.github/workflows/pages.yml). Source edits are built automatically during deployment. Run `npm run check` locally before pushing; include the regenerated files when committing.

Publication and preprint details were checked on 2026-09-14. Supporting references are recorded in [`PUBLICATION_SOURCES.md`](PUBLICATION_SOURCES.md).
