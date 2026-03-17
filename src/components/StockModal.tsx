import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StockModal: React.FC<StockModalProps> = ({ isOpen, onClose }) => {
  const records = [
    { month: '2025.08', value: 339.2 },
    { month: '2025.09', value: -563.4 },
    { month: '2025.10', value: 181.9 },
    { month: '2025.11', value: -300 },
    { month: '2025.12', value: -121 },
    { month: '2026.01', value: 121 },
    { month: '2026.02', value: -65 },
    { month: '2026.03', value: 28 },
  ];

  const total = records.reduce((acc, curr) => acc + curr.value, 0);

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
            className="relative w-full max-w-md bg-[#F5F5F5] border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-500 p-6 border-b-4 border-black flex items-center justify-between relative overflow-hidden">
               {/* Decorative chart line */}
               <svg className="absolute bottom-0 left-0 right-0 h-16 opacity-20 text-black" viewBox="0 0 100 20" preserveAspectRatio="none">
                 <path d="M0 10 Q 25 20 50 10 T 100 10 V 20 H 0 Z" fill="currentColor" />
               </svg>
               
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <TrendingUp size={28} className="text-red-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">A股韭菜日记</h2>
                  <p className="font-bold text-xs text-white/80 uppercase tracking-wider">My Trading Records</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white border-2 border-black rounded-full hover:bg-red-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6">
               {/* Total Stats */}
               <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
                  <div className="font-bold text-gray-500">累计盈亏</div>
                  <div className={`text-3xl font-black ${total >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                     {total > 0 ? '+' : ''}{total.toFixed(1)}
                  </div>
               </div>

               {/* Records List */}
               <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {records.map((record, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between bg-white border-2 border-black rounded-lg p-3 hover:translate-x-1 transition-transform"
                    >
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full border-2 border-black flex items-center justify-center ${record.value >= 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                             {record.value >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          </div>
                          <span className="font-bold font-mono text-lg">{record.month}</span>
                       </div>
                       <span className={`font-black text-xl ${record.value >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {record.value > 0 ? '+' : ''}{record.value}
                       </span>
                    </motion.div>
                  ))}
               </div>
               
               {/* Footer Quote */}
               <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 italic">"股市有风险，入市需谨慎"</p>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
