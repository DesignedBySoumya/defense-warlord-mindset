
import { useState } from "react";

interface PlanAttackProps {
  sessionData: any;
  updateSessionData: (data: any) => void;
  onNext: () => void;
}

const PlanAttack = ({ sessionData, updateSessionData, onNext }: PlanAttackProps) => {
  const [subject, setSubject] = useState(sessionData.subject || '');
  const [topic, setTopic] = useState(sessionData.topic || '');
  const [timeLimit, setTimeLimit] = useState(sessionData.timeLimit || 30);
  const [targetQuestions, setTargetQuestions] = useState(sessionData.targetQuestions || 20);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'History', 'Geography', 'Economics', 'Political Science',
    'English', 'General Knowledge', 'Current Affairs'
  ];

  const timeLimits = [
    { value: 15, label: '15 min - Quick Strike' },
    { value: 30, label: '30 min - Standard Battle' },
    { value: 45, label: '45 min - Extended War' },
    { value: 60, label: '60 min - Beast Mode' }
  ];

  const questionCounts = [
    { value: 10, label: '10 Questions - Precision Strike' },
    { value: 20, label: '20 Questions - Balanced Assault' },
    { value: 30, label: '30 Questions - Full Battle' },
    { value: 50, label: '50 Questions - Beast Challenge' }
  ];

  const handleStartBattle = () => {
    if (!subject || !topic) {
      alert('Please select subject and topic to begin your battle!');
      return;
    }

    // Generate mock MCQs for demo (in real app, would fetch from API/database)
    const mockQuestions = generateMockQuestions(subject, topic, targetQuestions);
    
    updateSessionData({
      subject,
      topic,
      timeLimit,
      targetQuestions,
      questions: mockQuestions,
      startTime: Date.now(),
      currentQuestion: 0
    });
    
    onNext();
  };

  const generateMockQuestions = (subject: string, topic: string, count: number) => {
    // Mock question generator for demo purposes
    return Array.from({ length: count }, (_, i) => ({
      id: `q${i + 1}`,
      question: `${subject} - ${topic}: Sample question ${i + 1}? This is a demonstration question to show the battle interface.`,
      options: [
        `Option A for question ${i + 1}`,
        `Option B for question ${i + 1}`,
        `Option C for question ${i + 1}`,
        `Option D for question ${i + 1}`
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This is the explanation for question ${i + 1}. In a real implementation, this would contain detailed reasoning and learning insights.`,
      difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
      subject,
      topic
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-600 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              🎯 PLAN YOUR ATTACK
            </h2>
            <p className="text-xl text-slate-300">
              "Every great victory starts with a strategic plan"
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Subject & Topic Selection */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">🎓 Choose Your Battlefield</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-4 text-white focus:border-red-400 focus:outline-none"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(sub => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">📝 Topic/Chapter</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Thermodynamics, Ancient History, etc."
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg p-4 text-white focus:border-red-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Battle Configuration */}
            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">⏱️ Battle Duration</label>
                <div className="space-y-2">
                  {timeLimits.map(time => (
                    <label key={time.value} className="flex items-center">
                      <input
                        type="radio"
                        name="timeLimit"
                        value={time.value}
                        checked={timeLimit === time.value}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                        className="mr-3"
                      />
                      <span className="text-slate-300">{time.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">🎯 Target Questions</label>
                <div className="space-y-2">
                  {questionCounts.map(count => (
                    <label key={count.value} className="flex items-center">
                      <input
                        type="radio"
                        name="targetQuestions"
                        value={count.value}
                        checked={targetQuestions === count.value}
                        onChange={(e) => setTargetQuestions(Number(e.target.value))}
                        className="mr-3"
                      />
                      <span className="text-slate-300">{count.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 mb-8">
            <h3 className="text-red-200 font-semibold mb-4">🔥 Battle Rules:</h3>
            <div className="grid md:grid-cols-2 gap-4 text-red-100 text-sm">
              <div className="space-y-2">
                <p>• <strong>No skipping</strong> allowed during battle</p>
                <p>• <strong>Confidence rating</strong> required before each answer</p>
                <p>• <strong>Mandatory reflection</strong> on wrong answers</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Timer pressure</strong> - no pausing once started</p>
                <p>• <strong>Streak tracking</strong> for consecutive correct answers</p>
                <p>• <strong>Beast score</strong> calculated based on difficulty + confidence</p>
              </div>
            </div>
          </div>

          {subject && topic && (
            <div className="bg-slate-700/30 rounded-xl p-6 mb-6">
              <h4 className="text-white font-semibold mb-3">⚔️ Battle Summary:</h4>
              <div className="text-slate-300">
                <p><strong>Subject:</strong> {subject}</p>
                <p><strong>Topic:</strong> {topic}</p>
                <p><strong>Duration:</strong> {timeLimit} minutes</p>
                <p><strong>Questions:</strong> {targetQuestions}</p>
                <p><strong>Difficulty Mix:</strong> Easy (30%) • Medium (50%) • Hard (20%)</p>
              </div>
            </div>
          )}

          <button
            onClick={handleStartBattle}
            disabled={!subject || !topic}
            className={`w-full py-6 rounded-xl font-black text-xl transition-all duration-300 ${
              subject && topic
                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white transform hover:scale-105'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {subject && topic ? '🔥 START BEAST BATTLE' : '⚔️ SELECT BATTLEFIELD TO CONTINUE'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanAttack;
