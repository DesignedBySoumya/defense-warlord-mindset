
import { useState } from "react";
import DefenseMode from "@/components/DefenseMode";

const Index = () => {
  const [enterDefense, setEnterDefense] = useState(false);

  if (enterDefense) {
    return <DefenseMode />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-black text-white mb-4 tracking-tight">
            🛡️ DEFENSE
          </h1>
          <p className="text-xl text-slate-300 font-medium mb-2">
            "This is not where toppers win."
          </p>
          <p className="text-2xl text-slate-100 font-bold">
            "This is where losers <span className="text-orange-400">transform into contenders</span>."
          </p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            You're not solving questions. You're not analyzing mocks.<br/>
            You're building your <strong className="text-white">mental weapons</strong>, strategy, energy, and rituals.
          </p>
          
          <div className="text-left space-y-3 mb-6">
            <div className="flex items-center text-slate-200">
              <span className="text-orange-400 mr-3">🧱</span>
              <span>Foundation over speed</span>
            </div>
            <div className="flex items-center text-slate-200">
              <span className="text-orange-400 mr-3">🎯</span>
              <span>Pure focus, zero distractions</span>
            </div>
            <div className="flex items-center text-slate-200">
              <span className="text-orange-400 mr-3">🧠</span>
              <span>Self-respect through discipline</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setEnterDefense(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white font-black text-xl px-12 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          ENTER DEFENSE MODE
        </button>
        
        <p className="text-slate-400 text-sm mt-6">
          "Defense is not weakness. It is <strong>discipline without applause</strong>."
        </p>
      </div>
    </div>
  );
};

export default Index;
