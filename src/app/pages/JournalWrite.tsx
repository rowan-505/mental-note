import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Mic, Sparkles, Check } from 'lucide-react';
import { SpecificEmotionSelector } from '../components/SpecificEmotionSelector';
import { SpecificEmotionKey, specificEmotionOptions } from '../wellnessDemo';

export function JournalWrite() {
  const navigate = useNavigate();
  const [journalText, setJournalText] = useState('');
  const [showAutosave, setShowAutosave] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<SpecificEmotionKey[]>([]);

  const toggleEmotion = (emotion: SpecificEmotionKey) => {
    setSelectedEmotions((current) =>
      current.includes(emotion)
        ? current.filter((selected) => selected !== emotion)
        : [...current, emotion],
    );
  };

  useEffect(() => {
    if (journalText.length > 0) {
      setShowAutosave(true);
      const timer = setTimeout(() => setShowAutosave(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [journalText]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-[#F8F5FF] flex flex-col pb-24">
      <div className="relative">
        <div className="max-w-md mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate('/')}
              className="p-2 -ml-2 hover:bg-[#F1ECFF] rounded-xl transition-colors"
            >
              <ArrowLeft size={22} className="text-[#7C3AED]" />
            </button>
            <div className="flex items-center gap-1.5 text-xs text-[#0F766E] bg-[#CCFBF1] px-3 py-1.5 rounded-full font-semibold">
              <Check size={14} className={showAutosave ? 'scale-110 transition-transform' : ''} />
              <span>Draft saved locally</span>
            </div>
          </div>
          <p className="text-sm text-[#7C719A] text-center font-medium">{currentDate}</p>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full px-6 py-8 space-y-6">
        <div className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="bg-[#EDE9FE] text-[#7C3AED] p-2.5 rounded-xl">
              <Sparkles size={18} />
            </div>
            <div className="flex-1">
              <p className="text-[#241A44] leading-relaxed font-semibold">
                What moment affected you emotionally today?
              </p>
              <p className="mt-1 text-sm text-[#7C719A]">
                Write freely. This demo keeps everything local.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Start writing your thoughts..."
            className="w-full min-h-[340px] bg-white rounded-3xl p-6 border border-[#E7DFF7] text-[#241A44] placeholder:text-[#B9AECF] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]/30 resize-none leading-relaxed shadow-sm transition-all"
            autoFocus
          />
          <button className="absolute bottom-6 right-6 p-3 bg-[#EDE9FE] hover:bg-[#DDD6FE] rounded-full transition-colors group">
            <Mic size={20} className="text-[#7C3AED] group-hover:text-[#5B21B6]" />
          </button>
        </div>

        <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
          <SpecificEmotionSelector
            emotions={specificEmotionOptions}
            selectedEmotions={selectedEmotions}
            onSelect={toggleEmotion}
          />
        </section>

        <button
          onClick={() => journalText.trim() && navigate('/journal/analysis')}
          disabled={!journalText.trim()}
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#F472B6] text-white py-5 rounded-3xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/25 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
        >
          <Sparkles size={20} strokeWidth={2.5} />
          <span className="font-semibold tracking-wide">Create Reflection Insight</span>
        </button>
      </div>
    </div>
  );
}
