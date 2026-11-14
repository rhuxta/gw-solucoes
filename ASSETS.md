# Assets da v2 — origem, licença e peso

Pesos medidos no repositório a 14 nov 2026 (Europe/Lisbon). As imagens são servidas em AVIF com WebP de recurso, em várias larguras (`srcset`). «Máx.» é o ficheiro AVIF mais pesado da série. Num telemóvel, só desce uma largura.

## Gerado por IA (rotulado)

Feito com as ferramentas GenerateImage/GenerateVideo do Grok Bot. Não são fotografias reais.

| Ficheiro de origem | Uso no site | Série | Máx. AVIF |
|---|---|---|---|
| `gen-hero.jpg` (1280×720, imagem) | Poster do herói da Home, `sala-32`, imagem OG | `hero-45`, `hero-219`, `sala-32`, `og-1200.jpg` | 39 KB |
| `gen-hero.mp4` (10 s, imagem→vídeo) | Vídeo do herói da Home (loop com crossfade de 9 s) | `video/hero-*.mp4` | ver Vídeo |
| `gen-quarto.jpg` | Situação «Sinto frio ao fim do dia» | `sit-frio` | 33 KB |
| `gen-oficio.jpg` | Herói de Serviços, Sobre (ofício), cartão da loja | `oficio`, `oficio-45` | 20 KB |
| `gen-manutencao.jpg` | Home (manutenção), banda de Serviços | `manutencao`, `manutencao-45` | 21 KB |

## Fotografia de stock (Licença Pexels: uso gratuito, comercial incluído, sem atribuição obrigatória)

| Pexels | Página | Uso | Série | Máx. AVIF |
|---|---|---|---|---|
| 25916354 | https://www.pexels.com/photo/25916354/ | Situação «A divisão aquece demasiado» | `sit-quente` | 24 KB |
| 25685899 | https://www.pexels.com/photo/25685899/ | Situação «O ar parece parado» | `sit-parado` | 8 KB |
| 10410769 | https://www.pexels.com/photo/10410769/ | Situação «Os vidros ficam embaciados» | `sit-humidade` | 186 KB (2400 px; 390 px usa ~30 KB) |
| 38788452 | https://www.pexels.com/photo/38788452/ | Fotografia «na parede» dos cartões e da ficha (unidade genérica com rótulo «INVERTER», sem marca) | `insitu-parede(-45)` | 21 KB |
| 39318564 | https://www.pexels.com/photo/39318564/ | Unidade exterior na fachada | `insitu-exterior(-45)` | 23 KB |
| 40535355 | https://www.pexels.com/photo/40535355/ | Rua de Cascais (Home, Sobre, Contacto) | `cascais-45`, `cascais-219` | 188 KB (2400 px) |

Licença: https://www.pexels.com/license/ (verificada a 14 nov 2026).

## Vídeo de stock (Mixkit Stock Video Free License)

| Mixkit | Uso | Ficheiros |
|---|---|---|
| 50236 (costa rochosa) | Banda de vídeo no topo de Sobre | `video/costa-*` |

Licença: https://mixkit.co/license/#videoFree (verificada na página do clip). Os clips 3977, 3110 e 50754 foram descarregados para teste e **não** estão no site.

## 3D, renders e texturas (feitos por nós em Blender 4.2 LTS, Cycles)

- **Maquete da casa em corte** (`corte`, `corte-mini`, `corte-dark`, `img/luz/*`): modelação procedimental em `gw-v2-assets/scripts/house.py`. Base 2400×1500 com 64 amostras; 20 camadas de luz (4 divisões × 5 estados: quente, frio, parado, humidade, ok) com 32 amostras, recortadas à divisão. Peso: `corte` máx. 41 KB; todas as 40 camadas AVIF somam 176 KB (cada uma tem 2–9 KB; só se descarrega a da divisão e do estado escolhidos). No total, a maquete no telemóvel fica abaixo de 60 KB.
- Modelos e texturas Poly Haven (**CC0**, https://polyhaven.com/license): `modern_coffee_table_01`, `potted_plant_04`, `side_table_01`, `metal_office_desk`, `modern_ceiling_lamp_01`; texturas `grey_plaster`, `laminate_floor_02`, `interior_tiles`, `clay_roof_tiles`; HDRI `photo_studio_loft_hall`, `studio_small_09`. Sofá, cama, banheira, cadeira e unidades de AC são procedimentais.
- **Produtos** (`p-*`): 10 modelos procedimentais em `scripts/products.py`, render 1200×1500 com fundo `--grey-10`. 10 renders somam 199 KB em AVIF (todas as larguras).
- **UI-25 3D**: `3d/ui-25.glb`, 27 KB (Draco), uma animação `explode` (30 fotogramas a 24 fps), juntada com glTF-Transform. Visor `vendor/model-viewer.min.js` 4.4.0 (Apache-2.0), 1,07 MB em bruto e 282 KB em gzip, só se carrega quando se pede o 3D (no desktop, ao aproximar a secção). Total do 3D por rede ≈ 310 KB (limite: 600 KB).

## Vídeo (codificação própria)

Grade comum (ffmpeg): saturação 0,9, balanço frio ligeiro, pretos levantados. Sem som, em loop, com poster, carregado só depois do `load` e nunca com `prefers-reduced-motion` ou Save-Data.

| Ficheiro | Peso |
|---|---|
| `hero-45.av1.mp4` / `.h264.mp4` (telemóvel, 4:5) | 264 KB / 327 KB |
| `hero-2190.av1.mp4` / `.h264.mp4` (desktop, 21:9) | 1,07 MB / 1,42 MB |
| `costa-45.av1.mp4` / `.h264.mp4` | 465 KB / 593 KB |
| `costa-2190.av1.mp4` / `.h264.mp4` | 1,03 MB / 1,08 MB |

## Outros

- Tipos: IBM Plex Sans e Plex Mono (SIL OFL 1.1), auto-alojados em `fonts/`.
- `img/og-1200.jpg` (78 KB): composição de `gen-hero.jpg` com o título.
- `img/favicon.svg`, `img/apple-touch-icon.png`: wordmark provisório (casa em corte).
