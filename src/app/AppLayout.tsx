import { useLocation, useOutlet } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { ScrollManager } from '../components/ScrollManager';
import { BottomNav } from './components/BottomNav';

export function AppLayout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <>
      <ScrollManager />
      <main className="relative w-full">
        <AnimatePresence mode="popLayout" initial={false}>
          {outlet ? (
            <PageTransition key={location.pathname}>{outlet}</PageTransition>
          ) : null}
        </AnimatePresence>
      </main>
      <BottomNav />
    </>
  );
}
