// CSS crítico por página: inline das regras usadas pelo documento, resto de css/gw.css carregado sem bloquear.
// Uso: node tools/critical.mjs  (depois de node tools/pages.mjs). Requer beasties em /workspace/ultron/tools.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: Beasties } = await import(createRequire('/workspace/ultron/tools/node_modules/').resolve('beasties'));
const b = new Beasties({ path: ROOT, publicPath: '', preload: 'media', pruneSource: false, mergeStylesheets: true, reduceInlineStyles: false, fonts: false, keyframes: 'critical', compress: true, logLevel: 'warn' });
let tot = 0;
for (const f of fs.readdirSync(ROOT).filter(f => f.endsWith('.html'))) {
  let html = fs.readFileSync(`${ROOT}/${f}`, 'utf8');
  if (html.includes('data-critical')) continue;
  html = html.replace('<html lang="pt-PT">', '<html lang="pt-PT" class="js">');
  let out = await b.process(html);
  out = out.replace('<html lang="pt-PT" class="js">', '<html lang="pt-PT">').replace('<style>', '<style data-critical>');
  const m = out.match(/<style data-critical>([\s\S]*?)<\/style>/);
  const kb = m ? Buffer.byteLength(m[1]) / 1024 : 0; tot += kb;
  console.log(f, 'inline', kb.toFixed(1), 'KB');
  fs.writeFileSync(`${ROOT}/${f}`, out);
}
