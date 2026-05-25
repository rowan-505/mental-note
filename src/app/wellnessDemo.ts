export type MoodKey = 'great' | 'good' | 'okay' | 'low';

export type MoodOption = {
  key: MoodKey;
  label: string;
  emoji: string;
};

export type Recommendation = {
  title: string;
  location: string;
  duration: string;
  area: PermaArea;
  description: string;
  action: string;
};

export type TrendPoint = {
  label: string;
  score: number;
};

export type PermaArea =
  | 'Positive Emotion'
  | 'Engagement'
  | 'Relationships'
  | 'Meaning'
  | 'Accomplishment';

export type PermaScore = {
  area: PermaArea;
  score: number;
  trend: number;
  note: string;
  tone: 'primary' | 'secondary' | 'accent' | 'care' | 'caution';
};

export type SpecificEmotionKey =
  | 'ennui'
  | 'emptiness'
  | 'overthinking'
  | 'overwhelmed'
  | 'happiness'
  | 'anxiety'
  | 'annoyed'
  | 'relaxed'
  | 'proud'
  | 'hopeful';

export type SpecificEmotionOption = {
  key: SpecificEmotionKey;
  emoji: string;
  label: string;
};

export const moodOptions: MoodOption[] = [
  {
    key: 'great',
    label: 'Great',
    emoji: '🌟',
  },
  {
    key: 'good',
    label: 'Good',
    emoji: '😊',
  },
  {
    key: 'okay',
    label: 'Neutral',
    emoji: '😌',
  },
  {
    key: 'low',
    label: 'Bad',
    emoji: '🌧',
  },
];

export const specificEmotionOptions: SpecificEmotionOption[] = [
  { key: 'ennui', emoji: '🥱', label: 'Ennui' },
  { key: 'emptiness', emoji: '🕳️', label: 'Empty' },
  { key: 'overthinking', emoji: '💭', label: 'Overthinking' },
  { key: 'overwhelmed', emoji: '🌊', label: 'Overwhelmed' },
  { key: 'happiness', emoji: '😆', label: 'Excited' },
  { key: 'anxiety', emoji: '😟', label: 'Anxiety' },
  { key: 'annoyed', emoji: '😠', label: 'Angry' },
  { key: 'relaxed', emoji: '😌', label: 'Relaxed' },
  { key: 'proud', emoji: '🏆', label: 'Proud' },
  { key: 'hopeful', emoji: '🌱', label: 'Hopeful' },
];

export const ajouRecommendations: Recommendation[] = [
  {
    title: 'Quiet campus reflection walk',
    location: 'Ajou University campus walking path',
    duration: '10–15 min',
    area: 'Meaning',
    description: 'Walk slowly and name one value that made today matter.',
    action: 'Try this step',
  },
  {
    title: 'Purpose note writing',
    location: 'Central Library or quiet study lounge',
    duration: '5 min',
    area: 'Meaning',
    description:
      'Write one sentence about why your current study effort matters to future you.',
    action: 'Write a purpose note',
  },
  {
    title: 'Message one NOVA teammate',
    location: 'Anywhere near campus',
    duration: '3 min',
    area: 'Relationships',
    description:
      'Send a short check-in or appreciation message to keep support close and realistic.',
    action: 'Send a teammate message',
  },
  {
    title: 'Small task reset',
    location: 'Study lounge near campus',
    duration: '15 min',
    area: 'Accomplishment',
    description:
      'Pick one small task, finish only the first step, and mark it as enough progress for now.',
    action: 'Start the small reset',
  },
  {
    title: 'Breathing break',
    location: 'Quiet corner near Ajou campus',
    duration: '5 min',
    area: 'Positive Emotion',
    description:
      'Use a short breathing break to soften stress before returning to your next choice.',
    action: 'Start breathing break',
  },
];

export const weeklyTrendData: TrendPoint[] = [
  { label: 'Mon', score: 66 },
  { label: 'Tue', score: 69 },
  { label: 'Wed', score: 68 },
  { label: 'Thu', score: 74 },
  { label: 'Fri', score: 72 },
  { label: 'Sat', score: 77 },
  { label: 'Sun', score: 79 },
];

export const growthTrendData: TrendPoint[] = [
  { label: 'Wk 1', score: 68 },
  { label: 'Wk 2', score: 70 },
  { label: 'Wk 3', score: 73 },
  { label: 'Wk 4', score: 76 },
];

export const permaScores: PermaScore[] = [
  {
    area: 'Positive Emotion',
    score: 78,
    trend: 5,
    note: 'You are noticing more supportive moments.',
    tone: 'primary',
  },
  {
    area: 'Engagement',
    score: 72,
    trend: 3,
    note: 'Focus is steady and can deepen with short blocks.',
    tone: 'secondary',
  },
  {
    area: 'Relationships',
    score: 85,
    trend: 8,
    note: 'Connection is your strongest support this week.',
    tone: 'accent',
  },
  {
    area: 'Meaning',
    score: 62,
    trend: -6,
    note: 'Main Needs Care: connect today’s effort with purpose and values.',
    tone: 'care',
  },
  {
    area: 'Accomplishment',
    score: 68,
    trend: -2,
    note: 'Secondary low area: keep wins smaller and easier to complete.',
    tone: 'caution',
  },
];

export const strongestPermaArea = 'Relationships';
export const carePermaArea = 'Meaning';
export const secondaryCarePermaArea = 'Accomplishment';
export const mostFrequentSpecificEmotion = 'Overthinking';

export function getAverageScore(points: TrendPoint[]) {
  return Math.round(points.reduce((sum, point) => sum + point.score, 0) / points.length);
}

export function formatTrend(trend: number) {
  return trend > 0 ? `+${trend}` : `${trend}`;
}

export function getBestRecommendation(mood: MoodKey) {
  const meaningScore = permaScores.find((score) => score.area === 'Meaning');

  if (meaningScore && meaningScore.trend < 0) {
    return ajouRecommendations[0];
  }

  if (mood === 'great' || mood === 'good') {
    return ajouRecommendations.find((item) => item.area === 'Accomplishment') ?? ajouRecommendations[0];
  }

  if (mood === 'okay') {
    return ajouRecommendations.find((item) => item.area === 'Meaning') ?? ajouRecommendations[0];
  }

  return ajouRecommendations.find((item) => item.area === 'Relationships') ?? ajouRecommendations[0];
}

export function getInsightRecommendations(mood: MoodKey) {
  const best = getBestRecommendation(mood);
  const moodMatch =
    mood === 'great' || mood === 'good'
      ? ajouRecommendations.find((item) => item.area === 'Accomplishment')
      : mood === 'okay'
        ? ajouRecommendations.find((item) => item.area === 'Meaning' && item.title !== best.title)
        : ajouRecommendations.find((item) => item.area === 'Relationships');
  const recovery = ajouRecommendations.find((item) => item.title === 'Breathing break');

  return [best, moodMatch, recovery]
    .filter((item): item is Recommendation => Boolean(item))
    .filter((item, index, items) => items.findIndex((candidate) => candidate.title === item.title) === index)
    .slice(0, 3);
}
