// Selected template: basic-resume 0.2.9 by Stephen Xu.
// https://typst.app/universe/package/basic-resume/
#import "vendor/basic-resume-0.2.9/lib.typ": resume, edu

// Publications and profile links share the homepage's editable content files.
#let about = json("../content/about.json")
#let contacts = json("../content/contact.json").links
#let publications = json("../content/publications.json").items

// Typography and paper settings. The upstream layout supplies the section rules,
// small-cap headings, entry helpers, and half-inch page margins.
#show: resume.with(
  author: about.name,
  font: "New Computer Modern",
  font-size: 11pt,
  author-font-size: 24pt,
  paper: "a4",
  accent-color: "#242333",
)

#set document(title: "Curriculum Vitae - " + about.name, author: about.name)
#set par(justify: false, leading: 0.4em, spacing: 0.4em)

// Keep each citation together and emphasize the author's name in the author list.
#let publication(paper) = block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    strong(link(paper.url, paper.title)),
    paper.year,
  )
  #v(2pt)
  #{
    let names = paper.authors.split(about.name)
    for (index, part) in names.enumerate() {
      if index > 0 { strong(about.name) }
      part
    }
  } \
  #emph(paper.venue)
  #if "preprint" in paper [ · #link(paper.preprint.url, paper.preprint.label)]
  #if "authorNote" in paper [\ #text(size: 9pt, paper.authorNote)]
]

#let award(title, institution, year) = block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    [#strong(title), #institution], year,
  )
]

#text(size: 11pt)[PhD Candidate in Physics · #about.institution] \
#about.location · #link("https://xing-phys.github.io/")[Website]#for contact in contacts [ · #link(contact.url, contact.label)]

== Research Profile

My research explores novel phenomena in quantum systems far from equilibrium, particularly in open quantum systems and quantum many-body dynamics. I am interested in the principles governing collective behavior and relaxation, and in how information theory and probability can deepen our understanding of these phenomena. Looking ahead, I aim to explore how AI can advance theoretical discovery and how insights from physics can contribute to quantum computing and new approaches to learning and computation.

== Education and Affiliation

#block(breakable: false)[
  #edu(
    institution: about.institution,
    location: about.location,
    degree: "PhD Candidate in Physics",
    dates: "Aug. 2022 - Present",
    consistent: true,
  )
]

#block(breakable: false)[
  #edu(
    institution: "Jilin University",
    location: "Jilin, China",
    degree: "B.Sc. in Physics, Honors Program in Science",
    dates: "Aug. 2018 - Jun. 2022",
    consistent: true,
  ) \
  GPA: 3.88/4.00 (93.2/100).
]

== Research Interests

Non-equilibrium quantum dynamics · Open quantum systems · Quantum many-body physics · Non-Hermitian physics · Statistical mechanics · Quantum information and simulation

== Ongoing Research Projects

#strong(link("https://github.com/xing-phys/OYA-OQS")[OYA-OQS: Liouvillian Lieb-Schultz-Mattis Constraints in Open Quantum Systems])

Investigating spectral constraints in translationally invariant open quantum many-body systems with strong U(1) symmetry. The project combines analytical Weyl-sequence arguments with momentum-resolved exact diagonalization and tensor-network simulations of dissipative spin chains.

#strong(link("https://github.com/xing-phys/ssb-qme")[ssb-qme: Symmetry-Enforced Strong Quantum Mpemba Effect])

Developing a symmetry-based mechanism for strong quantum Mpemba effects in symmetry-broken open systems. Current work studies discrete parity and continuous U(1) symmetries through Liouvillian analysis and quantum-master-equation simulations.

== Publications and Preprints

#for paper in publications {
  publication(paper)
  v(5pt)
}

== Talks and Presentations

#block(breakable: false)[
  #grid(
    columns: (1fr, auto), column-gutter: 10pt,
    strong[Symmetry-Enforced Strong Quantum Mpemba Effect],
    [2025],
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
