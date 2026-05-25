import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mic, Sparkles, Check } from 'lucide-react';

export function JournalWrite() {
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showAutosave, setShowAutosave] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '🤔', label: 'Thoughtful' },
  ];

  useEffect(() => {
    if (journalText.length > 0) {
      setShowAutosave(true);
      const timer = setTimeout(() => setShowAutosave(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [journalText]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F9F5FF] flex flex-col">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-[#EEE6FF] sticky top-0 z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 hover:bg-[#EEE6FF] rounded-xl transition-colors"
            >
              <ArrowLeft size={22} className="text-[#8B2FFF]" />
            </button>
            <div className="flex items-center gap-2">
              {showAutosave && (
                <div className="flex items-center gap-1.5 text-xs text-[#8B2FFF] bg-[#EEE6FF] px-3 py-1.5 rounded-full font-medium">
                  <Check size={14} />
                  <span>Saved</span>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-[#7B6B9D] text-center font-medium">{currentDate}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-md mx-auto w-full px-6 py-8 space-y-6">
        {/* Guided Prompt */}
        <div className="relative">
          <div className="absolute -left-2 -top-2 w-12 h-12 bg-gradient-to-br from-[#8B2FFF]/20 to-[#FF2D78]/20 rounded-full blur-xl"></div>
          <div className="relative bg-gradient-to-br from-[#8B2FFF]/8 to-[#FF2D78]/8 rounded-3xl p-6 border border-[#8B2FFF]/15">
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-[#8B2FFF] to-[#FF2D78] p-2 rounded-xl shadow-md shadow-[#8B2FFF]/25">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[#1A0A3D] leading-relaxed font-medium">
                  What moment affected you emotionally today?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Text Area */}
        <div className="relative">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing your thoughts..."
            className="w-full min-h-[320px] bg-white rounded-3xl p-6 border border-[#8B2FFF]/10 text-[#1A0A3D] placeholder:text-[#C9AEFF] focus:outline-none focus:ring-2 focus:ring-[#8B2FFF]/25 focus:border-[#8B2FFF]/20 resize-none leading-relaxed shadow-sm transition-all"
            autoFocus
          />
          <button className="absolute bottom-6 right-6 p-3 bg-[#EEE6FF] hover:bg-[#DDD0FF] rounded-full transition-colors group">
            <Mic size={20} className="text-[#8B2FFF] group-hover:text-[#6B0FDD]" />
          </button>
        </div>

        {/* Mood Selector */}
        <div className="space-y-3">
          <label className="text-sm text-[#7B6B9D] block font-medium">How does this make you feel?</label>
          <div className="grid grid-cols-6 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all ${
                  selectedMood === mood.label
                    ? 'bg-gradient-to-br from-[#8B2FFF] to-[#FF2D78] shadow-md shadow-[#8B2FFF]/30 scale-105'
                    : 'bg-white hover:bg-[#EEE6FF] border border-[#8B2FFF]/10'
                }`}
              >
                <span className="text-2xl">{mood.emoji}</span>
                <span
                  className={`text-[10px] font-medium ${
                    selectedMood === mood.label ? 'text-white' : 'text-[#7B6B9D]'
                  }`}
                >
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={() => journalText.trim() && navigate('/journal/analysis')}
          disabled={!journalText.trim()}
          className="w-full bg-gradient-to-r from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] text-white py-5 rounded-3xl shadow-lg shadow-[#8B2FFF]/30 hover:shadow-xl hover:shadow-[#8B2FFF]/40 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
        >
          <Sparkles size={20} strokeWidth={2.5} />
          <span className="font-semibold tracking-wide">Analyze Reflection</span>
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-40 right-6 w-32 h-32 bg-gradient-to-br from-[#8B2FFF]/8 to-[#FF2D78]/8 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-40 left-6 w-40 h-40 bg-gradient-to-br from-[#00E5FF]/8 to-[#8B2FFF]/8 rounded-full blur-3xl pointer-events-none"></div>
      </div>
    </div>
  );
}
