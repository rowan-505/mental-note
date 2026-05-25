import { TrendingUp, Sparkles, ArrowUp, Zap } from 'lucide-react';

export function GrowthVisualization() {
  const weeks = [
    { label: 'Week 1', value: 65, color: 'from-[#a78bfa] to-[#c4b5fd]', emoji: '📊', bgGlow: 'from-[#a78bfa]/20' },
    { label: 'Week 2', value: 68, color: 'from-[#8b5cf6] to-[#a78bfa]', emoji: '📈', bgGlow: 'from-[#8b5cf6]/30' },
    { label: 'Week 3', value: 72, color: 'from-[#7c3aed] to-[#8b5cf6]', emoji: '🚀', bgGlow: 'from-[#7c3aed]/40' },
    { label: 'Week 4', value: 77, color: 'from-[#7c3aed] via-[#ec4899] to-[#06b6d4]', emoji: '⭐', bgGlow: 'from-[#ec4899]/50' },
  ];

  const maxValue = 100;

  return (
    <div className="space-y-6">
      {/* Chart Area with Enhanced Visualization */}
      <div className="relative bg-gradient-to-br from-[#faf5ff] via-white to-[#f0f9ff] rounded-3xl p-6 shadow-xl border-2 border-[#7c3aed]/10">
        {/* Decorative Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7c3aed]/5 via-transparent to-[#ec4899]/5 rounded-3xl animate-pulse"></div>

        {/* Grid Lines */}
        <div className="absolute inset-6 flex flex-col justify-between pb-16">
          {[100, 75, 50, 25, 0].map((value, i) => (
            <div key={i} className="relative h-px bg-gradient-to-r from-transparent via-[#ddd6fe]/50 to-transparent">
              <span className="absolute -left-4 -top-2 text-[10px] font-semibold text-[#a78bfa]">{value}</span>
            </div>
          ))}
        </div>

        {/* Progress Trend Line - SVG Path */}
        <svg className="absolute inset-6 pb-16 pointer-events-none" style={{ width: 'calc(100% - 3rem)', height: 'calc(100% - 4rem)' }}>
          <defs>
            <linearGradient id="trendLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="33%" stopColor="#8b5cf6" stopOpacity="0.9" />
              <stop offset="66%" stopColor="#7c3aed" stopOpacity="1" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Trend Line with Glow */}
          <path
            d="M 12.5% 35% L 37.5% 32% L 62.5% 28% L 87.5% 23%"
            fill="none"
            stroke="url(#trendLineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            className="drop-shadow-lg"
          />
          {/* Data Points on Line */}
          {[
            { x: '12.5%', y: '35%' },
            { x: '37.5%', y: '32%' },
            { x: '62.5%', y: '28%' },
            { x: '87.5%', y: '23%' }
          ].map((point, i) => (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={i === 3 ? "6" : "4"}
              fill={i === 3 ? "#ec4899" : "#7c3aed"}
              className={i === 3 ? "animate-pulse" : ""}
              filter="url(#glow)"
            />
          ))}
        </svg>

        {/* Bars with Enhanced Visuals */}
        <div className="relative flex items-end justify-between gap-5 h-72 pb-16 pt-6">
          {weeks.map((week, index) => {
            const heightPercentage = (week.value / maxValue) * 100;
            const isLatest = index === weeks.length - 1;
            const prevValue = index > 0 ? weeks[index - 1].value : week.value;
            const growth = week.value - prevValue;

            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-4 relative">
                <div className="flex-1 w-full flex items-end relative group">
                  {/* Background Glow */}
                  {isLatest && (
                    <div className={`absolute inset-0 -bottom-4 bg-gradient-to-t ${week.bgGlow} to-transparent rounded-3xl blur-2xl -z-10 animate-pulse`}></div>
                  )}

                  {/* Bar */}
                  <div
                    className={`w-full rounded-2xl transition-all duration-1000 ease-out bg-gradient-to-t ${week.color} relative ${
                      isLatest
                        ? 'shadow-2xl shadow-[#ec4899]/60 ring-4 ring-[#ec4899]/30 scale-105'
                        : 'shadow-xl shadow-[#7c3aed]/30 hover:scale-105'
                    }`}
                    style={{
                      height: `${heightPercentage}%`,
                      animation: `slideUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2}s both`
                    }}
                  >
                    {/* Animated Shimmer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Sparkle Effect on Latest */}
                    {isLatest && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/30 to-transparent rounded-2xl animate-pulse"></div>
                        <Zap size={16} className="absolute top-2 right-2 text-white animate-bounce" />
                      </>
                    )}

                    {/* Value Badge with Emoji */}
                    <div className={`absolute -top-14 left-1/2 -translate-x-1/2 z-10 ${
                      isLatest
                        ? 'bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#06b6d4] shadow-2xl shadow-[#ec4899]/60 scale-125'
                        : 'bg-gradient-to-r from-white to-[#faf5ff] shadow-lg border-2 border-[#ddd6fe]'
                    } px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2`}>
                      <span className="text-xl">{week.emoji}</span>
                      <span className={`text-base font-black ${isLatest ? 'text-white' : 'text-[#7c3aed]'}`}>
                        {week.value}%
                      </span>
                      {isLatest && (
                        <Sparkles size={16} className="text-white animate-spin" style={{ animationDuration: '3s' }} />
                      )}
                    </div>

                    {/* Growth Indicator */}
                    {growth > 0 && (
                      <div className={`absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-1 rounded-full ${
                        isLatest
                          ? 'bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-lg shadow-[#10b981]/30'
                          : 'bg-[#d1fae5]'
                      }`}>
                        <ArrowUp size={12} className={`${isLatest ? 'text-white animate-bounce' : 'text-[#10b981]'} font-bold`} />
                        <span className={`text-xs font-black ${isLatest ? 'text-white' : 'text-[#10b981]'}`}>
                          +{growth}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Week Label */}
                <div className={`text-center ${isLatest ? 'scale-110' : ''} transition-transform`}>
                  <span className={`text-sm font-black ${
                    isLatest
                      ? 'bg-gradient-to-r from-[#7c3aed] to-[#ec4899] bg-clip-text text-transparent'
                      : 'text-[#64748b]'
                  }`}>
                    {week.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Growth Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Overall Growth Card */}
        <div className="bg-gradient-to-br from-[#7c3aed] via-[#a855f7] to-[#ec4899] rounded-3xl p-6 shadow-2xl shadow-[#7c3aed]/40 relative overflow-hidden group hover:scale-105 transition-transform">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-[#06b6d4]/30 rounded-full blur-2xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/90 text-xs font-bold uppercase tracking-wide">Growth</p>
              <TrendingUp size={18} className="text-white animate-bounce" />
            </div>
            <p className="text-5xl font-black text-white mb-1 drop-shadow-lg">+12%</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-white/25 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-white text-xs font-semibold">4 Weeks</span>
              </div>
              <Sparkles size={14} className="text-white/90" />
            </div>
          </div>
        </div>

        {/* Current Score Card */}
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-[#7c3aed]/20 relative overflow-hidden hover:scale-105 transition-transform group">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#7c3aed]/10 to-[#ec4899]/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#06b6d4]/10 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[#64748b] text-xs font-bold uppercase tracking-wide">Score</p>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] animate-pulse shadow-lg shadow-[#10b981]/50"></div>
            </div>
            <p className="text-5xl font-black bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899] bg-clip-text text-transparent mb-1 drop-shadow">
              77%
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i <= 3
                        ? 'bg-gradient-to-r from-[#7c3aed] to-[#ec4899] shadow-lg shadow-[#7c3aed]/40 scale-110'
                        : 'bg-[#e0e7ff]'
                    }`}
                  ></div>
                ))}
              </div>
              <span className="text-[#7c3aed] text-xs font-black uppercase">Excellent</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%) scaleY(0);
            opacity: 0;
          }
          to {
            transform: translateY(0) scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
