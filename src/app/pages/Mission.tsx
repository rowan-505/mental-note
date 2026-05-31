import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Target } from 'lucide-react';
import { LocalMapCard } from '../../components/LocalMapCard';
import { pageInnerClass, pageMainClass, pageShellClass, tapLinkClass } from '../components/pageLayout';
import { localPlaces } from '../../data/localPlaces';
import { getMbtiSummary, normalizeMbtiType } from '../../data/mbtiGuidelines';
import { missions, permaMeta, type Mission, type PermaKey } from '../../data/missions';
import {
  demoPermaScores,
  getLowestPermaAreas,
  getRecommendedMissions,
} from '../../lib/missionRecommendation';
import {
  PERSONALITY_UPDATED_EVENT,
  readPersonalityType,
} from '../../lib/personalityStorage';
const PERMA_KEYS: PermaKey[] = ['P', 'E', 'R', 'M', 'A'];

const MBTI_PILL_LABELS: Record<'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P', string> = {
  I: 'Solo',
  E: 'Social',
  S: 'Concrete',
  N: 'Meaning',
  T: 'Results',
  F: 'Feeling',
  J: 'Structured',
  P: 'Flexible',
};

function formatFocusAreas(areas: PermaKey[]): string {
  return areas.map((area) => permaMeta[area].label).join(' + ');
}

function getPersonalityPills(type: string): string[] {
  const letters = normalizeMbtiType(type).split('') as Array<keyof typeof MBTI_PILL_LABELS>;

  if (letters.length !== 4) {
    return ['Solo', 'Meaning', 'Structured'];
  }

  return [MBTI_PILL_LABELS[letters[0]], MBTI_PILL_LABELS[letters[1]], MBTI_PILL_LABELS[letters[3]]];
}

function getPersonalitySummary(type: string): string {
  const pills = getPersonalityPills(type);
  return `Short, ${pills[0].toLowerCase()}, ${pills[2].toLowerCase()} missions may work better today.`;
}

function getMissionWhy(mission: Mission): string {
  return (
    mission.why ??
    `A small ${mission.permaLabel.toLowerCase()} action that fits today’s focus without needing a perfect mood.`
  );
}

function getMissionSteps(mission: Mission): string[] {
  return (
    mission.steps ?? [
      mission.action,
      `Stay with the task for about ${mission.duration}.`,
      'Notice one small shift before you finish.',
    ]
  );
}

function getMissionMinimumStandard(mission: Mission): string {
  return mission.minimumStandard ?? `Complete the action once within ${mission.duration}. Good enough counts.`;
}

function getMissionsByPerma(perma: PermaKey): Mission[] {
  return missions.filter((mission) => mission.perma === perma).slice(0, 3);
}

