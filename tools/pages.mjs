import fs from 'fs';
import { casaSlot, ROOM_ORDER, I, pic, pImg, P, page, card, corte, diagnosis, video, heroPicture, preloadHero, closing, eur, esc, D, ROOMS, M, BASE, finish } from './build.mjs';
const c = D.company;
const LD = JSON.stringify({ '@context': 'https://schema.org', '@type': 'HVACBusiness', name: 'OW Soluções', url: BASE, image: BASE + 'img/og-1200.jpg', address: { '@type': 'PostalAddress', streetAddress: 'Travessa do Farol 8', addressLocality: 'Cascais', postalCode: '2750-321', addressCountry: 'PT' }, telephone: '+351210000000', areaServed: ['Cascais', 'Oeiras', 'Sintra'] });


/* entrada única do funil: pela casa ou pelo problema (home e soluções) */
const PH = t => `<span class="phv">[${t}]</span>`;
const entry = ({ h = 'Por onde começamos?', id = 'entry-h', prio = false } = {}) => `<div class="grid en">
  <div class="en-head"><h2 class="h2 split" id="${id}">${h}</h2><p class="lede mt-16">Pela divisão ou pelo que sentes. Os dois caminhos levam ao mesmo pedido, já preenchido com o que escolheres.</p></div>
  <div class="en-casa"><p class="en-k">Pela casa</p>${casaSlot({ prio })}<ul class="en-rooms" data-3d-fallback="casa" aria-label="Começar por uma divisão">${ROOM_ORDER.map(k => `<li><a class="en-r" data-room="${k}" href="orcamento.html?divisao=${k}"><span>${D.roomNames[k]}</span>${I.arrow}</a></li>`).join('')}</ul></div>
  <div class="en-prob"><p class="en-k">Pelo problema</p><ul class="en-list">${D.problems.map(p => `<li><a class="en-a" href="orcamento.html?problema=${p.id}&amp;divisao=${p.room}"><i class="sw" style="--sw:var(--${p.state})" aria-hidden="true"></i><span>${p.label}</span>${I.arrow}</a></li>`).join('')}<li><a class="en-a" href="orcamento.html?problema=todo-ano"><i class="sw" aria-hidden="true"></i><span>Quero conforto o ano todo</span>${I.arrow}</a></li></ul>
  <p class="small mt-16">Já sabes a peça? <a class="lnk" href="loja.html">Escolhe na loja</a> e segue com instalação.</p></div>
</div>`;

/* =================== HOME =================== */
const feat4 = ['UI-25', 'TC-35', 'UE-50', 'TH-02'].map(r => P[r]);
page('index.html', {
  title: 'OW Soluções — O ar certo, em cada divisão.',
  desc: 'Climatização e ventilação na linha de Cascais. Começamos pelo que sentes em casa, propomos a peça certa, instalamos num dia e ficamos para a manutenção.',
  page: 'home', hero: true, jsonld: LD, preloadImg: preloadHero('hero-45', 'hero-219'),
  extraHead: '<script defer src="js/casa3d.js"></script>\n',
  body: `
<section class="hero" aria-labelledby="h1">
  <div class="grid">
    <div class="hero-h"><h1 class="d-xl split" id="h1">O ar certo, em cada divisão.</h1></div>
    <div class="hero-side">
      <p class="lede">Começamos pelo que sentes em casa e acabamos com a peça certa, entregue e instalada pela nossa equipa.</p>
      <div class="row"><a class="btn" href="orcamento.html">Pedir orçamento ${I.arrow}</a><a class="btn-2" href="#comecar">Começar pela casa ${I.arrow}</a></div>
    </div>
  </div>
  <div class="hero-media" data-video-wrap data-3d-slot="percurso">
    ${heroPicture('hero-45', 'hero-219', 'Sala em Cascais com luz da manhã na parede branca; uma mulher lê no sofá e uma unidade de parede discreta fica alta na parede')}
    ${video('hero', {})}
  </div>
</section>

<section class="sec on-cut" aria-labelledby="entry-h" id="comecar">
  ${entry({})}
</section>

<section class="sec-tight" aria-label="Porque a OW">
  <div class="wrap facts">
    <div class="fact up"><b>Visita antes de pagar</b><span>Validamos a casa e o equipamento. Só pagas depois de confirmado.</span></div>
    <div class="fact up"><b>Entregue em casa</b><span>O fornecedor entrega o equipamento na tua morada. A OW instala.</span></div>
    <div class="fact up"><b>1.ª manutenção incluída</b><span>No pacote completo, com contrato de manutenção opcional.</span></div>
  </div>
</section>

<section class="sec on-2" aria-labelledby="eq-h">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2 split" id="eq-h">Peças pensadas para ficar à vista.</h2>
      <div class="rail-ctl" data-rail-ctl="eq"><button type="button" data-prev aria-label="Anterior">${I.left}</button><output aria-live="polite">1 / 4</output><button type="button" data-next aria-label="Seguinte">${I.right}</button></div>
    </div>
    <div class="rail" id="eq" tabindex="0" role="region" aria-label="Equipamentos em destaque">${feat4.map(p => card(p, { sizes: '(min-width: 1024px) 24vw, (min-width: 768px) 45vw, 78vw', where: false })).join('')}</div>
    <p class="mt-24"><a class="btn-2" href="loja.html">Ver a loja toda ${I.arrow}</a></p>
  </div>
</section>

<section class="sec how" aria-labelledby="how-h">
  <div class="grid">
    <figure class="how-img bleed-m rv">${pic('oficio', { alt: 'Mãos de um técnico com luvas a nivelar o suporte de uma unidade numa parede branca, com o chão protegido', sizes: '(min-width: 1024px) 48vw, 100vw' })}</figure>
    <div class="how-txt full-m">
      <h2 class="h2 split" id="how-h">Como trabalhamos.</h2>
      <ol class="steps" data-steps><span class="steps-bar" aria-hidden="true"></span>
        <li class="step"><span class="num" aria-hidden="true">1</span><h3 class="h3">Pedes online</h3><p class="muted">A casa, as divisões e o que sentes. Recebes logo uma estimativa com instalação e marcas a visita técnica.</p></li>
        <li class="step"><span class="num" aria-hidden="true">2</span><h3 class="h3">Validamos em casa</h3><p class="muted">Medimos, escolhemos a parede e confirmamos o equipamento certo. Só aí pagas.</p></li>
        <li class="step"><span class="num" aria-hidden="true">3</span><h3 class="h3">Entregamos e instalamos</h3><p class="muted">O fornecedor entrega em tua casa. Depois marcas a instalação, e a 1.ª manutenção fica registada na conta.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="sec on-2 mnt" aria-labelledby="mnt-h">
  <div class="grid">
    <div class="mnt-txt full-m">
      <h2 class="h2 split" id="mnt-h">Depois da instalação, ficamos.</h2>
      <p class="lede mt-16">Revisões, filtros e o histórico de cada equipamento, numa conta simples.</p>
      <figure class="mnt-img rv mt-32">${pic('manutencao', { alt: 'Mãos a retirar o filtro de uma unidade de parede branca', sizes: '(min-width: 1024px) 36vw, 100vw' })}</figure>
      <p class="mt-24"><a class="btn-2" href="servicos.html#planos">Planos de manutenção ${I.arrow}</a></p>
    </div>
    <div class="mnt-ui full-m">
      <div class="mock" role="figure" aria-label="Área de cliente: pré-visualização">
        <div class="mock-h"><span>A minha casa · Cascais</span><span class="data">3 equipamentos</span></div>
        <div class="mock-row"><img src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-25 · Sala</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge">Revisão a 12 mar</span></div>
        <div class="mock-row"><img src="img/p-ui-12-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-12 · Quarto</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge warn">Filtro a trocar</span></div>
        <div class="mock-row"><img src="img/p-vx-01-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>VX-01 · Casa de banho</b><span class="data">Instalada a 2 abr 2026</span></div><span class="badge">Em dia</span></div>
        <p class="mt-20"><a class="btn-2" href="conta.html">Abrir a conta ${I.arrow}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="band" aria-labelledby="sobre-h">
  ${heroPicture('cascais-45', 'cascais-219', 'Rua de Cascais com casas brancas e céu limpo', false)}
  <div class="band-txt grid"><div><h2 class="h2" id="sobre-h">De Cascais, para a linha.</h2><p>Somos uma equipa pequena, com técnicos próprios, a trabalhar em casas com luz de mar e paredes antigas.</p><p class="mt-16"><a class="btn-2" href="sobre.html">Conhecer a OW ${I.arrow}</a></p></div></div>
</section>

${closing('Diz-nos o que se passa em casa.', 'Pedir orçamento com instalação')}
`});

