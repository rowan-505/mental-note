import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Leaf, TrendingUp } from 'lucide-react';
import { carePermaArea, growthTrendData, strongestPermaArea } from '../wellnessDemo';
import { getPermaAreaStyles } from '../../lib/permaColors';

export function GrowthVisualization() {
  return (
    <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">
            Emotional Growth
          </p>
          <h3 className="mt-1 text-lg font-semibold text-[#241A44]">Your weekly reflection pattern</h3>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-[#CCFBF1] px-3 py-1.5 text-xs font-bold text-[#0F766E]">
          <TrendingUp size={13} />
          +8% growth
        </span>
      </div>

      <div className="rounded-3xl bg-[#F8F5FF] p-4">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthTrendData} margin={{ top: 10, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid stroke="#E7DFF7" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fill: '#7C719A', fontSize: 12 }}
                dy={8}
              />
              <YAxis hide domain={[60, 82]} />
              <Tooltip
                cursor={{ stroke: '#E7DFF7', strokeWidth: 1 }}
                contentStyle={{
                  border: '1px solid #E7DFF7',
                  borderRadius: 16,
                  boxShadow: '0 12px 30px rgba(36, 26, 68, 0.08)',
                  color: '#241A44',
                }}
                formatter={(value) => [`${value}%`, 'Growth score']}
                labelStyle={{ color: '#7C719A' }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#14B8A6"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2, stroke: '#FFFFFF', fill: '#7C3AED' }}
                activeDot={{ r: 6, strokeWidth: 3, stroke: '#FFFFFF', fill: '#14B8A6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-4">
          <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#EDE9FE] text-[#7C3AED]">
            <Leaf size={16} />
          </div>
          <p className="text-xs text-[#7C719A]">Strongest PERMA area</p>
          <p className="mt-1 text-sm font-bold text-[#241A44]">{strongestPermaArea}</p>
        </div>
        <div className="rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-4">
          <div
            className={`mb-2 flex h-8 w-8 items-center justify-center rounded-xl ${getPermaAreaStyles('Meaning').icon}`}
          >
            <Leaf size={16} />
          </div>
          <p className="text-xs text-[#7C719A]">Area needing care</p>
          <p className="mt-1 text-sm font-bold text-[#241A44]">{carePermaArea}</p>
        </div>
      </div>
    </section>
  );
}
