
interface WelcomeAttackProps {
  onNext: () => void;
}

const WelcomeAttack = ({ onNext }: WelcomeAttackProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-8xl mb-6">⚔️</div>
          <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
            ATTACK MODE
          </h1>
          <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-red-200 mb-4">
              🔥 BEAST AWAKENING
            </h2>
            <p className="text-xl text-red-100 leading-relaxed mb-6">
              "You don't just solve MCQs. You <strong className="text-white">devour</strong> them."
            </p>
            <p className="text-lg text-red-200">
              Every question is a battle. Every mistake is a lesson. Every streak is a step toward mastery.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">🎯 YOUR BATTLE ARSENAL</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-700/30 rounded-xl p-6">
              <div className="text-orange-400 text-4xl mb-3">⚡</div>
              <h4 className="text-white font-bold text-lg mb-2">Timed Beast Battles</h4>
              <p className="text-slate-300">Intense, focused MCQ sessions with real pressure and streak tracking</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-xl p-6">
              <div className="text-red-400 text-4xl mb-3">🧠</div>
              <h4 className="text-white font-bold text-lg mb-2">Confidence Mastery</h4>
              <p className="text-slate-300">Track confidence levels and eliminate overconfidence patterns</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-xl p-6">
              <div className="text-yellow-400 text-4xl mb-3">🔍</div>
              <h4 className="text-white font-bold text-lg mb-2">Forced Reflection</h4>
              <p className="text-slate-300">Mandatory "why was I wrong?" analysis for every mistake</p>
            </div>
            
            <div className="bg-slate-700/30 rounded-xl p-6">
              <div className="text-green-400 text-4xl mb-3">📜</div>
              <h4 className="text-white font-bold text-lg mb-2">Beast Arsenal</h4>
              <p className="text-slate-300">Auto-generated revision sheets of your hardest battles</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 rounded-xl p-6 mb-6">
            <h4 className="text-white font-bold text-lg mb-3">🔥 Beast Stats (Coming Soon)</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-black text-red-400">0</div>
                <div className="text-sm text-red-200">Battles Won</div>
              </div>
              <div>
                <div className="text-2xl font-black text-orange-400">0</div>
                <div className="text-sm text-orange-200">Beast Streak</div>
              </div>
              <div>
                <div className="text-2xl font-black text-yellow-400">0</div>
                <div className="text-sm text-yellow-200">Mastery Score</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 mb-6">
            <h4 className="text-red-200 font-semibold mb-3">🎯 The Beast Mindset:</h4>
            <div className="text-left space-y-2 text-red-100">
              <p>• <strong>No skipping</strong> - Face every question head-on</p>
              <p>• <strong>Confidence first</strong> - Rate your certainty before answering</p>
              <p>• <strong>Learn from pain</strong> - Reflect on every mistake immediately</p>
              <p>• <strong>Build streaks</strong> - Turn difficulty into power</p>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black text-2xl px-12 py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
        >
          🔥 ENTER THE BATTLEFIELD
        </button>
        
        <p className="text-slate-400 text-sm mt-6">
          "Every expert was once a beginner. Every pro was once an amateur. Every beast was once scared."
        </p>
      </div>
    </div>
  );
};

export default WelcomeAttack;
