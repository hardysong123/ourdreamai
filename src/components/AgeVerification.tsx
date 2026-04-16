import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AgeVerificationProps {
  onVerify: () => void;
  onReject: () => void;
}

export function AgeVerification({ onVerify, onReject }: AgeVerificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setIsVisible(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false);
    onVerify();
  };

  const handleReject = () => {
    setIsVisible(false);
    onReject();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              'fixed inset-0 z-[101] flex items-center justify-center p-4',
              'pointer-events-auto'
            )}
          >
            <div className="w-full max-w-md bg-[#141414] border border-[#2a2a2a] rounded-2xl sm:rounded-3xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-pink-600 to-purple-600 p-6 sm:p-8 text-center">
                <div className="absolute top-3 right-3">
                  <button
                    onClick={handleReject}
                    className="p-2 rounded-full bg-black/20 text-white/80 hover:bg-black/30 hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Shield size={32} className="text-white sm:w-10 sm:h-10" />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Age Verification Required
                </h2>
                <p className="text-white/80 text-sm sm:text-base">
                  This website contains adult content
                </p>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 space-y-4">
                {/* Warning */}
                <div className="flex items-start gap-3 p-3 sm:p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-200 text-xs sm:text-sm font-medium mb-1">
                      18+ Content Warning
                    </p>
                    <p className="text-amber-200/70 text-xs sm:text-sm">
                      This site contains mature themes and NSFW content that is only suitable for adults aged 18 and over.
                    </p>
                  </div>
                </div>

                {/* Age Question */}
                <div className="text-center py-2">
                  <p className="text-white font-medium text-base sm:text-lg mb-1">
                    Are you 18 years or older?
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    By clicking "I am 18+", you confirm that you are of legal age to view adult content in your jurisdiction.
                  </p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleVerify}
                    className="w-full py-5 sm:py-6 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold text-sm sm:text-base rounded-xl"
                  >
                    I am 18 or older
                  </Button>

                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="w-full py-5 sm:py-6 border-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#1a1a1a] text-sm sm:text-base rounded-xl"
                  >
                    I am under 18
                  </Button>
                </div>

                {/* Footer */}
                <div className="text-center pt-2">
                  <p className="text-gray-600 text-[10px] sm:text-xs">
                    By using this site, you agree to our{' '}
                    <a href="#" className="text-pink-500 hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
