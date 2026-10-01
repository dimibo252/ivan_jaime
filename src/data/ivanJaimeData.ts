export interface CareerChapter {
  id: string;
  club: string;
  period: string;
  badgeColor: string;
  jerseyNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  paragraphs: string[];
  stats: {
    games: number;
    goals: number;
    assists: number;
  };
  highlights: string[];
  coach: string;
}

export interface SeasonStat {
  season: string;
  club: string;
  league: string;
  appearances: number;
  goals: number;
  assists: number;
  minutes: number;
  trophiesOrAwards?: string;
}

export interface IconicGoal {
  id: string;
  title: string;
  date: string;
  competition: string;
  match: string;
  minute: string;
  description: string;
  tacticalNote: string;
  impact: string;
  radioCommentary: string;
  youtubeVideoId?: string;
  youtubeSearchQuery: string;
}

export interface TrophyItem {
  id: string;
  title: string;
  season: string;
  entity: string;
  category: 'team' | 'individual';
  description: string;
  badge: string;
}

export const IVAN_JAIME_BIO = {
  fullName: "Iván Jaime Pajuelo",
  birthDate: "26 de setembro de 2000",
  age: 26,
  birthPlace: "Málaga, Andaluzia, Espanha",
  nationality: "Espanhola",
  height: "1,80 m",
  weight: "74 kg",
  dominantFoot: "Direito",
  mainPosition: "Médio Ofensivo (Playmaker)",
  secondaryPositions: ["Extremo Esquerdo (Invertido)", "Segundo Avançado"],
  currentClub: "UD Las Palmas (por empréstimo do FC Porto)",
  parentClub: "FC Porto",
  jerseyNumber: 10,
  portoJerseyNumber: 17,
  contractUntil: "Junho de 2028 (FC Porto)",
  marketValuePeak: "12 Milhões de Euros",
  transferValuePorto: "10 Milhões de Euros (Famalicão -> FC Porto, agosto de 2023)",
  currentSeason: "2026/27",
};

