import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Image, Tags, Sparkles, ChevronRight, Check, Info } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  {
    id: 'basic',
    title: 'Basic Info',
    description: 'Name, age, and appearance',
    icon: User,
  },
  {
    id: 'personality',
    title: 'Personality',
    description: 'Traits and behavior',
    icon: FileText,
  },
  {
    id: 'avatar',
    title: 'Avatar',
    description: 'Upload or generate image',
    icon: Image,
  },
  {
    id: 'tags',
    title: 'Tags',
    description: 'Categories and interests',
    icon: Tags,
  },
];

const personalityTraits = [
  'Friendly', 'Mysterious', 'Playful', 'Serious', 'Romantic',
  'Adventurous', 'Shy', 'Confident', 'Funny', 'Caring',
  'Dominant', 'Submissive', 'Intelligent', 'Creative', 'Loyal',
];

const tagOptions = [
  'Anime', 'Realistic', 'Fantasy', 'Sci-Fi', 'Romance',
  'Action', 'Comedy', 'Drama', 'Horror', 'Mystery',
  'NSFW', 'SFW', 'Roleplay', 'Chat', 'Game',
];

export default function Create() {
  const [currentStep, setCurrentStep] = useState(0);
  const [characterName, setCharacterName] = useState('');
  const [characterAge, setCharacterAge] = useState('');
  const [characterDescription, setCharacterDescription] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);

  const toggleTrait = (trait: string) => {
    setSelectedTraits(prev =>
      prev.includes(trait)
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return characterName.trim().length > 0 && characterAge.trim().length > 0;
      case 1:
        return selectedTraits.length > 0;
      case 2:
        return true;
      case 3:
        return selectedTags.length > 0;
      default:
        return false;
    }
  };

  return (
    <>
      <SEO
        title="Create AI Character"
        description="Create your own custom AI character. Design their personality, appearance, and backstory."
        keywords="create AI character, custom AI, AI character creator, build AI companion"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Create Your AI Character
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Design your perfect AI companion step by step
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300',
                        isActive && 'bg-pink-500 text-white ring-4 ring-pink-500/20',
                        isCompleted && 'bg-green-500 text-white',
                        !isActive && !isCompleted && 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a]'
                      )}
                    >
                      {isCompleted ? (
                        <Check size={20} className="sm:w-6 sm:h-6" />
                      ) : (
                        <Icon size={18} className="sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <span className={cn(
                      'text-[10px] sm:text-xs mt-2 font-medium hidden sm:block',
                      isActive ? 'text-pink-500' : 'text-gray-500'
                    )}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-4 sm:p-6">
            {/* Step 1: Basic Info */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Character Name <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                    placeholder="e.g., Luna, Alex, Sophia..."
                    className={cn(
                      'w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm sm:text-base',
                      'bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Age <span className="text-pink-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={characterAge}
                    onChange={(e) => setCharacterAge(e.target.value)}
                    placeholder="e.g., 21, 25, 30..."
                    className={cn(
                      'w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm sm:text-base',
                      'bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    First Message / Greeting
                  </label>
                  <textarea
                    value={characterDescription}
                    onChange={(e) => setCharacterDescription(e.target.value)}
                    placeholder="How should your character greet users?"
                    rows={3}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm sm:text-base resize-none',
                      'bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none',
                      'transition-colors'
                    )}
                  />
                </div>

                <div className="flex items-center gap-2 p-3 bg-[#1a1a1a] rounded-lg">
                  <Info size={16} className="text-pink-500 flex-shrink-0" />
                  <p className="text-gray-400 text-xs sm:text-sm">
                    This greeting will be the first message users see when starting a chat.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Step 2: Personality */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white font-medium mb-3 text-sm sm:text-base">
                    Select Personality Traits <span className="text-pink-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {personalityTraits.map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTrait(trait)}
                        className={cn(
                          'px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200',
                          'active:scale-95 touch-manipulation',
                          selectedTraits.includes(trait)
                            ? 'bg-pink-500 text-white'
                            : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#3a3a3a]'
                        )}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Character Background
                  </label>
                  <textarea
                    placeholder="Describe your character's backstory, history, and life experiences..."
                    rows={4}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm sm:text-base resize-none',
                      'bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none',
                      'transition-colors'
                    )}
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2 text-sm sm:text-base">
                    Example Dialogues
                  </label>
                  <textarea
                    placeholder="Add example conversations to help define your character's speaking style..."
                    rows={3}
                    className={cn(
                      'w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 text-sm sm:text-base resize-none',
                      'bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none',
                      'transition-colors'
                    )}
                  />
                </div>
              </motion.div>
            )}

            {/* Step 3: Avatar */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button className="p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#1a1a1a] hover:border-pink-500/50 hover:bg-pink-500/5 transition-all text-center group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-[#2a2a2a] group-hover:bg-pink-500/20 flex items-center justify-center transition-colors">
                      <Image size={24} className="text-gray-400 group-hover:text-pink-500" />
                    </div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">Upload Image</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">JPG, PNG up to 5MB</p>
                  </button>

                  <button className="p-6 sm:p-8 rounded-xl border-2 border-dashed border-pink-500/50 bg-pink-500/5 hover:border-pink-500 transition-all text-center group">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                      <Sparkles size={24} className="text-pink-500" />
                    </div>
                    <h3 className="text-white font-semibold mb-1 text-sm sm:text-base">AI Generate</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">Create with AI</p>
                  </button>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-xl">
                  <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Avatar Preview</h4>
                  <div className="aspect-square max-w-[200px] mx-auto rounded-xl bg-[#2a2a2a] flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No image selected</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Tags */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-white font-medium mb-3 text-sm sm:text-base">
                    Select Tags <span className="text-pink-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={cn(
                          'px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200',
                          'active:scale-95 touch-manipulation',
                          selectedTags.includes(tag)
                            ? 'bg-pink-500 text-white'
                            : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a] hover:border-[#3a3a3a]'
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#1a1a1a] rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setIsPublic(!isPublic)}
                      className={cn(
                        'w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center',
                        isPublic
                          ? 'bg-pink-500 border-pink-500'
                          : 'border-[#2a2a2a] bg-[#141414]'
                      )}
                    >
                      {isPublic && <Check size={14} className="text-white" />}
                    </div>
                    <span className="text-white text-sm sm:text-base">Make this character public</span>
                  </label>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2 ml-8">
                    Public characters can be discovered and chatted with by other users.
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex-1 py-5 sm:py-6 border-[#2a2a2a] text-white hover:bg-[#1a1a1a] text-sm sm:text-base"
              >
                Back
              </Button>
            )}
            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className={cn(
                  'flex-1 py-5 sm:py-6 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm sm:text-base',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                Continue
                <ChevronRight size={18} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => alert('Character created!')}
                disabled={!canProceed()}
                className={cn(
                  'flex-1 py-5 sm:py-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm sm:text-base',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <Sparkles size={18} className="mr-2" />
                Create Character
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
