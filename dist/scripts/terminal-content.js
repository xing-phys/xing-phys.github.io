// Both views use content/*.json. No biography, paper, or project is copied here.
export function createTerminalProfile({about, research, projects, publications, notes, contact}) {
  return {
    about: [about.name, about.role, about.institution, about.location, '', about.bio].join('\n'),

    research: research.items.map(item => `${item.title}\n${item.description}`).join('\n\n'),

    projects: projects.items.map(item =>
      `${item.name} — ${item.title}\n${item.description}\n${item.url}`
    ).join('\n\n'),

    publications: publications.items.map(item => [
      `${item.year}  ${item.title}`,
      item.authors,
      item.venue,
      item.url,
      ...(item.preprint ? [`Preprint: ${item.preprint.label}`, item.preprint.url] : []),
      ...(item.authorNote ? [item.authorNote] : []),
    ].join('\n')).join('\n\n'),

    notes: notes.items.map(item =>
      `${item.category}\n${item.title}\n${item.description}\n${item.status}`
    ).join('\n\n'),

    contact: [
      about.name,
      about.institution,
      about.location,
      '',
      ...contact.links.map(link => `${link.label}: ${link.url}`),
    ].join('\n'),
  };
}
