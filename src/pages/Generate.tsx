import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Image, Mountain, Shirt, PenLine, Settings, Sparkles, X, Play, Film, Edit3, Plus } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';

export default function Generate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);

  // Get character from URL params
  useEffect(() => {
    const characterId = searchParams.get('character');
    if (characterId) {
      const character = characters.find(c => c.id === characterId);
      if (character) {
        setSelectedCharacter(character);
      }
    }
  }, [searchParams]);

  const handleRemoveCharacter = () => {
    setSelectedCharacter(null);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('character');
    setSearchParams(newParams);
  };

  const videoModes = [
    { id: 'presets', title: 'Presets', description: 'Design a video from scratch using presets and prompts', icon: Sparkles },
    { id: 'image-to-video', title: 'Image To Video', description: 'Animate one of your generated images', icon: Image },
    { id: 'extend', title: 'Extend Video', description: 'Continue an existing video for longer duration', icon: Film },
    { id: 'talking', title: 'Talking', description: 'Generate a talking video with speech and dialogue', icon: Play },
    { id: 'edit', title: 'Edit Video', description: 'Modify an existing video with a text prompt', icon: Edit3, isNew: true },
  ];

  return (
    <>
      <SEO
        title="Generate AI Images & Videos"
        description="Create stunning AI-generated images and videos of your favorite characters. Bring your imagination to life."
        keywords="AI image generator, AI video creator, character generation, AI art"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              NSFW AI Image Generator &<br className="hidden sm:block" /> Video Creator
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
            <div className="inline-flex bg-[#1a1a1a] rounded-lg p-1 border border-[#2a2a2a]">
              <button
                onClick={() => setActiveTab('image')}
                className={cn(
                  "flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                  activeTab === 'image'
                    ? "bg-[#2a2a2a] text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Image className="w-4 h-4" />
                Image
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={cn(
                  "flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-md text-sm font-medium transition-all",
                  activeTab === 'video'
                    ? "bg-[#2a2a2a] text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <Play className="w-4 h-4" />
                Video
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white transition-colors text-sm bg-[#1a1a1a]">
              Mode Presets
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Character Selection */}
          <div className="mb-6">
            {selectedCharacter ? (
              <div className="relative p-4 rounded-xl border border-pink-500/50 bg-pink-500/5">
                <button
                  onClick={handleRemoveCharacter}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-[#2a2a2a] text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedCharacter.image}
                    alt={selectedCharacter.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{selectedCharacter.name}</h3>
                    <p className="text-gray-400 text-sm">{selectedCharacter.age}</p>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{selectedCharacter.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="w-full relative p-8 rounded-xl border-2 border-dashed border-pink-500/50 bg-pink-500/5 hover:border-pink-500 transition-all text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-pink-500/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-white font-semibold mb-1">Select Character</h3>
                <p className="text-gray-500 text-sm">(required)</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            )}
          </div>

          {/* Video Mode Selection */}
          {activeTab === 'video' && (
            <div className="mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {videoModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      className="relative p-4 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all text-left group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-white font-medium text-sm">{mode.title}</h4>
                            {mode.isNew && (
                              <span className="px-1.5 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded">new</span>
                            )}
                          </div>
                          <p className="text-gray-500 text-xs mt-1">{mode.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Options Grid - Only for Image tab */}
          {activeTab === 'image' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <Image className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">Pose</h3>
                <p className="text-gray-500 text-sm">(optional)</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <Mountain className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">Background</h3>
                <p className="text-gray-500 text-sm">(optional)</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <Shirt className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">Outfit</h3>
                <p className="text-gray-500 text-sm">(optional)</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>

              <button className="relative p-6 sm:p-8 rounded-xl border-2 border-dashed border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-white font-semibold mb-1">Action</h3>
                <p className="text-gray-500 text-sm">(required)</p>
                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            </div>
          )}

          {/* Custom Prompt */}
          <div className="mb-6">
            <button className="w-full p-4 sm:p-6 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-colors text-center group">
              <div className="flex items-center justify-center gap-2 mb-2">
                <PenLine className="w-5 h-5 text-pink-500" />
                <span className="text-white font-semibold">Custom Prompt</span>
                <span className="text-pink-500 text-sm">(premium feature)</span>
              </div>
              <p className="text-gray-500 text-sm">Describe exactly what you want to generate</p>
            </button>
          </div>

          {/* Advanced Settings */}
          <div className="flex items-center justify-between mb-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <Settings className="w-4 h-4" />
              Advanced Settings
              <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-xs rounded">new model</span>
            </button>
          </div>

          {/* Generate Button */}
          <Button 
            disabled={!selectedCharacter}
            className={cn(
              "w-full py-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2",
              selectedCharacter
                ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                : "bg-[#2a2a2a] text-gray-500 cursor-not-allowed"
            )}
          >
            <Sparkles className="w-5 h-5" />
            {selectedCharacter 
              ? activeTab === 'image' ? 'Generate Images' : 'Select an action first'
              : 'Select a character first'
            }
          </Button>
        </motion.div>
      </div>
    </>
  );
}
