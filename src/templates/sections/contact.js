import {escapeHtml as text, lines} from '../html.js';

export function renderContact(contact) {
  return `
      <section class="contact wrap" id="contact">
        <p class="eyebrow">${text(contact.eyebrow)}</p>
        <h2>${lines(contact.title)}<span>.</span></h2>
        <p>${text(contact.description)}</p>
        <div class="profile-links">
          ${contact.links.map(link => `<a href="${text(link.url)}">${text(link.label)} ↗</a>`).join('\n          ')}
        </div>
      </section>`;
}