export const CAREER_CHAPTERS: CareerChapter[] = [
  {
    id: "malaga",
    club: "Málaga CF",
    period: "2011 – 2020",
    badgeColor: "from-sky-500 to-blue-700",
    jerseyNumber: "28",
    title: "As Raízes Andaluzas e a Formação em La Rosaleda",
    subtitle: "A lapidação de um prodígio técnico em La Academia",
    summary: "Desde os 11 anos no clube da sua terra natal, Iván Jaime destacou-se pela elegância natural, controlo de bola puro e inteligência de passe nos escalões de formação.",
    paragraphs: [
      "Nascido em Málaga a 26 de setembro de 2000, Iván Jaime ingressou em 'La Academia' do Málaga CF em 2011, com apenas 11 anos de idade. No centro de treinos do clube andaluz, cedo se evidenciou a sua rara sensibilidade técnica: receção com bola colada ao pé, facilidade de mudança de ritmo e uma leitura posicional que o colocava sempre um segundo à frente dos adversários.",
      "A sua ascensão foi vertiginosa. Aos 17 anos fez a estreia pelo Atlético Malagueño (equipa B) na Segunda División B a 20 de agosto de 2018. Apenas três semanas depois, a 11 de setembro de 2018, o treinador Juan Ramón López Muñiz chamou-o para a equipa principal do Málaga CF num confronto da Copa del Rey contra a UD Almería.",
      "O talento de Iván chamou a atenção da Real Federación Española de Fútbol, valendo-lhe a internacionalização pela Seleção de Espanha Sub-19, onde se estreou em outubro de 2018 marcando um golo frente a Andorra.",
      "Apesar das dificuldades institucionais e financeiras que o Málaga CF atravessava na Segunda División, a qualidade técnica de Iván Jaime despertou o radar internacional, abrindo caminho para uma mudança estratégica para o futebol português em 2020."
    ],
    stats: {
      games: 54,
      goals: 7,
      assists: 4
    },
    highlights: [
      "Entrada em 'La Academia' em 2011 aos 11 anos",
      "Estreia oficial como sénior no Málaga CF aos 17 anos (Copa del Rey)",
      "Estreia na Segunda División frente ao SD Huesca (junho de 2020)",
      "Internacional Sub-19 por Espanha com golo de estreia"
    ],
    coach: "Juan Ramón López Muñiz / Sergio Pellicer"
  },
  {
    id: "famalicao",
    club: "FC Famalicão",
    period: "2020 – 2023",
    badgeColor: "from-blue-900 to-indigo-950",
    jerseyNumber: "10",
    title: "A Explosão em Portugal: O Melhor Jovem da Liga",
    subtitle: "Consagração total no futebol português e estatuto de estrela",
    summary: "No Estádio Municipal de Famalicão, Iván Jaime adaptou-se à intensidade lusa e viveu em 2022/23 a sua temporada de ouro, coroada com 11 golos e o troféu oficial de Melhor Jogador Jovem da Liga Portugal.",
    paragraphs: [
      "A 23 de setembro de 2020, o FC Famalicão oficializou a contratação de Iván Jaime com um contrato válido por cinco épocas. O projeto famalicense, reconhecido pelo olhar refinado para jovens talentos, proporcionou ao malaguenho o palco ideal para se consolidar ao mais alto nível europeu.",
      "Na sua primeira temporada (2020/21), participou em 24 jogos da Liga e apontou 4 golos, ajudando o clube a garantir uma confortável permanência. Já na época 2021/22, sofreu um duro golpe com uma lesão ligamentar no joelho que o afastou vários meses. A recuperação foi um testemunho da sua força mental: voltou mais forte, fisicamente mais resiliente e com uma fome insaciável de bola.",
      "A época 2022/23 foi a obra-prima de Iván Jaime no Minho. Sob o comando de João Pedro Sousa, atuando com total liberdade a partir da meia-esquerda e do corredor central, Iván rubricou 11 golos e 5 assistências em 33 jogos em todas as competições. Na Taça de Portugal guiou o Famalicão às meias-finais, marcando inclusive um golo de antologia no Estádio do Dragão frente ao FC Porto.",
      "No final da temporada, os capitães e treinadores da Liga Portugal não tiveram dúvidas: Iván Jaime foi eleito o Melhor Jogador Jovem da Liga Portugal 2022/23 e integrado no Onze do Ano da prova, tornando-se o alvo número um dos gigantes do campeonato."
    ],
    stats: {
      games: 82,
      goals: 17,
      assists: 11
    },
    highlights: [
      "Eleito Melhor Jogador Jovem da Liga Portugal 2022/23",
      "Nomeado para o Onze do Ano da Liga Portugal",
      "11 golos e 5 assistências na época 2022/23",
      "Meias-finais da Taça de Portugal com golo magistral no Dragão"
    ],
    coach: "João Pedro Sousa / Rui Pedro Silva / Silas"
  },
  {
    id: "porto",
    club: "FC Porto",
    period: "2023 – 2025",
    badgeColor: "from-blue-600 to-blue-900",
    jerseyNumber: "17",
    title: "O Manto dos Dragões e a Glória Eterna na Supertaça",
    subtitle: "A transferência milionária, os títulos e o lendário golo aos 101 minutos",
    summary: "Contratado no fecho do mercado de 2023 por cerca de 10M€, Iván Jaime abraçou a mística portista. Conquistou a Taça de Portugal 2023/24 e tornou-se imortal na Supertaça 2024 ao decidir a final épica frente ao Sporting aos 101'.",
    paragraphs: [
      "Depois de semanas de negociações intensas e grande expectativa mediática, a 31 de agosto de 2023 o FC Porto anunciou a contratação de Iván Jaime por cerca de 10 milhões de euros, assinando até 2028 e herdando a histórica camisola 17. O espanhol cumpria o desejo público de representar um dos clubes mais titulados da Europa.",
      "A estreia com a camisola azul e branca aconteceu logo a 3 de setembro frente ao Arouca. Na jornada seguinte, a 15 de setembro, estreou-se a titular e marcou o golo solitário da vitória por 1-0 na Reboleira frente ao Estrela da Amadora, caindo logo nas graças dos adeptos. Dias depois, viveu a estreia de sonho na UEFA Champions League contra o Shakhtar Donetsk em Hamburgo.",
      "Apesar de uma primeira época de exigência máxima, Iván Jaime sagrou-se campeão da Taça de Portugal 2023/24 no Jamor. Mas o capítulo mais dourado estava reservado para o início da época 2024/25, sob o comando de Vítor Bruno.",
      "A 3 de agosto de 2024, no Estádio Municipal de Aveiro, disputava-se a Supertaça Cândido de Oliveira entre o Sporting CP e o FC Porto. A perder por 0-3 aos 24 minutos, os Dragões protagonizaram uma recuperação titânica para 3-3. No prolongamento, aos 101 minutos, Iván Jaime recebeu na meia-lua, enquadrou-se e soltou um remate venenoso de pé direito que decretou o 4-3 final!",
      "Uma das maiores reviravoltas da história do clássico ficou eternizada com o seu nome, prosseguindo a época com golos na Liga portuguesa frente ao Gil Vicente e Rio Ave."
    ],
    stats: {
      games: 46,
      goals: 8,
      assists: 5
    },
    highlights: [
      "Golo da vitória aos 101' na mítica Supertaça 2024 (FC Porto 4-3 Sporting CP)",
      "Conquista da Supertaça Cândido de Oliveira 2024",
      "Vencedor da Taça de Portugal 2023/24",
      "Estreia na UEFA Champions League frente ao Shakhtar Donetsk",
      "Golo da vitória na estreia a titular vs Estrela da Amadora"
    ],
    coach: "Sérgio Conceição / Vítor Bruno"
  },
  {
    id: "international-loans",
    club: "Valência · Montréal · UD Las Palmas",
    period: "2025 – 2027 (Atual)",
    badgeColor: "from-amber-600 to-yellow-500",
    jerseyNumber: "10",
    title: "A Rota Internacional: LaLiga, MLS e o Retorno a Espanha",
    subtitle: "Empréstimos estratégicos ao Valencia CF, CF Montréal e afirmação no UD Las Palmas",
    summary: "Para garantir tempo de jogo e protagonismo competitivo contínuo sob vínculo ao FC Porto, Iván Jaime somou passagens pela LaLiga no Valencia CF, uma aventura transatlântica na MLS como Designated Player e o recente regresso a Espanha no UD Las Palmas.",
    paragraphs: [
      "A 3 de fevereiro de 2025, no fecho da janela de transferências de inverno da época 2024/25, o FC Porto e o Valencia CF acordaram o empréstimo de Iván Jaime até ao final da temporada com opção de compra. No clube do Mestalla, Iván regressou ao convívio da LaLiga espanhola, somando 9 jogos no principal escalão do seu país natal.",
      "No verão de 2025, abriu-se um novo horizonte transatlântico: a 22 de agosto de 2025, rumou à América do Norte por empréstimo ao CF Montréal na Major League Soccer (MLS), assumindo o prestigiado estatuto de 'Designated Player'. Na liga norte-americana, Iván assumiu a batuta ofensiva com a camisola 10, acumulando 18 jogos, 1 golo e 3 assistências, destacando-se na criação de ocasiões de golo.",
      "Chegados à época desportiva 2026/27, a 20 de agosto de 2026, Iván Jaime regressou em definitivo a Espanha ao assinar por empréstimo de uma época com a UD Las Palmas na LaLiga. No futebol de posse e técnico praticado no Estádio Gran Canaria, Iván Jaime encaixou com naturalidade, agora com 26 anos de idade e na plena maturidade da sua carreira, mantendo contrato de longo curso com os Dragões até junho de 2028."
    ],
    stats: {
      games: 34,
      goals: 2,
      assists: 5
    },
    highlights: [
      "Regresso à LaLiga pelo Valencia CF em 2025",
      "Estatuto de Designated Player no CF Montréal (MLS)",
      "Titular e criativo de referência na UD Las Palmas (época 2026/27)",
      "Contrato de longo prazo protegido com o FC Porto até 2028"
    ],
    coach: "Rubén Baraja / Laurent Courtois / Luis Carrión"
  }
];

