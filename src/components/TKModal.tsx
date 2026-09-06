import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, TrendingUp, Globe, ShoppingBag, Package } from 'lucide-react';

interface TKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TKModal: React.FC<TKModalProps> = ({ isOpen, onClose }) => {
  const records = [
    { month: '2025.09', sales: 50.00, profit: 12.50, orders: 2 },
    { month: '2025.10', sales: 80.00, profit: 28.20, orders: 4 },
    { month: '2025.11', sales: 120.50, profit: 45.80, orders: 6 },
  ];

  const totalSales = records.reduce((acc, curr) => acc + curr.sales, 0);
  const totalProfit = records.reduce((acc, curr) => acc + curr.profit, 0);

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
            className="relative w-full max-w-2xl bg-black border-4 border-white/20 rounded-[2rem] shadow-[0_0_50px_rgba(0,255,255,0.2)] overflow-hidden flex flex-col text-white"
          >
            {/* Header */}
            <div className="bg-[#00F2EA]/10 p-6 border-b border-white/10 flex items-center justify-between relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F2EA] to-[#FF0050]"></div>
               <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-black border border-white/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,242,234,0.5)]">
                  <Globe size={28} className="text-[#00F2EA]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-wider flex items-center gap-2">
                    <span className="text-[#00F2EA]">TikTok</span>
                    <span className="text-white">Shop</span>
                    <span className="text-[#FF0050]">Global</span>
                  </h2>
                  <p className="font-bold text-xs text-gray-400 uppercase tracking-widest">Cross-border E-commerce</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">
               {/* Stats Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-[#00F2EA]/20 to-transparent border border-[#00F2EA]/30 p-6 rounded-2xl relative overflow-hidden group">
                     <div className="absolute -right-4 -top-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <ShoppingBag size={80} />
                     </div>
                     <p className="text-[#00F2EA] font-bold text-sm uppercase tracking-wider mb-1">Total Sales</p>
                     <h3 className="text-4xl font-black text-white">€ {totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                  </div>
                  <div className="bg-gradient-to-br from-[#FF0050]/20 to-transparent border border-[#FF0050]/30 p-6 rounded-2xl relative overflow-hidden group">
                     <div className="absolute -right-4 -top-4 opacity-20 group-hover:opacity-40 transition-opacity">
                        <TrendingUp size={80} />
                     </div>
                     <p className="text-[#FF0050] font-bold text-sm uppercase tracking-wider mb-1">Net Profit</p>
                     <h3 className="text-4xl font-black text-white">€ {totalProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                  </div>
               </div>

               {/* Records Table */}
               <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-4 p-4 border-b border-white/10 bg-white/5 font-bold text-gray-400 text-sm">
                     <div>Month</div>
                     <div className="text-right">Orders</div>
                     <div className="text-right">Sales</div>
                     <div className="text-right">Profit</div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto custom-scrollbar-dark">
                     {records.map((record, index) => (
                        <motion.div 
                           key={index}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: index * 0.05 }}
                           className="grid grid-cols-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors font-mono"
                        >
                           <div className="text-gray-300">{record.month}</div>
                           <div className="text-right text-gray-400 flex items-center justify-end gap-1">
                              <Package size={12} /> {record.orders}
                           </div>
                           <div className="text-right text-[#00F2EA]">€ {record.sales.toFixed(2)}</div>
                           <div className="text-right text-[#FF0050] font-bold">€ {record.profit.toFixed(2)}</div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
