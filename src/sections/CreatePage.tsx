import { Sparkles, MessageCircle, Image, ArrowRight } from 'lucide-react';

export function CreatePage() {
  const options = [
    {
      title: 'Create a Character',
      description: 'Build your dream AI companion from scratch',
      icon: Sparkles,
      color: 'from-[#e91e8c] to-[#ff1493]',
    },
    {
      title: 'Start a Chat',
      description: 'Find a character and begin your conversation',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Generate Images',
      description: 'Create custom AI-generated images',
      icon: Image,
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-2">Create</h1>
      <p className="text-gray-400 mb-8">What would you like to create today?</p>

      <div className="space-y-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.title}
              className="w-full flex items-center gap-6 p-6 bg-[#1a1a1a] rounded-2xl hover:bg-[#2a2a2a] transition-colors group text-left"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1">{option.title}</h3>
                <p className="text-gray-400">{option.description}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
