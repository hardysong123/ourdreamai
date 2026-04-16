import { User, Settings, Bell, Shield, CreditCard, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ProfilePage() {
  const menuItems = [
    { icon: User, label: 'Edit Profile', description: 'Update your personal information' },
    { icon: Settings, label: 'Preferences & Notifications', description: 'Customize your experience' },
    { icon: Bell, label: 'Notifications', description: 'Manage notification settings' },
    { icon: Shield, label: 'Privacy & Security', description: 'Protect your account' },
    { icon: CreditCard, label: 'Subscription', description: 'Manage your plan' },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Profile</h1>

      {/* Profile Card */}
      <div className="bg-[#1a1a1a] rounded-2xl p-8 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#e91e8c] to-[#ff1493] flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Guest User</h2>
            <p className="text-gray-400 mb-3">@guest</p>
            <button className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-lg text-sm text-white transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#2a2a2a]">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm">Characters</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm">Chats</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm">Likes</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl",
                "hover:bg-[#2a2a2a] transition-colors text-left"
              )}
            >
              <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          );
        })}

        <button
          className={cn(
            "w-full flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl",
            "hover:bg-red-900/20 transition-colors text-left mt-6"
          )}
        >
          <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center">
            <LogOut className="w-5 h-5 text-red-500" />
          </div>
          <div className="flex-1">
            <p className="text-red-500 font-medium">Log Out</p>
          </div>
        </button>
      </div>
    </div>
  );
}
