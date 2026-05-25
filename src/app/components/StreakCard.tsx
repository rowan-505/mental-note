import { Flame } from 'lucide-react';

export function StreakCard() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completed = [true, true, true, true, false, false, false];

  return (
    <div className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-[#FCE7F3] p-2.5 rounded-xl text-[#BE185D]">
            <Flame size={22} />
          </div>
          <div>
            <h3 className="text-[#241A44] font-bold">4 Day Streak</h3>
            <p className="text-[#7C719A] text-sm">A steady writing rhythm.</p>
          </div>
        </div>
        <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#7C3AED]">
          This week
        </span>
      </div>
      <div className="flex justify-between gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center gap-2 py-2.5 rounded-xl transition-all ${
              completed[index]
                ? 'bg-[#EDE9FE] text-[#7C3AED]'
                : 'bg-[#F8F5FF] text-[#7C719A]'
            }`}
          >
            <span className="text-xs font-semibold">{day}</span>
            <div
              className={`w-2 h-2 rounded-full ${
                completed[index] ? 'bg-[#7C3AED]' : 'bg-[#D8CFF0]'
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
