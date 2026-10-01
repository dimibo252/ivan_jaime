import React, { useState } from 'react';
import { SEASON_STATS, SeasonStat } from '../data/ivanJaimeData';
import { BarChart3, Filter } from 'lucide-react';

export const StatsTable: React.FC = () => {
  const [filterClub, setFilterClub] = useState<string>('all');

  const filteredStats = SEASON_STATS.filter(s => {
    if (filterClub === 'all') return true;
    if (filterClub === 'porto') return s.club.includes('FC Porto');
    if (filterClub === 'famalicao') return s.club.includes('Famalicão');
    if (filterClub === 'malaga') return s.club.includes('Málaga') || s.club.includes('Malagueño');
    if (filterClub === 'loans') return s.club.includes('Valencia') || s.club.includes('Montréal') || s.club.includes('Las Palmas');
    return true;
  });

  const totalGames = filteredStats.reduce((acc, curr) => acc + curr.appearances, 0);
  const totalGoals = filteredStats.reduce((acc, curr) => acc + curr.goals, 0);
  const totalAssists = filteredStats.reduce((acc, curr) => acc + curr.assists, 0);
  const totalMinutes = filteredStats.reduce((acc, curr) => acc + curr.minutes, 0);

  return (
    <section id="estatisticas" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#060a13]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
              <BarChart3 className="h-4 w-4" />
              <span>Registo Estatístico Completo</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Época a Época</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              Números Oficiais da Carreira de Iván Jaime
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Consulte os dados consolidados de todas as temporadas oficiais desde a estreia sénior aos 17 anos 
              até às conquistas de títulos pelo FC Porto.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setFilterClub('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterClub === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos os Clubes
            </button>
            <button
              onClick={() => setFilterClub('porto')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterClub === 'porto'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FC Porto
            </button>
            <button
              onClick={() => setFilterClub('famalicao')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterClub === 'famalicao'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FC Famalicão
            </button>
            <button
              onClick={() => setFilterClub('malaga')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterClub === 'malaga'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Málaga CF
            </button>
            <button
              onClick={() => setFilterClub('loans')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                filterClub === 'loans'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              LaLiga / MLS (Empréstimos)
            </button>
          </div>
        </div>

        {/* Aggregate KPI Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Jogos Oficiais</div>
            <div className="font-mono-numbers text-2xl font-bold text-white mt-1">{totalGames}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Em todas as provas</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Golos Marcados</div>
            <div className="font-mono-numbers text-2xl font-bold text-blue-400 mt-1">{totalGoals}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Média de 0.17 g/j</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Assistências</div>
            <div className="font-mono-numbers text-2xl font-bold text-sky-400 mt-1">{totalAssists}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Passes para golo</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Minutos em Campo</div>
            <div className="font-mono-numbers text-2xl font-bold text-amber-400 mt-1">
              {totalMinutes.toLocaleString('pt-PT')}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">Minutos competitivos</div>
          </div>
        </div>

        {/* Clean Responsive Data Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0b1220] text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-4">Época</th>
                  <th scope="col" className="px-6 py-4">Clube</th>
                  <th scope="col" className="px-6 py-4">Competições</th>
                  <th scope="col" className="px-6 py-4 text-center font-mono-numbers">Jogos</th>
                  <th scope="col" className="px-6 py-4 text-center font-mono-numbers">Golos</th>
                  <th scope="col" className="px-6 py-4 text-center font-mono-numbers">Assists</th>
                  <th scope="col" className="px-6 py-4 text-right font-mono-numbers">Minutos</th>
                  <th scope="col" className="px-6 py-4">Destaques & Prémios</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono-numbers">
                {filteredStats.map((stat, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      {stat.season}
                    </td>
                    <td className="px-6 py-4 font-sans text-slate-200 whitespace-nowrap">
                      {stat.club}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-slate-400 whitespace-nowrap">
                      {stat.league}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-slate-100">
                      {stat.appearances}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-blue-400">
                      {stat.goals}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-sky-400">
                      {stat.assists}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-400">
                      {stat.minutes.toLocaleString('pt-PT')}'
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-amber-300/90 whitespace-nowrap">
                      {stat.trophiesOrAwards || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
