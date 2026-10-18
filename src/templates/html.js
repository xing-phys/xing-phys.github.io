// Content is plain text. Escape it before inserting it into HTML or attributes.
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

export function lines(values) {
  return values.map(escapeHtml).join('<br>');
}

export function numberLabel(index) {
  return String(index + 1).padStart(2, '0');
}

export function tags(values) {
  return `<div class="tags">${values.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div>`;
}

export function sectionHeading(section, aside) {
  return `
    <div class="section-heading">
      <div>
        <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
        <h2>${escapeHtml(section.title)}<span>.</span></h2>
      </div>
      ${aside ?? `<p>${lines(section.description)}</p>`}
    </div>`;
}
