/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BiographyOrigins } from './components/BiographyOrigins';
import { CareerTimeline } from './components/CareerTimeline';
import { IconicGoalMoment } from './components/IconicGoalMoment';
import { TacticalRadar } from './components/TacticalRadar';
import { StatsTable } from './components/StatsTable';
import { TrophyCabinet } from './components/TrophyCabinet';
import { GeminiScout } from './components/GeminiScout';
import { QuizSection } from './components/QuizSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToScout = () => {
    const el = document.getElementById('scout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSupercup = () => {
    const el = document.getElementById('supertaca');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenAiScout={scrollToScout} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenAiScout={scrollToScout} onExploreGoal={scrollToSupercup} />

        {/* Biografia & Origens em Málaga */}
        <BiographyOrigins />

        {/* Trajetória Completa: Málaga -> Famalicão -> FC Porto */}
        <CareerTimeline />

        {/* O Momento Decisivo: A Supertaça 2024 e o Golo aos 101 Minutos */}
        <IconicGoalMoment />

        {/* Perfil Tático: Mapa de Calor Interativo & Atributos */}
        <TacticalRadar />

        {/* Registo Estatístico Época a Época */}
        <StatsTable />

        {/* Gabinete de Troféus & Reconhecimento */}
        <TrophyCabinet />

        {/* Scout IA Powered by Gemini 3.8 Flash */}
        <GeminiScout />

        {/* Quiz Interativo de Conhecimentos */}
        <QuizSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
