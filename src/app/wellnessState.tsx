import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getBestRecommendation, MoodKey, Recommendation } from './wellnessDemo';

type WellnessState = {
  selectedMood: MoodKey;
  setSelectedMood: (mood: MoodKey) => void;
  recommendation: Recommendation;
};

const WellnessContext = createContext<WellnessState | null>(null);

export function WellnessProvider({ children }: { children: ReactNode }) {
  const [selectedMood, setSelectedMood] = useState<MoodKey>('good');

  const value = useMemo(
    () => ({
      selectedMood,
      setSelectedMood,
      recommendation: getBestRecommendation(selectedMood),
    }),
    [selectedMood],
  );

  return <WellnessContext.Provider value={value}>{children}</WellnessContext.Provider>;
}

export function useWellness() {
  const context = useContext(WellnessContext);

  if (!context) {
    throw new Error('useWellness must be used within WellnessProvider');
  }

  return context;
}
