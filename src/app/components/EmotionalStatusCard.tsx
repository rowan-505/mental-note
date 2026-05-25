import { Smile, Meh, Frown } from 'lucide-react';

export function EmotionalStatusCard() {
  const emotions = [
    { emoji: '🌟', label: 'Great', active: false, gradient: 'from-[#8B2FFF] to-[#A855F7]' },
    { emoji: '😊', label: 'Good', active: true, gradient: 'from-[#8B2FFF] to-[#FF2D78]' },
    { emoji: '😌', label: 'Okay', active: false, gradient: 'from-[#FF2D78] to-[#FF6B9D]' },
    { emoji: '😔', label: 'Low', active: false, gradient: 'from-[#00E5FF] to-[#8B2FFF]' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
      <h4 className="text-[#1A0A3D] mb-4">How are you feeling?</h4>
      <div className="grid grid-cols-4 gap-3">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${
              emotion.active
                ? `bg-gradient-to-br ${emotion.gradient} text-white shadow-md shadow-[#8B2FFF]/25 scale-105`
                : 'bg-[#F2ECFF] text-[#7B6B9D] hover:bg-[#EEE6FF]'
            }`}
          >
            <span className="text-2xl">{emotion.emoji}</span>
            <span className={`text-xs font-medium ${emotion.active ? 'text-white' : 'text-[#7B6B9D]'}`}>
              {emotion.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
