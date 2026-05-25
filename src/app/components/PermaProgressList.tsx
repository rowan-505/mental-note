import { Award, Heart, Smile, Target, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { formatTrend, PermaArea, PermaScore } from '../wellnessDemo';

type PermaProgressListProps = {
  scores: PermaScore[];
  showNotes?: boolean;
};

const icons: Record<PermaArea, ReactNode> = {
  'Positive Emotion': <Smile size={18} />,
  Engagement: <Target size={18} />,
  Relationships: <Users size={18} />,
  Meaning: <Heart size={18} />,
  Accomplishment: <Award size={18} />,
};

const toneStyles: Record<
  PermaScore['tone'],
  { icon: string; bar: string; pill: string; card: string; track: string }
> = {
  primary: {
    icon: 'bg-[#EDE9FE] text-[#7C3AED]',
    bar: 'bg-[#7C3AED]',
    pill: 'bg-[#EDE9FE] text-[#7C3AED]',
    card: 'border-[#E7DFF7] bg-[#F8F5FF]',
    track: 'bg-[#EDE9FE]',
  },
  secondary: {
    icon: 'bg-[#CCFBF1] text-[#0F766E]',
    bar: 'bg-[#14B8A6]',
    pill: 'bg-[#CCFBF1] text-[#0F766E]',
    card: 'border-[#E7DFF7] bg-[#F8F5FF]',
    track: 'bg-[#EDE9FE]',
  },
  accent: {
    icon: 'bg-[#FCE7F3] text-[#BE185D]',
    bar: 'bg-[#F472B6]',
    pill: 'bg-[#FCE7F3] text-[#BE185D]',
    card: 'border-[#E7DFF7] bg-[#F8F5FF]',
    track: 'bg-[#EDE9FE]',
  },
  care: {
    icon: 'bg-[#FEF3C7] text-[#A16207]',
    bar: 'bg-[#D97706]',
    pill: 'bg-[#FEF3C7] text-[#92400E]',
    card: 'border-[#FDE68A] bg-[#FFFBEB]',
    track: 'bg-[#FDE68A]/50',
  },
  caution: {
    icon: 'bg-[#FCE7F3] text-[#BE185D]',
    bar: 'bg-[#F472B6]',
    pill: 'bg-[#FCE7F3] text-[#BE185D]',
    card: 'border-[#FBCFE8] bg-[#FFF7FB]',
    track: 'bg-[#FCE7F3]',
  },
};

export function PermaProgressList({ scores, showNotes = false }: PermaProgressListProps) {
  return (
    <div className="space-y-3">
      {scores.map((item) => {
        const tone = toneStyles[item.tone];

        return (
          <div key={item.area} className={`rounded-2xl border p-3.5 ${tone.card}`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-xl p-2.5 ${tone.icon}`}>{icons[item.area]}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#241A44]">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#241A44]">{item.score}%</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone.pill}`}>
                      {formatTrend(item.trend)}
                    </span>
                  </div>
                </div>
                <div className={`mt-2 h-2.5 overflow-hidden rounded-full ${tone.track}`}>
                  <div
                    className={`h-full rounded-full ${tone.bar} transition-all duration-700`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
                {showNotes && <p className="mt-2 text-xs leading-relaxed text-[#7C719A]">{item.note}</p>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
