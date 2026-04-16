import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/seo/SEO';
import { Banner } from '@/components/Banner';
import { SearchBar } from '@/components/filters/SearchBar';
import { FilterBar } from '@/components/filters/FilterBar';
import { CategoryTags } from '@/components/filters/CategoryTags';
import { CharacterGrid } from '@/components/character/CharacterGrid';
import { CharacterModal } from '@/components/character/CharacterModal';
import { characters } from '@/data/characters';
import { useCharacterFilter } from '@/hooks/useCharacterFilter';
import type { Character } from '@/types';

export default function Explore() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filters,
    filteredCharacters,
    setSearch,
    setSort,
    setGender,
    setStyle,
    setAge,
    toggleTag,
  } = useCharacterFilter(characters);

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCharacter(null), 300);
  };

  return (
    <>
      <SEO
        title="Explore AI Characters"
        description="Discover thousands of AI characters. Chat, roleplay, and create your perfect AI companion on OurDream.ai."
        keywords="AI characters, AI chat, AI companions, virtual characters, roleplay, AI girlfriend, AI boyfriend"
      />
      
      <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="mt-4 sm:mt-6">
          <Banner />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-4 sm:py-6 space-y-3 sm:space-y-4"
        >
          <SearchBar value={filters.search} onChange={setSearch} />
          <FilterBar
            sort={filters.sort}
            gender={filters.gender}
            style={filters.style}
            age={filters.age}
            onSortChange={setSort}
            onGenderChange={setGender}
            onStyleChange={setStyle}
            onAgeChange={setAge}
          />
          <CategoryTags selectedTags={filters.tags} onTagClick={toggleTag} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pb-16 sm:pb-10"
        >
          <CharacterGrid
            characters={filteredCharacters}
            onCharacterClick={handleCharacterClick}
          />
        </motion.div>
      </div>

      {/* Character Modal */}
      <CharacterModal
        character={selectedCharacter}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
