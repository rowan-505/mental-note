import { useNavigate } from 'react-router';
import { Edit3 } from 'lucide-react';
import { pageInnerClass, pageMainCompactClass, pageShellClass } from '../components/pageLayout';
import { StreakCard } from '../components/StreakCard';
import { MoodSelector } from '../components/MoodSelector';
import { NovaHeader } from '../components/NovaHeader';
import { PermaProgressList } from '../components/PermaProgressList';
import { RecommendationCard } from '../components/RecommendationCard';
import { WeeklyTrendCard } from '../components/WeeklyTrendCard';
import { moodOptions, permaScores } from '../wellnessDemo';
import { useWellness } from '../wellnessState';
import { navigateToMission } from '../../lib/missionNavigation';
import { getPermaAreaStyles } from '../../lib/permaColors';

export function Dashboard() {
  const navigate = useNavigate();
  const { selectedMood, setSelectedMood, recommendation } = useWellness();
  const meaningStyles = getPermaAreaStyles('Meaning');
  const accomplishmentStyles = getPermaAreaStyles('Accomplishment');
  const engagementStyles = getPermaAreaStyles('Engagement');

  return (
    <div className={pageShellClass}>
      <div className={pageInnerClass}>
        <NovaHeader username="Nova" />

        <div className={pageMainCompactClass}>
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm">
            <MoodSelector
              moods={moodOptions}
              selectedMood={selectedMood}
              onSelect={setSelectedMood}
              label="How are you feeling today?"
            />
          </section>

        <button
          type="button"
          onClick={() => navigate('/journal/write')}
          className="w-full bg-gradient-to-r from-[#7C3AED] to-[#F472B6] text-white py-4 rounded-3xl shadow-lg shadow-[#7C3AED]/20 hover:shadow-xl hover:shadow-[#7C3AED]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
        >
            <Edit3 size={22} strokeWidth={2.5} />
            <span className="font-semibold tracking-wide">Start Writing</span>
          </button>

          

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
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

          

          <RecommendationCard
            recommendation={recommendation}
            title="Today's Mission"
            onTryClick={() => navigateToMission(navigate, 'map')}
          />

          

        </div>
      </div>
    </div>
  );
}
