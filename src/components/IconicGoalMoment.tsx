import React, { useState, useEffect, useRef } from 'react';
import { ICONIC_GOALS, IconicGoal } from '../data/ivanJaimeData';
import { Play, Square, Volume2, VolumeX, ShieldCheck, Flame, Compass, Radio, ExternalLink, Video, Eye } from 'lucide-react';

export const IconicGoalMoment: React.FC = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('supercup-2024');
  const [activeMediaMode, setActiveMediaMode] = useState<'video' | 'pitch'>('video');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  const selectedGoal = ICONIC_GOALS.find(g => g.id === selectedGoalId) || ICONIC_GOALS[0];

  // Audio Context and Speech Synthesis references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Stop audio and speech on goal change or unmount
  useEffect(() => {
    stopAllAudio();
    return () => {
      stopAllAudio();
    };
  }, [selectedGoalId]);

  // Synthesize realistic stadium crowd noise with Web Audio API
  const startCrowdAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Generate 2 seconds of pink/brown crowd noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Resonant bandpass filter to sound like an arena crowd
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 650;
      filter.Q.value = 2.0;

      // Gain envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.22, ctx.currentTime + 0.6);

      whiteNoise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      whiteNoise.start(0);
      noiseNodeRef.current = whiteNoise;
      gainNodeRef.current = gainNode;

      // Play a short whistle chirp at the beginning
      playWhistle(ctx);
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const playWhistle = (ctx: AudioContext) => {
    try {
      const osc = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.15);

      whistleGain.gain.setValueAtTime(isMuted ? 0 : 0.12, ctx.currentTime);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.connect(whistleGain);
      whistleGain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (err) {
      // Ignored
    }
  };

  const stopAllAudio = () => {
    setIsPlayingAudio(false);
    setAudioProgress(0);

    // Cancel Web Speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Stop Web Audio crowd noise
    try {
      if (noiseNodeRef.current) {
        (noiseNodeRef.current as any).stop?.();
        noiseNodeRef.current.disconnect();
        noiseNodeRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.suspend();
      }
    } catch (e) {
      // Ignored
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handlePlayRadioCommentary = () => {
    if (isPlayingAudio) {
      stopAllAudio();
      return;
    }

    setIsPlayingAudio(true);
    startCrowdAudio();

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(selectedGoal.radioCommentary);
      
      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find(v => v.lang.startsWith('pt')) || voices.find(v => v.lang.includes('PT')) || null;
      if (ptVoice) {
        utterance.voice = ptVoice;
      }
      utterance.lang = 'pt-PT';
      utterance.rate = 1.08;
      utterance.pitch = 1.05;

      const startTime = Date.now();
      const approxDuration = (selectedGoal.radioCommentary.length / 15) * 1000;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, (elapsed / approxDuration) * 100);
        setAudioProgress(progress);

        if (progress < 100 && isPlayingAudio) {
          animationFrameRef.current = requestAnimationFrame(updateProgress);
        }
      };

      utterance.onstart = () => {
        animationFrameRef.current = requestAnimationFrame(updateProgress);
      };

      utterance.onend = () => {
        stopAllAudio();
      };

      utterance.onerror = () => {
        stopAllAudio();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        stopAllAudio();
      }, 8000);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        !isMuted ? 0.0001 : 0.22,
        audioCtxRef.current.currentTime
      );
    }
  };

  const youtubeWatchUrl = selectedGoal.youtubeVideoId
    ? `https://www.youtube.com/watch?v=${selectedGoal.youtubeVideoId}`
    : `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedGoal.youtubeSearchQuery)}`;

  return (
    <section id="supertaca" className="py-16 md:py-24 border-b border-slate-800/80 bg-[#060a12] relative overflow-hidden">
      
      {/* Background stadium floodlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            <Flame className="h-4 w-4" />
            <span>Momentos Lendários de Iván Jaime</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Vídeos Reais & Relatos da Rádio</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            A Supertaça de Aveiro & O Golo dos 101 Minutos
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Veja as imagens reais da transmissão televisiva no YouTube ou ouça o relato emocionante narrado com áudio de estádio.
          </p>
        </div>

        {/* Goal Selector Switcher */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {ICONIC_GOALS.map((goal) => {
            const isSelected = goal.id === selectedGoalId;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoalId(goal.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-900/40'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className="font-mono text-xs opacity-80 mr-1.5">{goal.minute}</span>
                <span>{goal.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Display: Interactive Goal Theater */}
        <div className="mt-8 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-[#0a101d] to-[#070b14] p-6 sm:p-10 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Visual Media Viewer (6 Cols) */}
            <div className="lg:col-span-6 space-y-3">
              
              {/* Media Mode Tabs */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                  <button
                    onClick={() => setActiveMediaMode('video')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeMediaMode === 'video'
                        ? 'bg-red-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Video className="h-3.5 w-3.5" />
                    <span>Vídeo Real YouTube</span>
                  </button>
                  <button
                    onClick={() => setActiveMediaMode('pitch')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      activeMediaMode === 'pitch'
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Radar Tático 2D</span>
                  </button>
                </div>

                {/* External YouTube link */}
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  <span>Abrir no YouTube</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              {/* YouTube Video Embed OR Pitch View */}
              {activeMediaMode === 'video' ? (
                <div className="relative aspect-[16/10] w-full rounded-xl bg-black border border-red-900/40 overflow-hidden shadow-2xl">
                  {selectedGoal.youtubeVideoId ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedGoal.youtubeVideoId}?rel=0`}
                      title={selectedGoal.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    /* Fallback Card for goals without direct embed with 1-click YouTube Search */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-[#0d1527] to-[#080d19]">
                      <div className="h-12 w-12 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center mb-3 border border-red-500/30">
                        <Video className="h-6 w-6" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        Transmissão Oficial: {selectedGoal.match}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-xs mb-4">
                        Consulte as gravações e relatos oficiais deste golo registados pela Sport TV e rádios portuguesas no YouTube.
                      </p>
                      <a
                        href={youtubeWatchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-900/30 transition-all hover:scale-105"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Ver Relatos e Vídeo no YouTube</span>
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                /* Interactive Tactical 2D Pitch Diagram */
                <div className="relative aspect-[16/10] w-full rounded-xl bg-[#071322] border border-blue-900/50 overflow-hidden p-4 flex flex-col justify-between pitch-pattern shadow-inner">
                  <svg className="absolute inset-0 h-full w-full opacity-30 pointer-events-none" viewBox="0 0 500 320">
                    <rect x="100" y="20" width="300" height="280" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <rect x="180" y="20" width="140" height="100" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    <rect x="210" y="10" width="80" height="20" fill="none" stroke="#fbbf24" strokeWidth="2" />
                    <circle cx="250" cy="180" r="3" fill="#60a5fa" />
                    <path d="M 180,200 A 70,70 0 0,0 320,200" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    
                    {selectedGoalId === 'supercup-2024' && (
                      <g>
                        <path 
                          d="M 230,225 Q 210,130 248,32" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="3" 
                          strokeDasharray="6,4"
                          className={isPlayingAudio ? "animate-pulse stroke-amber-300" : ""}
                        />
                        <circle cx="230" cy="225" r="9" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        <text x="245" y="230" fill="#ffffff" fontSize="12" fontWeight="bold">Iván Jaime (101')</text>
                        <circle cx="245" cy="45" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx="248" cy="30" r="5" fill="#10b981" />
                      </g>
                    )}

                    {selectedGoalId === 'dragao-2023' && (
                      <g>
                        <path 
                          d="M 140,160 Q 200,90 280,30" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="3" 
                          strokeDasharray="6,4"
                          className={isPlayingAudio ? "animate-pulse stroke-amber-300" : ""}
                        />
                        <circle cx="140" cy="160" r="9" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2" />
                        <text x="70" y="165" fill="#93c5fd" fontSize="11" fontWeight="bold">Iván Jaime</text>
                        <circle cx="280" cy="30" r="5" fill="#10b981" />
                      </g>
                    )}

                    {selectedGoalId !== 'supercup-2024' && selectedGoalId !== 'dragao-2023' && (
                      <g>
                        <path 
                          d="M 200,180 Q 220,100 240,30" 
                          fill="none" 
                          stroke="#f59e0b" 
                          strokeWidth="3" 
                          strokeDasharray="6,4"
                          className={isPlayingAudio ? "animate-pulse stroke-amber-300" : ""}
                        />
                        <circle cx="200" cy="180" r="9" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
                        <text x="215" y="185" fill="#ffffff" fontSize="11" fontWeight="bold">Iván Jaime</text>
                        <circle cx="240" cy="30" r="5" fill="#10b981" />
                      </g>
                    )}
                  </svg>

                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-slate-300 font-mono text-[11px] border border-white/10">
                      {selectedGoal.match}
                    </div>
                    <div className="bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded text-[11px] font-bold">
                      Minuto {selectedGoal.minute}
                    </div>
                  </div>
                </div>
              )}

              {/* Audio Controls Bar */}
              <div className="flex items-center justify-between bg-black/70 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayRadioCommentary}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-semibold text-white shadow transition-all active:scale-95 cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Square className="h-3.5 w-3.5 fill-white" />
                        <span>Parar Relato</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5 fill-white" />
                        <span>Ouvir Relato da Rádio</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded text-slate-400 hover:text-white"
                    title={isMuted ? "Ativar som de ambiente" : "Silenciar som de estádio"}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-blue-400" />}
                  </button>
                </div>

                {/* Sound Wave Equalizer Animation */}
                {isPlayingAudio ? (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-4 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1 h-3 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    <div className="w-1 h-5 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
                    <span className="text-[10px] text-amber-300 font-bold ml-1">EM DIRETO</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-400 font-mono-numbers">
                    {selectedGoal.competition}
                  </span>
                )}
              </div>
            </div>

            {/* Narrative & Tactical Dissection (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono-numbers">
                <span className="text-amber-400 font-bold">{selectedGoal.date}</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span>{selectedGoal.competition}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {selectedGoal.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {selectedGoal.description}
              </p>

              {/* Live Radio Broadcast Transcription Card */}
              <div className={`p-4 rounded-xl border transition-all ${
                isPlayingAudio 
                  ? 'border-amber-400/60 bg-amber-950/20 shadow-lg shadow-amber-950/30' 
                  : 'border-slate-800 bg-slate-950/60'
              }`}>
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <Radio className={`h-4 w-4 ${isPlayingAudio ? 'animate-pulse text-amber-300' : ''}`} />
                    <span>Transcrição do Relato de Rádio:</span>
                  </div>
                  {isPlayingAudio && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-600 text-white font-bold tracking-wider animate-pulse">
                      AR TRANSMISSÃO
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 italic font-medium leading-relaxed">
                  "{selectedGoal.radioCommentary}"
                </p>
                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <button
                    onClick={handlePlayRadioCommentary}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    {isPlayingAudio ? 'Parar emissão áudio' : 'Ouvir locução com som de estádio ▶'}
                  </button>

                  <a
                    href={youtubeWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1"
                  >
                    <span>Pesquisar relatos no YouTube</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Tactical note */}
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1">
                <div className="flex items-center gap-2 font-bold text-blue-400">
                  <Compass className="h-4 w-4" />
                  <span>Análise Tática do Lance:</span>
                </div>
                <p className="text-slate-300 leading-normal">
                  {selectedGoal.tacticalNote}
                </p>
              </div>

              {/* Impact Callout */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-transparent border border-amber-500/20 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Impacto Histórico:</span>
                </div>
                <p className="text-slate-300">
                  {selectedGoal.impact}
                </p>
              </div>

            </div>

          </div>

          {/* Special Supercup 2024 Timeline Breakdown */}
          {selectedGoalId === 'supercup-2024' && (
            <div className="mt-10 pt-8 border-t border-slate-800">
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 text-center">
                A Cronologia da Loucura em Aveiro (0-3 ➔ 4-3)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">6' Minuto</div>
                  <div className="font-bold text-red-400">0 - 1</div>
                  <div className="text-[10px] text-slate-400 truncate">G. Inácio</div>
                </div>
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">9' Minuto</div>
                  <div className="font-bold text-red-400">0 - 2</div>
                  <div className="text-[10px] text-slate-400 truncate">Pedro Gonçalves</div>
                </div>
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">24' Minuto</div>
                  <div className="font-bold text-red-400">0 - 3</div>
                  <div className="text-[10px] text-slate-400 truncate">Geovany Quenda</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">28' Minuto</div>
                  <div className="font-bold text-blue-400">1 - 3</div>
                  <div className="text-[10px] text-slate-300 truncate">Galeno</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">64' Minuto</div>
                  <div className="font-bold text-blue-400">2 - 3</div>
                  <div className="text-[10px] text-slate-300 truncate">Nico González</div>
                </div>
                <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                  <div className="font-mono-numbers text-slate-400 text-[10px]">66' Minuto</div>
                  <div className="font-bold text-blue-400">3 - 3</div>
                  <div className="text-[10px] text-slate-300 truncate">Galeno (Empate)</div>
                </div>
                <div className="p-2.5 rounded-lg bg-gradient-to-b from-amber-500/20 to-blue-600/30 border border-amber-400/50 shadow-md">
                  <div className="font-mono-numbers text-amber-300 text-[10px] font-bold">101' Prolong.</div>
                  <div className="font-bold text-amber-400 text-sm">4 - 3</div>
                  <div className="text-[11px] text-white font-extrabold truncate">IVÁN JAIME ⚽</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
