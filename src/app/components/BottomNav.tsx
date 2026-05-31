import { useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, BarChart3, Target, User } from 'lucide-react';
import { navigateToMission } from '../../lib/missionNavigation';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    if (path === '/mission') {
      navigateToMission(navigate, 'top');
      return;
    }

    navigate(path);
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/', match: ['/'] },
    {
      icon: <BookOpen size={20} />,
      label: 'Journal',
      path: '/journal/write',
      match: ['/journal/write', '/journal/analysis'],
    },
    { icon: <BarChart3 size={20} />, label: 'Insights', path: '/insights', match: ['/insights'] },
    { icon: <Target size={20} />, label: 'Mission', path: '/mission', match: ['/mission'] },
    { icon: <User size={20} />, label: 'Profile', path: '/profile', match: ['/profile'] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E7DFF7] bg-white/95 shadow-lg shadow-[#241A44]/5 backdrop-blur-lg pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-md px-2 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = item.match.includes(location.pathname);

            return (
              <button
                key={item.path}
                type="button"
                onClick={() => handleNavigate(item.path)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`${item.label} tab`}
                className={`flex min-h-14 min-w-[3.5rem] flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-1.5 transition-all ${
                  isActive ? 'text-[#7C3AED]' : 'text-[#7C719A] hover:text-[#7C3AED]'
                }`}
              >
                <div className={`transition-all ${isActive ? 'scale-110' : 'opacity-60'}`}>
                  {item.icon}
                </div>
                <span className={`text-[11px] font-semibold leading-none ${isActive ? 'text-[#7C3AED]' : ''}`}>
                  {item.label}
                </span>
                {isActive && <div className="mt-0.5 h-1 w-5 rounded-full bg-[#7C3AED]" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
