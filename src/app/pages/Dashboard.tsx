import { useNavigate } from 'react-router';
import { Edit3 } from 'lucide-react';
import { StreakCard } from '../components/StreakCard';
import { MoodSelector } from '../components/MoodSelector';
import { NovaHeader } from '../components/NovaHeader';
import { PermaProgressList } from '../components/PermaProgressList';
import { RecommendationCard } from '../components/RecommendationCard';
import { WeeklyTrendCard } from '../components/WeeklyTrendCard';
import { moodOptions, permaScores } from '../wellnessDemo';
import { useWellness } from '../wellnessState';

export function Dashboard() {
  const navigate = useNavigate();
  const { selectedMood, setSelectedMood, recommendation } = useWellness();
  const moodLabel = moodOptions.find((mood) => mood.key === selectedMood)?.label ?? 'Good';

  return (
    <div className="min-h-screen bg-[#F8F5FF] pb-24">
      <div className="max-w-md mx-auto">
        <NovaHeader username="Nova" />

        <div className="px-6 space-y-4">
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm">
            <MoodSelector
              moods={moodOptions}
              selectedMood={selectedMood}
              onSelect={setSelectedMood}
              label="How are you feeling today?"
            />
          </section>

          <button
            onClick={() => navigate('/journal/write')}
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#F472B6] text-white py-4 rounded-3xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Edit3 size={22} strokeWidth={2.5} />
            <span className="font-semibold tracking-wide">Start Writing</span>
          </button>

          <section className="bg-white rounded-3xl p-5 shadow-sm border border-[#E7DFF7]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[#241A44]">Wellness Overview</h3>
                <p className="text-sm text-[#7C719A]">PERMA snapshot for this demo week.</p>
              </div>
              <span className="text-xs text-[#7C3AED] bg-[#EDE9FE] px-3 py-1 rounded-full font-medium">
                PERMA
              </span>
            </div>
            <PermaProgressList scores={permaScores} />
          </section>

          <StreakCard />

          <RecommendationCard
            recommendation={recommendation}
            moodLabel={moodLabel}
            title="Local Recommendation"
          />

          <WeeklyTrendCard />

          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
