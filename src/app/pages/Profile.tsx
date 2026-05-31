import { useState } from 'react';
import { Bell, Brain, Download, Heart, Info, Lock } from 'lucide-react';
import { normalizeMbtiType } from '../../data/mbtiGuidelines';
import { externalResources } from '../../data/externalResources';
import {
  readPersonalityType,
  savePersonalityType,
} from '../../lib/personalityStorage';
import { cardClass, pageInnerClass, pageMainClass, pageShellClass, tapLinkClass } from '../components/pageLayout';
import { carePermaArea, strongestPermaArea } from '../wellnessDemo';

const MBTI_DIMENSIONS = [
  ['I', 'E'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
] as const;

const stats = [
  { label: 'Reflections', value: '7' },
  { label: 'Day streak', value: '4' },
  { label: 'Strongest PERMA', value: strongestPermaArea },
  { label: 'Focus area', value: carePermaArea },
];

const demoItems = [
  { icon: <Bell size={16} />, label: 'Reminder' },
  { icon: <Lock size={16} />, label: 'Privacy' },
  { icon: <Download size={16} />, label: 'Export' },
  { icon: <Info size={16} />, label: 'About' },
];

const resourceIcons = {
  'personality-test': <Brain size={18} />,
  'mood-screening': <Heart size={18} />,
} as const;

function openExternalResource(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function Profile() {
  const [mbtiType, setMbtiType] = useState(readPersonalityType);

  const updateDimension = (dimensionIndex: number, letter: string) => {
    const letters = normalizeMbtiType(mbtiType).split('');
    letters[dimensionIndex] = letter;
    const nextType = savePersonalityType(letters.join(''));
    setMbtiType(nextType);
  };

  return (
    <div className={pageShellClass}>
      <div className={pageInnerClass}>
        <header className="px-6 pt-10 pb-4">
          <section className={cardClass}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#F472B6] shadow-md shadow-[#7C3AED]/20">
                <span className="text-[10px] font-bold tracking-[0.16em] text-white">NOVA</span>
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

        <main className={pageMainClass}>
          <section className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#E7DFF7] bg-white p-4 shadow-sm">
                <p className="text-xs text-[#7C719A]">{stat.label}</p>
                <p className="mt-2 text-base font-bold text-[#241A44]">{stat.value}</p>
              </div>
            ))}
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-semibold text-[#241A44]">Personality Style</h3>
            <p className="mt-1 text-sm text-[#7C719A]">
              Demo personality style:{' '}
              <span className="font-semibold text-[#7C3AED]">{normalizeMbtiType(mbtiType)}</span>
            </p>

            <div className="mt-3 space-y-2">
              {MBTI_DIMENSIONS.map((options, dimensionIndex) => (
                <div
                  key={options.join('-')}
                  className="grid grid-cols-2 gap-2 rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-1"
                >
                  {options.map((letter) => {
                    const isSelected = normalizeMbtiType(mbtiType)[dimensionIndex] === letter;

                    return (
                      <button
                        key={letter}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => updateDimension(dimensionIndex, letter)}
                        className={`min-h-11 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                            : 'text-[#7C719A] hover:text-[#7C3AED]'
                        }`}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#7C719A]">
              Used only for demo mission personalization. Not a psychological assessment.
            </p>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-semibold text-[#241A44]">Demo Settings</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {demoItems.map((item) => (
                <button
                  type="button"
                  key={item.label}
                  className="flex min-h-[4.5rem] flex-col items-center justify-center gap-2 rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-3 text-[#241A44] transition-colors hover:border-[#D8C9F3]"
                >
                  <span className="rounded-xl bg-[#EDE9FE] p-2 text-[#7C3AED]">{item.icon}</span>
                  <span className="text-xs font-semibold">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          <section className={cardClass}>
            <h3 className="text-lg font-semibold text-[#241A44]">Self-Discovery Resources</h3>

            <div className="mt-3 space-y-2">
              {externalResources.map((resource) => (
                <div
                  key={resource.id}
                  className="rounded-2xl border border-[#E7DFF7] bg-[#F8F5FF] p-3"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-xl bg-[#EDE9FE] p-2 text-[#7C3AED]">
                      {resourceIcons[resource.id as keyof typeof resourceIcons]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#241A44]">{resource.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#7C719A]">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openExternalResource(resource.url)}
                    className={`${tapLinkClass} mt-3 w-full`}
                  >
                    Open ↗
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-3 border-t border-[#E7DFF7] pt-3 text-xs leading-relaxed text-[#7C719A]">
              External resources are for self-understanding only. Reflective Mind does not provide
              medical diagnosis or treatment.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
