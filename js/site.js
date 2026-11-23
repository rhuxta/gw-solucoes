(function () {
  "use strict";
  var d = document, w = window, html = d.documentElement;
  var RM = w.matchMedia("(prefers-reduced-motion: reduce)");
  var reduce = RM.matches;
  var desk = w.matchMedia("(min-width: 1024px)");
  var G = w.GW || {};
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var raf = w.requestAnimationFrame.bind(w);
  var eur = function (n) { return n == null ? "Sob orçamento" : n.toLocaleString("pt-PT").replace(/\s/g, "\u202f") + "\u202f€"; };
  if (RM.addEventListener) RM.addEventListener("change", function (e) { reduce = e.matches; if (reduce) $$("video[data-video]").forEach(function (v) { v.pause(); }); });

  /* ---------- legacy produto.html?ref= ---------- */
  var qp = new URLSearchParams(location.search);
  if (d.body.getAttribute("data-page") === "produto" && qp.get("ref") && G.products) {
    var pr = G.products.find(function (p) { return p.ref === qp.get("ref").toUpperCase(); });
    if (pr && location.pathname.indexOf(pr.slug) < 0) { location.replace(pr.slug); return; }
  }

  /* ---------- header: solid + hide on scroll ---------- */
  var hdr = $("#hdr");
  var fixedHdr = d.body.getAttribute("data-hdr") === "fixed";
  var lastY = 0, ticking = false, menuOpen = false;
  function onScroll() {
    var y = w.scrollY;
    if (hdr) {
      hdr.classList.toggle("is-solid", y > 8);
      if (!fixedHdr && !menuOpen && !megaOpen) {
        if (y > 400 && y > lastY + 4) hdr.classList.add("is-hidden");
        else if (y < lastY - 4 || y < 400) hdr.classList.remove("is-hidden");
      }
    }
    lastY = y; ticking = false;
    scrollHooks.forEach(function (fn) { fn(y); });
  }
  var scrollHooks = [];
  w.addEventListener("scroll", function () { if (!ticking) { ticking = true; raf(onScroll); } }, { passive: true });

  /* ---------- mobile menu ---------- */
  var menuBtn = $(".menu-btn"), menu = $("#menu"), mainEl = $("#main"), ft = $(".ft");
  function setMenu(open) {
    if (!menu || !menuBtn) return;
    menuOpen = open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    if (open) { menu.removeAttribute("inert"); } else { menu.setAttribute("inert", ""); }
    [mainEl, ft].forEach(function (el) { if (el) { if (open) el.setAttribute("inert", ""); else el.removeAttribute("inert"); } });
    html.style.overflow = open ? "hidden" : "";
    if (open) { hdr.classList.remove("is-hidden"); var f = menu.querySelector("a"); if (f) setTimeout(function () { f.focus(); }, reduce ? 0 : 120); }
  }
  if (menuBtn) menuBtn.addEventListener("click", function () { setMenu(!menuOpen); });
  if (menu) menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  d.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (menuOpen) { setMenu(false); menuBtn.focus(); }
    if (megaOpen) { setMega(false); megaBtn.focus(); }
    if (sheetOpen) closeSheet();
  });
  desk.addEventListener("change", function () { if (desk.matches && menuOpen) setMenu(false); });

  /* ---------- mega menu ---------- */
  var megaBtn = $(".mega-btn"), mega = $("#mega"), megaOpen = false, megaT;
  function setMega(open) {
    if (!mega) return;
    megaOpen = open;
    megaBtn.setAttribute("aria-expanded", String(open));
    mega.classList.toggle("is-open", open);
    if (open) mega.removeAttribute("inert"); else mega.setAttribute("inert", "");
    if (open) hdr.classList.add("is-solid");
  }
  if (megaBtn && mega) {
    megaBtn.addEventListener("click", function () { setMega(!megaOpen); });
    if (w.matchMedia("(hover: hover)").matches) {
      [megaBtn, mega].forEach(function (el) {
        el.addEventListener("mouseenter", function () { clearTimeout(megaT); setMega(true); });
        el.addEventListener("mouseleave", function () { megaT = setTimeout(function () { setMega(false); }, 180); });
      });
    }
    d.addEventListener("click", function (e) { if (megaOpen && !e.target.closest("#mega") && !e.target.closest(".mega-btn")) setMega(false); });
    mega.addEventListener("focusout", function (e) { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== megaBtn) setMega(false); });
  }

  /* ---------- reveals ---------- */
  if ("IntersectionObserver" in w && !reduce) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); rio.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.01 });
    $$(".split, .rv, .up").forEach(function (el) { rio.observe(el); });
  } else { $$(".split, .rv, .up").forEach(function (el) { el.classList.add("is-in"); }); }

  /* ---------- video (after load, respects reduced motion / save-data) ---------- */
  function initVideos() {
    $$("[data-video]").forEach(function (v) {
      var wrap = v.closest("[data-video-wrap]") || v.parentNode;
      var btn = wrap.querySelector("[data-vid-btn]");
      var saveData = navigator.connection && navigator.connection.saveData;
      if (reduce || saveData) return;
      $$("source", v).forEach(function (s) { s.src = s.getAttribute("data-src"); });
      v.load();
      var userPaused = false;
      function play() { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      v.addEventListener("playing", function () { v.classList.add("is-on"); if (btn) btn.hidden = false; }, { once: true });
      if (btn) btn.addEventListener("click", function () {
        if (v.paused) { userPaused = false; play(); btn.setAttribute("aria-label", "Pausar vídeo"); btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3.5" height="14"/><rect x="13.5" y="5" width="3.5" height="14"/></svg>'; }
        else { userPaused = true; v.pause(); btn.setAttribute("aria-label", "Reproduzir vídeo"); btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'; }
      });
      if ("IntersectionObserver" in w) {
        new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { if (!userPaused) play(); } else v.pause(); }); }, { threshold: 0.2 }).observe(wrap);
      } else play();
    });
  }
  if (d.readyState === "complete") setTimeout(initVideos, 200); else w.addEventListener("load", function () { setTimeout(initVideos, 200); });

  /* ---------- cart ---------- */
  var KEY = "gw-cesto";
  function readCart() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function writeCart(l) { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch (e) {} paintCount(true); }
  function paintCount(pop) {
    var n = readCart().reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    $$(".cart-n").forEach(function (el) {
      el.textContent = n ? String(n) : "";
      if (pop && n && !reduce && el.animate) el.animate([{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], { duration: 320, easing: "cubic-bezier(.22,1,.36,1)" });
    });
    $$('a[aria-label^="Cesto"]').forEach(function (a) { a.setAttribute("aria-label", n ? "Cesto, " + n + (n === 1 ? " artigo" : " artigos") : "Cesto"); });
  }
  paintCount(false);
  var toast = $("#toast"), toastT;
  function showToast(msg, link) {
    if (!toast) return;
    $("#toast-t").textContent = msg;
    toast.querySelector("a").hidden = link === false;
    toast.classList.add("is-on");
    clearTimeout(toastT); toastT = setTimeout(function () { toast.classList.remove("is-on"); }, 3000);
  }
  d.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (!b) return;
    var ref = b.getAttribute("data-add"), l = readCart(), f = l.find(function (i) { return i.ref === ref; });
    if (f) f.qty += 1; else l.push({ ref: ref, qty: 1, pack: "completo" });
    writeCart(l);
    var p = G.products && G.products.find(function (x) { return x.ref === ref; });
    showToast((p ? p.name + " " + p.ref : ref) + (p && (p.fn === "controlo" || p.fn === "manutencao") ? " no cesto" : " no cesto, com instalação"));
  });
  var cartList = $("#cart-list");
  if (cartList && G.products) {
    var paintCart = function () {
      var items = readCart(), sub = 0;
      $("#cart-empty").hidden = !!items.length;
      $("#cart-side").hidden = !items.length;
      cartList.parentNode.hidden = !items.length;
      var PHV = function (t) { return '<span class="phv">[' + t + ']</span>'; };
      var refs = [];
      cartList.innerHTML = items.map(function (i) {
        var p = G.products.find(function (x) { return x.ref === i.ref; }) || G.products[0];
        sub += (p.price || 0) * i.qty; refs.push(p.ref);
        var acc = p.fn === "controlo" || p.fn === "manutencao", pk = i.pack || "completo";
        var lines = acc
          ? '<li><span>Acessório</span><span class="data">' + eur(p.price) + '</span></li><li><span>Segue com o teu pacote ou na próxima manutenção</span><span></span></li>'
          : '<li><span>Equipamento ' + p.ref + '</span><span class="data">' + eur(p.price) + '</span></li><li><span>Entrega em casa, pelo fornecedor</span><span class="data">' + PHV("a confirmar") + '</span></li><li><span>Instalação OW</span><span class="data">' + PHV("preço €") + '</span></li>' + (pk === "completo" ? '<li><span><b>1.ª manutenção incluída</b></span><span class="data">incluída</span></li>' : "");
        var choose = acc ? "" : '<fieldset class="ci-pk"><legend class="sr">Pacote para ' + p.name + '</legend><label class="chk"><input type="radio" name="pk-' + p.ref + '" value="base" data-pk="' + p.ref + '"' + (pk === "base" ? " checked" : "") + '> Equipamento + instalação</label><label class="chk"><input type="radio" name="pk-' + p.ref + '" value="completo" data-pk="' + p.ref + '"' + (pk === "completo" ? " checked" : "") + '> Pacote completo, com 1.ª manutenção</label></fieldset>';
        return '<div class="ci ci-pack"><img src="img/p-' + p.ref.toLowerCase() + '-400.webp" alt="" width="400" height="500"><div><span class="lbl">' + (acc ? "Acessório" : "Pacote com instalação") + '</span><b>' + p.name + " " + p.ref + '</b><ul class="ci-lines">' + lines + '</ul>' + choose + '<div class="qty" role="group" aria-label="Quantidade de ' + p.name + '"><button type="button" data-q="-1" data-r="' + p.ref + '" aria-label="Menos um">−</button><output>' + i.qty + '</output><button type="button" data-q="1" data-r="' + p.ref + '" aria-label="Mais um">+</button></div></div><button type="button" class="rm" data-rm="' + p.ref + '">Remover</button></div>';
      }).join("");
      var go = $("#c-go"); if (go) go.href = "orcamento.html?ref=" + refs.join(",") + "&from=cesto";
      $("#c-sub").textContent = eur(sub);
      html.classList.add("cart-ready");
    };
    paintCart();
    cartList.addEventListener("click", function (e) {
      var q = e.target.closest("[data-q]"), rm = e.target.closest("[data-rm]"), l = readCart();
      if (q) { var it = l.find(function (i) { return i.ref === q.getAttribute("data-r"); }); it.qty = Math.max(1, it.qty + Number(q.getAttribute("data-q"))); writeCart(l); paintCart(); var again = cartList.querySelector('[data-r="' + it.ref + '"][data-q="' + q.getAttribute("data-q") + '"]'); if (again) again.focus(); }
      if (rm) { writeCart(l.filter(function (i) { return i.ref !== rm.getAttribute("data-rm"); })); paintCart(); var h = $("#h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus(); } }
    });
    cartList.addEventListener("change", function (e) {
      var r = e.target.closest("[data-pk]"); if (!r) return;
      var l = readCart(), it = l.find(function (i) { return i.ref === r.getAttribute("data-pk"); }); if (it) { it.pack = r.value; writeCart(l); paintCart(); var again = cartList.querySelector('[data-pk="' + it.ref + '"][value="' + r.value + '"]'); if (again) again.focus(); }
    });
  }

  /* ---------- small demo bits ---------- */
  $$("[data-demo-note]").forEach(function (b) { b.addEventListener("click", function () { var o = b.parentNode.querySelector("[data-note-out]"); if (o) o.textContent = b.getAttribute("data-demo-note"); }); });
  $$("[data-demo-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.checkValidity()) { var bad = f.querySelector(":invalid"); if (bad) { bad.reportValidity(); bad.focus(); } return; }
      f.hidden = true; var ok = f.parentNode.querySelector("[data-demo-ok]"); ok.hidden = false; ok.focus();
    });
  });
  var tabs = $$('[role="tab"]');
  if (tabs.length) {
    var selTab = function (t) { tabs.forEach(function (x) { var on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; $("#" + x.getAttribute("aria-controls")).hidden = !on; }); t.focus(); };
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { selTab(t); });
      t.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") selTab(tabs[(i + 1) % tabs.length]); if (e.key === "ArrowLeft") selTab(tabs[(i - 1 + tabs.length) % tabs.length]); });
    });
  }

  /* ---------- rails ---------- */
  $$("[data-rail-ctl]").forEach(function (ctl) {
    var rail = $("#" + ctl.getAttribute("data-rail-ctl")); if (!rail) return;
    var items = rail.children, out = ctl.querySelector("output"), prev = ctl.querySelector("[data-prev]"), next = ctl.querySelector("[data-next]");
    var idx = function () { var wd = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 0); return Math.round(rail.scrollLeft / wd); };
    var max = function () { return rail.scrollWidth - rail.clientWidth - 2; };
    var paint = function () { var i = idx(); out.textContent = (i + 1) + " / " + items.length; prev.disabled = rail.scrollLeft < 2; next.disabled = rail.scrollLeft >= max(); };
    var go = function (dir) { var wd = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 0); rail.scrollBy({ left: dir * wd, behavior: reduce ? "auto" : "smooth" }); };
    prev.addEventListener("click", function () { go(-1); }); next.addEventListener("click", function () { go(1); });
    var t; rail.addEventListener("scroll", function () { if (!t) t = raf(function () { t = 0; paint(); }); }, { passive: true });
    raf(paint); w.addEventListener("resize", paint, { passive: true });
  });

  /* ---------- "como trabalhamos" progress ---------- */
  var stepsEl = $("[data-steps]");
  if (stepsEl) {
    var bar = stepsEl.querySelector(".steps-bar");
    if (reduce) bar.style.setProperty("--p", 1);
    else scrollHooks.push(function () { var r = stepsEl.getBoundingClientRect(), vh = w.innerHeight; var p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / r.height)); bar.style.setProperty("--p", p.toFixed(3)); });
  }

  /* ---------- corte (maquete): light is a CSS layer per room, no extra images ---------- */
  var AR = (G.rooms && G.rooms.ar) || 0.8;
  function Corte(view) {
    this.view = view; this.stage = view.querySelector(".corte-stage"); this.room = null; this.state = null; this.zoom = false;
    var self = this, t = 0, k = function () { if (!t) t = raf(function () { t = 0; self.cam(); }); };
    if ("ResizeObserver" in w) new ResizeObserver(k).observe(view); else w.addEventListener("resize", k, { passive: true });
  }
  Corte.prototype.cam = function () {
    var v = this.view, st = this.stage, R = G.rooms && G.rooms.rooms;
    var VW = v.clientWidth, VH = v.clientHeight, SH = VW * AR, s = 1, tx = 0, ty = 0;
    if (!VW || !VH) return;
    var fit = Math.min(1, VH / SH);
    if (this.zoom && this.room && R && R[this.room] && !desk.matches) {
      var b = R[this.room], x0 = b[0][0] / 100, y0 = b[0][1] / 100, x1 = b[1][0] / 100, y1 = b[2][1] / 100;
      s = Math.min(1 / (x1 - x0), VH / ((y1 - y0) * SH)) * 0.94;
      tx = VW / 2 - (x0 + x1) / 2 * VW * s; ty = VH / 2 - (y0 + y1) / 2 * SH * s;
    } else { s = fit; tx = (VW - VW * s) / 2; ty = (VH - SH * s) / 2; }
    st.style.setProperty("--s", s.toFixed(4)); st.style.transform = "translate(" + tx.toFixed(1) + "px," + ty.toFixed(1) + "px) scale(" + s.toFixed(4) + ")";
  };
  Corte.prototype.set = function (room, state) {
    this.room = room; this.state = state;
    var st = this.stage;
    if (room) st.setAttribute("data-room", room); else st.removeAttribute("data-room");
    $$(".c-tag", st).forEach(function (t) { t.classList.toggle("is-on", t.getAttribute("data-tag") === room); });
    $$(".c-led", st).forEach(function (l) { l.classList.toggle("is-on", state === "ok" && l.getAttribute("data-led") === room); });
    $$(".luz", st).forEach(function (l) {
      var on = !!room && !!state && l.getAttribute("data-room") === room;
      if (on) l.setAttribute("data-state", state);
      l.classList.toggle("is-on", on);
    });
    this.cam();
  };
  Corte.prototype.preload = function () {};

  /* ---------- diagnosis ---------- */
  var diag = $("#diag");
  if (diag && G.answers) {
    var C = new Corte($("#corte", diag)); C.zoom = true; raf(function () { C.cam(); });
    var P = null, Rm = null, cmp = $("#cmp", diag), res = $("#res", diag);
    var cap = $("#diag-cap"), live = $("#diag-live");
    var probBtns = $$("[data-problem]", diag), roomBtns = $$("[data-room]", $("#rooms", diag));
    var label = function (id) { var p = G.problems.find(function (x) { return x.id === id; }); return p ? p.label : ""; };
    function paint() {
      probBtns.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-problem") === P)); });
      roomBtns.forEach(function (b) { b.setAttribute("aria-checked", String(b.getAttribute("data-room") === Rm)); });
      var p2 = diag.querySelector("[data-p2]"); if (p2) p2.classList.toggle("is-on", !!P);
      var pt = $("#prog-t"); if (pt) pt.textContent = P ? "2 de 2" : "1 de 2";
      var after = cmp && cmp.value === "1";
      C.set(Rm, Rm ? (P ? (after ? "ok" : P) : "ok") : null);
      if (cap) cap.textContent = Rm ? G.roomNames[Rm] + (P ? " · " + label(P).toLowerCase() : "") : "A casa inteira, em corte";
      if (P && Rm) {
        var ref = G.recs[P][Rm], prod = G.products.find(function (x) { return x.ref === ref; });
        var wasHidden = res.hidden; res.hidden = false; diag.classList.add("has-res"); raf(function () { C.cam(); });
        if (wasHidden && !reduce) { res.classList.remove("is-new"); raf(function () { res.classList.add("is-new"); }); }
        $("#res-for").textContent = "Para " + ({ sala: "a sala", quarto: "o quarto", escritorio: "o escritório", banho: "a casa de banho" })[Rm] + " · " + label(P).toLowerCase();
        $("#res-h").textContent = prod.name + " " + prod.ref;
        $("#res-text").textContent = G.answers[P][Rm];
        var im = $("#res-img"); im.src = "img/p-" + prod.ref.toLowerCase() + "-400.webp"; im.alt = prod.name;
        var data = G.comfort[P][after ? "after" : "before"], un = G.comfortUnits[P];
        [0, 1, 2].forEach(function (i) { var n = res.querySelector('[data-m="' + i + '"]'); n.textContent = data[i]; res.querySelector('[data-u="' + i + '"]').textContent = un[i] + (i === 0 ? " na divisão" : i === 1 ? " de ruído" : ""); });
        $("#res-quote").href = "orcamento.html?problema=" + P + "&divisao=" + Rm + "&ref=" + prod.ref;
        $("#res-prod").href = prod.slug;
        if (cmp) cmp.setAttribute("aria-valuetext", after ? "Com a solução" : "Agora");
        if (live) live.textContent = G.roomNames[Rm] + ": " + label(P).toLowerCase() + ". Sugestão: " + prod.name + " " + prod.ref + ".";
      }
    }
    probBtns.forEach(function (b) {
      b.addEventListener("click", function () { P = b.getAttribute("data-problem"); if (!Rm) Rm = G.problems.find(function (x) { return x.id === P; }).room; if (cmp) cmp.value = "0"; paint(); });
      b.addEventListener("pointerenter", function () { var p = G.problems.find(function (x) { return x.id === b.getAttribute("data-problem"); }); C.preload(Rm || p.room, p.id); });
    });
    roomBtns.forEach(function (b) { b.addEventListener("click", function () { Rm = b.getAttribute("data-room"); if (cmp) cmp.value = "0"; paint(); }); });
    $$('[role="radiogroup"]', diag).map(function (g) { return $$('[role="radio"]', g); }).forEach(function (group) {
      group.forEach(function (b, i) { b.addEventListener("keydown", function (e) { var k = e.key, n = null; if (k === "ArrowDown" || k === "ArrowRight") n = group[(i + 1) % group.length]; if (k === "ArrowUp" || k === "ArrowLeft") n = group[(i - 1 + group.length) % group.length]; if (n) { e.preventDefault(); n.focus(); n.click(); } }); });
    });
    if (cmp) cmp.addEventListener("input", paint);
    if (qp.get("problema")) P = qp.get("problema");
    if (qp.get("divisao")) Rm = qp.get("divisao");
    if (P || Rm) paint();
  }
  /* fixed corte (product page "Na casa") */
  $$("[data-corte-fixed]").forEach(function (box) {
    var C2 = new Corte(box.querySelector(".corte-view")); C2.zoom = true;
    var room = box.getAttribute("data-corte-fixed");
    if ("IntersectionObserver" in w) { var io2 = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { C2.set(room, "ok"); io2.disconnect(); } }, { rootMargin: "200px" }); io2.observe(box); } else C2.set(room, "ok");
    raf(function () { C2.cam(); });
  });

  /* ---------- shop ---------- */
  var grid = $("[data-grid]");
  var sheet = $("#sheet"), sheetOpen = false, sheetBg = $(".sheet-bg");
  function closeSheet() {
    if (!sheet) return; sheetOpen = false; sheet.classList.remove("is-open"); sheetBg.classList.remove("is-open"); sheet.setAttribute("inert", ""); html.style.overflow = ""; sheet.style.transform = "";
    var ob = $("[data-sheet-open]"); ob.setAttribute("aria-expanded", "false"); ob.focus();
  }
  if (grid) {
    var cardsAll = $$("[data-product]", grid), tile = $("[data-tile]", grid), emptyEl = $("[data-empty]", grid);
    var forms = $$("[data-filters]"), cat = qp.get("cat") || "tudo", sortV = "rel";
    if (qp.get("div")) forms.forEach(function (f) { var i = f.querySelector('input[name="rooms"][value="' + qp.get("div") + '"]'); if (i) i.checked = true; });
    var names = { rooms: G.roomNames, ctx: { residencial: "Residencial", comercial: "Comercial" }, fn: { climatizacao: "Climatização", ventilacao: "Ventilação", controlo: "Controlo", manutencao: "Manutenção" }, price: { "0-100": "Até 100 €", "100-500": "100 a 500 €", "500-99998": "Mais de 500 €", "99999-99999": "Sob orçamento" } };
    var catNames = {}; $$(".tab").forEach(function (t) { catNames[t.getAttribute("data-cat")] = t.textContent; });
    var getSel = function () { var f = forms[0], o = { rooms: [], ctx: [], fn: [], price: [] }; $$("input:checked", f).forEach(function (i) { o[i.name].push(i.value); }); return o; };
    function apply(announce) {
      var s = getSel(), n = 0, nf = s.rooms.length + s.ctx.length + s.fn.length + s.price.length;
      var any = nf > 0 || cat !== "tudo";
      var list = cardsAll.slice();
      if (sortV !== "rel") list.sort(function (a, b) { var pa = +a.getAttribute("data-price"), pb = +b.getAttribute("data-price"); return sortV === "asc" ? pa - pb : pb - pa; });
      list.forEach(function (c, i) {
        var ok = (cat === "tudo" || c.getAttribute("data-cat") === cat)
          && (!s.rooms.length || s.rooms.some(function (r) { return c.getAttribute("data-rooms").split(" ").indexOf(r) > -1; }))
          && (!s.ctx.length || s.ctx.indexOf(c.getAttribute("data-ctx")) > -1)
          && (!s.fn.length || s.fn.indexOf(c.getAttribute("data-fn")) > -1)
          && (!s.price.length || s.price.some(function (r) { var a = r.split("-"), p = +c.getAttribute("data-price"); return p >= +a[0] && p <= +a[1]; }));
        c.hidden = !ok; if (ok) n++;
        c.classList.toggle("is-feat", !any && sortV === "rel" && i === 0);
        grid.insertBefore(c, emptyEl);
      });
      if (tile) { tile.hidden = any || sortV !== "rel"; var vis = list.filter(function (c) { return !c.hidden; }); if (vis[6]) grid.insertBefore(tile, vis[6]); }
      emptyEl.hidden = n > 0;
      var txt = n + (n === 1 ? " artigo" : " artigos");
      $$("[data-count]").forEach(function (e) { e.textContent = txt; });
      var see = $("[data-see]"); if (see) see.textContent = "Ver " + txt;
      var fc = $("[data-fn-count]"); if (fc) fc.textContent = nf ? "(" + nf + ")" : "";
      $$(".tab").forEach(function (t) { t.setAttribute("aria-pressed", String(t.getAttribute("data-cat") === cat)); });
      var act = $("[data-active]"), chips = [];
      if (cat !== "tudo") chips.push('<button type="button" data-x-cat>' + catNames[cat] + ' <span aria-hidden="true">×</span><span class="sr">, remover filtro</span></button>');
      Object.keys(s).forEach(function (k) { s[k].forEach(function (v) { chips.push('<button type="button" data-x="' + k + '" data-v="' + v + '">' + names[k][v] + ' <span aria-hidden="true">×</span><span class="sr">, remover filtro</span></button>'); }); });
      act.innerHTML = chips.join("");
      $$("[data-mini]").forEach(function (m) { m.classList.toggle("is-on", s.rooms.indexOf(m.getAttribute("data-mini")) > -1); });
      if (announce) $("[data-live]").textContent = txt + " encontrados";
      var u = new URL(location.href); if (cat !== "tudo") u.searchParams.set("cat", cat); else u.searchParams.delete("cat"); u.searchParams.delete("div"); history.replaceState(null, "", u);
    }
    forms.forEach(function (f) {
      f.addEventListener("change", function (e) {
        var i = e.target; forms.forEach(function (g) { if (g !== f) { var m = g.querySelector('input[name="' + i.name + '"][value="' + i.value + '"]'); if (m) m.checked = i.checked; } });
        apply(true);
      });
    });
    $$(".tab").forEach(function (t) { t.addEventListener("click", function () { cat = t.getAttribute("data-cat"); apply(true); }); });
    $$("[data-sort]").forEach(function (s) { s.addEventListener("change", function () { sortV = s.value; $$("[data-sort]").forEach(function (o) { o.value = sortV; }); apply(true); }); });
    d.addEventListener("click", function (e) {
      var x = e.target.closest("[data-x]"), xc = e.target.closest("[data-x-cat]"), cl = e.target.closest("[data-clear]");
      if (x) { forms.forEach(function (f) { var m = f.querySelector('input[name="' + x.getAttribute("data-x") + '"][value="' + x.getAttribute("data-v") + '"]'); if (m) m.checked = false; }); apply(true); var first = $("[data-active] button") || $(".tab[aria-pressed=true]"); if (first) first.focus(); }
      if (xc) { cat = "tudo"; apply(true); $(".tab").focus(); }
      if (cl) { forms.forEach(function (f) { $$("input", f).forEach(function (i) { i.checked = false; }); }); cat = "tudo"; apply(true); }
    });
    apply(false);
    if (location.hash === "#pesquisa") { var tb = $(".tab"); if (tb) setTimeout(function () { tb.focus(); }, 300); }
    // sheet
    var openB = $("[data-sheet-open]");
    if (openB && sheet) {
      openB.addEventListener("click", function () { sheetOpen = true; sheet.removeAttribute("inert"); sheet.classList.add("is-open"); sheetBg.classList.add("is-open"); openB.setAttribute("aria-expanded", "true"); html.style.overflow = "hidden"; setTimeout(function () { var f = sheet.querySelector("summary, input, button"); if (f) f.focus(); }, reduce ? 0 : 200); });
      $$("[data-sheet-close]").forEach(function (b) { b.addEventListener("click", closeSheet); });
      sheet.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return; var f = $$("summary, input, button, select", sheet).filter(function (x) { return x.offsetParent !== null; }); var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
      });
      var grip = $("[data-grip]"), y0 = null, dy = 0;
      grip.addEventListener("pointerdown", function (e) { y0 = e.clientY; dy = 0; sheet.style.transition = "none"; grip.setPointerCapture(e.pointerId); });
      grip.addEventListener("pointermove", function (e) { if (y0 == null) return; dy = Math.max(0, e.clientY - y0); sheet.style.transform = "translateY(" + dy + "px)"; });
      grip.addEventListener("pointerup", function () { sheet.style.transition = ""; if (dy > 120) closeSheet(); else sheet.style.transform = ""; y0 = null; });
    }
  }

  /* ---------- product page ---------- */
  var gal = $("#gal");
  if (gal) {
    var ind = $$(".gal-ind i"), gt;
    gal.addEventListener("scroll", function () { if (gt) return; gt = raf(function () { gt = 0; var i = Math.round(gal.scrollLeft / gal.clientWidth); ind.forEach(function (x, j) { x.classList.toggle("is-on", i === j); }); }); }, { passive: true });
  }
  var buybar = $("#buybar");
  if (buybar) { buybar.classList.add("is-on"); buybar.removeAttribute("aria-hidden"); $$("a, button", buybar).forEach(function (b) { b.tabIndex = 0; }); }
  var chapLinks = $$(".chap a");
  if (chapLinks.length && "IntersectionObserver" in w) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) chapLinks.forEach(function (a) { var on = a.getAttribute("href") === "#" + en.target.id; a.classList.toggle("is-on", on); if (on) { a.setAttribute("aria-current", "true"); var p = a.parentNode; var l = a.offsetLeft - 20; if (Math.abs(p.scrollLeft - l) > 40) p.scrollTo({ left: l, behavior: reduce ? "auto" : "smooth" }); } else a.removeAttribute("aria-current"); }); });
    }, { rootMargin: "-110px 0px -60% 0px" });
    $$(".ch").forEach(function (s) { cio.observe(s); });
  }
  var specAll = $("[data-spec-all]");
  if (specAll) specAll.addEventListener("click", function () { var t = $("[data-spec]"), on = t.classList.toggle("is-all"); specAll.setAttribute("aria-expanded", String(on)); specAll.textContent = on ? "Ver menos" : "Ver todas (" + t.rows.length + ")"; });

  /* explode + model-viewer */
  var xpl = $("[data-xpl]");
  if (xpl) {
    var range = $("[data-xpl-range]", xpl), view = $(".xpl-view", xpl), mv = null, mvReady = false, arBtn = $("[data-ar]", xpl);
    if (reduce) range.step = 50;
    var setX = function (v) {
      v = Math.max(0, Math.min(100, v)); range.value = v;
      view.style.setProperty("--x", (v / 100).toFixed(3));
      xpl.classList.toggle("is-open", v > 60);
      range.setAttribute("aria-valuetext", v < 5 ? "Fechada" : v > 95 ? "Aberta" : "A abrir, " + Math.round(v) + "%");
      if (mv && mvReady) { mv.currentTime = (v / 100) * (mv.duration || 1.2) * 0.999; }
    };
    range.addEventListener("input", function () { setX(+range.value); });
    function loadMV(cb) {
      if (mv) { if (cb) cb(); return; }
      var s = d.createElement("script"); s.type = "module"; s.src = "vendor/model-viewer.min.js"; d.head.appendChild(s);
      mv = d.createElement("model-viewer");
      var at = { src: "3d/ui-25.glb", alt: "Modelo 3D da unidade de parede UI-25", "camera-controls": "", "touch-action": "pan-y", "interaction-prompt": "none", "shadow-intensity": "0.7", "shadow-softness": "1", exposure: "1.05", "environment-image": "neutral", "camera-orbit": "-30deg 80deg auto", "field-of-view": "24deg", "animation-name": "explode", ar: "", "ar-modes": "webxr scene-viewer quick-look", "ar-placement": "wall", "disable-zoom": "", poster: $(".xpl-closed", view).currentSrc || $(".xpl-closed", view).src, reveal: "auto", loading: "eager" };
      Object.keys(at).forEach(function (k) { mv.setAttribute(k, at[k]); });
      mv.addEventListener("load", function () {
        mv.pause(); try { var c = mv.getBoundingBoxCenter(), dm = mv.getDimensions(), OPEN = 0.84, ext = Math.max(dm.x, dm.z + OPEN); mv.cameraTarget = c.x.toFixed(3) + "m " + c.y.toFixed(3) + "m " + (c.z + OPEN / 2).toFixed(3) + "m"; mv.cameraOrbit = "-30deg 80deg " + (ext * (view.clientWidth < view.clientHeight ? 3.6 : 2.5)).toFixed(2) + "m"; mv.fieldOfView = "24deg"; mv.maxCameraOrbit = "auto auto 12m"; mv.maxFieldOfView = "40deg"; mv.minCameraOrbit = "auto auto " + (ext * 1.4).toFixed(2) + "m"; if (mv.jumpCameraToGoal) mv.jumpCameraToGoal(); } catch (e) {} mvReady = true; setX(+range.value);
        view.querySelectorAll("img").forEach(function (i) { i.style.visibility = "hidden"; });
        if (mv.canActivateAR) arBtn.hidden = false;
        if (cb) cb();
      });
      view.appendChild(mv);
      var lb = $("[data-load-3d]", xpl); if (lb) { var hint = d.createElement("p"); hint.className = "small xpl-hint"; hint.textContent = "Arrasta o modelo para rodar."; lb.replaceWith(hint); }
    }
    var lb0 = $("[data-load-3d]", xpl); if (lb0) lb0.addEventListener("click", function () { loadMV(); });
    if (arBtn) arBtn.addEventListener("click", function () { if (mv && mv.activateAR) mv.activateAR(); });
    $$("[data-goto-3d]").forEach(function (b) { b.addEventListener("click", function () { var sec = $("#pecas"); sec.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); loadMV(); }); });
    if ("IntersectionObserver" in w) {
      var xio = new IntersectionObserver(function (es) { if (es[0].isIntersecting && (navigator.connection ? !navigator.connection.saveData : true) && desk.matches) { loadMV(); xio.disconnect(); } }, { rootMargin: "300px" });
      xio.observe(xpl);
    }
    var xsec = $(".xpl-sec");
    if (xsec && !reduce) scrollHooks.push(function () {
      if (!desk.matches) return;
      var r = xsec.getBoundingClientRect(), total = r.height - w.innerHeight;
      if (r.top > w.innerHeight || r.bottom < 0) return;
      var p = Math.min(1, Math.max(0, (-r.top + 80) / (total * 0.8)));
      setX(p * 100);
    });
  }

  /* ---------- quote wizard ---------- */
  var wiz = $("#wizard");
  if (wiz && G.problems) {
    var steps = $$(".wp", wiz), prog = $$(".wiz-prog i", wiz), cnt = $("#wiz-count"), nextB = $("[data-next]", wiz), prevB = $("[data-prev]", wiz), barW = $("#wiz-bar");
    var S = { problema: qp.get("problema"), divisao: qp.get("divisao"), quando: null, ref: qp.get("ref"), plano: qp.get("plano") }, cur = 0;
    var CW = $("#corte-w") ? new Corte($("#corte-w")) : null; if (CW) raf(function () { CW.cam(); });
    if (S.plano) S.problema = "outro";
    function selPaint() {
      $$("[data-w]", wiz).forEach(function (b) { b.setAttribute("aria-checked", String(S[b.getAttribute("data-w")] === b.getAttribute("data-v"))); });
      var room = G.roomNames[S.divisao] ? S.divisao : null, st = S.problema && G.comfort[S.problema] ? S.problema : "ok";
      if (CW) CW.set(room, cur >= 4 ? "ok" : (room ? st : null));
    }
    function go(n, back) {
      cur = n;
      steps.forEach(function (s, i) { s.hidden = i !== n; s.classList.toggle("back", !!back); });
      prog.forEach(function (p, i) { p.classList.toggle("is-on", i === n); p.classList.toggle("is-done", i < n); });
      cnt.textContent = n < 5 ? "Passo " + (n + 1) + " de 5" : "Pedido registado";
      prevB.hidden = n === 0 || n === 5; barW.hidden = n === 5;
      nextB.innerHTML = n === 4 ? "Enviar pedido" : 'Continuar <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
      if (n === 4) review();
      selPaint();
      var h = steps[n].querySelector("h1"); if (h) h.focus({ preventScroll: true });
      w.scrollTo({ top: 0, behavior: "auto" });
    }
    function review() {
      var lab = function (k) { var b = wiz.querySelector('[data-w="' + k + '"][data-v="' + S[k] + '"]'); return b ? b.textContent.trim() : "—"; };
      var f = $("#wiz-form");
      var rows = [["Problema", S.plano ? "Plano de manutenção: " + S.plano : lab("problema")], ["Divisão", lab("divisao")], ["Quando", lab("quando")], ["Nome", f.nome.value], ["Contacto", f.email.value + (f.tel.value ? " · " + f.tel.value : "")]];
      $("#w-rev").innerHTML = rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1].replace(/</g, "&lt;") + "</dd></div>"; }).join("");
      var ref = S.ref || (G.recs[S.problema] && G.recs[S.problema][S.divisao]) || "UI-25";
      var p = G.products.find(function (x) { return x.ref === ref; }) || G.products[0];
      $("#w-prod img").src = "img/p-" + p.ref.toLowerCase() + "-400.webp"; $("#w-prod-n").textContent = p.name + " " + p.ref;
    }
    wiz.addEventListener("click", function (e) {
      var b = e.target.closest("[data-w]"); if (!b) return;
      S[b.getAttribute("data-w")] = b.getAttribute("data-v"); selPaint();
    });
    $$(".opts", wiz).forEach(function (g) { var bs = $$("[data-w]", g); bs.forEach(function (b, i) { b.addEventListener("keydown", function (e) { var n = null; if (e.key === "ArrowDown") n = bs[(i + 1) % bs.length]; if (e.key === "ArrowUp") n = bs[(i - 1 + bs.length) % bs.length]; if (n) { e.preventDefault(); n.focus(); n.click(); } }); }); });
    nextB.addEventListener("click", function () {
      var need = ["problema", "divisao", "quando"][cur];
      if (need && !S[need]) { cnt.textContent = "Escolhe uma opção para continuar."; var first = steps[cur].querySelector("[data-w]"); if (first) first.focus(); return; }
      if (cur === 3) { var f = $("#wiz-form"); var bad = [f.nome, f.email].find(function (i) { return !i.checkValidity(); }); if (bad) { bad.reportValidity(); bad.focus(); return; } }
      if (cur === 4) { $("#w-ref").textContent = "OW-" + String(Date.now()).slice(-6); }
      go(cur + 1);
    });
    prevB.addEventListener("click", function () { go(Math.max(0, cur - 1), true); });
    var start = 0; if (S.problema) start = 1; if (S.problema && S.divisao) start = 2;
    go(start);
    if (start === 0) { var h0 = steps[0].querySelector("h1"); if (h0) h0.blur(); }
  }

  /* ---------- 404: lights off, one by one on hover ---------- */
  var nf = $("#corte-404");
  if (nf) { var Cn = new Corte(nf); raf(function () { Cn.cam(); }); }
})();
