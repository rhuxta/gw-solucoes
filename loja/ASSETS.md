# Assets — esboço da loja OW

Todas as imagens (fotos Pexels, renders próprios e uma imagem gerada) foram copiadas (só leitura) de `/workspace/ultron/ow-casa3d/demo-funil/img/`, onde já estão licenciadas e documentadas em `demo-funil/ASSETS.md`. Nenhuma mostra pessoas. Nenhuma foi descarregada de novo.

| Ficheiros em `img/` | Origem | Licença | Uso no esboço |
|---|---|---|---|
| `p-ui-25*`, `p-ui-12*`, `p-mc-80*`, `p-tc-35*`, `p-cs-60*`, `p-ue-50*`, `p-th-02*`, `p-vt-20*`, `p-vx-01*` | Renders procedimentais da OW/Ultron (Blender, `scripts/products.py`), fundo Grey 10 | Próprios | Packshots **genéricos provisórios** nos cartões e na galeria. **Não são os modelos reais** (Mitsubishi, Haier, Samsung) — trocar por packshots oficiais do fabricante ou fotos próprias. |
| `insitu-parede*` | Pexels 38788452 — unidade de parede genérica, sem marca | Pexels License | Hero da loja, mega menu, foto «instalada» da página de produto, vitrine «Sala», serviço Instalação |
| `insitu-exterior*` | Pexels 39318564 — unidade exterior na fachada | Pexels License | Vitrine «Casa toda» |
| `sit-frio*` | Imagem **gerada** do site (`gen-quarto.jpg`, ver ASSETS do Ultron) — quarto claro com unidade | Gerada para o projeto | Capítulo «Na tua casa», vitrine «Quarto» |
| `sit-quente*` | Pexels 25916354 — divisão com sol | Pexels License | Vitrine «Escritório», cartão da cassete (hover) |
| `fonts/*.woff2` | IBM Plex Sans/Mono | SIL Open Font License 1.1 | Tipo |

Licença Pexels: https://www.pexels.com/license/

**Placeholders rotulados** (caixa tracejada, «Foto a produzir: …»): Visita técnica, Calha decorativa, Suporte de pavimento.

Peso total de `img/`: ~0,75 MB em disco para todas as larguras; cada página no telemóvel descarrega só a largura certa (AVIF 400/480/800 px, `srcset` + `loading="lazy"`, hero com `fetchpriority="high"`).

**A produzir para a versão final:** packshots reais de cada modelo (fundo Grey 10, 1600×2000), 3–4 macros por produto, uma foto real de cada peça instalada pela OW (sem pessoas), fotos dos serviços.


## Catálogo real (ronda 10, 24 nov 2026)

Imagens **oficiais das marcas**, descarregadas das páginas/PDF oficiais em 24/11/2026. Originais em `img/catalogo/raw/`; recortes quadrados 400/800 px em WebP e AVIF, fundo transparente (sobre o Grey 10 do cartão), feitos por `fonte/ferramentas/imagens.py`.

**Licença:** material de comunicação das marcas, **só para uso interno neste esboço**. Antes de publicar, pedir o kit de imprensa / autorização ao distribuidor (Haier, Mitsubishi Electric, Samsung) ou usar as fotos que o fornecedor da OW disponibilizar.

| Ficheiro | Origem |
|---|---|
| `img/catalogo/me-hr-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/msz-hr |
| `img/catalogo/me-ay-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/msz-ay |
| `img/catalogo/me-ln-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/msz-ln |
| `img/catalogo/me-ef-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/msz-ef |
| `img/catalogo/me-mfz-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/mfz-kt |
| `img/catalogo/me-sez-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/sez-m |
| `img/catalogo/me-mxz-{400,800}.{webp,avif}` | https://mitsubishielectric.pt/gama-domestica-multisplit |
| `img/catalogo/me-ecodan-{400,800}.{webp,avif}` | fonte/fontes/mitsubishi-catalogo.pdf (catálogo Mitsubishi Electric, p. 94) |
| `img/catalogo/sa-ar35-{400,800}.{webp,avif}` | fonte/fontes/samsung-tabela-2026-polozero.pdf (imagem da tabela Samsung) |
| `img/catalogo/sa-cebu-{400,800}.{webp,avif}` | https://samsung-climatesolutions.com/pt/b2c/products/rac/cebu-s2.html |
| `img/catalogo/sa-avant-{400,800}.{webp,avif}` | https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-avant-s2.html |
| `img/catalogo/sa-premiere-{400,800}.{webp,avif}` | https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-premiere-plus.html |
| `img/catalogo/sa-fjm-{400,800}.{webp,avif}` | https://samsung-climatesolutions.com/pt/b2c/products/fjm/outdoor.html |
| `img/catalogo/sa-ehs-{400,800}.{webp,avif}` | https://samsung-climatesolutions.com/pt/b2c/products/ehs/mono/outdoor-r290-pump-integrated.html |
| `img/catalogo/sa-acl-{400,800}.{webp,avif}` | fonte/fontes/samsung-tabela-2026-polozero.pdf (imagem da tabela Samsung) |
| `img/catalogo/ha-geos-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2025/08/Geos_7.png |
| `img/catalogo/ha-pearl-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2025/08/web-pearl-premium.jpg |
| `img/catalogo/ha-flexis-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2025/08/web-flexis.png |
| `img/catalogo/ha-expert-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2025/08/Expert_W.png |
| `img/catalogo/ha-2u-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2026/03/2u40_2u50_2026.jpg |
| `img/catalogo/ha-superaqua-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2023/07/super-aqua-preta-e1689674439805.jpg |
| `img/catalogo/ha-m8-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2026/09/mini_m8_site.png |
| `img/catalogo/ha-etna-{400,800}.{webp,avif}` | https://haier-ac.pt/wp-content/uploads/2026/04/Produtos-Destaques_BC-ETNA-NATURE-C-ANODO-ELEC-1024x575.jpg (recorte) |

Notas: WindFree Comfort S2 usa a foto do Avant S2 (mesma carcaça S2); Super Aqua GT usa a foto da gama Super Aqua; Ecodan é a foto de ambiente do catálogo Mitsubishi; AR35 e ACL vêm das imagens (baixa resolução) da tabela Samsung; Etna Nature é um recorte do destaque da página Haier. A Interface Wi-Fi MAC-597IF-E continua com o render provisório `p-th-02`.
