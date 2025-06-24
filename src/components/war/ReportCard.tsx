
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBattleStore } from "@/stores/battleStore";

interface ReportCardProps {
  onNext: () => void;
  onNewBattle: () => void;
}

const ReportCard = ({ onNext, onNewBattle }: ReportCardProps) => {
  const { config, timeLeft, totalDuration, addReport, resetBattle } = useBattleStore();
  
  const [studentData, setStudentData] = useState({
    name: '',
    mockNo: '1',
    rank: '',
    totalMarks: '',
    percentile: ''
  });

  const [subjectData, setSubjectData] = useState({
    math: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
    english: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
    reasoning: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
    gk: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' }
  });

  const [chapterFeedback, setChapterFeedback] = useState({
    math: {} as Record<string, { status: 'tick' | 'cross', notes: string }>,
    english: {} as Record<string, { status: 'tick' | 'cross', notes: string }>,
    reasoning: {} as Record<string, { status: 'tick' | 'cross', notes: string }>,
    gk: {} as Record<string, { status: 'tick' | 'cross', notes: string }>
  });

  const mathChapters = [
    "Percentage", "Profit & Loss", "Simple Interest", "Compound Interest",
    "Time & Work", "Time & Distance", "Ratio & Proportion", "Mixtures",
    "Algebra", "Geometry", "Trigonometry", "Statistics",
    "Data Interpretation", "Number System", "Simplification", "Quadratic Equations"
  ];

  const englishChapters = [
    "Reading Comprehension", "Grammar", "Vocabulary", "Sentence Correction",
    "Para Jumbles", "Fill in the Blanks", "Synonyms & Antonyms", "Idioms & Phrases",
    "Error Detection", "Active & Passive Voice"
  ];

  const reasoningChapters = [
    "Logical Reasoning", "Verbal Reasoning", "Non-Verbal Reasoning", "Analytical Reasoning",
    "Blood Relations", "Direction Sense", "Coding-Decoding", "Series",
    "Puzzles", "Seating Arrangement"
  ];

  const gkChapters = [
    "Current Affairs", "History", "Geography", "Polity",
    "Economics", "Science & Technology", "Sports", "Awards & Honours",
    "Books & Authors", "Important Dates"
  ];

  const sessionDuration = Math.floor((totalDuration - timeLeft) / 60);

  const handleSaveReport = () => {
    if (!config) return;

    // Convert strings to numbers for the report
    const report = {
      id: Date.now(),
      date: new Date().toISOString(),
      config,
      sessionStats: {
        duration: sessionDuration,
        accuracy: 85, // Mock data for now
        focusHealth: 85,
        focusScore: 78,
        tabSwitches: 2
      },
      performance: {
        totalQuestions: parseInt(studentData.totalMarks) || 0,
        attempted: parseInt(subjectData.math.attempted) || 0,
        correct: parseInt(subjectData.math.correct) || 0,
        subjects: {
          math: { 
            attempted: parseInt(subjectData.math.attempted) || 0, 
            correct: parseInt(subjectData.math.correct) || 0 
          },
          english: { 
            attempted: parseInt(subjectData.english.attempted) || 0, 
            correct: parseInt(subjectData.english.correct) || 0 
          },
          reasoning: { 
            attempted: parseInt(subjectData.reasoning.attempted) || 0, 
            correct: parseInt(subjectData.reasoning.correct) || 0 
          },
          gk: { 
            attempted: parseInt(subjectData.gk.attempted) || 0, 
            correct: parseInt(subjectData.gk.correct) || 0 
          }
        },
        reflection: JSON.stringify({ studentData, subjectData, chapterFeedback })
      },
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

  const renderChapterSection = (subject: string, chapters: string[]) => (
    <div className="space-y-4">
      {chapters.map((chapter) => (
        <div key={chapter} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-700/30 rounded-lg">
          <div className="flex flex-col">
            <Label className="text-slate-300 mb-2">{chapter}</Label>
            <div className="flex items-center gap-4">
              <RadioGroup
                value={chapterFeedback[subject as keyof typeof chapterFeedback]?.[chapter]?.status || ''}
                onValueChange={(value) => setChapterFeedback(prev => ({
                  ...prev,
                  [subject]: {
                    ...prev[subject as keyof typeof prev],
                    [chapter]: {
                      ...prev[subject as keyof typeof prev][chapter],
                      status: value as 'tick' | 'cross'
                    }
                  }
                }))}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tick" id={`${subject}-${chapter}-tick`} />
                  <Label htmlFor={`${subject}-${chapter}-tick`} className="text-green-400">✅ Good</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cross" id={`${subject}-${chapter}-cross`} />
                  <Label htmlFor={`${subject}-${chapter}-cross`} className="text-red-400">❌ Needs Work</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="flex flex-col">
            <Label className="text-slate-300 mb-2">What went wrong?</Label>
            <Textarea
              placeholder="Analysis notes..."
              value={chapterFeedback[subject as keyof typeof chapterFeedback]?.[chapter]?.notes || ''}
              onChange={(e) => setChapterFeedback(prev => ({
                ...prev,
                [subject]: {
                  ...prev[subject as keyof typeof prev],
                  [chapter]: {
                    ...prev[subject as keyof typeof prev][chapter],
                    notes: e.target.value
                  }
                }
              }))}
              className="bg-slate-600/50 border-slate-500 text-white min-h-[60px]"
            />
          </div>
        </div>
      ))}
    </div>
  );

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-4 caret-transparent select-none">
            ⚔️ BATTLE ANALYSIS REPORT
          </h1>
          <p className="text-slate-300 text-lg">
            Complete military-style mock analysis briefing
          </p>
        </div>

        <div className="space-y-8">
          {/* Student Basic Details */}
          <Card className="bg-white/10 border border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">🎯 Student Basic Details</CardTitle>
              <CardDescription className="text-slate-300">Essential warrior identification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label className="text-slate-300">Name</Label>
                  <Input
                    value={studentData.name}
                    onChange={(e) => setStudentData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Warrior Name"
                    className="bg-slate-800 text-white placeholder-slate-400 border-white/30"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Mock No.</Label>
                  <Input
                    value={studentData.mockNo}
                    onChange={(e) => setStudentData(prev => ({ ...prev, mockNo: e.target.value }))}
                    className="bg-slate-800 text-white border-white/30"
                    disabled
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Rank</Label>
                  <Input
                    type="number"
                    value={studentData.rank}
                    onChange={(e) => setStudentData(prev => ({ ...prev, rank: e.target.value }))}
                    placeholder="Battle Rank"
                    className="bg-slate-800 text-white placeholder-slate-400 border-white/30"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Total Marks</Label>
                  <Input
                    type="number"
                    value={studentData.totalMarks}
                    onChange={(e) => setStudentData(prev => ({ ...prev, totalMarks: e.target.value }))}
                    placeholder="Score"
                    className="bg-slate-800 text-white placeholder-slate-400 border-white/30"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Percentile</Label>
                  <Input
                    type="number"
                    value={studentData.percentile}
                    onChange={(e) => setStudentData(prev => ({ ...prev, percentile: e.target.value }))}
                    placeholder="Percentile"
                    className="bg-slate-800 text-white placeholder-slate-400 border-white/30"
                    style={{ appearance: 'textfield' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subject-wise Stats */}
          {Object.entries(subjectData).map(([subject, data]) => (
            <Card key={subject} className="bg-white/10 border border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white capitalize">📚 {subject} Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-6">
                  <div>
                    <Label className="text-slate-300 text-xs">Total Qs</Label>
                    <Input
                      type="number"
                      value={data.totalQs}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], totalQs: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Attempted</Label>
                    <Input
                      type="number"
                      value={data.attempted}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], attempted: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Not Attempted</Label>
                    <Input
                      type="number"
                      value={data.notAttempted}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], notAttempted: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Correct</Label>
                    <Input
                      type="number"
                      value={data.correct}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], correct: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Incorrect</Label>
                    <Input
                      type="number"
                      value={data.incorrect}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], incorrect: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Time (min)</Label>
                    <Input
                      type="number"
                      value={data.time}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], time: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-xs">Marks</Label>
                    <Input
                      type="number"
                      value={data.marks}
                      onChange={(e) => setSubjectData(prev => ({
                        ...prev,
                        [subject]: { ...prev[subject as keyof typeof prev], marks: e.target.value }
                      }))}
                      className="bg-slate-800 text-white border-white/30 text-sm"
                      style={{ appearance: 'textfield' }}
                    />
                  </div>
                </div>

                {/* Chapter-Level Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Chapter-wise Analysis</h4>
                  {subject === 'math' && renderChapterSection('math', mathChapters)}
                  {subject === 'english' && renderChapterSection('english', englishChapters)}
                  {subject === 'reasoning' && renderChapterSection('reasoning', reasoningChapters)}
                  {subject === 'gk' && renderChapterSection('gk', gkChapters)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between mt-8 gap-4">
          <Button
            onClick={() => {
              setStudentData({ name: '', mockNo: '1', rank: '', totalMarks: '', percentile: '' });
              setSubjectData({
                math: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
                english: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
                reasoning: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' },
                gk: { totalQs: '', attempted: '', notAttempted: '', correct: '', incorrect: '', time: '', marks: '' }
              });
              setChapterFeedback({ math: {}, english: {}, reasoning: {}, gk: {} });
            }}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Clear All
          </Button>
          <Button
            onClick={handleSaveReport}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black"
          >
            ⚔️ SAVE BATTLE ANALYSIS
          </Button>
          <Button
            onClick={handleNewBattle}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            🔄 NEW BATTLE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
