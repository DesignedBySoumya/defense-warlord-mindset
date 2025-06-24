
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BattleConfig {
  studentId: string;
  dobPassword: string;
  testType: 'full-length' | 'subject-wise';
  duration: number; // minutes
}

export interface BattleReport {
  id: number;
  date: string;
  config: BattleConfig;
  sessionStats: {
    duration: number;
    accuracy: number;
    focusHealth: number;
    focusScore: number;
    tabSwitches: number;
  };
  performance: {
    totalQuestions: number;
    attempted: number;
    correct: number;
    subjects: {
      math: { attempted: number; correct: number };
      english: { attempted: number; correct: number };
      reasoning: { attempted: number; correct: number };
      gk: { attempted: number; correct: number };
    };
    reflection: string;
  };
  timestamp: number;
}

export type BattlePhase = 'config' | 'active' | 'paused' | 'completed';

interface BattleState {
  // Current battle configuration
  config: BattleConfig | null;
  
  // Battle status
  isActive: boolean;
  isPaused: boolean;
  phase: BattlePhase;
  
  // Timer state
  timeLeft: number; // seconds
  totalDuration: number; // seconds
  startTime: number;
  
  // Battle reports
  reports: BattleReport[];
  
  // Actions
  setConfig: (config: BattleConfig) => void;
  startBattle: () => void;
  pauseBattle: () => void;
  resumeBattle: () => void;
  endBattle: () => void;
  updateTimeLeft: (timeLeft: number) => void;
  addReport: (report: BattleReport) => void;
  clearConfig: () => void;
  resetBattle: () => void;
}

export const useBattleStore = create<BattleState>()(
  persist(
    (set, get) => ({
      // Initial state
      config: null,
      isActive: false,
      isPaused: false,
      phase: 'config',
      timeLeft: 0,
      totalDuration: 0,
      startTime: 0,
      reports: [],

      // Actions
      setConfig: (config) => set({ config, phase: 'config' }),
      
      startBattle: () => {
        const config = get().config;
        if (!config) return;
        
        const totalDuration = config.duration * 60; // convert to seconds
        set({
          isActive: true,
          isPaused: false,
          phase: 'active',
          timeLeft: totalDuration,
          totalDuration,
          startTime: Date.now()
        });
      },
      
      pauseBattle: () => set({ isPaused: true }),
      resumeBattle: () => set({ isPaused: false }),
      
      endBattle: () => set({
        isActive: false,
        isPaused: false,
        phase: 'completed'
      }),
      
      updateTimeLeft: (timeLeft) => {
        set({ timeLeft });
        if (timeLeft <= 0) {
          get().endBattle();
        }
      },
      
      addReport: (report) => set((state) => ({
        reports: [report, ...state.reports]
      })),
      
      clearConfig: () => set({ config: null, phase: 'config' }),
      
      resetBattle: () => set({
        isActive: false,
        isPaused: false,
        phase: 'config',
        timeLeft: 0,
        totalDuration: 0,
        startTime: 0
      })
    }),
    {
      name: 'battle-store',
      partialize: (state) => ({
        config: state.config,
        reports: state.reports,
        phase: state.phase,
        timeLeft: state.timeLeft,
        totalDuration: state.totalDuration,
        isActive: state.isActive,
        startTime: state.startTime
      })
    }
  )
);
