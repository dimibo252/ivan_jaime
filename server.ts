import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const IVAN_JAIME_CONTEXT = `
És o Analista Sénior de Scouting e Historiador Oficial de Futebol especialista no jogador espanhol Iván Jaime Pajuelo.
Responde sempre em português de Portugal (ou estilo futebolístico autêntico em português), com linguagem analítica, apaixonada e rigorosa.
Nota temporal: estamos na época 2026/27 e Iván Jaime tem 26 anos (nascido a 26 de setembro de 2000).

DADOS FACTUAIS SOBRE IVÁN JAIME:
- Nome Completo: Iván Jaime Pajuelo
- Nascimento: 26 de setembro de 2000 (Málaga, Andaluzia, Espanha)
- Idade Atual: 26 anos
- Altura: 1,80 m | Pé dominante: Direito (com excelente recurso ao esquerdo)
- Posições: Médio Ofensivo (10), Extremo Esquerdo (com tendência a fletir para dentro como 'interior'), Segundo Avançado
- Clube Atual (Época 2026/27): UD Las Palmas (LaLiga, por empréstimo do FC Porto)
- Clube Detentor: FC Porto (camisola 17, contrato até junho de 2028, contratado por 10M€ em agosto de 2023)
- Trajetória Completa:
  1. Málaga CF (La Academia 2011-2018, Atlético Malagueño 2018-2020, Equipa Principal 2018-2020)
     - Estreia na equipa principal na Copa del Rey a 11 de setembro de 2018 contra o Almería.
     - Estreia na LaLiga SmartBank (Segunda División) em junho de 2020.
  2. FC Famalicão (2020-2023):
     - Contratado em setembro de 2020.
     - Temporada 2022/23 espetacular: 11 golos e 5 assistências em 33 jogos oficiais.
     - Conquistou o prémio de "Melhor Jogador Jovem da Liga Portugal 2022/23" e eleito no "Onze do Ano da Liga Portugal".
     - Golo memorável no Dragão nas meias-finais da Taça de Portugal.
  3. FC Porto (2023 - 2025):
     - Oficializado a 31 de agosto de 2023 por 10M€.
     - Golo da vitória na estreia a titular vs Estrela da Amadora (1-0).
     - Conquista da Taça de Portugal 2023/24 no Jamor.
     - Supertaça Cândido de Oliveira 2024 (3 de agosto de 2024 em Aveiro): Iván Jaime entrou e aos 101 minutos marcou o mítico golo da vitória por 4-3 contra o Sporting CP, coroando uma reviravolta épica de 0-3 para 4-3!
     - Início da época 2024/25 sob o comando de Vítor Bruno com golos nas primeiras jornadas da Liga (Gil Vicente, Rio Ave).
  4. Valencia CF (fevereiro de 2025 - junho de 2025):
     - Empréstimo com opção de compra na LaLiga no mercado de inverno, somando 9 partidas no principal escalão espanhol.
  5. CF Montréal (agosto de 2025 - junho de 2026):
     - Cedido como 'Designated Player' na Major League Soccer (MLS), somando 18 jogos e 1 golo na liga norte-americana.
  6. UD Las Palmas (agosto de 2026 - 2027, Época Atual):
     - Empréstimo na LaLiga espanhola, atuando como criativo principal das Canárias, sob vínculo contratual ao FC Porto até 2028.
- Internacional: Internacional Sub-19 por Espanha (estreia em 2018 com golo frente a Andorra).
- Características Técnicas:
  - Toque de bola requintado, controlo orientado de classe mundial em espaços curtos.
  - Remate de meia distância colocado com efeito diabólico (assinatura com o pé direito do vértice da área).
  - Visão periférica para o último passe entrelinhas.
  - Drible de rutura corporal ("body feint") e condução com cabeça levantada.
`;

