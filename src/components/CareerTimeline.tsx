import React, { useState } from 'react';
import { CAREER_CHAPTERS, CareerChapter } from '../data/ivanJaimeData';
import { ChevronRight, Calendar, UserCheck, CheckCircle2, Trophy } from 'lucide-react';

export const CareerTimeline: React.FC = () => {
  const [activeChapterId, setActiveChapterId] = useState<string>('porto');

  const activeChapter = CAREER_CHAPTERS.find(c => c.id === activeChapterId) || CAREER_CHAPTERS[2];

  return (
    <section id="trajetoria" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#080d17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            <span>Trajetória Desportiva</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>2011 até ao Presente</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            A Epopeia de um Criativo: De La Rosaleda ao Estádio do Dragão
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Descubra em detalhe como um miúdo das academias de Málaga conquistou o futebol português, 
            superou lesões graves, foi eleito o melhor jovem talento nacional e chegou ao topo nos Dragões.
          </p>
        </div>

        {/* Club Switcher Tabs - functional segmented buttons */}
        <div className="mt-10 flex flex-wrap gap-2 border-b border-slate-800 pb-4">
          {CAREER_CHAPTERS.map((chapter) => {
            const isActive = chapter.id === activeChapterId;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveChapterId(chapter.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span className="font-mono text-xs opacity-75">{chapter.period}</span>
                <span>{chapter.club}</span>
                <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/30 text-blue-200">
                  #{chapter.jerseyNumber}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Details Bento Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Chapter Narrative (8 cols) */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-3 font-mono-numbers">
              <span className="text-blue-400 font-semibold">{activeChapter.club}</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>{activeChapter.period}</span>
              <span aria-hidden="true" className="text-slate-700">/</span>
              <span>Camisola #{activeChapter.jerseyNumber}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {activeChapter.title}
            </h3>
            
            <p className="text-sm sm:text-base font-medium text-blue-300/90 mb-6">
              {activeChapter.subtitle}
            </p>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeChapter.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Treinadores & Contexto Técnico */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <UserCheck className="h-4 w-4 text-blue-400" />
                <span>Treinadores Principais:</span>
                <strong className="text-slate-200">{activeChapter.coach}</strong>
              </div>
              <div className="text-xs text-slate-400">
                <span>Resumo da Etapa: </span>
                <span className="text-slate-200 font-mono-numbers">{activeChapter.stats.games} jogos · {activeChapter.stats.goals} golos · {activeChapter.stats.assists} assistências</span>
              </div>
            </div>
          </div>

          {/* Side Column: Key Stats & Highlights (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Stat Box */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Números no {activeChapter.club}
              </h4>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-mono-numbers text-2xl font-bold text-white">
                    {activeChapter.stats.games}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Jogos</div>
                </div>
                
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-mono-numbers text-2xl font-bold text-blue-400">
                    {activeChapter.stats.goals}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Golos</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="font-mono-numbers text-2xl font-bold text-sky-400">
                    {activeChapter.stats.assists}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Assistências</div>
                </div>
              </div>
            </div>

            {/* Milestones in this Era */}
            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>Marcos Fundamentais</span>
              </h4>

              <ul className="space-y-3">
                {activeChapter.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Historical context callout */}
            <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/40 to-slate-900/80 p-5 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-blue-300 block mb-1">Nota Histórica:</span>
              {activeChapterId === 'malaga' && (
                "Em Málaga, Iván Jaime partilhou a formação com grandes promessas do futebol espanhol e sempre foi apelidado de 'mago' pelo controlo de bola refinado."
              )}
              {activeChapterId === 'famalicao' && (
                "A temporada 2022/23 pelo Famalicão consagrou-o como o jogador mais desequilibrador fora dos três grandes, culminando no prémio de Melhor Jovem da Liga."
              )}
              {activeChapterId === 'porto' && (
                "No FC Porto, Iván Jaime provou a sua frieza em finais ao rubricar o golo da vitória na Supertaça aos 101 minutos, um dos golos mais catárticos da história portista."
              )}
              {activeChapterId === 'international-loans' && (
                "Na época 2026/27, aos 26 anos de idade, Iván Jaime atua na LaLiga pela UD Las Palmas, após experiências no Valencia CF e CF Montréal (MLS), mantendo vínculo contratual protegido com o FC Porto até 2028."
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
