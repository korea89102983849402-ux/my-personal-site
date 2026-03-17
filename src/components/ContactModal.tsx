import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, X, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  const email = '1546898679@qq.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50, rotate: 5 }}
            className="relative bg-white w-full max-w-md rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Header decoration */}
            <div className="bg-brand-blue h-16 border-b-4 border-black relative overflow-hidden">
              <div className="absolute inset-0 grid-paper opacity-20"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-yellow rounded-full border-2 border-black"></div>
              <div className="absolute top-2 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 border border-black"></div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 text-center space-y-6 relative">
              {/* Avatar/Icon */}
              <div className="w-24 h-24 mx-auto bg-brand-pink rounded-full border-4 border-black flex items-center justify-center -mt-16 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:rotate-12 transition-transform duration-300">
                <Mail size={48} className="text-white drop-shadow-md" />
                <div className="absolute -top-2 -right-2 bg-brand-yellow text-xs font-black px-2 py-1 rounded-md border-2 border-black transform rotate-12">
                  HI!
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-black text-black">Let's Chat!</h3>
                <p className="text-gray-600 font-bold">
                  无论是合作还是闲聊<br/>随时欢迎来信哦 ~
                </p>
              </div>

              {/* Email Box */}
              <div className="bg-gray-50 border-2 border-black rounded-xl p-4 flex items-center justify-between gap-3 group hover:bg-brand-blue/10 transition-colors">
                <span className="font-mono font-bold text-lg truncate text-black">{email}</span>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-black hover:text-white rounded-lg transition-colors border-2 border-transparent hover:border-black"
                  title="Copy email"
                >
                  {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-4 w-4 h-4 bg-brand-green rounded-full border-2 border-black"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-4 border-black rotate-45"></div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white border-2 border-black rounded-full hover:bg-red-100 transition-colors z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none"
            >
              <X size={20} className="text-black" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
