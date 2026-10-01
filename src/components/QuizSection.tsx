import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/ivanJaimeData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // Prevent changing after selection
    setSelectedOption(idx);
    setShowExplanation(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  const getRank = () => {
    if (score === 5) return { title: "Olheiro de Elite & Especialista no Dragão", badge: "🏆", desc: "Acertou em cheio! Conhece cada detalhe da vida e carreira do mágico Iván Jaime." };
    if (score >= 3) return { title: "Conhecedor Aprovado", badge: "⭐", desc: "Muito bom resultado! Acompanha de perto a trajetória do médio espanhol." };
    return { title: "Adepto Curioso", badge: "⚽", desc: "Bom esforço! Explore os capítulos da biografia e tente novamente para gabaritar o teste." };
  };

  return (
    <section className="py-16 md:py-24 border-b border-slate-800/80 bg-[#080d17]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <HelpCircle className="h-4 w-4" />
            <span>Trivia & Quiz Interativo</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>5 Perguntas</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
            O Quão Bem Conheces Iván Jaime?
          </h2>
          <p className="mt-2 text-slate-300 text-sm sm:text-base">
            Teste os seus conhecimentos sobre as raízes em Málaga, os prémios no Famalicão e as conquistas no FC Porto.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="rounded-2xl border border-slate-800 bg-[#0b1120] p-6 sm:p-10 shadow-2xl">
          
          {!quizFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono-numbers">
                <span>Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
                <span className="text-amber-400 font-bold">Pontuação Atual: {score}</span>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-6">
                <div 
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-6">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  
                  let optionStyle = "border-slate-800 bg-slate-900/60 text-slate-200 hover:bg-slate-800 hover:border-slate-700";
                  
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      optionStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                    } else if (isSelected) {
                      optionStyle = "border-red-500 bg-red-950/40 text-red-200";
                    } else {
                      optionStyle = "border-slate-800/60 bg-slate-950/40 text-slate-500 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={selectedOption !== null}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm transition-all cursor-pointer ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                      )}
                      {selectedOption !== null && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {showExplanation && (
                <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                    <span className="font-bold text-blue-400 block mb-1">Explicação Histórica:</span>
                    {currentQ.explanation}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white shadow transition-all cursor-pointer"
                    >
                      {currentQuestionIndex + 1 === QUIZ_QUESTIONS.length ? 'Ver Resultado Final' : 'Próxima Pergunta'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Quiz Completed Screen */
            <div className="text-center py-6">
              <div className="text-5xl mb-3">{getRank().badge}</div>
              <h3 className="font-display text-2xl font-bold text-white">
                {getRank().title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 max-w-md mx-auto">
                {getRank().desc}
              </p>

              <div className="my-6 inline-block rounded-2xl bg-slate-950 border border-slate-800 p-6">
                <div className="text-xs text-slate-400 uppercase font-medium">Acertos no Quiz</div>
                <div className="font-mono-numbers text-4xl font-extrabold text-blue-400 mt-1">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
              </div>

              <div>
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Repetir Quiz</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
