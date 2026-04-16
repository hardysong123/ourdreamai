import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, Heart, Share, User, ChevronDown, ChevronUp, MessageSquare, ImageIcon } from 'lucide-react';
import type { Character } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CharacterModalProps {
  character: Character | null;
  isOpen: boolean;
  onClose: () => void;
  onGenerate?: (character: Character) => void;
  onChat?: (character: Character) => void;
}

function AuthorCard({ author }: { author: Character['author'] }) {
  return (
    <div className="bg-[#0a0a0a] rounded-xl p-3 border border-[#2a2a2a]">
      <div className="flex items-center gap-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a] flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm sm:text-base truncate">{author.name}</h4>
          <p className="text-gray-400 text-xs sm:text-sm">
            {author.interactions} interactions • {author.followers} followers
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-[#2a2a2a] bg-transparent text-gray-200 hover:bg-[#1a1a1a] hover:text-white text-xs sm:text-sm px-3 h-8 flex-shrink-0"
        >
          Follow
        </Button>
      </div>
    </div>
  );
}

export function CharacterModal({ character, isOpen, onClose, onGenerate, onChat }: CharacterModalProps) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const navigate = useNavigate();
  const descriptionText = character?.description.replace(/[*_`]/g, '') ?? '';

  const handleGenerate = () => {
    if (character && onGenerate) {
      onGenerate(character);
    } else if (character) {
      navigate(`/generate?character=${character.id}`);
    }
    onClose();
  };

  const handleChat = () => {
    if (character && onChat) {
      onChat(character);
    } else if (character) {
      navigate(`/chat?character=${character.id}`);
    }
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!character) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-[440px] max-h-[88vh] bg-[#141414] border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="px-4 pt-4 pb-3 border-b border-[#222222]">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h2 className="text-lg sm:text-xl font-semibold text-white truncate">{character.name}</h2>
                      <span className="text-gray-500 text-sm">{character.age}</span>
                    </div>
                    <div className="mt-1.5">
                      <div
                        className={cn(
                          "text-gray-400 text-xs sm:text-sm leading-relaxed whitespace-pre-line",
                          !isDescriptionExpanded && "line-clamp-2"
                        )}
                      >
                        {descriptionText}
                      </div>
                      {descriptionText.length > 120 && (
                        <button
                          onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                          className="inline-flex items-center gap-1 text-xs text-gray-300 mt-1 hover:text-white transition-colors touch-manipulation"
                        >
                          {isDescriptionExpanded ? (
                            <>
                              Show less <ChevronUp size={14} />
                            </>
                          ) : (
                            <>
                              Show more <ChevronDown size={14} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                      <button className="inline-flex items-center gap-1.5 hover:text-gray-200 transition-colors touch-manipulation">
                        <User size={14} />
                        Profile
                      </button>
                      <button className="inline-flex items-center gap-1.5 hover:text-gray-200 transition-colors touch-manipulation">
                        <Heart size={14} />
                        {character.likes}
                      </button>
                      <button className="inline-flex items-center gap-1.5 hover:text-gray-200 transition-colors touch-manipulation">
                        <Share size={14} />
                        Share
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className={cn(
                      "p-2 rounded-full",
                      "bg-black/40 text-gray-200",
                      "hover:bg-black/60 hover:text-white transition-colors",
                      "active:scale-95 touch-manipulation"
                    )}
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="px-4 py-4 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {character.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-[#1a1a1a] text-gray-200 hover:bg-[#222222] cursor-pointer px-2.5 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {character.tags.length > 3 && (
                    <Badge variant="secondary" className="bg-[#1a1a1a] text-gray-400 hover:bg-[#222222] px-2.5 py-1">
                      +{character.tags.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="mt-4 rounded-2xl overflow-hidden border border-[#2a2a2a] bg-black/30 aspect-square">
                  <img src={character.image} alt={character.name} className="w-full h-full object-cover" />
                </div>

                <div className="mt-4">
                  <AuthorCard author={character.author} />
                </div>
              </div>

              <div className="px-4 pb-4 pt-3 border-t border-[#2a2a2a] bg-[#141414] flex gap-2">
                <Button
                  onClick={handleGenerate}
                  variant="outline"
                  className="flex-1 border-[#2a2a2a] bg-transparent text-gray-200 hover:bg-[#1a1a1a] h-11 rounded-xl"
                >
                  <ImageIcon size={16} className="mr-1.5" />
                  Generate
                </Button>
                <Button
                  onClick={handleChat}
                  className="flex-[1.6] bg-pink-600 hover:bg-pink-500 text-white h-11 rounded-xl"
                >
                  <MessageSquare size={16} className="mr-1.5" />
                  Chat
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
