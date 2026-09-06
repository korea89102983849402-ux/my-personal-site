import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Hand } from 'lucide-react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose }) => {
  const [isBookOpen, setIsBookOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsBookOpen(false);
  }, [isOpen]);

  const classicQuotes = [
    "群体不善推理，却急于采取行动。它们不受理性的影响，却由情感驱动。",
    "群体从未渴求过真理，他们对不合口味的证据视而不见。谁能向他们提供幻觉，谁就能轻易地成为他们的主人；谁摧毁他们的幻觉，谁就会成为他们的牺牲品。",
    "在群体中，每种情感和行动都具有传染性，其程度足以使个人随时准备为集体利益牺牲他的个人利益。",
    "孤立的个人很清楚，在孤身一人时，他不能焚烧宫殿或洗劫商店，即使受到这样做的诱惑，他也很容易抵制这种诱惑。但在成为群体的一员时，他就会意识到人数赋予他的力量，这足以让他生出杀人劫掠的念头，并且会立刻屈从于这种诱惑。",
    "群体在智力上总是低于孤立的个人，但是从感情及其激起的行动这个角度看，群体可以比个人表现得更好或更差，这全看环境如何。一切取决于群体所接受的暗示性质。",
    "掌握了影响群众想象力的艺术，也就掌握了统治他们的艺术。",
    "个人一旦进入群体中，他的个性便湮没了，群体的思想占据统治地位，而群体的行为表现为无异议、情绪化和低智商。",
    "数量，即是正义。",
    "大众没有辨别能力，因而无法判断事情的真伪，许多经不起推敲的观点，都能轻而易举的得到普遍赞同。",
    "昨天受群众拥戴的英雄，今天可能就成为他们的阶下囚。当然，这要看那个英雄是否好运气的死在昨天。"
  ];

  const BookCover = () => (
    <div className="w-full h-full border-2 border-black flex flex-col items-center justify-center p-4 bg-[#fffdf0] relative overflow-hidden">
        {/* Texture overlay */}
        <div className="absolute inset-0 bg-[#e6dfcc] opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }}></div>
        
        <div className="border-2 border-black w-full h-full flex flex-col items-center justify-center p-2 relative z-10">
            <h2 className="text-3xl font-black mb-2 font-serif text-black text-center leading-tight">乌合<br/>之众</h2>
            <div className="w-16 h-0.5 bg-black my-4"></div>
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider text-center">The Crowd:<br/>A Study of the Popular Mind</p>
            <div className="mt-8 w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-serif italic text-xl border-2 border-transparent ring-2 ring-black ring-offset-2">G</div>
            <p className="mt-4 text-sm font-serif italic font-bold">Gustave Le Bon</p>
        </div>
        
        {/* Spine shadow effect for closed book */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
    </div>
  );

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
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Container */}
          <div className="relative z-10 flex items-center justify-center">
            
            <AnimatePresence mode="wait">
                {!isBookOpen ? (
                    /* Closed Book State */
                    <motion.div
                        key="closed-book"
                        layoutId="book-container"
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="cursor-pointer group relative"
                        onClick={() => setIsBookOpen(true)}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                         {/* Book Spine (Side view) */}
                         <div className="absolute left-0 top-1 bottom-1 w-8 bg-[#2a211c] rounded-l-md transform -translate-x-full border-2 border-r-0 border-black shadow-lg flex flex-col justify-center items-center py-4">
                            <span className="text-[#e3dccb] text-[10px] font-bold rotate-180 writing-vertical-rl tracking-widest opacity-80">GUSTAVE LE BON</span>
                         </div>

                         {/* Front Cover */}
                         <div className="w-[300px] h-[450px] bg-[#f5f5dc] rounded-r-md border-2 border-black shadow-[10px_10px_20px_rgba(0,0,0,0.4)] relative overflow-hidden">
                            <BookCover />
                         </div>

                         {/* Pages (Side view) */}
                         <div className="absolute right-0 top-2 bottom-2 w-4 bg-[#fffdf0] border-l border-gray-300 transform translate-x-full rounded-r-sm shadow-md" 
                              style={{ backgroundImage: 'linear-gradient(to right, transparent 90%, rgba(0,0,0,0.1))' }}>
                             {/* Page lines */}
                             {[...Array(10)].map((_, i) => (
                                 <div key={i} className="absolute left-0 w-full h-[1px] bg-gray-300" style={{ top: `${(i + 1) * 9}%` }}></div>
                             ))}
                         </div>

                         {/* Hint */}
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white font-bold flex items-center gap-2 whitespace-nowrap bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm"
                         >
                            <Hand size={16} className="animate-pulse" />
                            <span>Click to open</span>
                         </motion.div>
                    </motion.div>
                ) : (
                    /* Open Book State */
                    <motion.div
                        key="open-book"
                        layoutId="book-container"
                        initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="relative w-full max-w-5xl aspect-[3/2] max-h-[80vh] flex perspective-1000"
                    >
                        {/* Book Cover (Background) */}
                        <div className="absolute inset-0 bg-[#4a3b32] rounded-lg transform translate-y-2 translate-x-2 shadow-2xl"></div>
                        
                        {/* Book Content Wrapper */}
                        <div className="relative w-full h-full bg-[#fdfbf7] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex overflow-hidden border border-[#e3dccb]">
                        
                        {/* Left Page */}
                        <div className="flex-1 relative border-r border-[#e3dccb] p-8 md:p-12 flex flex-col items-center justify-center overflow-hidden bg-[#f7f5eb]">
                            {/* Page Texture & Shadow */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[rgba(0,0,0,0.08)]"></div>
                            
                            {/* Book Cover Image - Smaller on inside page */}
                            <div className="relative w-48 h-72 bg-[#f5f5dc] border-2 border-black shadow-[4px_4px_8px_rgba(0,0,0,0.2)] transform rotate-[-2deg] transition-transform hover:rotate-0 duration-300 z-10">
                                <BookCover />
                            </div>

                            {/* Page Number */}
                            <div className="absolute bottom-6 text-xs font-serif text-gray-400">12</div>
                        </div>

                        {/* Center Spine Shadow */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-16 -ml-8 bg-gradient-to-r from-[rgba(0,0,0,0.05)] via-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.05)] pointer-events-none z-20 mix-blend-multiply"></div>

                        {/* Right Page */}
                        <div className="flex-1 relative p-8 md:p-12 flex flex-col overflow-hidden bg-[#fffdf0]">
                            {/* Page Texture & Shadow */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-transparent to-[rgba(0,0,0,0.08)]"></div>

                            {/* Content Header */}
                            <div className="mb-6 pb-4 border-b border-[#e3dccb] flex justify-between items-end relative z-10">
                                <h3 className="font-serif italic text-xl text-gray-800">Chapter 1: The Mind of Crowds</h3>
                                <span className="text-xs font-serif text-gray-400">Excerpt</span>
                            </div>

                            {/* Scrollable Text */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 relative z-10 font-serif leading-relaxed text-gray-800">
                                {classicQuotes.map((quote, index) => (
                                <div key={index} className="mb-6 first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
                                    <p>{quote}</p>
                                </div>
                                ))}
                                <div className="text-center py-8">
                                <span className="text-gray-300 text-xl">❦</span>
                                </div>
                            </div>

                            {/* Page Number */}
                            <div className="absolute bottom-6 left-0 right-0 text-center text-xs font-serif text-gray-400">13</div>
                        </div>

                        </div>

                        {/* Close Button (Outside the book) */}
                        <button
                        onClick={onClose}
                        className="absolute -top-12 right-0 md:-right-12 p-2 bg-white text-black rounded-full hover:bg-brand-pink transition-colors shadow-lg z-50"
                        >
                        <X size={24} />
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
