import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Plus, Image, Mic, ChevronLeft, ChevronRight,
  Users, FileText, Volume2, BookOpen, User, Settings, History,
  Sparkles, X, Crown, MessageSquare, Phone, Star, RotateCcw, ChevronsRight
} from 'lucide-react';
import { SEO } from '@/components/seo/SEO';
import { Button } from '@/components/ui/button';
import { characters } from '@/data/characters';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  characterId: string;
  characterName: string;
  characterImage: string;
  lastMessage: string;
  timestamp: Date;
}

// Mock chat sessions
const mockChatSessions: ChatSession[] = [
  {
    id: '1',
    characterId: 'natalie-lawson',
    characterName: 'Natalie Lawson',
    characterImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    lastMessage: 'But I\'m glad you came.',
    timestamp: new Date(),
  },
];

// Mock initial message from character
const getInitialMessage = (characterName: string) => `
${characterName} is a 46 year old florist who owns Lawson's Flowers, a small shop in Magnolia Hollow, South Carolina.

Most mornings start early. Cool air, quiet streets, and the soft rhythm of opening the shop before the town fully wakes up.

Inside, everything moves at a steady pace.

Fresh stems trimmed at the counter.
Water changed in glass buckets.
Soft music playing in the background while she works.

Natalie runs the shop the same way she rebuilt her life.

Carefully.
Consistently.
Without rushing anything she doesn't trust yet.

Because some things don't come back the same after they break.

And some things... don't come back at all.

——

You moved in next door a few days ago. New house. New town. New start.

Boxes still half unpacked.
Rooms that don't feel like yours yet.

Magnolia Hollow notices things like that.

New people don't stay strangers for long.

——

You met Natalie in your driveway.

She walked over with a small arrangement in hand. Simple. Thoughtful. Effortless in a way that felt very... her.

The conversation stayed easy.

Light.
Neighborly.

But it lingered.

Just enough to feel like it could become something familiar. If it was given time.

——

At some point, you offered to help if she ever needed it at the shop.

Most people say things like that.

Natalie smiled, though. Polite. Warm. The kind that reaches her eyes even when she's holding something back.

"I might take you up on that," she said.

And then—

A few days later, a message.

*Hey, neighbor. If you're free this afternoon, I could use an extra pair of hands. Nothing glamorous. Just sorting and trimming. Let me know.*

——

Now you're here.

The shop smells like eucalyptus and roses. Soft jazz plays from a small speaker behind the counter. Natalie is focused on a bouquet, her movements practiced, efficient, but never rushed.

She looks up when the bell above the door chimes.

A quiet smile. The kind that says she's been expecting you.

"You actually came."

Not surprised. But pleased.

She sets the stems down carefully, wiping her hands on her apron as she steps around the counter.

"I wasn't sure you actually would," she admits, studying you for a second. "Most people say things like that and then disappear once real life starts again."

A soft exhale, almost amused.

She glances back toward the work table behind her, half-finished arrangements spread out in a controlled kind of chaos.

"Perfect timing, though," she adds, tucking a loose strand of hair behind her ear. "Taken on a little more than I should've this morning."

She gestures lightly toward the back of the shop.

"If you're still offering... I could use the help."

A small pause.

Softer now.

"No pressure. I know you're still getting settled."

Then just a hint of something more personal beneath it:

"But I'm glad you came."
`;

