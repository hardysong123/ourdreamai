import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Plus,
  Compass,
  MessageCircle,
  Image,
  Sparkles,
  Crown,
  User,
  LifeBuoy,
  MessageSquare,
  MoreHorizontal,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const mainNavItems: NavItem[] = [
  { icon: Plus, label: 'Create', href: '/create' },
  { icon: Compass, label: 'Explore', href: '/' },
  { icon: MessageCircle, label: 'Chat', href: '/chat' },
  { icon: Image, label: 'Generate', href: '/generate' },
  { icon: Sparkles, label: 'My AI', href: '/custom' },
];

const bottomNavItems: NavItem[] = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: LifeBuoy, label: 'Support', href: '/support' },
  { icon: MessageSquare, label: 'Discord', href: '/' },
  { icon: MoreHorizontal, label: 'More', href: '/affiliate' },
];

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLgUp, setIsLgUp] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(min-width: 1024px)').matches;
  });
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  const isActive = (item: NavItem) => {
    if (item.href === '/') return location.pathname === '/' && item.label === 'Explore';
    return location.pathname === item.href;
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsLgUp(mql.matches);
    mql.addEventListener('change', onChange);
    setIsLgUp(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isLgUp) setIsMobileOpen(false);
  }, [isLgUp]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={cn(
          "fixed top-2 left-2 z-[60] h-10 w-10 rounded-xl transition-all duration-200 flex items-center justify-center",
          "bg-[#1a1a1a] border border-[#2a2a2a] text-white shadow-lg",
          "active:scale-95 touch-manipulation",
          isChatRoute && "hidden",
          "lg:hidden"
        )}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait">
          {isMobileOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isLgUp ? 0 : isMobileOpen ? 0 : '-100%',
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-[#2a2a2a] flex flex-col z-50",
          "w-[280px] sm:w-[260px] lg:w-[220px]",
          "lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <Link to="/" className="p-4 pt-16 lg:pt-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-base">O</span>
          </div>
          <span className="text-white font-semibold text-xl lg:text-lg">
            ourdream<span className="text-pink-500">.ai</span>
          </span>
        </Link>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl text-base lg:text-sm transition-all duration-200",
                "active:scale-[0.98] touch-manipulation",
                isActive(item)
                  ? 'bg-[#1a1a1a] text-white border-l-[3px] border-pink-500'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              )}
            >
              <item.icon size={22} className="lg:w-[18px] lg:h-[18px]" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {/* Upgrade Button */}
          <Button
            className="w-full mt-5 py-6 lg:py-2 text-base lg:text-sm bg-pink-600 hover:bg-pink-500 text-white border-0 rounded-xl shadow-lg shadow-pink-500/20"
          >
            <Crown size={20} className="mr-2 lg:w-4 lg:h-4" />
            Upgrade
          </Button>
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 py-4 space-y-1.5 border-t border-[#2a2a2a]">
          {bottomNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl text-base lg:text-sm transition-all duration-200",
                "active:scale-[0.98] touch-manipulation",
                isActive(item)
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              )}
            >
              <item.icon size={22} className="lg:w-[18px] lg:h-[18px]" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-4 text-[11px] lg:text-[10px] text-gray-600 border-t border-[#2a2a2a]">
          <Link to="/" className="hover:text-gray-400 transition-colors">
            Terms & Policies
          </Link>
          <div className="mt-2 space-y-0.5">
            <p>2026 OURDREAM.AI</p>
            <p>USA: Dream Studio USA, Inc.</p>
            <p>Cyprus: TEKTOPIA LTD</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
