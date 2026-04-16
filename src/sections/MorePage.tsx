import { DollarSign, User, HelpCircle, Gamepad2, ExternalLink } from 'lucide-react';

export function MorePage() {
  const items = [
    { icon: DollarSign, label: 'Affiliate', path: '/affiliate' },
    { icon: User, label: 'Referral', path: '#' },
    { icon: HelpCircle, label: 'Support', path: '/support' },
    { icon: Gamepad2, label: 'Discord', path: '#' },
  ];

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">More</h1>

      <div className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl hover:bg-[#2a2a2a] transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-400" />
              </div>
              <span className="flex-1 text-white font-medium">{item.label}</span>
              <ExternalLink className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
