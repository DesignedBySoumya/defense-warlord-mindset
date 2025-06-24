
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefenseMode from "@/components/DefenseMode";

const Index = () => {
  const [enterDefense, setEnterDefense] = useState(false);
  const navigate = useNavigate();

  if (enterDefense) {
    return <DefenseMode />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight caret-transparent select-none">
            ⚔️ BATTLEFIELD
          </h1>
          <p className="text-xl text-slate-300 font-medium mb-2 caret-transparent select-none">
            "This is not where toppers win."
          </p>
          <p className="text-2xl text-slate-100 font-bold caret-transparent select-none">
            "This is where losers <span className="text-orange-400">transform into contenders</span>."
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-8 items-stretch">
          {/* Defense Mode */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 lg:p-8 flex flex-col h-full">
            <div className="mb-6 flex-grow">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 caret-transparent select-none">
                🛡️ DEFENSE
              </h2>
              <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6 caret-transparent select-none">
                Build your <strong className="text-white">mental weapons</strong>, strategy, energy, and rituals.
              </p>
            </div>
            
            <div className="text-left space-y-3 mb-6">
              <div className="flex items-center text-slate-200">
                <span className="text-blue-400 mr-3">🧱</span>
                <span className="caret-transparent select-none">Foundation over speed</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-blue-400 mr-3">🎯</span>
                <span className="caret-transparent select-none">Pure focus, zero distractions</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-blue-400 mr-3">🧠</span>
                <span className="caret-transparent select-none">Self-respect through discipline</span>
              </div>
            </div>

            <button
              onClick={() => setEnterDefense(true)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl mt-auto"
            >
              ENTER DEFENSE MODE
            </button>
          </div>

          {/* Attack Mode */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 lg:p-8 flex flex-col h-full">
            <div className="mb-6 flex-grow">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 caret-transparent select-none">
                ⚔️ ATTACK
              </h2>
              <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6 caret-transparent select-none">
                Master <strong className="text-white">MCQs with confidence</strong>, reflection, and beast-like intensity.
              </p>
            </div>
            
            <div className="text-left space-y-3 mb-6">
              <div className="flex items-center text-slate-200">
                <span className="text-red-400 mr-3">🔥</span>
                <span className="caret-transparent select-none">Timed battle sessions</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-red-400 mr-3">🎯</span>
                <span className="caret-transparent select-none">Confidence tracking & reflection</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-red-400 mr-3">⚡</span>
                <span className="caret-transparent select-none">Beast-mode streaks & gamification</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/attack')}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl mt-auto"
            >
              ENTER ATTACK MODE
            </button>
          </div>

          {/* War Mode */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 lg:p-8 flex flex-col h-full">
            <div className="mb-6 flex-grow">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-4 caret-transparent select-none">
                🏹 WAR
              </h2>
              <p className="text-slate-300 text-base lg:text-lg leading-relaxed mb-6 caret-transparent select-none">
                Prepare like a <strong className="text-white">marksman</strong>. Mock battles, exam pressure drills, and strategic training to master the real fight.
              </p>
            </div>
            
            <div className="text-left space-y-3 mb-6">
              <div className="flex items-center text-slate-200">
                <span className="text-orange-400 mr-3">🎯</span>
                <span className="caret-transparent select-none">Full-length and subject-wise test drills</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-orange-400 mr-3">⚔️</span>
                <span className="caret-transparent select-none">Test pressure training with war-tuned environment</span>
              </div>
              <div className="flex items-center text-slate-200">
                <span className="text-orange-400 mr-3">📈</span>
                <span className="caret-transparent select-none">Deep analysis to expose weaknesses before the real fight</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/war')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl mt-auto"
            >
              ENTER WAR MODE
            </button>
          </div>
        </div>
        
        <p className="text-slate-400 text-sm caret-transparent select-none">
          "Defense is not weakness. Attack is not aggression. War is not violence. All are <strong>discipline without applause</strong>."
        </p>
      </div>
    </div>
  );
};

export default Index;