export const SEASON_STATS: SeasonStat[] = [
  {
    season: "2018/19",
    club: "Atlético Malagueño / Málaga",
    league: "Segunda B / Copa del Rey",
    appearances: 30,
    goals: 3,
    assists: 2,
    minutes: 1840,
    trophiesOrAwards: "Estreia sénior aos 17 anos"
  },
  {
    season: "2019/20",
    club: "Málaga CF / Malagueño",
    league: "LaLiga 2 / Tercera",
    appearances: 24,
    goals: 4,
    assists: 2,
    minutes: 1620,
    trophiesOrAwards: "Estreia na LaLiga SmartBank"
  },
  {
    season: "2020/21",
    club: "FC Famalicão",
    league: "Liga Portugal",
    appearances: 24,
    goals: 4,
    assists: 3,
    minutes: 1475,
    trophiesOrAwards: "Adaptação ao futebol português"
  },
  {
    season: "2021/22",
    club: "FC Famalicão",
    league: "Liga Portugal",
    appearances: 25,
    goals: 2,
    assists: 3,
    minutes: 1610,
    trophiesOrAwards: "Superação de lesão no joelho"
  },
  {
    season: "2022/23",
    club: "FC Famalicão",
    league: "Liga Portugal / Taça de Portugal",
    appearances: 33,
    goals: 11,
    assists: 5,
    minutes: 2490,
    trophiesOrAwards: "Melhor Jogador Jovem da Liga Portugal · Onze do Ano"
  },
  {
    season: "2023/24",
    club: "FC Porto",
    league: "Liga Portugal / Champions / Taça",
    appearances: 30,
    goals: 4,
    assists: 3,
    minutes: 1390,
    trophiesOrAwards: "Vencedor da Taça de Portugal 2023/24"
  },
  {
    season: "2024/25",
    club: "FC Porto / Valencia CF",
    league: "Liga Portugal / Supertaça / LaLiga",
    appearances: 25,
    goals: 4,
    assists: 2,
    minutes: 1420,
    trophiesOrAwards: "Vencedor Supertaça 2024 (Herói aos 101') · Empréstimo Valência"
  },
  {
    season: "2025/26",
    club: "CF Montréal (MLS)",
    league: "Major League Soccer / Leagues Cup",
    appearances: 18,
    goals: 1,
    assists: 3,
    minutes: 1180,
    trophiesOrAwards: "Designated Player na MLS"
  },
  {
    season: "2026/27",
    club: "UD Las Palmas (LaLiga)",
    league: "LaLiga EA Sports / Copa del Rey",
    appearances: 7,
    goals: 1,
    assists: 2,
    minutes: 540,
    trophiesOrAwards: "Em curso (Época 2026/27 na LaLiga)"
  }
];

