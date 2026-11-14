# GW Soluções — primeira versão (demonstração)

Sítio estático, manuscrito em HTML, CSS e JavaScript, na direcção **Corte habitado** (B / b2). Sem passo de compilação. Os conteúdos e os preços são fictícios.

**Não publicar a partir daqui sem autorização explícita.** O repositório local está pronto para GitHub Pages a partir da raiz de `main`, mas o envio para o GitHub fica com outra pessoa.

## Como abrir em local

Os caminhos são relativos, pensados para um projecto Pages em `https://rhuxta.github.io/<repo>/`. Serve a pasta **pai** e abre o sítio num subdirectório, para simular esse endereço:

```bash
mkdir -p /tmp/gh-sim
ln -sfn /caminho/para/gw-site /tmp/gh-sim/gw-solucoes
python3 -m http.server 8080 --bind 127.0.0.1 --directory /tmp/gh-sim
# http://127.0.0.1:8080/gw-solucoes/
```

Ficheiros na raiz: `index.html`, as restantes páginas, `404.html`, `.nojekyll`.

## O que esta versão faz — e o que não faz

- Navegação completa entre home, soluções, loja, ficha, orçamento, serviços, sobre, contacto, conta, cesto e 404.
- Diagnóstico guiado, corte da casa com câmara ao scroll, filtros da loja, vista explodida em SVG, orçamento em passos.
- Cesto e conta existem para testar a navegação. **A compra e o login não funcionam.** Não há checkout, pagamento nem campos de palavra-passe. O cesto usa `localStorage` só para o contador e a lista de demonstração.
- O pedido de orçamento termina numa confirmação simulada: **nada é enviado**.
- Contactos de exemplo: `geral@gw-solucoes.example`, `+351 210 000 000`, Travessa do Farol 8, 2750-321 Cascais, NIF 000 000 000. Não os trates como reais.

## Canonical, Open Graph e sitemap

Cada página tem `canonical` e `og:url` **relativos** (`index.html`, `loja.html`, …). Quando o repositório tiver nome, actualiza:

- `sitemap.xml` (substitui o marcador `REPO`)
- o comentário em `robots.txt`
- se quiseres URLs absolutas no `canonical` e no Open Graph

A imagem Open Graph está em `img/og-1200.png`.

## Textos

Todos os textos, organizados por página, estão em [`COPY.md`](COPY.md), para revisão.

## Tipografia e identidade

IBM Plex Sans (400, 500, 600) e IBM Plex Mono (400, 500), servidas em local, subconjunto latino, `font-display: swap`. Tokens em `css/tokens.css`. Logotipo tipográfico provisório.

## Acessibilidade e movimento

Ligações de salto, landmarks, foco visível, alvos de 44 px, `prefers-reduced-motion` (câmara estática, sem transições de página, revelações desligadas). Animações só com `transform` e `opacity`, com a excepção do menu móvel (`max-height`) e da altura do palco móvel ao compactar.

## Licença dos tipos

IBM Plex é SIL Open Font License 1.1 (IBM). Os ficheiros em `fonts/` são um subconjunto das fontes oficiais.
