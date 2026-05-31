import { useState } from 'react';
import type { LocalPlace } from '../data/localPlaces';

type LocalMapCardProps = {
  place: LocalPlace;
  activityLabel?: string;
};

export function LocalMapCard({ place, activityLabel = 'Walking reflection' }: LocalMapCardProps) {
  const [imageFailed, setImageFailed] = useState(false);

  const openMap = () => {
    window.open(place.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <div className="overflow-hidden rounded-2xl border border-[#E7DFF7] bg-[#F1ECFF]">
        {imageFailed ? (
          <div
            className="flex aspect-video items-center justify-center bg-[#F1ECFF]"
            aria-label="Ajou map preview placeholder"
          >
            <p className="text-sm font-semibold text-[#7C719A]">Ajou map preview</p>
          </div>
        ) : (
          <img
            src={place.image}
            alt=""
            className="aspect-video w-full object-cover"
            onError={() => setImageFailed(true)}
            decoding="async"
          />
        )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-[#241A44]">{place.title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-[#7C719A]">{place.subtitle}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#CCFBF1] px-3 py-1 text-xs font-semibold text-[#0F766E]">
            {place.duration}
          </span>
          <span className="rounded-full bg-[#F1ECFF] px-3 py-1 text-xs font-semibold text-[#7C719A]">
            {activityLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={openMap}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#EDE9FE] px-4 py-2.5 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE]"
        >
          Open Naver Map ↗
        </button>
      </div>
    </section>
  );
}
