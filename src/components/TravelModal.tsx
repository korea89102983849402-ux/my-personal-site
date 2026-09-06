import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Plane, Camera, Calendar } from 'lucide-react';

interface TravelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TravelModal: React.FC<TravelModalProps> = ({ isOpen, onClose }) => {
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);

  const trips = [
    {
      year: 2010,
      age: 5,
      destinations: ["郑州"],
      title: "中原文化的初体验",
      description: "郑州的烩面味道至今难忘。那时候还小，只记得到处都是厚重的历史感。",
      image: "/zhengzhou.jpg", 
      icon: <MapPin />
    },
    {
      year: 2012,
      age: 7,
      destinations: ["三亚"],
      title: "椰风海韵的童年",
      description: "阳光、沙滩、海浪。第一次见到大海的兴奋，在沙滩上捡贝壳，喝着清凉的椰子水，享受无忧无虑的童年时光。",
      image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2000&auto=format&fit=crop", // Sanya / Tropical Beach
      icon: <MapPin />
    },
    {
      year: 2013,
      age: 8,
      destinations: ["西安", "兰州"],
      title: "西北风情与秦俑",
      description: "兵马俑的千军万马让人屏息，兰州拉面的清汤牛肉香气扑鼻。黄土高原的风，吹来了历史的回响。",
      image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop", // Chinese Lanterns / Noodles vibe
      icon: <MapPin />
    },
    {
      year: 2014,
      age: 9,
      destinations: ["印度尼西亚·巴厘岛"],
      title: "海岛日出与赶海",
      description: "凌晨2点起床，只为那一抹海上日出。赶海的乐趣，异域的风情，让我第一次感受到了世界的广阔。",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2000&auto=format&fit=crop", // Bali
      icon: <Plane />
    },
    {
      year: 2017,
      age: 12,
      destinations: ["英国"],
      title: "魔法世界的朝圣",
      description: "漫步在牛津和剑桥的校园，探访古堡的神秘。终于买到了心心念念的哈利波特老魔杖，仿佛自己也收到了霍格沃茨的录取通知书。",
      image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=2000&auto=format&fit=crop", // London / Big Ben
      icon: <Plane />
    },
    {
      year: 2020,
      age: 15,
      destinations: ["山西"],
      title: "晋商大院的厚重",
      description: "乔家大院、平遥古城。触摸斑驳的青砖，感受晋商曾经的辉煌与智慧。三晋大地的历史，深沉而迷人。",
      image: "/shanxi.jpg", 
      icon: <MapPin />
    },
    {
      year: 2023,
      age: 18,
      destinations: ["恩施"],
      title: "山野之上的音乐节",
      description: "家人们谁懂啊！在恩施大峡谷听音乐节是什么神仙体验！山野之上，音乐将我们彼此相牵~ 18岁的成人礼，主打一个肆意狂欢！",
      image: "/enshi.jpg", 
      icon: <MapPin />
    },
    {
      year: 2023,
      age: 18,
      destinations: ["洛阳"],
      title: "神都洛阳·反串初体验",
      description: "我去了第一次来洛阳，尝试一下女装造型，哈哈哈哈哈哈我了个豆，太美了！",
      image: "/luoyang.png", 
      icon: <Camera />
    },
    {
      year: 2024,
      age: 19,
      destinations: ["张家界"],
      title: "天门洞下的小雪人",
      description: "和对象一起爬张家界，累是真累，美也是真美！还在天门洞下堆了个超可爱的雪人，阿凡达悬浮山get！",
      image: "/zhangjiajie.jpg", 
      icon: <MapPin />
    },
    {
      year: 2025,
      age: 20,
      destinations: ["杭州"],
      title: "雷峰塔的夜太迷人",
      description: "西湖的夜景真的绝绝子！雷峰塔倒映在水里，氛围感拉满。虽然人很多，但为了这景色，值了！",
      image: "/hangzhou.jpg", 
      icon: <MapPin />
    },
    {
      year: 2026,
      age: 21,
      destinations: ["内蒙古", "香港"],
      title: "未来的足迹",
      description: "计划去内蒙古骑马驰骋草原，去香港感受繁华都市的脉搏。世界那么大，我想去看看。",
      image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2000&auto=format&fit=crop", // Travel planning / Map
      icon: <Calendar />,
      isFuture: true
    }
  ];

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
            className="relative w-full max-w-5xl h-[85vh] bg-[#FDFBF7] border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left: Timeline List */}
            <div className="w-full md:w-1/3 bg-[#FFF8E1] border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col h-1/3 md:h-full">
              <div className="p-6 border-b-4 border-black bg-brand-blue relative overflow-hidden shrink-0">
                 <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '10px 10px' }}></div>
                 <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Plane size={20} className="text-black" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">环游世界</h2>
                            <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">My Travel Log</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="md:hidden p-2 bg-white border-2 border-black rounded-full hover:bg-gray-100"
                    >
                        <X size={16} />
                    </button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                 {trips.map((trip, index) => (
                    <div 
                        key={index}
                        onClick={() => setSelectedTrip(index)}
                        className={`neo-card p-4 cursor-pointer transition-all duration-200 group ${selectedTrip === index ? 'bg-brand-yellow translate-x-1' : 'hover:bg-white'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                {trip.year} · {trip.age}岁
                            </span>
                            {trip.isFuture && <span className="text-[10px] font-bold text-gray-500 bg-gray-200 px-1 rounded">PLAN</span>}
                        </div>
                        <h3 className="font-black text-sm md:text-base mb-1 group-hover:underline decoration-2 underline-offset-2">{trip.destinations.join(" & ")}</h3>
                        <p className="text-xs text-gray-600 line-clamp-1">{trip.title}</p>
                    </div>
                 ))}
              </div>
            </div>

            {/* Right: Detail View */}
            <div className="w-full md:w-2/3 h-2/3 md:h-full relative bg-white flex flex-col">
               {/* Close Button (Desktop) */}
               <button
                  onClick={onClose}
                  className="hidden md:block absolute top-6 right-6 p-2 bg-white border-2 border-black rounded-full hover:bg-red-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none z-20"
                >
                  <X size={20} />
                </button>

               <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                 {selectedTrip !== null ? (
                    <motion.div
                        key={selectedTrip}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col"
                    >
                        {/* Hero Image */}
                        <div className="h-48 md:h-64 w-full relative overflow-hidden border-b-4 border-black shrink-0">
                            <img 
                                src={trips[selectedTrip].image} 
                                alt={trips[selectedTrip].title}
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-6 text-white">
                                <h2 className="text-3xl md:text-4xl font-black drop-shadow-md mb-1">{trips[selectedTrip].destinations.join(" ")}</h2>
                                <div className="flex items-center gap-2 text-sm font-bold opacity-90">
                                    <MapPin size={14} />
                                    <span>{trips[selectedTrip].year}年</span>
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    <span>{trips[selectedTrip].age}岁</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 md:p-10 flex-1 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
                            <div className="max-w-2xl mx-auto space-y-6">
                                <div className="flex items-center gap-3 pb-4 border-b-2 border-black/10">
                                    <div className="w-12 h-12 bg-brand-pink border-2 border-black rounded-full flex items-center justify-center shrink-0">
                                        <Camera size={20} className="text-white" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black">{trips[selectedTrip].title}</h3>
                                </div>
                                
                                <div className="font-serif text-lg leading-relaxed text-gray-800 space-y-4">
                                    <p>{trips[selectedTrip].description}</p>
                                </div>

                                {trips[selectedTrip].isFuture && (
                                    <div className="bg-yellow-50 border-2 border-dashed border-yellow-400 p-4 rounded-xl flex items-start gap-3">
                                        <Calendar className="text-yellow-600 shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-bold text-yellow-800">未来计划</h4>
                                            <p className="text-sm text-yellow-700">这趟旅程即将开启，期待更多的精彩故事...</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                 ) : (
                    <div className="h-full flex flex-col items-center justify-center p-10 text-center opacity-50">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Plane size={64} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400">选择左侧旅程查看详情</h3>
                        <p className="text-gray-400 mt-2">点击时间轴，重温我的世界足迹</p>
                    </div>
                 )}
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
