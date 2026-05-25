import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, MapPin, Sparkles, Target } from 'lucide-react';
import { PermaProgressList } from '../components/PermaProgressList';
import { ajouRecommendations, formatTrend, PermaScore, Recommendation, permaScores } from '../wellnessDemo';

export function ReflectionAnalysis() {
  const navigate = useNavigate();
  const lowAreas = permaScores
    .filter((score) => score.trend < 0)
    .sort((a, b) => a.trend - b.trend);

  return (
    <div className="min-h-screen bg-[#F8F5FF] pb-24">
      <div className="max-w-md mx-auto">
        <header className="px-6 pt-10 pb-5">
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/journal/write')}
              className="rounded-xl p-2 -ml-2 text-[#7C3AED] transition-colors hover:bg-[#F1ECFF]"
            >
              <ArrowLeft size={22} />
            </button>
            <div className="flex items-center gap-2 rounded-2xl border border-[#E7DFF7] bg-white px-3 py-2 shadow-sm">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#F472B6] flex items-center justify-center">
                <span className="text-xs font-bold tracking-wide text-white">N</span>
              </div>
              <span className="text-sm font-bold tracking-[0.18em] text-[#241A44]">NOVA</span>
            </div>
          </div>

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-[#EDE9FE] p-3 text-[#7C3AED]">
                <Brain size={22} />
              </div>
              <div>
                <h1
                  className="text-2xl font-bold text-[#241A44]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Your Reflection Insight
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">
                  A simple PERMA-based summary from your entry.
                </p>
              </div>
            </div>
          </section>
        </header>

        <main className="space-y-5 px-6">
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#241A44]">PERMA Snapshot</h3>
                <p className="text-sm text-[#7C719A]">Five well-being skills from this demo entry.</p>
              </div>
              <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-semibold text-[#92400E]">
                Needs Care
              </span>
            </div>
            <PermaProgressList scores={permaScores} />
          </section>

          <section className="rounded-3xl border border-[#E7DFF7] bg-[#F1ECFF] p-4 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <div className="rounded-2xl bg-white p-2.5 text-[#7C3AED] shadow-sm">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#241A44]">Personalized Insights</h3>
                <p className="text-sm leading-relaxed text-[#7C719A]">
                  Localized guidance based on your PERMA reflection.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {lowAreas.map((area, index) => (
                <PermaInsightCard key={area.area} area={area} recommendation={getRecommendationForArea(area.area)} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function PermaInsightCard({
  area,
  recommendation,
}: {
  area: PermaScore;
  recommendation: Recommendation;
}) {
  const isMeaning = area.area === 'Meaning';
  const scoreBadgeClass = isMeaning
    ? 'bg-[#FEE2E2] text-[#B91C1C]'
    : 'bg-[#FEF3C7] text-[#92400E]';

  return (
    <article className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EDE9FE] text-[#7C3AED]">
            {isMeaning ? <Target size={18} /> : <CheckCircle2 size={18} />}
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-[#241A44]">{area.area}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#7C719A]">
              {isMeaning ? 'Purpose connection could be stronger.' : 'Small wins are missing today.'}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${scoreBadgeClass}`}>
          {formatTrend(area.trend)}%
        </span>
      </div>

      <div className="mt-4 rounded-3xl border border-[#CCFBF1] bg-[#F0FDFA] p-3.5">
        <div className="mb-2 flex items-center gap-2">
          <div className="rounded-xl bg-[#CCFBF1] p-2 text-[#0F766E]">
            <MapPin size={16} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#14B8A6]">
            Try near Ajou
          </p>
        </div>
        <p className="text-sm font-semibold leading-relaxed text-[#241A44]">
          {recommendation.description}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#F1ECFF] px-3 py-1.5 text-xs font-semibold text-[#7C719A]">
          {isMeaning ? 'Ajou campus' : 'Study lounge'}
        </span>
        <span className="rounded-full bg-[#CCFBF1] px-3 py-1.5 text-xs font-semibold text-[#0F766E]">
          {recommendation.duration}
        </span>
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#EDE9FE] px-3 py-1.5 text-xs font-bold text-[#7C3AED]"
        >
          <span>Try this</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
}

function getRecommendationForArea(area: PermaScore['area']) {
  return (
    ajouRecommendations.find((recommendation) => recommendation.area === area) ??
    ajouRecommendations[0]
  );
}
