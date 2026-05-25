import { useNavigate, useLocation } from 'react-router';
import { Home, BookOpen, BarChart3, User } from 'lucide-react';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <Home size={22} />, label: 'Home', path: '/' },
    { icon: <BookOpen size={22} />, label: 'Journal', path: '/journal/write' },
    { icon: <BarChart3 size={22} />, label: 'Insights', path: '/insights' },
    { icon: <User size={22} />, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#EEE6FF] shadow-lg shadow-[#8B2FFF]/5">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-2 px-4 rounded-2xl transition-all ${
                  isActive
                    ? 'text-[#8B2FFF]'
                    : 'text-[#7B6B9D] hover:text-[#8B2FFF]'
                }`}
              >
                <div className={`transition-all ${isActive ? 'scale-110' : 'opacity-60'}`}>
                  {item.icon}
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-[#8B2FFF]' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="w-5 h-1 rounded-full bg-gradient-to-r from-[#8B2FFF] to-[#FF2D78] mt-0.5"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
