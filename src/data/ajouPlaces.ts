// Demo coordinates only. Replace with verified Naver/OSM coordinates before final release.

export type PermaKey = 'P' | 'E' | 'R' | 'M' | 'A';
export type MoodKey = 'Great' | 'Good' | 'Neutral' | 'Bad';
export type PlaceCategory =
  | 'campus'
  | 'walk'
  | 'study_cafe'
  | 'cafe'
  | 'restaurant'
  | 'meeting'
  | 'quiet'
  | 'library'
  | 'hospital_area';

export type PlaceSetting = 'solo' | 'social' | 'flexible';
export type MbtiLetter = 'I' | 'E' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export type AjouPlace = {
  id: string;
  title: string;
  description: string;
  category: PlaceCategory;
  lat: number;
  lng: number;
  duration: string;
  setting: PlaceSetting;
  goodForPerma: PermaKey[];
  goodForMood: MoodKey[];
  goodForMbti: MbtiLetter[];
  missionHint: string;
  naverUrl?: string;
};

export const AJOU_CENTER = { lat: 37.2829, lng: 127.0461 };

export const NAVER_MAP_URL = 'https://naver.me/G5kkFxVq';

export const PLACE_CATEGORY_LABELS: Record<PlaceCategory, string> = {
  campus: 'Campus',
  walk: 'Campus walk',
  study_cafe: 'Study café',
  cafe: 'Café',
  restaurant: 'Restaurant',
  meeting: 'Meeting spot',
  quiet: 'Quiet space',
  library: 'Library area',
  hospital_area: 'Hospital area',
};

export const PLACE_SETTING_LABELS: Record<PlaceSetting, string> = {
  solo: 'Solo',
  social: 'Social',
  flexible: 'Flexible',
};

