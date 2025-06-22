
import { useState } from "react";
import WelcomePanel from "./defense/WelcomePanel";
import MissionSetup from "./defense/MissionSetup";
import ResourcesPanel from "./defense/ResourcesPanel";
import FocusRitual from "./defense/FocusRitual";
import StudySession from "./defense/StudySession";
import SessionLog from "./defense/SessionLog";
import ExitCheck from "./defense/ExitCheck";

export type DefenseStep = 'welcome' | 'mission' | 'resources' | 'ritual' | 'study' | 'log' | 'exit';

const DefenseMode = () => {
  const [currentStep, setCurrentStep] = useState<DefenseStep>('welcome');
  const [sessionData, setSessionData] = useState({
    subject: '',
    unit: '',
    topic: '',
    targetHours: 2,
    pyqRelevance: 3,
    energyLevel: 50,
    resources: [] as string[],
    studyTime: 0,
    learnings: '',
    confusions: '',
    reviewItems: [] as string[],
    topicStatus: ''
  });

  const updateSessionData = (data: Partial<typeof sessionData>) => {
    setSessionData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    const steps: DefenseStep[] = ['welcome', 'mission', 'resources', 'ritual', 'study', 'log', 'exit'];
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const goToStep = (step: DefenseStep) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10">
        {currentStep === 'welcome' && (
          <WelcomePanel onNext={nextStep} />
        )}
        {currentStep === 'mission' && (
          <MissionSetup 
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'resources' && (
          <ResourcesPanel
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'ritual' && (
          <FocusRitual onNext={nextStep} />
        )}
        {currentStep === 'study' && (
          <StudySession
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'log' && (
          <SessionLog
            sessionData={sessionData}
            updateSessionData={updateSessionData}
            onNext={nextStep}
          />
        )}
        {currentStep === 'exit' && (
          <ExitCheck
            sessionData={sessionData}
            onReturnToDefense={() => goToStep('study')}
          />
        )}
      </div>
    </div>
  );
};

export default DefenseMode;
