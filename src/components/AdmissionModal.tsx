import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, GraduationCap, Award, MapPin } from 'lucide-react';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({ isOpen, onClose }) => {
  const [isOpenLetter, setIsOpenLetter] = useState(false);

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setIsOpenLetter(false);
    }
  }, [isOpen]);

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

          {/* Container */}
          <div className="relative z-10 w-full max-w-4xl h-[600px] flex items-center justify-center perspective-1000">
            <AnimatePresence mode="wait">
              {!isOpenLetter ? (
                /* Envelope State */
                <motion.div
                  key="envelope"
                  initial={{ scale: 0.8, opacity: 0, y: 50 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -50 }}
                  className="relative cursor-pointer group"
                  onClick={() => setIsOpenLetter(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Envelope Body */}
                  <div className="w-[340px] h-[240px] bg-[#B22222] rounded-lg shadow-2xl relative flex items-center justify-center border-4 border-[#8B0000] overflow-hidden">
                    {/* Texture - simplified */}
                    <div className="absolute inset-0 opacity-10 bg-white"></div>
                    
                    {/* University Logo/Name */}
                    <div className="text-center space-y-4 relative z-10">
                       <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center border-4 border-[#FFD700] shadow-lg">
                          <GraduationCap size={40} className="text-[#B22222]" />
                       </div>
                       <div className="bg-white/90 px-4 py-2 rounded-md border-2 border-[#FFD700] shadow-md">
                          <h2 className="text-[#B22222] font-black font-serif tracking-widest text-lg">武汉纺织大学</h2>
                          <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">Wuhan Textile University</p>
                       </div>
                    </div>

                    {/* Stamp */}
                    <div className="absolute top-4 right-4 w-16 h-20 bg-white/90 border-2 border-dashed border-gray-400 rotate-12 flex flex-col items-center justify-center p-1 shadow-sm">
                       <div className="w-full h-full border border-gray-300 flex items-center justify-center">
                          <span className="text-[10px] font-mono text-gray-500 text-center leading-tight">EMS<br/>Express<br/>2023</span>
                       </div>
                    </div>
                  </div>
                  
                  {/* Envelope Flap (Triangle) */}
                  <div className="absolute top-0 left-0 w-full h-0 border-l-[170px] border-r-[170px] border-t-[120px] border-l-transparent border-r-transparent border-t-[#D32F2F] filter drop-shadow-md origin-top transform group-hover:scale-y-90 transition-transform"></div>

                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white font-bold bg-black/50 px-4 py-1 rounded-full text-sm animate-bounce">
                    点击开启
                  </div>
                </motion.div>
              ) : (
                /* Opened Letter State */
                <motion.div
                  key="letter"
                  initial={{ scale: 0.8, opacity: 0, rotateX: 90 }}
                  animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="bg-white w-full max-w-2xl h-auto min-h-[500px] rounded-lg shadow-2xl relative overflow-hidden flex flex-col border-[16px] border-[#B22222] p-8 md:p-12"
                >
                  {/* Watermark - using opacity on icon instead of SVG background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                    <GraduationCap size={400} />
                  </div>

                  {/* Header */}
                  <div className="flex items-center justify-center gap-4 mb-8 border-b-2 border-[#B22222]/20 pb-6">
                    <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center text-white shadow-lg">
                      <GraduationCap size={32} />
                    </div>
                    <div className="text-center">
                       <h1 className="text-3xl md:text-4xl font-black text-[#B22222] font-serif tracking-widest">录取通知书</h1>
                       <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">ADMISSION LETTER</p>
                    </div>
                    <div className="w-16 h-16 bg-[#B22222] rounded-full flex items-center justify-center text-white shadow-lg">
                       <Award size={32} />
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="flex-1 space-y-6 font-serif text-lg md:text-xl leading-relaxed text-gray-800 relative z-10 px-4 md:px-8">
                    <div className="font-bold text-2xl mb-6">
                      <span className="border-b-2 border-black px-2">杨志坚</span> 同学：
                    </div>
                    <p className="indent-8">
                      经我校招生委员会批准，你已被录取为我校 <span className="font-bold text-[#B22222]">广告学</span> 专业本科学生。
                    </p>
                    <p className="indent-8">
                      请持本通知书于 <span className="font-bold">2023年9月</span> 来校报到。
                    </p>
                    <p className="indent-8 text-base text-gray-600 italic mt-8">
                      "崇真尚美" —— 愿你在大学四年里，探索真理，追求美好，开启人生的新篇章。
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-12 flex justify-between items-end relative z-10">
                    <div className="text-xs text-gray-400 font-mono">
                      No. 202309015568
                      <br/>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={10} /> 湖北 · 武汉
                      </div>
                    </div>
                    <div className="text-center relative">
                      <h3 className="font-bold text-xl font-serif text-[#B22222]">武汉纺织大学</h3>
                      <p className="text-xs text-gray-500">二〇二三年七月</p>
                      
                      {/* Red Stamp Seal */}
                      <div className="absolute -top-8 -left-8 w-32 h-32 border-4 border-red-600 rounded-full opacity-60 flex items-center justify-center rotate-[-15deg] pointer-events-none mix-blend-multiply">
                        <div className="w-28 h-28 border-2 border-red-600 rounded-full flex items-center justify-center">
                           <div className="text-red-600 font-black text-xs text-center leading-none transform scale-75">
                              武<br/>汉<br/>纺<br/>织<br/>大<br/>学<br/>★
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} className="text-gray-500" />
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
