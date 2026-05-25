export function WeeklyTrendChart() {
  const data = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 72 },
    { day: 'Wed', value: 68 },
    { day: 'Thu', value: 78 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 75 },
    { day: 'Sun', value: 72 },
  ];

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-2 h-40">
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isToday = index === 3;

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-3">
              <div className="flex-1 w-full flex items-end">
                <div
                  className={`w-full rounded-t-xl transition-all ${
                    isToday
                      ? 'bg-gradient-to-t from-[#8B2FFF] to-[#FF2D78] shadow-lg shadow-[#8B2FFF]/25'
                      : 'bg-[#EEE6FF] hover:bg-[#DDD0FF]'
                  }`}
                  style={{ height: `${heightPercentage}%` }}
                ></div>
              </div>
              <span
                className={`text-xs font-semibold ${
                  isToday ? 'text-[#8B2FFF]' : 'text-[#7B6B9D]'
                }`}
              >
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-[#EEE6FF]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#8B2FFF] to-[#FF2D78]"></div>
          <span className="text-xs text-[#7B6B9D] font-medium">Average: 71%</span>
        </div>
        <span className="text-xs text-[#8B2FFF] font-bold">↑ 5% this week</span>
      </div>
    </div>
  );
}
