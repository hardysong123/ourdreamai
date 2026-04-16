import { Users, MessageSquare, TrendingUp, Award } from 'lucide-react';

export function CommunityPage() {
  const stats = [
    { label: 'Total Members', value: '2.5M+', icon: Users },
    { label: 'Active Now', value: '45K', icon: MessageSquare },
    { label: 'Daily Posts', value: '12K', icon: TrendingUp },
    { label: 'Top Creators', value: '500+', icon: Award },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Community</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-[#1a1a1a] rounded-xl p-6 text-center">
              <Icon className="w-8 h-8 text-[#e91e8c] mx-auto mb-3" />
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Featured Discussions */}
      <div className="bg-[#1a1a1a] rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Featured Discussions</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-4 p-4 bg-[#2a2a2a] rounded-lg hover:bg-[#3a3a3a] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#e91e8c]/20 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-[#e91e8c]" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Discussion Title {i}</h3>
                <p className="text-gray-400 text-sm mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>234 replies</span>
                  <span>•</span>
                  <span>2 hours ago</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
