/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Mail, 
  User, 
  Play, 
  BookOpen, 
  Briefcase, 
  Home as HomeIcon,
  ArrowRight,
  Github,
  Twitter,
  ExternalLink,
  Clock,
  Calendar,
  ChevronUp,
  Code,
  Rocket
} from 'lucide-react';

// --- Types ---

type Tab = '首页' | '关于我' | '文章' | '视频' | '产品';

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
  const tabs: Tab[] = ['首页', '关于我', '文章', '视频', '产品'];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl">
      <div className="bg-white border-2 border-black rounded-full px-6 py-3 flex items-center justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-sm md:text-base font-bold transition-all px-3 py-1 rounded-md ${
                activeTab === tab 
                  ? 'border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white' 
                  : 'hover:opacity-70'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 ml-4">
          <button className="p-1 hover:scale-110 transition-transform">
            <Mail size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const SearchBar = ({ placeholder }: { placeholder: string }) => (
  <div className="relative w-full max-w-md">
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full bg-white border-2 border-black rounded-xl px-12 py-3 font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
    />
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
  </div>
);

// --- Pages ---

const HomePage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12"
  >
    <div className="flex-1 space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-black leading-tight">
          我是 <br />
          <span className="highlight-pink">西门美月匈XD</span>, <br />
          A Product Manager, <br />
          练习时长 <span className="highlight-blue">两年半</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700 max-w-lg">
          Bilibili Creator | Digital Writer | Hyperactive Otaku <br />
          toB PM by day, Vibe Coder by night. _[ö_ö]_ <br />
          A PASSIONATE FOOOOOL !!!
        </p>
      </div>
      <button className="neo-button flex items-center gap-2">
        <User size={20} />
        More about me
      </button>
    </div>
    <div className="flex-1 flex justify-center">
      <div className="relative">
        <div className="w-64 h-64 md:w-80 md:h-80 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <img 
            src="https://picsum.photos/seed/avatar/400/400" 
            alt="Avatar" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-pink border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xl">✨</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const EarthOnlineSection = () => (
  <div className="space-y-12">
    <div className="text-center space-y-4">
      <h3 className="text-4xl md:text-5xl font-black">
        地球Online <span className="highlight-pink">开放游戏进度</span>
      </h3>
    </div>

    <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] grid-paper relative min-h-[600px]">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 h-full">
        {/* Main Quests */}
        <div className="space-y-12">
          <div className="flex justify-center md:justify-end">
            <div className="bg-white border-2 border-black px-6 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              主线任务
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-20 pt-10">
            <div className="neo-card p-4 w-full max-w-[300px] relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-brand-blue border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Briefcase size={16} />
                </div>
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2025.09</div>
              </div>
              <div className="font-black text-sm">toB 软件产品经理，RPA + AI 方向</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>
          </div>
        </div>

        {/* Timeline Center */}
        <div className="hidden md:flex flex-col items-center h-full pt-4">
          <div className="w-8 h-8 bg-white border-2 border-black rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
            <ChevronUp size={20} />
          </div>
          <div className="w-1 flex-1 border-l-4 border-dashed border-black"></div>
          <div className="w-6 h-6 bg-white border-4 border-black rounded-full my-4"></div>
          <div className="w-1 flex-1 border-l-4 border-dashed border-black"></div>
          <div className="w-6 h-6 bg-white border-4 border-black rounded-full my-4"></div>
        </div>

        {/* Side Quests */}
        <div className="space-y-12">
          <div className="flex justify-center md:justify-start">
            <div className="bg-white border-2 border-black px-6 py-2 font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              支线任务
            </div>
          </div>

          <div className="flex flex-col items-start gap-20 pt-40">
            <div className="neo-card p-4 w-full max-w-[300px] relative">
              <div className="flex items-center justify-between mb-2">
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2026.01</div>
                <div className="w-8 h-8 bg-brand-pink border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Code size={16} />
                </div>
              </div>
              <div className="font-black text-sm">激动地开始 AI 编程，上线了我的个人网站</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -left-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-20"
  >
    <div className="flex flex-col md:flex-row gap-12 items-start">
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl md:text-6xl font-black">
          Welcome to <br />
          <span className="highlight-blue">西门的世界！</span>
        </h2>
        <div className="space-y-6 text-lg font-medium leading-relaxed">
          <p>我出生于 2000 年 5 月，在浙江的一个小村镇长大。</p>
          <p>家庭环境比较自由，家人都不会对我的选择做过多干涉。这导致我在肆意生长的过程中，拥有了很多复杂的成分。Anyway，欢迎来到西门的世界！</p>
          <p>我是一只 高精力死宅。对出去游山玩水无感，但精力异常旺盛，脑子里idea疯狂溢出。现实中轻微社恐，但在网络上结交了一群素未谋面的电子好友！</p>
          <p>目前在一家 995 的 toB 软件公司做产品经理，同时也是一名 B站小 up 主。还佛系经营了一家女生情趣用品小店（尽管我观念还是比较传统，咳咳）</p>
        </div>
      </div>
      
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-green border-l-2 border-b-2 border-black px-3 py-1 font-bold text-xs">ID CARD</div>
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-100 border-2 border-black rounded-xl overflow-hidden">
              <img src="https://picsum.photos/seed/id/300/300" alt="ID" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Name</span>
                <span className="font-black">西门</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Major</span>
                <span className="font-black text-xs">电气工程及其自动化</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Job</span>
                <span className="font-black text-xs">toB 软件产品经理</span>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-black border-dashed">
              <div className="text-[10px] font-mono text-center">XM-20000508-OVO</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-12">
      <div className="flex items-center gap-4">
        <h3 className="text-3xl font-black">近日生活 | RECENT UPDATES</h3>
        <div className="h-1 flex-1 bg-black"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <BookOpen size={24} />, label: '最近在读', content: '《纳瓦尔宝典》', color: 'bg-brand-blue' },
          { icon: <Play size={24} />, label: '最近狂刷', content: '蓝太线失事视频', color: 'bg-brand-pink' },
          { icon: <Briefcase size={24} />, label: '最近感兴趣', content: 'AI 编程', color: 'bg-brand-green' },
        ].map((item, i) => (
          <div key={i} className="neo-card p-6 space-y-4">
            <div className={`w-12 h-12 ${item.color} border-2 border-black rounded-xl flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
              {item.icon}
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-gray-500">{item.label}</div>
              <div className="text-xl font-black underline decoration-4 decoration-black/10 underline-offset-4">{item.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <EarthOnlineSection />

    <div className="bg-brand-yellow border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
      <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase">Statement</div>
      <h4 className="text-2xl md:text-4xl font-black">
        每一个大多数人看起来离经叛道的选择都让我很兴奋 |
      </h4>
      <p className="font-bold text-gray-700">
        我正在朝着自己喜欢的方向前进！<br />
        不知道 3年 5年 10年后的我会成为什么样的人，过上什么样的生活呢？
      </p>
    </div>
  </motion.div>
);

const ArticlesPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-12"
  >
    <div className="space-y-6">
      <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded flex items-center gap-2">
        <BookOpen size={14} /> READING ROOM
      </div>
      <h2 className="text-5xl md:text-7xl font-black leading-tight">
        The <span className="highlight-green">Journal</span>
      </h2>
      <p className="text-xl font-medium text-gray-700">
        描绘乱七八糟稀奇古怪的世界，人类的大脑真神奇。
      </p>
    </div>

    <div className="flex justify-end">
      <SearchBar placeholder="搜索文章标题或关键词..." />
    </div>

    <div className="space-y-8">
      {[
        { title: '我可有可无的网友', date: '2021-08-19', category: '随笔', desc: '关于那些在生命中出现又消失的数字连接。', color: 'bg-brand-yellow' },
        { title: '产品经理的自我修养', date: '2023-12-01', category: '专业', desc: '在 toB 领域摸爬滚打两年的心得体会。', color: 'bg-brand-blue' },
        { title: 'AI 编程初体验', date: '2024-01-15', category: '技术', desc: '小白如何利用 AI 工具快速构建原型。', color: 'bg-brand-pink' },
      ].map((article, i) => (
        <div key={i} className="neo-card flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-64 h-48 md:h-auto bg-gray-100 border-r-2 border-black">
            <img src={`https://picsum.photos/seed/art${i}/400/300`} alt="Article" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className={`px-2 py-0.5 border-2 border-black text-xs font-bold ${article.color}`}>{article.category}</span>
                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> {article.date}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black hover:text-brand-blue cursor-pointer transition-colors">{article.title}</h3>
              <p className="text-gray-600 font-medium">{article.desc}</p>
            </div>
            <div className="flex justify-end">
              <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const VideosPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-12"
  >
    <div className="space-y-6">
      <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded flex items-center gap-2">
        <Play size={14} /> CINEMA HALL
      </div>
      <h2 className="text-5xl md:text-7xl font-black leading-tight">
        Video <span className="highlight-blue text-white">Library</span>
      </h2>
      <p className="text-xl font-medium text-gray-700">
        分享抽象唠嗑视频、日常生活vlog、AI 编程的小白进阶史！
      </p>
    </div>

    <div className="flex justify-end">
      <SearchBar placeholder="搜索视频..." />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { title: '有一个捧杀式领导是什么样的体验？', duration: '02:27', views: '1.2w', date: '2024-02-10' },
        { title: 'vlog. 吸取大学生的元气才能继续生存下去', duration: '05:28', views: '8.5k', date: '2024-01-25' },
        { title: '2025年支出总结：25岁纯牛马全年消费大盘点', duration: '12:40', views: '2.1w', date: '2025-01-05' },
        { title: 'AI 编程实战：从零开始做一个个人网站', duration: '15:10', views: '5.6k', date: '2024-03-01' },
      ].map((video, i) => (
        <div key={i} className="neo-card overflow-hidden group">
          <div className="relative aspect-video bg-gray-100 border-b-2 border-black overflow-hidden">
            <img src={`https://picsum.photos/seed/vid${i}/600/400`} alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
            <div className="absolute bottom-3 right-3 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              {video.duration}
            </div>
            <div className="absolute top-3 left-3 bg-brand-pink border-2 border-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              BILIBILI
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-black text-lg leading-snug line-clamp-2 hover:text-brand-pink cursor-pointer transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <div className="flex items-center gap-3">
                <span>{video.views} 观看</span>
                <span>{video.date}</span>
              </div>
              <Play size={16} className="text-black" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const ProductsPage = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-12"
  >
    <div className="space-y-6">
      <div className="inline-block bg-black text-white px-3 py-1 text-xs font-bold uppercase rounded flex items-center gap-2">
        <Briefcase size={14} /> AI LAB
      </div>
      <h2 className="text-5xl md:text-7xl font-black leading-tight">
        Vibe <span className="highlight-yellow">Workshop</span>
      </h2>
      <p className="text-xl font-medium text-gray-700">
        为了让生活和工作简单、有趣一点点，和 AI 大聪明聊出来一些代码边角料。
      </p>
    </div>

    <div className="flex justify-end">
      <SearchBar placeholder="搜索产品..." />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[
        { id: '001', title: '等会儿吃啥？', desc: '基于 LBS 地理位置自动获取周边餐厅并随机抽取一家「盲盒」餐厅。', status: 'Released', date: '2024.01.15', color: 'bg-brand-yellow' },
        { id: '002', title: '周报生成器', desc: '输入几个关键词，AI 自动帮你润色成充满职场黑话的高级周报。', status: 'Beta', date: '2024.02.20', color: 'bg-brand-blue' },
      ].map((product, i) => (
        <div key={i} className="neo-card p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded"># {product.id}</div>
              <div className={`px-2 py-1 border-2 border-black text-[10px] font-bold uppercase ${product.color}`}>{product.status}</div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl font-black">{product.title}</h3>
              <div className="h-1 w-12 bg-black"></div>
              <p className="text-lg font-medium text-gray-600 leading-relaxed">{product.desc}</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="neo-button w-full flex items-center justify-center gap-2">
              View Product <ExternalLink size={18} />
            </button>
            <div className="text-[10px] font-mono text-center text-gray-400 uppercase tracking-widest">
              Released on {product.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('首页');

  const renderContent = () => {
    switch (activeTab) {
      case '首页': return <HomePage />;
      case '关于我': return <AboutPage />;
      case '文章': return <ArticlesPage />;
      case '视频': return <VideosPage />;
      case '产品': return <ProductsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main selection:bg-brand-pink selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 border-t-2 border-black border-dashed max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <div className="text-2xl font-black">西门美月匈XD</div>
          <div className="text-sm font-bold text-gray-500">© 2025 Built with AI & Passion.</div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
            <Github size={24} />
          </a>
          <a href="#" className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
            <Twitter size={24} />
          </a>
          <a href="#" className="p-2 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
            <Mail size={24} />
          </a>
        </div>
      </footer>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-1/4 left-10 w-20 h-20 border-4 border-black rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 right-10 w-16 h-16 border-4 border-black rotate-45 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-brand-yellow border-2 border-black rounded-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-brand-pink border-2 border-black rounded-full"></div>
      </div>
    </div>
  );
}
