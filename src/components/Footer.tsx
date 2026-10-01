import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#050810] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <span className="font-display text-xl font-bold tracking-tight text-white block">
              IVÁN JAIME <span className="text-blue-500 font-mono text-sm">#17</span>
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Enciclopédia digital e arquivo documental oficial da carreira de Iván Jaime Pajuelo.
              Málaga CF · FC Famalicão · FC Porto · Valencia CF · CF Montréal · UD Las Palmas.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Iván Jaime Pajuelo - Tributo & Análise Tática.
          </div>
          <div className="flex items-center gap-4">
            <a href="#biografia" className="hover:text-slate-300 transition-colors">Biografia</a>
            <span aria-hidden="true">·</span>
            <a href="#trajetoria" className="hover:text-slate-300 transition-colors">Carreira</a>
            <span aria-hidden="true">·</span>
            <a href="#supertaca" className="hover:text-slate-300 transition-colors">Supertaça 2024</a>
            <span aria-hidden="true">·</span>
            <a href="#tatica" className="hover:text-slate-300 transition-colors">Tática</a>
            <span aria-hidden="true">·</span>
            <a href="#estatisticas" className="hover:text-slate-300 transition-colors">Estatísticas</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
