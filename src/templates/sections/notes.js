import {escapeHtml as text, sectionHeading} from '../html.js';

export function renderNotes(notes) {
  return `
      <section class="section wrap" id="writing">
        ${sectionHeading(notes)}
        <div class="notes-grid">
          ${notes.items.map(item => `
          <article>
            <span class="note-category">${text(item.category)}</span>
            <h3>${text(item.title)}</h3>
            <p>${text(item.description)}</p>
            <span class="coming">${text(item.status)}</span>
          </article>`).join('')}
        </div>
      </section>`;
}
