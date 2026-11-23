// Gera as páginas estáticas da v2 a partir de modelos. Uso: node tools/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as D from './data.mjs';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://rhuxta.github.io/gw-solucoes/';
const M = JSON.parse(fs.readFileSync(`${ROOT}/img/manifest.json`, 'utf8'));
const ROOMS = JSON.parse(fs.readFileSync(`${ROOT}/tools/rooms.json`, 'utf8'));
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const eur = n => n == null ? 'Sob orçamento' : n.toLocaleString('pt-PT').replace(/\s/g, '\u202f') + '\u202f€';

/* ---------- icons ---------- */
const I = {
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8Z"/><path d="M9 10V7a3 3 0 0 1 6 0v3"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 5 5"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.5 3.6-5.5 7-5.5s6.2 2 7 5.5"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.5" height="14"/><rect x="13.5" y="5" width="3.5" height="14"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  check: '<svg class="ck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.5"/><circle cx="17.5" cy="17.5" r="1.5"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z"/></svg>',
  ar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8V5h3M17 5h3v3M20 16v3h-3M7 19H4v-3"/><path d="M8 10h8v5H8z"/></svg>'
};
const WM = `<svg viewBox="0 0 22 24" aria-hidden="true"><path d="M11 1 1 9v14h20V9L11 1Z" fill="none" stroke="#161616" stroke-width="1.5"/><path d="M11 1 1 9v14h10V1Z" fill="#001141"/><path d="M11 13h6v6h-6Z" fill="none" stroke="#161616" stroke-width="1.5"/></svg>`;

/* ---------- responsive picture ---------- */
function pic(name, { alt = '', sizes = '100vw', cls = '', lazy = true, prio = false, vt = '', imgCls = '', ratio } = {}) {
  const m = M[name];
  if (!m) throw new Error('img em falta: ' + name);
  const set = ext => m.widths.map(w => `img/${name}-${w}.${ext} ${w}w`).join(', ');
  const def = m.widths[Math.min(1, m.widths.length - 1)];
  return `<picture${cls ? ` class="${cls}"` : ''}><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="img/${name}-${def}.webp" alt="${esc(alt)}" width="${m.w}" height="${m.h}"${imgCls ? ` class="${imgCls}"` : ''}${lazy && !prio ? ' loading="lazy" decoding="async"' : ''}${prio ? ' fetchpriority="high"' : ''}${vt ? ` style="view-transition-name:${vt}"` : ''}></picture>`;
}
const pImg = r => 'p-' + r.toLowerCase();
const P = Object.fromEntries(D.products.map(p => [p.ref, p]));