/* =================== SOLUÇÕES =================== */
page('solucoes.html', {
  title: 'Soluções — Por divisão ou por problema · OW Soluções',
  desc: 'Calor, frio, ar parado ou humidade: começa pela divisão ou pelo problema e recebe uma estimativa com instalação.',
  page: 'solucoes',
  extraHead: '<script defer src="js/casa3d.js"></script>\n',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full">
  <h1 class="d-l split" id="h1">Começa pelo que sentes.</h1>
  <p class="lede">Escolhe a divisão ou o problema. Abrimos o pedido já preenchido, com a estimativa e a visita técnica no fim.</p>
</div></div></section>
<section class="sec on-cut" style="padding-top:48px" aria-labelledby="entry-h">
  ${entry({ h: 'O que se passa em casa?', prio: true })}
</section>
<section class="sec" aria-labelledby="sol-h">
  <div class="wrap">
    <h2 class="h2 split" id="sol-h">Quatro problemas, quatro caminhos.</h2>
    <div class="duo mt-48">
      <figure class="rv">${pic('sit-quente', { alt: 'Sol forte numa parede branca', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Calor.</b> Unidade de parede ou de tecto, com potência medida para a divisão. <a class="lnk" href="orcamento.html?problema=quente&amp;divisao=sala">Começar por aqui</a></figcaption></figure>
      <figure class="rv">${pic('sit-frio', { alt: 'Quarto com azulejo azul e luz fria', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Frio.</b> Bomba de calor silenciosa, pensada para a noite. <a class="lnk" href="orcamento.html?problema=frio&amp;divisao=quarto">Começar por aqui</a></figcaption></figure>
      <figure class="rv">${pic('sit-parado', { alt: 'Sombra de janela numa parede, com cortina', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Ar parado.</b> Ventilação com caixa compacta, sem abrir janelas. <a class="lnk" href="orcamento.html?problema=parado&amp;divisao=escritorio">Começar por aqui</a></figcaption></figure>
      <figure class="rv">${pic('sit-humidade', { alt: 'Vidro embaciado com gotas', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Humidade.</b> Temperatura estável e extração pontual. <a class="lnk" href="orcamento.html?problema=humidade&amp;divisao=banho">Começar por aqui</a></figcaption></figure>
    </div>
  </div>
</section>
${closing('Preferes que alguém veja?', 'Pedir orçamento e visita')}
`});

/* =================== LOJA =================== */
const order = ['UI-25', 'UI-12', 'TC-35', 'UE-50', 'VX-01', 'TH-02', 'CS-60', 'MC-80', 'VT-20', 'FL-04'];
const fCount = (key, val) => D.products.filter(p => key === 'rooms' ? p.rooms.includes(val) : p[key] === val).length;
const filters = (pfx) => `
  <div class="side-mini" aria-hidden="true"><img src="img/corte-mini-320.webp" alt="" width="320" height="200" loading="lazy">${Object.entries(ROOMS.rooms).map(([k, v]) => `<i data-mini="${k}" style="left:${v[0][0]}%;top:${v[0][1]}%;width:${(v[1][0] - v[0][0]).toFixed(2)}%;height:${(v[2][1] - v[0][1]).toFixed(2)}%"></i>`).join('')}</div>
  <details class="fgroup" open><summary>Divisão</summary><ul>${Object.entries(D.roomNames).map(([k, v]) => `<li><label class="chk"><input type="checkbox" name="rooms" value="${k}"> ${v}<em>${fCount('rooms', k)}</em></label></li>`).join('')}</ul></details>
  <details class="fgroup" open><summary>Contexto</summary><ul><li><label class="chk"><input type="checkbox" name="ctx" value="residencial"> Residencial<em>${fCount('ctx', 'residencial')}</em></label></li><li><label class="chk"><input type="checkbox" name="ctx" value="comercial"> Comercial<em>${fCount('ctx', 'comercial')}</em></label></li></ul></details>
  <details class="fgroup" open><summary>Função</summary><ul>${[['climatizacao', 'Climatização'], ['ventilacao', 'Ventilação'], ['controlo', 'Controlo'], ['manutencao', 'Manutenção']].map(([k, v]) => `<li><label class="chk"><input type="checkbox" name="fn" value="${k}"> ${v}<em>${fCount('fn', k)}</em></label></li>`).join('')}</ul></details>
  <details class="fgroup"${pfx === 's' ? '' : ' open'}><summary>Preço</summary><ul>${[['0-100', 'Até 100 €'], ['100-500', '100 a 500 €'], ['500-99998', 'Mais de 500 €'], ['99999-99999', 'Sob orçamento']].map(([k, v]) => `<li><label class="chk"><input type="checkbox" name="price" value="${k}"> ${v}</label></li>`).join('')}</ul></details>`;
const cards = [];
order.forEach((r, i) => {
  cards.push(card(P[r], { feat: i === 0, lazy: i > 2 }));
  if (i === 6) cards.push(`<a class="tile" href="servicos.html" data-tile>${pic('oficio', { alt: '', sizes: '(min-width: 1024px) 48vw, 100vw' })}<p>Cada peça da loja pode seguir como pacote, com instalação pela OW.<span>Ver serviços</span></p></a>`);
});
page('loja.html', {
  title: 'Loja — Climatização e ventilação · OW Soluções',
  desc: 'Unidades de parede e de tecto, unidades exteriores, ventilação, termóstatos e filtros. Filtra por divisão, contexto e função.',
  page: 'loja', hdrFixed: true,
  body: `
<div class="grid shop-top">
  <h1 class="d-l split" id="h1">Loja</h1>
  <p class="lede">Peças para cada divisão, vendidas com instalação pela nossa equipa.</p>
  <div class="shop-meta"><span class="small" data-count>10 artigos</span><label class="sort">Ordenar <select data-sort aria-label="Ordenar artigos"><option value="rel">Relevância</option><option value="asc">Preço, do mais baixo</option><option value="desc">Preço, do mais alto</option></select></label></div>
</div>
<div class="tabs" id="pesquisa"><div class="tabs-in" role="group" aria-label="Categoria">${D.cats.map(([k, v], i) => `<button type="button" class="tab" data-cat="${k}" aria-pressed="${i === 0}">${v}</button>`).join('')}</div></div>
<div class="grid shop">
  <aside class="shop-side" aria-label="Filtros"><form data-filters="d">${filters('d')}</form></aside>
  <div class="active-f" data-active role="group" aria-label="Filtros ativos"></div>
  <p class="sr" aria-live="polite" data-live></p>
  <div class="pgrid" data-grid>${cards.join('')}
    <div class="empty" data-empty hidden><p class="h3">Nenhuma peça com estes filtros.</p><p class="muted" style="margin:8px 0 16px">Tira um filtro, ou pede-nos um estudo à medida.</p><button type="button" class="btn-2" data-clear>Limpar filtros</button></div>
  </div>
</div>
<div class="fbar"><button type="button" data-sheet-open aria-expanded="false" aria-controls="sheet">Filtrar <span data-fn-count></span></button><div class="sortw"><label>Ordenar<select data-sort aria-label="Ordenar artigos"><option value="rel">Relevância</option><option value="asc">Preço, do mais baixo</option><option value="desc">Preço, do mais alto</option></select></label></div></div>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-h" inert>
  <div class="sheet-grip" data-grip aria-hidden="true"></div>
  <div class="sheet-h"><h2 id="sheet-h">Filtrar</h2><button type="button" class="ico-btn" data-sheet-close aria-label="Fechar filtros">${I.plus.replace('<svg', '<svg style="transform:rotate(45deg)"')}</button></div>
  <form class="sheet-b" data-filters="s">${filters('s')}</form>
  <div class="sheet-f"><button type="button" class="btn-2" data-clear>Limpar</button><button type="button" class="btn" data-sheet-close data-see>Ver 10 artigos</button></div>
</div>
<div class="sheet-bg" data-sheet-close></div>
`});

/* =================== PRODUTO (one page per product) =================== */
const also = r => ['FL-04', 'TH-02', 'VT-20', 'UE-50', 'VX-01'].filter(x => x !== r).slice(0, 3).map(x => P[x]);
for (const p of D.products) {
  const is25 = p.ref === 'UI-25';
  const gal = is25
    ? [['p-ui-25-hi', 'Unidade de parede UI-25, vista a três quartos', 'p'], ['p-ui-25-front', 'UI-25 vista de frente', 'p sq'], ['p-ui-25-detail', 'Detalhe do LED e da aleta da UI-25', 'p sq'], ['sala-32', 'UI-25 instalada numa sala em Cascais', 'wide']]
    : [[pImg(p.ref), `${p.name} ${p.short}`, 'p'], [M[p.insitu] ? p.insitu : p.insitu + '-45', `${p.name} em contexto`, 'wide']];
  const roomRec = p.rooms[0];
  const isAcc = ['controlo', 'manutencao'].includes(p.fn);
  const fun = `orcamento.html?ref=${p.ref}&amp;divisao=${roomRec}`;
  const cta = isAcc
    ? `<button type="button" class="btn" data-add="${p.ref}">Adicionar ao cesto</button><a class="btn-2" href="${fun}">Juntar a um pedido com instalação ${I.arrow}</a>`
    : `<a class="btn" href="${fun}">${p.price == null ? 'Pedir estudo com instalação' : 'Comprar com instalação'} ${I.arrow}</a>${p.price == null ? '' : `<button type="button" class="btn-2" data-add="${p.ref}">Juntar ao cesto, como pacote</button>`}`;
  const pk = isAcc ? '' : `<dl class="pk"><div><dt>Equipamento</dt><dd>${p.price == null ? PH('preço €') : eur(p.price)}</dd></div><div><dt>Instalação OW</dt><dd>${PH('preço €')}</dd></div><div class="pk-t"><dt>Pacote com instalação</dt><dd>${PH('de €')} – ${PH('até €')}</dd></div></dl>
      <p class="small mt-12">Preço fechado na visita técnica. Só pagas depois de confirmarmos o equipamento certo.</p>`;
  const bodyP = `
<div class="grid pp" data-ref="${p.ref}">
  <nav class="crumb pp-crumb full" aria-label="Caminho"><a href="loja.html">Loja</a><span aria-hidden="true">/</span><a href="loja.html?cat=${p.cat}">${D.cats.find(c => c[0] === p.cat)[1]}</a></nav>
  <div class="pp-head"><h1 class="d-l pp-name">${p.name} ${p.short}</h1><p class="pp-price-m" aria-hidden="true">${eur(p.price)}</p></div>
  <div class="pp-media" data-3d-slot="produto" data-3d-ref="${p.ref}">
    <div class="gal" id="gal" tabindex="0" role="region" aria-label="Imagens do produto">${gal.map((g, i) => `<figure class="${g[2]}">${pic(g[0], { alt: g[1], sizes: '(min-width: 1024px) 56vw, 100vw', prio: i === 0, lazy: i > 0, vt: i === 0 ? 'p-' + p.ref.toLowerCase() : '' })}</figure>`).join('')}</div>
    <div class="gal-ind" aria-hidden="true">${gal.map((g, i) => `<i${i === 0 ? ' class="is-on"' : ''}></i>`).join('')}</div>
    ${is25 ? `<button type="button" class="btn-3d" data-goto-3d>${I.cube} Ver em 3D</button>` : ''}
  </div>
  <div class="pp-side">
    <div class="pp-buy" id="buy">
      <p class="short">${p.desc}</p>
      <div class="price-l">${eur(p.price)}</div>
      <p class="vat">${p.price == null ? 'Preço depois da visita técnica' : (isAcc ? 'IVA incluído' : 'Equipamento · IVA incluído')}</p>
      ${pk}
      <p class="mt-12"><span class="badge${p.price == null ? ' q' : ''}">${p.stock}</span></p>
      <fieldset class="fs-0 mt-20"><legend class="lbl">${p.fn === 'climatizacao' ? 'Potência' : 'Versão'}</legend>
        <div class="seg">${p.power.map((v, i) => `<label><input type="radio" name="pw" value="${esc(v)}"${i === 0 ? ' checked' : ''}><span>${v}</span></label>`).join('')}</div>
      </fieldset>
      <div class="pp-cta" id="comprar">${cta}</div>
      <ul class="pp-assure"><li>${I.shield}<span>Visita técnica primeiro. Pagas só quando o equipamento certo estiver confirmado.</span></li><li>${I.truck}<span>O fornecedor entrega em tua casa. Prazo: ${PH('a confirmar')}.</span></li><li>${I.tool}<span>Marcas a instalação depois da entrega. 1.ª manutenção incluída no pacote completo.</span></li></ul>
    </div>
  </div>
</div>
<nav class="chap" aria-label="Capítulos"><div class="chap-in">
  <a href="#visao" class="is-on" aria-current="true">Visão geral</a><a href="#casa">Na casa</a>${is25 ? '<a href="#pecas">Peça a peça</a>' : ''}<a href="#spec">Especificações</a><a href="#inst">Instalação</a>
</div></nav>
<div class="pp-flow">
<div class="pp-rail"><aside class="pp-stick" aria-label="Comprar ${p.name} ${p.short}">
  <p class="pp-stick-n">${p.name} ${p.short}</p>
  <div class="price-l">${eur(p.price)}</div>
  <p class="vat">${isAcc ? 'IVA incluído' : `Pacote com instalação: ${PH('de €')} – ${PH('até €')}`}</p>
  <div class="pp-cta">${cta}</div>
</aside></div>
<section class="sec ch" data-chapter="visao" id="visao" aria-labelledby="visao-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="visao-h">${p.lede}</h2>
  <dl class="keys">${p.key.map(k => `<div><dd><span class="num">${k[0]}${k[1] ? `<small>${k[1]}</small>` : ''}</span></dd><dt>${k[2]}</dt></div>`).join('')}</dl>
  <figure class="ov-img rv">${pic(is25 ? 'insitu-parede' : (M[p.insitu] ? p.insitu : p.insitu + '-45'), { alt: `${p.name} numa casa`, sizes: '(min-width: 1024px) 56vw, 100vw' })}</figure>
</div></div></section>
<section class="sec on-cut ch" data-chapter="casa" id="casa" aria-labelledby="casa-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="casa-h">Fica na ${D.roomNames[roomRec].toLowerCase()}${p.cat === 'parede' ? ', a 2,1 m do chão' : ''}.</h2>
  <div class="corte-box" data-corte-fixed="${roomRec}">${corte({ id: 'corte-p', sizes: '(min-width: 1024px) 56vw, 200vw' })}</div>
  <p class="diag-cap pi-0"><span>${D.roomNames[roomRec]} · com a solução instalada</span><span aria-hidden="true">Esc. 1:50</span></p>
</div></div></section>
${is25 ? `<section class="sec ch xpl-sec" data-chapter="pecas" id="pecas" aria-labelledby="pecas-h"><div class="grid"><div class="ch-main xpl-pin">
  <h2 class="h2 ch-h split" id="pecas-h">Peça a peça.</h2>
  <div class="xpl" data-xpl>
    <div class="xpl-view">
      <img class="xpl-closed" src="img/p-ui-25-closed-1200.webp" srcset="img/p-ui-25-closed-800.webp 800w, img/p-ui-25-closed-1200.webp 1200w, img/p-ui-25-closed-1600.webp 1600w" sizes="(min-width: 1024px) 58vw, 100vw" alt="UI-25 fechada" width="1600" height="1000" loading="lazy">
      <img class="xpl-open" src="img/p-ui-25-explode-1200.webp" srcset="img/p-ui-25-explode-800.webp 800w, img/p-ui-25-explode-1200.webp 1200w, img/p-ui-25-explode-1600.webp 1600w" sizes="(min-width: 1024px) 58vw, 100vw" alt="UI-25 em vista explodida: chassis, ventilador, permutador, filtro e frente" width="1600" height="1000" loading="lazy">
      <span class="call" style="left:72%;top:24%"><span data-n="1">Frente</span></span>
      <span class="call" style="left:57%;top:31%"><span data-n="2">Filtro</span></span>
      <span class="call" style="left:41%;top:21%"><span data-n="3">Permutador</span></span>
      <span class="call" style="left:17%;top:47%"><span data-n="4">Ventilador</span></span>
    </div>
    <div class="xpl-ctl"><span>Fechada</span><input type="range" min="0" max="100" value="0" step="1" data-xpl-range aria-label="Abrir a peça" aria-valuetext="Fechada"><span>Aberta</span></div>
    <div class="xpl-bt"><button type="button" class="btn-2" data-load-3d>${I.cube} Rodar em 3D</button><button type="button" class="btn-2" data-ar hidden>${I.ar} Ver na minha parede</button></div>
  </div>
  <ol class="calls-list"><li><div><b>Frente</b><span>Painel liso, abre para cima para trocar o filtro.</span></div></li><li><div><b>Filtro</b><span>Lavável, com troca anual registada na conta.</span></div></li><li><div><b>Permutador</b><span>Alumínio e cobre; é aqui que o calor muda de sítio.</span></div></li><li><div><b>Ventilador</b><span>Tangencial, de baixa rotação: 19 dB(A) no modo noite.</span></div></li></ol>
</div></div></section>` : ''}
<section class="sec on-2 ch" data-chapter="spec" id="spec" aria-labelledby="spec-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="spec-h">Especificações</h2>
  <table class="spec" data-spec><caption class="sr">Especificações técnicas de ${p.name} ${p.short}</caption><tbody>${p.specs.map((s, i) => `<tr${i >= 6 ? ' class="more"' : ''}><th scope="row">${s[0]}</th><td>${s[1]}</td></tr>`).join('')}</tbody></table>
  ${p.specs.length > 6 ? `<p class="mt-16"><button type="button" class="btn-2" data-spec-all aria-expanded="false">Ver todas (${p.specs.length})</button></p>` : ''}
</div></div></section>
</div>
<section class="sec ch" data-chapter="inst" id="inst" aria-labelledby="inst-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="inst-h">Com instalação, por esta ordem.</h2>
  <figure class="inst-img rv">${pic('oficio', { alt: 'Técnico a nivelar o suporte da unidade', sizes: '(min-width: 1024px) 56vw, 100vw' })}</figure>
  <ol class="ol-steps"><li>Visita técnica para medir e confirmar o equipamento certo.</li><li>Preço fechado. Só então pagas.</li><li>O fornecedor entrega o equipamento em tua casa.</li><li>Com a entrega confirmada, marcas a instalação. Lembramos-te 48 h e 2 h antes.</li><li>1.ª manutenção incluída no pacote completo.</li></ol>
  <a class="btn" href="${fun}">${isAcc ? 'Juntar a um pedido com instalação' : 'Comprar com instalação'} ${I.arrow}</a>
</div></div></section>
<section class="sec on-2" aria-labelledby="also-h"><div class="wrap">
  <h2 class="h2 split mb-48" id="also-h">Também vais precisar.</h2>
  <div class="rail">${also(p.ref).map(x => card(x, { sizes: '(min-width: 1024px) 24vw, 78vw', where: false })).join('')}</div>
</div></section>
<div class="buybar" id="buybar" aria-hidden="true"><div class="bb-t"><b>${p.name} ${p.short}</b><span>${eur(p.price)}</span></div>${isAcc ? `<button type="button" class="btn" data-add="${p.ref}" tabindex="-1">Adicionar</button>` : `<a class="btn" href="${fun}" tabindex="-1">${p.price == null ? 'Pedir estudo' : 'Comprar com instalação'}</a>`}</div>
`;
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: `${p.name} ${p.short}`, sku: p.ref, image: BASE + `img/${pImg(p.ref)}-800.webp`, description: p.lede, brand: { '@type': 'Brand', name: 'OW Soluções' }, ...(p.price ? { offers: { '@type': 'Offer', priceCurrency: 'EUR', price: p.price, availability: 'https://schema.org/InStock' } } : {}) });
  page(p.slug, {
    title: `${p.name} ${p.short} — Loja · OW Soluções`,
    desc: `${p.lede}`,
    page: 'produto', hdrFixed: true, jsonld: ld,
    preloadImg: `<link rel="preload" as="image" type="image/avif" imagesrcset="${M[gal[0][0]].widths.map(w => `img/${gal[0][0]}-${w}.avif ${w}w`).join(', ')}" imagesizes="(min-width: 1024px) 56vw, 100vw" fetchpriority="high">\n`,
    body: bodyP
  });
}

/* =================== SERVIÇOS =================== */
const plans = [
  ['Essencial', 89, ['1 revisão por ano', 'Limpeza de filtros', 'Verificação de gás', 'Relatório na conta']],
  ['Conforto', 149, ['2 revisões por ano', 'Filtros incluídos', 'Desinfeção do permutador', 'Prioridade em avarias']],
  ['Casa inteira', 229, ['Até 4 equipamentos', '2 revisões por ano', 'Filtros e desinfeção', 'Deslocação incluída']]
];
const faqs = [
  ['Quanto tempo demora uma instalação?', 'Uma unidade de parede com exterior fica pronta num dia. Sistemas com várias divisões levam dois a três dias.'],
  ['Preciso de obras?', 'Normalmente não. Passamos os tubos por uma furação de 65 mm e escondemos a calha. A visita técnica confirma.'],
  ['Fazem manutenção a equipamentos de outras marcas?', 'Sim, desde que haja peças. Na primeira revisão registamos o equipamento na tua conta.'],
  ['Trabalham fora de Cascais?', 'Trabalhamos em Cascais, Oeiras e Sintra. Para Lisboa, fala connosco antes.'],
  ['Como funciona a garantia?', 'Três anos em peças e mão de obra nos equipamentos que instalamos, com a manutenção em dia.']
];
page('servicos.html', {
  title: 'Serviços — Instalação e manutenção · OW Soluções',
  desc: 'Visita técnica, instalação num dia e planos de manutenção para climatização e ventilação na linha de Cascais.',
  page: 'servicos',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid">
  <div class="full span-all"><h1 class="d-l split" id="h1">Validamos, instalamos e ficamos.</h1><p class="lede">Da visita técnica à revisão anual, com a mesma equipa. A 1.ª manutenção vem incluída no pacote completo.</p></div>
</div></section>
<figure class="media-hero rv m-0">${heroPicture('oficio-45', 'oficio', 'Mãos de técnico a nivelar um suporte numa parede branca', false)}</figure>
<section class="sec" aria-labelledby="proc-h"><div class="grid">
  <div class="full"><h2 class="h2 split" id="proc-h">O que acontece, por ordem.</h2></div>
  <div class="full facts mt-48">
    <div class="fact up"><b>Visita técnica</b><span>Medimos a divisão, vemos as paredes e o quadro elétrico, e confirmamos o equipamento certo. Custo: ${PH('a confirmar')}.</span></div>
    <div class="fact up"><b>Pagamento e entrega</b><span>Pagas depois de confirmado o equipamento. O fornecedor entrega-o em tua casa.</span></div>
    <div class="fact up"><b>Instalação</b><span>Marcas a data depois da entrega. Lembramos-te 48 h e 2 h antes. Chão protegido e furação limpa.</span></div>
  </div>
</div></section>
<section class="sec on-2" id="planos" aria-labelledby="plans-h"><div class="wrap">
  <h2 class="h2 split mb-48" id="plans-h">Planos de manutenção.</h2>
  <div class="plans">${plans.map(([n, pr, li], i) => `<article class="plan up"><h3 class="h3">${n}</h3><p class="price">${eur(pr)}<span class="small"> / ano</span></p><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul>${i === 1 ? `<a class="btn" href="orcamento.html?plano=${n.toLowerCase()}">Escolher ${n} ${I.arrow}</a>` : `<a class="btn-2" href="orcamento.html?plano=${n.toLowerCase().replace(' ', '-')}">Escolher ${n} ${I.arrow}</a>`}</article>`).join('')}</div>
</div></section>
<section class="sec" aria-labelledby="faq-h"><div class="grid">
  <div class="full" style="max-width:860px"><h2 class="h2 split mb-32" id="faq-h">Perguntas frequentes</h2>
  <div class="faq">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div>
</div></section>
<section class="band" aria-labelledby="mnt2-h">
  ${pic('manutencao', { alt: 'Troca do filtro de uma unidade de parede', sizes: '100vw' })}
  <div class="band-txt grid"><div><h2 class="h2" id="mnt2-h">Um filtro limpo muda tudo.</h2><p>Na revisão, trocamos o filtro e deixamos a data da próxima na tua conta.</p></div></div>
</section>
${closing('Marca a visita técnica.', 'Pedir orçamento e visita')}
`});

/* =================== SOBRE =================== */
page('sobre.html', {
  title: 'Sobre — Uma equipa de Cascais · OW Soluções',
  desc: 'A OW Soluções planeia, instala e mantém climatização e ventilação em casas e escritórios da linha de Cascais.',
  page: 'sobre', preloadImg: preloadHero('costa-45', 'costa-219'),
  body: `
<section class="hero-l" aria-labelledby="h1">
  <div class="grid hero-l-t"><h1 class="d-l" id="h1">De Cascais, para a linha.</h1><p class="lede">Conforto em casas com luz de mar, paredes grossas e janelas antigas.</p></div>
  <div class="hero-l-m" data-video-wrap>
    ${heroPicture('costa-45', 'costa-219', 'Água transparente sobre rochas, na costa de Cascais')}
    ${video('costa', {})}
  </div>
</section>
<section class="sec" aria-labelledby="hist-h"><div class="grid">
  <div class="full"><h2 class="h2 split" id="hist-h">Começámos por resolver o calor de uma sala virada a poente.</h2></div>
  <div class="full body mt-32">
    <p>A OW Soluções nasceu em Cascais em 2014, com dois técnicos e uma carrinha. Hoje somos onze, sempre com equipas próprias e sem subempreitadas.</p>
    <p>Trabalhamos devagar onde é preciso: medir a divisão, escolher a parede certa, esconder o tubo. E depressa onde conta: a visita em 48 horas e a instalação num dia.</p>
    <p>Gostamos de casas antigas. Sabemos onde passam as vigas, como se fura uma parede de pedra sem a estragar e porque é que a sala virada a sul precisa de outra potência.</p>
  </div>
</div></section>
<section class="sec-tight" aria-label="Números"><div class="wrap facts">
  <div class="fact up"><b>2014</b><span>Ano em que começámos, em Cascais.</span></div>
  <div class="fact up"><b>11 pessoas</b><span>Técnicos e atendimento, todos da casa.</span></div>
  <div class="fact up"><b>1 800 casas</b><span>Com equipamento instalado e acompanhado por nós.</span></div>
</div></section>
<section class="sec on-2" aria-labelledby="ofi-h"><div class="wrap">
  <h2 class="h2 split mb-48" id="ofi-h">O ofício.</h2>
  <div class="duo">
    <figure class="rv">${pic('oficio', { alt: 'Técnico a nivelar um suporte com laser', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption>Nível laser e chão protegido, em todas as obras.</figcaption></figure>
    <figure class="rv">${pic('insitu-exterior', { alt: 'Unidade exterior numa fachada branca com céu azul', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption>Unidades exteriores integradas na fachada.</figcaption></figure>
  </div>
</div></section>
<section class="sec" aria-labelledby="loc-h"><div class="grid">
  <div class="full ct-form"><h2 class="h2 split" id="loc-h">Onde estamos.</h2><p class="lede" style="margin:16px 0 24px">${c.address}. Atendimento ${c.hours.toLowerCase()}.</p><a class="btn-2" href="${c.maps}" rel="noopener" target="_blank">Abrir no mapa ${I.arrow}</a></div>
  <figure class="full ct-side rv mt-32">${pic('cascais-45', { alt: 'Rua de Cascais com casas brancas', sizes: '(min-width: 1024px) 34vw, 100vw' })}</figure>
</div></section>
${closing('Vamos conhecer a tua casa.', 'Pedir orçamento e visita')}
`});

/* =================== CONTACTO =================== */
page('contacto.html', {
  title: 'Contacto · OW Soluções',
  desc: 'Telefone, email e morada da OW Soluções em Cascais. Envia uma mensagem e respondemos no mesmo dia útil.',
  page: 'contacto',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l split" id="h1">Fala connosco.</h1><p class="lede">Respondemos no mesmo dia útil.</p></div></div></section>
<section class="sec pt-0"><div class="grid">
  <div class="full ct-form">
    <form class="form" data-demo-form novalidate>
      <div class="fld"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
      <div class="fld"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="fld"><label for="f-tel">Telefone <span class="muted">(opcional)</span></label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
      <div class="fld"><label for="f-ass">Assunto</label><select id="f-ass" name="assunto"><option>Pedido de orçamento</option><option>Manutenção</option><option>Avaria</option><option>Outro</option></select></div>
      <div class="fld"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="msg" rows="5"></textarea></div>
      <div><button class="btn" type="submit">Enviar mensagem ${I.arrow}</button></div>
    </form>
    <div class="ok-box" data-demo-ok hidden tabindex="-1"><p class="h3">Mensagem recebida.</p><p class="muted">Respondemos por email no mesmo dia útil.</p></div>
  </div>
  <div class="full ct-side mt-64">
    <figure class="rv">${pic('cascais-45', { alt: 'Rua de Cascais', sizes: '(min-width: 1024px) 34vw, 100vw' })}</figure>
    <dl>
      <div><dt>Telefone</dt><dd><a href="${c.telHref}">${c.tel}</a></dd></div>
      <div><dt>Email</dt><dd><a href="mailto:${c.email}">${c.email}</a></dd></div>
      <div><dt>Morada</dt><dd>${c.address}<br><a class="lnk" href="${c.maps}" rel="noopener" target="_blank">Abrir no mapa</a></dd></div>
      <div><dt>Horário</dt><dd>${c.hours}</dd></div>
    </dl>
  </div>
</div></section>
`});

/* =================== ORÇAMENTO: o funil único =================== */
const FSTEPS = ['A tua casa', 'Divisões', 'O que já existe', 'Recomendação', 'Visita técnica', 'Contacto', 'Rever e enviar'];
const seg = (name, opts, cls = '') => `<div class="seg${cls ? ' ' + cls : ''}">${opts.map(([v, l]) => `<label><input type="radio" name="${name}" value="${v}"><span>${l}</span></label>`).join('')}</div>`;
const err = id => `<p class="err" id="${id}" hidden></p>`;
const fProbs = [...D.problems.map(p => [p.id, p.label]), ['todo-ano', 'Quero conforto o ano todo']];
const roomRow = (k, v) => `<div class="rm" data-room="${k}">
  <label class="rm-chk"><input type="checkbox" name="room" value="${k}" aria-controls="rm-${k}"><span class="rm-box" aria-hidden="true"></span><span class="rm-n">${v}</span><span class="rm-s data" data-rm-sum="${k}"></span></label>
  <div class="rm-det" id="rm-${k}" hidden>
    <div class="fld"><label for="p-${k}">O que se passa na ${v.toLowerCase()}?</label><select id="p-${k}" name="p-${k}" aria-describedby="e-p-${k}"><option value="">Escolhe</option>${fProbs.map(([id, l]) => `<option value="${id}">${l}</option>`).join('')}</select>${err('e-p-' + k)}</div>
    <fieldset class="fs-0" aria-describedby="e-a-${k}"><legend class="lbl">Área aproximada</legend>${seg('a-' + k, [['a', 'Até 15 m²'], ['b', '15–25'], ['c', '25–35'], ['d', '+35 m²']])}${err('e-a-' + k)}</fieldset>
  </div>
</div>`;
page('orcamento.html', {
  title: 'Pedir orçamento com instalação · OW Soluções',
  desc: 'Sete passos: a casa, as divisões, o que já existe, a recomendação com instalação, a visita técnica, o contacto e a revisão antes de enviar. Só pagas depois de confirmarmos o equipamento.',
  page: 'orcamento', hdrFixed: true,
  extraHead: '<script defer src="js/funil.js"></script>\n<script defer src="js/casa3d.js"></script>\n',
  body: `
<div class="fn" id="funil">
  <div class="grid fn-top">
    <div class="fn-bar6" aria-hidden="true">${FSTEPS.map(() => '<i></i>').join('')}</div>
    <nav class="fn-tabs" aria-label="Passos do pedido"><ol>${FSTEPS.map((n, i) => `<li><button type="button" data-goto="${i + 1}" disabled><span>${n}</span></button></li>`).join('')}</ol></nav>
    <p class="fn-count" id="fn-count">Passo 1 de 7 · A tua casa</p>
  </div>
  <div class="grid fn-body">
    <form class="fn-main" id="fn-form" novalidate>
      <noscript><p class="lede">Este pedido precisa de JavaScript. Liga-nos para o ${D.company.tel} ou escreve para ${D.company.email}.</p></noscript>
      <div class="fn-known" id="fn-known" hidden><p class="lbl">Já sabemos isto:</p><p class="fn-known-t" id="fn-known-t"></p><button type="button" class="btn-2" data-goto-known>Alterar</button></div>

      <section class="fs" data-step="1" aria-labelledby="s1">
        <h1 class="fs-h" id="s1" tabindex="-1">Onde fica a casa?</h1>
        <p class="lede">Confirmamos se chegamos aí. Leva um minuto.</p>
        <div class="fld fld-cp mt-32"><label for="f-cp">Código postal</label><input id="f-cp" name="cp" inputmode="numeric" autocomplete="postal-code" placeholder="2750-321" maxlength="8" aria-describedby="cp-st e-cp" required>${err('e-cp')}<div class="zone" id="cp-st" aria-live="polite"></div></div>
        <div class="fn-fora" id="fn-fora" hidden>
          <p><b>Fora da zona?</b> Deixa o email e avisamos-te quando chegarmos aí.</p>
          <div class="fn-fora-r"><div class="fld"><label for="f-fora">Email</label><input id="f-fora" type="email" autocomplete="email"></div><button type="button" class="btn" data-fora>Avisem-me</button></div>
          <p class="small" id="fora-out" aria-live="polite"></p>
        </div>
        <fieldset class="fs-0 mt-32" aria-describedby="e-tipo"><legend class="lbl">Tipo de casa</legend>${seg('tipo', [['apartamento', 'Apartamento'], ['moradia', 'Moradia']])}${err('e-tipo')}</fieldset>
        <fieldset class="fs-0 mt-16" aria-describedby="e-tip"><legend class="lbl">Tipologia</legend>${seg('tipologia', [['T0', 'T0'], ['T1', 'T1'], ['T2', 'T2'], ['T3', 'T3'], ['T4+', 'T4+']])}${err('e-tip')}</fieldset>
      </section>

      <section class="fs" data-step="2" aria-labelledby="s2" hidden>
        <h1 class="fs-h" id="s2" tabindex="-1">Que divisões queres climatizar?</h1>
        <p class="lede">Escolhe da lista. Podes escolher várias.</p>
        ${casaSlot({ mode: 'escolher', hidden: true })}
        <div class="rooms mt-32" data-3d-fallback="casa" role="group" aria-labelledby="s2" aria-describedby="e-rooms">${Object.entries(D.roomNames).map(([k, v]) => roomRow(k, v)).join('')}</div>
        ${err('e-rooms')}
        <p class="small mt-16">Mais divisões, ou um espaço comercial? Diz-nos nas notas do último passo.</p>
      </section>

      <section class="fs" data-step="3" aria-labelledby="s3" hidden>
        <h1 class="fs-h" id="s3" tabindex="-1">O que já existe em casa?</h1>
        <p class="lede">Ajuda-nos a escolher o equipamento e a preparar a visita.</p>
        <fieldset class="fs-0 mt-32" aria-describedby="e-ex"><legend class="lbl">Climatização atual</legend><div class="radios">${[['nada', 'Nada'], ['ac', 'Ar condicionado antigo'], ['central', 'Aquecimento central'], ['outro', 'Outro']].map(([v, l]) => `<label class="chk"><input type="radio" name="existe" value="${v}"> ${l}</label>`).join('')}</div>${err('e-ex')}</fieldset>
        <fieldset class="fs-0 mt-24"><legend class="lbl">Onde pode ficar a unidade exterior? <span class="muted">(opcional)</span></legend>${seg('exterior', [['varanda', 'Varanda'], ['fachada', 'Fachada'], ['telhado', 'Telhado'], ['nao-sei', 'Não sei']])}</fieldset>
        <fieldset class="fs-0 mt-16"><legend class="lbl">Fotografias <span class="muted">(opcional, poupam uma ida a casa)</span></legend>
          <div class="photos">${[['parede', 'Parede da divisão'], ['quadro', 'Quadro elétrico'], ['ext', 'Local da unidade exterior']].map(([k, l]) => `<label class="ph-tile"><input type="file" accept="image/*" name="foto-${k}" class="sr"><span class="ph-img" data-ph="${k}" aria-hidden="true">${I.plus}</span><span>${l}</span></label>`).join('')}</div>
          <p class="small mt-12">Nesta demonstração as fotografias não saem do teu aparelho.</p></fieldset>
      </section>

      <section class="fs" data-step="4" aria-labelledby="s4" hidden>
        <h1 class="fs-h" id="s4" tabindex="-1">A tua recomendação.</h1>
        <p class="lede">Escolhemos o equipamento pelo que nos disseste. O preço fecha-se na visita técnica.</p>
        <ul class="rec" id="rec"></ul>
        <fieldset class="pkgs fs-0 mt-32" aria-describedby="e-pk"><legend class="lbl">Escolhe o pacote</legend>
          <label class="pkg"><input type="radio" name="pacote" value="base"><span class="pkg-b"><span class="pkg-n">Equipamento + instalação</span><span class="pkg-p">${PH('de €')} – ${PH('até €')}</span><span class="pkg-l"><span>Equipamento entregue em casa pelo fornecedor</span><span>Instalação pela equipa OW</span></span></span></label>
          <label class="pkg"><input type="radio" name="pacote" value="completo"><span class="pkg-b"><span class="pkg-tag">Recomendado</span><span class="pkg-n">Pacote completo</span><span class="pkg-p">${PH('de €')} – ${PH('até €')}</span><span class="pkg-l"><span>Equipamento entregue em casa pelo fornecedor</span><span>Instalação pela equipa OW</span><span><b>1.ª manutenção incluída</b></span><span id="pk-plano">Contrato de manutenção opcional, desde ${PH('preço €/ano')}</span></span></span></label>
          ${err('e-pk')}
        </fieldset>
        <div class="fn-note mt-24"><p><b>Ainda não pagas nada.</b> O preço confirma-se na visita técnica. O pagamento só acontece depois de confirmarmos o equipamento certo para a tua casa.</p></div>
      </section>

      <section class="fs" data-step="5" aria-labelledby="s5" hidden>
        <h1 class="fs-h" id="s5" tabindex="-1">Quando podemos passar aí?</h1>
        <p class="lede">Escolhe um dia para a <b>visita técnica</b>: medimos, vemos as paredes e confirmamos o equipamento. A instalação marcas depois, quando o equipamento chegar.</p>
        <fieldset class="fs-0 mt-32" aria-describedby="e-dia"><legend class="lbl">Dia da visita técnica · próximos 10 dias úteis</legend><div class="days" id="days"></div>${err('e-dia')}</fieldset>
        <fieldset class="fs-0 mt-24" aria-describedby="e-per"><legend class="lbl">Período</legend>${seg('periodo', [['manha', 'Manhã · 9–13 h'], ['tarde', 'Tarde · 14–18 h']])}${err('e-per')}</fieldset>
        <div class="fld mt-8"><label for="f-morada">Morada da visita</label><input id="f-morada" name="morada" autocomplete="street-address" placeholder="Rua e número, andar" aria-describedby="e-morada" required>${err('e-morada')}</div>
        <p class="small mt-16">É um pedido de visita: ligamos-te para a confirmar. Custo da visita: ${PH('a confirmar')}.</p>
      </section>

      <section class="fs" data-step="6" aria-labelledby="s6" hidden>
        <h1 class="fs-h" id="s6" tabindex="-1">Como te contactamos?</h1>
        <p class="lede">Só usamos isto para confirmar a visita e o teu pedido.</p>
        <div class="form mt-32">
          <div class="fld"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" aria-describedby="e-nome" required>${err('e-nome')}</div>
          <div class="fld-2">
            <div class="fld"><label for="f-tel">Telemóvel</label><input id="f-tel" name="tel" type="tel" inputmode="tel" autocomplete="tel" placeholder="912 345 678" aria-describedby="e-tel" required>${err('e-tel')}</div>
            <div class="fld"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" aria-describedby="e-email" required>${err('e-email')}</div>
          </div>
          <div class="fld"><label for="f-nif">NIF <span class="muted">(opcional, para a fatura)</span></label><input id="f-nif" name="nif" inputmode="numeric" maxlength="9" aria-describedby="e-nif">${err('e-nif')}</div>
          <div class="fld"><label for="f-notas">Notas <span class="muted">(opcional)</span></label><textarea id="f-notas" name="notas" rows="3" placeholder="Horários, acesso ao prédio, mais divisões…"></textarea></div>
          <label class="chk chk-top"><input type="checkbox" name="rgpd" aria-describedby="e-rgpd"> <span>Li a <a class="lnk" href="privacidade.html" target="_blank" rel="noopener">política de privacidade<span class="sr"> (abre noutro separador)</span></a> e compreendo que a OW Soluções vai usar estes dados para responder a este pedido.</span></label>${err('e-rgpd')}
          <label class="chk chk-top"><input type="checkbox" name="lembretes"> <span>Quero receber lembretes de manutenção. <span class="muted">(opcional; podes retirar este consentimento quando quiseres)</span></span></label>
        </div>
      </section>

      <section class="fs" data-step="7" aria-labelledby="s7r" hidden>
        <h1 class="fs-h" id="s7r" tabindex="-1">Confirma o teu pedido.</h1>
        <p class="lede">Revê tudo antes de enviar. Nada é enviado até carregares em «Enviar pedido».</p>
        <div class="rv mt-32" id="rv">
${[[1, 'A tua casa'], [2, 'Divisões'], [3, 'O que já existe'], [4, 'Pacote'], [5, 'Visita técnica'], [6, 'Contacto']].map(([n, t]) => `          <section class="rv-b" aria-labelledby="rv-h${n}"><div class="rv-t"><h2 class="rv-h" id="rv-h${n}">${t}</h2><button type="button" class="lnk-b rv-e" data-edit="${n}">Editar<span class="sr"> ${t.toLowerCase()}</span></button></div><dl class="rv-dl" data-rv="${n}"></dl></section>`).join('\n')}
        </div>
        <div class="fn-note mt-24"><p>Usamos estes dados só para responder a este pedido, como explicado na <a class="lnk" href="privacidade.html" target="_blank" rel="noopener">política de privacidade<span class="sr"> (abre noutro separador)</span></a>. <b>Ainda não pagas nada.</b> O preço fecha-se na visita técnica.</p></div>
      </section>

      <section class="fs fs-ok" data-step="8" aria-labelledby="s7" hidden>
        <p class="ok-k">${I.check}<span>Pedido enviado</span></p>
        <h1 class="fs-h" id="s7" tabindex="-1">Obrigado<span id="ok-nome"></span>.</h1>
        <p class="lede">Referência <b class="data ok-ref" id="ok-ref">OW-000000</b>. Ligamos-te para confirmar a visita técnica. Prazo de resposta: ${PH('a confirmar')}.</p>
        <div class="row mt-24"><button type="button" class="btn" data-ics>Adicionar ao calendário ${I.arrow}</button><a class="btn-2" href="conta.html">Criar conta para acompanhar ${I.arrow}</a></div>
        <dl class="rev mt-40" id="ok-sum"></dl>
        <p class="small mt-16">Tratamos os teus dados como descrito na <a class="lnk" href="privacidade.html">política de privacidade</a>.</p>
        <h2 class="h3 mt-48">O que acontece a seguir</h2>
        <ol class="next">
          <li class="is-now"><b>Confirmamos a visita técnica por telefone.</b><span>No dia e período que escolheste, ou noutro que te dê mais jeito.</span></li>
          <li><b>Na visita, confirmamos o equipamento certo.</b><span>Medimos, escolhemos a parede e fechamos o preço do pacote.</span></li>
          <li><b>Só então pagas.</b><span>Enviamos o pagamento com o preço fechado. Nada é cobrado antes.</span></li>
          <li><b>O fornecedor entrega o equipamento em tua casa.</b><span>Prazo de entrega: ${PH('a confirmar')}. Avisamos-te quando sair.</span></li>
          <li><b>Com a entrega confirmada, marcas a instalação.</b><span>Escolhes o dia na tua conta. Enviamos lembretes 48 h e 2 h antes.</span></li>
          <li><b>Ficamos para a manutenção.</b><span id="ok-mnt">A 1.ª manutenção vem incluída no pacote completo. Depois, podes ficar com um contrato de manutenção.</span></li>
        </ol>
        <p class="mt-32"><button type="button" class="btn-2" data-reset>Começar outro pedido</button></p>
      </section>

      <div class="fn-nav" id="fn-nav"><button type="button" class="fn-back" data-back>${I.left}<span>Voltar</span></button><button type="button" class="btn" data-next><span data-next-t>Continuar</span> ${I.arrow}</button></div>
      <p class="sr" id="fn-live" aria-live="polite"></p>
    </form>
    <aside class="fn-side" aria-label="Resumo do pedido">
      <div class="fn-sum">
        <p class="lbl">O teu pedido</p>
        <dl class="fn-dl" id="fn-dl"></dl>
        <div class="fn-est"><span>Estimativa com instalação</span><b>${PH('de €')} – ${PH('até €')}</b></div>
        <p class="small mt-12">Pagas só depois de confirmarmos o equipamento, na visita técnica.</p>
      </div>
    </aside>
  </div>
</div>
`});

/* =================== CESTO =================== */
page('cesto.html', {
  title: 'Cesto · OW Soluções',
  desc: 'O teu cesto na loja da OW Soluções.',
  page: 'cesto',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l" id="h1">Cesto</h1><p class="lede">Cada peça segue como pacote: equipamento, entrega em casa e instalação pela OW.</p></div></div></section>
<section class="sec pt-0"><div class="grid">
  <div class="full cart-main"><div class="cart-items" id="cart-list" aria-live="polite"></div></div>
  <div class="full cart-side" id="cart-side">
    <div class="sum"><p class="lbl">Resumo do pacote</p><div><span>Equipamento</span><span class="data" id="c-sub">0 €</span></div><div><span>Instalação OW</span><span class="data">${PH('de €')} – ${PH('até €')}</span></div><div><span>Entrega em casa, pelo fornecedor</span><span class="data">${PH('a confirmar')}</span></div><div class="tot"><span>Total estimado</span><span>${PH('de €')} – ${PH('até €')}</span></div>
    <a class="btn btn-wide mt-20" id="c-go" href="orcamento.html">Continuar: casa e visita técnica ${I.arrow}</a>
    <p class="small mt-12">Ainda não pagas nada. Fechamos o preço na visita técnica e só cobramos depois de confirmarmos o equipamento certo.</p></div>
  </div>
  <div class="full" id="cart-empty" hidden><div class="empty-cart">${pic('p-ui-25', { alt: '', sizes: '360px' })}<div><p class="h2">O cesto está vazio.</p><p class="lede" style="margin:12px 0 24px">Começa pela peça que mais instalamos.</p><a class="btn" href="loja.html">Ir à loja ${I.arrow}</a></div></div></div>
</div></section>
`});

/* =================== CONTA =================== */
page('conta.html', {
  title: 'Conta · OW Soluções',
  desc: 'A tua conta OW: equipamentos, revisões e encomendas.',
  page: 'conta',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l" id="h1">Olá, Inês.</h1><p class="lede">A tua casa em Cascais, num só sítio.</p></div></div></section>
<section class="sec pt-0"><div class="grid">
  <div class="full acc-main">
    <div class="acc-tabs" role="tablist" aria-label="Conta"><button type="button" role="tab" aria-selected="true" aria-controls="t-eq" id="tb-eq">Equipamentos</button><button type="button" role="tab" aria-selected="false" aria-controls="t-rev" id="tb-rev" tabindex="-1">Revisões</button><button type="button" role="tab" aria-selected="false" aria-controls="t-enc" id="tb-enc" tabindex="-1">Encomendas</button></div>
    <div role="tabpanel" id="t-eq" aria-labelledby="tb-eq">
      <div class="mock fs-0">
        <div class="mock-row"><img src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-25 · Sala</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge">Revisão a 12 mar</span></div>
        <div class="mock-row"><img src="img/p-ui-12-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-12 · Quarto</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge warn">Filtro a trocar</span></div>
        <div class="mock-row"><img src="img/p-vx-01-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>VX-01 · Casa de banho</b><span class="data">Instalada a 2 abr 2026</span></div><span class="badge">Em dia</span></div>
      </div>
    </div>
    <div role="tabpanel" id="t-rev" aria-labelledby="tb-rev" hidden><table class="spec"><caption class="sr">Revisões</caption><tbody><tr><th scope="row">12 mar 2027</th><td>Revisão anual · UI-25, UI-12</td></tr><tr><th scope="row">2 abr 2027</th><td>Revisão anual · VX-01</td></tr><tr><th scope="row">14 set 2026</th><td>Troca de filtro · UI-12</td></tr></tbody></table></div>
    <div role="tabpanel" id="t-enc" aria-labelledby="tb-enc" hidden><table class="spec"><caption class="sr">Encomendas</caption><tbody><tr><th scope="row">OW-204118</th><td>FL-04 × 2 · 48 €</td></tr><tr><th scope="row">OW-198402</th><td>Instalação UI-25 + UE-50</td></tr></tbody></table></div>
  </div>
  <div class="full acc-side mt-48">
    <div class="sum mt-0"><p class="h3">Próxima revisão</p><div class="num" style="margin:12px 0 4px">12.03</div><p class="small">UI-25 e UI-12 · manhã</p><button type="button" class="btn btn-wide mt-20" data-demo-note="Pedido de nova data registado. Confirmamos por email.">Mudar a data</button><p class="small mt-12" aria-live="polite" data-note-out></p></div>
  </div>
</div></section>
`});

/* =================== 404 =================== */
page('404.html', {
  title: 'Página não encontrada · OW Soluções',
  desc: 'Esta página não existe.',
  page: '404',
  extraHead: '<base href="/gw-solucoes/">\n',
  body: `
<section class="nf"><div class="grid">
  <div class="full"><h1 class="d-l split">Esta divisão não existe.</h1><p class="lede mt-16">O endereço pode ter mudado. Voltamos ao princípio?</p>
  <div class="row"><a class="btn" href="index.html">Página inicial ${I.arrow}</a><a class="btn-2" href="loja.html">Ver a loja ${I.arrow}</a></div></div>
  <div class="full mt-48"><div class="corte">${corte({ id: 'corte-404', dark: true, sizes: '100vw', cotas: false })}</div></div>
</div></section>
`});
/* =================== LEGAL =================== */
/* Copy: Shakespeare, /workspace/shakespeare/ow-legal/ (23 nov 2026), copiada para legal/. Rascunho por rever por jurista.
   Placeholders [ ] ficam visíveis (.phv). Rotas internas /x → x.html (o site vive numa subpasta). */
const LROUTE = { '/conta': 'conta.html', '/privacidade': 'privacidade.html', '/cookies': 'cookies.html', '/termos': 'termos.html', '/livro-de-reclamacoes': 'livro-de-reclamacoes.html', '/avisos-legais': 'avisos-legais.html' };
function inl(t) {
  let out = '', i = 0;
  while (i < t.length) {
    const ch = t[i];
    if (ch === '[') {
      let dep = 0, j = i;
      for (; j < t.length; j++) { if (t[j] === '[') dep++; else if (t[j] === ']' && --dep === 0) break; }
      if (j >= t.length) { out += esc(ch); i++; continue; }
      const inner = t.slice(i + 1, j);
      const m = t.slice(j + 1).match(/^\(([^)\s]+)\)/);
      if (m) { const u = m[1], ext = /^https?:/.test(u); const href = ext ? u : (LROUTE[u] || u);
        out += `<a class="lnk" href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${inl(inner)}${ext ? '<span class="sr"> (abre noutro separador)</span>' : ''}</a>`; i = j + 1 + m[0].length; continue; }
      out += `<span class="phv">[${inl(inner)}]</span>`; i = j + 1; continue;
    }
    if (t.startsWith('**', i)) { const k = t.indexOf('**', i + 2); if (k > 0) { out += `<b>${inl(t.slice(i + 2, k))}</b>`; i = k + 2; continue; } }
    if (ch === '`') { const k = t.indexOf('`', i + 1); if (k > 0) { out += `<code>${esc(t.slice(i + 1, k))}</code>`; i = k + 1; continue; } }
    out += esc(ch); i++;
  }
  return out;
}
function md(src) {
  const L = src.replace(/\r/g, '').split('\n'); let h1 = '', upd = '', html = '', list = null, para = [];
  const flush = () => { if (para.length) { html += `<p>${inl(para.join(' '))}</p>\n`; para = []; } if (list) { html += `<${list.t}>${list.items.map(x => `<li>${inl(x)}</li>`).join('')}</${list.t}>\n`; list = null; } };
  for (const ln of L) {
    let m;
    if (!ln.trim()) { flush(); continue; }
    if ((m = ln.match(/^# (.*)/))) { flush(); h1 = m[1]; continue; }
    if (!upd && /^Última atualização:/.test(ln)) { upd = ln; continue; }
    if ((m = ln.match(/^(#{2,4}) (.*)/))) { flush(); const lv = m[1].length; const id = m[2].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); html += `<h${lv} id="${id}">${inl(m[2])}</h${lv}>\n`; continue; }
    if ((m = ln.match(/^- (.*)/))) { if (para.length) { html += `<p>${inl(para.join(' '))}</p>\n`; para = []; } if (!list || list.t !== 'ul') { flush(); list = { t: 'ul', items: [] }; } list.items.push(m[1]); continue; }
    if ((m = ln.match(/^\d+\. (.*)/))) { if (!list || list.t !== 'ol') { flush(); list = { t: 'ol', items: [] }; } list.items.push(m[1]); continue; }
    if (list) flush();
    para.push(ln.trim());
  }
  flush(); return { h1, upd, html };
}
for (const [file, src, desc] of [
  ['privacidade.html', 'politica-de-privacidade.md', 'Que dados pessoais a OW Soluções trata, para que fins, com que base legal, durante quanto tempo, e quais são os teus direitos.'],
  ['cookies.html', 'cookies-e-medicoes.md', 'Que informação o sítio da OW Soluções guarda no teu equipamento e como medimos a audiência sem cookies.'],
  ['termos.html', 'termos-e-condicoes.md', 'Termos e condições de venda de equipamento e serviços de climatização da OW Soluções.'],
  ['livro-de-reclamacoes.html', 'livro-de-reclamacoes-e-ral.md', 'Livro de Reclamações eletrónico e resolução alternativa de litígios de consumo.'],
  ['avisos-legais.html', 'avisos-legais.md', 'Identificação da OW Soluções enquanto prestador de serviços da sociedade da informação.'],
]) {
  const { h1, upd, html } = md(fs.readFileSync(new URL(`../legal/${src}`, import.meta.url), 'utf8'));
  page(file, { title: `${h1} · OW Soluções`, desc, page: 'legal', body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l" id="h1">${inl(h1)}</h1>${upd ? `<p class="lg-upd">${inl(upd)}</p>` : ''}
<p class="lg-draft">Rascunho por rever por um jurista. Os campos entre [ ] ainda vão ser preenchidos pela OW Soluções.</p></div></div></section>
<section class="sec pt-0"><div class="grid"><article class="legal">
${html}</article></div></section>
` });
}
finish();
