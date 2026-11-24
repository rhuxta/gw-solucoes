# Catálogo OW — levantamento de equipamentos (esboço)

Levantamento de 2026-11-24. Gerado por `fonte/ferramentas/construir_catalogo.py`; dados completos em `fonte/catalogo.json` (formato pronto para Shopify).

**Fornecedores:** não há lista de fornecedores da OW em ultron, vision ou Notion (o «Guia de gestão» diz «[a confirmar com o fornecedor]»). Usámos as três marcas já assumidas no site — **Haier, Mitsubishi Electric e Samsung** — com as gamas oficiais PT 2026. **Distribuidor(es) e preço de compra reais por confirmar pela OW.**

## Regras

- **Preço:** Preço do equipamento = PVP s/ IVA da tabela oficial da marca × 1,23, arredondado ao euro (exceção: conjunto MXZ-2F42, preço de EXEMPLO). Instalação: valor de EXEMPLO por tipo (OW a confirmar).
- **Área:** Área indicativa ESTIMADA pela OW (as marcas não publicam m²): ar condicionado ≈ 100 W de frio por m² (máx. = kW × 10; mín. = máx. − 15, nunca abaixo de 8 m²); multi-split: até kW × 10 + 10 m² no total; bomba de calor: 50–80 W de aquecimento por m² (kW × 12,5 a kW × 20); AQS: ≈ 50 L por pessoa.
- **Classe:** Classe de arrefecimento (Reg. UE 626/2011) quando só há SEER: ≥8,5 A+++, ≥6,1 A++, ≥5,6 A+; aquecimento por SCOP: ≥5,1 A+++, ≥4,6 A++, ≥4,0 A+. Bombas de calor: classe a 35 °C; AQS: classe de aquecimento de água.
- **Unidades exteriores:** Não se vendem unidades exteriores soltas: os monosplit vendem-se como conjunto (referência da exterior nas especificações) e as exteriores multi-split como conjuntos com interiores (DL 145/2017: equipamento split com gás fluorado só com instalação certificada).

## Fontes de preço

