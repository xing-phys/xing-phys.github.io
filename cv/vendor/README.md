# Pinned Typst dependencies

These files keep the selected CV template reproducible without network access or a user-local Typst package cache.

| Directory | Upstream | License |
| --- | --- | --- |
| `basic-resume-0.2.9/` | [basic-resume 0.2.9](https://typst.app/universe/package/basic-resume/), by Stephen Xu | Unlicense; included as `LICENSE` |
| `scienceicons-0.1.0/` | [scienceicons 0.1.0](https://typst.app/universe/package/scienceicons/), by Rowan Cockett | MIT; included as `LICENSE` |

Sources were obtained from the corresponding versioned archives at `https://packages.typst.org/preview/`.

Local changes:

- `basic-resume-0.2.9/resume.typ` imports the local scienceicons copy instead of `@preview/scienceicons:0.1.0`.
- `scienceicons-0.1.0/index.typ` adds whitespace after the opening raw-text fences around SVG strings, following Typst 0.15's compatibility guidance. The SVG paths and icon functions are unchanged.

Make CV content and style choices in `cv/cv.typ`. Keep upstream template code here separate from personal content.
