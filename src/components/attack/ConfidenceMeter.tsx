
interface ConfidenceMeterProps {
  streak: number;
  beastScore: number;
}

const ConfidenceMeter = ({ streak, beastScore }: ConfidenceMeterProps) => {
  const getStreakColor = (streak: number) => {
    if (streak >= 5) return 'text-red-400';
    if (streak >= 3) return 'text-orange-400';
    if (streak >= 1) return 'text-yellow-400';
    return 'text-slate-400';
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 5) return '🔥🔥🔥';
    if (streak >= 3) return '🔥🔥';
    if (streak >= 1) return '🔥';
    return '💤';
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="text-center">
        <div className="text-sm text-slate-400">Beast Streak</div>
        <div className={`font-black text-lg ${getStreakColor(streak)}`}>
          {getStreakEmoji(streak)} {streak}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-sm text-slate-400">Beast Score</div>
        <div className="font-black text-lg text-orange-400">
          ⚡ {beastScore}
        </div>
      </div>
    </div>
  );
};

export default ConfidenceMeter;