export const ICONIC_GOALS: IconicGoal[] = [
  {
    id: "supercup-2024",
    title: "O Disparo da Eternidade em Aveiro",
    date: "3 de agosto de 2024",
    competition: "Supertaça Cândido de Oliveira 2024",
    match: "FC Porto 4 – 3 Sporting CP (a.p.)",
    minute: "101'",
    description: "Após uma recuperação histórica de 0-3 para 3-3, o jogo foi a prolongamento. Aos 101 minutos, Iván Jaime dominou à entrada do terço defensivo leonino, desferiu um remate colocado com arco que sofreu um toque subtil e bateu o guarda-redes Kovacevic, desatando a loucura no banco e na bancada azul e branca.",
    tacticalNote: "Leitura do espaço vazio entre a linha de médios e os defesas; rapidez de execução com apenas dois toques.",
    impact: "Garante o 24º troféu da Supertaça ao FC Porto numa das maiores reviravoltas do clássico.",
    radioCommentary: "Atenção a Iván Jaime! Domina na meia-lua... olha a baliza, arma o pé direito... VAI DISPARAR... É UM TIROOOO! GOLOOOOOOOOOOOOOOOOOO! GOLOOOOOOOOOO DO PORTO! É DE IVÁN JAIME! AO MINUTO CENTO E UM EM AVEIRO! QUE LOUCURA! QUE PINTURA DO MAESTRO MALAGUENHO! DE ZERO TRÊS PARA QUATRO TRÊS! O FC PORTO OPERA O MILAGRE NA SUPERTAÇA!",
    youtubeVideoId: "s_pY8i_xX8Y",
    youtubeSearchQuery: "golo ivan jaime supertaca sporting porto 101 relato"
  },
  {
    id: "dragao-2023",
    title: "A Pintura Silenciosa no Estádio do Dragão",
    date: "4 de maio de 2023",
    competition: "Taça de Portugal (Meia-Final, 2ª Mão)",
    match: "FC Porto 3 – 2 FC Famalicão (a.p.)",
    minute: "75'",
    description: "Vestindo a camisola do Famalicão, Iván Jaime conduziu da esquerda para o meio, deixou defesas portistas pelo caminho e fuzilou as redes com um remate de trivela/peito do pé indefensável ao ângulo superior, gelando o Dragão e forçando o prolongamento numa das meias-finais mais vibrantes da história da Taça.",
    tacticalNote: "Drible de desaceleração seguido de arrancada explosiva para o pé dominante.",
    impact: "Momento decisivo que convenceu a estrutura e os adeptos portistas a exigirem a sua contratação.",
    radioCommentary: "Lá vai Iván Jaime com a bola colada à bota esquerda... puxa para dentro, tirou o primeiro da frente, tirou o segundo... REMATOU EM ARCO! MAS O QUE É ISTO?! GOLOOOOOOOOOOOO! UM GOLAÇO MONUMENTAL NO ESTÁDIO DO DRAGÃO! IVÁN JAIME GELOU AS BANCADAS AZUIS E BRANCAS! QUE OBRA DE ARTE DO RAPAZ DE MÁLAGA!",
    youtubeSearchQuery: "golo ivan jaime famalicao porto dragao taca relato"
  },
  {
    id: "estrela-2023",
    title: "A Estreia a Titular com Golo Decisivo",
    date: "15 de setembro de 2023",
    competition: "Liga Portugal (Jornada 5)",
    match: "Estrela da Amadora 0 – 1 FC Porto",
    minute: "29'",
    description: "Na sua primeira titularidade oficial pelo FC Porto, na Reboleira, Iván Jaime mostrou faro de golo: aproveitou um ressalto na grande área, controlou no peito com classe e finalizou com frieza milimétrica por baixo do guarda-redes.",
    tacticalNote: "Inteligência espacial para atacar a sobra e finalização a um toque.",
    impact: "Conquistou os 3 pontos fora de casa e consolidou a sua integração imediata no onze.",
    radioCommentary: "Bola dividida na área tricolor, sobrou para Iván Jaime... Amortece no peito, atirou rasteiro... ENTROUUUU! GOLOOOOOO! O PRIMEIRO DE DRAGÃO AO PEITO! É DELE, IVÁN JAIME! ESTREIA A TITULAR E GOLO DA VITÓRIA NA REBOLEIRA! OS TRÊS PONTOS VÃO DIREITOS PARA A CIDADE INVICTA!",
    youtubeSearchQuery: "golo ivan jaime estrela amadora porto"
  },
  {
    id: "rio-ave-2024",
    title: "A Acrobacia Técnica no Dragão",
    date: "24 de agosto de 2024",
    competition: "Liga Portugal 2024/25 (Jornada 3)",
    match: "FC Porto 2 – 0 Rio Ave",
    minute: "1'",
    description: "Mal soou o apito inicial, Iván Jaime assinou uma verdadeira obra de arte antes do primeiro minuto de jogo: cruzamento da direita e remate em semivoleio acrobático de primeira, com o pé direito a colocar a bola na gaveta da baliza vilacondense.",
    tacticalNote: "Coordenação motora e tempo de salto perfeito para acertar na bola no ponto mais alto da trajetória.",
    impact: "O golo mais rápido da jornada e candidato a melhor golo do mês da Liga.",
    radioCommentary: "Ainda os adeptos se sentavam nas bancadas... Cruzamento tenso da direita, salta Iván Jaime no ar... DE PRIMEIRA, QUE VOLEIO! GOLOOOOOOOOOO! INACREDITÁVEL! AOS CINQUENTA SEGUNDOS DE JOGO! IVÁN JAIME ASSINA UMA PINTURA ACROBÁTICA NO DRAGÃO! O ESTÁDIO VEM ABAIXO COM TANTA TÉCNICA!",
    youtubeSearchQuery: "golo ivan jaime porto rio ave 2024"
  },
  {
    id: "gil-vicente-2024",
    title: "A Friagem da Meia-Lua no Início do Campeonato",
    date: "10 de agosto de 2024",
    competition: "Liga Portugal 2024/25 (Jornada 1)",
    match: "FC Porto 3 – 0 Gil Vicente",
    minute: "59'",
    description: "Após a glória da Supertaça, Iván Jaime confirmou o estado de graça na abertura da Liga: combinou no corredor central, recebeu o passe em profundidade curta e atirou colocado ao poste mais distante sem hipóteses para Andrew.",
    tacticalNote: "Passe e desmarque em movimento perpétuo contra bloco baixo.",
    impact: "Consolidou a arrancada fulgurante do FC Porto de Vítor Bruno na Liga.",
    radioCommentary: "Tabela curta no corredor central, Iván Jaime recebe com espaço, armou o míssil teleguiado... BATEU NO FUNDO DAS REDES! GOLOOOOOOOOO! MAIS UM PARA A CONTA PESSOAL DE IVÁN JAIME! O MAESTRO ESTÁ EM ESTADO DE GRAÇA TOTAL NESTE ARRANQUE DE CAMPEONATO!",
    youtubeSearchQuery: "golo ivan jaime porto gil vicente 2024"
  }
];

