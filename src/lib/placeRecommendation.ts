import type { MoodKey as AppMoodKey } from '../app/wellnessDemo';
import { getMbtiLetters } from '../data/mbtiGuidelines';
import {
  ajouPlaces,
  type AjouPlace,
  type MoodKey,
  type PermaKey,
  type PlaceCategory,
} from '../data/ajouPlaces';

const CALM_CATEGORIES = new Set<PlaceCategory>(['walk', 'quiet', 'cafe', 'library', 'study_cafe']);
const SOCIAL_CATEGORIES = new Set<PlaceCategory>(['restaurant', 'meeting', 'cafe']);
const I_FRIENDLY_CATEGORIES = new Set<PlaceCategory>(['quiet', 'library', 'study_cafe', 'walk', 'campus']);
const E_FRIENDLY_CATEGORIES = new Set<PlaceCategory>(['restaurant', 'meeting', 'cafe']);
const J_FRIENDLY_CATEGORIES = new Set<PlaceCategory>(['library', 'study_cafe']);
const P_FRIENDLY_CATEGORIES = new Set<PlaceCategory>(['walk', 'cafe']);

const MISSION_PERMA_CATEGORIES: Record<PermaKey, PlaceCategory[]> = {
  P: ['cafe', 'walk', 'restaurant'],
  E: ['study_cafe', 'library', 'meeting'],
  R: ['restaurant', 'meeting', 'cafe'],
  M: ['walk', 'quiet', 'cafe', 'library', 'campus', 'hospital_area'],
  A: ['study_cafe', 'library', 'meeting', 'campus'],
};

const NOISY_CATEGORIES = new Set<PlaceCategory>(['restaurant', 'meeting']);

const TOP_POOL_SIZE = 8;
const VARIETY_POOL_SIZE = 12;

export type PlaceRecommendationParams = {
  focusAreas: PermaKey[];
  mood: MoodKey;
  mbtiType: string;
  missionPerma?: PermaKey;
  currentPlaceId?: string;
  excludePlaceIds?: string[];
  currentPlaceCategory?: PlaceCategory;
  preferVariety?: boolean;
  recommendationMode?: 'perma' | 'mbti';
  selectedPerma?: PermaKey;
};

export function mapAppMoodToPlaceMood(mood: AppMoodKey): MoodKey {
  const moodMap: Record<AppMoodKey, MoodKey> = {
    great: 'Great',
    good: 'Good',
    okay: 'Neutral',
    low: 'Bad',
  };

  return moodMap[mood] ?? 'Good';
}

function scoreAjouPlace(place: AjouPlace, params: PlaceRecommendationParams): number {
  const letters = getMbtiLetters(params.mbtiType);
  let score = 0;

  if (params.missionPerma && place.goodForPerma.includes(params.missionPerma)) {
    score += 40;
  }

  if (place.goodForPerma.some((area) => params.focusAreas.includes(area))) {
    score += 30;
  }

  if (place.goodForMood.includes(params.mood)) {
    score += 20;
  }

  if (place.goodForMbti.some((letter) => letters.includes(letter))) {
    score += 15;
  }

  if (letters.includes('I') && place.setting === 'solo') {
    score += 10;
  }

  if (letters.includes('E') && place.setting === 'social') {
    score += 10;
  }

  if (params.mood === 'Bad' && CALM_CATEGORIES.has(place.category)) {
    score += 8;
  }

  if (params.mood === 'Bad' && NOISY_CATEGORIES.has(place.category)) {
    score -= 35;
  }

  if ((params.mood === 'Great' || params.mood === 'Good') && SOCIAL_CATEGORIES.has(place.category)) {
    score += 8;
  }

  if (params.missionPerma === 'M') {
    if (['walk', 'quiet', 'cafe', 'library', 'campus', 'hospital_area'].includes(place.category)) {
      score += 22;
    }

    if (place.category === 'study_cafe') {
      score -= 18;
    }

    if (NOISY_CATEGORIES.has(place.category) && params.mood !== 'Great' && params.mood !== 'Good') {
      score -= 25;
    }
  }

  if (params.missionPerma === 'A') {
    if (['study_cafe', 'library', 'meeting', 'campus'].includes(place.category)) {
      score += 22;
    }

    if (place.category === 'walk' && place.setting === 'solo') {
      score -= 8;
    }
  }

  if (params.recommendationMode === 'perma') {
    if (params.selectedPerma && place.goodForPerma.includes(params.selectedPerma)) {
      score += 15;
    }

    if (params.missionPerma && place.goodForPerma.includes(params.missionPerma)) {
      score += 10;
    }
  }

  if (params.recommendationMode === 'mbti') {
    if (letters.includes('I') && I_FRIENDLY_CATEGORIES.has(place.category)) {
      score += 12;
    }

    if (letters.includes('E') && E_FRIENDLY_CATEGORIES.has(place.category)) {
      score += 12;
    }

    if (letters.includes('J') && J_FRIENDLY_CATEGORIES.has(place.category)) {
      score += 10;
    }

    if (letters.includes('P') && (P_FRIENDLY_CATEGORIES.has(place.category) || place.setting === 'flexible')) {
      score += 10;
    }
  }

  if (params.missionPerma && MISSION_PERMA_CATEGORIES[params.missionPerma].includes(place.category)) {
    score += 25;
  }

  if (params.preferVariety && params.currentPlaceCategory && place.category !== params.currentPlaceCategory) {
    score += 18;
  }

  if (params.currentPlaceId && params.currentPlaceId === place.id) {
    score -= 100;
  }

  if (params.excludePlaceIds?.includes(place.id)) {
    score -= 60;
  }

  return score;
}

function pickWeightedPlace(
  pool: Array<{ place: AjouPlace; score: number }>,
): AjouPlace {
  if (pool.length === 0) {
    return ajouPlaces[0];
  }

  const totalWeight = pool.reduce((sum, item) => sum + Math.max(item.score, 1), 0);
  let roll = Math.random() * totalWeight;

  for (const item of pool) {
    roll -= Math.max(item.score, 1);
    if (roll <= 0) {
      return item.place;
    }
  }

  return pool[0].place;
}

export function getRecommendedAjouPlaces(params: PlaceRecommendationParams): AjouPlace[] {
  return [...ajouPlaces]
    .map((place) => ({ place, score: scoreAjouPlace(place, params) }))
    .sort((a, b) => b.score - a.score)
    .map(({ place }) => place);
}

export function pickRecommendedAjouPlace(params: PlaceRecommendationParams): AjouPlace {
  const scored = [...ajouPlaces]
    .map((place) => ({ place, score: scoreAjouPlace(place, params) }))
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return ajouPlaces[0];
  }

  const poolSize = params.preferVariety ? VARIETY_POOL_SIZE : TOP_POOL_SIZE;
  const eligible = scored.filter((item) => item.score > -50);

  if (eligible.length === 0) {
    return scored[0].place;
  }

  return pickWeightedPlace(eligible.slice(0, poolSize));
}
