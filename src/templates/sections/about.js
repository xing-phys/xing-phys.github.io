import {escapeHtml as text} from '../html.js';

export function renderAbout(about, site) {
  return `
      <section class="hero wrap" id="about">
        <div class="hero-copy">
          <p class="eyebrow">${text(about.eyebrow)}</p>
          <h1>${text(about.greeting)}<br><span>${text(about.name)}.</span><span class="hello" aria-hidden="true">✳</span></h1>
          <p class="intro">${text(about.role)}<br>${text(about.shortInstitution)}</p>
          <p class="bio">${text(about.bio)}</p>
          <div class="hero-actions">
            <a class="button" href="#research">${text(about.researchLinkLabel)} <span>↗</span></a>
            <a class="text-link" href="${text(site.cvUrl)}" target="_blank" rel="noopener">${text(about.cvLinkLabel)} <span>↗</span></a>
          </div>
          <p class="affiliation">${text(about.institution)}<br><span>${text(about.location)}</span></p>
        </div>
        <div class="hero-art">
          <div class="orbit-label">${text(about.artLabel)}</div>
          <canvas id="wave" aria-label="Animated abstract wave interference pattern"></canvas>
          <div class="art-caption">
            <span>${text(about.artCaption)}</span>
            <button id="pause-wave" aria-label="Pause wave animation">Pause motion Ⅱ</button>
          </div>
        </div>
      </section>
      <div class="wrap divider">
        <span>${text(about.dividerText)}</span>
        <a href="#research">${text(about.scrollLinkLabel)}</a>
      </div>`;
}
