import React from 'react';
import { IVAN_JAIME_BIO } from '../data/ivanJaimeData';
import { Sparkles, Heart, Quote, Compass, BookOpen, Shield } from 'lucide-react';

export const BiographyOrigins: React.FC = () => {
  return (
    <section id="biografia" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#090d16]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            <BookOpen className="h-4 w-4" />
            <span>Biografia & Perfil Humano</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Origens Andaluzas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            O Menino de Málaga que Sonhava com as Noites Europeias
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Por trás do talento refinado com a bola nos pés está a história de um jovem humilde, 
            apaixonado pela família e pelo jogo, que aprendeu a arte da paciência e da superação física.
          </p>
        </div>

        {/* Narrative & Insight Bento Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0c1222] p-6 sm:p-8 space-y-5 text-sm sm:text-base text-slate-300 leading-relaxed">
            <h3 className="font-display text-xl font-bold text-white">
              De La Rosaleda ao Estádio do Dragão: A Formação de um Criativo Puro
            </h3>

            <p>
              Iván Jaime Pajuelo nasceu em Málaga no início do outono de 2000. Desde cedo, as ruas e os campos 
              de terra da Andaluzia serviram de laboratório para a sua técnica apurada. Aos 11 anos entrou 
              nos escalões de formação do Málaga CF, um clube com vasta tradição na lapidação de médios criativos 
              (como Isco ou Brahim Díaz).
            </p>

            <p>
              Ao longo de quase uma década na academia malaguenha, Iván destacou-se pela forma como protegia 
              a bola usando o corpo e pela capacidade invulgar de rodar sobre a pressão adversária num único toque. 
              Em 2018, quando o Málaga desceu à Segunda División, Iván Jaime foi integrado de imediato nos treinos 
              da equipa principal e chamado para as seleções jovens de Espanha.
            </p>

            <p>
              A passagem para Portugal, em setembro de 2020 para representar o FC Famalicão, foi uma decisão 
              corajosa para um jovem de 19 anos fora do seu país natal. Em Famalicão encontrou um ambiente propício 
              para desenvolver o aspeto tático e defensivo sem perder a irreverência do drible espanhol.
            </p>

            <p>
              Após a consagração e a conquista de títulos pelo FC Porto — com destaque para a Taça de Portugal 2023/24 
              e a inesquecível decisão da Supertaça 2024 —, Iván Jaime expandiu o seu reportório internacional com passagens 
              por empréstimo pelo Valencia CF na LaLiga e pelo CF Montréal na MLS americana. Na época desportiva 2026/27, 
              ao completar 26 anos, regressou a Espanha para liderar o jogo ofensivo da UD Las Palmas, mantendo o seu vínculo 
              contratual de longo prazo com os Dragões até 2028.
            </p>

            {/* Quote Card */}
            <div className="rounded-xl border border-blue-900/40 bg-blue-950/30 p-5 text-sm italic text-blue-200 flex items-start gap-3">
              <Quote className="h-6 w-6 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p>
                  "O Iván Jaime tem aquilo que não se ensina na escola de futebol: o toque de génio no momento em que tudo parece fechado. Ele enxerga espaços onde outros só veem pernas adversárias."
                </p>
                <div className="mt-2 text-xs font-semibold text-blue-300 not-italic font-mono-numbers">
                  — João Pedro Sousa, ex-treinador do FC Famalicão
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Identity Card & Personal Profile (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Identity Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Ficha Pessoal e Biométrica</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Nome Completo:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.fullName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Data de Nascimento:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.birthDate}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Naturalidade:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.birthPlace}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Nacionalidade:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.nationality}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Estatura & Peso:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.height} · {IVAN_JAIME_BIO.weight}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Pé Preferencial:</span>
                  <span className="font-semibold text-white">{IVAN_JAIME_BIO.dominantFoot}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/80">
                  <span className="text-slate-400">Clube Atual (2026/27):</span>
                  <span className="font-semibold text-yellow-400">UD Las Palmas (LaLiga)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Vínculo Contratual:</span>
                  <span className="font-mono-numbers font-bold text-blue-400">FC Porto #17 (Até 2028)</span>
                </div>
              </div>
            </div>

            {/* Mindset & Resilience Card */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#0c1322] p-6">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span>Superação: A Lesão e o Regresso Mais Forte</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Em janeiro de 2022, Iván Jaime sofreu uma grave lesão no joelho que colocou à prova a sua determinação. 
                Durante quase seis meses de recuperação intensiva no departamento médico, trabalhou o ganho de massa muscular 
                e a potência de arranque. O resultado foi a temporada colossal de 2022/23, onde foi considerado por larga margem 
                o melhor sub-23 em Portugal.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
