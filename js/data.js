window.GW = window.GW || {};
GW.company = {
  name: "GW Soluções",
  tag: "O ar certo, em cada divisão.",
  address: "Travessa do Farol 8, 2750-321 Cascais",
  hours: "Segunda a sexta, 9h–18h",
  email: "geral@gw-solucoes.example",
  tel: "+351 210 000 000",
  telHref: "tel:+351210000000",
  nif: "000 000 000"
};
GW.products = [
  { ref: "UI-25", name: "Unidade de parede", desc: "Para uma divisão de estar. Inclui comando.", price: 449, ctx: "residencial", fn: "arrefecimento", typ: "parede", lede: "A peça mais habitual numa sala. Fica na parede, à altura certa, e deixa o chão livre.", specs: [["Potência", "2,5 kW (exemplo)"], ["Nível sonoro", "19 dB(A) (exemplo)"], ["Medida", "790 × 275 × 200 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "UI-12", name: "Unidade de parede compacta", desc: "Para um quarto ou um escritório pequeno.", price: 329, ctx: "residencial", fn: "arrefecimento", typ: "parede", lede: "A mesma lógica da unidade de parede, em formato curto.", specs: [["Potência", "1,2 kW (exemplo)"], ["Nível sonoro", "18 dB(A) (exemplo)"], ["Medida", "680 × 250 × 180 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "TC-35", name: "Unidade de tecto", desc: "Distribui o conforto sem ocupar a parede.", price: 689, ctx: "residencial", fn: "arrefecimento", typ: "tecto", lede: "Fica no tecto, fora da vista principal da divisão.", specs: [["Potência", "3,5 kW (exemplo)"], ["Nível sonoro", "22 dB(A) (exemplo)"], ["Medida", "900 × 180 × 650 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "CS-60", name: "Cassete de tecto", desc: "Para um escritório ou uma loja de pé-direito comum.", price: 1180, ctx: "comercial", fn: "arrefecimento", typ: "tecto", lede: "Uma cassete de quatro vias, para espaços de atendimento.", specs: [["Potência", "5,0 kW (exemplo)"], ["Nível sonoro", "26 dB(A) (exemplo)"], ["Medida", "840 × 840 × 240 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "UE-50", name: "Unidade exterior", desc: "Par da unidade interior, em terraço ou fachada.", price: 920, ctx: "residencial", fn: "aquecimento", typ: "exterior", lede: "Instala-se no exterior. A visita confirma o sítio e o suporte.", specs: [["Potência", "5,0 kW (exemplo)"], ["Nível sonoro", "48 dB(A) (exemplo)"], ["Medida", "800 × 550 × 320 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "MC-80", name: "Unidade mural comercial", desc: "Para espaços de atendimento.", price: 1450, ctx: "comercial", fn: "arrefecimento", typ: "parede", lede: "Caudal maior, para salas e lojas com ocupação irregular.", specs: [["Potência", "7,1 kW (exemplo)"], ["Nível sonoro", "28 dB(A) (exemplo)"], ["Medida", "1080 × 340 × 250 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "VX-01", name: "Caixa de ventilação", desc: "Renova o ambiente sem abrir a janela.", price: 275, ctx: "residencial", fn: "ventilacao", typ: "parede", lede: "Uma caixa compacta na parede exterior, com filtro substituível.", specs: [["Caudal", "60 m³/h (exemplo)"], ["Nível sonoro", "16 dB(A) (exemplo)"], ["Medida", "240 × 240 × 90 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "VT-20", name: "Grelha de ventilação", desc: "Acabamento de parede, com regulação simples.", price: 49, ctx: "residencial", fn: "ventilacao", typ: "parede", lede: "A peça visível de um sistema de ventilação já previsto.", specs: [["Material", "Aço pintado (exemplo)"], ["Medida", "200 × 200 mm (exemplo)"], ["Acabamento", "Branco (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "TH-02", name: "Termóstato", desc: "Leitura clara, programação simples.", price: 89, ctx: "residencial", fn: "acessorio", typ: "acessorio", lede: "Fica à mão, na parede, com uma leitura que se percebe de longe.", specs: [["Alimentação", "Bateria (exemplo)"], ["Ligação", "Sem fios (exemplo)"], ["Medida", "86 × 86 × 18 mm (exemplo)"], ["Garantia", "2 anos (exemplo)"]] },
  { ref: "FL-04", name: "Filtro de substituição", desc: "Para a unidade de parede UI-25.", price: 24, ctx: "residencial", fn: "acessorio", typ: "acessorio", lede: "Uma troca simples, marcada na conta quando existir manutenção.", specs: [["Compatível", "UI-25 (exemplo)"], ["Tipo", "Filtro lavável (exemplo)"], ["Pacote", "2 unidades (exemplo)"], ["Garantia", "6 meses (exemplo)"]] }
];
GW.product = function (ref) {
  return GW.products.find(function (p) { return p.ref === ref; }) || GW.products[0];
};
GW.price = function (n) {
  return n.toLocaleString("pt-PT") + " €";
};
GW.answers = {
  quente: {
    sala: "A sala aquece demasiado. Uma unidade de parede, bem colocada, equilibra a temperatura na zona de estar.",
    quarto: "O quarto aquece demais. Uma unidade de parede compacta devolve o conforto à zona de descanso.",
    escritorio: "O escritório sobreaquece durante o dia. Uma unidade de parede, ou uma cassete de tecto, resolve sem ocupar a secretária.",
    banho: "A casa de banho fica demasiado quente depois do banho. Ventilação pontual e uma temperatura estável chegam."
  },
  frio: {
    sala: "A sala sente-se fria junto ao chão e à janela. Uma unidade de parede, com a potência certa, aquece a zona de estar.",
    quarto: "O chão do quarto fica frio. Uma unidade de parede, ou de tecto, devolve o conforto sem ocupar o descanso.",
    escritorio: "O escritório esfria de manhã. Uma unidade compacta de parede chega para o tempo de trabalho.",
    banho: "O piso da casa de banho esfria. Uma unidade pequena, combinada com uma visita técnica, evita o desconforto."
  },
  parado: {
    sala: "A sala sente-se abafada. Uma caixa de ventilação renova o ambiente sem abrir a janela.",
    quarto: "O quarto amanhece abafado. Uma ventilação silenciosa, pensada para a noite.",
    escritorio: "O escritório sente-se parado ao fim de umas horas. Uma caixa de ventilação junto à parede exterior resolve.",
    banho: "O ar da casa de banho estagna. Uma ventilação pontual tira o vapor e o desconforto."
  },
  humidade: {
    sala: "Os vidros da sala embaciam. A solução junta uma temperatura estável e ventilação, sem aparelhos a mais.",
    quarto: "O vidro do quarto embacia de manhã. Ventilação e uma temperatura estável resolvem, com uma visita se for preciso.",
    escritorio: "O escritório embacia junto à janela. Uma unidade compacta e um ponto de ventilação bastam na maior parte dos casos.",
    banho: "O vidro da casa de banho embacia. Ventilação pontual e uma temperatura estável resolvem o problema."
  }
};
GW.recs = {
  quente: { ref: "UI-25", typ: "parede" },
  frio: { ref: "TC-35", typ: "tecto" },
  parado: { ref: "VX-01", typ: "parede" },
  humidade: { ref: "VX-01", typ: "parede" }
};
GW.defaultRoom = { quente: "sala", frio: "quarto", parado: "escritorio", humidade: "banho" };
GW.roomNames = { sala: "sala", quarto: "quarto", escritorio: "escritório", banho: "casa de banho" };
GW.comfort = {
  quente: { before: { t: "31 °C", n: "42 dB", c: "—" }, after: { t: "24 °C", n: "19 dB", c: "0,8 kWh" } },
  frio: { before: { t: "14 °C", n: "38 dB", c: "—" }, after: { t: "21 °C", n: "19 dB", c: "0,9 kWh" } },
  parado: { before: { t: "23 °C", n: "28 dB", c: "—" }, after: { t: "22 °C", n: "16 dB", c: "0,2 kWh" } },
  humidade: { before: { t: "20 °C", n: "30 dB", c: "—" }, after: { t: "22 °C", n: "16 dB", c: "0,3 kWh" } }
};
