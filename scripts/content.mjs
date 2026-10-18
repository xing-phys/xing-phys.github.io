import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));

// Required fields are checked during development and before deployment.
// A trailing '?' marks an optional field; arrays describe the shape of each item.
const heading = {eyebrow: 'string', title: 'string', description: ['string']};
const schemas = {
  about: {
    name: 'string', role: 'string', institution: 'string', shortInstitution: 'string',
    location: 'string', eyebrow: 'string', greeting: 'string', bio: 'string',
    researchLinkLabel: 'string', cvLinkLabel: 'string', artLabel: 'string',
    artCaption: 'string', dividerText: 'string', scrollLinkLabel: 'string',
  },
  research: {
    ...heading,
    items: [{symbol: 'string', title: 'string', description: 'string', tags: ['string']}],
  },
  projects: {
    ...heading,
    items: [{
      name: 'string', title: 'string', url: 'string', symbol: 'string',
      status: 'string', description: 'string', tags: ['string'],
    }],
  },
  publications: {
    eyebrow: 'string', title: 'string', profileLinkLabel: 'string', profileLinkId: 'string',
    items: [{
      year: 'string', title: 'string', authors: 'string', venue: 'string', url: 'string',
      'authorNote?': 'string', 'preprint?': {label: 'string', url: 'string'},
    }],
  },
  notes: {
    ...heading,
    items: [{category: 'string', title: 'string', description: 'string', status: 'string'}],
  },
  contact: {
    eyebrow: 'string', title: ['string'], description: 'string',
    links: [{id: 'string', label: 'string', url: 'string'}],
  },
  site: {
    titleSuffix: 'string', description: 'string', brand: 'string', cvUrl: 'string',
    navigation: [{label: 'string', href: 'string', 'newTab?': 'boolean'}],
    footerText: 'string', terminalLinkLabel: 'string', footerTerminalLinkLabel: 'string',
    terminal: {
      host: 'string', visitor: 'string', kicker: 'string', welcome: ['string'], footerText: 'string',
    },
  },
};

function validate(value, schema, field) {
  if (typeof schema === 'string') {
    if (typeof value !== schema) throw new Error(`${field} must be a ${schema}.`);
    return;
  }

  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) throw new Error(`${field} must be an array.`);
    value.forEach((item, index) => validate(item, schema[0], `${field}[${index}]`));
    return;
  }

  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error(`${field} must be an object.`);
  }

  for (const [key, childSchema] of Object.entries(schema)) {
    const optional = key.endsWith('?');
    const name = optional ? key.slice(0, -1) : key;
    if (optional && value[name] === undefined) continue;
    validate(value[name], childSchema, `${field}.${name}`);
  }
}

export function validateContent(content) {
  for (const [name, schema] of Object.entries(schemas)) {
    validate(content[name], schema, `content/${name}.json`);
  }

  if (content.site.terminal.welcome.length !== 2) {
    throw new Error('content/site.json.terminal.welcome must contain two lines.');
  }

  const linkIds = content.contact.links.map(link => link.id);
  if (new Set(linkIds).size !== linkIds.length) {
    throw new Error('content/contact.json.links must have unique ids.');
  }
  if (!linkIds.includes(content.publications.profileLinkId)) {
    throw new Error('content/publications.json.profileLinkId must match a link id in content/contact.json.');
  }

  return content;
}

export async function loadContent(root = projectRoot) {
  const content = {};
  for (const name of Object.keys(schemas)) {
    const filename = path.join(root, 'content', `${name}.json`);
    try {
      content[name] = JSON.parse(await readFile(filename, 'utf8'));
    } catch (error) {
      throw new Error(`Cannot read content/${name}.json: ${error.message}`);
    }
  }
  return validateContent(content);
}
