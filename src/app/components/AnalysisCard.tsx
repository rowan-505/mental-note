import { Calendar, Clock } from 'lucide-react';

export function AnalysisCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#5b9a8b]/8">
      <div className="flex items-center gap-2 mb-4 text-sm text-[#6b7c77]">
        <Calendar size={16} />
        <span>Monday, May 18, 2026</span>
        <span className="mx-1">•</span>
        <Clock size={16} />
        <span>Evening</span>
      </div>

      <div className="bg-gradient-to-br from-[#f4f8f6] to-[#e8f0ed] rounded-2xl p-4 mb-4">
        <p className="text-[#2d3e3a] leading-relaxed italic">
          "Today I had a meaningful conversation with a friend that really helped me process some challenges I've been facing. It made me realize how important connection is..."
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 bg-[#5b9a8b]/10 px-3 py-1.5 rounded-full">
          <span className="text-2xl">😌</span>
          <span className="text-xs text-[#5b9a8b] font-medium">Calm</span>
        </div>
        <div className="flex-1 text-right">
          <span className="text-xs text-[#6b7c77]">284 words</span>
        </div>
      </div>
    </div>
  );
}
