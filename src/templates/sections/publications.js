import {escapeHtml as text, numberLabel, sectionHeading} from '../html.js';

export function renderPublications(publications, contact) {
  const profile = contact.links.find(link => link.id === publications.profileLinkId);
  const profileLink = `<a class="text-link" href="${text(profile.url)}">${text(publications.profileLinkLabel)}</a>`;

  return `
      <section class="section wrap publications" id="publications">
        ${sectionHeading(publications, profileLink)}
        ${publications.items.map((item, index) => `
        <article class="publication">
          <span class="year">${text(item.year)}</span>
          <div>
            <h3><a href="${text(item.url)}">${text(item.title)} ↗</a></h3>
            <p>${text(item.authors)}</p>
            <a class="publication-meta" href="${text(item.url)}">${text(item.venue)}</a>${item.preprint ? ` · <a class="publication-meta" href="${text(item.preprint.url)}">${text(item.preprint.label)} ↗</a>` : ''}
            ${item.authorNote ? `<p class="author-note">${text(item.authorNote)}</p>` : ''}
          </div>
          <span class="paper-label">${numberLabel(index)}</span>
        </article>`).join('')}
      </section>`;
}
