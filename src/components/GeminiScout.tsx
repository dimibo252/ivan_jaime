import React, { useState } from 'react';
import { Sparkles, Send, Bot, RefreshCw, BookOpen, UserCheck, Flame, Compass } from 'lucide-react';

interface GeminiScoutProps {
  initialOpen?: boolean;
}

export const GeminiScout: React.FC<GeminiScoutProps> = () => {
  const [activeTab, setActiveTab] = useState<'prompt' | 'report' | 'compare' | 'moment'>('prompt');
  const [customQuery, setCustomQuery] = useState('');
  const [formation, setFormation] = useState('4-2-3-1');
  const [targetPlayer, setTargetPlayer] = useState('Pedro Gonçalves (Pote)');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const quickQuestions = [
    "Como se desenvolveu a carreira de Iván Jaime após a Supertaça 2024 até à época 2026/27?",
    "Qual é o impacto tático de Iván Jaime na LaLiga ao serviço do UD Las Palmas?",
    "Como foi a experiência de Iván Jaime na MLS ao serviço do CF Montréal?",
    "Porque é que Iván Jaime é tão letal em remates de meia distância como o dos 101' na Supertaça?"
  ];

  const handleRunAnalysis = async (mode: 'custom_query' | 'scout_report' | 'compare' | 'iconic_moment', customText?: string) => {
    setLoading(true);
    setAnalysisResult(null);

    const queryToSend = customText || customQuery;

    try {
      const response = await fetch('/api/gemini/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          query: queryToSend,
          formation,
          targetPlayer,
        }),
      });

      const data = await response.json();
      if (data.response) {
        setAnalysisResult(data.response);
      } else {
        setAnalysisResult("Não foi possível gerar a resposta neste momento. Por favor tente novamente.");
      }
    } catch (err) {
      console.error(err);
      setAnalysisResult("Ocorreu um erro na ligação ao motor de scouting. Por favor tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="scout" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#070b14] relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            <Sparkles className="h-4 w-4" />
            <span>Inteligência Artificial & Scouting Profissional</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Gemini 3.8 Flash</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Scout IA: Análise Tática Personalizada de Iván Jaime
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Consulte o motor de análise tática baseado em IA para gerar relatórios de observação, 
            comparar Iván Jaime com outros craques europeus ou desvendar os pormenores dos seus lances decisivos.
          </p>
        </div>

        {/* Scout Controls Box */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-[#0a101f] p-6 shadow-2xl">
          
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveTab('prompt')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'prompt'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>Perguntas ao Analista</span>
            </button>

            <button
              onClick={() => setActiveTab('report')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="h-4 w-4" />
              <span>Relatório de Sistema</span>
            </button>

            <button
              onClick={() => setActiveTab('compare')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'compare'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <UserCheck className="h-4 w-4" />
              <span>Comparador de Craques</span>
            </button>

            <button
              onClick={() => setActiveTab('moment')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === 'moment'
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              <span>Autópsia dos 101' Minutos</span>
            </button>
          </div>

          {/* Tab 1: Custom Prompt */}
          {activeTab === 'prompt' && (
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Faça uma pergunta sobre a carreira, estilo de jogo ou momentos de Iván Jaime:
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="Ex: Como foi a passagem de Iván Jaime pelo Málaga e o golo na estreia por Espanha?"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customQuery.trim()) {
                      handleRunAnalysis('custom_query');
                    }
                  }}
                  className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={() => handleRunAnalysis('custom_query')}
                  disabled={loading || !customQuery.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>Analisar</span>
                </button>
              </div>

              {/* Quick suggestions */}
              <div className="pt-2">
                <span className="text-xs text-slate-500 block mb-2 font-medium">Sugestões rápidas:</span>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCustomQuery(q);
                        handleRunAnalysis('custom_query', q);
                      }}
                      className="rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/50 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-colors text-left cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: System Tactical Report */}
          {activeTab === 'report' && (
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Selecione o Sistema Tático para a Análise de Scouting:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: '4-2-3-1', label: '4-2-3-1 (Médio Ofensivo / Extremo Interior)', desc: 'Esquema de referência do futebol moderno' },
                  { id: '4-3-3', label: '4-3-3 (Extremo Esquerdo a Fletir)', desc: 'Sistema clássico do FC Porto com alas invertidos' },
                  { id: '3-4-2-1', label: '3-4-2-1 (Um dos dois "10")', desc: 'Liberdade criativa nos corredores centrais' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setFormation(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      formation === item.id
                        ? 'border-blue-500 bg-blue-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-sm text-white">{item.id}</div>
                    <div className="text-xs text-blue-300 mt-1">{item.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleRunAnalysis('scout_report')}
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>Gerar Relatório de Scouting no {formation}</span>
              </button>
            </div>
          )}

          {/* Tab 3: Compare */}
          {activeTab === 'compare' && (
            <div className="mt-6 space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Selecione o jogador para comparar com Iván Jaime:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Pedro Gonçalves (Pote)',
                  'Brahim Díaz',
                  'Isco Alarcón',
                  'Dani Olmo'
                ].map((player) => (
                  <button
                    key={player}
                    onClick={() => setTargetPlayer(player)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      targetPlayer === player
                        ? 'border-blue-500 bg-blue-950/40 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm text-white">{player}</div>
                    <div className="text-[11px] text-blue-400 mt-0.5 font-mono">Vs. Iván Jaime</div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleRunAnalysis('compare')}
                disabled={loading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>Comparar Iván Jaime vs. {targetPlayer}</span>
              </button>
            </div>
          )}

          {/* Tab 4: Iconic Moment Autopsy */}
          {activeTab === 'moment' && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                Solicite uma reconstituição tática detalhada da reviravolta na Supertaça Cândido de Oliveira 2024, 
                quando Iván Jaime bateu Kovacevic aos 101 minutos e selou o triunfo por 4-3 frente ao Sporting.
              </p>

              <button
                onClick={() => handleRunAnalysis('iconic_moment')}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? <RefreshCw className="h-4 w-4 animate-spin text-slate-950" /> : <Flame className="h-4 w-4 text-slate-950" />}
                <span>Gerar Reconstituição Épica dos 101'</span>
              </button>
            </div>
          )}

          {/* Loading indicator */}
          {loading && (
            <div className="mt-8 rounded-xl border border-blue-900/40 bg-blue-950/20 p-8 text-center">
              <RefreshCw className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-3" />
              <div className="text-sm font-semibold text-white">O Scout Gemini está a processar os dados táticos...</div>
              <div className="text-xs text-slate-400 mt-1">Cruzando dados de jogo, posicionamento e estatísticas oficiais.</div>
            </div>
          )}

          {/* Output Display */}
          {analysisResult && !loading && (
            <div className="mt-8 rounded-xl border border-blue-900/40 bg-[#060e1c] p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-400">
                  <Sparkles className="h-4 w-4" />
                  <span>Dossiê Tático Emitido</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono-numbers">Gemini 3.8 Flash Engine</span>
              </div>

              {/* Formatted Text Output */}
              <div className="prose prose-invert max-w-none text-sm text-slate-200 leading-relaxed whitespace-pre-line space-y-3">
                {analysisResult}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
