import { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { AgeVerification } from '@/components/AgeVerification';
import { cn } from '@/lib/utils';

// Pages
import Explore from '@/pages/Explore';
import Chat from '@/pages/Chat';
import Create from '@/pages/Create';
import Generate from '@/pages/Generate';
import MyAI from '@/pages/MyAI';
import Profile from '@/pages/Profile';
import Support from '@/pages/Support';
import Affiliate from '@/pages/Affiliate';

import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className={cn(isChatRoute && "h-full")}
      >
        <Routes location={location}>
          <Route path="/" element={<Explore />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/create" element={<Create />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/custom" element={<MyAI />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/support" element={<Support />} />
          <Route path="/affiliate" element={<Affiliate />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith('/chat');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <Header />
      <main
        className={cn(
          "lg:ml-[220px]",
          isChatRoute
            ? "h-[100dvh] overflow-hidden p-0"
            : "pt-12 sm:pt-14 lg:pt-[60px] min-h-screen pb-16 lg:pb-0"
        )}
      >
        <AnimatedRoutes />
      </main>
      <BottomNav />
    </div>
  );
}

function App() {
  const [, setAgeVerified] = useState(false);

  const handleAgeVerify = () => {
    setAgeVerified(true);
  };

  const handleAgeReject = () => {
    // Redirect to a safe page or show a message
    window.location.href = 'https://www.google.com';
  };

  return (
    <HelmetProvider>
      <HashRouter>
        <AgeVerification onVerify={handleAgeVerify} onReject={handleAgeReject} />
        <AppShell />
      </HashRouter>
    </HelmetProvider>
  );
}

export default App;
