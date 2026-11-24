# Referências three.js para o funil OW Soluções (v3, conceito B)

Fonte: os projetos listados na home de https://threejs.org/ (423 ligações), e não o próprio site do three.js.
Verificação: 23-11-2026, de manhã (hora de Lisboa). Cada site foi aberto a partir desta máquina com curl (UA de browser) e com o Chrome sem ecrã (WebGL por software), a 1440×900, com uma captura ao abrir, outra depois do scroll e outra depois do primeiro clique. As capturas estão em /tmp/threejs-ref/shots/ (pasta temporária; copiar se forem precisas).
Regra: adaptar a lógica de navegação, sem copiar o visual. A OW mantém a estética clara da Carrier, IBM Plex, bluegrey, o blue-60 #0F62FE só em ações, nenhum palco escuro, nenhuma pill, nenhuma etiqueta «01 ·», nada de fluxos de ar nem simuladores, mobile-first, AA e prefers-reduced-motion.

Espinha do funil (HTML, não muda): 1 casa/código postal → 2 divisões → 3 equipamento existente → 4 pacote recomendado → 5 dia da visita técnica → 6 contacto/confirmação.

---

## 1. WebVR Showroom (Little Workshop): exploração de um espaço
- URL: https://showroom.littleworkshop.fr/ (HTTP 200)
- Navegação: começa numa entrada dividida, com o texto e um único CTA («Enter the showroom») à esquerda e a sala 3D à direita, já viva por trás. Lá dentro há três gestos, e o próprio site ensina-os em três frases: arrastar para olhar à volta, tocar no chão para andar até um ponto fixo, tocar num objeto para mudar o material. Não há movimento livre de teclado, só saltos entre pontos fixos no chão. O VR é opcional e o site recua para o modo normal sem erro.
- O que adaptar para a OW: a entrada dividida, que é clara, com um CTA e o 3D como prova, encaixa na estética Carrier. Os «pontos no chão» passam a ser paragens fixas por divisão (sala, quarto, cozinha), porque a câmara salta e não se conduz. Tocar num objeto mostra a unidade interior com 2 ou 3 opções de modelo ou acabamento. As instruções vão em 3 linhas curtas, visíveis e em texto real.
- Entrada no funil: **soluções/localizador** e **passo 2 (divisões)**. Hoje é um SVG da casa com as divisões clicáveis; mais tarde, no 3D do conceito B, passa a uma sala com paragens fixas. O estado da divisão escolhida (sala, m², orientação) vai para o passo 3.

## 2. Lumen Decor Studio (Anderson Mancini): um interior e a hora do dia
- URL: https://lumen-decor-studio.vercel.app/ (HTTP 200; a página carrega pesado, porque o networkidle não fechou em 40 s)
- Navegação: um quarto real em 3D aparece por trás do título, com um único botão «Start» e um menu mínimo (About, Time of day). Depois do Start, a câmara entra no quarto. O único controlo de narrativa é um seletor de hora do dia, que muda a luz no mesmo espaço sem mudar de página. A demo é de iluminação global em WebGPU, por isso o Chrome sem ecrã só mostrou o fundo escuro depois do Start.
- O que adaptar para a OW: a ideia de que o mesmo espaço muda com um só controlo. Na OW, o controlo é «Verão / Inverno» ou «Tarde / Noite»: a mesma divisão passa de quente para confortável quando o equipamento entra. Isto é estado da divisão, não um fluxo de ar nem um simulador. O resultado é uma imagem antes/depois com um seletor acessível (radio), e não um vídeo.
- Entrada no funil: **scroll da home**, no capítulo «Visita» ou «Dia da instalação». No passo 4 (pacote recomendado) pode aparecer uma versão pequena: «a tua sala, antes e depois». Mais tarde entra no 3D. A tonalidade quente e escura do original não se aproveita: a OW usa luz de dia, clara.

## 3. Renault Espace Visualization (Little Workshop): produto 3D guiado
- URL: https://renaultespace.littleworkshop.fr/ (HTTP 200 em https; o http dá 500)
- Navegação: o carro está num estúdio claro e cinzento, com o título discreto no topo e três botões circulares no canto inferior direito: ver o interior, opções/cor e «start/stop» do motor. A câmara faz uma volta guiada ao abrir e depois o utilizador pode orbitar. Não há menus nem texto longo: o objeto é a interface e as poucas ações ficam sempre no mesmo canto.
- O que adaptar para a OW: o estúdio claro e neutro é a referência certa de luz para a ficha de produto (a Carrier aceita bem este cinza claro). Daqui vêm a volta guiada de entrada, que fica desligada em prefers-reduced-motion, e o grupo fixo de 3 ações: «Ver por dentro» (corte da unidade), «Acabamento» e «Ver na minha parede» (AR, em blue-60). Na OW as ações são botões retangulares com rótulo de texto, e não ícones circulares soltos.
- Entrada no funil: **ficha de produto** (conceito B, a câmara de produto distinta da da home) e **AR**. O CTA principal da ficha («Comprar com instalação» ou «Pedir orçamento», a decidir com o Rhuston) abre o fluxo no passo 4 com o modelo já escolhido.