/* ---------- chrome ---------- */
const NAV = [['solucoes.html', 'Soluções', 'solucoes'], ['loja.html', 'Loja', 'loja'], ['servicos.html', 'Serviços', 'servicos'], ['sobre.html', 'Sobre', 'sobre'], ['contacto.html', 'Contacto', 'contacto']];
function head({ title, desc, url, page, extra = '', preloadImg = '', base = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="utf-8">
${base}<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${BASE}${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_PT">
<meta property="og:url" content="${BASE}${url}">
<meta property="og:image" content="${BASE}img/og-1200.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
<link rel="preload" href="fonts/IBMPlexSans-Regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/IBMPlexSans-Medium.woff2" as="font" type="font/woff2" crossorigin>
${preloadImg}<link rel="stylesheet" href="css/gw.css">
<script>document.documentElement.classList.add('js')</script>
${extra}<script defer src="js/data.js"></script>
<script defer src="js/site.js"></script>
</head>`;
}
function header(page, opts = {}) {
  const feat = P['UI-25'];
  const links = NAV.map(([h, l, k]) => k === 'loja'
    ? `<button type="button" class="mega-btn" aria-expanded="false" aria-controls="mega"${page === 'loja' || page === 'produto' ? ' aria-current="page"' : ''}>Loja</button>`
    : `<a href="${h}"${page === k ? ' aria-current="page"' : ''}>${l}</a>`).join('');
  return `<a class="skip" href="#main">Saltar para o conteúdo</a>
<header class="hdr" id="hdr">
  <div class="hdr-in">
    <a class="wm" href="index.html">${WM}<b>OW</b> <span>Soluções</span><span class="sr">, página inicial</span></a>
    <nav class="nav" aria-label="Principal">${links}</nav>
    <div class="hdr-r">
      <a class="ico-btn" href="loja.html#pesquisa" aria-label="Pesquisar na loja">${I.search}</a>
      <a class="ico-btn acct" href="conta.html" aria-label="Conta">${I.user}</a>
      <a class="ico-btn" href="cesto.html" aria-label="Cesto">${I.cart}<span class="cart-n" aria-hidden="true"></span></a>
      <a class="btn cta" href="orcamento.html">Pedir orçamento</a>
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="menu">Menu <i aria-hidden="true"></i></button>
    </div>
  </div>
  <div class="mega" id="mega" inert>
    <div class="grid">
      <div class="mega-col"><h2>Climatização</h2><a href="loja.html?cat=parede">Parede</a><a href="loja.html?cat=tecto">Tecto</a><a href="loja.html?cat=exterior">Exterior</a></div>
      <div class="mega-col"><h2>Ar e controlo</h2><a href="loja.html?cat=ventilacao">Ventilação</a><a href="loja.html?cat=controlo">Controlo</a><a href="loja.html?cat=acessorios">Acessórios</a></div>
      <div class="mega-col"><h2>Por divisão</h2><a href="loja.html?div=sala">Sala</a><a href="loja.html?div=quarto">Quarto</a><a href="loja.html?div=escritorio">Escritório</a><a href="loja.html?div=banho">Casa de banho</a></div>
      <div class="mega-col"><h2>Loja</h2><a href="loja.html">Ver tudo</a><a href="servicos.html">Planos de manutenção</a></div>
      <a class="mega-feat" href="${feat.slug}">${pic(pImg(feat.ref), { alt: '', sizes: '160px' })}<span><span class="small">Em destaque</span><br><b class="h3">${feat.name} ${feat.short}</b><br><span class="price">${eur(feat.price)}</span></span></a>
    </div>
  </div>
</header>
<nav class="menu" id="menu" aria-label="Menu" inert>
  <ul class="menu-links">${NAV.map(([h, l, k]) => `<li><a href="${h}"${page === k ? ' aria-current="page"' : ''}>${l}</a></li>`).join('')}</ul>
  <a class="menu-feat" href="${feat.slug}">${pic(pImg(feat.ref), { alt: '', sizes: '50vw' })}<span><span class="small">Em destaque</span><br><b>${feat.name} ${feat.short}</b><br><span class="price">${eur(feat.price)}</span></span></a>
  <div class="menu-foot"><a class="btn btn-wide" href="orcamento.html">Pedir orçamento ${I.arrow}</a></div>
</nav>`;
}
function footer() {
  const c = D.company;
  return `<footer class="ft">
  <div class="grid">
    <div class="ft-brand">
      <a class="wm" href="index.html">${WM}<b>OW</b> <span>Soluções</span><span class="sr">, página inicial</span></a>
      <p>Climatização e ventilação para casas e escritórios na linha de Cascais.</p>
      <address>${esc(c.address)}<br><a href="${c.telHref}">${c.tel}</a><br><a href="mailto:${c.email}">${c.email}</a><br>${c.hours}</address>
    </div>
    <nav class="ft-col" aria-label="Soluções"><h2>Soluções</h2><a href="solucoes.html">Diagnóstico</a><a href="orcamento.html">Pedir orçamento</a><a href="servicos.html">Instalação</a><a href="servicos.html#planos">Manutenção</a></nav>
    <nav class="ft-col" aria-label="Loja"><h2>Loja</h2><a href="loja.html?cat=parede">Parede</a><a href="loja.html?cat=tecto">Tecto</a><a href="loja.html?cat=ventilacao">Ventilação</a><a href="loja.html?cat=acessorios">Acessórios</a></nav>
    <nav class="ft-col" aria-label="Empresa"><h2>Empresa</h2><a href="sobre.html">Sobre</a><a href="contacto.html">Contacto</a><a href="conta.html">Conta</a><a href="cesto.html">Cesto</a></nav>
    <div class="ft-base"><span>© 2026 OW Soluções</span><span>NIF ${c.nif}</span><span class="demo">Versão de demonstração — conteúdos e preços fictícios</span></div>
  </div>
</footer>
<div class="toast" id="toast" role="status" aria-live="polite"><span id="toast-t"></span><a href="cesto.html">Ver cesto</a></div>`;
}
function page(file, { title, desc, page, body, hero = false, hdrFixed = false, extraHead = '', preloadImg = '', jsonld = '' }) {
  const baseTag = (extraHead.match(/<base[^>]*>\n?/) || [''])[0];
  extraHead = extraHead.replace(baseTag, '');
  const html0 = `${head({ title, desc, url: file === 'index.html' ? '' : file, page, base: baseTag, extra: extraHead + (jsonld ? `<script type="application/ld+json">${jsonld}</script>\n` : ''), preloadImg })}
<body data-page="${page}"${hero ? ' data-hero' : ''}${hdrFixed ? ' data-hdr="fixed"' : ''}>
${header(page)}
<main id="main">
${body}
</main>
${footer()}
</body>
</html>
`;
  // pré-divide os títulos .split em palavras (sem flash antes do JS)
  const html = html0.replace(/<(h1|h2|h3|p)([^>]*class="[^"]*\bsplit\b[^"]*"[^>]*)>([^<]+)<\/\1>/g, (m, t, a, txt) => {
    let i = 0;
    return `<${t}${a}><span class="sr">${txt.trim()}</span><span aria-hidden="true">${txt.trim().split(/\s+/).map(wd => `<span class="w"><span style="--i:${i++}">${wd}</span></span>`).join(' ')}</span></${t}>`;
  });
  fs.writeFileSync(`${ROOT}/${file}`, html.replace(/\n{3,}/g, '\n\n'));
  console.log('wrote', file);
}

/* ---------- reusable blocks ---------- */
function card(p, { feat = false, sizes = '(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 46vw', lazy = true, where = true } = {}) {
  const rr = ROOMS.rooms[p.rooms[0]];
  const box = rr ? `left:${rr[0][0]}%;top:${rr[0][1]}%;width:${(rr[1][0] - rr[0][0]).toFixed(2)}%;height:${(rr[2][1] - rr[0][1]).toFixed(2)}%` : '';
  const alt = M[p.insitu + '-45'] ? p.insitu + '-45' : p.insitu;
  const add = p.price == null
    ? `<a class="card-add" href="orcamento.html?ref=${p.ref}" aria-label="Pedir estudo para ${p.name}">${I.arrow}<span>Pedir estudo</span></a>`
    : `<button type="button" class="card-add" data-add="${p.ref}" aria-label="Adicionar ${p.name} ao cesto">${I.plus}<span>Adicionar</span></button>`;
  return `<article class="card${feat ? ' is-feat' : ''}" data-product data-ref="${p.ref}" data-cat="${p.cat}" data-ctx="${p.ctx}" data-fn="${p.fn}" data-rooms="${p.rooms.join(' ')}" data-price="${p.price ?? 99999}">
  <a class="card-link" href="${p.slug}">
    <div class="card-img">${pic(pImg(p.ref), { alt: `${p.name} ${p.short}`, sizes: feat ? '(min-width: 1024px) 22vw, (min-width: 768px) 60vw, 100vw' : sizes, lazy, imgCls: 'main', vt: 'p-' + p.ref.toLowerCase() })}${pic(alt, { alt: '', sizes, imgCls: 'alt' })}${where && rr ? `<span class="card-where" aria-hidden="true"><img src="img/corte-mini-320.webp" alt="" width="320" height="${Math.round(320 * ROOMS.h / ROOMS.w)}" loading="lazy"><i style="${box}"></i></span>` : ''}</div>
    <div class="card-body"><span class="card-name">${p.name}</span><span class="price${p.price == null ? ' q' : ''}">${eur(p.price)}</span><span class="card-meta">${p.short} · ${p.rooms.map(r => D.roomNames[r].toLowerCase()).join(', ')}</span></div>
  </a>
  ${add}
</article>`;
}
const bb = v => { const xs = v.map(p => p[0]), ys = v.map(p => p[1]); return { l: Math.min(...xs), t: Math.min(...ys), r: Math.max(...xs), b: Math.max(...ys) }; };
const pc = n => +n.toFixed(2) + '%';
function corte({ id = 'corte', cap = true, dark = false, sizes = '(min-width: 1024px) 58vw, 200vw', prio = false, tags = true, cotas = true } = {}) {
  const tg = tags ? Object.entries(ROOMS.rooms).map(([k, v]) => `<span class="c-tag" data-tag="${k}" style="left:${pc(bb(v).l)};top:${pc(bb(v).t)}">${D.roomNames[k]}</span>`).join('') : '';
  const lz = Object.entries(ROOMS.rooms).map(([k, v]) => {
    const b = bb(v), w = b.r - b.l, h = b.b - b.t, win = ROOMS.windows[k], u = ROOMS.units[k];
    return `<div class="luz" data-room="${k}" style="left:${pc(b.l)};top:${pc(b.t)};width:${pc(w)};height:${pc(h)};--wx:${pc((win[0] - b.l) / w * 100)};--wy:${pc((win[1] - b.t) / h * 100)};--ux:${pc((u[0] - b.l) / w * 100)};--uy:${pc((u[1] - b.t) / h * 100)}"></div>`;
  }).join('');
  const leds = Object.entries(ROOMS.units).map(([k, v]) => `<i class="c-led" data-led="${k}" style="left:${pc(v[0])};top:${pc(v[1])}"></i>`).join('');
  const s = bb(ROOMS.rooms.sala), bn = bb(ROOMS.rooms.banho);
  const ct = cotas ? `<span class="c-cota h" aria-hidden="true" style="left:${pc(s.l)};right:${pc(100 - bn.r)};top:${pc(s.b + 4.2)}"><span>8,40 m</span></span><span class="c-cota v" aria-hidden="true" style="left:${pc(s.l - 2.4)};top:${pc(s.t)};height:${pc(s.b - s.t)}"><span>2,80 m</span></span>` : '';
  return `<div class="corte-view" id="${id}"><div class="corte-stage">
    ${pic(dark ? 'corte-dark' : 'corte', { alt: dark ? 'Maquete da casa em corte, com todas as divisões às escuras' : 'Maquete da casa em corte: sala e casa de banho no rés-do-chão, quarto e escritório no piso de cima, sótão com arrumos', sizes, prio, lazy: !prio })}
    ${lz}${leds}${tg}${ct}
  </div></div>`;
}
function diagnosis({ withPhotos = false, h = 'Qual é o teu problema?', sub = 'Escolhe o que sentes em casa. A divisão acende na maquete.' } = {}) {
  const probs = D.problems.map(p => `<button type="button" class="opt" role="radio" aria-checked="false" data-problem="${p.id}" style="--sw:var(--${p.state})"><i class="sw" aria-hidden="true"></i>${p.label}${I.check}</button>`).join('');
  const rooms = Object.entries(D.roomNames).map(([k, v]) => `<button type="button" class="opt opt-room" role="radio" aria-checked="false" data-room="${k}"><i class="sw" aria-hidden="true"></i>${v}${I.check}</button>`).join('');
  const photos = withPhotos ? `<div class="sits" role="radiogroup" aria-label="Situação em casa">${D.problems.map(p => `<button type="button" class="sit" role="radio" aria-checked="false" data-problem="${p.id}" style="--sw:var(--${p.state})">${pic(p.img, { alt: '', sizes: '(min-width: 1024px) 24vw, 46vw' })}<i aria-hidden="true"></i><span>${p.label}</span></button>`).join('')}</div>` : '';
  return `<div class="diag" id="diag">
  <div class="diag-stage">
    ${corte({ id: 'corte' })}
    <p class="diag-cap"><span id="diag-cap">A casa inteira, em corte</span><span aria-hidden="true">Esc. 1:50</span></p>
  </div>
  <div class="diag-steps">
    <div class="diag-block">
      <div class="prog" aria-hidden="true"><i class="is-on"></i><i data-p2></i><span id="prog-t">1 de 2</span></div>
      <h2 class="h2 split" id="diag-h">${h}</h2>
      <p class="lede mt-12">${sub}</p>
      ${photos}
      <div class="opts" role="radiogroup" aria-labelledby="diag-h"${withPhotos ? ' hidden' : ''} id="probs">${probs}</div>
    </div>
    <div class="diag-block">
      <h3 class="h3" id="room-h">Em que divisão?</h3>
      <p class="small mt-6">Sugerimos uma. Podes trocar.</p>
      <div class="opts" role="radiogroup" aria-labelledby="room-h" id="rooms">${rooms}</div>
    </div>
    <p class="sr" aria-live="polite" id="diag-live"></p>
    <section class="res" id="res" hidden aria-labelledby="res-h">
      <div class="res-img"><img id="res-img" src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"></div>
      <div class="res-body">
        <p class="small" id="res-for">Para a sala que aquece</p>
        <h3 class="h3" id="res-h">Unidade de parede UI-25</h3>
        <p class="muted" id="res-text"></p>
        <dl class="res-nums">
          <div><dd><span class="num" data-m="0">31</span></dd><dt data-u="0">°C na divisão</dt></div>
          <div><dd><span class="num" data-m="1">42</span></dd><dt data-u="1">dB de ruído</dt></div>
          <div><dd><span class="num" data-m="2">—</span></dd><dt data-u="2">kWh/dia</dt></div>
        </dl>
        <div class="cmp"><span>Agora</span><input type="range" min="0" max="1" step="1" value="0" id="cmp" aria-label="Comparar agora com a solução" aria-valuetext="Agora"><span>Com a solução</span></div>
        <div class="row"><a class="btn" id="res-quote" href="orcamento.html">Pedir orçamento ${I.arrow}</a><a class="btn-2" id="res-prod" href="produto.html">Ver a peça ${I.arrow}</a></div>
        <p class="small mt-16">Valores indicativos para uma divisão de 20 m².</p>
      </div>
    </section>
  </div>
</div>`;
}
function video(name, { label, sizes45 = 'hero-45', sizes219 = 'hero-219', prio = false }) {
  return `<video muted playsinline loop preload="none" data-video aria-hidden="true" tabindex="-1">
      <source data-src="video/${name}-45.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' media="(max-width: 767px)">
      <source data-src="video/${name}-45.h264.mp4" type="video/mp4" media="(max-width: 767px)">
      <source data-src="video/${name}-2190.av1.mp4" type='video/mp4; codecs="av01.0.08M.08"'>
      <source data-src="video/${name}-2190.h264.mp4" type="video/mp4">
    </video>
    <button type="button" class="vid-btn" data-vid-btn aria-label="Pausar vídeo" hidden>${I.pause}</button>`;
}
function heroPicture(n45, n219, alt, prio = true) {
  const a = M[n45], b = M[n219];
  const s = (n, m, ext) => m.widths.map(w => `img/${n}-${w}.${ext} ${w}w`).join(', ');
  return `<picture>
      <source type="image/avif" media="(max-width: 767px)" srcset="${s(n45, a, 'avif')}" sizes="100vw">
      <source type="image/webp" media="(max-width: 767px)" srcset="${s(n45, a, 'webp')}" sizes="100vw">
      <source type="image/avif" srcset="${s(n219, b, 'avif')}" sizes="100vw">
      <source type="image/webp" srcset="${s(n219, b, 'webp')}" sizes="100vw">
      <img src="img/${n219}-${b.widths[0]}.webp" alt="${esc(alt)}" width="${b.w}" height="${b.h}"${prio ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>
    </picture>`;
}
const preloadHero = (n45, n219) => `<link rel="preload" as="image" type="image/avif" media="(max-width: 767px)" imagesrcset="${M[n45].widths.map(w => `img/${n45}-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">
<link rel="preload" as="image" type="image/avif" media="(min-width: 768px)" imagesrcset="${M[n219].widths.map(w => `img/${n219}-${w}.avif ${w}w`).join(', ')}" imagesizes="100vw" fetchpriority="high">
`;
const closing = (h = 'Diz-nos o que se passa em casa.', cta = 'Pedir orçamento') => `<section class="sec close" aria-labelledby="close-h"><div class="grid">
  <div class="close-h"><h2 class="d-l split" id="close-h">${h}</h2><p class="lede mt-16">Respondemos no mesmo dia útil, com uma proposta ou uma data para a visita.</p></div>
  <div class="close-a"><a class="btn" href="orcamento.html">${cta} ${I.arrow}</a></div>
</div></section>`;

/* ---------- css, data.js, sitemap ---------- */
const PAGES = [];
function finish() {
  const css = ['tokens.css', 'fonts.css', 'site.css'].map(f => fs.readFileSync(`${ROOT}/css/${f}`, 'utf8')).join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '\n').replace(/\n+/g, '\n').replace(/\s*([{};,>])\s*/g, '$1').replace(/;}/g, '}');
  fs.writeFileSync(`${ROOT}/css/gw.css`, `:root{--car:${ROOMS.w} / ${ROOMS.h}}` + css.trim() + '\n');
  const data = { products: D.products.map(p => ({ ref: p.ref, name: p.name, short: p.short, price: p.price, slug: p.slug })), problems: D.problems.map(p => ({ id: p.id, label: p.label, room: p.room })), answers: D.answers, recs: D.recs, comfort: D.comfort, comfortUnits: D.comfortUnits, roomNames: D.roomNames, rooms: { rooms: ROOMS.rooms, ar: ROOMS.h / ROOMS.w } };
  fs.writeFileSync(`${ROOT}/js/data.js`, '/* gerado por tools/build.mjs */\nwindow.GW=' + JSON.stringify(data) + ';\n');
  const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html') && f !== '404.html').sort((a, b) => a === 'index.html' ? -1 : b === 'index.html' ? 1 : a.localeCompare(b));
  fs.writeFileSync(`${ROOT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map(f => `  <url><loc>${BASE}${f === 'index.html' ? '' : f}</loc></url>`).join('\n')}\n</urlset>\n`);
  console.log('css', css.length, 'bytes; data.js; sitemap', files.length);
}

export { finish, I, WM, pic, pImg, P, page, card, corte, diagnosis, video, heroPicture, preloadHero, closing, eur, esc, D, ROOMS, M, BASE, ROOT };
