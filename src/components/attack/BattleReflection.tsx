
interface BattleReflectionProps {
  sessionData: any;
  updateSessionData: (data: any) => void;
  onNext: () => void;
}

const BattleReflection = ({ sessionData, updateSessionData, onNext }: BattleReflectionProps) => {
  const correctAnswers = sessionData.answers.filter((a: any) => a.isCorrect).length;
  const totalQuestions = sessionData.answers.length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              🔍 BATTLE REFLECTION
            </h2>
            <p className="text-xl text-slate-300">
              "Every mistake is a lesson. Every victory is progress."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-900/30 border border-green-700/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-green-400 mb-2">{correctAnswers}</div>
              <div className="text-green-200">Correct Answers</div>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-blue-400 mb-2">{accuracy}%</div>
              <div className="text-blue-200">Accuracy</div>
            </div>
            
            <div className="bg-orange-900/30 border border-orange-700/50 rounded-xl p-6 text-center">
              <div className="text-3xl font-black text-orange-400 mb-2">{sessionData.beastScore}</div>
              <div className="text-orange-200">Beast Score</div>
            </div>
          </div>

          <div className="bg-slate-700/30 rounded-xl p-6 mb-8">
            <h3 className="text-white font-semibold mb-4">📊 Battle Analysis:</h3>
            <p className="text-slate-300 mb-4">
              Your battle performance shows {accuracy >= 80 ? 'excellent' : accuracy >= 60 ? 'good' : 'developing'} mastery. 
              Focus on the areas where confidence didn't match performance for maximum growth.
            </p>
            
            {sessionData.streakCount >= 3 && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                <p className="text-red-200">
                  🔥 <strong>Beast Mode Activated!</strong> Your {sessionData.streakCount}-question streak shows true warrior focus!
                </p>
              </div>
            )}
          </div>

          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-black text-xl py-6 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            📜 GENERATE BEAST ARSENAL
          </button>
        </div>
      </div>
    </div>
  );
};

export default BattleReflection;
