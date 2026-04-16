import { useState } from 'react';
import { MessageCircle, Plus, ArrowRight, Sparkles } from 'lucide-react';

export function ChatPage() {
  const [hasChats] = useState(false);

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
      {!hasChats ? (
        <div className="text-center max-w-2xl mx-auto">
          {/* Empty State Card */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e91e8c]/20 to-[#ff1493]/20 rounded-3xl blur-xl" />
            <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <Plus className="w-8 h-8 text-[#e91e8c]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Find a character<br />to chat with
              </h2>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-full text-white font-medium transition-colors">
                AI Characters
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-[#1a1a1a] rounded-2xl p-8 text-left">
            <h3 className="text-xl font-semibold text-white mb-6">
              How To Start Chatting To AI Characters
            </h3>
            <p className="text-gray-400 mb-6">
              Every great AI chat starts with the right companion. You've got options:
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#e91e8c] flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Create Your Own</h4>
                  <p className="text-gray-400 text-sm">
                    Build your dream companion from scratch — whether that's an AI boyfriend or girlfriend. 
                    Create their personality, backstory, appearance, and quirks. Make them just how you envision. 
                    The more detail you add, the more real they feel.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#e91e8c] flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Browse Public Characters</h4>
                  <p className="text-gray-400 text-sm">
                    Not ready to create? <span className="text-[#e91e8c]">Explore characters</span> crafted by our community. 
                    Find someone who catches your eye and dive into a chat — no account needed to begin.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Models Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              Select from 5 different AI models to power your chat
            </h3>
            <div className="flex justify-center gap-4">
              {['GPT-4', 'Claude', 'Llama', 'Mistral', 'Custom'].map((model) => (
                <div 
                  key={model}
                  className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 text-sm"
                >
                  {model}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">Your chats will appear here</div>
      )}
    </div>
  );
}
