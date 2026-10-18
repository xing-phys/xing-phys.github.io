# Editing homepage content

Choose the JSON file for the section you want to change, edit its text or links, and save. With `npm run dev` running, refresh your browser to see the rebuilt page. The terminal reads the same content, so you only need to edit each biography, project, or paper once.

## Where everything lives

| File | Fields and purpose |
| --- | --- |
| [`about.json`](about.json) | `name`, `role`, `institution`, `shortInstitution`, `location`, and `bio`; hero labels, button text, and the divider below it |
| [`research.json`](research.json) | Section heading and an `items` list of research cards, each with `symbol`, `title`, `description`, and `tags` |
| [`projects.json`](projects.json) | Section heading and an `items` list of projects, each with `name`, `title`, `url`, `symbol`, `status`, `description`, and `tags` |
| [`publications.json`](publications.json) | Section heading and an `items` list of papers; each has `year`, `title`, `authors`, `venue`, `url`, and optional `authorNote` and `preprint` fields |
| [`notes.json`](notes.json) | Section heading and an `items` list of cards, each with `category`, `title`, `description`, and `status` |
| [`contact.json`](contact.json) | Contact heading and description; profile `links`, each with an `id`, `label`, and `url` |
| [`site.json`](site.json) | Browser title suffix, search description, brand initials, navigation links, CV URL, footer, and terminal introduction |

The order of entries in an `items` or `links` list is their order on the page. Card and publication numbers are generated automatically. Keep publication years quoted, for example `"2026"`.

The publication heading reuses a link from `contact.json`: `publications.json` has `profileLinkId: "scholar"`, which matches the `id` of the Google Scholar link. Update that URL once in `contact.json` to update both sections and the terminal.

## Change a biography

Edit `bio` in `about.json`. Keep it as plain text inside quotes. The `institution` field is the full institution name; `shortInstitution` is the compact version displayed below your name. Name, role, affiliation, and biography are also reused in the terminal.

`site.json.description` is a separate search-engine description. Update it as well if a change to your role or affiliation should appear in search previews.

## Add a publication

Copy an existing entry in the `items` list in `publications.json`, then change its fields. Put the new entry first if it should appear at the top:

```json
{
  "year": "2027",
  "title": "Your paper title",
  "authors": "Ze-Yu Xing and collaborators",
  "venue": "Journal name, volume, page (2027)",
  "url": "https://doi.org/your-doi",
  "authorNote": "Optional equal-contribution or other author note."
}
```

You can omit `authorNote` entirely. Separate neighboring entries with a comma. The paper will appear on the homepage and in the terminal's `publications` command.

When a preprint has been published, keep one entry using the journal citation and attach the earlier version with an optional `preprint` field:

```json
"preprint": {
  "label": "arXiv:2407.01296 (2024)",
  "url": "https://arxiv.org/abs/2407.01296"
}
```

This adds an arXiv link under the same paper in both the homepage and terminal. The CV is maintained separately in `cv/cv.typ`; update its matching entry and run `npm run build:cv` too.

## Add a project or research interest

Copy an entry in the relevant `items` list. For a project, `name` is the short repository or project name, `title` is its full title, `url` is its link, and `symbol` is the small mark above the title. For research interests, `symbol` is the mark above the card. `tags` is a list of short labels:

```json
"tags": ["OPEN QUANTUM SYSTEMS", "TENSOR NETWORKS"]
```

Descriptions are shared with the terminal. Remove an entire entry to remove that card; use `"tags": []` if it needs no tags.

## Update notes

Edit the cards in `notes.json`. They currently describe a future notebook: `category` is the small label, `title` and `description` describe the card, and `status` is the line below it. The current design displays text cards. Adding separate note pages or clickable note links also requires a layout change in `src/templates/sections/notes.js`.

## Headings, line breaks, and navigation

`eyebrow` is the small uppercase line above a heading. Section `title` values omit the decorative final period, which the template adds. The hero likewise adds a period after `about.name`.

Research, project, and notes headings have a `description` array: each string becomes one visual line. The contact `title` is also an array of lines. Plain text fields are escaped automatically; use ordinary `&` and `<` characters, not HTML entities or markup.

`site.json.navigation` controls the header links. Each entry has `label` and `href`; add `"newTab": true` to open it in a new tab. The existing section anchors are `#about`, `#research`, `#projects`, `#publications`, `#writing`, and `#contact`. The notes section keeps `#writing` so existing links continue to work.

The CV is served at `cv.pdf`. To update the document, edit `cv/cv.typ` and run `npm run build:cv`. If you change its URL, update both `site.json.cvUrl` and the CV navigation entry's `href`.

## JSON editing tips

- Keep field names and text in double quotes.
- Put commas between fields and list entries, but leave no trailing comma after the last one.
- Write `\"` for a quote inside text, for example `"A \"quoted\" phrase"`.
- JSON does not support comments. Put longer editorial notes in a separate Markdown file.
- Run `npm run check` to catch missing fields, malformed JSON, and broken content references before committing.

Edit layouts in `src/templates/` and appearance in `src/styles/`. Files in `dist/` are generated and will be overwritten when you build.
