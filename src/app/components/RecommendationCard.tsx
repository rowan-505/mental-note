import { MapPin } from 'lucide-react';
import { Recommendation } from '../wellnessDemo';

type RecommendationCardProps = {
  recommendation: Recommendation;
  title?: string;
  onTryClick?: () => void;
};

export function RecommendationCard({
  recommendation,
  title = "Today's Mission",
  onTryClick,
}: RecommendationCardProps) {
  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <header className="flex items-start gap-3">
        <div className="shrink-0 rounded-2xl bg-[#CCFBF1] p-3 text-[#0F766E]">
          <MapPin size={22} />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-[#241A44]">{title}</h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#14B8A6]">
            Near Ajou University
          </p>
        </div>
      </header>

      <div className="mt-5 pl-8 pr-8">
        <h4 className="text-sm font-semibold text-[#241A44]">{recommendation.title}</h4>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
            Meaning
          </span>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-600">
            Accomplishment
          </span>
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-700">
            {recommendation.duration}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#7C719A]">{recommendation.description}</p>
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={onTryClick}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#EDE9FE] px-5 py-2.5 text-sm font-semibold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE]"
          >
            {recommendation.action} →
          </button>
        </div>
      </div>
    </section>
  );
}
