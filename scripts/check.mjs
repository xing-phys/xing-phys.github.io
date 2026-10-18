import {readdir} from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {projectRoot} from './content.mjs';

function checkFile(filename) {
  const result = spawnSync(process.execPath, ['--check', filename], {stdio: 'inherit'});
  if (result.status !== 0) throw new Error(`JavaScript check failed: ${filename}`);
}

async function checkJavaScript(directory) {
  for (const entry of await readdir(directory, {withFileTypes: true})) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await checkJavaScript(filename);
    } else if (/\.(m?js)$/.test(entry.name)) {
      checkFile(filename);
    }
  }
}

for (const directory of ['src', 'scripts', 'test']) {
  await checkJavaScript(path.join(projectRoot, directory));
}
await checkJavaScript(path.join(projectRoot, 'dist/scripts'));
checkFile(path.join(projectRoot, 'server.mjs'));
checkFile(path.join(projectRoot, 'dist/app.js'));
console.log('JavaScript syntax checks passed.');
