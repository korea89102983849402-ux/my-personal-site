import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                  <Play size={16} fill="white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">伊美冲突最新动态</h3>
                  <p className="text-xs text-gray-300">Live Coverage</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors backdrop-blur-sm pointer-events-auto"
              >
                <X size={20} />
              </button>
            </div>

            {/* Video Placeholder (Since we can't embed real news video easily without API key, using a thematic placeholder) */}
            <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center relative">
               {/* Static/Noise Effect Overlay */}
               <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>
               
               {/* Mock Video Content */}
               <iframe 
                 src="//player.bilibili.com/player.html?isOutside=true&aid=116153296953076&bvid=BV1hvPMzKEvX&cid=25972249844&p=1&autoplay=1" 
                 scrolling="no" 
                 frameBorder="0" 
                 allowFullScreen={true}
                 className="absolute inset-0 w-full h-full object-cover z-10"
               ></iframe>

               {/* Overlay for "Breaking News" feel */}
               <div className="absolute bottom-8 left-8 right-8 pointer-events-none z-20">
                  <div className="bg-red-600 text-white px-4 py-2 font-black uppercase tracking-wider text-lg md:text-xl shadow-lg transform -skew-x-12 inline-block w-fit">
                    Breaking News: Conflict Update
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
