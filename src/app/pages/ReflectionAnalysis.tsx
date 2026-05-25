import { useNavigate } from 'react-router';
import { Sparkles, Brain, TrendingUp, Heart, Users, Target, Award, Smile, ArrowRight, Lightbulb } from 'lucide-react';
import { PermaAnalysisCard } from '../components/PermaAnalysisCard';
import { GrowthVisualization } from '../components/GrowthVisualization';

export function ReflectionAnalysis() {
  const navigate = useNavigate();

  const permaScores = [
    { icon: <Smile size={20} />, label: 'Positive Emotion', score: 78, trend: '+5' },
    { icon: <Target size={20} />, label: 'Engagement', score: 72, trend: '+3' },
    { icon: <Users size={20} />, label: 'Relationships', score: 85, trend: '+8' },
    { icon: <Heart size={20} />, label: 'Meaning', score: 68, trend: '+2' },
    { icon: <Award size={20} />, label: 'Accomplishment', score: 80, trend: '+6' },
  ];

  const permaRecommendations = [
    {
      area: 'Meaning',
      score: 68,
      icon: '🎯',
      insight: 'Your sense of purpose could be strengthened',
      suggestions: [
        'Identify activities that align with your core values',
        'Volunteer for a cause you care deeply about',
      ],
    },
    {
      area: 'Engagement',
      score: 72,
      icon: '⚡',
      insight: 'Room to deepen your flow and focus',
      suggestions: [
        'Try activities that challenge you at just the right level',
        'Practice single-tasking to improve concentration',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F5FF]">
      <div className="max-w-md mx-auto pb-8">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] text-white px-6 pt-10 pb-8 relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#00E5FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-8 right-8 w-20 h-20 bg-[#FF2D78]/20 rounded-full blur-2xl"></div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Brain size={20} />
              </div>
              <span className="text-sm font-semibold opacity-90 tracking-wide">AI Analysis Complete</span>
            </div>
            <h1 className="mb-1 text-2xl font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Your Reflection Insights
            </h1>
            <p className="text-white/80 text-sm">
              Supporting your emotional growth journey 🚀
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 space-y-5 mt-6">
          {/* PERMA Analysis Breakdown */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#1A0A3D]">PERMA Analysis</h3>
              <div className="flex items-center gap-1 text-xs text-[#8B2FFF] bg-[#EEE6FF] px-3 py-1.5 rounded-full font-semibold">
                <TrendingUp size={14} />
                <span>Strong</span>
              </div>
            </div>
            <div className="space-y-3">
              {permaScores.map((item, index) => (
                <PermaAnalysisCard
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  score={item.score}
                  trend={item.trend}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-[#8B2FFF]/6 to-[#FF2D78]/6 rounded-3xl p-6 border border-[#8B2FFF]/12">
            <div className="flex items-start gap-3 mb-5">
              <div className="bg-gradient-to-br from-[#8B2FFF] to-[#FF2D78] p-2.5 rounded-xl shadow-md shadow-[#8B2FFF]/25">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-[#1A0A3D] mb-1">Personalized Insights</h3>
                <p className="text-[#7B6B9D] text-sm">Based on your PERMA analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              {permaRecommendations.map((item, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-[#8B2FFF]/8">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[#1A0A3D] font-semibold">{item.area}</h4>
                        <span className="text-xs text-[#8B2FFF] bg-[#EEE6FF] px-2 py-1 rounded-full font-semibold">
                          {item.score}%
                        </span>
                      </div>
                      <p className="text-sm text-[#7B6B9D] italic">{item.insight}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {item.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Lightbulb size={14} className="text-[#FF2D78] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-[#1A0A3D]">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emotional Growth Visualization */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#1A0A3D]">Emotional Growth</h3>
              <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] text-white px-3 py-1.5 rounded-full font-semibold">
                <TrendingUp size={12} />
                <span>+12% this month</span>
              </div>
            </div>
            <GrowthVisualization />
          </div>

          {/* Continue Journey Button */}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-[#8B2FFF] via-[#C42EFF] to-[#FF2D78] text-white py-5 rounded-3xl shadow-lg shadow-[#8B2FFF]/30 hover:shadow-xl hover:shadow-[#8B2FFF]/40 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <span className="font-semibold tracking-wide">Continue Your Journey</span>
            <ArrowRight size={20} strokeWidth={2.5} />
          </button>

          <div className="h-4"></div>
        </div>
      </div>
    </div>
  );
}
