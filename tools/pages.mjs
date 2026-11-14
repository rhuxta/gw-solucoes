import { I, pic, pImg, P, page, card, corte, diagnosis, video, heroPicture, preloadHero, closing, eur, esc, D, ROOMS, M, BASE, finish } from './build.mjs';
const c = D.company;
const LD = JSON.stringify({ '@context': 'https://schema.org', '@type': 'HVACBusiness', name: 'GW Soluções', url: BASE, image: BASE + 'img/og-1200.jpg', address: { '@type': 'PostalAddress', streetAddress: 'Travessa do Farol 8', addressLocality: 'Cascais', postalCode: '2750-321', addressCountry: 'PT' }, telephone: '+351210000000', areaServed: ['Cascais', 'Oeiras', 'Sintra'] });

/* =================== HOME =================== */
const feat4 = ['UI-25', 'TC-35', 'UE-50', 'TH-02'].map(r => P[r]);
page('index.html', {
  title: 'GW Soluções — O ar certo, em cada divisão.',
  desc: 'Climatização e ventilação na linha de Cascais. Começamos pelo que sentes em casa, propomos a peça certa, instalamos num dia e ficamos para a manutenção.',
  page: 'home', hero: true, jsonld: LD, preloadImg: preloadHero('hero-45', 'hero-219'),
  body: `
<section class="hero" aria-labelledby="h1">
  <div class="grid">
    <div class="hero-h"><h1 class="d-xl split" id="h1">O ar certo, em cada divisão.</h1></div>
    <div class="hero-side">
      <p class="lede">Começamos pelo que sentes em casa e acabamos com a peça certa, instalada num dia.</p>
      <div class="row"><a class="btn" href="#diag">Qual é o teu problema? ${I.arrow}</a><a class="btn-2" href="loja.html">Ver a loja ${I.arrow}</a></div>
    </div>
  </div>
  <div class="hero-media" data-video-wrap>
    ${heroPicture('hero-45', 'hero-219', 'Sala em Cascais com luz da manhã na parede branca; uma mulher lê no sofá e uma unidade de parede discreta fica alta na parede')}
    ${video('hero', {})}
  </div>
</section>

<section class="sec on-cut" aria-labelledby="diag-h" id="problema">
  <div class="wrap">${diagnosis({})}</div>
</section>

<section class="sec-tight" aria-label="Porque a GW">
  <div class="wrap facts">
    <div class="fact up"><b>48 h</b><span>Da chamada à visita técnica, na linha de Cascais.</span></div>
    <div class="fact up"><b>Um dia</b><span>Para instalar uma unidade, com o chão protegido e sem pó.</span></div>
    <div class="fact up"><b>Cascais · Oeiras · Sintra</b><span>A nossa área, com técnicos próprios.</span></div>
  </div>
</section>

<section class="sec on-2" aria-labelledby="eq-h">
  <div class="wrap">
    <div class="sec-head">
      <h2 class="h2 split" id="eq-h">Peças pensadas para ficar à vista.</h2>
      <div class="rail-ctl" data-rail-ctl="eq"><button type="button" data-prev aria-label="Anterior">${I.left}</button><output aria-live="polite">1 / 4</output><button type="button" data-next aria-label="Seguinte">${I.right}</button></div>
    </div>
    <div class="rail" id="eq" tabindex="0" aria-label="Equipamentos em destaque">${feat4.map(p => card(p, { sizes: '(min-width: 1024px) 24vw, (min-width: 768px) 45vw, 78vw', where: false })).join('')}</div>
    <p style="margin-top:24px"><a class="btn-2" href="loja.html">Ver a loja toda ${I.arrow}</a></p>
  </div>
</section>

<section class="sec how" aria-labelledby="how-h">
  <div class="grid">
    <figure class="how-img bleed-m rv">${pic('oficio', { alt: 'Mãos de um técnico com luvas a nivelar o suporte de uma unidade numa parede branca, com o chão protegido', sizes: '(min-width: 1024px) 48vw, 100vw' })}</figure>
    <div class="how-txt full-m">
      <h2 class="h2 split" id="how-h">Como trabalhamos.</h2>
      <ol class="steps" data-steps><span class="steps-bar" aria-hidden="true"></span>
        <li class="step"><span class="num" aria-hidden="true">1</span><h3 class="h3">Perceber</h3><p class="muted">Contas-nos o que sentes e onde. Se for preciso, vamos a casa medir a divisão e ver as paredes.</p></li>
        <li class="step"><span class="num" aria-hidden="true">2</span><h3 class="h3">Propor</h3><p class="muted">Uma proposta curta: a peça, o sítio exato na parede, o preço fechado e a data.</p></li>
        <li class="step"><span class="num" aria-hidden="true">3</span><h3 class="h3">Instalar</h3><p class="muted">Um dia de obra limpa. Deixamos tudo registado na tua conta, com a próxima revisão marcada.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="sec on-2 mnt" aria-labelledby="mnt-h">
  <div class="grid">
    <div class="mnt-txt full-m">
      <h2 class="h2 split" id="mnt-h">Depois da instalação, ficamos.</h2>
      <p class="lede" style="margin-top:16px">Revisões, filtros e o histórico de cada equipamento, numa conta simples.</p>
      <figure class="mnt-img rv" style="margin-top:32px">${pic('manutencao', { alt: 'Mãos a retirar o filtro de uma unidade de parede branca', sizes: '(min-width: 1024px) 36vw, 100vw' })}</figure>
      <p style="margin-top:24px"><a class="btn-2" href="servicos.html#planos">Planos de manutenção ${I.arrow}</a></p>
    </div>
    <div class="mnt-ui full-m">
      <div class="mock" aria-label="Exemplo da área de cliente">
        <div class="mock-h"><span>A minha casa · Cascais</span><span class="data">3 equipamentos</span></div>
        <div class="mock-row"><img src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-25 · Sala</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge">Revisão a 12 mar</span></div>
        <div class="mock-row"><img src="img/p-ui-12-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-12 · Quarto</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge warn">Filtro a trocar</span></div>
        <div class="mock-row"><img src="img/p-vx-01-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>VX-01 · Casa de banho</b><span class="data">Instalada a 2 abr 2026</span></div><span class="badge">Em dia</span></div>
        <p style="margin-top:20px"><a class="btn-2" href="conta.html">Abrir a conta ${I.arrow}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="band" aria-labelledby="sobre-h">
  ${heroPicture('cascais-45', 'cascais-219', 'Rua de Cascais com casas brancas e céu limpo', false)}
  <div class="band-txt grid"><div><h2 class="h2" id="sobre-h">De Cascais, para a linha.</h2><p>Somos uma equipa pequena, com técnicos próprios, a trabalhar em casas com luz de mar e paredes antigas.</p><p style="margin-top:16px"><a class="btn-2" href="sobre.html">Conhecer a GW ${I.arrow}</a></p></div></div>
</section>

${closing()}
`});

