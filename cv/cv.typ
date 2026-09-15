#let accent = rgb("#7755cf")
#let ink = rgb("#242333")
#let muted = rgb("#666371")
#let rule = rgb("#ded9e9")
#set document(title: "Curriculum Vitae - Ze-Yu Xing", author: "Ze-Yu Xing")
#set page(paper: "a4", margin: (x: 18mm, top: 15mm, bottom: 14mm), footer: context [
  #set text(size: 7.5pt, fill: muted)
  #grid(columns: (1fr, auto), [Ze-Yu Xing - Curriculum Vitae], [#counter(page).display("1")])
])
#set text(font: ("DejaVu Sans", "Arial"), size: 9.3pt, fill: ink)
#set par(justify: false, leading: 0.58em)
#show link: set text(fill: accent)
#show heading.where(level: 1): it => {
  v(8pt)
  text(size: 10.5pt, weight: "bold", tracking: 0.08em, fill: accent, upper(it.body))
  v(2pt)
  line(length: 100%, stroke: 0.6pt + rule)
  v(4pt)
}
#let dated-entry(date, title, subtitle: none, body: none) = grid(
  columns: (25mm, 1fr), column-gutter: 4mm, align: (left, top),
  text(size: 8pt, fill: muted, date),
  [#strong(title)#if subtitle != none [\ #text(fill: muted, subtitle)]#if body != none [#v(1.5pt)#body]],
)
#let publication(year, title, authors, venue, url, note: none) = {
  dated-entry(year, link(url)[#title #text(size: 7.5pt)[↗]], subtitle: authors, body: [
    #emph(venue)#if note != none [\ #text(size: 8pt, fill: muted, note)]
  ])
  v(5pt)
}
#grid(
  columns: (1fr, auto), column-gutter: 8mm, align: (left, top),
  [#text(size: 24pt, weight: "bold", tracking: -0.035em)[Ze-Yu Xing]
   #v(2pt)
   #text(size: 11pt, weight: "medium", fill: accent)[PhD Candidate in Physics]],
  [#set text(size: 8.3pt)
   #align(right)[Institute of Physics, Chinese Academy of Sciences\
   Beijing, China\
   #link("https://xing-phys.github.io/")[xing-phys.github.io] · #link("https://github.com/xing-phys")[GitHub]]],
)
#v(5pt)
#line(length: 100%, stroke: 1.1pt + accent)

= Research Profile

PhD researcher working primarily on open quantum systems and non-equilibrium quantum dynamics. Research interests include quantum many-body dynamics, relaxation and transport, dissipation and decoherence, non-Hermitian physics, statistical mechanics, quantum information, quantum simulation, and connections with machine learning.

= Current Affiliation

#dated-entry([Current], [PhD Candidate], subtitle: [Institute of Physics, Chinese Academy of Sciences · Beijing, China])

= Research Interests

#grid(
  columns: (1fr, 1fr), column-gutter: 8mm, row-gutter: 2.5pt,
  [• Non-equilibrium quantum dynamics], [• Open quantum systems],
  [• Quantum many-body physics], [• Non-Hermitian physics],
  [• Statistical mechanics], [• Quantum information and simulation],
)

= Publications and Preprints

#publication([2026], [Geometry-adaptive formulation of non-Bloch bands in arbitrary dimensions and spectral instability], [*Ze-Yu Xing*, Yuncheng Xiong, and Haiping Hu], [Communications Physics 9, 127 (2026)], "https://doi.org/10.1038/s42005-026-02546-2", note: [Ze-Yu Xing and Yuncheng Xiong contributed equally.])

#publication([2025], [Universal spreading dynamics in quasiperiodic non-Hermitian systems], [*Ze-Yu Xing*, Shu Chen, and Haiping Hu], [Physical Review B 111, L180203 (2025)], "https://doi.org/10.1103/PhysRevB.111.L180203")

#publication([2024], [Non-Hermitian skin effect in arbitrary dimensions: non-Bloch band theory and classification], [Yuncheng Xiong, *Ze-Yu Xing*, and Haiping Hu], [Preprint, arXiv:2407.01296 (2024)], "https://arxiv.org/abs/2407.01296")

= Academic Profiles

#grid(
  columns: (1fr, 1fr), column-gutter: 8mm,
  [#strong[Google Scholar]  #link("https://scholar.google.com/citations?user=qwSu3ekAAAAJ&hl=en")[Profile ↗]],
  [#strong[ORCID]  #link("https://orcid.org/0009-0009-5655-0187")[0009-0009-5655-0187 ↗]],
)
#v(1fr)
#align(center)[#text(size: 7.5pt, fill: muted)[Last updated September 2026]]
