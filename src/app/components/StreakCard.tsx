import { Flame } from 'lucide-react';

export function StreakCard() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completed = [true, true, true, true, false, false, false];

  return (
    <div className="bg-gradient-to-br from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] rounded-3xl p-6 shadow-lg shadow-[#8B2FFF]/25 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00E5FF]/15 rounded-full blur-3xl"></div>

      <div className="relative flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
            <Flame size={22} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold">4 Day Streak</h3>
            <p className="text-white/80 text-sm">Keep it going!</p>
          </div>
        </div>
        <div className="text-3xl">🔥</div>
      </div>
      <div className="relative flex justify-between gap-2">
        {days.map((day, index) => (
          <div
            key={index}
            className={`flex-1 flex flex-col items-center gap-2 py-2.5 rounded-xl transition-all ${
              completed[index]
                ? 'bg-white/25 backdrop-blur-sm'
                : 'bg-white/10'
            }`}
          >
            <span className="text-white text-xs font-semibold">{day}</span>
            <div
              className={`w-2 h-2 rounded-full ${
                completed[index] ? 'bg-white shadow-sm shadow-white/50' : 'bg-white/30'
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
