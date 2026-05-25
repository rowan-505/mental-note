import { Bell, Download, Info, Lock } from 'lucide-react';
import { carePermaArea, strongestPermaArea } from '../wellnessDemo';

const stats = [
  { label: 'Reflections', value: '7' },
  { label: 'Day streak', value: '4' },
  { label: 'Strongest PERMA', value: strongestPermaArea },
  { label: 'Needs care', value: carePermaArea },
];

const demoItems = [
  { icon: <Bell size={18} />, label: 'Reflection reminder' },
  { icon: <Lock size={18} />, label: 'Privacy mode' },
  { icon: <Download size={18} />, label: 'Export journal demo' },
  { icon: <Info size={18} />, label: 'About Reflective Mind' },
];

export function Profile() {
  return (
    <div className="min-h-screen bg-[#F8F5FF] pb-24">
      <div className="mx-auto max-w-md">
        <header className="px-6 pt-10 pb-6">
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#F472B6] shadow-md shadow-[#7C3AED]/20">
                <span className="text-xs font-bold tracking-[0.16em] text-white">NOVA</span>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#14B8A6]">
                  Team NOVA
                </p>
                <h1
                  className="text-2xl font-bold text-[#241A44]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Nova
                </h1>
                <p className="text-sm text-[#7C719A]">Reflective Mind demo profile</p>
              </div>
            </div>
          </section>
        </header>

        <main className="space-y-5 px-6">
          <section className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm">
                <p className="text-xs text-[#7C719A]">{stat.label}</p>
                <p className="mt-2 text-base font-bold text-[#241A44]">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-[#241A44]">Demo Settings</h3>
            <p className="mt-1 text-sm text-[#7C719A]">Static items for the presentation prototype.</p>
            <div className="mt-4 space-y-3">
              {demoItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className="flex w-full items-center gap-3 rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-3 text-left text-[#241A44]"
                >
                  <span className="rounded-xl bg-[#EDE9FE] p-2 text-[#7C3AED]">{item.icon}</span>
                  <span className="text-sm font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>

    </div>
  );
}
