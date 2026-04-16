import { MessageCircle, HelpCircle, FileText, ExternalLink, ChevronRight } from 'lucide-react';

export function SupportPage() {
  const resources = [
    {
      icon: MessageCircle,
      title: 'Join the Discord',
      description: 'Get instant help from 40,000+ dreamers',
      link: '#',
    },
    {
      icon: HelpCircle,
      title: 'Feedback Board',
      description: 'Report bugs, request features, and vote on ideas',
      link: '#',
    },
    {
      icon: FileText,
      title: 'FAQ',
      description: 'Guides, troubleshooting, and common questions',
      link: '#',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <button className="text-gray-400 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h1 className="text-2xl font-bold text-white">Support & Feedback</h1>
      </div>
      
      <p className="text-gray-400 mb-8">
        Most questions can be answered through these resources.
      </p>

      {/* Resources */}
      <div className="space-y-3">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <a
              key={resource.title}
              href={resource.link}
              className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl hover:bg-[#2a2a2a] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                <Icon className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{resource.title}</h3>
                <p className="text-gray-500 text-sm">{resource.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          );
        })}
      </div>

      {/* Contact Support */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-4">Still need help? Contact Support</p>
        <button className="px-6 py-3 bg-gradient-to-r from-[#e91e8c] to-[#ff1493] hover:opacity-90 rounded-lg text-white font-medium transition-opacity">
          Contact Support
        </button>
      </div>
    </div>
  );
}
