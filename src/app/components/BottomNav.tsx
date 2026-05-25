import { useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, BarChart3, User } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={21} />, label: 'Home', path: '/', match: ['/'] },
    {
      icon: <BookOpen size={21} />,
      label: 'Journal',
      path: '/journal/write',
      match: ['/journal/write', '/journal/analysis'],
    },
    { icon: <BarChart3 size={21} />, label: 'Insights', path: '/insights', match: ['/insights'] },
    { icon: <User size={21} />, label: 'Profile', path: '/profile', match: ['/profile'] },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-[#E7DFF7] shadow-lg shadow-[#241A44]/5">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const isActive = item.match.includes(location.pathname);
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all ${
                  isActive
                    ? 'text-[#7C3AED]'
                    : 'text-[#7C719A] hover:text-[#7C3AED]'
                }`}
              >
                <div className={`transition-all ${isActive ? 'scale-110' : 'opacity-60'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-[#7C3AED]' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-5 h-1 rounded-full bg-[#7C3AED] mt-0.5"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