export const ajouPlaces: AjouPlace[] = [
  {
    id: 'ajou-campus-walk',
    title: 'Ajou Campus Walk',
    description: 'A calm campus route for a short reflection walk.',
    category: 'walk',
    lat: 37.2832,
    lng: 127.0448,
    duration: '10–15 min',
    setting: 'solo',
    goodForPerma: ['P', 'M'],
    goodForMood: ['Good', 'Neutral', 'Bad'],
    goodForMbti: ['I', 'N', 'F', 'P'],
    missionHint: 'Walk slowly for 10 minutes and name one value that made today matter.',
  },
  
  {
    id: 'woncheon-ro-restaurant-row',
    title: 'Woncheon-ro Restaurant Row',
    description: 'A busy student dining strip just outside Ajou’s main gate.',
    category: 'restaurant',
    lat: 37.2816,
    lng: 127.0432,
    duration: '30–45 min',
    setting: 'social',
    goodForPerma: ['R', 'P', 'A'],
    goodForMood: ['Great', 'Good', 'Neutral'],
    goodForMbti: ['E', 'S', 'F', 'P'],
    missionHint: 'Pick one simple meal option and invite a friend to join this week.',
  },
  {
    id: 'ajou-gate-korean-bbq-alley',
    title: 'Korean BBQ Alley near Ajou Gate',
    description: 'A popular grill-and-share area students use after classes.',
    category: 'restaurant',
    lat: 37.2812,
    lng: 127.0448,
    duration: '45–60 min',
    setting: 'social',
    goodForPerma: ['R', 'P'],
    goodForMood: ['Great', 'Good'],
    goodForMbti: ['E', 'F', 'S'],
    missionHint: 'Send one casual dinner idea to someone you have not talked to lately.',
  },
  {
    id: 'ajou-gate-chicken-street',
    title: 'Chicken & Pub Street near Ajou',
    description: 'A well-known late-afternoon food street near campus.',
    category: 'restaurant',
    lat: 37.2805,
    lng: 127.0435,
    duration: '30–40 min',
    setting: 'social',
    goodForPerma: ['R', 'P', 'E'],
    goodForMood: ['Great', 'Good'],
    goodForMbti: ['E', 'S', 'P'],
    missionHint: 'Share one comfort-food suggestion and ask how someone’s day went.',
  },
  {
    id: 'ajou-gate-ramen-donkatsu',
    title: 'Ramen & Donkatsu near Ajou Gate',
    description: 'Quick solo or pair meals popular with students between classes.',
    category: 'restaurant',
    lat: 37.2819,
    lng: 127.0428,
    duration: '20–30 min',
    setting: 'flexible',
    goodForPerma: ['P', 'A'],
    goodForMood: ['Good', 'Neutral', 'Bad'],
    goodForMbti: ['S', 'T', 'J', 'I'],
    missionHint: 'Eat slowly and write down one small win from today before you leave.',
  },
  {
    id: 'woncheon-pizza-burger-strip',
    title: 'Pizza & Burger Strip near Ajou',
    description: 'Casual Western-style spots along the Woncheon side streets.',
    category: 'restaurant',
    lat: 37.2821,
    lng: 127.0418,
    duration: '25–35 min',
    setting: 'social',
    goodForPerma: ['R', 'P'],
    goodForMood: ['Great', 'Good', 'Neutral'],
    goodForMbti: ['E', 'F', 'P'],
    missionHint: 'Suggest one easy group meal and keep the plan simple.',
  },
  {
    id: 'won-coffee-woncheon',
    title: 'W:ON Coffee (Woncheon area)',
    description: 'A large roastery-style café popular for study breaks near campus.',
    category: 'study_cafe',
    lat: 37.2838,
    lng: 127.0445,
    duration: '20–40 min',
    setting: 'flexible',
    goodForPerma: ['P', 'E', 'M'],
    goodForMood: ['Good', 'Neutral'],
    goodForMbti: ['I', 'N', 'F', 'P'],
    missionHint: 'Sit for 20 minutes with one drink and outline the next tiny step of a task.',
  },
  {
    id: 'ediya-coffee-near-ajou',
    title: 'Ediya Coffee near Ajou Gate',
    description: 'A familiar chain café spot for short solo study sessions.',
    category: 'study_cafe',
    lat: 37.2824,
    lng: 127.0436,
    duration: '15–25 min',
    setting: 'solo',
    goodForPerma: ['E', 'A'],
    goodForMood: ['Good', 'Neutral', 'Bad'],
    goodForMbti: ['I', 'S', 'T', 'J'],
    missionHint: 'Review one lecture note or finish one checklist item before you go.',
  },
  {
    id: 'tomntoms-near-ajou',
    title: 'Tom N Toms near Ajou',
    description: 'A student-favorite study café chain area close to the main gate.',
    category: 'study_cafe',
    lat: 37.2827,
    lng: 127.0422,
    duration: '20–30 min',
    setting: 'solo',
    goodForPerma: ['E', 'A', 'M'],
    goodForMood: ['Neutral', 'Bad', 'Good'],
    goodForMbti: ['I', 'S', 'J', 'T'],
    missionHint: 'Set a 25-minute timer and work on only the first part of one assignment.',
  },
  {
    id: 'woncheon-study-cafe-district',
    title: 'Woncheon Study Café District',
    description: 'A cluster of study cafés just outside campus for focused sessions.',
    category: 'study_cafe',
    lat: 37.2813,
    lng: 127.0462,
    duration: '30–60 min',
    setting: 'solo',
    goodForPerma: ['E', 'A'],
    goodForMood: ['Good', 'Neutral', 'Bad'],
    goodForMbti: ['I', 'S', 'T', 'J'],
    missionHint: 'Book one focused block and stop after one clear milestone.',
  },
  {
    id: 'chosim-study-cafe-yeongtong',
    title: 'Chosim Study Café (Yeongtong direction)',
    description: 'A 24-hour style study café area a bit farther from campus.',
    category: 'study_cafe',
    lat: 37.2864,
    lng: 127.0512,
    duration: '45–90 min',
    setting: 'solo',
    goodForPerma: ['E', 'A', 'M'],
    goodForMood: ['Neutral', 'Bad'],
    goodForMbti: ['I', 'S', 'T', 'J'],
    missionHint: 'Use one quiet hour to finish a task you have been postponing.',
  },
  {
    id: 'megastudy-style-cafe-near-ajou',
    title: 'Focus Study Café near Ajou',
    description: 'A booth-style study café popular for exam-season concentration.',
    category: 'study_cafe',
    lat: 37.2802,
    lng: 127.0455,
    duration: '30–60 min',
    setting: 'solo',
    goodForPerma: ['E', 'A'],
    goodForMood: ['Neutral', 'Bad', 'Good'],
    goodForMbti: ['I', 'T', 'J', 'S'],
    missionHint: 'Choose one subject and review only the section you understand least.',
  },
  {
    id: 'cafe-ing-library-area',
    title: 'CAFÉ ING (Central Library area)',
    description: 'An on-campus café corner near the library for short study breaks.',
    category: 'study_cafe',
    lat: 37.2839,
    lng: 127.0458,
    duration: '10–20 min',
    setting: 'solo',
    goodForPerma: ['E', 'M', 'A'],
    goodForMood: ['Good', 'Neutral'],
    goodForMbti: ['I', 'S', 'J', 'T'],
    missionHint: 'Take a short break, then return to one page of reading or notes.',
  },
  {
    id: 'student-union-food-court',
    title: 'Ajou Student Union Food Court',
    description: 'Campus food court with Korean, Western, and snack options.',
    category: 'restaurant',
    lat: 37.2831,
    lng: 127.0464,
    duration: '20–30 min',
    setting: 'flexible',
    goodForPerma: ['R', 'P', 'A'],
    goodForMood: ['Great', 'Good', 'Neutral'],
    goodForMbti: ['E', 'S', 'F', 'P'],
    missionHint: 'Eat with someone or message one friend while you take a short break.',
  },
  {
    id: 'yeongtong-late-food-street',
    title: 'Yeongtong Late Food Street',
    description: 'A broader dining area outside immediate campus with more evening options.',
    category: 'restaurant',
    lat: 37.2788,
    lng: 127.0495,
    duration: '30–45 min',
    setting: 'social',
    goodForPerma: ['R', 'P', 'E'],
    goodForMood: ['Great', 'Good', 'Neutral'],
    goodForMbti: ['E', 'F', 'S', 'P'],
    missionHint: 'Plan one low-pressure meal out and keep the conversation light.',
  },
  {
    id: 'worldcup-stadium-cafe-walk',
    title: 'World Cup Stadium Café Walk',
    description: 'A slightly longer walk toward open café and park areas west of campus.',
    category: 'cafe',
    lat: 37.2861,
    lng: 127.0378,
    duration: '20–30 min',
    setting: 'flexible',
    goodForPerma: ['P', 'M', 'E'],
    goodForMood: ['Great', 'Good', 'Neutral'],
    goodForMbti: ['I', 'N', 'P', 'F'],
    missionHint: 'Walk toward open space and note one feeling you want to carry into tomorrow.',
  },
];
