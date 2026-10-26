// Keep author names and contribution marks consistent in the visual and terminal views.
export function publicationAuthors(paper) {
  return paper.authors.split(', ').map(author => {
    const name = author.replace(/^and /, '');
    return {
      name,
      prefix: author.startsWith('and ') ? 'and ' : '',
      equal: (paper.equalContributors || []).includes(name),
    };
  });
}
