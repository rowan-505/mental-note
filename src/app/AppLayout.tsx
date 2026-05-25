import { Outlet } from 'react-router';
import { BottomNav } from './components/BottomNav';

export function AppLayout() {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
}
