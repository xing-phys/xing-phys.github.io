# Curriculum vitae

The CV uses [basic-resume 0.2.9](https://typst.app/universe/package/basic-resume/) by Stephen Xu, with New Computer Modern typography and an A4 page layout. The public PDF is generated at `dist/cv.pdf`.

## Editing

| What you want to change | Source |
| --- | --- |
| Research profile, education, interests, projects, talks, and awards | `cv/cv.typ`, under the corresponding section heading |
| Name, institution, and location | `content/about.json`, shared with the homepage |
| Google Scholar, ORCID, and GitHub links | `content/contact.json`, shared with the homepage |
| Header layout and printed website address | `cv/cv.typ`; profile icons are in `cv/profile-icons.typ` |
| Publications, author notes, and associated arXiv links | `content/publications.json`, shared with the homepage |
| Font family, body size, name size, and paper size | The `resume.with(...)` settings near the top of `cv/cv.typ` |
| Colors, line spacing, and section spacing | The `palette`, `par`, and heading settings near the top of `cv/cv.typ` |

Publications are generated from the same list as the homepage and terminal. Keep one entry per work and attach earlier versions with the optional `preprint` field. The CV emphasizes your name in each author list automatically.

For compact journal citations, `equalContributors` lists the authors receiving superscript asterisks instead of an explanatory note, and `showPreprintInCv: false` hides the preprint link in the CV.

The layout flows across pages rather than targeting a single page. Keep the comfortable line spacing and section gaps when adding content; each project and publication stays together. Navy, teal, blue, and slate distinguish names, headings, links, and supporting details while remaining readable in print.

## Building

Compile from the repository root with:

```sh
npm run build:cv
```

The document is verified with Typst 0.15.1. The build command sets the repository as Typst's root so the CV can read `content/*.json`. If invoking Typst directly, use:

```sh
typst compile --root . cv/cv.typ dist/cv.pdf --pdf-standard 1.7
```

The template and its icon dependency are pinned in `cv/vendor/`, so building needs no package downloads. See `cv/vendor/README.md` for upstream sources and local compatibility changes.

Keep the generated PDF committed so the homepage always has a stable `/cv.pdf` URL. After changing a shared content file, run `npm run build:cv` to refresh the PDF as well.
