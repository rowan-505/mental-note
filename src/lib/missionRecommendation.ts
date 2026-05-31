import { getMbtiLetters } from '../data/mbtiGuidelines';
import { missions, type Mission, type PermaKey } from '../data/missions';

/** Demo-only PERMA score map. Not a clinical or diagnostic measure. */
export type PermaScores = Record<PermaKey, number>;

/** Static demo scores aligned with the app's wellness prototype. */
export const demoPermaScores: PermaScores = {
  P: 78,
  E: 72,
  R: 85,
  M: 62,
  A: 68,
};

export const PRIMARY_FOCUS_PERMA: PermaKey = 'M';
export const SECONDARY_FOCUS_PERMA: PermaKey = 'A';

/**
 * Returns the lowest-scoring PERMA areas for demo mission targeting.
 * Demo logic only — not medical or psychological diagnosis.
 */
export function getLowestPermaAreas(scores: PermaScores, count = 2): PermaKey[] {
  return (Object.keys(scores) as PermaKey[])
    .sort((a, b) => {
      const scoreDiff = scores[a] - scores[b];
      return scoreDiff !== 0 ? scoreDiff : a.localeCompare(b);
    })
    .slice(0, count);
}

/**
 * Scores a mission for demo personalization using PERMA focus areas and MBTI hints.
 * Demo logic only — not medical or psychological diagnosis.
 */
export function scoreMissionForUser(
  mission: Mission,
  focusAreas: PermaKey[],
  mbtiType: string,
): number {
  const mbtiLetters = getMbtiLetters(mbtiType);
  let score = 0;

  if (focusAreas.includes(mission.perma)) {
    score += 40;
  }

  if (mission.supports.some((area) => focusAreas.includes(area))) {
    score += 20;
  }

  if (mbtiLetters.includes('I') && mission.mode === 'solo') {
    score += 10;
  }

  if (mbtiLetters.includes('E') && mission.mode === 'social') {
    score += 10;
  }

  if (mbtiLetters.includes('J') && mission.steps !== undefined) {
    score += 8;
  }

  if (mbtiLetters.includes('P') && mission.difficulty === 'easy') {
    score += 8;
  }

  if (mbtiLetters.includes('I') && mission.mode === 'social') {
    score -= 8;
  }

  return score;
}

function scoreFocusMission(mission: Mission, mbtiType: string): number {
  const focusAreas = getLowestPermaAreas(demoPermaScores);
  let score = scoreMissionForUser(mission, focusAreas, mbtiType);

  if (mission.perma === PRIMARY_FOCUS_PERMA) {
    score += 25;
  }

  if (mission.perma === SECONDARY_FOCUS_PERMA) {
    score += 15;
  }

  if (mission.id === 'm-future-goal-link') {
    score += 20;
  }

  return score;
}

/**
 * Demo missions aligned with Meaning-first and Accomplishment-second focus.
 */
export function getFocusMissionCandidatePool(): Mission[] {
  return missions.filter(
    (mission) =>
      mission.perma === PRIMARY_FOCUS_PERMA ||
      mission.perma === SECONDARY_FOCUS_PERMA ||
      mission.supports.includes(PRIMARY_FOCUS_PERMA) ||
      mission.supports.includes(SECONDARY_FOCUS_PERMA),
  );
}

export function getDefaultFocusMission(): Mission {
  return (
    missions.find((mission) => mission.id === 'm-future-goal-link') ??
    getFocusMissionCandidatePool()[0] ??
    missions[0]
  );
}

export function pickFocusMission(excludeId: string | undefined, mbtiType: string): Mission {
  let pool = getFocusMissionCandidatePool().filter((mission) => mission.id !== excludeId);

  if (pool.length === 0) {
    pool = getFocusMissionCandidatePool();
  }

  const scored = pool
    .map((mission) => ({ mission, score: scoreFocusMission(mission, mbtiType) }))
    .sort((a, b) => b.score - a.score);

  const topPool = scored.slice(0, 4);
  const totalWeight = topPool.reduce((sum, item) => sum + Math.max(item.score, 1), 0);
  let roll = Math.random() * totalWeight;

  for (const item of topPool) {
    roll -= Math.max(item.score, 1);
    if (roll <= 0) {
      return item.mission;
    }
  }

  return topPool[0]?.mission ?? getDefaultFocusMission();
}

/**
 * Picks top demo mission recommendations from static data.
 * Demo logic only — not medical or psychological diagnosis.
 */
export function getRecommendedMissions(
  scores: PermaScores,
  mbtiType: string,
  limit = 2,
): Mission[] {
  const focusAreas = getLowestPermaAreas(scores);
  const focusPool = getFocusMissionCandidatePool();

  return [...focusPool]
    .sort(
      (a, b) =>
        scoreMissionForUser(b, focusAreas, mbtiType) -
        scoreMissionForUser(a, focusAreas, mbtiType),
    )
    .slice(0, limit);
}
