import { useState } from 'react';
import { DollarSign, TrendingUp, Users, Award, Check, ChevronDown, ChevronUp, ArrowRight, Sparkles } from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';

export default function Affiliate() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const stats = [
    { value: '1bn+', label: 'messages sent', icon: DollarSign },
    { value: '200m+', label: 'videos and images generated', icon: TrendingUp },
    { value: '20m+', label: 'active users', icon: Users },
    { value: '#1 epc', label: 'adult ai offering on crakrevenue', icon: Award },
  ];

  const features = [
    {
      title: 'imaginative creators',
      description: 'Turn your content into cash, whether you create videos, streams, or posts. Your audience is ready.',
      icon: DollarSign,
    },
    {
      title: 'social gurus',
      description: 'Your followers trust you. We give you the offers they actually want. Instagram, TikTok, Twitter, Discord — if you have engagement, you have income.',
      icon: Users,
    },
    {
      title: 'expert advertisers',
      description: 'Stop breaking even on paid traffic. Our proven offers deliver the EPC you need to scale profitably. Test, optimize with data.',
      icon: TrendingUp,
    },
    {
      title: 'everyone else',
      description: 'Got traffic? We want it. Email lists, forums, blogs, Telegram — whatever you have, we help you monetize it with a straightforward setup.',
      icon: Award,
    },
  ];

  const commissionModels = [
    {
      title: 'revshare',
      description: 'Earn a percentage of revenue from referred users',
      rate: '40%',
      details: ['Recurring commissions on all purchases', 'Earn from every transaction', 'Instant commission on signup', 'Tier 1 geo payouts highest'],
    },
    {
      title: 'cpa',
      description: 'Get paid per qualified acquisition',
      rate: 'up to $50',
      details: ['Fixed payout per conversion', 'Varies by geographic location', 'Instant commission on signup', 'Tier 1 geo payouts highest'],
    },
  ];

  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Simply sign up below, get approved by our team, and you\'ll receive your unique tracking links and access to our affiliate dashboard. The entire process takes less than 24 hours.',
    },
    {
      question: 'What commission structure should I choose?',
      answer: 'Revshare (40%) is ideal for affiliates focused on maximizing earnings potential, while CPA (up to $50 based on geo) works great for paid traffic campaigns and quick conversions.',
    },
    {
      question: 'When do I get paid?',
      answer: 'Payments are processed monthly with a net-15 payment term. Minimum payout threshold is $100. We support PayPal, bank transfer, and crypto payments.',
    },
    {
      question: 'What kind of traffic is accepted?',
      answer: 'We accept all traffic sources including social media, content marketing, email marketing, and more. Adult traffic is fully supported and encouraged.',
    },
    {
      question: 'Do you provide marketing materials?',
      answer: 'Yes! We provide high-converting banners, email templates, landing pages, and promotional content tailored for adult traffic.',
    },
    {
      question: 'Is there a cookie duration?',
      answer: 'Yes, we offer a 30-day cookie window with last-click attribution. If a user signs up within 30 days of clicking your link, you get the commission.',
    },
    {
      question: 'Can I promote on adult sites?',
      answer: 'Yes, adult traffic is fully supported and encouraged. Many of our top affiliates promote on adult platforms with excellent results.',
    },
  ];

  return (
    <>
      <SEO
        title="Affiliate Program"
        description="Join the OurDream.ai affiliate program. Earn 40% revshare or up to $50 CPA on every referred customer."
        keywords="affiliate program, earn money, CPA, revshare, adult affiliate, AI affiliate"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-16">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-pink-600/30" />
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 C60 20 80 30 100 50 C80 70 60 80 50 100 C40 80 20 70 0 50 C20 30 40 20 50 0Z' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }}
          />

          <div className="relative px-8 py-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/20 rounded-full text-pink-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              now accepting new affiliates
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              join the <span className="text-pink-500">ourdream.ai</span><br />
              affiliate program
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              become an ourdream affiliate and earn{' '}
              <span className="text-pink-500 font-semibold">40% revshare</span> or{' '}
              <span className="text-pink-500 font-semibold">up to $50 cpa</span> on every referred customer.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full text-white font-semibold flex items-center gap-2 h-auto">
                apply now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="px-8 py-4 rounded-full text-white font-semibold border-[#2a2a2a] hover:bg-[#2a2a2a] h-auto">
                view commission models
              </Button>
              <Button variant="outline" className="px-8 py-4 rounded-full text-white font-semibold border-[#2a2a2a] hover:bg-[#2a2a2a] h-auto">
                affiliate login
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-pink-500 mb-2">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl text-pink-500 italic mb-4">
            &ldquo;we are outperforming everyone else in the adult ai space because our philosophy at ourdream is build the best platform and the rest will follow.&rdquo;
          </p>
          <p className="text-gray-400">— scott | co-founder of ourdream.ai</p>
        </div>

        {/* Join the Dream Team */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            join the <span className="text-pink-500">dream team</span>
          </h2>
          <p className="text-gray-400 text-center mb-8">partners from every corner of the internet</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#2a2a2a]">
                  <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Commission Models */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">commission models</h2>
          <p className="text-gray-400 text-center mb-8">choose the structure that works best for your traffic</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {commissionModels.map((model) => (
              <div key={model.title} className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#2a2a2a]">
                <h3 className="text-2xl font-bold text-white mb-2">{model.title}</h3>
                <p className="text-gray-400 mb-4">{model.description}</p>
                <p className="text-4xl font-bold text-pink-500 mb-6">{model.rate}</p>
                <ul className="space-y-2">
                  {model.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-green-500" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-8">frequently asked questions</h2>
          <p className="text-gray-400 text-center mb-8">everything you need to know about our affiliate program</p>

          <div className="space-y-3 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#2a2a2a]">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === `faq-${index}` ? null : `faq-${index}`)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#2a2a2a] transition-colors"
                >
                  <span className="text-white font-medium">{faq.question}</span>
                  {expandedFaq === `faq-${index}` ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaq === `faq-${index}` && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ready to start earning?</h2>
          <p className="text-gray-400 mb-8">start earning with ourdream.ai today</p>
          <Button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full text-white font-semibold h-auto">
            apply now
          </Button>
          <div className="flex justify-center gap-8 mt-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              secure & reliable
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              global coverage
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              trusted platform
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
