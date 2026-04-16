import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';

export function FeedPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Feed</h1>
      
      <div className="space-y-6">
        {/* Sample Feed Items */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-[#1a1a1a] rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
              <div className="w-10 h-10 rounded-full bg-[#2a2a2a]" />
              <div>
                <p className="text-white font-medium">Character Name</p>
                <p className="text-gray-500 text-sm">@creator</p>
              </div>
            </div>

            {/* Content */}
            <div className="aspect-video bg-[#2a2a2a] flex items-center justify-center">
              <Play className="w-16 h-16 text-gray-600" />
            </div>

            {/* Actions */}
            <div className="p-4">
              <div className="flex items-center gap-4 mb-3">
                <button className="text-gray-400 hover:text-[#e91e8c] transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-300 text-sm">
                <span className="text-white font-medium">1.2k likes</span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                View all 24 comments
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
