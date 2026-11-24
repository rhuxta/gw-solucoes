/* OW Soluções — loja (esboço). JS mínimo, sem dependências. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f') + '\u00a0€';

  /* iOS só aplica :active com um ouvinte de toque */
  document.addEventListener('touchstart', () => {}, { passive: true });

  /* Mega menu */
  const megaBtn = $('.mega-btn'), mega = $('#mega');
  if (megaBtn && mega) {
    const set = open => { megaBtn.setAttribute('aria-expanded', open); mega.hidden = !open; };
    megaBtn.addEventListener('click', () => set(mega.hidden));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !mega.hidden) { set(false); megaBtn.focus(); } });
    document.addEventListener('click', e => { if (!mega.hidden && !mega.contains(e.target) && e.target !== megaBtn && !megaBtn.contains(e.target)) set(false); });
  }

  /* Folhas (menu, filtros) com <dialog> nativo: foco preso e Esc incluídos */
  $$('[data-open]').forEach(b => b.addEventListener('click', () => $('#' + b.dataset.open)?.showModal()));
  $$('dialog').forEach(d => {
    $$('[data-close]', d).forEach(b => b.addEventListener('click', () => d.close()));
    d.addEventListener('click', e => { if (e.target === d) d.close(); });
  });

  /* ---------- Filtros, variante A: separadores de categoria + folha com contagens (aplicar em lote) ----------
     Só leem atributos gerados a partir de fonte/catalogo.json: data-tags (tags Shopify «grupo:valor»),
     data-price (variante «Com instalação»), data-kw e data-rank (metafields). Estado na query string. */
  const grid = $('[data-filterable]'), sheet = $('#filtrar'), form = $('[data-filter-form]');
  if (grid && sheet && form) {
    const DEF_CAT = 'ar-condicionado', PAGE = +grid.dataset.page || 12;
    const cards = $$('.card', grid);
    const tagsOf = new Map(cards.map(c => [c, new Set((c.dataset.tags || '').split(' '))]));
    const groups = $$('[data-group]', form).map(f => ({ el: f, g: f.dataset.group, radio: f.dataset.kind === 'radio' }));
    const G = Object.fromEntries(groups.map(x => [x.g, x]));
    const SORTL = Object.fromEntries($$('input[name="ordem"]', form).map(i => [i.value, i.closest('label').querySelector('.opt-l').textContent]));
    const tabs = $$('[data-cat-tab]'), CATL = Object.fromEntries(tabs.map(b => [b.dataset.catTab, b.textContent]));
    const blank = cat => ({ cat: cat || DEF_CAT, sel: Object.fromEntries(groups.map(x => [x.g, []])), sort: 'rel' });
    let state = blank(), limit = PAGE;
    const inCat = (c, cat) => cat === 'tudo' || tagsOf.get(c).has('categoria:' + cat);
    const fits = (c, s, skip) => {
      if (!inCat(c, s.cat)) return false;
      const t = tagsOf.get(c);
      for (const g in s.sel) { if (g === skip || !s.sel[g].length) continue; if (!s.sel[g].some(v => t.has(g + ':' + v))) return false; }
      return true;
    };
    const count = (s, skip) => cards.filter(c => fits(c, s, skip)).length;
    const clone = s => ({ cat: s.cat, sort: s.sort, sel: Object.fromEntries(Object.entries(s.sel).map(([k, v]) => [k, [...v]])) });
    const word = n => n === 1 ? 'resultado' : 'resultados';
    /* que grupos/opções fazem sentido nesta categoria (sem contar com os outros filtros) */
    const scope = cat => {
      const inC = cards.filter(c => inCat(c, cat));
      groups.forEach(({ el, g }) => {
        let shown = 0;
        $$('[data-count-for]', el).forEach(n => {
          const v = n.dataset.countFor.split(':')[1], k = inC.filter(c => tagsOf.get(c).has(g + ':' + v)).length;
          const lab = n.closest('label'); lab.hidden = k === 0; if (k) shown++;
          if (k === inC.length && shown === 1 && $$('[data-count-for]', el).length === 1) lab.hidden = false;
        });
        const only = $$('[data-count-for]', el).filter(n => !n.closest('label').hidden);
        const useless = only.length === 1 && inC.every(c => tagsOf.get(c).has(g + ':' + only[0].dataset.countFor.split(':')[1]));
        el.hidden = shown === 0 || useless;
      });
    };
    const valid = s => { groups.forEach(({ el, g }) => { s.sel[g] = s.sel[g].filter(v => { const i = $(`input[name="${g}"][value="${CSS.escape(v)}"]`, el); return i && !el.hidden && !i.closest('label').hidden; }); }); return s; };
    const read = () => { const f = new FormData(form), s = blank(state.cat); s.sort = f.get('ordem') || 'rel'; groups.forEach(({ g }) => { s.sel[g] = f.getAll(g).filter(Boolean); }); return s; };
    const write = s => {
      $$('input', form).forEach(i => {
        if (i.name === 'ordem') i.checked = i.value === s.sort;
        else if (G[i.name]?.radio) i.checked = (s.sel[i.name][0] || '') === i.value;
        else i.checked = (s.sel[i.name] || []).includes(i.value);
      });
    };
    const facet = () => {
      const p = read();
      $$('[data-count-for]', form).forEach(el => {
        const [g, v] = el.dataset.countFor.split(':');
        const t = clone(p); t.sel[g] = [v];
        const n = count(t); el.textContent = n;
        el.closest('label').classList.toggle('is-zero', n === 0);
      });
      const n = count(p); $('[data-pending-count]').textContent = n; $('[data-pending-word]').textContent = word(n);
    };
    const toURL = () => {
      const q = new URLSearchParams();
      if (state.cat !== DEF_CAT) q.set('cat', state.cat);
      groups.forEach(({ g }) => { if (state.sel[g].length) q.set(g, state.sel[g].join(',')); });
      if (state.sort !== 'rel') q.set('ordem', state.sort);
      const qs = q.toString();
      history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash);
    };
    const fromURL = () => {
      const q = new URLSearchParams(location.search), s = blank(q.get('cat') && (q.get('cat') in CATL) ? q.get('cat') : DEF_CAT);
      groups.forEach(({ g, radio }) => { const v = (q.get(g) || '').split(',').filter(Boolean); s.sel[g] = radio ? v.slice(0, 1) : v; });
      if (q.get('ordem') in SORTL) s.sort = q.get('ordem');
      /* «Por divisão» no menu: se a divisão não existe na categoria por omissão, mostra tudo */
      return s;
    };
    const num = (c, k) => c.dataset[k] === '' ? null : +c.dataset[k];
    const cmp = {
      rel: (a, b) => num(a, 'rank') - num(b, 'rank'),
      asc: (a, b) => (num(a, 'price') ?? 1e9) - (num(b, 'price') ?? 1e9),
      desc: (a, b) => (num(b, 'price') ?? -1) - (num(a, 'price') ?? -1),
      kw: (a, b) => (num(a, 'kw') ?? 1e9) - (num(b, 'kw') ?? 1e9) || (num(a, 'price') ?? 1e9) - (num(b, 'price') ?? 1e9),
    };
    const labelOf = (g, v) => { const i = $(`input[name="${g}"][value="${CSS.escape(v)}"]`, form); return i ? i.closest('label').querySelector('.opt-l,.tile-l').textContent : v; };
    const render = () => {
      scope(state.cat); valid(state);
      const ok = cards.filter(c => fits(c, state)).sort(cmp[state.sort]);
      const set = new Set(ok);
      ok.forEach(c => grid.appendChild(c));
      cards.filter(c => !set.has(c)).forEach(c => grid.appendChild(c));
      cards.forEach(c => { c.hidden = true; });
      ok.forEach((c, i) => { c.hidden = i >= limit; });
      const n = ok.length;
      $$('[data-result-count]').forEach(e => e.textContent = n);
      $$('[data-result-word]').forEach(e => e.textContent = word(n));
      $('[data-cat-title]').textContent = state.cat === 'tudo' ? 'Todos os equipamentos' : CATL[state.cat];
      $('[data-empty]').hidden = n > 0;
      const mw = $('[data-more-wrap]'); mw.hidden = n <= limit;
      if (n > limit) { $('[data-more-t]').textContent = `A mostrar ${limit} de ${n}`; $('[data-more]').textContent = `Mostrar mais ${Math.min(PAGE, n - limit)}`; }
      tabs.forEach(b => b.setAttribute('aria-pressed', b.dataset.catTab === state.cat));
      $('[data-sort-label]').textContent = SORTL[state.sort];
      const chips = [];
      groups.forEach(({ g }) => state.sel[g].forEach(v => chips.push([g, v, labelOf(g, v)])));
      const ac = $('[data-active-count]'); ac.hidden = !chips.length; ac.textContent = `(${chips.length})`;
      $('[data-applied]').hidden = !chips.length;
      $('[data-applied-list]').innerHTML = chips.map(([g, v, l]) => `<li><button type="button" data-rm="${g}:${v}">${l}<svg class="ico-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg><span class="sr">, remover filtro</span></button></li>`).join('');
      toURL();
    };
    let opener = null;
    $$('[data-open-filters]').forEach(b => b.addEventListener('click', () => { opener = b; scope(state.cat); write(state); facet(); sheet.showModal(); }));
    form.addEventListener('change', facet);
    $('[data-apply]').addEventListener('click', () => { state = read(); limit = PAGE; render(); sheet.close(); opener?.focus(); });
    $('[data-reset]').addEventListener('click', () => { write(blank(state.cat)); facet(); });
    $$('[data-reset-all]').forEach(b => b.addEventListener('click', () => { state = blank(state.cat); limit = PAGE; render(); $('[data-open-filters]').focus(); }));
    tabs.forEach(b => b.addEventListener('click', () => { state.cat = b.dataset.catTab; limit = PAGE; render(); }));
    $('[data-more]').addEventListener('click', () => { const first = limit; limit += PAGE; render(); const nx = $$('.card:not([hidden])', grid)[first]; nx?.querySelector('.card-name a')?.focus(); });
    $('[data-applied]').addEventListener('click', e => {
      const b = e.target.closest('[data-rm]'); if (!b) return;
      const [g, v] = b.dataset.rm.split(':'); state.sel[g] = state.sel[g].filter(x => x !== v);
      render(); ($('[data-rm]') || $('[data-open-filters]')).focus();
    });
    state = fromURL();
    /* a divisão pedida no menu pode não existir na categoria: valida e, se cair tudo, alarga para «Tudo» */
    const wanted = clone(state); scope(state.cat); valid(state);
    if (JSON.stringify(wanted.sel) !== JSON.stringify(state.sel)) { state = wanted; state.cat = 'tudo'; }
    render();
  }

  /* ---------- Filtros, variante B: escolha guiada com resultado ao vivo (inclui kits) ---------- */
  const gform = $('[data-guide]'), ggrid = $('[data-guided]');
  if (gform && ggrid) {
    const cards = $$('.card', ggrid);
    const tg = c => (c.dataset.tags || '').split(' ');
    const names = { quarto: 'um quarto', sala: 'uma sala', escritorio: 'um escritório', casa: 'várias divisões' };
    const short = { quarto: 'Quarto', sala: 'Sala', escritorio: 'Escritório', casa: 'Várias divisões' };
    const BR = { haier: 'Haier', mitsubishi: 'Mitsubishi Electric', samsung: 'Samsung' };
    const run = () => {
      const f = new FormData(gform), div = f.get('gdiv'), a = +f.get('garea'), br = f.get('gbrand');
      $('[data-area-out]').textContent = `${a}\u00a0m²`;
      const want = 'divisao:' + (div === 'casa' ? 'varias' : div);
      const ok = cards.filter(c => c.dataset.type !== 'acessorio' && tg(c).includes(want) && +c.dataset.amin <= a && +c.dataset.amax >= a && (!br || tg(c).includes('marca:' + br)));
      /* o mais ajustado primeiro: menor capacidade que cobre a área; em empate, o kit; depois preço (sob consulta no fim) */
      const pr = c => c.dataset.price === '' ? 1e9 : +c.dataset.price;
      ok.sort((x, y) => (x.dataset.amax - y.dataset.amax) || ((y.dataset.type === 'kit') - (x.dataset.type === 'kit')) || (pr(x) - pr(y)));
      cards.forEach(c => { c.hidden = !ok.includes(c); c.classList.remove('is-pick'); const p = $('.card-pick', c); if (p) p.hidden = true; });
      ok.forEach(c => ggrid.appendChild(c));
      const pick = ok.find(c => c.dataset.price !== '');
      if (pick) { pick.classList.add('is-pick'); const p = $('.card-pick', pick); if (p) { p.hidden = false; $('[data-pick-for]', p).textContent = `${a}\u00a0m²`; } ggrid.prepend(pick); }
      const n = ok.length, where = names[div];
      $('[data-gresult]').textContent = n ? `${n} ${n === 1 ? 'opção' : 'opções'} para ${where} de ${a}\u00a0m², com instalação` : `Para ${where} de ${a}\u00a0m² recomendamos ver o espaço primeiro`;
      $('[data-empty]').hidden = n > 0;
      $('[data-gsum-t]').textContent = `${short[div]} · ${a}\u00a0m²${br ? ' · ' + BR[br] : ''}`;
    };
    gform.addEventListener('input', run);
    gform.addEventListener('submit', e => e.preventDefault());
    run();
    const sum = $('[data-gsum]');
    let raf = 0;
    const chk = () => { raf = 0; const r = gform.getBoundingClientRect(), g = ggrid.getBoundingClientRect(); const on = r.bottom < 0 && g.bottom > 0; sum.classList.toggle('is-on', on); sum.setAttribute('aria-hidden', !on); };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(chk); }, { passive: true });
  }

  /* Separadores da vitrine (teclado: setas, Home, End) */
  $$('[role="tablist"]').forEach(list => {
    const tabs = $$('[role="tab"]', list);
    const select = t => {
      tabs.forEach(x => { const on = x === t; x.setAttribute('aria-selected', on); x.tabIndex = on ? 0 : -1; $('#' + x.getAttribute('aria-controls')).hidden = !on; });
      t.focus();
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', e => {
        const k = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
        if (k !== undefined) { e.preventDefault(); select(tabs[(k + tabs.length) % tabs.length]); }
      });
    });
  });

  /* Cesto: linhas em sessionStorage, mini-cesto em <dialog>, aviso falado */
  const KEY = 'ow-cesto-esboco-v2';
  let lines = []; try { lines = JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (_) { lines = []; }
  const cart = $('#cesto'), list = $('[data-cart-lines]');
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const paint = () => {
    const n = lines.reduce((a, l) => a + l.qty, 0), tot = lines.reduce((a, l) => a + l.qty * l.price, 0);
    $$('[data-cart-count]').forEach(e => e.textContent = n);
    $$('[data-cart-btn]').forEach(b => b.setAttribute('aria-label', `Cesto, ${n} ${n === 1 ? 'artigo' : 'artigos'}`));
    if (!list) return;
    $('[data-cart-n]').textContent = n ? `(${n})` : '';
    $('[data-cart-empty]').hidden = !!n; $('[data-cart-foot]').hidden = !n;
    $('[data-cart-total]').textContent = fmt(tot);
    list.innerHTML = lines.map((l, i) => `<li class="cart-line"><div><p class="cl-name">${esc(l.name)}</p><p class="cl-mode">${esc(l.line)}</p></div><p class="cl-price">${l.qty > 1 ? `<span>${l.qty} ×</span> ` : ''}${fmt(l.price)}</p><button type="button" class="cl-rm" data-rm="${i}">Remover<span class="sr"> ${esc(l.name)}, ${esc(l.line)}</span></button></li>`).join('');
  };
  const save = () => { sessionStorage.setItem(KEY, JSON.stringify(lines)); paint(); };
  paint();
  list?.addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (!b) return; lines.splice(+b.dataset.rm, 1); save(); ($('.cl-rm', list) || $('[data-close]', cart)).focus(); });
  let cartOpener = null;
  $$('[data-open-cart]').forEach(b => b.addEventListener('click', () => { cartOpener = b.closest('.toast') ? $('[data-cart-btn]') : b; paint(); cart.showModal(); }));
  cart?.addEventListener('close', () => cartOpener?.focus());
  const toast = $('[data-toast]'); let tmr;
  const LINE = { inst: 'Equipamento + instalação', eq: 'Só equipamento' };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-add]'); if (!b) return;
    let mode = b.dataset.mode || '', line = b.dataset.line || '', price = +b.dataset.price || 0;
    if (b.dataset.modeFrom) { const r = $(`input[name="${b.dataset.modeFrom}"]:checked`); mode = r.value; line = LINE[mode]; price = +r.dataset.price; }
    /* «Só equipamento» com gás fluorado: dados da empresa instaladora certificada (DL 145/2017) antes de juntar ao cesto */
    const decl = $('[data-decl]'); let inst = null;
    if (mode === 'eq' && decl) {
      $$('input', decl).forEach(i => { i.setCustomValidity(''); if (i.validity.valueMissing) i.setCustomValidity('Preenche este campo.'); else if (i.validity.patternMismatch) i.setCustomValidity('O NIF tem 9 algarismos.'); i.oninput = () => i.setCustomValidity(''); });
      const bad = $$('input', decl).find(i => !i.checkValidity());
      if (bad) { decl.hidden = false; bad.scrollIntoView({ block: 'center' }); bad.focus({ preventScroll: true }); bad.reportValidity(); return; }
      inst = Object.fromEntries($$('input', decl).map(i => [i.name.replace('decl-', ''), i.value.trim()]));
      line = `Só equipamento · instala ${inst.nome}`;
    }
    const name = b.dataset.add, hit = lines.find(l => l.name === name && l.line === line);
    if (hit) hit.qty++; else lines.push(inst ? { name, line, price, qty: 1, instalador: inst } : { name, line, price, qty: 1 });
    save();
    const what = `No cesto: ${name}, ${line.toLowerCase()}`;
    if (toast) { $('[data-toast-msg]', toast).textContent = what; toast.classList.add('is-on'); clearTimeout(tmr); tmr = setTimeout(() => toast.classList.remove('is-on'), 3200); }
  });

  /* Produto: Só equipamento / Com instalação, sincronizado com a barra fixa */
  const modes = $$('input[name="mode"]');
  if (modes.length) {
    const bar = $$('input[name="mode-bar"]'), sw = $('[data-mode-switch]');
    const sync = v => {
      modes.forEach(m => m.checked = m.value === v); bar.forEach(m => m.checked = m.value === v);
      const price = +modes.find(m => m.checked).dataset.price;
      $$('[data-price-out]').forEach(e => e.textContent = fmt(price));
      const n = $('[data-price-note]'), s = $('[data-price-note-s]');
      if (n) n.textContent = v === 'inst' ? 'com instalação, IVA incluído' : 'só o equipamento, IVA incluído';
      if (s) s.textContent = v === 'inst' ? 'com instalação' : 'só equipamento';
      $$('[data-buy-label]').forEach(e => e.textContent = v === 'inst' ? 'Comprar com instalação' : 'Comprar só o equipamento');
      $$('[data-mode-line]').forEach(e => e.textContent = LINE[v]);
      if (sw) sw.textContent = v === 'inst' ? sw.dataset.eq : sw.dataset.inst;
      const decl = $('[data-decl]'); if (decl) decl.hidden = v !== 'eq';
    };
    sw?.addEventListener('click', () => sync(modes.find(m => m.checked).value === 'inst' ? 'eq' : 'inst'));
    [...modes, ...bar].forEach(m => m.addEventListener('change', () => sync(m.value)));
    /* barra aparece sempre que o botão principal não está no ecrã (acima ou abaixo) */
    const main = $('#buy-add'), bb = $('[data-buybar]');
    if (main && bb) {
      let raf = 0;
      const check = () => { raf = 0; const r = main.getBoundingClientRect(); const off = r.bottom < 0 || r.top > innerHeight; bb.classList.toggle('is-on', off); bb.inert = !off; };
      addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(check); }, { passive: true });
      addEventListener('resize', check); check();
    }
  }

  /* Galeria: deslizar no telemóvel, miniaturas e setas no desktop */
  const track = $('[data-gallery]');
  if (track) {
    const figs = $$('figure', track), out = $('[data-g-count]'), thumbs = $$('[data-goto]');
    let cur = 0;
    const go = i => { cur = (i + figs.length) % figs.length; track.scrollTo({ left: figs[cur].offsetLeft - track.offsetLeft, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); };
    track.addEventListener('scroll', () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i !== cur || out.textContent === '') cur = i;
      out.textContent = `${cur + 1} / ${figs.length}`;
      thumbs.forEach((t, k) => t.setAttribute('aria-current', k === cur));
    }, { passive: true });
    $('[data-g-prev]')?.addEventListener('click', () => go(cur - 1));
    $('[data-g-next]')?.addEventListener('click', () => go(cur + 1));
    thumbs.forEach(t => t.addEventListener('click', () => go(+t.dataset.goto)));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); go(cur + 1); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(cur - 1); } });
  }
})();
