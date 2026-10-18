import {escapeHtml as text, numberLabel, sectionHeading, tags} from '../html.js';

export function renderResearch(research) {
  return `
      <section class="section wrap" id="research">
        ${sectionHeading(research)}
        <div class="research-grid">
          ${research.items.map((item, index) => `
          <article class="research-card">
            <span class="card-symbol">${text(item.symbol)}</span>
            <span class="card-index">${numberLabel(index)}</span>
            <h3>${text(item.title)}</h3>
            <p>${text(item.description)}</p>
            ${tags(item.tags)}
          </article>`).join('')}
        </div>
      </section>`;
}
