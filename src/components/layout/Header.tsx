import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname.startsWith('/chat')) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 lg:left-[220px] z-30",
        "h-12 sm:h-14 lg:h-[60px]",
        "flex items-center justify-end",
        "px-2 sm:px-4 lg:px-6",
        "pl-14 sm:pl-14 lg:pl-6",
        "transition-all duration-300",
        isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to="/profile" className="touch-manipulation">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "border-[#2a2a2a] bg-transparent text-white hover:bg-[#1a1a1a] hover:text-white",
              "text-xs px-2.5 sm:px-4 py-1.5 h-8 sm:h-9",
              "active:scale-95 transition-transform"
            )}
          >
            Login
          </Button>
        </Link>
        <Link to="/profile" className="touch-manipulation">
          <Button
            size="sm"
            className={cn(
              "bg-pink-600 hover:bg-pink-500 text-white border-0",
              "text-xs px-2.5 sm:px-4 py-1.5 h-8 sm:h-9",
              "active:scale-95 transition-transform shadow-lg shadow-pink-500/20"
            )}
          >
            Join Free
          </Button>
        </Link>
      </div>
    </header>
  );
}
