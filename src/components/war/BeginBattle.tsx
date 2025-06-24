
import { useEffect, useState } from "react";
import { useBattleStore } from "@/stores/battleStore";
import { Button } from "@/components/ui/button";

interface BeginBattleProps {
  onEnd: () => void;
}

const BeginBattle = ({ onEnd }: BeginBattleProps) => {
  const { timeLeft, totalDuration, isActive, isPaused, updateTimeLeft, endBattle, config } = useBattleStore();
  const [motivationalMessage, setMotivationalMessage] = useState("Stay focused, warrior");

  const motivationalMessages = [
    "Stay focused, warrior",
    "Every second counts",
    "Victory requires discipline",
    "Push through the resistance",
    "Champions are made in moments like this",
    "Your future self is watching",
    "Excellence is a habit, not an act",
    "The pain of discipline weighs ounces, regret weighs tons"
  ];

  // Timer logic
  useEffect(() => {
    if (!isActive || isPaused) return;

    const interval = setInterval(() => {
      updateTimeLeft(Math.max(0, timeLeft - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, updateTimeLeft]);

  // Auto-end when timer reaches 0
  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      endBattle();
      onEnd();
    }
  }, [timeLeft, isActive, endBattle, onEnd]);

  // Motivational message rotation
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMotivationalMessage(randomMessage);
    }, 60000); // Change every minute

    return () => clearInterval(messageInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft > 900) return 'text-slate-300'; // > 15 min
    if (timeLeft > 300) return 'text-yellow-400'; // > 5 min
    return 'text-red-400'; // < 5 min (urgent)
  };

  const getProgressPercentage = () => {
    return Math.max(0, ((totalDuration - timeLeft) / totalDuration) * 100);
  };

  const handleEndBattle = () => {
    endBattle();
    onEnd();
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4 caret-transparent select-none">No battle configuration found</h2>
          <p className="text-slate-300 caret-transparent select-none">Please configure your battle first.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-cover bg-center"
      style={{ 
        backgroundImage: `url(/lovable-uploads/1141477c-fa0b-4477-bfaf-0585612e0670.png)` 
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-slate-300 mb-4">
            <div className="text-lg font-semibold caret-transparent select-none">
              TARGET: {config.duration}MIN
            </div>
            <div className="flex items-center text-orange-400">
              <div className="w-3 h-3 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
              <span className="caret-transparent select-none">BATTLE MODE ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mb-8">
          <p className="text-xl text-slate-200 font-medium animate-fade-in caret-transparent select-none">
            "{motivationalMessage}"
          </p>
        </div>

        {/* Main Timer */}
        <div className="mb-12">
          <div className={`text-8xl font-black font-mono mb-4 caret-transparent select-none ${getTimerColor()} ${timeLeft < 300 ? 'animate-pulse' : ''}`}>
            {formatTime(timeLeft)}
          </div>
          <div className="text-2xl text-slate-300 font-semibold mb-6 caret-transparent select-none">
            {config.testType === 'full-length' ? 'FULL BATTLE' : 'SUBJECT BATTLE'}
          </div>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span className="caret-transparent select-none">BATTLE COMMENCED</span>
              <span className="caret-transparent select-none">{Math.round(getProgressPercentage())}% COMPLETE</span>
              <span className="caret-transparent select-none">VICTORY</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-1000 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span className="caret-transparent select-none">●</span>
              <span className="text-orange-400 caret-transparent select-none">
                {`█`.repeat(Math.floor(getProgressPercentage() / 10))}
              </span>
              <span className="caret-transparent select-none">●</span>
            </div>
          </div>
        </div>

        {/* Emergency Controls */}
        <div className="space-y-4">
          <Button
            onClick={handleEndBattle}
            variant="destructive"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-black text-xl py-6 px-12 rounded-xl transform hover:scale-105 transition-all"
          >
            ⚡ END BATTLE
          </Button>
          
          {timeLeft < 60 && (
            <div className="text-red-400 font-semibold animate-pulse caret-transparent select-none">
              ⚠️ Final moments - stay strong!
            </div>
          )}
        </div>

        {/* Battle Info */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-slate-400 text-sm">Type</div>
            <div className="text-white font-semibold caret-transparent select-none">{config.testType}</div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-slate-400 text-sm">Duration</div>
            <div className="text-white font-semibold caret-transparent select-none">{config.duration}m</div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-slate-400 text-sm">Elapsed</div>
            <div className="text-white font-semibold caret-transparent select-none">
              {formatTime(totalDuration - timeLeft)}
            </div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-slate-400 text-sm">Remaining</div>
            <div className="text-white font-semibold caret-transparent select-none">
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeginBattle;
