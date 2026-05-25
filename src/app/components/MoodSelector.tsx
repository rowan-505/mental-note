import { MoodKey, MoodOption } from '../wellnessDemo';

const moodSummaries: Record<MoodKey, string> = {
  great: 'Today feels Great. Build on the momentum.',
  good: 'Today feels Good. Keep the rhythm steady.',
  okay: 'Today feels Neutral. Take things gently.',
  low: 'Today feels Bad. Start with small care.',
};

type MoodSelectorProps = {
  moods: MoodOption[];
  selectedMood: MoodKey;
  onSelect: (mood: MoodKey) => void;
  label?: string;
};

export function MoodSelector({
  moods,
  selectedMood,
  onSelect,
  label = 'How are you feeling?',
}: MoodSelectorProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-[#241A44] font-semibold">{label}</h4>
      <div className="flex items-center gap-2">
        {moods.map((mood) => {
          const isSelected = selectedMood === mood.key;

          return (
            <button
              type="button"
              key={mood.key}
              onClick={() => onSelect(mood.key)}
              aria-pressed={isSelected}
              className={`flex h-[66px] min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl border px-2 text-xs font-semibold transition-all sm:text-sm ${
                isSelected
                  ? 'border-[#7C3AED] bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                  : 'border-[#E7DFF7] bg-white text-[#7C719A] hover:border-[#D8C9F3] hover:bg-[#F8F5FF]'
              }`}
            >
              <span className="text-lg leading-none">{mood.emoji}</span>
              <span className="truncate leading-none">{mood.label}</span>
            </button>
          );
        })}
      </div>
      <p className="text-sm leading-relaxed text-[#7C719A]">{moodSummaries[selectedMood]}</p>
    </div>
  );
}
