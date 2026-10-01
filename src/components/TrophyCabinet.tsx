import React, { useState } from 'react';
import { TROPHIES, TrophyItem } from '../data/ivanJaimeData';
import { Trophy, Award, Star, Medal } from 'lucide-react';

export const TrophyCabinet: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'team' | 'individual'>('all');

  const filteredTrophies = TROPHIES.filter(t => {
    if (filter === 'all') return true;
    return t.category === filter;
  });

  return (
    <section id="trofeus" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#080d17]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Trophy className="h-4 w-4" />
              <span>Palmarés & Galardões</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Reconhecimento Nacional</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Gabinete de Troféus & Distinções
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Os troféus erguidos nos palcos sagrados do futebol português e os prémios individuais 
              votados por treinadores, capitães e painéis oficiais.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({TROPHIES.length})
            </button>
            <button
              onClick={() => setFilter('team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'team' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Títulos Coletivos
            </button>
            <button
              onClick={() => setFilter('individual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filter === 'individual' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Distinções Individuais
            </button>
          </div>
        </div>

        {/* Trophy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrophies.map((trophy) => (
            <div
              key={trophy.id}
              className="group relative rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-[#0a111e] p-6 shadow-xl transition-all hover:border-amber-500/40 hover:-translate-y-1"
            >
              {/* Top Row: Year & Category */}
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="font-mono-numbers font-bold text-amber-400 text-sm">
                  {trophy.season}
                </span>
                <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                  {trophy.entity}
                </span>
              </div>

              {/* Trophy Title */}
              <div className="flex items-start gap-3">
                <span className="text-3xl shrink-0 p-2 rounded-xl bg-slate-950 border border-slate-800">
                  {trophy.badge}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {trophy.title}
                  </h3>
                  <div className="text-xs text-blue-400 font-medium mt-0.5">
                    {trophy.category === 'team' ? 'Troféu pelo FC Porto' : 'Prémio Oficial'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {trophy.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
