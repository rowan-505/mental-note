import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Brain, CheckCircle2, MapPin, Sparkles, Target } from 'lucide-react';
import { pageInnerClass, pageMainClass, pageShellClass } from '../components/pageLayout';
import { PermaProgressList } from '../components/PermaProgressList';
import { getPermaAreaStyles } from '../../lib/permaColors';
import { navigateToMission } from '../../lib/missionNavigation';
import { formatTrend, PermaScore, permaScores } from '../wellnessDemo';

const INSIGHT_CONTENT: Record<
  'Meaning' | 'Accomplishment',
  {
    description: string;
    recommendation: string;
    reflection: string;
    location: string;
    duration: string;
  }
> = {
  Meaning: {
    description: 'Your reflection shows less connection to purpose today.',
    recommendation: 'Walk slowly and name one value that made today matter.',
    reflection: 'Write one sentence: Today mattered because…',
    location: 'Ajou campus',
    duration: '10–15 min',
  },
  Accomplishment: {
    description: 'Your reflection shows fewer small wins today.',
    recommendation:
      'Pick one small task, finish only the first step, and mark it as enough progress for now.',
    reflection: 'Write one sentence: One thing I completed today was…',
    location: 'Study lounge',
    duration: '15 min',
  },
};

export function ReflectionAnalysis() {
  const navigate = useNavigate();
  const lowAreas = permaScores
    .filter((score) => score.trend < 0)
    .sort((a, b) => a.trend - b.trend);

  return (
    <div className={pageShellClass}>
      <div className={pageInnerClass}>
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

        <main className={pageMainClass}>
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#241A44]">PERMA Snapshot</h3>
                <p className="text-sm text-[#7C719A]">Five well-being skills </p>
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">
                Meaning
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
              {lowAreas.map((area) => (
                <PermaInsightCard key={area.area} area={area} />
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className={`rounded-2xl p-2.5 ${getPermaAreaStyles('Meaning').icon}`}>
                <Target size={18} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#241A44]">Today&apos;s mission is ready</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">
                  Meaning and Accomplishment need gentle support. Try a small action selected from your
                  reflection.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigateToMission(navigate, 'top')}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#F472B6] px-4 py-4 text-white shadow-lg shadow-[#7C3AED]/20 transition-all hover:shadow-xl hover:shadow-[#7C3AED]/25 active:scale-[0.98]"
            >
              <span className="font-semibold tracking-wide">View Mission</span>
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

function PermaInsightCard({ area }: { area: PermaScore }) {
  const navigate = useNavigate();
  const isMeaning = area.area === 'Meaning';
  const styles = getPermaAreaStyles(area.area);
  const content = INSIGHT_CONTENT[isMeaning ? 'Meaning' : 'Accomplishment'];

  return (
    <article className="rounded-3xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${styles.icon}`}
          >
            {isMeaning ? <Target size={18} /> : <CheckCircle2 size={18} />}
          </div>
          <div className="min-w-0">
            <h4 className="text-base font-semibold text-[#241A44]">{area.area}</h4>
            <p className="mt-1 text-sm leading-relaxed text-[#7C719A]">{content.description}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${styles.pill}`}>
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
          {content.recommendation}
        </p>
      </div>

      <p className="mt-3 text-xs leading-snug text-[#7C719A]">{content.reflection}</p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#F1ECFF] px-3 py-1.5 text-xs font-semibold text-[#7C719A]">
          {content.location}
        </span>
        <span className="rounded-full bg-[#CCFBF1] px-3 py-1.5 text-xs font-semibold text-[#0F766E]">
          {content.duration}
        </span>
        <button
          type="button"
          onClick={() => navigateToMission(navigate, 'map')}
          className="ml-auto inline-flex min-h-11 items-center gap-1 rounded-full bg-[#EDE9FE] px-3 py-2 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE]"
        >
          <span>Try this</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </article>
  );
}