/* =================== SOLUÇÕES =================== */
page('solucoes.html', {
  title: 'Soluções — Diagnóstico por divisão · GW Soluções',
  desc: 'Diz-nos o que sentes em casa: calor, frio, ar parado ou humidade. A maquete mostra a divisão e a peça certa para ela.',
  page: 'solucoes',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full">
  <h1 class="d-l split" id="h1">Começa pelo que sentes.</h1>
  <p class="lede">Escolhe uma situação. A maquete acende a divisão e mostramos a peça certa, com números.</p>
</div></div></section>
<section class="sec on-cut" style="padding-top:48px" aria-labelledby="diag-h">
  <div class="wrap">${diagnosis({ withPhotos: true, h: 'O que se passa em casa?', sub: 'Toca numa fotografia.' })}</div>
</section>
<section class="sec" aria-labelledby="sol-h">
  <div class="wrap">
    <h2 class="h2 split" id="sol-h">Quatro problemas, quatro caminhos.</h2>
    <div class="duo" style="margin-top:48px">
      <figure class="rv">${pic('sit-quente', { alt: 'Sol forte numa parede branca', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Calor.</b> Unidade de parede ou de tecto, com potência medida para a divisão.</figcaption></figure>
      <figure class="rv">${pic('sit-frio', { alt: 'Quarto com azulejo azul e luz fria', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Frio.</b> Bomba de calor silenciosa, pensada para a noite.</figcaption></figure>
      <figure class="rv">${pic('sit-parado', { alt: 'Sombra de janela numa parede, com cortina', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Ar parado.</b> Ventilação com caixa compacta, sem abrir janelas.</figcaption></figure>
      <figure class="rv">${pic('sit-humidade', { alt: 'Vidro embaciado com gotas', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption><b>Humidade.</b> Temperatura estável e extração pontual.</figcaption></figure>
    </div>
  </div>
</section>
${closing('Preferes que alguém veja?', 'Marcar visita')}
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
  if (i === 5) cards.push(`<a class="tile" href="servicos.html" data-tile>${pic('oficio', { alt: '', sizes: '(min-width: 1024px) 48vw, 100vw' })}<p>Cada peça da loja pode vir com instalação, num dia.<span>Ver serviços</span></p></a>`);
});
page('loja.html', {
  title: 'Loja — Climatização e ventilação · GW Soluções',
  desc: 'Unidades de parede e de tecto, unidades exteriores, ventilação, termóstatos e filtros. Filtra por divisão, contexto e função.',
  page: 'loja', hdrFixed: true,
  body: `
<div class="grid shop-top">
  <h1 class="d-l split" id="h1">Loja</h1>
  <p class="lede">Peças para cada divisão, com instalação se quiseres.</p>
  <div class="shop-meta"><span class="small" data-count>10 artigos</span><label class="sort">Ordenar <select data-sort aria-label="Ordenar artigos"><option value="rel">Relevância</option><option value="asc">Preço, do mais baixo</option><option value="desc">Preço, do mais alto</option></select></label></div>
</div>
<div class="tabs" id="pesquisa"><div class="tabs-in" role="group" aria-label="Categoria">${D.cats.map(([k, v], i) => `<button type="button" class="tab" data-cat="${k}" aria-pressed="${i === 0}">${v}</button>`).join('')}</div></div>
<div class="grid shop">
  <aside class="shop-side" aria-label="Filtros"><form data-filters="d">${filters('d')}</form></aside>
  <div class="active-f" data-active aria-label="Filtros ativos"></div>
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
    ? [['p-ui-25-hi', 'Unidade de parede UI-25, vista a três quartos'], ['p-ui-25-front', 'UI-25 vista de frente'], ['hero-45', 'UI-25 instalada numa sala em Cascais'], ['p-ui-25-detail', 'Detalhe do LED e da aleta da UI-25']]
    : [[pImg(p.ref), `${p.name} ${p.short}`], [M[p.insitu + '-45'] ? p.insitu + '-45' : p.insitu, `${p.name} em contexto`]];
  const roomRec = p.rooms[0];
  const bodyP = `
<div class="grid pp" data-ref="${p.ref}">
  <nav class="crumb pp-crumb full" aria-label="Caminho"><a href="loja.html">Loja</a><span aria-hidden="true">/</span><a href="loja.html?cat=${p.cat}">${D.cats.find(c => c[0] === p.cat)[1]}</a></nav>
  <div class="pp-media">
    <div class="gal" id="gal" tabindex="0" aria-label="Imagens do produto">${gal.map((g, i) => `<figure>${pic(g[0], { alt: g[1], sizes: '(min-width: 1024px) 56vw, 100vw', prio: i === 0, lazy: i > 0, vt: i === 0 ? 'p-' + p.ref.toLowerCase() : '' })}</figure>`).join('')}</div>
    <div class="gal-ind" aria-hidden="true">${gal.map((g, i) => `<i${i === 0 ? ' class="is-on"' : ''}></i>`).join('')}</div>
    ${is25 ? `<button type="button" class="btn-3d" data-goto-3d>${I.cube} Ver em 3D</button>` : ''}
  </div>
  <div class="pp-side">
    <h1 class="d-l pp-name split">${p.name} ${p.short}</h1>
    <div class="pp-buy" id="buy">
      <p class="short">${p.desc}</p>
      <p class="price-l">${eur(p.price)}</p>
      <p class="vat">${p.price == null ? 'Preço depois da visita técnica' : 'IVA incluído · instalação à parte'}</p>
      <p style="margin-top:12px"><span class="badge${p.price == null ? ' q' : ''}">${p.stock}</span></p>
      <fieldset style="border:0;padding:0;margin:20px 0 0"><legend class="lbl">${p.fn === 'climatizacao' ? 'Potência' : 'Versão'}</legend>
        <div class="seg">${p.power.map((v, i) => `<label><input type="radio" name="pw" value="${esc(v)}"${i === 0 ? ' checked' : ''}><span>${v}</span></label>`).join('')}</div>
      </fieldset>
      <div class="pp-cta">${p.price == null ? `<a class="btn" href="orcamento.html?ref=${p.ref}">Pedir estudo ${I.arrow}</a>` : `<button type="button" class="btn" data-add="${p.ref}">Adicionar ao cesto</button><a class="btn-2" href="orcamento.html?ref=${p.ref}">Pedir orçamento com instalação ${I.arrow}</a>`}</div>
      <ul class="pp-assure"><li>${I.truck}<span>Entrega em 2 a 3 dias úteis na linha de Cascais.</span></li><li>${I.tool}<span>Instalação num dia, com chão protegido.</span></li><li>${I.shield}<span>3 anos de garantia, peças e mão de obra.</span></li></ul>
    </div>
  </div>
</div>
<nav class="chap" aria-label="Capítulos"><div class="chap-in">
  <a href="#visao">Visão geral</a><a href="#casa">Na casa</a>${is25 ? '<a href="#pecas">Peça a peça</a>' : ''}<a href="#spec">Especificações</a><a href="#inst">Instalação</a>
</div></nav>
<section class="sec ch" id="visao" aria-labelledby="visao-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="visao-h">${p.lede}</h2>
  <dl class="keys">${p.key.map(k => `<div><dd><span class="num">${k[0]}${k[1] ? `<small>${k[1]}</small>` : ''}</span></dd><dt>${k[2]}</dt></div>`).join('')}</dl>
  <figure class="ov-img rv">${pic(is25 ? 'sala-32' : (M[p.insitu] ? p.insitu : p.insitu + '-45'), { alt: `${p.name} numa casa`, sizes: '(min-width: 1024px) 56vw, 100vw' })}</figure>
</div></div></section>
<section class="sec on-cut ch" id="casa" aria-labelledby="casa-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="casa-h">Fica na ${D.roomNames[roomRec].toLowerCase()}${p.cat === 'parede' ? ', a 2,1 m do chão' : ''}.</h2>
  <div class="corte-box" data-corte-fixed="${roomRec}">${corte({ id: 'corte-p', sizes: '(min-width: 1024px) 56vw, 200vw' })}</div>
  <p class="diag-cap" style="padding-inline:0"><span>${D.roomNames[roomRec]} · com a solução instalada</span><span aria-hidden="true">Esc. 1:50</span></p>
</div></div></section>
${is25 ? `<section class="sec ch xpl-sec" id="pecas" aria-labelledby="pecas-h"><div class="grid"><div class="ch-main xpl-pin">
  <h2 class="h2 ch-h split" id="pecas-h">Peça a peça.</h2>
  <div class="xpl" data-xpl>
    <div class="xpl-view">
      <img class="xpl-closed" src="img/p-ui-25-closed-1200.webp" alt="UI-25 fechada" width="1600" height="1000" loading="lazy">
      <img class="xpl-open" src="img/p-ui-25-explode-1200.webp" alt="UI-25 em vista explodida: chassis, ventilador, permutador, filtro e frente" width="1600" height="1000" loading="lazy">
      <span class="call" style="left:66%;top:22%"><span>Frente</span></span>
      <span class="call" style="left:52%;top:30%"><span>Filtro</span></span>
      <span class="call" style="left:40%;top:62%"><span>Permutador</span></span>
      <span class="call" style="left:20%;top:72%"><span>Ventilador</span></span>
    </div>
    <div class="xpl-ctl"><span>Fechada</span><input type="range" min="0" max="100" value="0" step="1" data-xpl-range aria-label="Abrir a peça" aria-valuetext="Fechada"><span>Aberta</span></div>
    <div class="xpl-bt"><button type="button" class="btn-2" data-load-3d>${I.cube} Rodar em 3D</button><button type="button" class="btn-2" data-ar hidden>${I.ar} Ver na minha parede</button></div>
  </div>
</div><div class="ch-aside">
  <ol class="calls-list"><li><div><b>Frente</b><span>Painel liso, abre para cima para trocar o filtro.</span></div></li><li><div><b>Filtro</b><span>Lavável, com troca anual registada na conta.</span></div></li><li><div><b>Permutador</b><span>Alumínio e cobre; é aqui que o calor muda de sítio.</span></div></li><li><div><b>Ventilador</b><span>Tangencial, de baixa rotação: 19 dB(A) no modo noite.</span></div></li></ol>
</div></div></section>` : ''}
<section class="sec on-2 ch" id="spec" aria-labelledby="spec-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="spec-h">Especificações</h2>
  <table class="spec" data-spec><caption class="sr">Especificações técnicas de ${p.name} ${p.short}</caption><tbody>${p.specs.map((s, i) => `<tr${i >= 6 ? ' class="more"' : ''}><th scope="row">${s[0]}</th><td>${s[1]}</td></tr>`).join('')}</tbody></table>
  ${p.specs.length > 6 ? `<p style="margin-top:16px"><button type="button" class="btn-2" data-spec-all aria-expanded="false">Ver todas (${p.specs.length})</button></p>` : ''}
</div></div></section>
<section class="sec ch" id="inst" aria-labelledby="inst-h"><div class="grid"><div class="ch-main">
  <h2 class="h2 ch-h split" id="inst-h">Instalação, num dia.</h2>
  <figure class="inst-img rv">${pic('oficio', { alt: 'Técnico a nivelar o suporte da unidade', sizes: '(min-width: 1024px) 56vw, 100vw' })}</figure>
  <ol class="ol-steps"><li>Visita técnica para medir e escolher a parede.</li><li>Proposta com preço fechado e data.</li><li>Instalação limpa e registo na tua conta.</li></ol>
  <a class="btn" href="orcamento.html?ref=${p.ref}">Pedir orçamento com instalação ${I.arrow}</a>
</div></div></section>
<section class="sec on-2" aria-labelledby="also-h"><div class="wrap">
  <h2 class="h2 split" id="also-h" style="margin-bottom:48px">Também vais precisar.</h2>
  <div class="rail">${also(p.ref).map(x => card(x, { sizes: '(min-width: 1024px) 24vw, 78vw', where: false })).join('')}</div>
</div></section>
<div class="buybar" id="buybar" aria-hidden="true"><div class="bb-t"><b>${p.name} ${p.short}</b><span>${eur(p.price)}</span></div>${p.price == null ? `<a class="btn" href="orcamento.html?ref=${p.ref}" tabindex="-1">Pedir estudo</a>` : `<button type="button" class="btn" data-add="${p.ref}" tabindex="-1">Adicionar</button>`}</div>
`;
  const ld = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: `${p.name} ${p.short}`, sku: p.ref, image: BASE + `img/${pImg(p.ref)}-800.webp`, description: p.lede, brand: { '@type': 'Brand', name: 'GW Soluções' }, ...(p.price ? { offers: { '@type': 'Offer', priceCurrency: 'EUR', price: p.price, availability: 'https://schema.org/InStock' } } : {}) });
  page(p.slug, {
    title: `${p.name} ${p.short} — Loja · GW Soluções`,
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
  title: 'Serviços — Instalação e manutenção · GW Soluções',
  desc: 'Visita técnica, instalação num dia e planos de manutenção para climatização e ventilação na linha de Cascais.',
  page: 'servicos',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid">
  <div class="full" style="grid-column:1/-1"><h1 class="d-l split" id="h1">Instalamos num dia. Ficamos para sempre.</h1><p class="lede">Da visita à revisão anual, com a mesma equipa.</p></div>
</div></section>
<figure class="media-hero rv" style="margin:0">${heroPicture('oficio-45', 'oficio', 'Mãos de técnico a nivelar um suporte numa parede branca', false)}</figure>
<section class="sec" aria-labelledby="proc-h"><div class="grid">
  <div class="full"><h2 class="h2 split" id="proc-h">O que acontece, por ordem.</h2></div>
  <div class="full facts" style="margin-top:48px">
    <div class="fact up"><b>Visita</b><span>Medimos a divisão, vemos as paredes e o quadro elétrico. Grátis com orçamento aceite.</span></div>
    <div class="fact up"><b>Instalação</b><span>Chão protegido, furação limpa, calha pintada da cor da parede.</span></div>
    <div class="fact up"><b>Entrega</b><span>Explicamos o comando, registamos tudo na tua conta e marcamos a primeira revisão.</span></div>
  </div>
</div></section>
<section class="sec on-2" id="planos" aria-labelledby="plans-h"><div class="wrap">
  <h2 class="h2 split" id="plans-h" style="margin-bottom:48px">Planos de manutenção.</h2>
  <div class="plans">${plans.map(([n, pr, li], i) => `<article class="plan up"><h3 class="h3">${n}</h3><p class="price">${eur(pr)}<span class="small"> / ano</span></p><ul>${li.map(x => `<li>${x}</li>`).join('')}</ul>${i === 1 ? `<a class="btn" href="orcamento.html?plano=${n.toLowerCase()}">Escolher ${n} ${I.arrow}</a>` : `<a class="btn-2" href="orcamento.html?plano=${n.toLowerCase().replace(' ', '-')}">Escolher ${n} ${I.arrow}</a>`}</article>`).join('')}</div>
</div></section>
<section class="sec" aria-labelledby="faq-h"><div class="grid">
  <div class="full" style="max-width:860px"><h2 class="h2 split" id="faq-h" style="margin-bottom:32px">Perguntas frequentes</h2>
  <div class="faq">${faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div></div>
</div></section>
<section class="band" aria-labelledby="mnt2-h">
  ${pic('manutencao', { alt: 'Troca do filtro de uma unidade de parede', sizes: '100vw' })}
  <div class="band-txt grid"><div><h2 class="h2" id="mnt2-h">Um filtro limpo muda tudo.</h2><p>Na revisão, trocamos o filtro e deixamos a data da próxima na tua conta.</p></div></div>
</section>
${closing('Marca a primeira visita.', 'Pedir orçamento')}
`});

/* =================== SOBRE =================== */
page('sobre.html', {
  title: 'Sobre — Uma equipa de Cascais · GW Soluções',
  desc: 'A GW Soluções planeia, instala e mantém climatização e ventilação em casas e escritórios da linha de Cascais.',
  page: 'sobre', hero: true,
  body: `
<section class="band" style="min-height:min(140vw,92svh)" aria-labelledby="h1" data-video-wrap>
  ${heroPicture('costa-45', 'costa-219', 'Água transparente sobre rochas, na costa de Cascais')}
  ${video('costa', {})}
  <div class="band-txt grid" style="padding-top:calc(var(--hdr) + 48px)"><div><h1 class="d-l" id="h1" style="color:#fff">De Cascais, para a linha.</h1><p>Conforto em casas com luz de mar, paredes grossas e janelas antigas.</p></div></div>
</section>
<section class="sec" aria-labelledby="hist-h"><div class="grid">
  <div class="full"><h2 class="h2 split" id="hist-h">Começámos por resolver o calor de uma sala virada a poente.</h2></div>
  <div class="full body" style="margin-top:32px">
    <p>A GW Soluções nasceu em Cascais em 2014, com dois técnicos e uma carrinha. Hoje somos onze, sempre com equipas próprias e sem subempreitadas.</p>
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
  <h2 class="h2 split" id="ofi-h" style="margin-bottom:48px">O ofício.</h2>
  <div class="duo">
    <figure class="rv">${pic('oficio', { alt: 'Técnico a nivelar um suporte com laser', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption>Nível laser e chão protegido, em todas as obras.</figcaption></figure>
    <figure class="rv">${pic('insitu-exterior', { alt: 'Unidade exterior numa fachada branca com céu azul', sizes: '(min-width: 768px) 46vw, 100vw' })}<figcaption>Unidades exteriores integradas na fachada.</figcaption></figure>
  </div>
</div></section>
<section class="sec" aria-labelledby="loc-h"><div class="grid">
  <div class="full ct-form"><h2 class="h2 split" id="loc-h">Onde estamos.</h2><p class="lede" style="margin:16px 0 24px">${c.address}. Atendimento ${c.hours.toLowerCase()}.</p><a class="btn-2" href="${c.maps}" rel="noopener" target="_blank">Abrir no mapa ${I.arrow}</a></div>
  <figure class="full ct-side rv" style="margin-top:32px">${pic('cascais-45', { alt: 'Rua de Cascais com casas brancas', sizes: '(min-width: 1024px) 34vw, 100vw' })}</figure>
</div></section>
${closing('Vamos conhecer a tua casa.', 'Pedir visita')}
`});

/* =================== CONTACTO =================== */
page('contacto.html', {
  title: 'Contacto · GW Soluções',
  desc: 'Telefone, email e morada da GW Soluções em Cascais. Envia uma mensagem e respondemos no mesmo dia útil.',
  page: 'contacto',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l split" id="h1">Fala connosco.</h1><p class="lede">Respondemos no mesmo dia útil.</p></div></div></section>
<section class="sec" style="padding-top:0"><div class="grid">
  <div class="full ct-form">
    <form class="form" data-demo-form novalidate>
      <div class="fld"><label for="f-nome">Nome</label><input id="f-nome" name="nome" autocomplete="name" required></div>
      <div class="fld"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
      <div class="fld"><label for="f-tel">Telefone <span class="muted">(opcional)</span></label><input id="f-tel" name="tel" type="tel" autocomplete="tel"></div>
      <div class="fld"><label for="f-ass">Assunto</label><select id="f-ass" name="assunto"><option>Pedido de orçamento</option><option>Manutenção</option><option>Avaria</option><option>Outro</option></select></div>
      <div class="fld"><label for="f-msg">Mensagem</label><textarea id="f-msg" name="msg" rows="5"></textarea></div>
      <div><button class="btn" type="submit">Enviar mensagem ${I.arrow}</button></div>
    </form>
    <div class="ok-box" data-demo-ok hidden tabindex="-1"><p class="h3">Mensagem pronta.</p><p class="muted">Nesta versão nada é enviado. Na versão final, recebes a resposta por email.</p></div>
  </div>
  <div class="full ct-side" style="margin-top:64px">
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

/* =================== ORÇAMENTO =================== */
page('orcamento.html', {
  title: 'Pedir orçamento · GW Soluções',
  desc: 'Cinco passos curtos: o problema, a divisão, a data e o contacto. Respondemos no mesmo dia útil.',
  page: 'orcamento',
  body: `
<div class="grid wiz" id="wizard">
  <aside class="wiz-side" aria-hidden="true">${corte({ id: 'corte-w', sizes: '50vw', tags: true, cotas: false })}</aside>
  <div class="wiz-main">
    <div class="wiz-prog" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
    <p class="wiz-count" id="wiz-count" aria-live="polite">Passo 1 de 5</p>
    <form id="wiz-form" novalidate>
      <section class="wp" data-step="0" aria-labelledby="w0"><h1 id="w0" tabindex="-1">O que se passa em casa?</h1><p class="small">Escolhe o mais próximo.</p>
        <div class="opts" role="radiogroup" aria-labelledby="w0">${D.problems.map(p => `<button type="button" class="opt" role="radio" aria-checked="false" data-w="problema" data-v="${p.id}" style="--sw:var(--${p.state})"><i class="sw" aria-hidden="true"></i>${p.label}${I.check}</button>`).join('')}<button type="button" class="opt" role="radio" aria-checked="false" data-w="problema" data-v="outro"><i class="sw" aria-hidden="true"></i>Outra coisa, ou manutenção${I.check}</button></div></section>
      <section class="wp" data-step="1" aria-labelledby="w1" hidden><h1 id="w1" tabindex="-1">Em que divisão?</h1><p class="small">A maquete acende a divisão escolhida.</p>
        <div class="opts" role="radiogroup" aria-labelledby="w1">${Object.entries(D.roomNames).map(([k, v]) => `<button type="button" class="opt opt-room" role="radio" aria-checked="false" data-w="divisao" data-v="${k}"><i class="sw" aria-hidden="true"></i>${v}${I.check}</button>`).join('')}<button type="button" class="opt opt-room" role="radio" aria-checked="false" data-w="divisao" data-v="varias"><i class="sw" aria-hidden="true"></i>Várias divisões${I.check}</button></div></section>
      <section class="wp" data-step="2" aria-labelledby="w2" hidden><h1 id="w2" tabindex="-1">Para quando?</h1><p class="small">Marcamos a visita a seguir.</p>
        <div class="opts" role="radiogroup" aria-labelledby="w2">${[['ja', 'Esta semana'], ['mes', 'Este mês'], ['ver', 'Só quero perceber o preço']].map(([k, v]) => `<button type="button" class="opt opt-room" role="radio" aria-checked="false" data-w="quando" data-v="${k}"><i class="sw" aria-hidden="true"></i>${v}${I.check}</button>`).join('')}</div></section>
      <section class="wp" data-step="3" aria-labelledby="w3" hidden><h1 id="w3" tabindex="-1">Como te contactamos?</h1><p class="small">Só usamos isto para responder.</p>
        <div class="form"><div class="fld"><label for="w-nome">Nome</label><input id="w-nome" name="nome" autocomplete="name" required></div><div class="fld"><label for="w-email">Email</label><input id="w-email" name="email" type="email" autocomplete="email" required></div><div class="fld"><label for="w-tel">Telefone <span class="muted">(opcional)</span></label><input id="w-tel" name="tel" type="tel" autocomplete="tel"></div></div></section>
      <section class="wp" data-step="4" aria-labelledby="w4" hidden><h1 id="w4" tabindex="-1">Confirma o pedido.</h1>
        <dl class="rev" id="w-rev"></dl>
        <div class="rev-prod" id="w-prod"><img src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"><div><span class="small">Sugestão</span><br><b id="w-prod-n">Unidade de parede UI-25</b></div></div></section>
      <section class="wp" data-step="5" aria-labelledby="w5" hidden><h1 id="w5" tabindex="-1">Pedido registado.</h1><p class="lede" style="margin-top:12px">Referência <span class="data" id="w-ref">GW-000000</span>. Nesta versão nada é enviado; na versão final, ligamos-te no mesmo dia útil.</p><p style="margin-top:24px"><a class="btn-2" href="loja.html">Ver a loja enquanto esperas ${I.arrow}</a></p></section>
    </form>
    <div class="wiz-bar" id="wiz-bar"><button type="button" class="btn btn-back" data-prev aria-label="Voltar" hidden>${I.left}</button><button type="button" class="btn" data-next>Continuar ${I.arrow}</button></div>
  </div>
</div>
`});

/* =================== CESTO =================== */
page('cesto.html', {
  title: 'Cesto · GW Soluções',
  desc: 'O teu cesto na loja da GW Soluções.',
  page: 'cesto',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l" id="h1">Cesto</h1></div></div></section>
<section class="sec" style="padding-top:0"><div class="grid">
  <div class="full cart-main"><div class="cart-items" id="cart-list" aria-live="polite"></div></div>
  <div class="full cart-side" id="cart-side">
    <div class="sum"><div><span>Subtotal</span><span class="data" id="c-sub">0 €</span></div><div><span>Entrega</span><span class="data">Grátis</span></div><div class="tot"><span>Total</span><span id="c-tot">0 €</span></div>
    <button type="button" class="btn btn-wide" style="margin-top:20px" data-checkout>Finalizar compra ${I.arrow}</button>
    <p class="small" style="margin-top:12px" id="co-note" aria-live="polite"></p></div>
  </div>
  <div class="full" id="cart-empty" hidden><div class="empty-cart">${pic('p-ui-25', { alt: '', sizes: '360px' })}<div><p class="h2">O cesto está vazio.</p><p class="lede" style="margin:12px 0 24px">Começa pela peça que mais instalamos.</p><a class="btn" href="loja.html">Ir à loja ${I.arrow}</a></div></div></div>
</div></section>
`});

/* =================== CONTA =================== */
page('conta.html', {
  title: 'Conta · GW Soluções',
  desc: 'A tua conta GW: equipamentos, revisões e encomendas.',
  page: 'conta',
  body: `
<section class="ph" aria-labelledby="h1"><div class="grid"><div class="full"><h1 class="d-l" id="h1">Olá, Inês.</h1><p class="lede">A tua casa em Cascais, num só sítio.</p></div></div></section>
<section class="sec" style="padding-top:0"><div class="grid">
  <div class="full acc-main">
    <div class="acc-tabs" role="tablist" aria-label="Conta"><button type="button" role="tab" aria-selected="true" aria-controls="t-eq" id="tb-eq">Equipamentos</button><button type="button" role="tab" aria-selected="false" aria-controls="t-rev" id="tb-rev" tabindex="-1">Revisões</button><button type="button" role="tab" aria-selected="false" aria-controls="t-enc" id="tb-enc" tabindex="-1">Encomendas</button></div>
    <div role="tabpanel" id="t-eq" aria-labelledby="tb-eq">
      <div class="mock" style="margin:0;padding:0">
        <div class="mock-row"><img src="img/p-ui-25-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-25 · Sala</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge">Revisão a 12 mar</span></div>
        <div class="mock-row"><img src="img/p-ui-12-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>UI-12 · Quarto</b><span class="data">Instalada a 12 mar 2026</span></div><span class="badge warn">Filtro a trocar</span></div>
        <div class="mock-row"><img src="img/p-vx-01-400.webp" alt="" width="400" height="500" loading="lazy"><div><b>VX-01 · Casa de banho</b><span class="data">Instalada a 2 abr 2026</span></div><span class="badge">Em dia</span></div>
      </div>
    </div>
    <div role="tabpanel" id="t-rev" aria-labelledby="tb-rev" hidden><table class="spec"><caption class="sr">Revisões</caption><tbody><tr><th scope="row">12 mar 2027</th><td>Revisão anual · UI-25, UI-12</td></tr><tr><th scope="row">2 abr 2027</th><td>Revisão anual · VX-01</td></tr><tr><th scope="row">14 set 2026</th><td>Troca de filtro · UI-12</td></tr></tbody></table></div>
    <div role="tabpanel" id="t-enc" aria-labelledby="tb-enc" hidden><table class="spec"><caption class="sr">Encomendas</caption><tbody><tr><th scope="row">GW-204118</th><td>FL-04 × 2 · 48 €</td></tr><tr><th scope="row">GW-198402</th><td>Instalação UI-25 + UE-50</td></tr></tbody></table></div>
  </div>
  <div class="full acc-side" style="margin-top:48px">
    <div class="sum" style="margin-top:0"><p class="h3">Próxima revisão</p><p class="num" style="margin:12px 0 4px">12.03</p><p class="small">UI-25 e UI-12 · manhã</p><button type="button" class="btn btn-wide" style="margin-top:20px" data-demo-note="Na versão final podes trocar a data aqui.">Mudar a data</button><p class="small" style="margin-top:12px" aria-live="polite" data-note-out></p></div>
    <p class="note" style="margin-top:16px">Área de cliente de demonstração, sem dados reais.</p>
  </div>
</div></section>
`});

/* =================== 404 =================== */
page('404.html', {
  title: 'Página não encontrada · GW Soluções',
  desc: 'Esta página não existe.',
  page: '404',
  extraHead: '<base href="/gw-solucoes/">\n',
  body: `
<section class="nf"><div class="grid">
  <div class="full"><h1 class="d-l split">Esta divisão não existe.</h1><p class="lede" style="margin-top:16px">O endereço pode ter mudado. Voltamos ao princípio?</p>
  <div class="row"><a class="btn" href="index.html">Página inicial ${I.arrow}</a><a class="btn-2" href="loja.html">Ver a loja ${I.arrow}</a></div></div>
  <div class="full" style="margin-top:48px"><div class="corte">${corte({ id: 'corte-404', dark: true, sizes: '100vw', cotas: false })}</div></div>
</div></section>
`});
finish();
