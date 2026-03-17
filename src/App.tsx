import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  BarChart3, 
  Mic2, 
  ChevronRight, 
  ArrowLeft, 
  Send, 
  Loader2,
  Trophy,
  Target,
  Activity
} from 'lucide-react';
import Markdown from 'react-markdown';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PERSONAS, Persona, PersonaConfig } from './types';
import { generateBasketballContent } from './services/geminiService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePersonaSelect = (id: Persona) => {
    setSelectedPersona(id);
    setPrompt(PERSONAS[id].defaultPrompt);
    setResponse(null);
  };

  const handleGenerate = async () => {
    if (!selectedPersona || !prompt.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    try {
      const result = await generateBasketballContent(PERSONAS[selectedPersona], prompt);
      setResponse(result || 'No response generated.');
    } catch (error) {
      console.error('Generation failed:', error);
      setResponse('Error generating content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const persona = selectedPersona ? PERSONAS[selectedPersona] : null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans basketball-grid">
      {/* Header */}
      <header className="border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedPersona(null)}>
            <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-600/20">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display text-2xl tracking-tighter uppercase italic">
              Hoops<span className="text-orange-500">Master</span> AI
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>Live Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3" />
              <span>Precision Mode</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {!selectedPersona ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl md:text-7xl font-display uppercase italic tracking-tighter leading-none"
                >
                  Choose Your <span className="text-orange-500">Game</span>
                </motion.h2>
                <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                  Select an AI persona tailored to your basketball needs. From tactical coaching to deep statistical analysis and cinematic storytelling.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(Object.values(PERSONAS) as PersonaConfig[]).map((p) => (
                  <motion.button
                    key={p.id}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePersonaSelect(p.id)}
                    className={cn(
                      "group relative p-8 rounded-2xl border text-left transition-all duration-300 overflow-hidden",
                      "bg-zinc-900/50 border-white/10 hover:border-orange-500/50 hover:bg-zinc-900"
                    )}
                  >
                    <div className={cn(
                      "absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20",
                      p.id === 'coach' ? "bg-emerald-500" : p.id === 'analyst' ? "bg-blue-500" : "bg-orange-500"
                    )} />
                    
                    <div className="relative z-10 space-y-6">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center",
                        p.id === 'coach' ? "bg-emerald-500/20 text-emerald-400" : 
                        p.id === 'analyst' ? "bg-blue-500/20 text-blue-400" : 
                        "bg-orange-500/20 text-orange-400"
                      )}>
                        {p.id === 'coach' && <Dumbbell className="w-6 h-6" />}
                        {p.id === 'analyst' && <BarChart3 className="w-6 h-6" />}
                        {p.id === 'storyteller' && <Mic2 className="w-6 h-6" />}
                      </div>
                      
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-1 block">
                          {p.subtitle}
                        </span>
                        <h3 className="text-2xl font-display uppercase italic tracking-tight group-hover:text-orange-500 transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Enter Court <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="interaction"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Sidebar / Info */}
              <div className="lg:col-span-4 space-y-6">
                <button 
                  onClick={() => setSelectedPersona(null)}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-mono uppercase tracking-widest"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Locker Room
                </button>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/10 space-y-4">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center",
                    persona?.id === 'coach' ? "bg-emerald-500/20 text-emerald-400" : 
                    persona?.id === 'analyst' ? "bg-blue-500/20 text-blue-400" : 
                    "bg-orange-500/20 text-orange-400"
                  )}>
                    {persona?.id === 'coach' && <Dumbbell className="w-8 h-8" />}
                    {persona?.id === 'analyst' && <BarChart3 className="w-8 h-8" />}
                    {persona?.id === 'storyteller' && <Mic2 className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-3xl font-display uppercase italic tracking-tight">
                      {persona?.title}
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2">
                      {persona?.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">System Directives</h4>
                    <div className="text-xs text-zinc-500 italic leading-relaxed">
                      "{persona?.systemInstruction}"
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
                    Your Inquiry
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask your question..."
                    className="w-full h-48 p-4 rounded-xl bg-zinc-900 border border-white/10 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 outline-none transition-all resize-none text-sm leading-relaxed"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:bg-zinc-800 disabled:text-zinc-600 font-display uppercase italic tracking-wider text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Play...
                      </>
                    ) : (
                      <>
                        Execute Play <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Content / Result */}
              <div className="lg:col-span-8">
                <div className="min-h-[600px] rounded-2xl bg-zinc-900/30 border border-white/10 overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-white/10 bg-zinc-900/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Output Stream</span>
                    </div>
                    {response && (
                      <span className="text-[10px] font-mono text-zinc-600 uppercase">
                        Generation Complete
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {isLoading ? (
                      <div className="h-full flex flex-col items-center justify-center space-y-6 text-zinc-500">
                        <div className="relative">
                          <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
                          <div className="absolute inset-0 blur-xl bg-orange-500/20 animate-pulse" />
                        </div>
                        <div className="text-center">
                          <p className="font-display uppercase tracking-widest text-xl text-zinc-300">Processing Data</p>
                          <p className="text-xs font-mono mt-2">Consulting with the {persona?.title}...</p>
                        </div>
                      </div>
                    ) : response ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="markdown-body"
                      >
                        <Markdown>{response}</Markdown>
                      </motion.div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4">
                        <Target className="w-16 h-16 opacity-10" />
                        <p className="font-mono text-sm uppercase tracking-widest">Awaiting Input</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
            © 2026 Hoops Master AI // Powered by Gemini 3 Flash
          </p>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System Status: Optimal</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
