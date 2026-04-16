import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';
import type { Character } from '@/types';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  index: number;
}

export function CharacterCard({ character, onClick, index }: CharacterCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onClick={onClick}
      className={cn(
        "relative rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer",
        "bg-[#141414] border border-[#2a2a2a]",
        "group hover:border-[#3a3a3a]",
        "transition-all duration-200",
        "active:scale-[0.98] touch-manipulation"
      )}
      style={{ aspectRatio: '3/4' }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-95" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-4">
        {/* Name and Age */}
        <div className="flex items-baseline gap-1 sm:gap-2 mb-0.5 sm:mb-2">
          <h3 className="text-white font-semibold text-sm sm:text-lg truncate">{character.name}</h3>
          <span className="text-gray-400 text-xs flex-shrink-0">{character.age}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-[11px] sm:text-sm line-clamp-2 mb-1.5 sm:mb-3 leading-relaxed">
          {character.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-400">
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Heart size={10} className="sm:w-3 sm:h-3 text-pink-500" />
            <span>{character.likes}</span>
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <Eye size={10} className="sm:w-3 sm:h-3" />
            <span>{character.views}</span>
          </div>
        </div>

        {/* Author */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-3 pt-1.5 sm:pt-3 border-t border-white/10">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-[7px] sm:text-[10px] text-white font-medium">
            {character.author.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-[9px] sm:text-xs text-gray-400 truncate">@{character.author.name}</span>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent" />
      </div>
    </motion.div>
  );
}
