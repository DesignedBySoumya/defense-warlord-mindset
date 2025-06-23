
import { useState } from "react";
import WelcomeAttack from "./attack/WelcomeAttack";
import PlanAttack from "./attack/PlanAttack";
import BeastBattle from "./attack/BeastBattle";
import BattleReflection from "./attack/BattleReflection";
import BeastSheet from "./attack/BeastSheet";

export type AttackStep = 'welcome' | 'plan' | 'battle' | 'reflect' | 'arsenal';

interface MCQQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
  topic: string;
}

interface MCQAnswer {
  questionId: string;
  selectedAnswer: number;
  confidenceBefore: number; // 1-5 scale
  confidenceAfter: number; // 1-5 scale
  timeSpent: number; // seconds
  isCorrect: boolean;
  reflection?: string; // "why was I wrong?" for incorrect answers
}

interface AttackSessionData {
  // Planning Phase
  subject: string;
  topic: string;
  timeLimit: number; // minutes
  targetQuestions: number;
  difficultyMix: { easy: number; medium: number; hard: number };
  
  // Battle Phase
  currentQuestion: number;
  questions: MCQQuestion[];
  answers: MCQAnswer[];
  streakCount: number;
  beastScore: number;
  startTime: number;
  
  // Reflection Phase
  totalTime: number;
  correctCount: number;
  confidenceAccuracy: number;
  mistakePatterns: string[];
  
  // Arsenal Generation
  hardestQuestions: MCQQuestion[];
  frequentMistakes: string[];
  confidenceOverreach: MCQQuestion[];
}

const AttackMode = () => {
  const [currentStep, setCurrentStep] = useState<AttackStep>('welcome');
  const [sessionData, setSessionData] = useState<AttackSessionData>({
    subject: '',
    topic: '',
    timeLimit: 30,
    targetQuestions: 20,
    difficultyMix: { easy: 6, medium: 10, hard: 4 },
    currentQuestion: 0,
    questions: [],
    answers: [],
    streakCount: 0,
    beastScore: 0,
    startTime: 0,
    totalTime: 0,
    correctCount: 0,
    confidenceAccuracy: 0,
    mistakePatterns: [],
    hardestQuestions: [],
    frequentMistakes: [],
    confidenceOverreach: []
  });

  const updateSessionData = (data: Partial<AttackSessionData>) => {
    setSessionData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const steps: AttackStep[] = ['welcome', 'plan', 'battle', 'reflect', 'arsenal'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToStep = (step: AttackStep) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-950 via-slate-900 to-black">
      {/* Background texture with attack theme */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-slate-900/20"></div>
      </div>

      <div className="relative z-10">
        {currentStep === 'welcome' && (
          <WelcomeAttack onNext={nextStep} />
        )}
        {currentStep === 'plan' && (
          <PlanAttack 
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'battle' && (
          <BeastBattle
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'reflect' && (
          <BattleReflection
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'arsenal' && (
          <BeastSheet
            sessionData={sessionData}
            onReturnToBattle={() => goToStep('plan')}
          />
        )}
      </div>
    </div>
  );
};

export default AttackMode;