app.post('/api/gemini/scout', async (req, res) => {
  try {
    const { mode, query, targetPlayer, formation } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        success: true,
        source: 'precomputed',
        response: generateFallbackResponse(mode, query, targetPlayer, formation)
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    let prompt = '';
    if (mode === 'scout_report') {
      prompt = `${IVAN_JAIME_CONTEXT}
Gera um Relatório Técnico de Scouting detalhado sobre Iván Jaime atuando no sistema tático ${formation || '4-2-3-1'}.
Divide o relatório em:
1. Perfil e Raio de Ação no sistema ${formation || '4-2-3-1'}.
2. Pontos Fortes e Virtudes Técnicas de Elite.
3. Movimentações Chave (fase ofensiva, transição e bolas paradas).
4. Áreas de Otimização e Exigência Tática.
5. Veredito do Olheiro e Impacto no Futebol Moderno.`;
    } else if (mode === 'compare') {
      prompt = `${IVAN_JAIME_CONTEXT}
Faz uma comparação tática e estatística aprofundada e justa entre Iván Jaime e o jogador ${targetPlayer || 'Pedro Gonçalves (Pote)'}.
Compara:
1. Posicionamento e Zona de Conforto
2. Tomada de Decisão e Capacidade de Definição (Golo vs Passe)
3. Capacidade de drible e saída sob pressão
4. Reação à perda e intensidade defensiva
5. Veredito: em que tipo de jogo ou contexto cada um desequilibra mais.`;
    } else if (mode === 'iconic_moment') {
      prompt = `${IVAN_JAIME_CONTEXT}
Faz uma reconstituição épica e detalhada do golo de Iván Jaime no minuto 101 do prolongamento da Supertaça Cândido de Oliveira 2024 (FC Porto 4-3 Sporting CP em Aveiro).
Explica o contexto emocional do jogo (desvantagem de 0-3 para 3-3), a jogada individual, o remate com arco que bate Kovacevic, a explosão de alegria no banco e nas bancadas com os adeptos portistas, e o significado deste momento na sua afirmação com a camisola dos Dragões.`;
    } else {
      prompt = `${IVAN_JAIME_CONTEXT}
Responde à seguinte pergunta de um adepto ou analista sobre Iván Jaime:
"${query || 'Qual é a maior virtude de Iván Jaime em campo?'}"
Sê detalhado, objetivo, rigoroso com datas e factos desportivos, mantendo o tom elegante e entusiasmante do futebol.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });

    const text = response.text || '';
    return res.json({
      success: true,
      source: 'gemini',
      response: text
    });
  } catch (error: any) {
    console.error('Gemini API error, falling back:', error?.message);
    const { mode, query, targetPlayer, formation } = req.body;
    return res.json({
      success: true,
      source: 'fallback',
      response: generateFallbackResponse(mode, query, targetPlayer, formation)
    });
  }
});

function generateFallbackResponse(mode?: string, query?: string, targetPlayer?: string, formation?: string): string {
  if (mode === 'scout_report') {
    return `### Relatório de Scouting Técnico: Iván Jaime (${formation || '4-2-3-1'})

**1. Perfil e Raio de Ação no Sistema:**
No sistema ${formation || '4-2-3-1'}, Iván Jaime oferece a sua máxima expressividade partindo da meia-esquerda com liberdade para pisar zonas interiores ou diretamente como '10' nas costas da linha de médios adversária. Não é um extremo de linha de fundo clássico; é um criador associativo com faro de golo.

**2. Virtudes Técnicas de Elite:**
- **Controlo de Receção Orientada:** Consegue virar o corpo num único tempo, eliminando a pressão direta do lateral ou trinco.
- **Remate de Média Distância:** Especialidade de puxar para dentro e disparar em arco com o pé direito ao segundo poste.
- **Temporização e Passe de Rutura:** Excelente capacidade de esperar pelo momento exato da desmarcação dos avançados.

**3. Zonas de Conforto e Dinâmica Ofensiva:**
- Ocupação inteligente do "half-space" esquerdo.
- Tabelas curtas e progressão através de drible de desequilíbrio corporal.
- Excelente chegada à área vindo de trás para segundos ressaltos.

**4. Veredito do Olheiro:**
Iván Jaime reúne a formação requintada do futebol espanhol com a intensidade e maturidade competitiva adquirida no futebol português. É um jogador capaz de desbloquear blocos baixos em momentos de aperto.`;
  }

  if (mode === 'compare') {
    const player = targetPlayer || 'Pedro Gonçalves (Pote)';
    return `### Comparação Tática: Iván Jaime vs. ${player}

**1. Posicionamento e Dinâmica:**
- **Iván Jaime:** Foco em transportar com bola colada ao pé, acelerar o ataque entrelinhas e procurar o remate de fora da área com trajetória curva. Move-se entre o corredor esquerdo e o corredor central.
- **${player}:** Destaca-se pelo instinto letal na área, ataques ao espaço cego da defesa e chegada fulgurante ao golo a um ou dois toques.

**2. Drible e Desequilíbrio Individual:**
Iván Jaime possui um índice superior de dribles de finta curta e mudanças de direção em espaço curto, fruto da sua formação em Málaga. Consegue manter a posse sob pressão cerrada.

**3. Definição:**
Enquanto ${player} apresenta volumes superlativos de finalização na grande área, Iván Jaime é mais ameaçador a partir da meia-lua e na criação do penúltimo passe de rotura.

**Conclusão:**
São dois dos médios ofensivos mais talentosos a atuar em Portugal na última década, cada um com armas letais distintas no processo ofensivo.`;
  }

  if (mode === 'iconic_moment') {
    return `### A Consagração de Aveiro: O Minuto 101 da Supertaça 2024

No dia 3 de agosto de 2024, no Estádio Municipal de Aveiro, escreveu-se uma das páginas mais dramáticas e memoráveis dos clássicos do futebol português.

O Sporting CP tinha entrado de forma avassaladora, liderando por 3-0 aos 24 minutos. Numa demonstração de crença inabalável, o FC Porto empatou para 3-3 e levou a decisão para o prolongamento.

Aos 101 minutos, Iván Jaime, que havia sido lançado para dinamizar o ataque portista, recebe a bola na zona intermédia. Com a audácia e frieza que lhe são características, arma um remate repentino e portentoso de pé direito a cerca de 25 metros da baliza. A bola sofre um ligeiro desvio que lhe confere um arco impossível, enganando Kovacevic e mergulhando nas redes!

O estádio explodiu em azul e branco. Iván Jaime correu para o banco em lágrimas de alegria e foi engolido pelos companheiros, selando a conquista da 24ª Supertaça da história do FC Porto e cravando o seu nome na história do clube.`;
  }

  return `Iván Jaime é um dos talentos mais puros do futebol ibérico contemporâneo. Nascido em Málaga a 26 de setembro de 2000 (atualmente com 26 anos na época 2026/27), formou-se na célebre academia do clube andaluz antes de dar o salto para Portugal em 2020. No FC Famalicão foi coroado o Melhor Jogador Jovem da Liga Portugal 2022/23 com exibições de gala, o que lhe valeu a transferência milionária de 10M€ para o FC Porto. Com os Dragões, venceu a Taça de Portugal e imortalizou-se com o golo da vitória aos 101' na Supertaça 2024. Mais tarde somou passagens pela LaLiga no Valencia CF e pela MLS no CF Montréal, encontrando-se atualmente a espalhar a sua classe na LaLiga pelo UD Las Palmas, sob vínculo contratual ao FC Porto até 2028.`;
}

// Fullstack handling: Dev vs Production
const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Iván Jaime App server running on http://0.0.0.0:${PORT}`);
});
