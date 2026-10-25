// Selected template: basic-resume 0.2.9 by Stephen Xu.
// https://typst.app/universe/package/basic-resume/
#import "vendor/basic-resume-0.2.9/lib.typ": resume, edu
#import "profile-icons.typ": profile-icon

// Publications and profile links share the homepage's editable content files.
#let about = json("../content/about.json")
#let contacts = json("../content/contact.json").links
#let publications = json("../content/publications.json").items

#let palette = (
  body: rgb("#28333F"),
  name: rgb("#173E5C"),
  section: rgb("#176B73"),
  link: rgb("#245F91"),
  muted: rgb("#596777"),
)

// Typography and paper settings. The upstream layout supplies the name heading,
// entry helpers, and half-inch page margins.
#set page(footer: context align(right,
  text(size: 9pt, fill: palette.muted, counter(page).display("1 / 1", both: true))))
#show: resume.with(
  author: about.name,
  font: "New Computer Modern",
  font-size: 11pt,
  author-font-size: 24pt,
  paper: "a4",
  accent-color: palette.name.to-hex(),
)

#set document(title: "Curriculum Vitae - " + about.name, author: about.name)
#set text(fill: palette.body)
#set par(justify: false, leading: 0.65em, spacing: 0.75em)
#show link: set text(fill: palette.link)
// Let the content flow across pages with comfortable space around each section.
#show heading.where(level: 2): it => block(
  above: 18pt, below: 8pt, sticky: true,
  stack(dir: ttb, spacing: 5pt,
    text(size: 13.2pt, weight: "bold", fill: palette.section, smallcaps(it.body)),
    line(length: 100%, stroke: (paint: palette.section, thickness: 0.6pt)),
  ),
)

// Keep each citation together and emphasize the author's name in the author list.
#let publication(paper) = block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    strong(link(paper.url, paper.title)),
    text(fill: palette.muted, paper.year),
  )
  #v(4pt)
  #{
    let names = paper.authors.split(about.name)
    for (index, part) in names.enumerate() {
      if index > 0 { strong(about.name) }
      part
    }
  } \
  #text(fill: palette.muted, emph(paper.venue))
  #if "preprint" in paper [ · #link(paper.preprint.url, paper.preprint.label)]
  #if "authorNote" in paper [\ #text(size: 9.5pt, fill: palette.muted, paper.authorNote)]
]

#let award(title, institution, year) = block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    [#text(fill: palette.name, strong(title)), #text(fill: palette.muted, institution)],
    text(fill: palette.muted, year),
  )
]

// Print compact profile information while retaining the full clickable target.
#let profile-link(id, url) = {
  let target = if id == "scholar" { url.replace("&hl=en", "") } else { url }
  let display = if id == "orcid" {
    target.replace("https://orcid.org/", "")
  } else if id == "github" {
    target.replace("https://github.com/", "")
  } else {
    target.replace("https://", "")
  }
  (profile-icon(id, color: palette.link), link(target, display))
}

#block(breakable: false)[
  #text(fill: palette.name, weight: "semibold")[PhD Candidate in Physics] \
  #text(fill: palette.muted, about.institution)
  #v(6pt)
  #grid(
    columns: (12pt, 1fr),
    column-gutter: 6pt, row-gutter: 4pt,
    align: left + horizon,
    ..profile-link("website", "https://xing-phys.github.io/"),
    ..("scholar", "orcid", "github").map(id => {
      let contact = contacts.find(contact => contact.id == id)
      profile-link(id, contact.url)
    }).flatten(),
  )
]

== Research Profile

My research explores novel phenomena in quantum systems far from equilibrium, particularly in open quantum systems and quantum many-body dynamics. I am interested in the principles governing collective behavior and relaxation, and in how information theory and probability can deepen our understanding of these phenomena. Looking ahead, I aim to explore how AI can advance theoretical discovery and how insights from physics can contribute to quantum computing and new approaches to learning and computation.

== Education and Affiliation

#block(breakable: false)[
  #edu(
    institution: about.institution,
    location: text(fill: palette.muted, about.location),
    degree: "PhD Candidate in Physics",
    dates: text(fill: palette.muted)[Aug. 2022 - Present],
    consistent: true,
  )
]

#block(breakable: false)[
  #edu(
    institution: "Jilin University",
    location: text(fill: palette.muted)[Jilin, China],
    degree: "B.Sc. in Physics, Honors Program in Science",
    dates: text(fill: palette.muted)[Aug. 2018 - Jun. 2022],
    consistent: true,
  ) \
  GPA: 3.88/4.00 (93.2/100).
]

== Research Interests

Non-equilibrium quantum dynamics · Open quantum systems · Quantum many-body physics · Non-Hermitian physics · Statistical mechanics · Quantum information and simulation

== Ongoing Research Projects

#block(breakable: false)[
#strong(link("https://github.com/xing-phys/OYA-OQS")[OYA-OQS: Liouvillian Lieb-Schultz-Mattis Constraints in Open Quantum Systems])

Local, translationally invariant Lindbladians with strong U(1) symmetry and a unique steady state in a fixed-charge sector exhibit asymptotically gapless modes in the thermodynamic limit: long-wavelength modes at any filling, plus additional modes at wave vectors set by non-integer filling.
]

#block(breakable: false)[
#strong(link("https://github.com/xing-phys/ssb-qme")[Strong Quantum Mpemba Effect via Spontaneous Symmetry Breaking in Open Systems])

Spontaneous symmetry breaking enables the strong quantum Mpemba effect for discrete or continuous, strong or weak symmetries without delicate state engineering. States in the steady-state symmetry sector bypass slow modes and relax faster than closer states overlapping the slow manifold.
]

// Separate the research overview from the record of outputs and recognition.
#pagebreak(weak: true)

== Publications and Preprints

#for paper in publications {
  publication(paper)
  v(8pt)
}

== Talks and Presentations

#block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    text(fill: palette.name, strong[Symmetry-Enforced Strong Quantum Mpemba Effect]),
    text(fill: palette.muted)[2025],
  )
  19th Symposium for Young Scholars on Cold Atom Physics, Changsha, China.
]

== Honors and Awards

#award(
  [Director's Scholarship],
  [Institute of Physics, Chinese Academy of Sciences],
  [2025],
)
#award(
  [Ny Tsi-Ze Scholarship],
  [Institute of Physics, Chinese Academy of Sciences],
  [2020],
)
#award(
  [Honorable Mention, Mathematical Contest in Modeling],
  [Consortium for Mathematics and Its Applications],
  [2020],
)
#award(
  [National Scholarship],
  [Ministry of Education, People's Republic of China],
  [2019],
)
#award(
  [Outstanding Student of Jilin University],
  [Jilin University],
  [2019],
)
