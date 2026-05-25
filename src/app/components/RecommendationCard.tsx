import { ArrowRight, Lightbulb } from 'lucide-react';
import { Recommendation } from '../wellnessDemo';

type RecommendationCardProps = {
  recommendation: Recommendation;
  moodLabel: string;
  title?: string;
};

export function RecommendationCard({
  recommendation,
  moodLabel,
  title = 'Recommended Next Step',
}: RecommendationCardProps) {
  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-[#CCFBF1] p-3 text-[#0F766E]">
          <Lightbulb size={22} />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-[#241A44]">{title}</h3>
            <span className="rounded-full bg-[#EDE9FE] px-2.5 py-1 text-[11px] font-semibold text-[#7C3AED]">
              {moodLabel} mood
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#14B8A6]">
            Local demo near Ajou University
          </p>
          <h4 className="mt-3 text-sm font-semibold text-[#241A44]">{recommendation.title}</h4>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold text-[#7C719A]">
            <span className="rounded-full bg-[#F1ECFF] px-2.5 py-1">{recommendation.location}</span>
            <span className="rounded-full bg-[#CCFBF1] px-2.5 py-1 text-[#0F766E]">
              {recommendation.duration}
            </span>
            <span className="rounded-full bg-[#FCE7F3] px-2.5 py-1 text-[#BE185D]">
              {recommendation.area}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#7C719A]">{recommendation.description}</p>
          <button
            type="button"
            className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:text-[#5B21B6]"
          >
            <span>{recommendation.action}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
