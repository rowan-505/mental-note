import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { applyRouteScroll } from '../lib/missionNavigation';

const ROUTE_SCROLL_DELAY_MS = 250;

export function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      applyRouteScroll(location.pathname, location.state, location.hash);
    }, ROUTE_SCROLL_DELAY_MS);

    return () => window.clearTimeout(timeout);
  }, [location.pathname, location.key, location.state, location.hash]);

  return null;
}
