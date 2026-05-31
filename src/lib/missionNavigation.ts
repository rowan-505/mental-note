import type { NavigateFunction } from 'react-router';

export type MissionScrollTarget = 'top' | 'map';

export type MissionNavigateState = {
  scrollTo?: MissionScrollTarget;
};

export function navigateToMission(
  navigate: NavigateFunction,
  scrollTo: MissionScrollTarget = 'top',
) {
  navigate('/mission', { state: { scrollTo } satisfies MissionNavigateState });
}

export function shouldScrollToMissionMap(
  pathname: string,
  state: unknown,
  hash: string = window.location.hash,
): boolean {
  if (pathname !== '/mission') {
    return false;
  }

  const missionState = state as MissionNavigateState | null | undefined;
  return hash === '#mission-map' || missionState?.scrollTo === 'map';
}

export function applyRouteScroll(
  pathname: string,
  state: unknown,
  hash: string = window.location.hash,
) {
  if (shouldScrollToMissionMap(pathname, state, hash)) {
    document.getElementById('mission-map')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
    return;
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
}

/** @deprecated Use applyRouteScroll after navigation via ScrollManager. */
export function applyMissionScroll(state: MissionNavigateState | null | undefined) {
  applyRouteScroll('/mission', state, window.location.hash);
}
