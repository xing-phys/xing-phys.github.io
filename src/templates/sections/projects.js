import {escapeHtml as text, sectionHeading, tags} from '../html.js';

export function renderProjects(projects) {
  return `
      <section class="section wrap projects" id="projects">
        ${sectionHeading(projects)}
        <div class="project-grid">
          ${projects.items.map(item => `
          <article class="project-card">
            <div class="project-top">
              <span class="project-mark">${text(item.symbol)}</span>
              <span class="project-status">${text(item.status)}</span>
            </div>
            <h3><a href="${text(item.url)}">${text(item.name)}: ${text(item.title)} ↗</a></h3>
            <p>${text(item.description)}</p>
            ${tags(item.tags)}
          </article>`).join('')}
        </div>
      </section>`;
}
