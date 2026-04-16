import { Search } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        "relative flex items-center",
        "h-10 sm:h-11",
        "bg-[#141414] border rounded-xl",
        "px-3 sm:px-4",
        "transition-all duration-200",
        isFocused ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-[#2a2a2a]'
      )}
    >
      <Search size={16} className="text-gray-500 mr-2 sm:mr-3 flex-shrink-0" />
      <input
        type="text"
        placeholder="Try 'Busty blonde' or 'Petite asian'"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "flex-1 bg-transparent text-white text-sm",
          "placeholder:text-gray-500 placeholder:text-xs sm:placeholder:text-sm",
          "focus:outline-none",
          "min-w-0"
        )}
      />
    </div>
  );
}
