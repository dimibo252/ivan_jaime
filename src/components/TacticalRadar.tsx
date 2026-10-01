import React, { useState } from 'react';
import { TACTICAL_RADAR_DATA } from '../data/ivanJaimeData';
import { Target, Activity, Eye, Zap, Crosshair } from 'lucide-react';

interface PitchZone {
  id: string;
  name: string;
  role: string;
  heat: string;
  description: string;
  signatureMove: string;
  cx: number;
  cy: number;
  r: number;
}

const PITCH_ZONES: PitchZone[] = [
  {
    id: 'half-space-left',
    name: 'Half-Space Esquerdo (Zona de Ouro)',
    role: 'Extremo Interior / Desequilibrador',
    heat: '92% Frequência',
    description: 'A zona onde Iván Jaime é mais letal no futebol mundial. Recebe a bola colada à linha lateral ou no espaço entre o lateral e o central adversário, atrai a marcação e flete rapidamente para o pé direito.',
    signatureMove: 'Drible para dentro e remate em arco com efeito de fora da área para o poste mais distante.',
    cx: 140,
    cy: 110,
    r: 38
  },
  {
    id: 'zone-14',
    name: 'Zona 14 / Meia-Lua da Baliza',
    role: 'Finalizador de Meia Distância',
    heat: '85% Frequência',
    description: 'Espaço crítico à entrada da área defensiva contrária. Foi a partir desta coordenada que fuzilou o golo dos 101 minutos na Supertaça contra o Sporting CP.',
    signatureMove: 'Receção com um toque no peito ou sola e disparo imediato sem permitir aproximação dos médios defensivos.',
    cx: 250,
    cy: 90,
    r: 32
  },
  {
    id: 'central-playmaker',
    name: 'Corredor Central / Camisola 10',
    role: 'Médio Ofensivo Clássico',
    heat: '78% Frequência',
    description: 'Jogando entrelinhas, Iván Jaime serve de ponte entre os médios mais recuados e os avançados em profundidade, usando visão de 360 graus.',
    signatureMove: 'Passe vertical de rutura pelo chão a rasgar a linha defensiva adversária.',
    cx: 250,
    cy: 170,
    r: 35
  },
  {
    id: 'left-wing-touchline',
    name: 'Corredor Exterior Esquerdo',
    role: 'Extremo de Desequilíbrio e Cruzamento',
    heat: '64% Frequência',
    description: 'Utilizado para esticar o bloco adversário e provocar situações de um contra um face ao lateral contrário.',
    signatureMove: 'Mudança brusca de velocidade e cruzamento tenso ao primeiro poste.',
    cx: 70,
    cy: 95,
    r: 30
  }
];

