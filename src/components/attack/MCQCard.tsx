
import { useState } from "react";

interface MCQCardProps {
  question: any;
  onAnswerSubmit: (answer: number) => void;
  onNext: () => void;
  showExplanation: boolean;
  hasAnswered: boolean;
  currentConfidence: number;
  setCurrentConfidence: (confidence: number) => void;
  isLastQuestion: boolean;
}

const MCQCard = ({ 
  question, 
  onAnswerSubmit, 
  onNext, 
  showExplanation, 
  hasAnswered, 
  currentConfidence, 
  setCurrentConfidence,
  isLastQuestion 
}: MCQCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const confidenceLevels = [
    { value: 1, label: "😰 Not Sure", color: "text-red-400" },
    { value: 2, label: "🤔 Doubtful", color: "text-orange-400" },
    { value: 3, label: "😐 Moderate", color: "text-yellow-400" },
    { value: 4, label: "😊 Confident", color: "text-green-400" },
    { value: 5, label: "🔥 Beast Mode", color: "text-green-300" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-2xl">
      {/* Question Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className={`text-lg ${getDifficultyColor(question.difficulty)}`}>
            {getDifficultyEmoji(question.difficulty)}
          </span>
          <span className={`text-sm font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty.toUpperCase()}
          </span>
        </div>
        <div className="text-slate-400 text-sm">
          {question.subject} • {question.topic}
        </div>
      </div>

      {/* Confidence Rating (Before Answering) */}
      {!hasAnswered && (
        <div className="mb-8">
          <h3 className="text-white font-semibold mb-4">🎯 Rate Your Confidence First:</h3>
          <div className="grid grid-cols-5 gap-3">
            {confidenceLevels.map(level => (
              <button
                key={level.value}
                onClick={() => setCurrentConfidence(level.value)}
                className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                  currentConfidence === level.value
                    ? 'border-red-400 bg-red-900/30'
                    : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                }`}
              >
                <div className={`text-sm font-semibold ${level.color}`}>
                  {level.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl text-white font-semibold leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {question.options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => {
              if (!hasAnswered) {
                setSelectedAnswer(index);
              }
            }}
            disabled={hasAnswered}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
              hasAnswered
                ? index === question.correctAnswer
                  ? 'border-green-400 bg-green-900/30 text-green-200'
                  : selectedAnswer === index
                    ? 'border-red-400 bg-red-900/30 text-red-200'
                    : 'border-slate-600 bg-slate-700/30 text-slate-400'
                : selectedAnswer === index
                  ? 'border-red-400 bg-red-900/30 text-white'
                  : 'border-slate-600 bg-slate-700/30 text-white hover:border-slate-500'
            }`}
          >
            <div className="flex items-center">
              <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
              {hasAnswered && index === question.correctAnswer && (
                <span className="ml-auto text-green-400">✓</span>
              )}
              {hasAnswered && selectedAnswer === index && index !== question.correctAnswer && (
                <span className="ml-auto text-red-400">✗</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Submit Answer Button */}
      {!hasAnswered && (
        <button
          onClick={() => selectedAnswer !== null && onAnswerSubmit(selectedAnswer)}
          disabled={selectedAnswer === null || !currentConfidence}
          className={`w-full py-4 rounded-xl font-black text-lg transition-all duration-300 ${
            selectedAnswer !== null && currentConfidence
              ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-105'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          {!currentConfidence
            ? '🎯 RATE CONFIDENCE FIRST'
            : selectedAnswer === null
              ? '⚔️ SELECT AN ANSWER'
              : '🔥 SUBMIT ANSWER'
          }
        </button>
      )}

      {/* Explanation (After Answering) */}
      {showExplanation && (
        <div className="bg-slate-700/40 rounded-xl p-6 mb-6">
          <h3 className="text-white font-semibold mb-3">💡 Explanation:</h3>
          <p className="text-slate-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Next Button */}
      {hasAnswered && (
        <button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-black text-lg py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
        >
          {isLastQuestion ? '🏆 COMPLETE BATTLE' : '⚔️ NEXT QUESTION'}
        </button>
      )}
    </div>
  );
};

export default MCQCard;
