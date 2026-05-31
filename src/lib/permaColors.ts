import type { PermaArea } from '../app/wellnessDemo';
import type { PermaKey } from '../data/missions';

export type PermaAccentStyles = {
  icon: string;
  bar: string;
  pill: string;
};

export const neutralPermaRowStyle = {
  card: 'border-[#E7DFF7] bg-[#F8F5FF]',
  track: 'bg-[#EDE9FE]',
};

export type PermaRowStyles = PermaAccentStyles & typeof neutralPermaRowStyle;

export const PERMA_AREA_STYLES: Record<PermaArea, PermaRowStyles> = {
  'Positive Emotion': {
    icon: 'bg-[#EDE9FE] text-[#7C3AED]',
    bar: 'bg-[#7C3AED]',
    pill: 'bg-[#EDE9FE] text-[#7C3AED]',
    ...neutralPermaRowStyle,
  },
  Engagement: {
    icon: 'bg-[#CCFBF1] text-[#0F766E]',
    bar: 'bg-[#14B8A6]',
    pill: 'bg-[#CCFBF1] text-[#0F766E]',
    ...neutralPermaRowStyle,
  },
  Relationships: {
    icon: 'bg-[#FCE7F3] text-[#BE185D]',
    bar: 'bg-[#F472B6]',
    pill: 'bg-[#FCE7F3] text-[#BE185D]',
    ...neutralPermaRowStyle,
  },
  Meaning: {
    icon: 'bg-amber-100 text-amber-500',
    bar: 'bg-amber-500',
    pill: 'bg-amber-100 text-amber-600',
    ...neutralPermaRowStyle,
  },
  Accomplishment: {
    icon: 'bg-indigo-100 text-indigo-500',
    bar: 'bg-indigo-500',
    pill: 'bg-indigo-100 text-indigo-600',
    ...neutralPermaRowStyle,
  },
};

export const PERMA_KEY_STYLES: Record<PermaKey, PermaAccentStyles> = {
  P: PERMA_AREA_STYLES['Positive Emotion'],
  E: PERMA_AREA_STYLES.Engagement,
  R: PERMA_AREA_STYLES.Relationships,
  M: PERMA_AREA_STYLES.Meaning,
  A: PERMA_AREA_STYLES.Accomplishment,
};

export function getPermaAreaStyles(area: PermaArea): PermaRowStyles {
  return PERMA_AREA_STYLES[area];
}

export function getPermaKeyStyles(key: PermaKey): PermaAccentStyles {
  return PERMA_KEY_STYLES[key];
}

/** @deprecated Use getPermaAreaStyles(area) for consistent PERMA identity. */
export const permaToneStyles = {
  primary: PERMA_AREA_STYLES['Positive Emotion'],
  secondary: PERMA_AREA_STYLES.Engagement,
  accent: PERMA_AREA_STYLES.Relationships,
  care: PERMA_AREA_STYLES.Meaning,
  caution: PERMA_AREA_STYLES.Accomplishment,
};