- **Mitsubishi Electric:** [Tabela de Preços Mitsubishi Electric 2026 (PVR s/ IVA), cópia publicada pela Polozero](https://polozero.com/wp-content/uploads/2026/06/Tabela-de-Precos-Mitsubishi-2026.pdf) — cópia em `fonte/fontes/mitsubishi-tabela-2026-polozero.pdf`. Verificação: KeroClima mostra «Preço tabela» 947,10 € para MSZ-HR25VFK = 770 € × 1,23 (confirma que a tabela é sem IVA).
- **Samsung:** [Tabela de Preços Samsung Climate Solutions 2026 (s/ IVA), cópia publicada pela Polozero](https://polozero.com/wp-content/uploads/2026/01/Tabela-Precos-Samsung-2026.pdf) — cópia em `fonte/fontes/samsung-tabela-2026-polozero.pdf`. Verificação: KeroClima mostra «Preço tabela» 1.051,65 € para AR50F09C1AHNEU = 855 € × 1,23.
- **Haier:** [Tabela de Preços Haier 2026/27 (P.V.P. s/ I.V.A.)](https://haier-ac.pt/wp-content/uploads/2026/10/TP-HAIER-2026.27_WEB_compressed-1.pdf) — cópia em `fonte/fontes/haier-tabela-2026-27.pdf`. Verificação: A tabela indica «s/i.v.a.»; Radio Popular vende HP200M7-F9 a 1.329,99 € (PVPR 1.979,99 €) em 24/11/2026.

## Resumo

| Categoria | Haier | Mitsubishi Electric | Samsung | Total | Com preço público |
|---|---|---|---|---|---|
| Ar condicionado | 8 | 10 | 9 | 27 | 27 |
| Multi-split | 2 | 1 | 2 | 5 | 5 |
| Bomba de calor | 2 | 3 | 2 | 7 | 7 |
| Águas quentes | 3 | 0 | 2 | 5 | 5 |
| Acessório | 0 | 1 | 0 | 1 | 1 |
| **Total** | | | | **45** | **45** |

Mais 3 kits e 4 serviços (preços de exemplo), também como produtos no JSON.

## Modelos

| Marca | Modelo | Referência (exterior) | Tipo | kW frio/calor | Área (est.) | Classe | dB(A) | Gás | Wi-Fi | Multi | PVP s/ IVA | Loja c/ IVA | Página oficial |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Mitsubishi Electric | MSZ-HR 2,5 kW | MSZ-HR25VFK (MUZ-HR25VF) | Ar condicionado · parede | 2,5/3,15 | 10–25 m² | A++ / A+ | 21 | R32 | integrado | não | 770 € | 947 € | [link](https://mitsubishielectric.pt/msz-hr) |
| Mitsubishi Electric | MSZ-HR 3,5 kW | MSZ-HR35VFK (MUZ-HR35VF) | Ar condicionado · parede | 3,4/3,6 | 19–34 m² | A++ / A+ | 22 | R32 | integrado | não | 910 € | 1.119 € | [link](https://mitsubishielectric.pt/msz-hr) |
| Mitsubishi Electric | MSZ-AY 2,5 kW | MSZ-AY25VGK (MUZ-AY25VG) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A+++ / A++ | 18 | R32 | integrado | sim | 1.040 € | 1.279 € | [link](https://mitsubishielectric.pt/msz-ay) |
| Mitsubishi Electric | MSZ-AY 3,5 kW | MSZ-AY35VGK (MUZ-AY35VG) | Ar condicionado · parede | 3,5/4,0 | 20–35 m² | A+++ / A++ | 18 | R32 | integrado | sim | 1.150 € | 1.414 € | [link](https://mitsubishielectric.pt/msz-ay) |
| Mitsubishi Electric | MSZ-AY 5,0 kW | MSZ-AY50VGK (MUZ-AY50VG) | Ar condicionado · parede | 5,0/5,5 | 35–50 m² | A++ / A++ | 28 | R32 | integrado | sim | 1.850 € | 2.276 € | [link](https://mitsubishielectric.pt/msz-ay) |
| Mitsubishi Electric | MSZ-LN Kirigamine Style 2,5 kW | MSZ-LN25VGW (MUZ-LN25VG) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A+++ / A+++ | 19 | R32 | integrado | sim | 1.420 € | 1.747 € | [link](https://mitsubishielectric.pt/msz-ln) |
| Mitsubishi Electric | MSZ-LN Kirigamine Style 3,5 kW | MSZ-LN35VGW (MUZ-LN35VG) | Ar condicionado · parede | 3,5/4,0 | 20–35 m² | A+++ / A+++ | 19 | R32 | integrado | sim | 1.620 € | 1.993 € | [link](https://mitsubishielectric.pt/msz-ln) |
| Mitsubishi Electric | MSZ-EF Kirigamine Zen 2,5 kW | MSZ-EF25VGKW (MUZ-EF25VG) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A+++ / A++ | 19 | R32 | integrado | sim | 1.160 € | 1.427 € | [link](https://mitsubishielectric.pt/msz-ef) |
| Mitsubishi Electric | MFZ-KT consola 2,5 kW | MFZ-KT25VGK (SUZ-M25VA) | Ar condicionado · consola | 2,5/3,4 | 10–25 m² | A++ / A+ | 19 | R32 | integrado | sim | 1.620 € | 1.993 € | [link](https://mitsubishielectric.pt/mfz-kt) |
| Mitsubishi Electric | SEZ-M conduta 3,5 kW | SEZ-M35DA (SUZ-M35VA) | Ar condicionado · conduta | 3,5/4,2 | 20–35 m² | A+ / A+ | 23 | R32 | opcional | sim | 1.450 € | 1.784 € | [link](https://mitsubishielectric.pt/sez-m) |
| Samsung | AR35 Wi-Fi 2,5 kW | AR40H09C1AMNEU (AR40H09C1AMXEU) | Ar condicionado · parede | 2,5/2,9 | 10–25 m² | A++ / A+ | 20 | R32 | integrado | não | 605 € | 744 € | [link](https://samsung-climatesolutions.com/pt/b2c/our-solutions/home/air-conditioning-solutions/single-split.html) |
| Samsung | AR35 Wi-Fi 3,5 kW | AR40H12C1AMNEU (AR40H12C1AMXEU) | Ar condicionado · parede | 3,5/3,8 | 20–35 m² | A++ / A | 22 | R32 | integrado | não | 690 € | 849 € | [link](https://samsung-climatesolutions.com/pt/b2c/our-solutions/home/air-conditioning-solutions/single-split.html) |
| Samsung | Cebu S2 2,5 kW | AR50F09C1AHNEU (AR50F09C1AHXEU) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A++ / A+ | 19 | R32 | integrado | sim | 855 € | 1.052 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/cebu-s2.html) |
| Samsung | Cebu S2 3,5 kW | AR50F12C1AHNEU (AR50F12C1AHXEU) | Ar condicionado · parede | 3,5/3,5 | 20–35 m² | A++ / A+ | 19 | R32 | integrado | sim | 950 € | 1.168 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/cebu-s2.html) |
| Samsung | WindFree Comfort S2 2,5 kW | AR60F09C1AWNEU (AR60F09C1AWXEU) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A++ / A++ | 16 | R32 | integrado | sim | 975 € | 1.199 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-comfort-s2.html) |
| Samsung | WindFree Avant S2 2,5 kW | AR70F09C1AWNEU (AR70F09C1AWXEU) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A+++ / A++ | 16 | R32 | integrado | sim | 1.115 € | 1.371 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-avant-s2.html) |
| Samsung | WindFree Avant S2 3,5 kW | AR70F12C1AWNEU (AR70F12C1AWXEU) | Ar condicionado · parede | 3,5/4,0 | 20–35 m² | A+++ / A++ | 16 | R32 | integrado | sim | 1.250 € | 1.538 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-avant-s2.html) |
| Samsung | WindFree Avant S2 5,0 kW | AR70F18C1AWNEU (AR70F18C1AWXEU) | Ar condicionado · parede | 5,0/6,0 | 35–50 m² | A++ / A+ | 25 | R32 | integrado | sim | 1.825 € | 2.245 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-avant-s2.html) |
| Samsung | WindFree Première+ 2,5 kW | AR70H09CAAWNEU (AR70H09CAAWXEU) | Ar condicionado · parede | 2,5/3,2 | 10–25 m² | A+++ / A+++ | 16 | R32 | integrado | sim | 1.485 € | 1.827 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/rac/windfree-premiere-plus.html) |
| Haier | Geos XT 2,5 kW | AS25RBAHRA-3 (1U25YEGFRA-3) | Ar condicionado · parede | 2,7/2,9 | 12–27 m² | A++ / A+++ | 18 | R32 | integrado | sim | 529 € | 651 € | [link](https://haier-ac.pt/geos-xt/) |
| Haier | Geos XT 3,5 kW | AS35RBAHRA-4 (1U35YESFRA-4) | Ar condicionado · parede | 3,5/3,9 | 20–35 m² | A++ / A+++ | 18 | R32 | integrado | sim | 556 € | 684 € | [link](https://haier-ac.pt/geos-xt/) |
| Haier | Pearl Premium 2,5 kW | AS25PBPHRA-PRE (1U25YEPFRA-PRE) | Ar condicionado · parede | 2,7/3,1 | 12–27 m² | A+++ / A+++ | 18 | R32 | integrado | sim | 640 € | 787 € | [link](https://haier-ac.pt/pearl-premium-haier/) |
| Haier | Pearl Premium 3,5 kW | AS35PBPHRA-PRE (1U35MEPFRA-PRE) | Ar condicionado · parede | 3,6/3,9 | 21–36 m² | A+++ / A+++ | 18 | R32 | integrado | sim | 690 € | 849 € | [link](https://haier-ac.pt/pearl-premium-haier/) |
| Haier | Flexis Plus 2,5 kW | AS25S2SF1FA-WH (1U25S2SM1FA-2) | Ar condicionado · parede | 2,6/3,2 | 11–26 m² | A+++ / A+++ | 16 | R32 | integrado | sim | 915 € | 1.125 € | [link](https://haier-ac.pt/haier-flexisplus/) |
| Haier | Flexis Plus 3,5 kW | AS35S2SF1FA-WH (1U35S2SM1FA-2) | Ar condicionado · parede | 3,5/4,2 | 20–35 m² | A+++ / A+++ | 17 | R32 | integrado | sim | 999 € | 1.229 € | [link](https://haier-ac.pt/haier-flexisplus/) |
| Haier | Flexis Plus 5,0 kW | AS50S2SF1FA-WH (1U50S2SJ2FA-2) | Ar condicionado · parede | 5,2/6,0 | 37–52 m² | A++ / A+++ | 28 | R32 | integrado | sim | 1.289 € | 1.585 € | [link](https://haier-ac.pt/haier-flexisplus/) |
| Haier | Expert 2,5 kW | AS25XCAHRA (1U25S2SM1FA-2) | Ar condicionado · parede | 2,8/3,2 | 13–28 m² | A+++ / A++ | 16 | R32 | integrado | sim | 930 € | 1.144 € | [link](https://haier-ac.pt/haier-expert/) |
| Mitsubishi Electric | Interface Wi-Fi MAC-597IF-E | MAC-597IF-E | Acessório · acessorio | — | — | — | — | — | — | — | 80 € | 98 € | [link](https://mitsubishielectric.pt/tecnologias-melcloud) |
| Haier | Multi-split 2U50 + 2 Flexis Plus | CMT99FLEXIS50 (2U50MS3FRA + 2× AS25S2SF1FA-WH) | Multi-split · multi-2 | 5,0/5,6 | 20–60 m² | A+++ / A++ | — | R32 | integrado | sim | 1.537 € | 1.891 € | [link](https://haier-ac.pt/haier-multisplit/) |
| Haier | Multi-split 3U70 + 3 Flexis Plus | CMT9912FLEXIS70 (3U70S2SR5FA + 2× AS25S2SF1FA-WH + AS35S2SF1FA-WH) | Multi-split · multi-3 | 7,0/7,6 | 30–80 m² | A+++ / A+ | — | R32 | integrado | sim | 2.185 € | 2.688 € | [link](https://haier-ac.pt/haier-multisplit/) |
| Samsung | Multi-split FJM 5,0 + 2 Avant S2 | AJ050TXJ2KG+2xAR70F09C1AWNEU (AJ050TXJ2KG + 2× AR70F09C1AWNEU) | Multi-split · multi-2 | 5,0/5,6 | 20–60 m² | A+++ | 46 | R32 | integrado | sim | 2.250 € | 2.768 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/fjm/outdoor.html) |
| Samsung | Multi-split FJM 6,8 + 3 Cebu S2 | AJ068TXJ3KG+3xAR50F09C1AHNEU (AJ068TXJ3KG + 3× AR50F09C1AHNEU) | Multi-split · multi-3 | 6,8/8,0 | 30–78 m² | A++ | — | R32 | integrado | sim | 2.695 € | 3.315 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/fjm/outdoor.html) |
| Mitsubishi Electric | Multi-split MXZ-2F42 + 2 MSZ-AY | MXZ-2F42VF+2xMSZ-AY25VGK (MXZ-2F42VF + 2× MSZ-AY25VGK) | Multi-split · multi-2 | 4,2/4,5 | 20–52 m² | A+++ / A++ | — | R32 | integrado | sim | 2.390 € | 2.940 € | [link](https://mitsubishielectric.pt/gama-domestica-multisplit) |
| Mitsubishi Electric | Ecodan Hydrosplit R290 5 kW + Hydrobox | PUZ-WZ50VAA+ERPX-VM2E (PUZ-WZ50VAA + ERPX-VM2E) | Bomba de calor · ar-agua | —/5,0 | 62–100 m² | A+++ / A++ | 42 | R290 | integrado | — | 6.400 € | 7.872 € | [link](https://mitsubishielectric.pt/ecodan-hydrosplit) |
| Mitsubishi Electric | Ecodan Hydrosplit R290 5 kW + Hydrobox Duo 200 L | PUZ-WZ50VAA+ERPT20X-VM2E (PUZ-WZ50VAA + ERPT20X-VM2E) | Bomba de calor · ar-agua | —/5,0 | 62–100 m² | A+++ / A++ | 42 | R290 | integrado | — | 8.450 € | 10.394 € | [link](https://mitsubishielectric.pt/ecodan-hydrosplit) |
| Mitsubishi Electric | Ecodan Hydrosplit R290 8,5 kW + Hydrobox | PUZ-WZ90VAA-W+ERPX-VM2E (PUZ-WZ90VAA-W + ERPX-VM2E) | Bomba de calor · ar-agua | —/8,5 | 106–170 m² | A+++ / A++ | — | R290 | integrado | — | 7.750 € | 9.532 € | [link](https://mitsubishielectric.pt/ecodan-hydrosplit) |
| Samsung | EHS Mono R290 5 kW | AE050CXYBEK (AE050CXYBEK + MWR-WW10JN) | Bomba de calor · ar-agua | —/5,0 | 62–100 m² | A+++ | 45 | R290 | integrado | — | 5.325 € | 6.550 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/ehs/mono/outdoor-r290-pump-integrated.html) |
| Samsung | EHS Mono R290 8 kW | AE080CXYBEK (AE080CXYBEK + MWR-WW10JN) | Bomba de calor · ar-agua | —/8,0 | 100–160 m² | A+++ | — | R290 | integrado | — | 6.415 € | 7.890 € | [link](https://samsung-climatesolutions.com/pt/b2c/products/ehs/mono/outdoor-r290-pump-integrated.html) |
| Haier | Super Aqua GT monobloco 4 kW | AW042MUGHA | Bomba de calor · ar-agua | —/4,0 | 50–80 m² | A+++ | 44 | R290 | integrado | — | 3.664 € | 4.507 € | [link](https://haier-ac.pt/super-aqua-gt-monobloco/) |
| Haier | Super Aqua GT monobloco 8 kW | AW082MUGHA | Bomba de calor · ar-agua | —/8,0 | 100–160 m² | A+++ | 48 | R290 | integrado | — | 3.916 € | 4.817 € | [link](https://haier-ac.pt/super-aqua-gt-monobloco/) |
| Samsung | Bomba de calor AQS ACL 150 L | ACL-150DHY | Águas quentes · aqs-chao | — | 150 L | A+ | 30 | R290 | integrado | — | 3.125 € | 3.844 € | [link](https://samsung-climatesolutions.com/pt/b2c/our-solutions/home/heat-pump-solutions/heating.html) |
| Samsung | Bomba de calor AQS ACL 250 L | ACL-250DHG | Águas quentes · aqs-chao | — | 250 L | A+ | 30 | R290 | integrado | — | 3.620 € | 4.453 € | [link](https://samsung-climatesolutions.com/pt/b2c/our-solutions/home/heat-pump-solutions/heating.html) |
| Haier | Etna Nature 200 L | HP200M7-F9/B | Águas quentes · aqs-chao | — | 194 L | A+ | 36 | R290 | integrado | — | 1.610 € | 1.980 € | [link](https://haier-ac.pt/etna-nature/) |
| Haier | Etna Nature 250 L | HP250M7-F9/B | Águas quentes · aqs-chao | — | 240 L | A+ | — | R290 | integrado | — | 1.750 € | 2.152 € | [link](https://haier-ac.pt/etna-nature/) |
| Haier | Mini M8 110 L mural | HP110M8-9/B | Águas quentes · aqs-mural | — | 102 L | A+ | — | R290 | integrado | — | 1.310 € | 1.611 € | [link](https://haier-ac.pt/mini-m8/) |

## Imagens

Imagens oficiais das marcas em `img/catalogo/raw/` (originais) e `img/catalogo/{id}-{400,800}.{webp,avif}` (recortes). **Uso interno no esboço**; antes de publicar, pedir kit de imprensa/autorização ao distribuidor. Origem de cada uma em `ASSETS.md`.

## Valores de exemplo (apresentação) e o que falta da OW

> Valores FICTÍCIOS para apresentação (pedido do Rhuston a 24/11/2026). Não são factos verificados: a OW confirma cada um antes de publicar.

Todos os produtos têm a etiqueta `dados-exemplo` e a lista `exemplo` no JSON com os campos fictícios. A tabela completa está em `shopify/GUIA-LIGACAO-SHOPIFY.md` («Valores de exemplo para apresentação»).

- Instalação (exemplo): parede/consola 290 €, conduta 690 €, multi-split 2 interiores 490 € / 3 interiores 640 €, bomba de calor monobloco 1500 € / hydrosplit 1900 €, AQS 350 €; 3 m de tubagem incluídos, metro extra 35 €.
- Kits: desconto de exemplo (~4 %). Serviços: preços de exemplo.
- Conjunto Mitsubishi MXZ-2F42: preço de EXEMPLO (interiores para multi a 600 € s/ IVA, valor fictício).
- Stock, prazos (5 dias úteis em stock; 7–15 dias sob encomenda), garantia (3 anos equipamento · 2 anos instalação), pesos por categoria e Wi-Fi das bombas de calor/AQS sem dado na ficha: exemplo.
- Certificado F-gas da OW: PT-FG-0000-EX (exemplo).

Continua a faltar da OW: fornecedores reais e preços de compra, dados reais de procura («Mais procurados» é ordem editorial), fotos próprias / autorização das marcas, foto real do MAC-597IF-E e do Super Aqua GT.
