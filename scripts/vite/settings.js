// inspired by https://github.com/FormidableLabs/urql/blob/78368cf5bfcdd04bd663d8775d8883962128376b/scripts/rollup/settings.js

import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
export const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, './package.json'), 'utf-8'));

import {execSync} from "child_process";

export const revision = execSync(`git rev-parse HEAD`).toString('utf-8');

const normalize = name => name
  .replace(/[@\s\/.]+/g, ' ')
  .trim()
  .replace(/\s+/, '-')
  .toLowerCase();

export const normalizedName = normalize(pkg.name);

export const externalModules = ['fs', 'path', 'url'];
externalModules.push(...Object.keys(pkg.peerDependencies || {}));
externalModules.push(...Object.keys(pkg.devDependencies || {}));
externalModules.push(...Object.keys(pkg.dependencies || {}));
externalModules.push(...Object.keys(pkg.optionalDependencies || {}));

const externalPredicate = new RegExp(`^(${externalModules.join('|')})($|/)`);

export const isExternal = id => {
  if (id === 'babel-plugin-transform-async-to-promises/helpers')
    return false;

  return externalPredicate.test(id);
};

export const hasReact = externalModules.includes('react');
export const hasPreact = externalModules.includes('preact');
export const hasSvelte = externalModules.includes('svelte');
export const hasVue = externalModules.includes('vue');
export const mayReexport = hasReact || hasPreact || hasSvelte || hasVue;
export const isCI = !!process.env.CIRCLECI;
export const isAnalyze = !!process.env.ANALYZE;

export const globalModules = {};

if (hasReact) {
  Object.assign(globalModules, {
    'react': 'React',
    'react-dom': 'ReactDOM',
  });
}

export function createFilename(format, minify) {
  return [normalizedName, format, minify && 'min', 'js'].filter(Boolean).join('.')
}

export function createLibName(name) {
  return name.split('-').map(x => x === 'magicbell' ? 'MagicBell' : x[0].toUpperCase() + x.slice(1)).join('');
}
