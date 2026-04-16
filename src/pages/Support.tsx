import { motion } from 'framer-motion';
import { MessageCircle, HelpCircle, FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';

export default function Support() {
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
    <>
      <SEO
        title="Support & Feedback"
        description="Get help with OurDream.ai. Join our Discord community, browse FAQs, or contact our support team."
        keywords="support, help, FAQ, discord, customer service, AI companion help"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl hover:bg-[#2a2a2a] transition-colors group border border-[#2a2a2a]"
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
            <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
