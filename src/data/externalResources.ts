export type ExternalResource = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const externalResources: ExternalResource[] = [
  {
    id: 'personality-test',
    title: 'Personality Style Check',
    description: 'Explore general personality patterns for self-understanding. Not a diagnosis.',
    url: 'https://mypersonality.net/free-personality-test?afid=mpskrl2&gad_source=1&gad_campaignid=23873726334&gclid=Cj0KCQjwlerQBhDMARIsAB16H-W9NsThXvghxHk_MQtUjtNr-feg_07Z8KlzeIjOANR_TNnV0ZcvOyMaAqOzEALw_wcB',
  },
  {
    id: 'mood-screening',
    title: 'Mental Health Self-Check',
    description: 'A gentle external mood self-check. Not a diagnosis or treatment.',
    url: 'https://personality.co/depression-test?gclid=Cj0KCQjwlerQBhDMARIsAB16H-XK_RW0_dwpA_H9sEN2FLunPvDVZbYZf_V6ChqF2YjMGzcTkBuTrlIaAlY9EALw_wcB&utm_source=google&utm_medium=cpc&utm_campaign=23296896434&utm_content=187856933694&utm_term=depression%20test&matchtype=e&device=m&gad_source=1&gad_campaignid=23296896434',
  },
];
