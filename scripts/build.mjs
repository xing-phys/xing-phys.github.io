import {cp, mkdir, readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {loadContent, projectRoot} from './content.mjs';
import {renderPage} from '../src/templates/page.js';

const styleFiles = ['base.css', 'homepage.css', 'terminal.css', 'responsive.css'];

export async function build() {
  const content = await loadContent();
  const html = renderPage(content);
  const styles = await Promise.all(styleFiles.map(async filename => {
    const css = await readFile(path.join(projectRoot, 'src/styles', filename), 'utf8');
    return `/* Source: src/styles/${filename} */\n${css}`;
  }));

  const output = path.join(projectRoot, 'dist');
  await mkdir(output, {recursive: true});
  await writeFile(path.join(output, 'index.html'), html);
  await writeFile(path.join(output, 'style.css'), `${styles.join('\n').trimEnd()}\n`);
  await cp(path.join(projectRoot, 'src/app.js'), path.join(output, 'app.js'));
  await cp(path.join(projectRoot, 'src/scripts'), path.join(output, 'scripts'), {recursive: true});
  // dist/cv.pdf is maintained by `npm run build:cv`, not regenerated here.
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    await build();
    console.log('Built dist/ from content/ and src/.');
  } catch (error) {
    console.error(`Build failed: ${error.message}`);
    process.exitCode = 1;
  }
}
