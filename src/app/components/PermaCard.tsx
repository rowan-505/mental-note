interface PermaCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  gradient: string;
}

export function PermaCard({ icon, label, value, gradient }: PermaCardProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`bg-gradient-to-br ${gradient} text-white p-2.5 rounded-xl shadow-sm`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm text-[#1A0A3D] font-medium">{label}</span>
          <span className="text-sm text-[#8B2FFF] font-bold">{value}%</span>
        </div>
        <div className="h-2 bg-[#EEE6FF] rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all duration-700`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
