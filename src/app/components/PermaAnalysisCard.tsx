import { TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface PermaAnalysisCardProps {
  icon: ReactNode;
  label: string;
  score: number;
  trend: string;
  index?: number;
}

const gradients = [
  'from-[#8B2FFF] to-[#A855F7]',
  'from-[#FF2D78] to-[#FF6B9D]',
  'from-[#00E5FF] to-[#8B2FFF]',
  'from-[#C42EFF] to-[#FF2D78]',
  'from-[#FF2D78] to-[#00E5FF]',
];

export function PermaAnalysisCard({ icon, label, score, trend, index = 0 }: PermaAnalysisCardProps) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#F9F5FF] border border-[#8B2FFF]/8">
      <div className={`bg-gradient-to-br ${gradient} text-white p-2.5 rounded-xl shadow-sm`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#1A0A3D] font-semibold">{label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#8B2FFF]">
              {score}%
            </span>
            <div className="flex items-center gap-0.5 text-xs text-[#8B2FFF] bg-[#EEE6FF] px-2 py-0.5 rounded-full font-semibold">
              <TrendingUp size={12} />
              <span>{trend}</span>
            </div>
          </div>
        </div>
        <div className="h-2.5 bg-[#EEE6FF] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
