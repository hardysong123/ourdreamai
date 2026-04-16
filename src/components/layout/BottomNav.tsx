import { Link, useLocation } from 'react-router-dom';
import { Compass, MessageCircle, Plus, Image, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: Compass, label: 'Explore', href: '/' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: Plus, label: 'Create', href: '/create' },
  { icon: Image, label: 'Generate', href: '/generate' },
  { icon: Sparkles, label: 'My AI', href: '/custom' },
];

export function BottomNav() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-lg border-t border-[#2a2a2a] lg:hidden safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200',
                'active:scale-95 touch-manipulation min-w-[56px]',
                active
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-gray-300'
              )}
            >
              <item.icon
                size={22}
                className={cn(
                  'transition-transform duration-200',
                  active && 'scale-110'
                )}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
