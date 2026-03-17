import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Tag } from 'lucide-react';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    subtitle?: string;
    date: string;
    category: string;
    content: React.ReactNode;
    image?: string;
  } | null;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article }) => {
  if (!article) return null;

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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-3xl bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header Image (Optional) */}
            {article.image && (
              <div className="h-48 md:h-64 w-full relative border-b-4 border-black shrink-0">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none z-20"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            {!article.image && (
               <div className="absolute top-6 right-6 z-20">
                  <button
                    onClick={onClose}
                    className="p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
                  >
                    <X size={20} />
                  </button>
               </div>
            )}

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-[#FDFBF7]">
              {/* Meta Info */}
              <div className="mb-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-500">
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded border border-black/10">
                    <Calendar size={12} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1 bg-brand-yellow/20 px-2 py-1 rounded border border-brand-yellow/50 text-yellow-800">
                    <Tag size={12} /> {article.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-black leading-tight text-gray-900">
                  {article.title}
                </h1>
                
                {article.subtitle && (
                  <h2 className="text-lg md:text-xl font-bold text-gray-600 border-l-4 border-brand-pink pl-4 italic">
                    {article.subtitle}
                  </h2>
                )}
              </div>

              {/* Article Text */}
              <div className="prose prose-lg md:prose-xl max-w-none font-serif text-gray-800 leading-relaxed space-y-6">
                {article.content}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t-2 border-black/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full overflow-hidden border-2 border-white shadow-md">
                       <img src="/avatar.png" alt="Author" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-sm font-black">Written by Me</p>
                       <p className="text-xs text-gray-500">Thanks for reading!</p>
                    </div>
                 </div>
                 <div className="text-2xl opacity-20 rotate-12">
                    ✍️
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