export function Mission() {
  const [mbtiType, setMbtiType] = useState(readPersonalityType);
  const focusAreas = useMemo(() => getLowestPermaAreas(demoPermaScores), []);
  const recommendedMissions = useMemo(
    () => getRecommendedMissions(demoPermaScores, mbtiType, 2),
    [mbtiType],
  );
  const personalityPills = useMemo(() => getPersonalityPills(mbtiType), [mbtiType]);
  const mbtiSummary = useMemo(() => getMbtiSummary(mbtiType), [mbtiType]);

  useEffect(() => {
    const syncPersonalityType = () => setMbtiType(readPersonalityType());
    window.addEventListener('focus', syncPersonalityType);
    window.addEventListener(PERSONALITY_UPDATED_EVENT, syncPersonalityType);
    return () => {
      window.removeEventListener('focus', syncPersonalityType);
      window.removeEventListener(PERSONALITY_UPDATED_EVENT, syncPersonalityType);
    };
  }, []);

  const [showGuide, setShowGuide] = useState(false);
  const [selectedPerma, setSelectedPerma] = useState<PermaKey>(focusAreas[0]);
  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);
  const [doneMissionIds, setDoneMissionIds] = useState<string[]>([]);

  const exploreMissions = useMemo(() => getMissionsByPerma(selectedPerma), [selectedPerma]);

  const toggleExpanded = (missionId: string) => {
    setExpandedMissionId((current) => (current === missionId ? null : missionId));
  };

  const markDone = (missionId: string) => {
    setDoneMissionIds((current) => (current.includes(missionId) ? current : [...current, missionId]));
  };

  return (
    <div className={pageShellClass}>
      <div className={pageInnerClass}>
        <header className="px-6 pt-10 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#7C719A]">Reflective Mind</p>
              <h1
                className="mt-1 text-2xl font-bold text-[#241A44]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Mission
              </h1>
              <p className="mt-2 text-sm text-[#7C719A]">PERMA-based actions for today.</p>
            </div>
            <div className="rounded-2xl bg-[#EDE9FE] p-3 text-[#7C3AED]">
              <Target size={22} />
            </div>
          </div>
        </header>

        <main className={pageMainClass}>
          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#14B8A6]">
              Today&apos;s Focus
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[#241A44]">{formatFocusAreas(focusAreas)}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">
              Small actions selected from your PERMA reflection.
            </p>
          </section>

          <section className="rounded-3xl border border-[#E7DFF7] bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7C3AED]">
              Personality Style
            </p>
            <h2 className="mt-2 text-lg font-semibold text-[#241A44]">
              {mbtiType} personality style (demo)
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {personalityPills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-[#EDE9FE] px-3 py-1.5 text-xs font-semibold text-[#7C3AED]"
                >
                  {pill}
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#7C719A]">{getPersonalitySummary(mbtiType)}</p>
            <p className="mt-2 text-xs leading-relaxed text-[#7C719A]">
              Demo personalization only. Not a psychological assessment.
            </p>
            <button
              type="button"
              onClick={() => setShowGuide((current) => !current)}
              className={`${tapLinkClass} mt-3`}
            >
              {showGuide ? 'Hide guide' : 'View guide'}
            </button>

            {showGuide && (
              <div className="mt-4 space-y-2 border-t border-[#E7DFF7] pt-4">
                {mbtiSummary.map(({ letter, guideline }) => (
                  <div key={letter} className="rounded-2xl bg-[#F8F5FF] p-3">
                    <p className="text-xs font-bold text-[#7C3AED]">
                      {letter} · {guideline.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#7C719A]">{guideline.missionRule}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-[#241A44]">Recommended Today</h2>
              <p className="text-sm text-[#7C719A]">Two small actions matched to your focus and style.</p>
            </div>
            {recommendedMissions.map((mission) => (
              <MissionCard
                key={`recommended-${mission.id}`}
                mission={mission}
                compact={false}
                expanded={expandedMissionId === `recommended-${mission.id}`}
                done={doneMissionIds.includes(mission.id)}
                onToggleExpand={() => toggleExpanded(`recommended-${mission.id}`)}
                onMarkDone={() => markDone(mission.id)}
              />
            ))}
          </section>

          <LocalMapCard place={localPlaces[0]} />

          <section className="space-y-3">
            <div>
              <h2 className="text-lg font-semibold text-[#241A44]">Explore by PERMA</h2>
              <p className="text-sm text-[#7C719A]">Browse three missions in one area.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PERMA_KEYS.map((key) => {
                const isSelected = selectedPerma === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSelectedPerma(key);
                      setExpandedMissionId(null);
                    }}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition-all ${
                      isSelected
                        ? 'border-[#7C3AED] bg-gradient-to-br from-[#7C3AED] to-[#A855F7] text-white shadow-md shadow-[#7C3AED]/20'
                        : 'border-[#E7DFF7] bg-white text-[#241A44] hover:border-[#D8C9F3] hover:bg-[#F8F5FF]'
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-[#7C719A]">{permaMeta[selectedPerma].label}</p>

            {exploreMissions.map((mission) => (
              <MissionCard
                key={`explore-${mission.id}`}
                mission={mission}
                compact
                expanded={expandedMissionId === `explore-${mission.id}`}
                done={doneMissionIds.includes(mission.id)}
                onToggleExpand={() => toggleExpanded(`explore-${mission.id}`)}
                onMarkDone={() => markDone(mission.id)}
              />
            ))}
          </section>

        </main>
      </div>
    </div>
  );
}

type MissionCardProps = {
  mission: Mission;
  compact?: boolean;
  expanded: boolean;
  done: boolean;
  onToggleExpand: () => void;
  onMarkDone: () => void;
};

function MissionCard({
  mission,
  compact = false,
  expanded,
  done,
  onToggleExpand,
  onMarkDone,
}: MissionCardProps) {
  const supportsLabel = mission.supports.map((area) => permaMeta[area].label).join(', ');
  const cautionLabel =
    mission.cautionType && mission.cautionType !== 'none' ? mission.cautionType : null;

  return (
    <article
      className={`rounded-3xl border border-[#E7DFF7] bg-white shadow-sm ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      <button type="button" onClick={onToggleExpand} className="w-full text-left">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-xs font-semibold text-[#7C3AED]">
            {mission.permaLabel}
          </span>
          <span className="rounded-full bg-[#CCFBF1] px-3 py-1 text-xs font-semibold text-[#0F766E]">
            {mission.duration}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <h3 className={`font-semibold text-[#241A44] ${compact ? 'text-sm' : 'text-base'}`}>
              {mission.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">{mission.action}</p>
          </div>
          <ChevronDown
            size={18}
            className={`mt-1 shrink-0 text-[#7C719A] transition-transform ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </div>

        <p className="mt-3 text-xs text-[#7C719A]">
          <span className="font-semibold text-[#241A44]">Supports:</span> {supportsLabel}
        </p>

        {mission.caution && cautionLabel && (
          <div className="mt-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2 text-xs leading-relaxed text-[#92400E]">
            Style note ({cautionLabel}): {mission.caution}
          </div>
        )}
      </button>

      {!expanded && (
        <button
          type="button"
          onClick={onToggleExpand}
          className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[#EDE9FE] px-4 py-2.5 text-xs font-bold text-[#7C3AED] transition-colors hover:bg-[#DDD6FE]"
        >
          Start mission
        </button>
      )}

      {expanded && (
        <div className="mt-4 space-y-4 border-t border-[#E7DFF7] pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">
              Why this helps
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">{getMissionWhy(mission)}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7C3AED]">Steps</p>
            <ol className="mt-2 space-y-2">
              {getMissionSteps(mission).map((step, index) => (
                <li key={index} className="flex gap-2 text-sm leading-relaxed text-[#7C719A]">
                  <span className="font-semibold text-[#7C3AED]">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl bg-[#F8F5FF] p-3">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#241A44]">
              Minimum standard
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#7C719A]">
              {getMissionMinimumStandard(mission)}
            </p>
          </div>

          <button
            type="button"
            onClick={onMarkDone}
            disabled={done}
            className="w-full rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#F472B6] py-3 text-sm font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition-all active:scale-[0.98] disabled:cursor-default disabled:opacity-70"
          >
            {done ? 'Done for demo' : 'Mark as done'}
          </button>
        </div>
      )}
    </article>
  );
}