export const TROPHIES: TrophyItem[] = [
  {
    id: "supertaca-2024",
    title: "Supertaça Cândido de Oliveira",
    season: "2024",
    entity: "FC Porto",
    category: "team",
    description: "Herói absoluto da final em Aveiro com o golo da vitória por 4-3 aos 101' contra o Sporting CP, após reviravolta de 0-3.",
    badge: "🏆"
  },
  {
    id: "taca-portugal-2024",
    title: "Taça de Portugal Placard",
    season: "2023/24",
    entity: "FC Porto",
    category: "team",
    description: "Campeão da Taça de Portugal no Estádio Nacional do Jamor, batendo o Sporting CP por 2-1 no prolongamento.",
    badge: "🏆"
  },
  {
    id: "melhor-jovem-2023",
    title: "Melhor Jogador Jovem da Liga Portugal",
    season: "2022/23",
    entity: "Liga Portugal Awards",
    category: "individual",
    description: "Eleito pelos treinadores e capitães da Primeira Liga como o jovem sub-23 mais influente e talentoso do futebol português.",
    badge: "⭐"
  },
  {
    id: "onze-ano-2023",
    title: "Onze do Ano da Liga Portugal",
    season: "2022/23",
    entity: "Liga Portugal Awards",
    category: "individual",
    description: "Único jogador fora dos 'três grandes' (Benfica, Porto, Sporting) e Braga a integrar o prestigiado Onze Ideal da temporada.",
    badge: "🎖️"
  },
  {
    id: "jogador-mes-2023",
    title: "Jogador do Mês da Liga Portugal",
    season: "Abril de 2023",
    entity: "Liga Portugal",
    category: "individual",
    description: "Distinção atribuída após uma sequência notável de 4 golos e 2 assistências no mês com a camisola do Famalicão.",
    badge: "🏅"
  },
  {
    id: "selecao-sub19",
    title: "Internacionalização Espanha Sub-19",
    season: "2018",
    entity: "RFEF - Seleção de Espanha",
    category: "individual",
    description: "Chamado por Santi Denia para a seleção nacional espanhola de sub-19, marcando golo logo na estreia oficial.",
    badge: "🇪🇸"
  }
];