export const TacticalRadar: React.FC = () => {
  const [activeZoneId, setActiveZoneId] = useState<string>('half-space-left');

  const activeZone = PITCH_ZONES.find(z => z.id === activeZoneId) || PITCH_ZONES[0];

  return (
    <section id="tatica" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#080c16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            <Activity className="h-4 w-4" />
            <span>Perfil Tático & DNA Técnico</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Inteligência Posicional</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            Como Joga Iván Jaime: Análise Espacial & Mapa de Calor
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Clique nas diferentes zonas do relvado interativo para descobrir como Iván Jaime 
            interpreta cada metro quadrado, desde a sua zona de conforto no meio-espaço esquerdo 
            até à finalização letal na meia-lua.
          </p>
        </div>

        {/* Tactical Grid: Pitch Map (Left) + Detailed Technical Radar (Right) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Pitch (6 Cols) */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-800 bg-[#0a1120] p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Crosshair className="h-4 w-4 text-blue-400" />
                <span>Mapa de Calor & Zonas de Ação</span>
              </h3>
              <span className="text-xs text-slate-400">Clique numa zona circular</span>
            </div>

            {/* Pitch SVG Diagram */}
            <div className="relative aspect-[4/3] w-full rounded-xl bg-[#061425] border border-blue-900/60 overflow-hidden p-3 pitch-pattern shadow-inner">
              <svg className="w-full h-full" viewBox="0 0 500 360">
                {/* Outer Field Lines */}
                <rect x="20" y="20" width="460" height="320" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                {/* Halfway Line */}
                <line x1="20" y1="180" x2="480" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="250" cy="180" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                
                {/* Attacking Penalty Area (Top half - attacking direction) */}
                <rect x="120" y="20" width="260" height="110" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <rect x="180" y="20" width="140" height="40" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M 190,130 A 60,60 0 0,0 310,130" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                
                {/* Goal indicator */}
                <rect x="210" y="12" width="80" height="8" fill="#3b82f6" />
                <text x="230" y="8" fill="#93c5fd" fontSize="9" fontWeight="bold">BALIZA ADVERSÁRIA</text>

                {/* Interactive Clickable Zones */}
                {PITCH_ZONES.map((zone) => {
                  const isSelected = zone.id === activeZoneId;
                  return (
                    <g 
                      key={zone.id} 
                      onClick={() => setActiveZoneId(zone.id)}
                      className="cursor-pointer transition-transform hover:scale-105"
                    >
                      {/* Glow ripple for selected */}
                      {isSelected && (
                        <circle 
                          cx={zone.cx} 
                          cy={zone.cy} 
                          r={zone.r + 10} 
                          fill="none" 
                          stroke="#38bdf8" 
                          strokeWidth="2"
                          strokeDasharray="4,4"
                          className="animate-spin"
                          style={{ transformOrigin: `${zone.cx}px ${zone.cy}px` }}
                        />
                      )}
                      
                      {/* Base zone circle */}
                      <circle 
                        cx={zone.cx} 
                        cy={zone.cy} 
                        r={zone.r} 
                        fill={isSelected ? 'rgba(59, 130, 246, 0.45)' : 'rgba(30, 58, 138, 0.25)'}
                        stroke={isSelected ? '#60a5fa' : '#1e40af'}
                        strokeWidth={isSelected ? 3 : 1.5}
                      />
                      
                      {/* Center pin */}
                      <circle 
                        cx={zone.cx} 
                        cy={zone.cy} 
                        r="5" 
                        fill={isSelected ? '#38bdf8' : '#93c5fd'} 
                      />

                      <text 
                        x={zone.cx} 
                        y={zone.cy + 18} 
                        textAnchor="middle" 
                        fill="#ffffff" 
                        fontSize="9" 
                        fontWeight="bold"
                        className="pointer-events-none drop-shadow"
                      >
                        {zone.heat.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom pitch status indicator */}
              <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono-numbers">
                <span className="text-blue-400 font-semibold">{activeZone.name}</span>
                <span className="text-amber-400 font-bold">{activeZone.heat}</span>
              </div>
            </div>

            {/* Active Zone Narrative Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-white text-sm">{activeZone.name}</span>
                <span className="text-blue-400 font-mono-numbers font-medium">{activeZone.role}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {activeZone.description}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-amber-400 font-semibold">Movimento de Assinatura: </span>
                <span className="text-slate-200">{activeZone.signatureMove}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Attribute Radar & Scout Ratings (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="rounded-2xl border border-slate-800 bg-[#0a1120] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Target className="h-4 w-4 text-amber-400" />
                  <span>Índices Técnicos de Rendimento (0–100)</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono-numbers">Liga Portugal Stats</span>
              </div>

              <div className="space-y-4">
                {TACTICAL_RADAR_DATA.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{item.attribute}</span>
                      <span className="font-mono-numbers font-bold text-blue-400 text-sm">
                        {item.score}<span className="text-slate-600 text-xs">/100</span>
                      </span>
                    </div>

                    {/* Progress Bar with smooth fill */}
                    <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 transition-all duration-700"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <div className="text-[11px] text-slate-400 italic">
                      {item.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tactical Archetype Card */}
            <div className="rounded-2xl border border-blue-900/40 bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-[#080d1a] p-5">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-amber-400" />
                <span>Arquétipo de Jogador: O 'Interior Invertido Moderno'</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ao contrário dos extremos tradicionais de velocidade e linha de fundo, Iván Jaime 
                enquadra-se no arquétipo dos médios interiores criativos com chegada à área — na linha de 
                jogadores como Isco, Dani Olmo ou Pedro Gonçalves. A sua virtude máxima reside em criar 
                superioridade numérica no corredor central sem abdicar da capacidade de finalizar jogadas com remate exterior.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
