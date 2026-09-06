import React, { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Github, Twitter, Mail } from 'lucide-react';
import { ContactModal } from './ContactModal';
import { MessageModal } from './MessageModal';
import { ChatModal } from './ChatModal';

const COLORS = [
  '#ffffff', // 0: 初始白
  '#fff9c4', // 1: 浅黄
  '#ffccbc', // 2: 浅橙
  '#f8bbd0', // 3: 浅粉
  '#e1bee7', // 4: 浅紫
  '#c5cae9', // 5: 浅靛
  '#b2dfdb', // 6: 浅青
  '#dcedc8', // 7: 浅绿
];

export const TearableFooter = () => {
  const [tearCount, setTearCount] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const MAX_TEARS = 7; // Keep for reference, though logic is now infinite

  const handleDragEnd = (_: any, info: PanInfo) => {
    // 向右拖动超过 100px 视为撕开
    if (info.offset.x > 100) {
      setTearCount((prev) => (prev + 1) % COLORS.length);
    }
  };

  const FooterContent = () => (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
      <div className="space-y-2 text-center md:text-left">
        <div className="text-2xl font-black">杨桃荔枝煎</div>
        <div className="text-sm font-bold text-gray-500">© 2025 Built with AI & Passion.</div>
      </div>
      <div className="flex gap-6">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all relative group"
        >
          <Github size={24} />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            试着和我对话吧！💬
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </button>
        <button 
          onClick={() => setIsMessageOpen(true)}
          className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all relative group"
        >
          <Twitter size={24} />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            给我留言 📝
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </button>
        <button 
          onClick={() => setIsContactOpen(true)}
          className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all relative group"
        >
          <Mail size={24} />
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max bg-black text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            联系方式 📮
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative max-w-6xl mx-auto mt-20 mb-12 px-6 z-20">
      {/* 占位符，撑开高度，确保布局稳定 */}
      <div className="opacity-0 py-12 px-6 border-t-2 border-transparent">
        <FooterContent />
      </div>

      {/* 底层（下一张纸） */}
      <div 
        className="absolute inset-0 border-t-2 border-black border-dashed py-12 px-6 shadow-sm"
        style={{ 
          backgroundColor: COLORS[(tearCount + 1) % COLORS.length],
          transform: 'rotate(-1deg)',
          transformOrigin: 'left center',
          zIndex: 0
        }}
      >
        <FooterContent />
      </div>

      {/* 顶层（当前纸） */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={tearCount} // Key 变化触发 AnimatePresence
          drag="x" // 允许水平拖动
          dragConstraints={{ left: 0, right: 0 }} // 限制回弹
          dragElastic={0.2} // 拖动弹性
          dragSnapToOrigin // 松手回弹
          onDragEnd={handleDragEnd}
          initial={{ rotateY: -90, opacity: 0, x: 0 }}
          animate={{ rotateY: 0, opacity: 1, x: 0 }}
          exit={{ 
            x: 800, // 向右飞出
            rotateY: 45, // 像翻书一样旋转
            opacity: 0, 
            transition: { duration: 0.5, ease: "easeIn" } 
          }}
          className="absolute inset-0 border-t-2 border-black border-dashed py-12 px-6 shadow-md cursor-grab active:cursor-grabbing"
          style={{ 
            backgroundColor: COLORS[tearCount], 
            zIndex: 10,
            transformOrigin: 'left center' // 设置旋转中心在左侧
          }}
        >
          {/* 撕纸虚线提示 */}
          <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
            TEAR RIGHT ✂
          </div>
          
          <FooterContent />
        </motion.div>
      </AnimatePresence>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <MessageModal isOpen={isMessageOpen} onClose={() => setIsMessageOpen(false)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};
