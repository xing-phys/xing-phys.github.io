import {initNavigation} from './scripts/navigation.js';
import {initTerminal} from './scripts/terminal.js';
import {initTheme} from './scripts/theme.js';
import {initWave} from './scripts/wave.js';

const content = JSON.parse(document.querySelector('#portfolio-content').textContent);

document.querySelector('#current-year').textContent = new Date().getFullYear();

const wave = initWave();
initTheme(wave.draw);
initNavigation(content, wave.draw);
initTerminal(content);
