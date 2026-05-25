interface InsightCardProps {
  text: string;
  icon: React.ReactNode;
}

export function InsightCard({ text, icon }: InsightCardProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <p className="text-sm text-[#2d3e3a] leading-relaxed flex-1">{text}</p>
    </div>
  );
}
