import {escapeHtml as text, lines} from '../html.js';
import {renderProfileLinks} from '../profile-links.js';

export function renderContact(contact) {
  return `
      <section class="contact wrap" id="contact">
        <p class="eyebrow">${text(contact.eyebrow)}</p>
        <h2>${lines(contact.title)}<span>.</span></h2>
        <p>${text(contact.description)}</p>
        ${renderProfileLinks(contact.links)}
      </section>`;
}
