
interface BeastSheetProps {
  sessionData: any;
  onReturnToBattle: () => void;
}

const BeastSheet = ({ sessionData, onReturnToBattle }: BeastSheetProps) => {
  const wrongAnswers = sessionData.answers.filter((a: any) => !a.isCorrect);
  const hardQuestions = sessionData.questions.filter((q: any) => q.difficulty === 'hard');

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              📜 BEAST ARSENAL
            </h2>
            <p className="text-xl text-slate-300">
              "Your personalized revision sheet forged in battle"
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6">
              <h3 className="text-red-200 font-semibold mb-4">🎯 Questions That Challenged You:</h3>
              <div className="text-sm text-red-100">
                {wrongAnswers.length > 0 ? (
                  <p>{wrongAnswers.length} questions to review and master</p>
                ) : (
                  <p>Perfect battle! All questions conquered! 🔥</p>
                )}
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-700/50 rounded-xl p-6">
              <h3 className="text-orange-200 font-semibold mb-4">⚡ Beast-Level Questions:</h3>
              <div className="text-sm text-orange-100">
                <p>{hardQuestions.length} hard questions encountered</p>
                <p>Each one makes you stronger for the real battle</p>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-6">
              <h3 className="text-green-200 font-semibold mb-4">📈 Growth Insights:</h3>
              <div className="text-sm text-green-100 space-y-2">
                <p>• Subject: {sessionData.subject}</p>
                <p>• Topic: {sessionData.topic}</p>
                <p>• Beast Score: {sessionData.beastScore}</p>
                <p>• Max Streak: {sessionData.streakCount}</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={onReturnToBattle}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              ⚔️ PLAN NEXT BATTLE
            </button>
            
            <button
              onClick={() => window.print()}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-black text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              🖨️ PRINT ARSENAL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeastSheet;
