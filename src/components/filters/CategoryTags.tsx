import { ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { categories } from '@/data/characters';
import { cn } from '@/lib/utils';

interface CategoryTagsProps {
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export function CategoryTags({ selectedTags, onTagClick }: CategoryTagsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  const isSelected = (tag: string) => selectedTags.includes(tag);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setShowLeftShadow(el.scrollLeft > 10);
      setShowRightShadow(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollRight = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (el) {
      el.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {/* Left shadow */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-opacity duration-200",
          showLeftShadow ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Right shadow */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none transition-opacity duration-200",
          showRightShadow ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onWheel={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            e.preventDefault();
            el.scrollLeft += e.deltaY;
          }
        }}
        className={cn(
          "flex gap-1.5 sm:gap-2 overflow-x-auto pb-2",
          "scrollbar-hide",
          "scroll-smooth",
          "-mx-3 px-3 sm:mx-0 sm:px-0"
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={cn(
              "flex-shrink-0 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full",
              "text-[11px] sm:text-[13px] font-medium",
              "border transition-all duration-150",
              "active:scale-95 touch-manipulation",
              isSelected(tag)
                ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20'
                : 'bg-[#141414] border-[#2a2a2a] text-gray-300 hover:bg-[#1f1f1f] hover:border-[#3a3a3a]'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      <button
        onClick={scrollLeft}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2",
          "p-1.5 rounded-full",
          "bg-[#141414] border border-[#2a2a2a] text-gray-400",
          "hover:bg-[#1f1f1f] hover:text-white",
          "transition-all duration-150",
          "active:scale-95 touch-manipulation",
          showLeftShadow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-label="Scroll left"
      >
        <ChevronRight size={14} className="rotate-180" />
      </button>

      <button
        onClick={scrollRight}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2",
          "p-1.5 rounded-full",
          "bg-[#141414] border border-[#2a2a2a] text-gray-400",
          "hover:bg-[#1f1f1f] hover:text-white",
          "transition-all duration-150",
          "active:scale-95 touch-manipulation",
          showRightShadow ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-label="Scroll right"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
