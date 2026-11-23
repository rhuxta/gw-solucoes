export const company = {
  name: "OW Soluções",
  address: "Travessa do Farol 8, 2750-321 Cascais",
  hours: "Segunda a sexta, 9h–18h",
  email: "geral@ow-solucoes.example",
  tel: "+351 210 000 000",
  telHref: "tel:+351210000000",
  nif: "500 000 000",
  maps: "https://www.google.com/maps/search/?api=1&query=Cascais%2C+Portugal"
};
// cat: parede | tecto | exterior | ventilacao | controlo | acessorios
export const products = [
  { ref: "UI-25", slug: "produto.html", name: "Unidade de parede", short: "UI-25", cat: "parede", ctx: "residencial", fn: "climatizacao", rooms: ["sala"], price: 449, stock: "Em stock",
    desc: "Para a sala. Silenciosa, discreta, com comando.", lede: "A peça que mais instalamos numa sala. Fica alta na parede, deixa o chão livre e quase não se ouve.",
    insitu: "insitu-parede", key: [["19", "dB(A)", "Nível sonoro no modo noite"], ["A+++", "", "Classe energética em arrefecimento"], ["2,5", "kW", "Potência nominal"]],
    power: ["2,5 kW", "3,5 kW", "5,0 kW"],
    specs: [["Potência de arrefecimento", "2,5 kW"], ["Potência de aquecimento", "3,2 kW"], ["Nível sonoro (noite)", "19 dB(A)"], ["Classe energética", "A+++ / A++"], ["SEER / SCOP", "8,5 / 4,6"], ["Área recomendada", "até 25 m²"], ["Medidas (L × A × P)", "790 × 275 × 200 mm"], ["Peso", "8,6 kg"], ["Refrigerante", "R32"], ["Filtro", "Lavável, com troca anual"], ["Ligação", "Wi-Fi e comando"], ["Alimentação", "230 V · 50 Hz"], ["Unidade exterior", "UE-50 (compatível)"], ["Garantia", "3 anos, peças e mão de obra"]] },
  { ref: "UI-12", slug: "produto-ui-12.html", name: "Unidade de parede compacta", short: "UI-12", cat: "parede", ctx: "residencial", fn: "climatizacao", rooms: ["quarto", "escritorio"], price: 329, stock: "Em stock",
    desc: "Para quartos e escritórios pequenos.", lede: "A mesma lógica da UI-25, em formato curto, para divisões até 15 m².",
    insitu: "sit-frio", key: [["18", "dB(A)", "Nível sonoro no modo noite"], ["A++", "", "Classe energética"], ["1,2", "kW", "Potência nominal"]],
    power: ["1,2 kW", "2,0 kW"],
    specs: [["Potência de arrefecimento", "1,2 kW"], ["Nível sonoro (noite)", "18 dB(A)"], ["Classe energética", "A++"], ["Área recomendada", "até 15 m²"], ["Medidas (L × A × P)", "680 × 250 × 180 mm"], ["Peso", "7,1 kg"], ["Garantia", "3 anos"]] },
  { ref: "TC-35", slug: "produto-tc-35.html", name: "Unidade de tecto", short: "TC-35", cat: "tecto", ctx: "residencial", fn: "climatizacao", rooms: ["quarto", "escritorio"], price: 689, stock: "Em stock",
    desc: "Distribui o conforto sem ocupar a parede.", lede: "Fica no tecto, fora da vista principal. Boa para divisões com paredes ocupadas.",
    insitu: "sit-parado", key: [["22", "dB(A)", "Nível sonoro"], ["A++", "", "Classe energética"], ["3,5", "kW", "Potência nominal"]],
    power: ["3,5 kW", "5,0 kW"],
    specs: [["Potência", "3,5 kW"], ["Nível sonoro", "22 dB(A)"], ["Medidas (L × A × P)", "900 × 180 × 650 mm"], ["Peso", "18 kg"], ["Garantia", "3 anos"]] },
  { ref: "CS-60", slug: "produto-cs-60.html", name: "Cassete de tecto", short: "CS-60", cat: "tecto", ctx: "comercial", fn: "climatizacao", rooms: ["escritorio"], price: null, stock: "Sob orçamento",
    desc: "Quatro vias, para escritórios e lojas.", lede: "Uma cassete de quatro vias para espaços de atendimento. Dimensionamos na visita.",
    insitu: "oficio", key: [["26", "dB(A)", "Nível sonoro"], ["4", "vias", "Distribuição"], ["5,0", "kW", "Potência nominal"]],
    power: ["5,0 kW", "7,1 kW"],
    specs: [["Potência", "5,0 kW"], ["Nível sonoro", "26 dB(A)"], ["Painel", "840 × 840 mm"], ["Garantia", "3 anos"]] },
  { ref: "UE-50", slug: "produto-ue-50.html", name: "Unidade exterior", short: "UE-50", cat: "exterior", ctx: "residencial", fn: "climatizacao", rooms: ["sala", "quarto"], price: 920, stock: "Em stock",
    desc: "Par da unidade interior, em terraço ou fachada.", lede: "Instala-se no exterior. A visita confirma o sítio, o suporte e a passagem de tubos.",
    insitu: "insitu-exterior", key: [["48", "dB(A)", "Nível sonoro a 1 m"], ["2", "divisões", "Liga até duas interiores"], ["5,0", "kW", "Potência"]],
    power: ["5,0 kW", "7,0 kW"],
    specs: [["Potência", "5,0 kW"], ["Nível sonoro", "48 dB(A)"], ["Medidas (L × A × P)", "800 × 550 × 320 mm"], ["Peso", "34 kg"], ["Garantia", "3 anos"]] },
  { ref: "MC-80", slug: "produto-mc-80.html", name: "Unidade mural comercial", short: "MC-80", cat: "parede", ctx: "comercial", fn: "climatizacao", rooms: ["escritorio"], price: null, stock: "Sob orçamento",
    desc: "Para salas de reunião e lojas.", lede: "Mais potência, para espaços com ocupação irregular.",
    insitu: "insitu-parede", key: [["28", "dB(A)", "Nível sonoro"], ["A++", "", "Classe energética"], ["7,1", "kW", "Potência"]],
    power: ["7,1 kW"],
    specs: [["Potência", "7,1 kW"], ["Nível sonoro", "28 dB(A)"], ["Medidas (L × A × P)", "1080 × 340 × 250 mm"], ["Garantia", "3 anos"]] },
  { ref: "VX-01", slug: "produto-vx-01.html", name: "Caixa de ventilação", short: "VX-01", cat: "ventilacao", ctx: "residencial", fn: "ventilacao", rooms: ["banho", "escritorio"], price: 275, stock: "Em stock",
    desc: "Renova o ambiente sem abrir a janela.", lede: "Uma caixa compacta na parede exterior, com filtro substituível e modo noite.",
    insitu: "sit-humidade", key: [["16", "dB(A)", "Nível sonoro"], ["60", "m³/h", "Caudal"], ["3", "W", "Consumo médio"]],
    power: ["60 m³/h", "90 m³/h"],
    specs: [["Caudal", "60 m³/h"], ["Nível sonoro", "16 dB(A)"], ["Medidas", "240 × 240 × 90 mm"], ["Garantia", "3 anos"]] },
  { ref: "VT-20", slug: "produto-vt-20.html", name: "Grelha de ventilação", short: "VT-20", cat: "ventilacao", ctx: "residencial", fn: "ventilacao", rooms: ["banho"], price: 49, stock: "Em stock",
    desc: "Acabamento de parede, com lâminas reguláveis.", lede: "A peça visível de um sistema de ventilação já previsto.",
    insitu: "sit-humidade", key: [["200", "mm", "Lado"], ["9", "lâminas", "Reguláveis"], ["0", "W", "Sem consumo"]],
    power: ["200 mm"],
    specs: [["Material", "Aço pintado"], ["Medidas", "200 × 200 mm"], ["Acabamento", "Branco mate"], ["Garantia", "2 anos"]] },
  { ref: "TH-02", slug: "produto-th-02.html", name: "Termóstato", short: "TH-02", cat: "controlo", ctx: "residencial", fn: "controlo", rooms: ["sala", "quarto"], price: 89, stock: "Em stock",
    desc: "Leitura clara, programação simples.", lede: "Fica à mão, na parede, com uma leitura que se percebe de longe.",
    insitu: "sit-quente", key: [["0,5", "°C", "Precisão"], ["2", "anos", "De bateria"], ["86", "mm", "Lado"]],
    power: ["Branco"],
    specs: [["Alimentação", "Bateria"], ["Ligação", "Sem fios"], ["Medidas", "86 × 86 × 18 mm"], ["Garantia", "2 anos"]] },
  { ref: "FL-04", slug: "produto-fl-04.html", name: "Filtro de substituição", short: "FL-04", cat: "acessorios", ctx: "residencial", fn: "manutencao", rooms: ["sala"], price: 24, stock: "Em stock",
    desc: "Par de filtros para a UI-25.", lede: "Uma troca simples, uma vez por ano. Fica registada na tua conta.",
    insitu: "manutencao", key: [["2", "un.", "Por embalagem"], ["12", "meses", "De uso"], ["UI-25", "", "Compatível"]],
    power: ["Par"],
    specs: [["Compatível", "UI-25"], ["Tipo", "Lavável"], ["Embalagem", "2 unidades"], ["Garantia", "6 meses"]] }
];
export const cats = [["tudo", "Tudo"], ["parede", "Parede"], ["tecto", "Tecto"], ["exterior", "Exterior"], ["ventilacao", "Ventilação"], ["controlo", "Controlo"], ["acessorios", "Acessórios"]];
export const roomNames = { sala: "Sala", quarto: "Quarto", escritorio: "Escritório", banho: "Casa de banho" };
export const problems = [
  { id: "quente", label: "A divisão aquece demasiado", state: "red", img: "sit-quente", room: "sala" },
  { id: "frio", label: "Sinto frio ao fim do dia", state: "blue-50", img: "sit-frio", room: "quarto" },
  { id: "parado", label: "O ar parece parado", state: "grey-50", img: "sit-parado", room: "escritorio" },
  { id: "humidade", label: "Os vidros ficam embaciados", state: "yellow", img: "sit-humidade", room: "banho" }
];
export const answers = {
  quente: { sala: "A sala aquece com o sol da tarde. Uma unidade de parede, bem colocada, segura a temperatura sem se ouvir.", quarto: "O quarto aquece demais à noite. Uma unidade compacta devolve o descanso.", escritorio: "O escritório sobreaquece durante o dia. Uma unidade de tecto resolve sem ocupar a secretária.", banho: "A casa de banho fica quente e abafada. Ventilação pontual e temperatura estável chegam." },
  frio: { sala: "A sala arrefece junto à janela. Uma unidade de parede com a potência certa aquece a zona de estar.", quarto: "O quarto arrefece ao fim do dia. Uma unidade compacta de parede aquece sem ruído.", escritorio: "O escritório está frio de manhã. Uma unidade compacta chega para o horário de trabalho.", banho: "A casa de banho arrefece depressa. Uma caixa de ventilação com recuperação mantém o calor." },
  parado: { sala: "A sala fica abafada. Uma caixa de ventilação renova o ambiente sem abrir a janela.", quarto: "O quarto amanhece abafado. Ventilação silenciosa, pensada para a noite.", escritorio: "O escritório fica pesado ao fim de umas horas. Uma caixa de ventilação junto à parede exterior resolve.", banho: "A casa de banho não seca. Uma ventilação pontual tira o vapor." },
  humidade: { sala: "Os vidros da sala embaciam. Temperatura estável e ventilação, sem aparelhos a mais.", quarto: "O vidro do quarto embacia de manhã. Ventilação e temperatura estável resolvem.", escritorio: "O escritório embacia junto à janela. Um ponto de ventilação basta na maior parte dos casos.", banho: "O espelho e o vidro embaciam. Uma caixa de ventilação com higróstato resolve." }
};
export const recs = { quente: { sala: "UI-25", quarto: "UI-12", escritorio: "TC-35", banho: "VX-01" }, frio: { sala: "UI-25", quarto: "UI-12", escritorio: "UI-12", banho: "VX-01" }, parado: { sala: "VX-01", quarto: "VX-01", escritorio: "VX-01", banho: "VX-01" }, humidade: { sala: "VX-01", quarto: "VX-01", escritorio: "VX-01", banho: "VX-01" } };
export const comfort = {
  quente: { before: ["31", "42", "—"], after: ["24", "19", "0,8"] },
  frio: { before: ["15", "38", "—"], after: ["21", "19", "0,9"] },
  parado: { before: ["1 400", "28", "—"], after: ["650", "16", "0,1"] },
  humidade: { before: ["78", "30", "—"], after: ["55", "16", "0,1"] }
};
export const comfortUnits = { quente: ["°C", "dB", "kWh/dia"], frio: ["°C", "dB", "kWh/dia"], parado: ["ppm CO₂", "dB", "kWh/dia"], humidade: ["% HR", "dB", "kWh/dia"] };
