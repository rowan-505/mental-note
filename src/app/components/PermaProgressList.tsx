import { Award, Heart, Smile, Target, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import { formatTrend, PermaArea, PermaScore } from '../wellnessDemo';
import { getPermaAreaStyles } from '../../lib/permaColors';

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

export function PermaProgressList({ scores, showNotes = false }: PermaProgressListProps) {
  return (
    <div className="space-y-3">
      {scores.map((item) => {
        const styles = getPermaAreaStyles(item.area);

        return (
          <div key={item.area} className={`rounded-2xl border p-3.5 ${styles.card}`}>
            <div className="flex items-start gap-3">
              <div className={`rounded-xl p-2.5 ${styles.icon}`}>{icons[item.area]}</div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[#241A44]">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#241A44]">{item.score}%</span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${styles.pill}`}>
                      {formatTrend(item.trend)}
                    </span>
                  </div>
                </div>
                <div className={`mt-2 h-2.5 overflow-hidden rounded-full ${styles.track}`}>
                  <div
                    className={`h-full rounded-full ${styles.bar} transition-all duration-700`}
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
