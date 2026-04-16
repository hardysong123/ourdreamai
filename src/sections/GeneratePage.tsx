import { useState } from 'react';
import { User, Image, Mountain, Shirt, PenLine, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GeneratePage() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image');

  const options = [
    {
      id: 'character',
      title: 'Select Character',
      subtitle: '(required)',
      icon: User,
    },
    {
      id: 'pose',
      title: 'Pose',
      subtitle: '(optional)',
      icon: Image,
    },
    {
      id: 'background',
      title: 'Background',
      subtitle: '(optional)',
      icon: Mountain,
    },
    {
      id: 'outfit',
      title: 'Outfit',
      subtitle: '(optional)',
      icon: Shirt,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          NSFW AI Image Generator &<br />Video Creator
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-[#1a1a1a] rounded-lg p-1">
          <button
            onClick={() => setActiveTab('image')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all",
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
              "flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all",
              activeTab === 'video'
                ? "bg-[#2a2a2a] text-white"
                : "text-gray-400 hover:text-white"
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Video
          </button>
        </div>
        <button className="ml-4 flex items-center gap-2 px-4 py-2.5 border border-[#2a2a2a] rounded-lg text-gray-400 hover:text-white transition-colors text-sm">
          Model Presets
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              className={cn(
                "relative p-8 rounded-xl border-2 border-dashed transition-all text-center group",
                option.id === 'character'
                  ? "border-[#e91e8c]/50 bg-[#e91e8c]/5 hover:border-[#e91e8c]"
                  : "border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a]"
              )}
            >
              <div className={cn(
                "w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center",
                option.id === 'character'
                  ? "bg-[#e91e8c]/20"
                  : "bg-[#2a2a2a]"
              )}>
                <Icon className={cn(
                  "w-6 h-6",
                  option.id === 'character' ? "text-[#e91e8c]" : "text-gray-400"
                )} />
              </div>
              <h3 className="text-white font-semibold mb-1">{option.title}</h3>
              <p className="text-gray-500 text-sm">{option.subtitle}</p>

              {/* Plus Icon */}
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Prompt */}
      <div className="mb-6">
        <button className="w-full p-6 rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] hover:border-[#3a3a3a] transition-colors text-center group">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PenLine className="w-5 h-5 text-[#e91e8c]" />
            <span className="text-white font-semibold">Custom Prompt</span>
            <span className="text-[#e91e8c] text-sm">(premium feature)</span>
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
      <button className="w-full py-4 bg-gradient-to-r from-[#e91e8c] to-[#ff1493] hover:opacity-90 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-opacity">
        <Sparkles className="w-5 h-5" />
        Select a character first
      </button>
    </div>
  );
}
