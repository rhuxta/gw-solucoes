# OW Soluções — v2 «Maquete viva» (demonstração)

Site estático em HTML, CSS e JavaScript sem framework. As páginas são **geradas** a partir de modelos em `tools/`. Conteúdos, preços e contactos são fictícios.

**Não publicar a partir daqui sem autorização explícita do Rhuston.** O ramo `v2` é local. Não fazer push nem merge para `main` sem esse OK.

## Gerar

```bash
node tools/pages.mjs      # escreve *.html, css/gw.css, js/data.js e sitemap.xml
```

- `tools/data.mjs`: empresa, produtos, problemas, respostas e números do diagnóstico.
- `tools/build.mjs`: cabeçalho, rodapé, cartões, maquete, diagnóstico e vídeo.
- `tools/pages.mjs`: uma secção por página.
- `tools/rooms.json`: posições das divisões e camadas de luz na maquete (gerado a partir do render).
- CSS de origem: `css/tokens.css` + `css/fonts.css` + `css/site.css`, juntos e minificados em **`css/gw.css`** (o único CSS ligado).
- `js/site.js`: comportamento de todas as páginas. `js/data.js` é gerado.
- Imagens: `img/*-{largura}.avif|webp` e `img/manifest.json`, feitos com `gw-v2-assets/scripts/images.mjs` (sharp). Camadas de luz em `img/luz/`.

## Ver em local (simula o subcaminho do GitHub Pages)

```bash
mkdir -p /tmp/gh-sim && ln -sfn "$PWD" /tmp/gh-sim/gw-solucoes
python3 -m http.server 8080 --bind 127.0.0.1 --directory /tmp/gh-sim
# http://127.0.0.1:8080/gw-solucoes/
```

Os caminhos são relativos. O `404.html` usa `<base href="/gw-solucoes/">`. Canonical e Open Graph são absolutos para `https://rhuxta.github.io/gw-solucoes/`.

## O que é simulado

O cesto vive em `localStorage`. «Finalizar compra», o orçamento, o contacto e a conta não enviam nada. Não há login, pagamento nem campos de palavra-passe. O único aviso visível está no rodapé.

Origem e licenças dos assets: [`ASSETS.md`](ASSETS.md).
