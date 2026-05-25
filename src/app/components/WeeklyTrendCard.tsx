import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { getAverageScore, TrendPoint, weeklyTrendData } from '../wellnessDemo';

type WeeklyTrendCardProps = {
  data?: TrendPoint[];
  title?: string;
  improvementLabel?: string;
};

export function WeeklyTrendCard({
  data = weeklyTrendData,
  title = 'Weekly Trend',
  improvementLabel = '+5% this week',
}: WeeklyTrendCardProps) {
  const averageScore = getAverageScore(data);

  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#241A44]">{title}</h3>
          <p className="text-sm text-[#7C719A]">A gentle view of your emotional rhythm.</p>
        </div>
        <div className="rounded-2xl bg-[#EDE9FE] p-2.5 text-[#7C3AED]">
          <TrendingUp size={18} />
        </div>
      </div>

      <div className="h-44">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <CartesianGrid stroke="#E7DFF7" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#7C719A', fontSize: 12 }}
              dy={8}
            />
            <YAxis hide domain={[55, 85]} />
            <Tooltip
              cursor={{ stroke: '#E7DFF7', strokeWidth: 1 }}
              contentStyle={{
                border: '1px solid #E7DFF7',
                borderRadius: 16,
                boxShadow: '0 12px 30px rgba(36, 26, 68, 0.08)',
                color: '#241A44',
              }}
              formatter={(value) => [`${value}%`, 'Mood score']}
              labelStyle={{ color: '#7C719A' }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, stroke: '#FFFFFF', fill: '#14B8A6' }}
              activeDot={{ r: 6, strokeWidth: 3, stroke: '#FFFFFF', fill: '#7C3AED' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#E7DFF7] pt-4">
        <div>
          <p className="text-xs text-[#7C719A]">Average score</p>
          <p className="text-xl font-bold text-[#241A44]">{averageScore}%</p>
        </div>
        <span className="rounded-full bg-[#CCFBF1] px-3 py-1.5 text-xs font-bold text-[#0F766E]">
          {improvementLabel}
        </span>
      </div>
    </section>
  );
}
