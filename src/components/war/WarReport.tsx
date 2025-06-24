
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBattleStore } from "@/stores/battleStore";

interface WarReportProps {
  onNewBattle: () => void;
}

const WarReport = ({ onNewBattle }: WarReportProps) => {
  const { reports } = useBattleStore();
  const [activeTab, setActiveTab] = useState("history");

  const getStats = () => {
    if (reports.length === 0) {
      return {
        totalBattles: 0,
        totalStudyTime: 0,
        averageAccuracy: 0,
        currentStreak: 0,
        averageSession: 0,
        totalDistraction: 0
      };
    }

    const totals = reports.reduce((acc, report) => ({
      duration: acc.duration + report.sessionStats.duration,
      accuracy: acc.accuracy + report.sessionStats.accuracy,
      focusScore: acc.focusScore + report.sessionStats.focusScore,
      tabSwitches: acc.tabSwitches + report.sessionStats.tabSwitches
    }), { duration: 0, accuracy: 0, focusScore: 0, tabSwitches: 0 });

    return {
      totalBattles: reports.length,
      totalStudyTime: Math.floor(totals.duration / 60),
      averageAccuracy: Math.round(totals.accuracy / reports.length),
      currentStreak: getCurrentStreak(),
      averageSession: Math.round(totals.duration / reports.length),
      totalDistraction: totals.tabSwitches
    };
  };

  const getCurrentStreak = () => {
    if (reports.length === 0) return 0;
    
    // Simple streak calculation - consecutive days with battles
    let streak = 1;
    const sortedReports = [...reports].sort((a, b) => b.timestamp - a.timestamp);
    
    for (let i = 1; i < sortedReports.length; i++) {
      const currentDate = new Date(sortedReports[i-1].date).toDateString();
      const prevDate = new Date(sortedReports[i].date).toDateString();
      const dayDiff = Math.floor((new Date(currentDate).getTime() - new Date(prevDate).getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const stats = getStats();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (reports.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-2xl">
          <div className="mb-8">
            <h1 className="text-6xl font-black text-white mb-4">⚔️ COMMAND DASHBOARD</h1>
            <p className="text-slate-300 text-xl">Your battle history awaits your first victory</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-12 mb-8">
            <div className="text-8xl mb-6">🏹</div>
            <h2 className="text-3xl font-bold text-white mb-4">No Battles Yet</h2>
            <p className="text-slate-300 text-lg mb-8">
              Every warrior starts with a single battle. Begin your journey to mastery.
            </p>
            <Button
              onClick={onNewBattle}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xl px-12 py-4"
            >
              ⚔️ START FIRST BATTLE
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-white mb-4">⚔️ COMMAND DASHBOARD</h1>
          <p className="text-slate-300 text-lg">Your battle history and performance analytics</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.totalBattles}</div>
            <div className="text-slate-400 text-sm">Total Battles</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.totalStudyTime}h</div>
            <div className="text-slate-400 text-sm">Study Time</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.averageAccuracy}</div>
            <div className="text-slate-400 text-sm">Avg Score</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.currentStreak}</div>
            <div className="text-slate-400 text-sm">Streak Days</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.averageSession}m</div>
            <div className="text-slate-400 text-sm">Avg Session</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center">
            <div className="text-2xl font-black text-orange-400">{stats.totalDistraction}</div>
            <div className="text-slate-400 text-sm">Distractions</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-slate-700/50 mb-6">
              <TabsTrigger value="history" className="text-white">Battle History</TabsTrigger>
              <TabsTrigger value="insights" className="text-white">Insights</TabsTrigger>
              <TabsTrigger value="achievements" className="text-white">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Recent Battles</h3>
              {reports.slice(0, 10).map((report) => (
                <div key={report.id} className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-semibold">
                        {report.config.testType.toUpperCase().replace('-', ' ')} BATTLE
                      </div>
                      <div className="text-slate-400 text-sm">{formatDate(report.date)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 font-bold">{report.sessionStats.accuracy}%</div>
                      <div className="text-slate-400 text-sm">{report.sessionStats.duration}m</div>
                    </div>
                  </div>
                  {report.performance.reflection && (
                    <div className="text-slate-300 text-sm italic">
                      "{report.performance.reflection.substring(0, 100)}..."
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Performance Insights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">📈 Accuracy Trend</h4>
                  <div className="text-slate-300">
                    Your average accuracy is <span className="text-orange-400 font-bold">{stats.averageAccuracy}%</span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">⏰ Time Management</h4>
                  <div className="text-slate-300">
                    Average session: <span className="text-orange-400 font-bold">{stats.averageSession} minutes</span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">🔥 Consistency</h4>
                  <div className="text-slate-300">
                    Current streak: <span className="text-orange-400 font-bold">{stats.currentStreak} days</span>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">🎯 Focus Health</h4>
                  <div className="text-slate-300">
                    Total distractions: <span className="text-orange-400 font-bold">{stats.totalDistraction}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Battle Achievements</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={`border rounded-lg p-4 ${stats.totalBattles >= 1 ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-700/30 border-slate-600'}`}>
                  <div className="text-2xl mb-2">⚔️</div>
                  <div className="text-white font-semibold">First Blood</div>
                  <div className="text-slate-400 text-sm">Complete your first battle</div>
                  <div className="text-xs mt-2 text-orange-400">
                    {stats.totalBattles >= 1 ? 'UNLOCKED' : `${stats.totalBattles}/1`}
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${stats.totalBattles >= 10 ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-700/30 border-slate-600'}`}>
                  <div className="text-2xl mb-2">🏹</div>
                  <div className="text-white font-semibold">Veteran Warrior</div>
                  <div className="text-slate-400 text-sm">Complete 10 battles</div>
                  <div className="text-xs mt-2 text-orange-400">
                    {stats.totalBattles >= 10 ? 'UNLOCKED' : `${stats.totalBattles}/10`}
                  </div>
                </div>
                
                <div className={`border rounded-lg p-4 ${stats.currentStreak >= 7 ? 'bg-orange-500/20 border-orange-500' : 'bg-slate-700/30 border-slate-600'}`}>
                  <div className="text-2xl mb-2">🔥</div>
                  <div className="text-white font-semibold">Week Warrior</div>
                  <div className="text-slate-400 text-sm">7-day battle streak</div>
                  <div className="text-xs mt-2 text-orange-400">
                    {stats.currentStreak >= 7 ? 'UNLOCKED' : `${stats.currentStreak}/7`}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              onClick={onNewBattle}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-lg px-8 py-3"
            >
              ⚔️ NEW BATTLE
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 font-black text-lg px-8 py-3"
            >
              🏠 HOME
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarReport;
