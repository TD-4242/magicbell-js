import glob from 'tiny-glob';
import path from 'path';
import prettier from 'prettier';
import fs from 'fs';

function readJSON(filepath) {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
}

async function getPackages() {
  return glob(`./packages/*/package.json`)
    .then((files) => files.map(file => [
      readJSON(file).name,
      path.dirname(file),
    ]));
}

function writeJson(filepath, json) {
  const data = prettier.format(JSON.stringify(json, null, 2), {
    parser: 'json',
  });

  fs.writeFileSync(filepath, data, 'utf-8');
}

function writePathsToTsConfig(pkgs) {
  const tsConfig = readJSON('./tsconfig.json');
  tsConfig.compilerOptions.paths = Object.fromEntries(
    pkgs.map(([k, v]) => [k, [`${v}/src`]])
  );

  writeJson('./tsconfig.json', tsConfig);
}

function writeAliasToExamplePackageJson(pkgs) {
  const pkgJson = readJSON('./example/package.json');

  const others = Object.entries(pkgJson.alias).filter(
    ([k, v]) => !v.startsWith('../packages/')
  );

  const locals = pkgs.map(([k, v]) => [k, `../${v}`]);
  pkgJson.alias = Object.fromEntries([...others, ...locals]);
  writeJson('./example/package.json', pkgJson);
}

getPackages().then(pkgs => {
  writePathsToTsConfig(pkgs);
  writeAliasToExamplePackageJson(pkgs);
});