export const TACTICAL_RADAR_DATA = [
  { attribute: "Controlo Orientado & 1º Toque", score: 94, max: 100, note: "Receção de costas a rodar num só tempo, eliminando pressão" },
  { attribute: "Remate de Meia Distância", score: 92, max: 100, note: "Especialista em arco e remates colocados à entrada da área" },
  { attribute: "Drible Curto em Espaços Fechados", score: 89, max: 100, note: "Fintas de corpo e proteção de bola de raiz andaluza" },
  { attribute: "Visão Periférica & Último Passe", score: 88, max: 100, note: "Capacidade de desmarcar avançados em rutura interior" },
  { attribute: "Condução & Aceleração", score: 86, max: 100, note: "Cabeça levantada durante a transição com passada larga" },
  { attribute: "Cobrança de Bolas Paradas", score: 83, max: 100, note: "Cruzamento tenso e livres diretos à meia distância" },
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Em que clube espanhol fez Iván Jaime toda a sua formação dos 11 aos 20 anos?",
    options: ["Sevilla FC", "Málaga CF", "Real Betis", "Villarreal CF"],
    correctIndex: 1,
    explanation: "Iván Jaime nasceu em Málaga e ingressou em 'La Academia' do Málaga CF em 2011, passando por todos os escalões até à equipa principal."
  },
  {
    id: 2,
    question: "Qual foi o prémio individual oficial atribuído a Iván Jaime na época 2022/23 pela Liga Portugal?",
    options: [
      "Melhor Marcador da Liga",
      "Melhor Jogador Jovem da Liga Portugal",
      "Guarda-Redes do Ano",
      "Prémio Fair Play"
    ],
    correctIndex: 1,
    explanation: "Graças aos 11 golos e exibições estratosféricas pelo Famalicão, foi votado pelos treinadores e capitães como o Melhor Jogador Jovem da Liga 2022/23."
  },
  {
    id: 3,
    question: "Em que minuto do prolongamento da Supertaça 2024 marcou Iván Jaime o lendário 4-3 frente ao Sporting CP?",
    options: ["94 minutos", "101 minutos", "118 minutos", "120+2 minutos"],
    correctIndex: 1,
    explanation: "Aos 101 minutos da 1ª parte do prolongamento, Iván Jaime disparou de fora da área para selar o histórico 4-3 após estar a perder por 0-3!"
  },
  {
    id: 4,
    question: "Qual o número da camisola que Iván Jaime envergou no FC Porto e com que decidiu a Supertaça?",
    options: ["Número 10", "Número 7", "Número 17", "Número 21"],
    correctIndex: 2,
    explanation: "Iván Jaime escolheu o número 17 no FC Porto, com o qual marcou o golo histórico da Supertaça 2024."
  },
  {
    id: 5,
    question: "Em que clube da LaLiga está Iván Jaime a atuar na época 2026/27, por empréstimo do FC Porto?",
    options: ["UD Las Palmas", "Getafe CF", "Celta de Vigo", "Rayo Vallecano"],
    correctIndex: 0,
    explanation: "A 20 de agosto de 2026, Iván Jaime foi cedido por empréstimo de uma época à UD Las Palmas na LaLiga espanhola, mantendo contrato com o FC Porto até 2028."
  }
];
