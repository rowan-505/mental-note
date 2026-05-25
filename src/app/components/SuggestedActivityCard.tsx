import { Sparkles, ArrowRight } from 'lucide-react';

export function SuggestedActivityCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#8B2FFF]/10">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-[#00E5FF] to-[#8B2FFF] p-3 rounded-2xl shadow-md shadow-[#8B2FFF]/20">
          <Sparkles size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-[#1A0A3D] mb-1.5 font-semibold">Suggested Activity</h4>
          <p className="text-[#7B6B9D] text-sm mb-4">
            Take a 5-minute breathing exercise to reduce stress and improve focus.
          </p>
          <button className="flex items-center gap-1.5 text-sm font-semibold text-[#8B2FFF] hover:text-[#6B0FDD] transition-colors group">
            <span>Start Now</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
