# Nota para a OW e para o Vision
Rascunho de copy em PT-PT, 23 de novembro de 2026. Não é aconselhamento jurídico e não deve ir para o ar sem a revisão de um jurista e o preenchimento dos placeholders. Nada foi publicado.

Os dados de NIF, morada, telefone e email que aparecem hoje no rodapé do site de demonstração estão marcados como fictícios. Por isso, todos os dados da empresa ficam como `[placeholder]`.

## Ficheiros
- `politica-de-privacidade.md` — página 1
- `cookies-e-medicoes.md` — página 2
- `termos-e-condicoes.md` — página 3
- `livro-de-reclamacoes-e-ral.md` — página 4
- `avisos-legais.md` — página extra recomendada (identificação da empresa)
- `rodape.md` — textos e ligações obrigatórios no rodapé e na página inicial

Endereços sugeridos: `/privacidade`, `/cookies`, `/termos`, `/livro-de-reclamacoes`, `/avisos-legais`.

## O que falta confirmar com a OW
- Denominação social, forma jurídica, NIF, morada da sede, email, telefone e horário
- Inscrição em registo comercial (conservatória e número) e, se existir, capital social
- URL definitivo do site
- Licenças ou autorizações prévias da atividade (por exemplo, certificação para manuseamento de gases fluorados) e a entidade que as concedeu
- Nome do fornecedor / parceiro que envia o equipamento, do processador de pagamentos e do alojamento do site
- Ferramenta de medição (Plausible ou Umami), o local de alojamento e a confirmação de que não grava nem lê informação no equipamento do visitante (nem cookies, nem `localStorage`, nem impressão digital do dispositivo)
- Prazos reais: entrega, resposta a orçamentos, conservação de pedidos e de contas
- Custo de devolução ou de recolha de equipamento volumoso, e se a OW oferece a recolha
- Zona de atuação para instalação e visitas técnicas
- Se está vinculada a alguma entidade de RAL (por adesão ou por arbitragem necessária). Se estiver, nome e sítio na Internet da entidade
- Se tem estabelecimento com atendimento ao público e, nesse caso, livro de reclamações em papel
- Se já está registada na plataforma [livroreclamacoes.pt](https://www.livroreclamacoes.pt)
- Se designou um encarregado de proteção de dados (EPD)
- Se envia as encomendas para fora de Portugal ou transfere dados para fora do Espaço Económico Europeu
- Se vende só a consumidores ou também a empresas (os prazos de livre resolução e de garantia legal abaixo aplicam-se a consumidores)
- Quem fatura o equipamento e a instalação quando o pacote é «comprar com instalação»

## Páginas ou menções que podem ainda faltar
1. **Avisos legais / identificação da empresa**, ao abrigo do artigo 10.º do [Decreto-Lei n.º 7/2004](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2004-585257). O rodapé já mostra alguns dados, mas a lei pede acesso fácil e permanente ao nome, morada, email, NIF e eventuais registos ou autorizações. Escrevi esta página extra.
2. **Resíduos de equipamentos elétricos e eletrónicos (REEE)**, [Decreto-Lei n.º 152-D/2017](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2017-114637270): quem vende este tipo de equipamento pode ter de informar sobre a retoma de equipamentos em fim de vida. Falta confirmar com a OW e, se se aplicar, acrescentar uma secção curta.
3. **Envios e devoluções** podem viver dentro dos Termos (já lá estão) ou virar página própria, se o Vision preferir um atalho na loja.
4. A plataforma europeia de resolução de litígios em linha (ODR) foi encerrada a 20 de julho de 2025. Não incluí esse endereço.

## Obrigações que não são uma página, mas o site tem de cumprir
- Ligação visível e destacada, **na página de entrada**, para [www.livroreclamacoes.pt](https://www.livroreclamacoes.pt) (artigo 5.º-B do [Decreto-Lei n.º 156/2005](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2005-34431675) e artigo 11.º da [Portaria n.º 201-A/2017](https://diariodarepublica.pt/dr/detalhe/portaria/201-a-2017-107614162)). Uma página interna não substitui este acesso direto à plataforma oficial.
- Preços de venda ao consumidor com IVA e demais encargos incluídos, nos termos do [Decreto-Lei n.º 138/90](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1990-137618153).
- Se o número de telefone tiver um custo superior ao de uma chamada normal, esse custo tem de ser indicado.
- A informação de RAL no sítio e nos contratos só é obrigatória se a empresa estiver vinculada a uma entidade, por adesão ou por arbitragem necessária (artigo 18.º da [Lei n.º 144/2015](https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2015-119475005)).

## Notas para o Vision (ramo `funil`)
- Ainda não existe `privacidade.html` nesse ramo. A política de privacidade deve ser a página para onde aponta a caixa do funil de orçamento.
- A caixa atual diz «Aceito que a OW Soluções use estes dados para responder a este pedido». Responder a um orçamento é, em regra, uma diligência pré-contratual (artigo 6.º, n.º 1, alínea b), do RGPD), não um consentimento. Sugestão de texto: «Li a [política de privacidade](/privacidade) e compreendo que a OW Soluções vai usar estes dados para responder a este pedido.» Os lembretes de manutenção, esses sim, pedem consentimento à parte (a caixa opcional já existente).
- A mensagem de erro do funil («Precisamos do teu consentimento para responder ao pedido.») deve ser alinhada com esta base legal, por exemplo: «Para enviarmos o pedido, confirma que leste a política de privacidade.»
- No rodapé de todas as páginas, incluir as ligações indicadas em `rodape.md`. O acesso ao Livro de Reclamações eletrónico tem de ir para o sítio oficial e estar destacado já na página inicial.

## Fontes oficiais consultadas
- [RGPD, artigos 13.º e 14.º](https://commission.europa.eu/law/law-topic/data-protection/rules-business-and-organisations/principles-gdpr/what-information-must-be-given-individuals-whose-data-collected_pt) e [Lei n.º 58/2019](https://diariodarepublica.pt/dr/detalhe/lei/58-2019-123815982)
- Direitos dos titulares e prazo de resposta: [CNPD](https://www.cnpd.pt/cidadaos/direitos/)
- Queixa à CNPD: [formulário geral](https://www.cnpd.pt/cidadaos/participacoes/geral/) e [contactos](https://www.cnpd.pt/cnpd/atendimento-ao-publico/)
- Cookies e armazenamento no equipamento: artigo 5.º da [Lei n.º 41/2004](https://www.pgdlisboa.pt/leis/lei_mostra_articulado.php?nid=147&tabela=leis) e [nota informativa da CNPD de 25 de junho de 2021](https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf)
- Livre resolução: [Decreto-Lei n.º 24/2014](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2014-73222992), artigos 10.º a 15.º e 17.º
- Garantias: [Decreto-Lei n.º 84/2021](https://diariodarepublica.pt/dr/detalhe/decreto-lei/84-2021-172938301) e [guia do Gov.pt](https://www.gov.pt/guias/garantia-de-produtos-comprados-em-portugal)
- Livro de Reclamações: [Decreto-Lei n.º 156/2005](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2005-34431675) e [Portaria n.º 201-A/2017](https://diariodarepublica.pt/dr/detalhe/portaria/201-a-2017-107614162)
- RAL: artigo 18.º da [Lei n.º 144/2015](https://dgsl.pt/legislacao/lei_144-2015/artigo/18); lista da DGC: [consumidor.gov.pt/ral-mapa-e-lista-de-entidades](https://www.consumidor.gov.pt/ral-mapa-e-lista-de-entidades)
- Identificação do prestador: artigo 10.º do [Decreto-Lei n.º 7/2004](https://dgsl.pt/legislacao/decreto-lei_7-2004/artigo/10)
- Preços com IVA: [Decreto-Lei n.º 138/90](https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/1990-137618153)
