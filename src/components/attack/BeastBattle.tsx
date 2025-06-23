
import { useState, useEffect } from "react";
import MCQCard from "./MCQCard";
import ConfidenceMeter from "./ConfidenceMeter";

interface BeastBattleProps {
  sessionData: any;
  updateSessionData: (data: any) => void;
  onNext: () => void;
}

const BeastBattle = ({ sessionData, updateSessionData, onNext }: BeastBattleProps) => {
  const [timeRemaining, setTimeRemaining] = useState(sessionData.timeLimit * 60); // Convert to seconds
  const [currentConfidence, setCurrentConfidence] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = sessionData.questions[sessionData.currentQuestion];
  const progress = ((sessionData.currentQuestion + 1) / sessionData.questions.length) * 100;

  useEffect(() => {
    if (timeRemaining > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0) {
      // Time's up - end battle
      handleBattleComplete();
    }
  }, [timeRemaining, showExplanation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSubmit = (selectedAnswer: number) => {
    if (!currentConfidence) {
      alert('Please rate your confidence first!');
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      confidenceBefore: currentConfidence,
      confidenceAfter: 0, // Will be set after seeing explanation
      timeSpent: 0, // Calculate based on question start time
      isCorrect,
      reflection: ''
    };

    const newAnswers = [...sessionData.answers, newAnswer];
    const newStreakCount = isCorrect ? sessionData.streakCount + 1 : 0;
    const newBeastScore = calculateBeastScore(isCorrect, currentConfidence, currentQuestion.difficulty, newStreakCount);

    updateSessionData({
      answers: newAnswers,
      streakCount: newStreakCount,
      beastScore: sessionData.beastScore + newBeastScore
    });

    setHasAnswered(true);
    setShowExplanation(true);
  };

  const calculateBeastScore = (isCorrect: boolean, confidence: number, difficulty: string, streak: number) => {
    if (!isCorrect) return 0;
    
    const difficultyMultiplier = { easy: 1, medium: 2, hard: 3 }[difficulty] || 1;
    const confidenceBonus = confidence;
    const streakBonus = Math.min(streak * 0.5, 5); // Max 5 bonus points for streaks
    
    return Math.round((difficultyMultiplier + confidenceBonus + streakBonus) * 10);
  };

  const handleNext = () => {
    if (sessionData.currentQuestion + 1 >= sessionData.questions.length) {
      handleBattleComplete();
      return;
    }

    updateSessionData({
      currentQuestion: sessionData.currentQuestion + 1
    });
    
    setCurrentConfidence(0);
    setHasAnswered(false);
    setShowExplanation(false);
  };

  const handleBattleComplete = () => {
    const totalTime = sessionData.timeLimit * 60 - timeRemaining;
    const correctCount = sessionData.answers.filter(a => a.isCorrect).length;
    
    updateSessionData({
      totalTime,
      correctCount
    });
    
    onNext();
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading battle...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-slate-900 to-black">
      {/* Battle HUD */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-white">
              <span className="text-sm text-slate-400">Question</span>
              <div className="font-black text-xl">{sessionData.currentQuestion + 1} / {sessionData.questions.length}</div>
            </div>
            <div className="text-white">
              <span className="text-sm text-slate-400">Time</span>
              <div className="font-black text-xl text-red-400">{formatTime(timeRemaining)}</div>
            </div>
            <ConfidenceMeter streak={sessionData.streakCount} beastScore={sessionData.beastScore} />
          </div>
          
          <div className="text-right">
            <div className="text-sm text-slate-400 mb-1">Battle Progress</div>
            <div className="w-64 bg-slate-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Battle Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full">
          <MCQCard
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            onNext={handleNext}
            showExplanation={showExplanation}
            hasAnswered={hasAnswered}
            currentConfidence={currentConfidence}
            setCurrentConfidence={setCurrentConfidence}
            isLastQuestion={sessionData.currentQuestion + 1 >= sessionData.questions.length}
          />
        </div>
      </div>
    </div>
  );
};

export default BeastBattle;
