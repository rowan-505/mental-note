import { useNavigate } from 'react-router';
import { Edit3, TrendingUp, Heart, Users, Target, Award, Smile } from 'lucide-react';
import { EmotionalStatusCard } from '../components/EmotionalStatusCard';
import { PermaCard } from '../components/PermaCard';
import { StreakCard } from '../components/StreakCard';
import { SuggestedActivityCard } from '../components/SuggestedActivityCard';
import { WeeklyTrendChart } from '../components/WeeklyTrendChart';
import { BottomNav } from '../components/BottomNav';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F5FF] pb-20">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="px-6 pt-12 pb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[#7B6B9D] text-sm font-medium mb-0.5">Good Evening ✨</p>
              <h1 className="text-[#1A0A3D] font-bold text-2xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Hey, Nyi! 👋
              </h1>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B2FFF] via-[#FF2D78] to-[#00E5FF] shadow-lg shadow-[#8B2FFF]/30 flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
          </div>
          <p className="text-[#7B6B9D] text-sm mt-1">How are you feeling today?</p>
        </div>

        {/* Main Content */}
        <div className="px-6 space-y-5">
          {/* Emotional Status Card */}
          <EmotionalStatusCard />

          {/* Start Writing Button */}
          <button
            onClick={() => navigate('/journal/write')}
            className="w-full bg-gradient-to-r from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] text-white py-5 rounded-3xl shadow-lg shadow-[#8B2FFF]/30 hover:shadow-xl hover:shadow-[#8B2FFF]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <Edit3 size={22} strokeWidth={2.5} />
            <span className="font-semibold tracking-wide">Start Writing</span>
          </button>

          {/* PERMA Overview */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#1A0A3D]">Wellness Overview</h3>
              <span className="text-xs text-[#8B2FFF] bg-[#EEE6FF] px-3 py-1 rounded-full font-medium">PERMA</span>
            </div>
            <div className="space-y-4">
              <PermaCard
                icon={<Smile size={18} />}
                label="Positive Emotion"
                value={72}
                gradient="from-[#8B2FFF] to-[#A855F7]"
              />
              <PermaCard
                icon={<Target size={18} />}
                label="Engagement"
                value={65}
                gradient="from-[#FF2D78] to-[#FF6B9D]"
              />
              <PermaCard
                icon={<Users size={18} />}
                label="Relationships"
                value={80}
                gradient="from-[#00E5FF] to-[#00B4D8]"
              />
              <PermaCard
                icon={<Heart size={18} />}
                label="Meaning"
                value={58}
                gradient="from-[#8B2FFF] to-[#FF2D78]"
              />
              <PermaCard
                icon={<Award size={18} />}
                label="Accomplishment"
                value={75}
                gradient="from-[#FF2D78] to-[#00E5FF]"
              />
            </div>
          </div>

          {/* Reflection Streak */}
          <StreakCard />

          {/* Suggested Activity */}
          <SuggestedActivityCard />

          {/* Weekly Emotional Trend */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#1A0A3D]">Weekly Trend</h3>
              <TrendingUp size={18} className="text-[#8B2FFF]" />
            </div>
            <WeeklyTrendChart />
          </div>

          {/* Bottom Spacing */}
          <div className="h-4"></div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
