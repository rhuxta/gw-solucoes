/* OW Soluções — casa 3D em corte: carregador "poster primeiro" (ramo funil, 23 nov 2026).
   - O poster AVIF em [data-3d-slot="casa"] é o que se pinta; o canvas nunca é o LCP.
   - A cena three.js (js/casa3d-cena.js, evoluída de /workspace/vision/ow-casa3d/scene.js) só se importa:
     a) no 1.º toque no lugar (pointerdown/clique), ou
     b) em requestIdleCallback quando o lugar está visível — e nunca antes do evento `load`.
   - Sem WebGL, com Save-Data ou com deviceMemory ≤ 2: fica o poster e a lista (nada se descarrega).
   - A lista de divisões (links na entrada, checkboxes no passo 2) é sempre a interface verdadeira;
     a cena só a espelha: na entrada, tocar numa divisão abre orcamento.html?divisao=…; no passo 2, faz click() no checkbox.
   Coreografia dos capítulos: /workspace/vision/ow-casa3d/COREOGRAFIA.md. */
(function () {
  "use strict";
  var slots = [].slice.call(document.querySelectorAll('[data-3d-slot="casa"]'));
  if (!slots.length) return;
  var nav = navigator, conn = nav.connection || {};
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lite = !!conn.saveData || (nav.deviceMemory && nav.deviceMemory <= 2);
  var webgl = (function () { try { var c = document.createElement("canvas"); return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl"))); } catch (e) { return false; } })();
  if (lite || !webgl) { slots.forEach(function (s) { s.setAttribute("data-3d-state", "poster-only"); }); return; }

  var mod = null, loading = null, loaded = document.readyState === "complete";
  function importScene() {
    if (loading) return loading;
    loading = import("./casa3d-cena.js").then(function (m) { mod = m; return m; }, function () { mod = { available: false }; return mod; });
    return loading;
  }
  function say(slot, t) { var m = slot.querySelector("[data-3d-msg]"); if (m) m.textContent = t; }
  function onRoom(slot) {
    return function (room) {
      if (slot.getAttribute("data-3d-mode") === "escolher") {
        var box = document.querySelector('input[name=room][value="' + room + '"]'); if (box) box.click();
      } else { location.href = "orcamento.html?divisao=" + encodeURIComponent(room); }
    };
  }
  function ready(slot) {
    // a cena diz se já existe; até lá o botão fica escondido e o poster é tudo o que se vê
    if (!mod || !mod.available) { slot.setAttribute("data-3d-state", "poster"); return; }
    var go = slot.querySelector("[data-3d-go]"); if (go) go.hidden = false;
  }
  function mount(slot) {
    var go = slot.querySelector("[data-3d-go]");
    if (!mod || !mod.available || slot.getAttribute("data-3d-state") === "3d") return;
    if (go) go.setAttribute("aria-busy", "true");
    say(slot, "A carregar a casa em 3D.");
    Promise.resolve(mod.mount(slot, { mode: slot.getAttribute("data-3d-mode"), reducedMotion: reduce, onRoom: onRoom(slot) })).then(function (h) {
      slot._ow3d = h; slot.setAttribute("data-3d-state", "3d"); if (go) { go.hidden = true; go.removeAttribute("aria-busy"); }
      say(slot, "Casa em 3D pronta. A lista de divisões continua disponível.");
    }, function () { slot.setAttribute("data-3d-state", "poster"); if (go) go.removeAttribute("aria-busy"); say(slot, ""); });
  }
  function prime(slot) { return importScene().then(function () { ready(slot); }); }

  slots.forEach(function (slot) {
    // 1.º toque no lugar: importa (se ainda não) e monta se a cena existir
    slot.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      prime(slot).then(function () { if (e.target.closest("[data-3d-go]") || slot.getAttribute("data-3d-state") !== "3d") mount(slot); });
    });
    slot.addEventListener("pointerdown", function () { if (loaded) importScene(); }, { passive: true });
  });

  // estado do funil (passo, divisões, luz) para a cena pintar as divisões escolhidas
  document.addEventListener("ow:funil", function (e) { slots.forEach(function (s) { if (s._ow3d && s._ow3d.update) s._ow3d.update(e.detail); }); });

  // idle só depois do load e com o lugar visível
  function idle() {
    var ric = window.requestIdleCallback || function (f) { return setTimeout(f, 1200); };
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting && !en.target.hidden) { io.unobserve(en.target); ric(function () { prime(en.target); }, { timeout: 4000 }); } });
    }, { rootMargin: "200px 0px" });
    slots.forEach(function (s) { io.observe(s); });
  }
  if (loaded) idle(); else window.addEventListener("load", function () { loaded = true; idle(); }, { once: true });
})();
