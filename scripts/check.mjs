import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const text = f => fs.readFileSync(path.join(root, f), 'utf8');
const pkg = JSON.parse(text('package.json'));
assert.equal(pkg.repository.url, 'https://github.com/outmanwt/dsh-team-fishbone.git');
assert.equal(pkg.license, 'MIT');
assert(pkg.dsh.bundle.patch);
for (const f of ['index.js', 'client.js', pkg.dsh.bundle.patch, 'icon.svg', 'README.md', 'LICENSE', 'locale/en.json', 'locale/zh.json']) assert(fs.statSync(path.join(root, f)).isFile(), f);
assert(text(pkg.dsh.bundle.patch).includes(pkg.name), 'Patch package name must match manifest');
for (const lang of ['zh', 'en']) {
  const dict = JSON.parse(text(`locale/${lang}.json`));
  assert(dict.meta.title && dict.meta.description);
}
new vm.Script(text('client.js'), { filename: 'client.js' });
const src = text('client.js');
function dictionary(name) {
  const match = src.match(new RegExp(`const ${name} = (\\{[\\s\\S]*?\\n\\t\\t\\});`));
  assert(match, `${name} dictionary missing`);
  return vm.runInNewContext(`(${match[1]})`, Object.create(null), { timeout: 1000 });
}
assert.deepEqual(Object.keys(dictionary('zh')).sort(), Object.keys(dictionary('en')).sort());
assert(!/gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|C:\\\\Users\\\\/i.test(src), 'Possible secret or personal path');
assert(src.includes("running: 'var(--dsw-alias-brand-primary)'"));
assert(src.includes("completed: 'var(--dsw-alias-state-success-primary)'"));
assert(text('icon.svg').includes('<svg'));
console.log(`PASS ${pkg.name}@${pkg.version}: syntax, bundle resources, locale parity, status colors and basic privacy checks`);
