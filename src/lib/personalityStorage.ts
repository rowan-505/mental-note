import { normalizeMbtiType } from '../data/mbtiGuidelines';

export const PERSONALITY_STORAGE_KEY = 'nova-personality-type';
export const PERSONALITY_UPDATED_EVENT = 'nova-personality-updated';

export function readPersonalityType(): string {
  if (typeof window === 'undefined') {
    return 'INTJ';
  }

  return normalizeMbtiType(localStorage.getItem(PERSONALITY_STORAGE_KEY) ?? 'INTJ');
}

export function savePersonalityType(type: string): string {
  const nextType = normalizeMbtiType(type);
  localStorage.setItem(PERSONALITY_STORAGE_KEY, nextType);
  window.dispatchEvent(new Event(PERSONALITY_UPDATED_EVENT));
  return nextType;
}