## 4. AR-Fake Sneakers (Lusion): loja → ficha → 3D/AR → cesto
- URL: https://webxr-sneakers.lusion.co/ (HTTP 200)
- Navegação: é uma loja completa e curta. Abre com um hero e uma grelha de produtos com nome e preço; um clique leva a /product/00, com o produto grande, o preço, a descrição e só dois botões: «View in 3D» (que passa a AR quando o browser suporta WebXR) e «Add to cart». Quando não há suporte, aparece o aviso «not supported on your browser» junto ao botão, e o resto da página continua a funcionar.
- O que adaptar para a OW: o ritmo grelha → ficha → 3D/AR → cesto, com o mínimo de passos. A AR é um botão secundário junto ao preço, e não um ecrã à parte. Para quando não há suporte, mostrar uma alternativa honesta (imagem do produto numa parede de exemplo e um QR para abrir no telemóvel). Na OW, cada cartão da loja é um pacote (equipamento + instalação + 1.ª manutenção) com preço «de/até» [ ].
- Entrada no funil: **loja**, **ficha de produto** e **AR «Ver na minha parede»**. O «Add to cart» passa a «Comprar com instalação» → cesto com o pacote → passo 5 (dia da visita técnica). O azul saturado de fundo e as esferas decorativas não entram: o fundo é branco/bluegrey e o blue-60 fica só no botão.

## 5. Lacoste Members Experience, Create: configurador por passos
- URL: https://membersexperience-create.lacoste.com/ (HTTP 200) → /gb/en/create
- Navegação: na entrada, só duas palavras-navegação (Create / Gallery) e uma peça 3D a rodar sobre uma cor de fundo. «Create» abre o configurador: o modelo 3D fica ao centro, num estúdio branco, por baixo há uma fila de miniaturas para a primeira escolha (Classic Fit, Loose Fit, Long Sleeves, Regular, Relax Fit), um interruptor Men/Women e uma barra fixa em baixo com «Let's start». Cada escolha muda logo o modelo, e há uma só decisão por ecrã.
- O que adaptar para a OW: a decisão única por ecrã, com pré-visualização imediata e a barra fixa de ação em baixo (no telemóvel fica na zona do polegar). É exatamente o padrão dos passos 2 a 4: escolher a divisão, depois o equipamento existente, e o pacote recomendado atualiza-se ao lado (hoje imagem/SVG, mais tarde 3D). As miniaturas são cartões retangulares com rótulo, e não pills. O passo atual mostra-se como «Passo 3 de 6» em texto, sem «03 ·».
- Entrada no funil: **fluxo de orçamento, passos 2 a 4** (o núcleo do funil) e, mais tarde, a ficha de produto para escolher a potência e o acabamento.

---

## Mapa rápido

| Referência | Home (scroll) | Soluções / localizador | Loja | Ficha de produto | AR | Fluxo de 6 passos | 3D mais tarde |
|---|---|---|---|---|---|---|---|
| WebVR Showroom | | ● | | | | passo 2 | sala com paragens fixas |
| Lumen Decor Studio | ● | | | | | passo 4 (antes/depois) | luz por estado |
| Renault Espace | | | | ● | ● | entra no passo 4 | volta guiada + 3 ações |
| AR-Fake Sneakers | | | ● | ● | ● | cesto → passo 5 | |
| Lacoste Create | | | | ○ | | passos 2–4 | pré-visualização por escolha |

Decisão para hoje (HTML/CSS/JS): estrutura da navegação = loja e ficha à maneira da Sneakers + passos à maneira da Lacoste + localizador com divisões à maneira do Showroom. O 3D (Renault, Lumen, Showroom) entra depois sobre os mesmos pontos de entrada, sem refazer as páginas: cada «paragem» já existe hoje como um estado em HTML (`data-sala`, `data-passo`) que a câmara three.js pode ler mais tarde.

## O que não aproveitar
- Palco escuro e cinematográfico, com néon (Hubtown, o lado noturno do Lumen, a home da Lusion): é contra a estética Carrier e aproxima-se do portefólio.
- Ecrãs de loading com percentagem e intros com som (Hubtown, Kokuyo): o funil não pode esperar pelo 3D, e o HTML aparece primeiro.
- Comandos de jogo ou condução livre (bruno-simon.com, teleoperator.mindblown.ai, Tidewater): não servem para vender um serviço. O bruno-simon.com é um portefólio e não deve ser copiado.
- Câmara livre sem paragens: dá para perder-se, que é exatamente o problema da v2.
- Botões só com ícone (Renault) e menus de duas palavras sem contexto (Lacoste): na OW, cada ação tem um rótulo de texto, AA.
- Fundos de cor saturada (Sneakers, Lacoste): só bluegrey, e o blue-60 fica reservado às ações.
- Efeitos de fluxo de ar, partículas e simuladores de temperatura: estão excluídos.

## Referências caídas ou bloqueadas (não contam nas 5)
- **Infinitown** (Little Workshop), https://demos.littleworkshop.fr/infinitown: HTTP 502 a partir daqui. Era uma cidade explorável e a referência perfeita para «a casa no bairro». Fica como candidata se abrir noutro dia.
- **House of Maserati**, https://houseof.maserati.com/: sem resposta (timeout/000).
- **The Fabulous Cartier Journey**, https://www.cartier.com/thefabulouscartierjourney: HTTP 403 a partir daqui, provavelmente bloqueio anti-bot e não um site em baixo. É um percurso de scroll, continua candidata se for confirmada noutro browser.
- **Design the next iPhone** (neal.fun) e **Dioriviera 2022** (Dior): HTTP 403 a partir daqui, também candidatas se forem confirmadas.
- **A Short Journey**, **Going Home** e **Car Visualizer** (plus360degrees): HTTP 500.
- Vistos e abertos, mas não escolhidos: Porsche 718 Cayman (dyadstudios, 200; é uma demo técnica de shaders, com painel de debug), Hublot/darkroom (200; palco escuro), Kokuyo «Curiosity is Life» (200; intro com som e loading), Daimaru «百様図» (200; é generativo, não navegação de produto) e Google Gboard caps (200; scroll de produto humorístico, útil só como ritmo de ficha longa).
