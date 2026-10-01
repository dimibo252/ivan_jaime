import React from 'react';
import { IVAN_JAIME_BIO } from '../data/ivanJaimeData';
import { ArrowDown, Sparkles, Award, Zap, Shield, Play } from 'lucide-react';

interface HeroProps {
  onOpenAiScout: () => void;
  onExploreGoal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAiScout, onExploreGoal }) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-800/80">
      {/* Background stadium floodlight atmosphere */}
      <div className="absolute inset-0 stadium-glow pointer-events-none" />
      <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Sub-kicker metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
          <span>Málaga CF</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>FC Famalicão</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>FC Porto</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-yellow-400">UD Las Palmas (2026/27)</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-amber-400">Vencedor da Supertaça 2024</span>
        </div>

        {/* Main Grid: Left Typographic Narrative / Right Graphic Jersey & Accolade Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 7 Cols */}
          <div className="lg:col-span-7">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              A Arte do Desequilíbrio e a Mística dos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200">Grandes Palcos</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Nascido nas margens do Mediterrâneo e forjado nas escolas do futebol andaluz, 
              <strong> Iván Jaime Pajuelo</strong> tornou-se o Melhor Jogador Jovem da Liga Portugal 
              antes de gravar o seu nome na história eterna do FC Porto com o golo da reviravolta 
              épica na Supertaça aos 101 minutos.
            </p>

            {/* Unboxed Metadata Row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 border-t border-b border-slate-800/80 py-3 font-mono-numbers">
              <div>
                <span className="text-slate-500">Posição:</span>{' '}
                <span className="font-semibold text-slate-200">{IVAN_JAIME_BIO.mainPosition}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">/</span>
              <div>
                <span className="text-slate-500">Nascimento:</span>{' '}
                <span className="font-semibold text-slate-200">{IVAN_JAIME_BIO.birthDate} ({IVAN_JAIME_BIO.age} anos)</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">/</span>
              <div>
                <span className="text-slate-500">Altura:</span>{' '}
                <span className="font-semibold text-slate-200">{IVAN_JAIME_BIO.height}</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">/</span>
              <div>
                <span className="text-slate-500">Pé Dominante:</span>{' '}
                <span className="font-semibold text-slate-200">{IVAN_JAIME_BIO.dominantFoot}</span>
              </div>
            </div>

            {/* Key CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#supertaca"
                onClick={onExploreGoal}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                <Play className="h-4 w-4 fill-white transition-transform group-hover:scale-110" />
                <span>O Golo Mítico aos 101'</span>
              </a>

              <a
                href="#trajetoria"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition-colors whitespace-nowrap"
              >
                <span>História Completa</span>
                <ArrowDown className="h-4 w-4 text-slate-400" />
              </a>

              <button
                onClick={onOpenAiScout}
                className="flex items-center gap-2 rounded-xl border border-blue-500/30 bg-blue-950/40 hover:bg-blue-900/50 px-4 py-3 text-sm font-medium text-blue-300 transition-colors whitespace-nowrap"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span>Consultar Relatório IA</span>
              </button>
            </div>

            {/* Proof Metric Adjacency */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <div className="font-mono-numbers text-2xl font-bold text-white">190+</div>
                <div className="text-xs text-slate-400 mt-0.5">Jogos Oficiais</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <div className="font-mono-numbers text-2xl font-bold text-white">29</div>
                <div className="text-xs text-slate-400 mt-0.5">Golos Marcados</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <div className="font-mono-numbers text-2xl font-bold text-blue-400">101'</div>
                <div className="text-xs text-slate-400 mt-0.5">Golo na Supertaça</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                <div className="font-mono-numbers text-2xl font-bold text-amber-400">LaLiga</div>
                <div className="text-xs text-slate-400 mt-0.5">Las Palmas 26/27</div>
              </div>
            </div>

          </div>

          {/* Right Column: 5 Cols - Stylized Visual Jersey & Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0e172a] to-[#090d16] p-6 shadow-2xl overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-700/80 flex items-center justify-center font-display font-black text-white text-lg border border-blue-400/40">
                    17
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">FC PORTO</h3>
                    <div className="text-xs text-slate-400 font-mono-numbers">Épocas 2023–Presente</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 font-medium">
                  <Award className="h-3.5 w-3.5" />
                  <span>2 Títulos</span>
                </div>
              </div>

              {/* Graphic Representation: FC Porto #17 Shirt & Pitch Art */}
              <div className="relative my-6 aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-blue-950 via-[#071329] to-[#040813] border border-blue-900/40 flex items-center justify-center p-6 pitch-pattern">
                {/* Visual Field Lines SVG */}
                <svg className="absolute inset-0 h-full w-full opacity-20 pointer-events-none" viewBox="0 0 400 300">
                  <rect x="20" y="20" width="360" height="260" fill="none" stroke="white" strokeWidth="2" />
                  <line x1="200" y1="20" x2="200" y2="280" stroke="white" strokeWidth="2" />
                  <circle cx="200" cy="150" r="50" fill="none" stroke="white" strokeWidth="2" />
                  <rect x="20" y="80" width="70" height="140" fill="none" stroke="white" strokeWidth="2" />
                  <rect x="310" y="80" width="70" height="140" fill="none" stroke="white" strokeWidth="2" />
                </svg>

                {/* Jersey Illustration */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative w-36 h-44 rounded-t-2xl bg-gradient-to-b from-blue-600 to-blue-900 border-2 border-white/20 shadow-2xl flex flex-col items-center justify-between p-3 overflow-hidden">
                    {/* Blue & White Stripes */}
                    <div className="absolute inset-0 flex justify-between opacity-30 pointer-events-none">
                      <div className="w-4 h-full bg-white"></div>
                      <div className="w-4 h-full bg-white"></div>
                      <div className="w-4 h-full bg-white"></div>
                      <div className="w-4 h-full bg-white"></div>
                    </div>

                    <div className="relative z-10 text-[10px] tracking-widest text-blue-200 uppercase font-mono font-bold">
                      IVÁN JAIME
                    </div>

                    <div className="relative z-10 font-display font-black text-6xl text-white drop-shadow-md">
                      17
                    </div>

                    <div className="relative z-10 flex items-center gap-1 text-[9px] text-amber-300 font-semibold tracking-wide">
                      <Shield className="h-3 w-3" />
                      <span>DRAGÕES</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Floater: Supercup Goal */}
                <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-slate-300 font-medium">Golo Supertaça aos 101'</span>
                  </div>
                  <span className="font-mono-numbers text-amber-400 font-bold">FC Porto 4-3 Sporting</span>
                </div>
              </div>

              {/* Card Footer Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Clube Atual (2026/27):</span>
                  <span className="font-semibold text-yellow-400">UD Las Palmas (LaLiga)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Clube Detentor / Vínculo:</span>
                  <span className="font-semibold text-blue-300">FC Porto (Até 2028)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Cláusula de Rescisão:</span>
                  <span className="font-semibold text-emerald-400 font-mono-numbers">60.000.000 €</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
