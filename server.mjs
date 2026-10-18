import http from 'node:http';
import {watch} from 'node:fs';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {build} from './scripts/build.mjs';
import {projectRoot} from './scripts/content.mjs';

const root = path.join(projectRoot, 'dist');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
};

await build();

// Serialize rebuilds so a series of editor saves cannot overwrite newer output.
let building = false;
let requested = false;
let timer;

async function rebuild() {
  requested = true;
  if (building) return;
  building = true;

  do {
    requested = false;
    try {
      await build();
      console.log('Rebuilt homepage. Refresh your browser to see changes.');
    } catch (error) {
      console.error(`Build failed: ${error.message}`);
    }
  } while (requested);

  building = false;
}

for (const directory of ['content', 'src']) {
  watch(path.join(projectRoot, directory), {recursive: true}, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 100);
  });
}

http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');

    const data = await readFile(file);
    response.setHeader('Content-Type', contentTypes[path.extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    response.end(data);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
