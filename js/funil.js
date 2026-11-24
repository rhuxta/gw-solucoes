/* OW Soluções — funil único (orcamento.html). Estado em localStorage; nada é enviado (demonstração). */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var d = document, w = window, G = w.GW || {}, root = d.getElementById("funil");
  if (!root || !G.products) return;
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var KEY = "ow-funil", N = 7, OK = 8;
  var NAMES = ["A tua casa", "Divisões", "O que já existe", "Recomendação", "Visita técnica", "Contacto", "Rever e enviar"];
  var PROBS = { quente: "A divisão aquece demasiado", frio: "Sinto frio ao fim do dia", parado: "O ar parece parado", humidade: "Os vidros ficam embaciados", "todo-ano": "Conforto o ano todo" };
  var AREAS = { a: "até 15 m²", b: "15–25 m²", c: "25–35 m²", d: "mais de 35 m²" };
  var EXISTE = { nada: "Nada", ac: "Ar condicionado antigo", central: "Aquecimento central", outro: "Outro" };
  var DEF = { sala: "UI-25", quarto: "UI-12", escritorio: "UI-12", banho: "VX-01" };
  var RN = G.roomNames, ROOMS = Object.keys(RN);
  var prod = function (r) { return G.products.find(function (p) { return p.ref === r; }); };
  var eur = function (n) { return n == null ? "Sob orçamento" : n.toLocaleString("pt-PT").replace(/\s/g, "\u202f") + "\u202f€"; };
  var ph = function (t) { return '<span class="phv">[' + t + "]</span>"; };
  var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };

  var S; try { S = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { S = null; }
  if (!S || typeof S !== "object") S = {};
  S.rooms = S.rooms || {}; S.step = S.step || 1; S.max = S.max || 1; S.pacote = S.pacote || "completo";
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---- entradas: ?divisao=&problema=&ref=&plano=&from= ---- */
  var qp = new URLSearchParams(location.search);
  if (qp.toString()) {
    if (S.done) { S = { rooms: {}, step: 1, max: 1, pacote: "completo" }; }
    var dv = qp.get("divisao"), pb = qp.get("problema"), refs = (qp.get("ref") || "").split(",").map(function (x) { return x.trim().toUpperCase(); }).filter(prod), pl = qp.get("plano");
    if (pb && !PROBS[pb]) pb = null;
    if (dv && !RN[dv]) dv = null;
    if (refs.length) S.refs = refs;
    if (pl) S.plano = pl;
    if (qp.get("from")) S.from = qp.get("from");
    var addRoom = function (r, p, ref) { var o = S.rooms[r] || (S.rooms[r] = {}); if (p) o.p = p; if (ref) o.ref = ref; };
    if (dv) addRoom(dv, pb || (refs.length ? "todo-ano" : null), refs[0]);
    else if (pb && pb !== "todo-ano") { var pr = G.problems.find(function (x) { return x.id === pb; }); addRoom(pr.room, pb); }
    else if (pb) S.defP = pb;
    refs.forEach(function (r, i) { if (i === 0 && dv) return; var p = prod(r); if (p.fn === "controlo" || p.fn === "manutencao") return; var room = p.rooms.find(function (x) { return !S.rooms[x]; }) || p.rooms[0]; addRoom(room, (S.rooms[room] && S.rooms[room].p) || "todo-ano", r); });
    S.known = true; S.knownTxt = known().join(" · "); save();
    history.replaceState(null, "", location.pathname + location.hash);
  }

  var form = $("#fn-form"), steps = $$(".fs", root), cnt = $("#fn-count"), live = $("#fn-live");
  var nextB = $("[data-next]", root), nextT = $("[data-next-t]", root), backB = $("[data-back]", root), nav = $("#fn-nav");
  var bars = $$(".fn-bar6 i", root), tabs = $$("[data-goto]", root);

  /* ---- campos <-> estado ---- */
  function radio(name, v) { $$('input[name="' + name + '"]', form).forEach(function (i) { i.checked = i.value === v; }); }
  function val(name) { var i = $('input[name="' + name + '"]:checked', form); return i ? i.value : null; }
  function fill() {
    form.cp.value = S.cp || ""; radio("tipo", S.tipo); radio("tipologia", S.tipologia);
    ROOMS.forEach(function (r) { var o = S.rooms[r]; var cb = $('input[name="room"][value="' + r + '"]', form); cb.checked = !!o; $("#rm-" + r).hidden = !o; $("#p-" + r).value = (o && o.p) || ""; radio("a-" + r, o && o.a); });
    radio("existe", S.existe); radio("exterior", S.exterior); radio("pacote", S.pacote); radio("periodo", S.periodo);
    ["morada", "nome", "tel", "email", "nif", "notas"].forEach(function (k) { if (form[k]) form[k].value = S[k] || ""; });
    form.rgpd.checked = !!S.rgpd; form.lembretes.checked = !!S.lembretes;
    zone();
  }
  form.addEventListener("input", collect); form.addEventListener("change", collect);
  function collect(e) {
    var t = e && e.target;
    if (t && t.name === "cp") { var v = t.value.replace(/[^\d]/g, "").slice(0, 7); t.value = v.length > 4 ? v.slice(0, 4) + "-" + v.slice(4) : v; zone(); }
    S.cp = form.cp.value; S.tipo = val("tipo"); S.tipologia = val("tipologia");
    if (t && t.name === "room") { var r = t.value; if (t.checked) { S.rooms[r] = S.rooms[r] || {}; if (!S.rooms[r].p && S.defP) S.rooms[r].p = S.defP; } else delete S.rooms[r]; $("#rm-" + r).hidden = !t.checked; if (t.checked) $("#p-" + r).value = S.rooms[r].p || ""; }
    ROOMS.forEach(function (r) { var o = S.rooms[r]; if (!o) return; o.p = $("#p-" + r).value || null; o.a = val("a-" + r); if (o.ref && t && t.id === "p-" + r) delete o.ref; });
    S.existe = val("existe"); S.exterior = val("exterior"); S.pacote = val("pacote") || S.pacote; S.periodo = val("periodo"); S.dia = val("dia") || S.dia;
    ["morada", "nome", "tel", "email", "nif", "notas"].forEach(function (k) { if (form[k]) S[k] = form[k].value; });
    S.rgpd = form.rgpd.checked; S.lembretes = form.lembretes.checked;
    if (t && t.getAttribute && t.getAttribute("aria-invalid") === "true") clearErr(t);
    save(); paint();
  }

  /* ---- código postal e zona (demonstração: aceita qualquer código bem formado) ---- */
  var CP = /^\d{4}-\d{3}$/;
  function zone() {
    var st = $("#cp-st"), v = form.cp.value;
    if (CP.test(v)) { st.innerHTML = '<span class="zone-ok">Código válido.</span> Nesta demonstração aceitamos todos os códigos. A área real de serviço é ' + ph("zona de serviço") + '. <button type="button" class="lnk-b" data-fora-open>Fora da zona?</button>'; }
    else st.innerHTML = "";
  }
  root.addEventListener("click", function (e) {
    if (e.target.closest("[data-fora-open]")) { $("#fn-fora").hidden = false; $("#f-fora").focus(); }
    if (e.target.closest("[data-fora]")) { var em = $("#f-fora"); $("#fora-out").textContent = em.checkValidity() && em.value ? "Obrigado. Avisamos-te por email quando chegarmos à tua zona." : "Escreve um email válido."; }
  });

  /* ---- casa 3D: a mini-casa SVG saiu. Quando o 3D entrar em [data-3d-slot="casa"], ouve "ow:funil" e
     marca as divisões chamando o checkbox correspondente (input[name=room]); a lista é sempre a interface verdadeira. ---- */

  /* ---- dias úteis ---- */
  (function () {
    var box = $("#days"), out = [], dt = new Date(); dt.setHours(12, 0, 0, 0);
    while (out.length < 10) { dt.setDate(dt.getDate() + 1); var wd = dt.getDay(); if (wd > 0 && wd < 6) out.push(new Date(dt)); }
    var fW = new Intl.DateTimeFormat("pt-PT", { weekday: "short" }), fM = new Intl.DateTimeFormat("pt-PT", { month: "short" });
    box.innerHTML = out.map(function (x) {
      var iso = x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
      return '<label class="day"><input type="radio" name="dia" value="' + iso + '"><span><small>' + fW.format(x).replace(".", "") + "</small><b>" + x.getDate() + "</b><small>" + fM.format(x).replace(".", "") + "</small></span></label>";
    }).join("");
    if (S.dia && !out.some(function (x) { return x.toISOString().slice(0, 10) === S.dia || (x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0")) === S.dia; })) S.dia = null;
    radio("dia", S.dia);
  })();
  var dayLabel = function (iso) { if (!iso) return ""; var p = iso.split("-"); var x = new Date(+p[0], +p[1] - 1, +p[2], 12); return new Intl.DateTimeFormat("pt-PT", { weekday: "long", day: "numeric", month: "long" }).format(x); };

  /* ---- fotografias (ficam no aparelho) ---- */
  $$('.ph-tile input[type="file"]', form).forEach(function (inp) {
    inp.addEventListener("change", function () { var f = inp.files && inp.files[0], box = inp.parentNode.querySelector(".ph-img"); if (!f) return; box.innerHTML = '<img alt="" src="' + URL.createObjectURL(f) + '">'; inp.parentNode.classList.add("has-img"); });
  });

  /* ---- recomendação ---- */
  function recFor(r) {
    var o = S.rooms[r]; if (!o) return null;
    var ref = o.ref || (o.p === "todo-ano" || !o.p ? DEF[r] : (G.recs[o.p] && G.recs[o.p][r])) || DEF[r];
    if (ref === "UI-12" && (o.a === "c" || o.a === "d")) ref = "UI-25";
    return prod(ref);
  }
  function lines() {
    var L = [], clim = 0;
    ROOMS.forEach(function (r) { var p = recFor(r); if (!p) return; if (p.fn === "climatizacao") clim++; L.push({ room: r, p: p }); });
    if (clim) L.push({ room: null, p: prod("UE-50"), n: Math.ceil(clim / 2) });
    (S.refs || []).forEach(function (ref) { var p = prod(ref); if ((p.fn === "controlo" || p.fn === "manutencao") && !L.some(function (x) { return x.p.ref === ref; })) L.push({ room: null, p: p, acc: true }); });
    return L;
  }
  function paintRec() {
    var o = $("#rec");
    o.innerHTML = lines().map(function (l) {
      var who = l.room ? RN[l.room] + " · " + (PROBS[S.rooms[l.room].p] || "").toLowerCase() + (S.rooms[l.room].a ? " · " + AREAS[S.rooms[l.room].a] : "") : (l.acc ? "Acessório que escolheste" : "Exterior · liga até duas unidades interiores");
      return '<li><img src="img/p-' + l.p.ref.toLowerCase() + '-400.webp" alt="" width="400" height="500" loading="lazy"><div><span class="lbl">' + esc(who) + "</span><b>" + esc(l.p.name) + " " + l.p.ref + (l.n > 1 ? " × " + l.n : "") + '</b><span class="small">' + esc(l.p.desc) + '</span></div><span class="data rec-p">' + eur(l.p.price) + "<small>equipamento</small></span></li>";
    }).join("");
    var pl = $("#pk-plano");
    if (pl) pl.innerHTML = S.plano ? "Contrato de manutenção: plano " + esc(S.plano.replace("-", " ")) + " (escolhido em Serviços)" : "Contrato de manutenção opcional, desde " + ph("preço €/ano");
  }

  /* ---- validação ---- */
  function setErr(id, msg, field) { var e = $("#" + id); e.textContent = msg; e.hidden = false; if (field) field.setAttribute("aria-invalid", "true"); return field || e; }
  function clearErr(field) { field.removeAttribute("aria-invalid"); var ids = (field.getAttribute("aria-describedby") || "").split(" "); ids.forEach(function (id) { var e = d.getElementById(id); if (e && e.classList.contains("err")) e.hidden = true; }); }
  function clearAll(sec) { $$(".err", sec).forEach(function (e) { e.hidden = true; }); $$("[aria-invalid]", sec).forEach(function (f) { f.removeAttribute("aria-invalid"); }); }
  function check(n) {
    var sec = steps[n - 1], bad = []; clearAll(sec);
    if (n === 1) {
      if (!CP.test(S.cp || "")) bad.push(setErr("e-cp", "Escreve o código postal completo, por exemplo 2750-321.", form.cp));
      if (!S.tipo) bad.push(setErr("e-tipo", "Escolhe apartamento ou moradia.", $('input[name="tipo"]', form)));
      if (!S.tipologia) bad.push(setErr("e-tip", "Escolhe a tipologia.", $('input[name="tipologia"]', form)));
    }
    if (n === 2) {
      var rs = Object.keys(S.rooms);
      if (!rs.length) bad.push(setErr("e-rooms", "Escolhe pelo menos uma divisão.", $('input[name="room"]', form)));
      rs.forEach(function (r) {
        if (!S.rooms[r].p) bad.push(setErr("e-p-" + r, "Diz-nos o que se passa na " + RN[r].toLowerCase() + ".", $("#p-" + r)));
        if (!S.rooms[r].a) bad.push(setErr("e-a-" + r, "Escolhe a área aproximada.", $('input[name="a-' + r + '"]', form)));
      });
    }
    if (n === 3 && !S.existe) bad.push(setErr("e-ex", "Escolhe uma opção. Se não souberes, escolhe «Outro».", $('input[name="existe"]', form)));
    if (n === 4 && !S.pacote) bad.push(setErr("e-pk", "Escolhe um pacote.", $('input[name="pacote"]', form)));
    if (n === 5) {
      if (!S.dia) bad.push(setErr("e-dia", "Escolhe um dia para a visita técnica.", $('input[name="dia"]', form)));
      if (!S.periodo) bad.push(setErr("e-per", "Escolhe manhã ou tarde.", $('input[name="periodo"]', form)));
      if (!(S.morada || "").trim()) bad.push(setErr("e-morada", "Escreve a morada da visita.", form.morada));
    }
    if (n === 6) {
      if ((S.nome || "").trim().length < 2) bad.push(setErr("e-nome", "Escreve o teu nome.", form.nome));
      var tel = (S.tel || "").replace(/[\s()-]/g, "").replace(/^(\+351|00351)/, "");
      if (!/^9\d{8}$/.test(tel)) bad.push(setErr("e-tel", "Escreve um telemóvel português com 9 dígitos, a começar por 9.", form.tel));
      if (!form.email.value || !form.email.checkValidity()) bad.push(setErr("e-email", "Escreve um email válido, por exemplo nome@email.pt.", form.email));
      if (S.nif && !/^\d{9}$/.test(S.nif.replace(/\s/g, ""))) bad.push(setErr("e-nif", "O NIF tem 9 dígitos. Podes deixar em branco.", form.nif));
      if (!S.rgpd) bad.push(setErr("e-rgpd", "Para enviarmos o pedido, confirma que leste a política de privacidade.", form.rgpd));
    }
    if (bad.length) { live.textContent = bad.length === 1 ? "Falta corrigir um campo." : "Faltam corrigir " + bad.length + " campos."; bad[0].focus(); }
    return !bad.length;
  }

  /* ---- navegação entre passos ---- */
  function go(n, opts) {
    opts = opts || {};
    n = Math.max(1, Math.min(S.done ? OK : S.max, n)); if (S.done && n < OK) n = OK;
    S.step = n; save();
    steps.forEach(function (s) { var on = +s.getAttribute("data-step") === n; s.hidden = !on; if (on && !reduce) { s.classList.remove("is-in"); void s.offsetWidth; s.classList.add("is-in"); } });
    if (n === 4) paintRec();
    if (n === 7) paintReview();
    if (n === OK) paintOk();
    paint();
    if (!opts.silent) { var h = steps[n - 1].querySelector("h1"); if (h) h.focus({ preventScroll: true }); w.scrollTo(0, 0); }
    if (!opts.pop) history[opts.replace ? "replaceState" : "pushState"]({ s: n }, "", "#passo-" + (n === OK ? "confirmacao" : n));
  }
  function paint() {
    var n = S.step; root.classList.toggle("is-done", n === OK);
    bars.forEach(function (b, i) { b.className = i < n - 1 || n === OK ? "is-done" : i === n - 1 ? "is-on" : ""; });
    tabs.forEach(function (t, i) { var k = i + 1; t.disabled = S.done || k > S.max; if (k === n) t.setAttribute("aria-current", "step"); else t.removeAttribute("aria-current"); t.classList.toggle("is-done", k < S.max && k !== n); });
    cnt.textContent = n === OK ? "Pedido enviado" : "Passo " + n + " de " + N + " · " + NAMES[n - 1];
    backB.hidden = n === 1; nav.hidden = n === OK;
    var lab = S.edit && n < 7 ? 'Guardar<span class="fn-long"> e voltar à revisão</span>' : n === 7 ? "Enviar pedido" : n === 6 ? "Rever pedido" : n === 4 ? 'Continuar<span class="fn-long"> para a visita técnica</span>' : n === 5 ? 'Continuar<span class="fn-long"> para o contacto</span>' : "Continuar";
    if (nextT.innerHTML !== lab) nextT.innerHTML = lab; /* não recriar o texto a meio de um clique */
    paintKnown(); paintSum();
    /* gancho para a fase 3D (casa em corte, conceito A): a cena ouve este evento e acende/enquadra as divisões */
    d.dispatchEvent(new CustomEvent("ow:funil", { detail: { step: n, rooms: Object.keys(S.rooms), lit: n >= 4 } }));
    ROOMS.forEach(function (r) { var s = $('[data-rm-sum="' + r + '"]'), o = S.rooms[r]; if (s) s.textContent = o && o.p && o.a ? (PROBS[o.p] ? AREAS[o.a] : "") : ""; });
  }
  function known() {
    var k = [];
    ROOMS.forEach(function (r) { var o = S.rooms[r]; if (o) k.push(RN[r] + (o.p && o.p !== "todo-ano" ? " · " + PROBS[o.p].toLowerCase() : "")); });
    if (S.defP && !Object.keys(S.rooms).length) k.push(PROBS[S.defP]);
    (S.refs || []).forEach(function (r) { var p = prod(r); k.push(p.name + " " + p.ref); });
    if (S.plano) k.push("Plano de manutenção " + S.plano.replace("-", " "));
    return k;
  }
  function paintKnown() { var box = $("#fn-known"), k = S.knownTxt || ""; box.hidden = !(S.known && k && S.step <= 2); $("#fn-known-t").textContent = k; }
  function sumRows() {
    var R = [];
    if (S.cp) R.push(["Casa", S.cp + (S.tipo ? " · " + (S.tipo === "moradia" ? "Moradia" : "Apartamento") : "") + (S.tipologia ? " " + S.tipologia : "")]);
    var rs = Object.keys(S.rooms); if (rs.length) R.push(["Divisões", rs.map(function (r) { return RN[r]; }).join(", ")]);
    if (S.existe) R.push(["Já existe", EXISTE[S.existe]]);
    if (S.max >= 4 && rs.length) R.push(["Equipamento", lines().map(function (l) { return l.p.ref + (l.n > 1 ? " × " + l.n : ""); }).join(", ")]);
    if (S.max >= 4) R.push(["Pacote", S.pacote === "completo" ? "Completo, com 1.ª manutenção" : "Equipamento + instalação"]);
    if (S.dia) R.push(["Visita técnica", dayLabel(S.dia) + (S.periodo ? ", " + (S.periodo === "manha" ? "manhã (9–13 h)" : "tarde (14–18 h)") : "")]);
    return R;
  }
  function paintSum() { $("#fn-dl").innerHTML = sumRows().map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") || '<div><dt>Ainda vazio</dt><dd>Vai-se preenchendo a cada passo.</dd></div>'; }
  /* ---- revisão (passo 7): tudo o que vai ser enviado, com Editar por bloco ---- */
  var EXT = { varanda: "Varanda", fachada: "Fachada", telhado: "Telhado", "nao-sei": "Não sei" };
  function rows(n) {
    var r = [], x = function (k, v, raw) { if (v) r.push([k, raw ? v : esc(v)]); };
    if (n === 1) { x("Código postal", S.cp); x("Tipo de casa", S.tipo === "moradia" ? "Moradia" : S.tipo === "apartamento" ? "Apartamento" : ""); x("Tipologia", S.tipologia); }
    if (n === 2) ROOMS.forEach(function (k) { var o = S.rooms[k]; if (o) x(RN[k], [PROBS[o.p], AREAS[o.a]].filter(Boolean).join(" · ")); });
    if (n === 3) { x("Climatização atual", EXISTE[S.existe]); x("Unidade exterior", EXT[S.exterior] || "Por decidir na visita"); var f = $$('.ph-tile input[type="file"]', form).filter(function (i) { return i.files && i.files.length; }).length; x("Fotografias", f ? f + (f === 1 ? " anexada" : " anexadas") : "Nenhuma"); }
    if (n === 4) { x("Equipamento", lines().map(function (l) { return l.p.name + " " + l.p.ref + (l.n > 1 ? " × " + l.n : ""); }).join(", ")); x("Pacote", S.pacote === "completo" ? "Completo, com 1.ª manutenção" : "Equipamento + instalação"); x("Estimativa", ph("de €") + " – " + ph("até €") + " · fecha-se na visita", true); }
    if (n === 5) { x("Dia", dayLabel(S.dia)); x("Período", S.periodo === "manha" ? "Manhã · 9–13 h" : S.periodo === "tarde" ? "Tarde · 14–18 h" : ""); x("Morada", S.morada); }
    if (n === 6) { x("Nome", S.nome); x("Telemóvel", S.tel); x("Email", S.email); x("NIF", S.nif); x("Notas", S.notas); x("Privacidade", S.rgpd ? "Política de privacidade lida" : ""); x("Lembretes", S.lembretes ? "Sim, quero lembretes de manutenção" : "Não"); }
    return r;
  }
  function paintReview() {
    $$("[data-rv]", root).forEach(function (dl) { var n = +dl.getAttribute("data-rv"); dl.innerHTML = rows(n).map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + r[1] + "</dd></div>"; }).join("") || "<div><dt>—</dt><dd>Falta preencher</dd></div>"; });
  }
  root.addEventListener("click", function (e) { var b = e.target.closest("[data-edit]"); if (!b) return; S.edit = true; save(); go(+b.getAttribute("data-edit")); });
  function paintOk() {
    $("#ok-ref").textContent = S.code; $("#ok-nome").textContent = S.nome ? ", " + S.nome.trim().split(/\s+/)[0] : "";
    var R = sumRows().concat([["Contacto", (S.nome || "") + " · " + (S.tel || "") + " · " + (S.email || "")]]);
    if (S.lembretes) R.push(["Lembretes", "Lembretes de manutenção ativados"]);
    $("#ok-sum").innerHTML = R.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("");
    $("#ok-mnt").textContent = S.pacote === "completo" ? "A 1.ª manutenção vem incluída no teu pacote. Depois, podes ficar com um contrato de manutenção." : "Podes juntar a 1.ª manutenção ou um contrato de manutenção quando confirmarmos o equipamento.";
  }
  nextB.addEventListener("click", function () {
    var n = S.step; collect();
    if (!check(n)) return;
    /* o pedido só é enviado no passo 7 (revisão), depois de o cliente ver tudo */
    if (n === 7) { for (var k = 1; k < 7; k++) { if (!check(k)) { S.edit = true; go(k); check(k); return; } }
      S.edit = false; S.code = "OW-" + String(Math.floor(100000 + Math.random() * 900000)); S.done = true; try { localStorage.removeItem("gw-cesto"); } catch (e) {} save(); go(OK); return; }
    if (S.edit && S.max >= 7) { S.edit = false; go(7); return; }
    S.max = Math.max(S.max, n + 1); go(n + 1);
  });
  backB.addEventListener("click", function () { go(S.step - 1); });
  tabs.forEach(function (t) { t.addEventListener("click", function () { go(+t.getAttribute("data-goto")); }); });
  $("[data-goto-known]").addEventListener("click", function () { if (S.max < 2 && !CP.test(S.cp || "")) { go(1); return; } S.max = Math.max(S.max, 2); go(2); });
  w.addEventListener("popstate", function (e) { var n = e.state && e.state.s; if (!n) { var m = location.hash.match(/passo-(\d)/); n = m ? +m[1] : 1; } go(n, { pop: true }); });
  form.addEventListener("submit", function (e) { e.preventDefault(); nextB.click(); });
  form.addEventListener("keydown", function (e) { if (e.key === "Enter" && e.target.tagName === "INPUT" && e.target.type !== "checkbox" && e.target.type !== "radio") { e.preventDefault(); nextB.click(); } });

  /* ---- confirmação: .ics e novo pedido ---- */
  $("[data-ics]").addEventListener("click", function () {
    var day = (S.dia || "").replace(/-/g, ""), a = S.periodo === "tarde" ? ["140000", "180000"] : ["090000", "130000"];
    var now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
    var ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//OW Solucoes//Funil demo//PT", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT", "UID:" + S.code + "@ow-solucoes.example", "DTSTAMP:" + now, "DTSTART;TZID=Europe/Lisbon:" + day + "T" + a[0], "DTEND;TZID=Europe/Lisbon:" + day + "T" + a[1], "SUMMARY:Visita técnica OW Soluções (a confirmar por telefone)", "DESCRIPTION:Pedido " + S.code + ". Visita técnica para confirmar o equipamento. Não é a instalação.", "LOCATION:" + (S.morada || "").replace(/[,;]/g, " ") + " " + (S.cp || ""), "END:VEVENT", "END:VCALENDAR"].join("\r\n");
    var url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" })), el = d.createElement("a");
    el.href = url; el.download = "ow-visita-" + S.code + ".ics"; d.body.appendChild(el); el.click(); el.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  });
  $("[data-reset]").addEventListener("click", function () { S = { rooms: {}, step: 1, max: 1, pacote: "completo" }; save(); fill(); go(1); });

  /* ---- arranque: continuar onde ficaste ---- */
  fill();
  var start = S.done ? OK : S.step;
  if (S.known && !S.done) { if (!CP.test(S.cp || "")) start = 1; else { S.max = Math.max(S.max, 2); start = 2; } S.known = start <= 2; }
  var hm = location.hash.match(/passo-(\d)/); if (hm && !S.done) start = +hm[1];
  go(start, { silent: true, replace: true });
});
