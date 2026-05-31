export type MbtiLetter = 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type MbtiGuideline = {
  label: string;
  summary: string;
  strengths: string[];
  watchOut: string[];
  missionRule: string;
};

export const mbtiGuidelines: Record<MbtiLetter, MbtiGuideline> = {
  I: {
    label: 'Introversion',
    summary: 'Solo and written missions may feel more comfortable.',
    strengths: ['Solo reflection', 'Written expression', 'Focused individual tasks'],
    watchOut: ['Relationship missions may feel heavier'],
    missionRule: 'Prefer short, solo, text-based missions.',
  },
  E: {
    label: 'Extraversion',
    summary: 'Sharing and feedback can increase energy.',
    strengths: ['Social energy', 'Sharing', 'Feedback'],
    watchOut: ['Long solo tasks may reduce engagement'],
    missionRule: 'Prefer sharing, reactions, and social missions.',
  },
  S: {
    label: 'Sensing',
    summary: 'Concrete actions and clear steps work best.',
    strengths: ['Specific action', 'Clear methods', 'Immediate experience'],
    watchOut: ['Abstract meaning tasks may feel vague'],
    missionRule: 'Include exact action, time, and method.',
  },
  N: {
    label: 'Intuition',
    summary: 'Meaning and creative interpretation can increase motivation.',
    strengths: ['Meaning', 'Creativity', 'Reflection'],
    watchOut: ['Simple checklist tasks may feel boring'],
    missionRule: 'Explain why the mission matters.',
  },
  T: {
    label: 'Thinking',
    summary: 'Result-focused and logical missions may feel more natural.',
    strengths: ['Logic', 'Results', 'Structured engagement'],
    watchOut: ['Emotional expression may feel unnatural'],
    missionRule: 'Use result-oriented wording.',
  },
  F: {
    label: 'Feeling',
    summary: 'Feeling-based and relationship-based missions may feel natural.',
    strengths: ['Emotion', 'Relationship', 'Meaning'],
    watchOut: ['Rigid accomplishment tasks may feel burdensome'],
    missionRule: 'Use feeling-based and experience-based wording.',
  },
  J: {
    label: 'Judging',
    summary: 'Clear routines help, but perfection pressure should be reduced.',
    strengths: ['Routine', 'Checklist', 'Completion'],
    watchOut: ['Perfection pressure'],
    missionRule: 'Add a minimum standard to prevent overdoing.',
  },
  P: {
    label: 'Perceiving',
    summary: 'Choice and variety can increase motivation.',
    strengths: ['Variety', 'Spontaneity', 'Flexible engagement'],
    watchOut: ['Rigid routines may reduce motivation'],
    missionRule: 'Use choice-based missions.',
  },
};

const MBTI_LETTERS: MbtiLetter[] = ['I', 'E', 'S', 'N', 'T', 'F', 'J', 'P'];
const MBTI_DIMENSIONS: [MbtiLetter[], MbtiLetter[], MbtiLetter[], MbtiLetter[]] = [
  ['I', 'E'],
  ['S', 'N'],
  ['T', 'F'],
  ['J', 'P'],
];
const DEFAULT_MBTI_TYPE = 'INTJ';

export type MbtiSummaryItem = {
  letter: MbtiLetter;
  guideline: MbtiGuideline;
};

function isMbtiLetter(value: string): value is MbtiLetter {
  return MBTI_LETTERS.includes(value as MbtiLetter);
}

export function normalizeMbtiType(value: string): string {
  const normalized = value.trim().toUpperCase();

  if (normalized.length !== 4) {
    return DEFAULT_MBTI_TYPE;
  }

  const letters = normalized.split('');

  const isValid = letters.every((letter, index) =>
    MBTI_DIMENSIONS[index].includes(letter as MbtiLetter),
  );

  return isValid ? normalized : DEFAULT_MBTI_TYPE;
}

export function getMbtiLetters(type: string): MbtiLetter[] {
  return normalizeMbtiType(type)
    .split('')
    .filter(isMbtiLetter);
}

export function getMbtiSummary(type: string): MbtiSummaryItem[] {
  return getMbtiLetters(type).map((letter) => ({
    letter,
    guideline: mbtiGuidelines[letter],
  }));
}
