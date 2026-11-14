(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition) document.documentElement.classList.add("vt-fallback");
  var CART_KEY = "gw-cesto";

  /* —— menu —— */
  var menuBtn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  var mainEl = document.getElementById("main");
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menu.classList.toggle("is-open", open);
    if (mainEl) {
      if (open) mainEl.setAttribute("inert", "");
      else mainEl.removeAttribute("inert");
    }
    if (open) {
      var first = menu.querySelector("a");
      if (first) first.focus();
    }
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      var open = menu.classList.contains("is-open");
      if (e.key === "Escape" && open) { setMenu(false); menuBtn.focus(); }
      if (e.key === "Tab" && open) {
        var items = Array.prototype.slice.call(menu.querySelectorAll("a"));
        if (!items.length) return;
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
  }

  /* —— cesto (localStorage, só navegação) —— */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function writeCart(list) {
    localStorage.setItem(CART_KEY, JSON.stringify(list));
    paintCart();
  }
  function paintCart() {
    var n = readCart().reduce(function (s, i) { return s + (i.qty || 1); }, 0);
    document.querySelectorAll(".cart-n").forEach(function (el) {
      el.textContent = n ? String(n) : "";
      el.classList.remove("is-pop");
      void el.offsetWidth;
      if (n) el.classList.add("is-pop");
    });
  }
  paintCart();
  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ref = btn.getAttribute("data-add");
      var list = readCart();
      var found = list.find(function (i) { return i.ref === ref; });
      if (found) found.qty += 1;
      else list.push({ ref: ref, qty: 1 });
      writeCart(list);
      btn.textContent = "No cesto";
      window.setTimeout(function () {
        if (btn.getAttribute("data-add")) btn.textContent = "Adicionar ao cesto";
      }, 1400);
    });
  });
  var cartList = document.getElementById("cart-list");
  if (cartList && window.GW) {
    var items = readCart();
    if (!items.length) {
      cartList.innerHTML = "<p>O cesto está vazio. Podes percorrer a loja — a compra não está disponível nesta demonstração.</p>";
    } else {
      cartList.innerHTML = items.map(function (i) {
        var p = GW.product(i.ref);
        return '<div class="cart-item"><div><strong>' + p.name + '</strong><p class="ex">' + p.ref + ' · ' + i.qty + ' × ' + GW.price(p.price) + ' <span>(exemplo)</span></p></div><button type="button" class="btn" data-remove="' + p.ref + '">Tirar</button></div>';
      }).join("");
      cartList.querySelectorAll("[data-remove]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          writeCart(readCart().filter(function (i) { return i.ref !== btn.getAttribute("data-remove"); }));
          btn.closest(".cart-item").remove();
          if (!readCart().length) cartList.innerHTML = "<p>O cesto está vazio.</p>";
        });
      });
    }
  }

  /* —— revelação com scroll (fallback se não houver scroll-driven) —— */
  if (!CSS.supports("animation-timeline: view()") && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) { if (en.isIntersecting) en.target.classList.add("is-in"); });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  /* —— câmara do corte —— */
  var cam = document.querySelector(".cam-frame");
  var caption = document.querySelector(".stage-caption");
  var stage = document.querySelector(".stage");
  var CAM = {
    overview:   { fx: 0.50, fy: 0.50, s: 1.00, label: "A casa inteira, em corte" },
    problema:   { fx: 0.50, fy: 0.54, s: 1.16, label: "As quatro divisões" },
    sala:       { fx: 290 / 880, fy: 460 / 640, s: 1.85, label: "Sala" },
    quarto:     { fx: 290 / 880, fy: 280 / 640, s: 1.90, label: "Quarto" },
    escritorio: { fx: 650 / 880, fy: 280 / 640, s: 1.90, label: "Escritório" },
    banho:      { fx: 650 / 880, fy: 460 / 640, s: 1.88, label: "Casa de banho" },
    passos:     { fx: 0.48, fy: 0.62, s: 1.22, label: "Da divisão ao orçamento" },
    equipamento:{ fx: 0.52, fy: 0.50, s: 1.22, label: "Equipamento nas paredes" },
    manutencao: { fx: 0.50, fy: 0.50, s: 1.12, label: "A casa depois da instalação" },
    sobre:      { fx: 0.50, fy: 0.50, s: 1.00, label: "A casa inteira, em corte" },
    contacto:   { fx: 0.50, fy: 0.50, s: 1.00, label: "A casa inteira, em corte" },
    loja:       { fx: 0.52, fy: 0.50, s: 1.20, label: "Onde o equipamento fica" },
    solucoes:   { fx: 0.50, fy: 0.54, s: 1.16, label: "Qual é o teu problema?" }
  };
  var tx = 0, ty = 0, ts = 1, gx = 0, gy = 0, gs = 1, camTick = false, camLock = null, camName = "overview";
  function zoomOf(g) {
    var s = g.s;
    if (window.innerWidth < 900 && s > 1) s = 1 + (s - 1) * 0.42;
    return s;
  }
  function captionLocked() {
    return caption && document.body.hasAttribute("data-loja") && caption.textContent.indexOf("Instalação") === 0;
  }
  function setGoal(name) {
    camName = name;
    var g = CAM[name] || CAM.overview;
    var s = zoomOf(g);
    var w = cam ? cam.clientWidth : 0;
    var h = cam ? cam.clientHeight : 0;
    gx = w / 2 - g.fx * w * s;
    gy = h / 2 - g.fy * h * s;
    gs = s;
    if (caption && !captionLocked()) caption.textContent = g.label;
    if (reduce) { tx = gx; ty = gy; ts = gs; applyCam(); return; }
    requestCam();
  }
  function applyCam() {
    if (!cam) return;
    cam.style.transform = "translate(" + tx.toFixed(2) + "px, " + ty.toFixed(2) + "px) scale(" + ts.toFixed(3) + ")";
  }
  function requestCam() {
    if (camTick || reduce || !cam) return;
    camTick = true;
    requestAnimationFrame(stepCam);
  }
  function stepCam() {
    tx += (gx - tx) * 0.16;
    ty += (gy - ty) * 0.16;
    ts += (gs - ts) * 0.16;
    applyCam();
    if (Math.abs(gx - tx) > 0.15 || Math.abs(gy - ty) > 0.15 || Math.abs(gs - ts) > 0.003) {
      requestAnimationFrame(stepCam);
    } else { tx = gx; ty = gy; ts = gs; applyCam(); camTick = false; }
  }
  function activeSection() {
    var secs = document.querySelectorAll("[data-cam]");
    if (!secs.length) return null;
    var mid = window.innerHeight * 0.42, best = secs[0], dist = Infinity;
    for (var i = 0; i < secs.length; i++) {
      var r = secs[i].getBoundingClientRect();
      if (r.bottom < 80 || r.top > window.innerHeight) continue;
      var c = r.top + Math.min(r.height, 240) * 0.4;
      var d = Math.abs(c - mid);
      if (d < dist) { dist = d; best = secs[i]; }
    }
    return best;
  }
  function syncCamera() {
    if (stage && window.innerWidth < 900) {
      stage.classList.toggle("is-compact", window.scrollY > 80);
    }
    if (camLock) { setGoal(camLock); return; }
    var sec = activeSection();
    setGoal(sec ? sec.getAttribute("data-cam") : "overview");
  }
  var scrollWait = false;
  window.addEventListener("scroll", function () {
    if (scrollWait) return;
    scrollWait = true;
    requestAnimationFrame(function () { scrollWait = false; syncCamera(); });
  }, { passive: true });
  window.addEventListener("resize", function () { setGoal(camLock || camName); }, { passive: true });
  if (cam) { applyCam(); syncCamera(); }

  /* —— diagnóstico —— */
  var problemId = null, roomId = null;
  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }
  function lightRooms() {
    document.querySelectorAll(".room").forEach(function (r) {
      var on = !!roomId && r.getAttribute("data-room") === roomId;
      r.classList.toggle("is-on", on);
      if (on && problemId) r.setAttribute("data-state", problemId);
      else r.removeAttribute("data-state");
    });
    document.querySelectorAll(".unit").forEach(function (u) {
      var rec = window.GW && problemId && GW.recs[problemId];
      u.classList.toggle("is-pin", !!(rec && u.getAttribute("data-ref") === rec.ref));
    });
  }
  function setChecked(root, btn) {
    if (!root) return;
    root.querySelectorAll("[data-id]").forEach(function (b) {
      b.setAttribute("aria-checked", b === btn ? "true" : "false");
    });
  }
  function paintSlider() {
    var root = document.querySelector(".compare");
    if (!root || !problemId || !window.GW) return;
    var data = GW.comfort[problemId];
    if (!data) return;
    root.hidden = false;
    root.setAttribute("data-state", problemId);
    var range = root.querySelector(".compare-range");
    var after = root.querySelector(".compare-layer.after");
    var v = range ? Number(range.value) : 50;
    if (after) after.style.clipPath = "inset(0 0 0 " + v + "%)";
    function mix(a, b) { return v < 50 ? a : b; }
    var t = root.querySelector("[data-m='t']");
    var n = root.querySelector("[data-m='n']");
    var c = root.querySelector("[data-m='c']");
    if (t) t.textContent = mix(data.before.t, data.after.t);
    if (n) n.textContent = mix(data.before.n, data.after.n);
    if (c) c.textContent = mix(data.before.c, data.after.c);
  }
  function showResult() {
    var out = document.getElementById("result");
    var text = document.getElementById("result-text");
    var rec = document.getElementById("result-rec");
    var linkP = document.getElementById("result-product");
    var linkO = document.getElementById("result-quote");
    if (!out || !text || !window.GW) return;
    if (problemId && roomId) {
      text.textContent = GW.answers[problemId][roomId];
      var recs = GW.recs[problemId];
      var prod = GW.product(recs.ref);
      if (rec) rec.textContent = "Recomendação: " + prod.name + " " + prod.ref + " · " + GW.price(prod.price) + " (exemplo) na " + GW.roomNames[roomId] + ".";
      if (linkP) linkP.href = "produto.html?ref=" + encodeURIComponent(prod.ref);
      if (linkO) linkO.href = "orcamento.html?problema=" + encodeURIComponent(problemId) + "&divisao=" + encodeURIComponent(roomId) + "&ref=" + encodeURIComponent(prod.ref);
      out.classList.add("is-on");
      camLock = roomId;
      setGoal(roomId);
      paintSlider();
    } else {
      out.classList.remove("is-on");
    }
    lightRooms();
  }
  var problems = document.getElementById("problems");
  var roomRoot = document.getElementById("rooms-pick");
  function pickProblem(id) {
    problemId = id;
    var btn = problems && problems.querySelector('[data-id="' + id + '"]');
    if (btn) setChecked(problems, btn);
    if (!roomId) pickRoom(GW.defaultRoom[id]);
    else showResult();
  }
  function pickRoom(id) {
    roomId = id;
    var btn = roomRoot && roomRoot.querySelector('[data-id="' + id + '"]');
    if (btn) setChecked(roomRoot, btn);
    showResult();
  }
  if (problems) {
    problems.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-id]");
      if (btn) pickProblem(btn.getAttribute("data-id"));
    });
  }
  if (roomRoot) {
    roomRoot.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-id]");
      if (btn) pickRoom(btn.getAttribute("data-id"));
    });
  }
  var preP = qs("problema"), preR = qs("divisao");
  if (preP && problems) pickProblem(preP);
  if (preR && roomRoot) pickRoom(preR);
  var diag = document.getElementById("problema");
  if (diag && "IntersectionObserver" in window) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { camLock = null; syncCamera(); }
        else if (roomId) { camLock = roomId; setGoal(roomId); }
      });
    }, { threshold: 0.15 });
    dio.observe(diag);
  }
  var range = document.querySelector(".compare-range");
  if (range) {
    range.addEventListener("input", paintSlider);
  }

  /* —— loja filtros —— */
  var filterRoot = document.getElementById("filters");
  var filterBtn = document.getElementById("filter-btn");
  if (filterBtn && filterRoot) {
    document.body.classList.add("has-filters");
    filterBtn.addEventListener("click", function () {
      var open = filterRoot.classList.toggle("is-open");
      filterBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  function selected(group) {
    var on = [];
    document.querySelectorAll('.chip[data-facet="' + group + '"][aria-pressed="true"]').forEach(function (c) {
      on.push(c.getAttribute("data-value"));
    });
    return on;
  }
  function applyFilters() {
    var ctx = selected("ctx"), fn = selected("fn"), typ = selected("typ");
    var cards = document.querySelectorAll("[data-product]");
    var n = 0, typesOn = {};
    cards.forEach(function (card) {
      var ok = true;
      if (ctx.length && ctx.indexOf(card.getAttribute("data-ctx")) < 0) ok = false;
      if (fn.length && fn.indexOf(card.getAttribute("data-fn")) < 0) ok = false;
      if (typ.length && typ.indexOf(card.getAttribute("data-typ")) < 0) ok = false;
      card.hidden = !ok;
      if (ok) { n++; typesOn[card.getAttribute("data-typ")] = true; }
    });
    var count = document.getElementById("filter-count");
    var empty = document.getElementById("empty");
    if (count) count.textContent = n + (n === 1 ? " artigo" : " artigos");
    if (empty) empty.style.display = n ? "none" : "block";
    var any = typ.length || fn.length || ctx.length;
    document.querySelectorAll(".unit").forEach(function (u) {
      var t = u.getAttribute("data-typ");
      var show = !any || !!typesOn[t];
      u.classList.toggle("is-on", any && show);
      u.classList.toggle("is-pin", any && show);
    });
    if (caption && document.body.hasAttribute("data-loja")) {
      var labels = { parede: "parede", tecto: "tecto", exterior: "exterior", acessorio: "acessório" };
      var used = Object.keys(typesOn).map(function (k) { return labels[k] || k; });
      caption.textContent = any ? (used.length ? "Instalação: " + used.join(", ") : "Nenhum ponto com estes filtros") : (CAM.loja.label);
    }
  }
  document.querySelectorAll(".facet .chip").forEach(function (chip) {
    chip.addEventListener("click", function () {
      chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
      applyFilters();
    });
  });
  if (document.querySelector("[data-product]")) applyFilters();

  /* —— ficha: explodida + conteúdo —— */
  var explode = document.querySelector(".explode");
  var explodeBtn = document.getElementById("explode-btn");
  if (explode && explodeBtn) {
    explodeBtn.addEventListener("click", function () {
      var open = explode.classList.toggle("is-open");
      explodeBtn.setAttribute("aria-expanded", open ? "true" : "false");
      explodeBtn.textContent = open ? "Juntar as peças" : "Ver as peças";
    });
  }
  var pRoot = document.getElementById("produto");
  if (pRoot && window.GW) {
    var prod = GW.product(qs("ref") || "UI-25");
    var set = function (sel, val) { var el = document.querySelector(sel); if (el) el.textContent = val; };
    set("#p-name", prod.name);
    set("#p-ref", prod.ref);
    set("#p-lede", prod.lede);
    set("#p-price", GW.price(prod.price) + " ");
    var add = document.querySelector("[data-add]");
    if (add) add.setAttribute("data-add", prod.ref);
    var quote = document.getElementById("p-quote");
    if (quote) quote.href = "orcamento.html?ref=" + encodeURIComponent(prod.ref);
    var title = document.querySelector("title");
    if (title) title.textContent = prod.name + " · " + prod.ref + " — GW Soluções";
    var tb = document.getElementById("p-spec");
    if (tb) {
      tb.innerHTML = prod.specs.map(function (row) {
        return "<tr><th>" + row[0] + "</th><td>" + row[1] + "</td></tr>";
      }).join("");
    }
  }

  /* —— orçamento em passos —— */
  var wizard = document.getElementById("wizard");
  if (wizard) {
    var step = 0;
    var panels = wizard.querySelectorAll(".panel-step");
    var nav = wizard.querySelectorAll(".wiz-nav span");
    var fields = {
      problema: wizard.querySelector('[name="problema"]'),
      divisao: wizard.querySelector('[name="divisao"]'),
      quando: wizard.querySelector('[name="quando"]'),
      nome: wizard.querySelector('[name="nome"]'),
      email: wizard.querySelector('[name="email"]'),
      telefone: wizard.querySelector('[name="telefone"]'),
      nota: wizard.querySelector('[name="nota"]')
    };
    if (qs("problema") && fields.problema) fields.problema.value = qs("problema");
    if (qs("divisao") && fields.divisao) fields.divisao.value = qs("divisao");
    if (qs("ref") && fields.nota && !fields.nota.value) fields.nota.value = "Interesse no equipamento " + qs("ref") + " (exemplo).";
    function go(n) {
      step = Math.max(0, Math.min(panels.length - 1, n));
      panels.forEach(function (p, i) {
        p.classList.toggle("is-on", i === step);
        p.hidden = i !== step;
      });
      nav.forEach(function (s, i) {
        s.classList.toggle("is-on", i === step);
        s.classList.toggle("is-done", i < step);
      });
      var focusable = panels[step].querySelector("h2, input, select, textarea, button");
      if (focusable) focusable.focus({ preventScroll: false });
    }
    wizard.addEventListener("click", function (e) {
      var next = e.target.closest("[data-next]");
      var prev = e.target.closest("[data-prev]");
      var send = e.target.closest("[data-send]");
      if (next) {
        e.preventDefault();
        if (step === 1 && fields.nome && !fields.nome.value.trim()) { fields.nome.reportValidity(); return; }
        go(step + 1);
        if (step === 2) fillReview();
      } else if (prev) { e.preventDefault(); go(step - 1); }
      else if (send) {
        e.preventDefault();
        go(panels.length - 1);
        var refEl = document.getElementById("confirm-ref");
        if (refEl) {
          var code = "GW-" + Date.now().toString().slice(-6);
          refEl.textContent = code;
        }
      }
    });
    function labelOf(sel, val) {
      var opt = sel && sel.querySelector('option[value="' + val + '"]');
      return opt ? opt.textContent : val;
    }
    function fillReview() {
      var box = document.getElementById("review");
      if (!box) return;
      box.innerHTML =
        "<p><strong>Problema:</strong> " + labelOf(fields.problema, fields.problema.value) + "</p>" +
        "<p><strong>Divisão:</strong> " + labelOf(fields.divisao, fields.divisao.value) + "</p>" +
        "<p><strong>Quando:</strong> " + labelOf(fields.quando, fields.quando.value) + "</p>" +
        "<p><strong>Nome:</strong> " + fields.nome.value + "</p>" +
        "<p><strong>Contacto:</strong> " + fields.email.value + " · " + fields.telefone.value + "</p>" +
        (fields.nota.value ? "<p><strong>Nota:</strong> " + fields.nota.value + "</p>" : "") +
        "<p class=\"ex\">Nada é enviado. É uma confirmação simulada, para testar o percurso.</p>";
    }
    go(0);
  }
})();
