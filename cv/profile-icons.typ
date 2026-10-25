#import "vendor/scienceicons-0.1.0/index.typ": website-icon, orcid-icon, github-icon

// Google Scholar path from Simple Icons, also used by the homepage in
// src/templates/profile-links.js. Pad it to match the vendored icons' sizing.
#let scholar-svg = ``` <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 28 28" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>```.text

#let scholar-icon(color: black, height: 1.1em, baseline: 13.5%) = {
  box(height: height, baseline: baseline,
    image(bytes(scholar-svg.replace("currentColor", color.to-hex()))))
}

// Monochrome vectors stay sharp and legible in printed copies.
#let profile-icon(id) = {
  let icons = (
    website: website-icon,
    scholar: scholar-icon,
    orcid: orcid-icon,
    github: github-icon,
  )
  let icon = icons.at(id)
  icon(color: black)
}