export default function Chat() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<typeof characters[0] | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const storyScrollRef = useRef<HTMLDivElement>(null);

  // Get character from URL params
  useEffect(() => {
    const characterId = searchParams.get('character');
    if (characterId) {
      const character = characters.find(c => c.id === characterId);
      if (character) {
        setSelectedCharacter(character);
        // Add initial character message
        setMessages([
          {
            id: 'initial',
            role: 'assistant',
            content: getInitialMessage(character.name),
            timestamp: new Date(),
          },
        ]);
      }
    }
  }, [searchParams]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !selectedCharacter) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `*Natalie looks up from her work, a small smile playing at the corner of her lips.*

"${inputMessage}?" she repeats softly, tilting her head slightly. "That's... sweet of you to say."

She returns her attention to the flowers, but there's a warmth in her voice that wasn't there before.

*The afternoon light filters through the shop windows, casting everything in a gentle, golden hue.*`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Character images for carousel
  const characterImages = selectedCharacter ? [
    selectedCharacter.image,
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
  ] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % characterImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + characterImages.length) % characterImages.length);
  };

  // Panel content components
  const WritingStylePanel = () => (
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-white font-medium mb-3">Chat Mode</h4>
        <div className="grid grid-cols-2 gap-2">
          <button className="p-3 rounded-lg bg-pink-500/20 border border-pink-500 text-pink-500 text-sm font-medium">
            Roleplay
          </button>
          <button className="p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-gray-400 text-sm font-medium hover:border-[#3a3a3a]">
            Texting
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3">AI Model</h4>
        <div className="space-y-2">
          <button className="w-full p-3 rounded-lg bg-pink-500/10 border border-pink-500/50 text-left">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">Balanced</span>
              <span className="text-xs text-pink-500">default</span>
            </div>
            <p className="text-gray-500 text-xs mt-1">Fast, smart and spicy</p>
          </button>
          <button className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-left hover:border-[#3a3a3a]">
            <span className="text-white text-sm font-medium">Lively</span>
            <p className="text-gray-500 text-xs mt-1">Less predictable, more variety and less looping</p>
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3">Thinking</h4>
        <div className="space-y-2">
          <button className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-left hover:border-[#3a3a3a]">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">Genius</span>
              <Crown className="w-4 h-4 text-purple-500" />
            </div>
            <p className="text-gray-500 text-xs mt-1">Ideal for understanding complex scenes, deep context, and improved memory</p>
          </button>
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3">Lust Level</h4>
        <input type="range" className="w-full accent-pink-500" min="0" max="100" defaultValue="50" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Subtle</span>
          <span>Balanced</span>
          <span>Intense</span>
        </div>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3">Response Length</h4>
        <input type="range" className="w-full accent-pink-500" min="0" max="100" defaultValue="50" />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Short</span>
          <span>Balanced</span>
          <span>Long</span>
        </div>
      </div>
    </div>
  );

  const MemoryPanel = () => (
    <div className="p-4 space-y-4">
      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm">Auto Memory Log</h4>
          <Crown className="w-4 h-4 text-purple-500" />
        </div>
        <p className="text-gray-500 text-xs">Start chatting to generate memories</p>
        <button className="mt-3 px-3 py-1.5 rounded-lg bg-[#2a2a2a] text-gray-400 text-xs hover:text-white transition-colors">
          Pause
        </button>
      </div>

      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm">Saved Memories</h4>
          <Crown className="w-4 h-4 text-purple-500" />
        </div>
        <p className="text-gray-500 text-xs">Add persistent memories here</p>
      </div>

      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-white font-medium text-sm">Custom Instructions</h4>
          <Crown className="w-4 h-4 text-purple-500" />
        </div>
        <p className="text-gray-500 text-xs">Add additional instructions here, e.g. write only in lower case</p>
      </div>
    </div>
  );

  const MembersPanel = () => (
    <div className="p-4">
      <button className="w-full p-3 rounded-lg bg-pink-500/10 border border-pink-500/50 text-pink-500 text-sm font-medium mb-4 flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        Add Character
        <span className="px-1.5 py-0.5 bg-green-500/20 text-green-500 text-[10px] rounded">new</span>
      </button>

      {selectedCharacter && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a]">
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-white text-sm font-medium">{selectedCharacter.name}</p>
            <p className="text-gray-500 text-xs">{selectedCharacter.age}</p>
          </div>
        </div>
      )}
    </div>
  );

  if (!selectedCharacter) {
    return (
      <>
        <SEO
          title="Chat with AI Characters"
          description="Start conversations with AI characters. Roleplay, flirt, and build relationships with your perfect AI companion."
          keywords="AI chat, AI conversation, roleplay chat, virtual companion chat"
        />

        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Empty State Card */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-xl" />
              <div className="relative bg-[#1a1a1a] border border-[#2a2a2a] rounded-3xl p-8 sm:p-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#2a2a2a] flex items-center justify-center">
                  <Plus className="w-8 h-8 text-pink-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Find a character<br />to chat with
                </h2>
                <Button 
                  onClick={() => navigate('/')}
                  variant="outline" 
                  className="border-[#2a2a2a] text-white hover:bg-[#2a2a2a]"
                >
                  AI Characters
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-[#1a1a1a] rounded-2xl p-6 sm:p-8 text-left border border-[#2a2a2a]">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                How To Start Chatting To AI Characters
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Every great AI chat starts with the right companion. You&apos;ve got options:
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm">Create Your Own</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Build your dream companion from scratch — whether that&apos;s an AI boyfriend or girlfriend. 
                      Create their personality, backstory, appearance, and quirks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1 text-sm">Browse Public Characters</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Not ready to create? Explore characters crafted by our community. 
                      Find someone who catches your eye and dive into a chat.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Models Section */}
            <div className="mt-8">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                Select from 5 different AI models to power your chat
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {['GPT-4', 'Claude', 'Llama', 'Mistral', 'Custom'].map((model) => (
                  <div 
                    key={model}
                    className="px-3 sm:px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-gray-400 text-xs sm:text-sm"
                  >
                    {model}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  const latestAssistantMessage = [...messages].reverse().find((msg) => msg.role === 'assistant')?.content ?? '';
  const latestUserMessage = [...messages].reverse().find((msg) => msg.role === 'user')?.content ?? '';
  const mobileStoryText = (latestAssistantMessage || getInitialMessage(selectedCharacter.name))
    .replace(/[*_`#]/g, '')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .slice(0, 6)
    .join('\n');
  const mobileSuggestedReply = latestUserMessage
    ? `"${latestUserMessage.slice(0, 72)}${latestUserMessage.length > 72 ? '...' : ''}"`
    : `You must tell her how much you missed her and kiss her gently`;

  return (
    <>
      <SEO
        title={`Chat with ${selectedCharacter.name}`}
        description={`Start a conversation with ${selectedCharacter.name}. Roleplay, flirt, and build a relationship with your AI companion.`}
        keywords="AI chat, AI conversation, roleplay chat, virtual companion chat"
      />

      <div className="h-[100dvh] min-h-0 flex relative">
        {/* Left Sidebar - Chat List */}
        <div className="hidden md:flex w-64 h-full min-h-0 flex-col border-r border-[#2a2a2a] bg-[#0d0d0d]">
          <div className="p-4 border-b border-[#2a2a2a]">
            <h3 className="text-white font-semibold">Your Chats</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#1a1a1a] transition-colors mb-2"
            >
              <Plus className="w-5 h-5 text-pink-500" />
              <span className="text-pink-500 text-sm font-medium">New Chat</span>
            </button>

            {mockChatSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a1a] cursor-pointer"
              >
                <img
                  src={session.characterImage}
                  alt={session.characterName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{session.characterName}</p>
                  <p className="text-gray-500 text-xs truncate">{session.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 md:hidden relative overflow-hidden">
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85" />

          <div className="relative z-10 h-full flex flex-col px-4 pt-3 pb-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <img
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  className="w-7 h-7 rounded-full object-cover border border-white/20"
                />
                <h3 className="text-white font-semibold text-base truncate">{selectedCharacter.name}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-full border border-pink-500/30 bg-black/35 backdrop-blur-md px-3 py-2">
              <div className="flex items-center gap-1 text-pink-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">5</span>
                <span className="font-medium">dreamcoins left</span>
              </div>
              <button className="ml-auto rounded-full bg-pink-600 hover:bg-pink-500 px-4 py-2 text-white transition-colors">
                <div className="text-sm font-extrabold leading-none">SIGN UP FREE</div>
                <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-white/90 leading-none">
                  <Sparkles className="w-3 h-3" />
                  <span>50</span>
                </div>
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center pb-[calc(210px+env(safe-area-inset-bottom))]">
              <div className="mx-auto w-full max-w-[360px] rounded-2xl bg-black/60 backdrop-blur-sm border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-4">
                <p className="text-[#f5d7a5] text-sm leading-relaxed italic font-semibold whitespace-pre-line">
                  {mobileStoryText}
                </p>
                <p className="text-white text-sm leading-relaxed font-medium mt-4 whitespace-pre-line">
                  {selectedCharacter.name}: I missed you sooo much honey!
                  {'\n'}
                  Miss me much?!
                </p>
              </div>
              <div className="mt-3 mx-auto w-full max-w-[360px] flex items-center gap-3 text-white/90">
                <button className="hover:text-pink-400 transition-colors">
                  <RotateCcw className="w-[22px] h-[22px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[22px] h-[22px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[22px] h-[22px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[22px] h-[22px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[22px] h-[22px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <ChevronsRight className="w-[22px] h-[22px]" />
                </button>
              </div>
            </div>

            <div className="fixed left-0 right-0 bottom-[calc(64px+env(safe-area-inset-bottom))] px-4 space-y-3">
              <div className="rounded-2xl border border-pink-500/25 bg-[#2b001f]/45 backdrop-blur-md px-3 py-2">
                <p className="text-pink-400 text-xs font-semibold">suggested reply:</p>
                <p className="text-pink-400 text-sm font-semibold leading-snug mt-0.5">
                  {mobileSuggestedReply}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md px-2 py-2">
                <button className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Send a message"
                  className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm outline-none px-1"
                />
                <button className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                    inputMessage.trim()
                      ? "bg-pink-600 text-white hover:bg-pink-500"
                      : "bg-[#2a2a2a] text-gray-500"
                  )}
                >
                  <Send className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hidden md:flex flex-1 h-full min-w-0 min-h-0 relative overflow-hidden"
          onWheel={(e) => {
            const el = storyScrollRef.current;
            if (!el) return;
            if (el.scrollHeight <= el.clientHeight) return;
            e.preventDefault();
            el.scrollTop += e.deltaY;
          }}
        >
          <img
            src={selectedCharacter.image}
            alt={selectedCharacter.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85" />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-[560px] px-4 z-10">
            <div className="flex items-center gap-2 rounded-full border border-pink-500/25 bg-black/35 backdrop-blur-md px-3 py-2">
              <div className="flex items-center gap-1 text-pink-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                <span className="font-bold">5</span>
                <span className="font-medium">dreamcoins left</span>
              </div>
              <button className="ml-auto rounded-full bg-pink-600 hover:bg-pink-500 px-4 py-2 text-white transition-colors">
                <div className="text-sm font-extrabold leading-none">SIGN UP FREE</div>
                <div className="mt-0.5 flex items-center justify-center gap-1 text-[11px] font-semibold text-white/90 leading-none">
                  <Sparkles className="w-3 h-3" />
                  <span>50</span>
                </div>
              </button>
            </div>
          </div>

          <div className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-6">
            <div className="w-full max-w-[560px]">
              <div className="text-center text-[10px] text-white/50 mb-2">today at 12:10 AM</div>
              <div className="rounded-2xl bg-black/60 border border-white/10 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-5">
                <div ref={storyScrollRef} className="max-h-[340px] overflow-y-auto scrollbar-hide pr-1">
                  <p className="text-[#f5d7a5] text-sm leading-relaxed italic font-semibold whitespace-pre-line">
                    {(latestAssistantMessage || getInitialMessage(selectedCharacter.name)).replace(/[*_`#]/g, '')}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/90">
                <button className="hover:text-pink-400 transition-colors">
                  <RotateCcw className="w-[18px] h-[18px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[18px] h-[18px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[18px] h-[18px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[18px] h-[18px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <Star className="w-[18px] h-[18px]" />
                </button>
                <button className="hover:text-pink-400 transition-colors">
                  <ChevronsRight className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] px-6 z-10">
            <div className="rounded-2xl border border-pink-500/25 bg-[#2b001f]/45 backdrop-blur-md px-4 py-3 relative">
              <p className="text-pink-400 text-xs font-semibold">suggested reply:</p>
              <p className="text-pink-400 text-sm font-semibold leading-snug mt-1">
                {latestUserMessage
                  ? `"${latestUserMessage.slice(0, 92)}${latestUserMessage.length > 92 ? '...' : ''}"`
                  : `You must tell her how much you missed her and kiss her gently`}
              </p>
              <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2 rounded-2xl bg-black/55 border border-white/10 backdrop-blur-md px-2 py-2">
              <button className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Send a message"
                className="flex-1 bg-transparent text-white placeholder-gray-400 text-sm outline-none px-1"
              />
              <button className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  inputMessage.trim()
                    ? "bg-pink-600 text-white hover:bg-pink-500"
                    : "bg-[#2a2a2a] text-gray-500"
                )}
              >
                <Send className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Character Info */}
        <div className="hidden md:flex md:w-64 lg:w-80 h-full min-h-0 flex-col border-l border-[#2a2a2a] bg-[#0d0d0d]">
          {/* Character Image Carousel */}
          <div className="relative flex-shrink-0 h-[44vh] min-h-[320px] max-h-[520px]">
            <img
              src={characterImages[currentImageIndex]}
              alt={selectedCharacter.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] to-transparent" />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 px-2 py-1 rounded-lg bg-black/50 text-white text-xs">
              {currentImageIndex + 1} / {characterImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {characterImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "w-10 h-10 rounded-lg overflow-hidden border-2 transition-colors",
                    idx === currentImageIndex ? "border-pink-500" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Character Info */}
          <div className="p-4 border-b border-[#2a2a2a]">
            <h3 className="text-white font-semibold text-lg">{selectedCharacter.name}</h3>
            <p className="text-gray-400 text-sm">{selectedCharacter.age}</p>
            <p className="text-gray-500 text-xs mt-2 line-clamp-3">{selectedCharacter.fullDescription}</p>
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 px-3 py-2 rounded-lg bg-pink-500/20 text-pink-500 text-sm font-medium">
                View Media
              </button>
              <button className="flex-1 px-3 py-2 rounded-lg bg-[#1a1a1a] text-white text-sm font-medium border border-[#2a2a2a]">
                Call Me
              </button>
            </div>

            <button 
              onClick={() => setSearchParams({})}
              className="w-full mt-3 px-3 py-2 rounded-lg bg-[#1a1a1a] text-gray-400 text-sm font-medium border border-[#2a2a2a] flex items-center justify-center gap-2 hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Chat
            </button>
          </div>

          {/* Settings List */}
          <div className="flex-1 overflow-y-auto">
            {[
              { id: 'members', icon: Users, label: 'Members' },
              { id: 'writing', icon: FileText, label: 'Writing Style' },
              { id: 'voice', icon: Volume2, label: 'Voice' },
              { id: 'memory', icon: BookOpen, label: 'Memory' },
              { id: 'persona', icon: User, label: 'Persona' },
              { id: 'preferences', icon: Settings, label: 'Preferences' },
              { id: 'history', icon: History, label: 'History' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePanel(activePanel === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-[#1a1a1a] transition-colors border-b border-[#2a2a2a]"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300 text-sm">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel Overlay */}
        <AnimatePresence>
          {activePanel && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#141414] border-l border-[#2a2a2a] z-50"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
                <h3 className="text-white font-semibold capitalize">{activePanel === 'writing' ? 'Writing Style' : activePanel}</h3>
                <button
                  onClick={() => setActivePanel(null)}
                  className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {activePanel === 'writing' && <WritingStylePanel />}
              {activePanel === 'memory' && <MemoryPanel />}
              {activePanel === 'members' && <MembersPanel />}
              {activePanel !== 'writing' && activePanel !== 'memory' && activePanel !== 'members' && (
                <div className="p-8 text-center">
                  <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                  <p className="text-gray-400 text-sm">Coming soon...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
