import { BarChart3, Heart, Sparkles } from 'lucide-react';
import { pageInnerClass, pageMainClass, pageShellClass } from '../components/pageLayout';
import { PermaProgressList } from '../components/PermaProgressList';
import { WeeklyTrendCard } from '../components/WeeklyTrendCard';
import {
  carePermaArea,
  mostFrequentSpecificEmotion,
  permaScores,
  strongestPermaArea,
} from '../wellnessDemo';

export function Insights() {
  return (
    <div className={pageShellClass}>
      <div className={pageInnerClass}>
        <header className="px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#7C719A]">Reflective Mind</p>
              <h1
                className="mt-1 text-2xl font-bold text-[#241A44]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Weekly Insights
              </h1>
            </div>
            <div className="rounded-2xl bg-[#EDE9FE] p-3 text-[#7C3AED]">
              <BarChart3 size={22} />
            </div>
          </div>
        </header>

        <main className={pageMainClass}>
          <WeeklyTrendCard title="Weekly Mood Trend" improvementLabel="+5% steadier this week" />

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-[#241A44]">PERMA Balance</h3>
                <p className="text-sm text-[#7C719A]">Relationships leads; Meaning could use gentle support.</p>
              </div>
              <div className="rounded-2xl bg-[#CCFBF1] p-2.5 text-[#0F766E]">
                <Heart size={18} />
              </div>
            </div>
            <PermaProgressList scores={permaScores} />
          </section>

          <section className="grid grid-cols-2 gap-3">
            <InsightStat label="Most frequent emotion" value={mostFrequentSpecificEmotion} />
            <InsightStat label="Strongest area" value={strongestPermaArea} />
            <InsightStat label="Focus area" value={carePermaArea} tone="care" />
            <InsightStat label="Streak" value="4 days" />
          </section>

          <section className="rounded-3xl border border-[#E7DFF7] bg-[#F1ECFF] p-5 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-2xl bg-white p-2.5 text-[#7C3AED]">
                <Sparkles size={18} />
              </div>
              <h3 className="text-lg font-semibold text-[#241A44]">Growth Summary</h3>
            </div>
            <p className="text-sm leading-relaxed text-[#7C719A]">
              You have a steady four-day writing rhythm. Relationship themes are strong, while
              Meaning benefits from short purpose notes and quiet campus reflection.
            </p>
          </section>
        </main>
      </div>

    </div>
  );
}

function InsightStat({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'care';
}) {
  return (
    <div
      className={`rounded-3xl border p-4 shadow-sm ${
        tone === 'care' ? 'border-[#FDE68A] bg-[#FFFBEB]' : 'border-[#E7DFF7] bg-white'
      }`}
    >
      <p className="text-xs text-[#7C719A]">{label}</p>
      <p className="mt-2 text-sm font-bold text-[#241A44]">{value}</p>
    </div>
  );
}
