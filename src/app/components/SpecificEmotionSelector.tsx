import { SpecificEmotionKey, SpecificEmotionOption } from '../wellnessDemo';

type SpecificEmotionSelectorProps = {
  emotions: SpecificEmotionOption[];
  selectedEmotions: SpecificEmotionKey[];
  onSelect: (emotion: SpecificEmotionKey) => void;
};

export function SpecificEmotionSelector({
  emotions,
  selectedEmotions,
  onSelect,
}: SpecificEmotionSelectorProps) {
  const selectedLabels = emotions
    .filter((emotion) => selectedEmotions.includes(emotion.key))
    .map((emotion) => emotion.label);

  return (
    <div className="space-y-3">
      <div>
        <h4 className="font-semibold text-[#241A44]">Specific emotion</h4>
        <p className="text-sm text-[#7C719A]">Tap one or more feelings from this entry.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion.key);

          return (
            <button
              type="button"
              key={emotion.key}
              onClick={() => onSelect(emotion.key)}
              aria-pressed={isSelected}
              className={`rounded-full border px-3 py-2 text-sm font-semibold transition-all ${
                isSelected
                  ? 'border-[#7C3AED] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                  : 'border-[#E7DFF7] bg-white text-[#241A44] hover:border-[#D8C9F3] hover:bg-[#F8F5FF]'
              }`}
            >
              <span className="mr-1.5">{emotion.emoji}</span>
              {emotion.label}
            </button>
          );
        })}
      </div>
      {selectedLabels.length > 0 && (
        <p className="text-xs text-[#7C719A]">Selected: {selectedLabels.join(', ')}</p>
      )}
    </div>
  );
}
