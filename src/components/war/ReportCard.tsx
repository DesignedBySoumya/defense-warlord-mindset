
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useBattleStore } from "@/stores/battleStore";

interface ReportCardProps {
  onNext: () => void;
  onNewBattle: () => void;
}

const ReportCard = ({ onNext, onNewBattle }: ReportCardProps) => {
  const { config, timeLeft, totalDuration, addReport, resetBattle } = useBattleStore();
  
  const [reportData, setReportData] = useState({
    totalQuestions: '',
    attempted: '',
    correct: '',
    subjects: {
      math: { attempted: '', correct: '' },
      english: { attempted: '', correct: '' },
      reasoning: { attempted: '', correct: '' },
      gk: { attempted: '', correct: '' }
    },
    reflection: ''
  });

  const sessionDuration = Math.floor((totalDuration - timeLeft) / 60);
  const accuracy = reportData.attempted && reportData.correct 
    ? Math.round((parseInt(reportData.correct) / parseInt(reportData.attempted)) * 100)
    : 0;

  const handleSaveReport = () => {
    if (!config) return;

    const report = {
      id: Date.now(),
      date: new Date().toISOString(),
      config,
      sessionStats: {
        duration: sessionDuration,
        accuracy,
        focusHealth: 85, // Mock data for now
        focusScore: 78,
        tabSwitches: 2
      },
      performance: reportData,
      timestamp: Date.now()
    };

    addReport(report);
    resetBattle();
    onNext();
  };

  const handleNewBattle = () => {
    resetBattle();
    onNewBattle();
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No battle data found</h2>
          <Button onClick={onNewBattle}>Start New Battle</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-4">
            ⚔️ BATTLE REPORT
          </h1>
          <p className="text-slate-300 text-lg">
            Debrief your performance, warrior
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Battle Stats */}
          <div className="bg-slate-700/30 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">⚡ BATTLE STATS</h2>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-black text-orange-400 mb-1">
                  {sessionDuration}
                </div>
                <div className="text-slate-300">MINUTES CONQUERED</div>
              </div>
              <div>
                <div className="text-slate-400 text-sm">Battle Type:</div>
                <div className="text-white font-semibold uppercase">
                  {config.testType.replace('-', ' ')}
                </div>
              </div>
              {accuracy > 0 && (
                <div>
                  <div className="text-slate-400 text-sm">Accuracy:</div>
                  <div className={`text-2xl font-bold ${
                    accuracy >= 80 ? 'text-yellow-400' : 
                    accuracy >= 60 ? 'text-orange-400' : 'text-red-400'
                  }`}>
                    {accuracy}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">🎯 Overall Performance</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Total Questions</label>
                  <Input
                    type="number"
                    value={reportData.totalQuestions}
                    onChange={(e) => setReportData(prev => ({ ...prev, totalQuestions: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Attempted</label>
                  <Input
                    type="number"
                    value={reportData.attempted}
                    onChange={(e) => setReportData(prev => ({ ...prev, attempted: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-1">Correct</label>
                  <Input
                    type="number"
                    value={reportData.correct}
                    onChange={(e) => setReportData(prev => ({ ...prev, correct: e.target.value }))}
                    className="bg-slate-700/50 border-slate-600 text-white"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">📚 Subject-wise Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(reportData.subjects).map(([subject, data]) => (
                  <div key={subject} className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-white font-semibold mb-2 capitalize">{subject}</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="number"
                        placeholder="Att."
                        value={data.attempted}
                        onChange={(e) => setReportData(prev => ({
                          ...prev,
                          subjects: {
                            ...prev.subjects,
                            [subject]: { ...prev.subjects[subject as keyof typeof prev.subjects], attempted: e.target.value }
                          }
                        }))}
                        className="bg-slate-600/50 border-slate-500 text-white text-sm"
                      />
                      <Input
                        type="number"
                        placeholder="Cor."
                        value={data.correct}
                        onChange={(e) => setReportData(prev => ({
                          ...prev,
                          subjects: {
                            ...prev.subjects,
                            [subject]: { ...prev.subjects[subject as keyof typeof prev.subjects], correct: e.target.value }
                          }
                        }))}
                        className="bg-slate-600/50 border-slate-500 text-white text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">🧠 Battle Reflection</h3>
              <Textarea
                value={reportData.reflection}
                onChange={(e) => setReportData(prev => ({ ...prev, reflection: e.target.value }))}
                placeholder="How did the battle go? What did you learn? What will you improve next time?"
                className="bg-slate-700/50 border-slate-600 text-white min-h-[100px]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={handleSaveReport}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-lg px-8 py-3"
          >
            ⚔️ SAVE BATTLE REPORT
          </Button>
          <Button
            onClick={handleNewBattle}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 font-black text-lg px-8 py-3"
          >
            🔄 NEW BATTLE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
