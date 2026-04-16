import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  sort: string;
  gender: string;
  style: string;
  age: string;
  onSortChange: (value: string) => void;
  onGenderChange: (value: string) => void;
  onStyleChange: (value: string) => void;
  onAgeChange: (value: string) => void;
}

const sortOptions: FilterOption[] = [
  { label: 'Popular · Month', value: 'popular-month' },
  { label: 'Popular · Week', value: 'popular-week' },
  { label: 'Popular · Day', value: 'popular-day' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
];

const genderOptions: FilterOption[] = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
  { label: 'Any', value: 'any' },
];

const styleOptions: FilterOption[] = [
  { label: 'Any', value: 'any' },
  { label: 'Anime', value: 'anime' },
  { label: 'Realistic', value: 'realistic' },
  { label: 'Fantasy', value: 'fantasy' },
];

const ageOptions: FilterOption[] = [
  { label: 'Any', value: 'any' },
  { label: '18-25', value: '18-25' },
  { label: '26-35', value: '26-35' },
  { label: '36-50', value: '36-50' },
  { label: '50+', value: '50+' },
];

function FilterDropdown({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 sm:gap-2",
          "px-2 sm:px-3 py-1.5 sm:py-2",
          "bg-[#141414] border border-[#2a2a2a] rounded-lg",
          "text-xs sm:text-sm text-white",
          "hover:bg-[#1a1a1a] hover:border-[#3a3a3a]",
          "transition-all duration-150",
          "active:scale-[0.98] touch-manipulation",
          "whitespace-nowrap"
        )}
      >
        <span className="text-gray-400 hidden sm:inline">{label}:</span>
        <span className="text-gray-400 sm:hidden">{label.charAt(0)}:</span>
        <span className="truncate max-w-[50px] sm:max-w-none">{selectedOption?.label || value}</span>
        <ChevronDown size={12} className="text-gray-500 flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-36 sm:w-44 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-xs sm:text-sm transition-colors",
                  "hover:bg-[#2a2a2a] touch-manipulation",
                  option.value === value ? 'text-pink-500 bg-pink-500/10' : 'text-white'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function FilterBar({
  sort,
  gender,
  style,
  age,
  onSortChange,
  onGenderChange,
  onStyleChange,
  onAgeChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
      <FilterDropdown
        label="Sort"
        value={sort}
        options={sortOptions}
        onChange={onSortChange}
      />
      <FilterDropdown
        label="Gender"
        value={gender}
        options={genderOptions}
        onChange={onGenderChange}
      />
      <FilterDropdown
        label="Style"
        value={style}
        options={styleOptions}
        onChange={onStyleChange}
      />
      <FilterDropdown
        label="Age"
        value={age}
        options={ageOptions}
        onChange={onAgeChange}
      />
    </div>
  );
}
