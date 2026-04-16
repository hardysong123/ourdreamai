import type { Character } from '@/types';
import { CharacterCard } from './CharacterCard';
import { cn } from '@/lib/utils';

interface CharacterGridProps {
  characters: Character[];
  onCharacterClick: (character: Character) => void;
}

export function CharacterGrid({ characters, onCharacterClick }: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-gray-400 px-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-lg sm:text-xl font-medium text-white mb-2">No characters found</p>
        <p className="text-sm sm:text-base text-gray-500">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "grid gap-3 sm:gap-4",
      "grid-cols-2", // Mobile: 2 columns
      "sm:grid-cols-2", // Small tablets: 2 columns
      "md:grid-cols-3", // Tablets: 3 columns
      "lg:grid-cols-3", // Small desktop: 3 columns
      "xl:grid-cols-4"  // Large desktop: 4 columns
    )}>
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={() => onCharacterClick(character)}
          index={index}
        />
      ))}
    </div>
  );
}
