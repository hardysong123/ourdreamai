import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Banner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={cn(
        "w-full",
        "rounded-xl sm:rounded-2xl overflow-hidden",
        "relative group cursor-pointer"
      )}
    >
      <div className={cn(
        "relative overflow-hidden",
        "h-[120px] sm:h-[160px] md:h-[200px]"
      )}>
        <img
          src="/banner.jpg"
          alt="Spring Sale - 75% OFF"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/40 to-transparent" />
        
        {/* Mobile overlay text */}
        <div className="absolute inset-0 flex items-center justify-center sm:hidden">
          <div className="text-center px-4">
            <p className="text-white text-xl font-bold drop-shadow-lg">75% OFF</p>
            <p className="text-pink-300 text-xs font-medium">Spring Sale</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
