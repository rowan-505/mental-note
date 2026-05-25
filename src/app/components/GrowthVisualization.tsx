import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Sparkles, ArrowUp, Zap, Star } from 'lucide-react';

const weeks = [
  { label: 'Wk 1', value: 52, prev: 0, emoji: '🌱', barGradient: 'from-[#A855F7] to-[#8B2FFF]', glowColor: '#8B2FFF' },
  { label: 'Wk 2', value: 61, prev: 52, emoji: '🌿', barGradient: 'from-[#C42EFF] to-[#A855F7]', glowColor: '#C42EFF' },
  { label: 'Wk 3', value: 70, prev: 61, emoji: '🚀', barGradient: 'from-[#FF2D78] to-[#C42EFF]', glowColor: '#FF2D78' },
  { label: 'Wk 4', value: 77, prev: 70, emoji: '⭐', barGradient: 'from-[#00E5FF] via-[#FF2D78] to-[#8B2FFF]', glowColor: '#FF2D78' },
];

const MAX = 100;
const CHART_HEIGHT = 200;

function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration]);

  return <>{count}</>;
}

export function GrowthVisualization() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const totalGrowth = weeks[weeks.length - 1].value - weeks[0].value;
  const currentScore = weeks[weeks.length - 1].value;

  return (
    <div className="space-y-5">
      {/* Main Chart */}
      <div className="relative bg-gradient-to-br from-[#F9F5FF] via-white to-[#FFF0FA] rounded-3xl p-5 border-2 border-[#8B2FFF]/12 overflow-hidden">
        {/* Subtle animated background shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B2FFF]/3 via-transparent to-[#FF2D78]/3 rounded-3xl animate-pulse"></div>

        {/* Y-axis grid lines */}
        <div className="absolute left-5 right-5 top-5" style={{ height: CHART_HEIGHT }}>
          {[100, 75, 50, 25].map((v) => (
            <div
              key={v}
              className="absolute w-full flex items-center gap-2"
              style={{ bottom: `${(v / MAX) * 100}%` }}
            >
              <span className="text-[10px] font-bold text-[#8B2FFF]/60 w-5 text-right leading-none">{v}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#8B2FFF]/15 via-[#FF2D78]/10 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* SVG Trend Line over bars */}
        <svg
          className="absolute pointer-events-none"
          style={{
            left: '2rem',
            right: '1.25rem',
            top: '1.25rem',
            width: 'calc(100% - 3.25rem)',
            height: CHART_HEIGHT,
          }}
        >
          <defs>
            <linearGradient id="novaLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B2FFF" />
              <stop offset="33%" stopColor="#C42EFF" />
              <stop offset="66%" stopColor="#FF2D78" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
            <filter id="novaGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Trend path — 4 evenly spaced columns at 12.5%, 37.5%, 62.5%, 87.5% */}
          {mounted && (
            <polyline
              points={weeks.map((w, i) => {
                const x = `${12.5 + i * 25}%`;
                const y = `${(1 - w.value / MAX) * CHART_HEIGHT}px`;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="url(#novaLine)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#novaGlow)"
              style={{ transition: 'all 0.8s ease' }}
            />
          )}

          {/* Dot markers on trend line */}
          {mounted && weeks.map((w, i) => {
            const cx = `${12.5 + i * 25}%`;
            const cy = (1 - w.value / MAX) * CHART_HEIGHT;
            const isLatest = i === weeks.length - 1;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isLatest ? 7 : 5}
                  fill={isLatest ? '#FF2D78' : '#8B2FFF'}
                  stroke="white"
                  strokeWidth="2.5"
                  filter="url(#novaGlow)"
                  className={isLatest ? 'animate-pulse' : ''}
                />
              </g>
            );
          })}
        </svg>

        {/* Bars */}
        <div className="relative flex items-end justify-around gap-3 pl-7" style={{ height: CHART_HEIGHT }}>
          {weeks.map((week, i) => {
            const heightPct = mounted ? (week.value / MAX) * 100 : 0;
            const growth = week.value - week.prev;
            const isLatest = i === weeks.length - 1;

            return (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-2 relative h-full">
                {/* Value badge floating above bar */}
                <div
                  className={`absolute flex items-center gap-1 px-2.5 py-1.5 rounded-xl z-10 transition-all duration-700 ${
                    isLatest
                      ? 'bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] shadow-lg shadow-[#8B2FFF]/40 scale-110'
                      : 'bg-white border-2 border-[#8B2FFF]/20 shadow-md'
                  }`}
                  style={{
                    bottom: `calc(${heightPct}% + 10px)`,
                  }}
                >
                  <span className={`text-xs font-black ${isLatest ? 'text-white' : 'text-[#8B2FFF]'}`}>
                    {mounted ? <AnimatedCounter target={week.value} duration={800 + i * 200} /> : week.value}%
                  </span>
                  {isLatest && <Sparkles size={10} className="text-white" />}
                </div>

                {/* Growth delta badge */}
                {growth > 0 && mounted && (
                  <div
                    className={`absolute flex items-center gap-0.5 px-1.5 py-0.5 rounded-full z-20 ${
                      isLatest
                        ? 'bg-gradient-to-r from-[#10b981] to-[#34d399] shadow-md shadow-[#10b981]/30'
                        : 'bg-[#d1fae5]'
                    }`}
                    style={{ bottom: `calc(${heightPct}% + 38px)` }}
                  >
                    <ArrowUp size={9} className={isLatest ? 'text-white' : 'text-[#10b981]'} />
                    <span className={`text-[9px] font-black ${isLatest ? 'text-white' : 'text-[#10b981]'}`}>
                      +{growth}%
                    </span>
                  </div>
                )}

                {/* Bar itself */}
                <div
                  className={`w-full rounded-2xl bg-gradient-to-t ${week.barGradient} relative overflow-hidden group cursor-pointer ${
                    isLatest
                      ? 'shadow-2xl ring-2 ring-[#FF2D78]/30'
                      : 'shadow-lg hover:shadow-xl'
                  }`}
                  style={{
                    height: `${heightPct}%`,
                    boxShadow: isLatest
                      ? `0 8px 32px ${week.glowColor}50, 0 0 16px ${week.glowColor}30`
                      : `0 4px 16px ${week.glowColor}25`,
                    transition: 'height 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${i * 150}ms`,
                  }}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/25 to-white/10 rounded-2xl"></div>
                  {/* Hover shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/40 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Zap icon on latest */}
                  {isLatest && (
                    <div className="absolute top-2 right-1.5">
                      <Zap size={12} className="text-white/80 animate-bounce" style={{ animationDuration: '1.5s' }} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Week labels */}
        <div className="flex justify-around pl-7 mt-3">
          {weeks.map((week, i) => {
            const isLatest = i === weeks.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-base">{week.emoji}</span>
                <span
                  className={`text-xs font-bold ${
                    isLatest
                      ? 'bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] bg-clip-text text-transparent'
                      : 'text-[#7B6B9D]'
                  }`}
                >
                  {week.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Growth Card */}
        <div className="bg-gradient-to-br from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] rounded-3xl p-5 shadow-xl shadow-[#8B2FFF]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/15 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#00E5FF]/20 rounded-full blur-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-white/80 text-[10px] font-bold uppercase tracking-widest">4-Week Growth</p>
              <TrendingUp size={16} className="text-white animate-bounce" style={{ animationDuration: '2s' }} />
            </div>
            <p className="text-4xl font-black text-white drop-shadow-lg">
              +{mounted ? <AnimatedCounter target={totalGrowth} duration={1400} /> : totalGrowth}%
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="bg-white/25 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <span className="text-white text-[10px] font-bold">
                  {weeks[0].value}% → {currentScore}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Score Card */}
        <div className="bg-white rounded-3xl p-5 shadow-xl border-2 border-[#8B2FFF]/15 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#8B2FFF]/10 to-[#FF2D78]/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-3 -left-3 w-14 h-14 bg-[#00E5FF]/8 rounded-full blur-lg"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#7B6B9D] text-[10px] font-bold uppercase tracking-widest">Now</p>
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399] animate-pulse shadow-md shadow-[#10b981]/40"></div>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] bg-clip-text text-transparent drop-shadow">
              {mounted ? <AnimatedCounter target={currentScore} duration={1200} /> : currentScore}%
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              {[1, 2, 3, 4].map((dot) => (
                <div
                  key={dot}
                  className={`h-2 rounded-full transition-all ${
                    dot <= 3
                      ? 'w-5 bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] shadow-sm shadow-[#8B2FFF]/30'
                      : 'w-2 bg-[#EEE6FF]'
                  }`}
                ></div>
              ))}
              <span className="text-[#8B2FFF] text-[10px] font-black uppercase ml-0.5">Great!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress breakdown per dimension */}
      <div className="bg-gradient-to-br from-[#8B2FFF]/6 to-[#FF2D78]/6 rounded-3xl p-5 border border-[#8B2FFF]/10">
        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-[#FF2D78]" />
          <h4 className="text-[#1A0A3D] font-bold text-sm">Weekly Milestones</h4>
        </div>
        <div className="space-y-3">
          {weeks.map((week, i) => {
            const growth = i === 0 ? 0 : week.value - weeks[0].value;
            const barWidth = mounted ? (week.value / MAX) * 100 : 0;
            const isLatest = i === weeks.length - 1;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm w-8 text-center">{week.emoji}</span>
                <div className="flex-1 relative h-6 bg-[#EEE6FF] rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${week.barGradient} rounded-full flex items-center justify-end pr-2`}
                    style={{
                      width: `${barWidth}%`,
                      transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: `${i * 150}ms`,
                      boxShadow: isLatest ? `0 0 12px ${week.glowColor}40` : 'none',
                    }}
                  >
                    <span className="text-[10px] font-black text-white drop-shadow">{week.value}%</span>
                  </div>
                </div>
                {growth > 0 && (
                  <div className="flex items-center gap-0.5 min-w-[36px]">
                    <ArrowUp size={10} className="text-[#10b981]" />
                    <span className="text-[10px] font-black text-[#10b981]">+{growth}%</span>
                  </div>
                )}
                {growth === 0 && <div className="min-w-[36px]"></div>}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
          to   { transform: scaleY(1); opacity: 1; transform-origin: bottom; }
        }
      `}</style>
    </div>
  );
}
