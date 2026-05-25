import { ArrowRight, Clock } from 'lucide-react';

interface WellnessSuggestionProps {
  title: string;
  description: string;
  duration: string;
  icon: string;
}

export function WellnessSuggestion({ title, description, duration, icon }: WellnessSuggestionProps) {
  return (
    <button className="w-full bg-gradient-to-br from-[#F9F5FF] to-[#F2ECFF] hover:from-[#EEE6FF] hover:to-[#E6D5FF] rounded-2xl p-4 border border-[#8B2FFF]/10 hover:border-[#8B2FFF]/20 transition-all group text-left">
      <div className="flex items-start gap-3">
        <div className="text-3xl mt-0.5">{icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h4 className="text-[#1A0A3D] font-semibold">{title}</h4>
            <ArrowRight size={18} className="text-[#8B2FFF] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-sm text-[#7B6B9D] mb-2">{description}</p>
          <div className="flex items-center gap-1.5 text-xs text-[#8B2FFF] font-semibold">
            <Clock size={14} />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
