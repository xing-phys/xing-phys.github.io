# Curriculum vitae

The CV uses [basic-resume 0.2.9](https://typst.app/universe/package/basic-resume/) by Stephen Xu, with New Computer Modern typography and an A4 page layout. The public PDF is generated at `dist/cv.pdf`.

## Editing

| What you want to change | Source |
| --- | --- |
| Research profile, education, interests, projects, and awards | `cv/cv.typ`, under the corresponding section heading |
| Name, institution, and location | `content/about.json`, shared with the homepage |
| Google Scholar, ORCID, and GitHub links | `content/contact.json`, shared with the homepage |
| Publications, author notes, and associated arXiv links | `content/publications.json`, shared with the homepage |
| Font family, body size, name size, paper size, and accent color | The `resume.with(...)` settings near the top of `cv/cv.typ` |

Publications are generated from the same list as the homepage and terminal. Keep one entry per work and attach earlier versions with the optional `preprint` field. The CV emphasizes your name in each author list automatically.

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
