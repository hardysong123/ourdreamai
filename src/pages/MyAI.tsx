import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function MyAI() {
  const [typeFilter] = useState('Characters');
  const [showFilter] = useState('Created');
  const [sortFilter] = useState('Recent');
  const [hasCharacters] = useState(false);

  return (
    <>
      <SEO
        title="My AI Characters"
        description="Manage your custom AI characters. Create, edit, and organize your personal collection of AI companions."
        keywords="my AI characters, custom AI, personal AI companions, AI character creator"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header with Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className={cn(
                  "w-full pl-10 pr-4 py-2.5 rounded-lg text-sm text-white placeholder-gray-500",
                  "bg-[#1a1a1a] border border-[#2a2a2a] focus:border-pink-500 focus:outline-none",
                  "transition-colors"
                )}
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 hover:bg-[#2a2a2a] transition-colors">
                Type: {typeFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 hover:bg-[#2a2a2a] transition-colors">
                Show: {showFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-sm text-gray-300 hover:bg-[#2a2a2a] transition-colors">
                Sort: {sortFilter}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!hasCharacters ? (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-8">You haven&apos;t created a character yet</p>
              
              {/* Create Card */}
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl" />
                <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-12">
                  <div className="absolute top-4 left-4">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                  </div>
                  <div className="absolute top-8 right-8">
                    <Sparkles className="w-3 h-3 text-pink-500/50" />
                  </div>
                  <div className="absolute bottom-8 left-8">
                    <Sparkles className="w-3 h-3 text-pink-500/50" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Create your own<br />custom character
                  </h2>
                  <Button 
                    variant="outline"
                    className="border-[#2a2a2a] text-white hover:bg-[#2a2a2a]"
                  >
                    Start Creating
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-white">Your characters will appear here</div>
          )}
        </motion.div>
      </div>
    </>
  );
}
