# Ze-Yu Xing — Personal Website

A personal research website featuring my background, research interests, selected publications, notes, and profile links. It includes both a visual homepage and an optional interactive terminal view.

Visit the website at [xing-phys.github.io](https://xing-phys.github.io/).

Publication and preprint details were checked against Google Scholar, publisher records, and arXiv on 2026-09-14. Supporting references are recorded in `PUBLICATION_SOURCES.md`.

## Local development

Run `npm run dev` and open http://127.0.0.1:4173. No dependency installation is needed. Run `npm run check` to check JavaScript syntax.

## Project structure

The site is in `dist/`. Edit `dist/index.html` for homepage content, `dist/app.js` for terminal content and interactions, and `dist/style.css` for appearance. Fonts use Google Fonts with local fallback stacks.

## Deployment

The site is deployed from `dist/` by the GitHub Actions workflow in `.github/workflows/pages.yml`. Every push to `main` automatically publishes the latest version to GitHub Pages.
