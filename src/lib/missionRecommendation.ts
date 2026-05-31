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

  return [...missions]
    .sort(
      (a, b) =>
        scoreMissionForUser(b, focusAreas, mbtiType) -
        scoreMissionForUser(a, focusAreas, mbtiType),
    )
    .slice(0, limit);
}
