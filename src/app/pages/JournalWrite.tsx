import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, Mic, Sparkles } from 'lucide-react';
import { pageShellClass } from '../components/pageLayout';
import { SpecificEmotionSelector } from '../components/SpecificEmotionSelector';
import { SpecificEmotionKey, specificEmotionOptions } from '../wellnessDemo';

type WritingMode = 'free' | 'questions';

type QuestionDraft = {
  q1: string;
  q2: string;
  q3: string;
};

const WRITING_MODE_KEY = 'nova-writing-mode';
const FREE_DRAFT_KEY = 'nova-free-draft';
const QUESTION_DRAFT_KEY = 'nova-question-draft';

const QUESTIONS: Array<{ key: keyof QuestionDraft; label: string }> = [
  { key: 'q1', label: 'What happened today?' },
  { key: 'q2', label: 'What emotion stayed with you the most?' },
  { key: 'q3', label: 'What does this moment mean to you?' },
];

const EMPTY_QUESTION_DRAFT: QuestionDraft = { q1: '', q2: '', q3: '' };

function readWritingMode(): WritingMode {
  if (typeof window === 'undefined') {
    return 'free';
  }

  return localStorage.getItem(WRITING_MODE_KEY) === 'questions' ? 'questions' : 'free';
}

function readFreeDraft(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem(FREE_DRAFT_KEY) ?? '';
}

function readQuestionDraft(): QuestionDraft {
  if (typeof window === 'undefined') {
    return EMPTY_QUESTION_DRAFT;
  }

  try {
    const raw = localStorage.getItem(QUESTION_DRAFT_KEY);
    if (!raw) {
      return EMPTY_QUESTION_DRAFT;
    }

    const parsed = JSON.parse(raw) as Partial<QuestionDraft>;
    return {
      q1: parsed.q1 ?? '',
      q2: parsed.q2 ?? '',
      q3: parsed.q3 ?? '',
    };
  } catch {
    return EMPTY_QUESTION_DRAFT;
  }
}

function combineQuestionDraft(draft: QuestionDraft): string {
  return [draft.q1, draft.q2, draft.q3].join('\n');
}

function hasDraftContent(mode: WritingMode, freeText: string, questions: QuestionDraft): boolean {
  if (mode === 'free') {
    return freeText.trim().length > 0;
  }

  return combineQuestionDraft(questions).trim().length > 0;
}

export function JournalWrite() {
  const navigate = useNavigate();
  const [writingMode, setWritingMode] = useState<WritingMode>(readWritingMode);
  const [journalText, setJournalText] = useState(readFreeDraft);
  const [questionDraft, setQuestionDraft] = useState<QuestionDraft>(readQuestionDraft);
  const [showAutosave, setShowAutosave] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<SpecificEmotionKey[]>([]);

  const combinedEntry =
    writingMode === 'free' ? journalText.trim() : combineQuestionDraft(questionDraft).trim();
  const canAnalyze = combinedEntry.length > 0;

  const toggleEmotion = (emotion: SpecificEmotionKey) => {
    setSelectedEmotions((current) =>
      current.includes(emotion)
        ? current.filter((selected) => selected !== emotion)
        : [...current, emotion],
    );
  };

  const updateQuestion = (key: keyof QuestionDraft, value: string) => {
    setQuestionDraft((current) => ({ ...current, [key]: value }));
  };

  const selectWritingMode = (mode: WritingMode) => {
    setWritingMode(mode);
    localStorage.setItem(WRITING_MODE_KEY, mode);
  };

  useEffect(() => {
    localStorage.setItem(FREE_DRAFT_KEY, journalText);
  }, [journalText]);

  useEffect(() => {
    localStorage.setItem(QUESTION_DRAFT_KEY, JSON.stringify(questionDraft));
  }, [questionDraft]);

  useEffect(() => {
    if (hasDraftContent(writingMode, journalText, questionDraft)) {
      setShowAutosave(true);
      const timer = setTimeout(() => setShowAutosave(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [journalText, questionDraft, writingMode]);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={`${pageShellClass} flex flex-col`}>
      <div className="relative">
        <div className="max-w-md mx-auto px-6 pt-8 pb-4">
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
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

      <div className="flex-1 max-w-md mx-auto w-full px-6 py-6 pb-2 space-y-5">
        {writingMode === 'free' && (
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
        )}

        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E7DFF7] bg-white p-1 shadow-sm">
          <button
            type="button"
            aria-pressed={writingMode === 'free'}
            onClick={() => selectWritingMode('free')}
            className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              writingMode === 'free'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                : 'text-[#7C719A] hover:text-[#7C3AED]'
            }`}
          >
            Free Writing
          </button>
          <button
            type="button"
            aria-pressed={writingMode === 'questions'}
            onClick={() => selectWritingMode('questions')}
            className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
              writingMode === 'questions'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                : 'text-[#7C719A] hover:text-[#7C3AED]'
            }`}
          >
            Today&apos;s Questions
          </button>
        </div>

        {writingMode === 'free' ? (
          <div className="relative">
            <textarea
              value={journalText}
              onChange={(event) => setJournalText(event.target.value)}
              placeholder="Start writing your thoughts..."
              className="w-full min-h-[340px] bg-white rounded-3xl p-6 border border-[#E7DFF7] text-[#241A44] placeholder:text-[#B9AECF] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]/30 resize-none leading-relaxed shadow-sm transition-all"
              autoFocus
            />
            <button
              type="button"
              className="absolute bottom-6 right-6 p-3 bg-[#EDE9FE] hover:bg-[#DDD6FE] rounded-full transition-colors group"
            >
              <Mic size={20} className="text-[#7C3AED] group-hover:text-[#5B21B6]" />
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {QUESTIONS.map((question) => (
              <section
                key={question.key}
                className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm"
              >
                <label
                  htmlFor={question.key}
                  className="block text-sm font-semibold text-[#241A44]"
                >
                  {question.label}
                </label>
                <textarea
                  id={question.key}
                  value={questionDraft[question.key]}
                  onChange={(event) => updateQuestion(question.key, event.target.value)}
                  rows={3}
                  placeholder="Write a short answer..."
                  className="mt-3 w-full rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-3 text-sm text-[#241A44] placeholder:text-[#B9AECF] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED]/30 resize-none leading-relaxed transition-all"
                />
              </section>
            ))}
          </div>
        )}

        <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
          <SpecificEmotionSelector
            emotions={specificEmotionOptions}
            selectedEmotions={selectedEmotions}
            onSelect={toggleEmotion}
          />
        </section>

        <button
          type="button"
          onClick={() => canAnalyze && navigate('/journal/analysis')}
          disabled={!canAnalyze}
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#F472B6] text-white py-5 rounded-3xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/25 transition-all active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-3"
        >
          <Sparkles size={20} strokeWidth={2.5} />
          <span className="font-semibold tracking-wide">Create Reflection Insight</span>
        </button>
      </div>
    </div>
  );
}
