export type LocalPlace = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  image: string;
  url: string;
};

export const localPlaces: LocalPlace[] = [
  {
    id: 'ajou-campus',
    title: 'Ajou University',
    subtitle: 'Quiet campus place for reflection',
    duration: '10–15 min',
    image: '/images/ajou-map-preview.png',
    url: 'https://naver.me/G5kkFxVq',
  },
];
