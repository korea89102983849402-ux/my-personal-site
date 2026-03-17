/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SakuraBackground from './components/SakuraBackground';
import { TearableFooter } from './components/TearableFooter';
import { ContactModal } from './components/ContactModal';
import { ChatModal } from './components/ChatModal';
import { BookModal } from './components/BookModal';
import { VideoModal } from './components/VideoModal';
import { AIModal } from './components/AIModal';
import { AdmissionModal } from './components/AdmissionModal';
import { StockModal } from './components/StockModal';
import { TravelModal } from './components/TravelModal';
import { TKModal } from './components/TKModal';
import { ArticleModal } from './components/ArticleModal';
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
  Rocket,
  TrendingDown,
  Plane,
  Globe
} from 'lucide-react';

// --- Types ---

type Tab = '首页' | '关于我' | '文章' | '视频' | '产品';

// --- Data ---

const articles = [
  { 
    title: '专精与随性之间', 
    date: '2024-03-15', 
    category: '随笔', 
    desc: '当兴趣成为浮标——一个多重潜力者的告白', 
    color: 'bg-brand-green',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2000&auto=format&fit=crop',
    content: (
      <>
        <p>整理书桌的时候，我又翻出了那个落灰的笛子。是半年前心血来潮买的，当时听了首曲子，激动得半夜下单，幻想着自己不久后也能吹出那样悠扬的旋律。现在它静静躺在抽屉角落，和它作伴的，还有画了一半的素描、和断了弦的吉他。</p>
        <p>我盯着它们，想起昨天刷到的一个词——“多重潜力者”。说的大概就是我这种人：对世界永远充满好奇，像一只蝴蝶，不停地在各色花朵间跳跃。兴趣来时，可以不吃不睡地扑进去；可一旦那股新鲜劲儿过了，那朵花就失去了吸引力，我便毫不犹豫地飞走，寻找下一个目标。</p>
        <p>这种性格的好处是显而易见的。我的生活像一场永不落幕的冒险，总有新鲜事等着我去解锁。和朋友们聊天，我总能接住各种话题，从天文爱好者的星野摄影，聊到朋友新入坑的手冲咖啡豆风味。在他们眼里，我像个万金油，什么都懂一点，什么都敢尝试。我也确实享受这种状态，世界在我面前，永远是一本翻不完的立体书，每一页都藏着惊喜。</p>
        <p>但坏处也同样清晰。夜深人静，独自面对这个“半途而废收集器”般的抽屉时，一种心虚就会悄然升起。我好像什么都会一点，又什么都不会。朋友们聊起他们的专业或坚持多年的爱好，眼里有光；而我呢？我的光散落在一百个起点上，微弱而短暂。我永远在浅滩嬉戏，从未向深海游去。那笛子，如果坚持下来，或许现在也能为一首简单的歌伴奏了。可“如果”这个词，对我来说，是最奢侈也最无力的假设。</p>
        <p>我害怕“专精”意味着枯燥的重复和漫长的瓶颈期，那对我来说几乎是酷刑。我又隐隐不安于“随性”带来的浅尝辄止。这种摇摆，让我在很长一段时间里，都觉得自己是个有始无终的人。</p>
        <p>但矛盾的是，当我真正接纳自己“多重潜力者”的身份后，我开始看到另一面。我对很多事物都充满新鲜感，这本身，不也是一种天赋吗？它让我拥有了旺盛的好奇心和快速学习的能力。当我学习新软件时，过去那些“半途而废”的经验并非毫无用处，学绘画时练就的审美、学剪辑时建立的逻辑，都在悄悄帮我。它们像散落的珠子，看似无关，却能在某个意想不到的时刻，被一根看不见的线串联起来，形成我独特的认知网络。</p>
        <p>我依然无法成为某个领域的专家，但我成了一个“拼接者”。我能用A领域的视角去审视B领域的问题，用C领域的技能去解决D领域的困难。这种跨界的能力，或许正是单一专精者所不具备的。</p>
        <p>或许，“专精”与“随性”并非二元对立。真正的自我认知，不是把自己硬塞进某一个标签里，而是看清自己的质地后，找到最适合的生长方式。我的生长方式，也许不是一棵笔直向上的大树，而是一片会蔓延的藤蔓。我没有一个绝对的中心，但我所到之处，都能扎根，都能连接，最终覆盖出一片独特的风景。</p>
        <p>那个笛子，我吹了吹灰，又试着吹了一个音。不准备给自己定什么“一定要学会”的目标，只是觉得，此刻，这个声音让我愉悦，就够了。</p>
        <p>至于明天，谁知道呢？或许我会爱上吹出的这个单音，或许我又会去研究角落里那盆绿萝怎么扦插。但那又怎样？无论是深挖一口井，还是开凿无数条浅浅的溪流，只要水是活的，就能映照出天上的光。而我，不过是在用我的方式，认真地、贪婪地，热爱着这个辽阔的世界。</p>
      </>
    )
  },
  { 
    title: '一个新媒体运营的自我修养', 
    date: '2026-03-07', 
    category: '专业', 
    desc: '写给还在路上的人', 
    subtitle: '写给还在路上的人',
    color: 'bg-brand-blue',
    content: (
      <>
        <p>做新媒体运营做了4个月。</p>
        <p>其实最开始也没想过会干留学运营这行。那时候自己在找实习，一边刷雅思一边刷小红书，看得多了就开始琢磨：别人能做，我是不是也能试试？然后同专业的一个学姐推了我这个实习机会，于是运营就这么稀里糊涂地开始了。</p>
        <p>现在回想起来，最难的时候不是写不出内容，是刚起号那会儿。认认真真写了几篇干货发出去，两天过去，浏览量两位数。那种感觉就像站在空荡荡的操场喊话，没有回音。你明明觉得自己写得挺好的，但就是没人看。也不知道该问谁，也不知道问题出在哪。</p>
        <p>后来慢慢才明白，新号冷启动就是这样，平台不认识你，不知道你的内容该推给谁。这时候最重要的不是内容有多牛，是让算法先看懂你。怎么让算法看懂？就一个办法：持续发垂直内容，别今天发留学明天发穿搭。我当时连着发了十几篇留学相关的东西，虽然前期流量一直一般，但发着发着，推荐流量就慢慢起来了。账号开始活过来的时候，那种感觉就像终于有人听见你说话了。</p>
        <p>做内容这事，最难的不是写，是放下“我觉得”。</p>
        <p>我刚开始总想写自己觉得厉害的，学校排名、专业分析、申请流程，恨不得把知道的都塞进去。结果呢？完播率惨淡，没人看到最后。后来学会看数据，发现爆款内容都有一个共同点：戳中了用户的某个情绪。比如考研出分那天，我发了一条“考研失败了，不知道往哪走”，评论区炸了，全是同病相怜的人。那些我精心写的干货帖反而没人看。</p>
        <p>从那以后我才明白，新媒体运营不是写论文，是和真人对话。用户刷到你，前三秒决定看不看，十秒决定留不留。你要做的不是展示自己多专业，而是让他觉得“这人在说我”。现在我写每篇东西前都会问自己：这个选题，如果是我刷到，会点进来吗？看到开头，还想往下看吗？看完之后，想评论或收藏吗？这三个问题有一个答不上来，就继续改。</p>
        <p>做运营的人很难不焦虑数据。发完一篇，隔几分钟就想刷一下小眼睛，涨了开心，不动就焦虑。那种心情跟等考研成绩似的。我也经历过一条视频爆了百万播放，也经历过连续一周发什么都两位数。爆的时候觉得自己无所不能，流量差的时候怀疑是不是被限流了。后来慢慢学会一个词叫平常心。数据是结果，不是原因。爆款不是因为运气好，是选题、标题、封面、内容节奏都对上了。流量差也不是被针对，是某个环节没戳中用户。现在发完内容该干嘛干嘛，隔半天回来看一眼，数据好就想想哪做对了，数据差就琢磨下次怎么改。把它当成反馈，而不是考核。</p>
        <p>作为中介，做内容的终极目的是引流。但我见过太多同行把引流做得像骚扰，评论区狂发广告、私信轰炸、话术复制粘贴。结果是用户反感，平台也限流。我自己体会下来，想让人加你，得先让人信你。那些愿意加我微信的用户，大多数是在评论区互动过的。他们看到我认真回答问题，觉得这个人靠谱，才会主动问能不能加个微信。还有一种靠资料包引流，我在笔记里说整理了雅思备考资料，需要的可以私我，每天都有几十个人来领。加完微信，资料发了，信任也有了，后面聊什么都顺。</p>
        <p>这一行门槛很低，下限也很低。会打字就能发内容，但想做好，需要的东西太多了。网感、审美、数据分析能力、对用户的理解、对热点的敏感度，还有最重要的，持续输出的能力。我见过很多人做号，开头热血沸腾，一周后没动静了。也见过同行一天发五条，但每条都是复制粘贴的模板内容，做了一年还是几千粉丝。真正能跑出来的，都是能一直发、一直发的人。不需要每天爆款，但需要每天都在。</p>
        <p>做了四个月，最大的收获其实不是粉丝数，也不是引流了多少客户，而是学会了用运营的思维看世界。看到一个热点，会想能不能结合自己的内容；刷到爆款，会想它为什么能爆；和人聊天，会想他的痛点能不能做成选题。这种思维已经成为我的一部分，让我更敏感、更善于观察、也更理解人。</p>
        <p>如果让我给想入这行的人一个建议，那就是别只想着怎么把号做起来，先想清楚你能给别人提供什么价值。想明白了，账号自然会起来。</p>
      </>
    )
  },
  { 
    title: 'AI 编程初体验', 
    date: '2024-01-15', 
    category: '技术', 
    desc: '小白如何利用 AI 工具快速构建原型。', 
    subtitle: '传媒生小白用AI搭建网站的历程',
    color: 'bg-brand-pink',
    content: (
      <>
        <p>我知道AI很厉害。作为一个传媒生，我早就习惯了让AI帮我润色文案、想选题、改标题——它像一个永远在线、永不疲倦的文字秘书，我对它的依赖，止步于文字世界。</p>
        <p>直到上周，我想做个个人网站。</p>
        <p>这个念头搁置很久了。一直想要一个属于自己的小角落，放放文章、贴贴照片，在这个被算法裹挟的时代，给自己留一片自留地。但代码对我来说，是另一个次元的事情。那密密麻麻的符号，看着就让人想关掉浏览器。</p>
        <p>这次不一样。不知哪来的冲动，我决定试试——不是试试学代码，而是试试用AI帮我写代码。</p>
        <p>那天晚上，我打开DeepSeek，打下一行字：“我想做一个个人网站，完全不懂代码，怎么开始？”</p>
        <p>这是我第一次意识到，AI的世界里，也有“分工”。</p>
        <p>DeepSeek回得很详细。它不是直接甩给我一堆代码，而是像个耐心的朋友，先给我梳理思路：个人网站需要什么页面、用什么技术最简单、第一步该做什么。它甚至推荐了工具链——用Google AI Studio生成雏形，然后用Trae调整细节。</p>
        <p>我听得似懂非懂，但决定照做。</p>
        <p>打开Google AI Studio的时候，我完全是懵的。界面陌生，术语陌生，连该点哪里都犹豫半天。但神奇的是，当我试着输入“帮我生成一个个人网站的HTML，要有首页、文章页和照片展示页”时，它刷刷刷地吐出了一大段代码。</p>
        <p>我复制下来，按照DeepSeek教的方法，保存成html文件，双击打开——</p>
        <p>一个网站，出现在浏览器里。</p>
        <p>那一刻的感受很奇妙。不是“我做到了”的兴奋，而是“这就行了？”的恍惚。就像你请人帮忙搭积木，一转身，人家已经把城堡立在你面前了。</p>
        <p>但Google AI Studio生成的只是雏形。骨架有了，血肉还得自己填。标题不是我想要的，照片展示的方式还可以更好，导航栏我想让它更清爽一些。这些细节，需要有人帮我调。</p>
        <p>这时候，我打开了Trae。</p>
        <p>如果说Google AI Studio是那个一口气搭好毛坯房的施工队，Trae就是愿意陪我一点点抠细节的装修师傅。它的界面更友好，交互更自然，最重要的是——它好像真的能听懂我在说什么。</p>
        <p>“标题我想改成居中的，字体大一点，加个淡淡的阴影。”</p>
        <p>“照片展示这块，能不能做成鼠标放上去会放大的效果？”</p>
        <p>“导航栏在手机上显示有点挤，怎么办？”</p>
        <p>我像个拿着设计图指指点点的甲方，坐在电脑前不断提需求。而Trae，是个永远不会不耐烦的乙方。我说一句，它改一处；我提一个新想法，它立刻给我新代码。有时候我说得不清不楚，它还会追问：“你是想要这种效果，还是那种？”</p>
        <p>最让我震撼的是Trae有一些自己的主观能动性，他会依据我的要求和整体的模块需要，自己做出调整，虽然有时候会显得多余，但是有时候又确实能撞上我的需要。</p>
        <p>那一刻我忽然意识到，这三个工具在我手里，完成了一次奇妙的配合。DeepSeek是那个指路人，在我完全迷茫的时候告诉我“往哪走”；Google AI Studio是那个奠基者，刷刷刷给我搭好了地基和框架；Trae是那个陪我熬夜的伙伴，一遍遍帮我打磨细节，直到每个地方都变成我想要的样子。</p>
        <p>而我呢？我什么都没干，又好像什么都干了。我没写一行代码，但每一行代码都对应着我的一个想法。我不知道那些符号是什么意思，但我知道它们组合起来，实现了我想要的东西。</p>
        <p>这种感觉很难形容。就像你完全不懂乐理，但有个乐队愿意听你哼旋律，然后帮你把它编成完整的曲子。你不识谱，但曲子是你的。</p>
        <p>我的个人网站终于像模像样了。有首页、有文章、有视频、有关于页面、有明暗切换。我在浏览器里打开它，从头翻到尾，又从尾翻到头，像第一次拥有自己房间的孩子，反复确认这是真的。</p>
      </>
    )
  },
];

// --- Components ---

const Navbar = ({ activeTab, setActiveTab, onContactClick }: { activeTab: Tab, setActiveTab: (tab: Tab) => void, onContactClick: () => void }) => {
  const tabs: Tab[] = ['首页', '关于我', '文章', '视频', '产品'];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl">
      <div className="bg-white border-2 border-black rounded-full px-6 py-3 flex items-center justify-center relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
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
        <div className="absolute right-6 flex items-center gap-4">
          <button 
            className="p-1 hover:scale-110 transition-transform"
            onClick={onContactClick}
          >
            <Mail size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

const SearchBar = ({ placeholder, value, onChange }: { placeholder: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="relative w-full max-w-md">
    <input 
      type="text" 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-white border-2 border-black rounded-xl px-12 py-3 font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
    />
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black" size={20} />
  </div>
);

// --- Pages ---

const HomePage = ({ onNavigate }: { onNavigate: (tab: Tab) => void }) => {
  const [showBall, setShowBall] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
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
          <motion.span 
            className="highlight-pink"
            onClick={() => {
              setIsShaking(true);
              setTimeout(() => setIsShaking(false), 500);
            }}
            animate={isShaking ? { 
              x: [-10, 10, -10, 10, -5, 5, 0],
              y: [-5, 5, -5, 5, -2, 2, 0],
              rotate: [-12, 8, -12, 8, -2], // Shake vigorously
              scale: [1, 1.2, 0.9, 1.1, 1] // Add some scale bounce
            } : {
              rotate: -2,
              scale: 1
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            杨桃荔枝煎
          </motion.span>, <br />
          A Junior Undergraduate Intern, <br />
          练习时长 
          <span 
            className="highlight-blue relative"
            onClick={() => {
              setShowBall(true);
              setTimeout(() => setShowBall(false), 1000);
            }}
          >
            两年半
            <AnimatePresence>
              {showBall && (
                <motion.span
                  initial={{ opacity: 0, scale: 0, y: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: [-40, -10, -40], // Bouncing animation
                    rotate: 360 
                  }}
                  transition={{
                    duration: 0.6,
                    y: {
                      repeat: Infinity,
                      duration: 0.6,
                      ease: "easeOut"
                    },
                    rotate: {
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear"
                    }
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute left-0 right-0 mx-auto -top-8 text-4xl w-fit"
                  style={{ transformOrigin: "center bottom" }}
                >
                  🏀
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-gray-700 max-w-lg">
          New Media Specialist | Advertising planner | Daydreamer | AI Product Manager Experimenter. <br />
          A PASSIONATE FOOOOOL !!!
        </p>
      </div>
      <button 
        className="neo-button flex items-center gap-2"
        onClick={() => onNavigate('关于我')}
      >
        <User size={20} />
        More about me
      </button>
    </div>
    <div className="flex-1 flex justify-center">
      <div className="relative">
        <div 
          className="w-64 h-64 md:w-80 md:h-80 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={() => setIsChatOpen(true)}
        >
          <img 
            src="/avatar.png" 
            alt="Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-brand-pink border-2 border-black rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pointer-events-none">
          <span className="text-xl">✨</span>
        </div>
      </div>
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  </motion.div>
)};

const EarthOnlineSection = ({ onAdmissionClick, onStockClick, onTravelClick, onTKClick, onAIArticleClick, onNewMediaClick, onSocialPracticeClick }: { onAdmissionClick: () => void, onStockClick: () => void, onTravelClick: () => void, onTKClick: () => void, onAIArticleClick: () => void, onNewMediaClick: () => void, onSocialPracticeClick: () => void }) => (
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
            <div 
              className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50"
              onClick={onNewMediaClick}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-brand-blue border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Briefcase size={16} />
                </div>
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2026.12</div>
              </div>
              <div className="font-black text-sm">新媒体运营</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>

            <div 
              className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50"
              onClick={() => window.open(encodeURI('/（PPT）破工非遗——鄂州雕花剪纸的发展态势与数字转型之路调查报告.pptx'), '_blank', 'noopener,noreferrer')}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-brand-yellow border-2 border-black rounded-lg flex items-center justify-center text-black">
                  <Briefcase size={16} />
                </div>
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2024.10 - 2025.11</div>
              </div>
              <div className="font-black text-sm">暑期社会实践</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -right-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>

            <div 
              className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50"
              onClick={onAdmissionClick}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-brand-pink border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Briefcase size={16} />
                </div>
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2023.09</div>
              </div>
              <div className="font-black text-sm">考上武汉纺织大学</div>
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
            <div 
              className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50"
              onClick={onAIArticleClick}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2026.03</div>
                <div className="w-8 h-8 bg-brand-pink border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Code size={16} />
                </div>
              </div>
              <div className="font-black text-sm">激动地开始 AI 编程，上线了我的个人网站</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -left-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>

            <div className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50" onClick={onTKClick}>
              <div className="flex items-center justify-between mb-2">
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2025.09</div>
                <div className="w-8 h-8 bg-black border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Globe size={16} className="text-[#00F2EA]" />
                </div>
              </div>
              <div className="font-black text-sm">TK跨境电商</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -left-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>

            <div className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50" onClick={onStockClick}>
              <div className="flex items-center justify-between mb-2">
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2025.08</div>
                <div className="w-8 h-8 bg-brand-green border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <TrendingDown size={16} />
                </div>
              </div>
              <div className="font-black text-sm">开始在A股当韭菜</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -left-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>

            <div className="neo-card p-4 w-full max-w-[300px] relative cursor-pointer hover:bg-gray-50" onClick={onTravelClick}>
              <div className="flex items-center justify-between mb-2">
                <div className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">2010.08</div>
                <div className="w-8 h-8 bg-brand-blue border-2 border-black rounded-lg flex items-center justify-center text-white">
                  <Plane size={16} />
                </div>
              </div>
              <div className="font-black text-sm">环游世界</div>
              {/* Connector for desktop */}
              <div className="hidden md:block absolute top-1/2 -left-10 w-10 h-0.5 bg-black border-t-2 border-dashed border-black"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = ({ onNavigate, onBookClick, onVideoClick, onAIClick, onAdmissionClick, onStockClick, onTravelClick, onTKClick, onAIArticleClick, onNewMediaClick, onSocialPracticeClick }: { onNavigate: (tab: Tab) => void, onBookClick: () => void, onVideoClick: () => void, onAIClick: () => void, onAdmissionClick: () => void, onStockClick: () => void, onTravelClick: () => void, onTKClick: () => void, onAIArticleClick: () => void, onNewMediaClick: () => void, onSocialPracticeClick: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="pt-32 pb-20 px-6 max-w-6xl mx-auto space-y-20"
  >
    <div className="flex flex-col md:flex-row gap-12 items-start">
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl md:text-6xl font-black leading-snug">
          Welcome to <br />
          <span className="highlight-pink text-white inline-block mt-8">杨桃荔枝煎的世界！</span>
        </h2>
        <div className="space-y-6 text-lg font-medium leading-relaxed">
          <p>我出生于2005年2月，在湖北襄阳长大。</p>
          <p>家庭环境自由，父母不干涉我的决定，并且支持我的想法，导致我成为了一个多重潜力者，对创造和新事物抱有浓厚的兴趣。Anyway，welcome to my world!</p>
          <p>我是一个热爱世界一切美好事物的乐观主义者，乐于尝试一切新鲜事物，现实中轻微社恐，但玩熟后又是一个很E的人。</p>
          <p>目前刚从一个新媒体运营岗卸任，准备往策划或销售岗努力。同时也在学习AI的知识，并在大A当韭菜。</p>
        </div>
      </div>
      
      <div className="w-full md:w-80 space-y-6">
        <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-brand-green border-l-2 border-b-2 border-black px-3 py-1 font-bold text-xs">ID CARD</div>
          <div className="space-y-4">
            <div className="w-full aspect-square bg-gray-100 border-2 border-black rounded-xl overflow-hidden">
              <img src="/id_photo.png" alt="ID" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Name</span>
                <span className="font-black">杨志坚</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Major</span>
                <span className="font-black text-xs">广告学</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Job</span>
                <span className="font-black text-xs">新媒体运营</span>
              </div>
            </div>
            <div className="pt-4 border-t-2 border-black border-dashed">
              <div className="text-[10px] font-mono text-center">YTLZJ-1546898679@qq.com</div>
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
          { icon: <BookOpen size={24} />, label: '最近在读', content: '《乌合之众》', color: 'bg-brand-blue' },
          { icon: <Play size={24} />, label: '最近狂刷', content: '伊美冲突视频', color: 'bg-brand-pink' },
          { icon: <Briefcase size={24} />, label: '最近感兴趣', content: 'AI 编程', color: 'bg-brand-green' },
        ].map((item, i) => (
          <div 
            key={i} 
            className={`neo-card p-6 space-y-4 ${
              item.label === '最近在读' ? 'cursor-pointer hover:bg-gray-50' : 
              item.label === '最近狂刷' ? 'cursor-pointer hover:bg-gray-50' : 
              item.label === '最近感兴趣' ? 'cursor-pointer hover:bg-gray-50' : ''
            }`}
            onClick={
              item.label === '最近在读' ? onBookClick : 
              item.label === '最近狂刷' ? onVideoClick : 
              item.label === '最近感兴趣' ? onAIClick : undefined
            }
          >
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

    <EarthOnlineSection onAdmissionClick={onAdmissionClick} onStockClick={onStockClick} onTravelClick={onTravelClick} onTKClick={onTKClick} onAIArticleClick={onAIArticleClick} onNewMediaClick={onNewMediaClick} onSocialPracticeClick={onSocialPracticeClick} />

    <div className="bg-brand-yellow border-2 border-black p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
      <div className="inline-block bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase">Statement</div>
      <h4 className="text-2xl md:text-4xl font-black">
        每一个大多数人看起来离经叛道的选择都让我很兴奋 |
      </h4>
      <p className="font-bold text-gray-700">
        我正在朝着自己喜欢的方向前进！<br />
        不知道 3年 5年 10年后的我会成为什么样的人，过上什么样的生活呢？
      </p>
      <div className="pt-4 flex justify-center">
        <button 
          className="neo-button bg-white text-black px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={() => onNavigate('文章')}
        >
          下一页 <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </motion.div>
);

const ArticlesPage = ({ onArticleClick, onNavigate }: { onArticleClick: (article: any) => void, onNavigate: (tab: Tab) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
      <SearchBar 
        placeholder="搜索文章标题或关键词..." 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="space-y-8">
      {filteredArticles.length > 0 ? (
        filteredArticles.map((article, i) => (
        <div 
            key={i} 
            className="neo-card flex flex-col md:flex-row overflow-hidden cursor-pointer hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow"
            onClick={() => onArticleClick(article)}
          >
          <div className="w-full md:w-64 h-48 md:h-auto bg-gray-100 border-r-2 border-black">
            <img src={article.image || `https://picsum.photos/seed/art${i}/400/300`} alt="Article" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
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
      ))
      ) : (
         <div className="text-center py-20 text-gray-500 font-medium">
           没有找到相关文章...
         </div>
      )}
    </div>

    <div className="pt-4 flex justify-center">
      <button 
        className="neo-button bg-white text-black px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
        onClick={() => onNavigate('视频')}
      >
        下一页 <ArrowRight size={20} />
      </button>
    </div>
  </motion.div>
  );
};

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
        { title: '《Why study abroad》为何留学', duration: '02:27', views: null, date: '2026.02.05', videoSrc: null, imageSrc: '/weiheliuxue.jpg', externalLink: 'https://b23.tv/Kewmawu', platform: 'BILIBILI', platformColor: 'bg-brand-pink' },
        { title: '《留学中介日常》', duration: '05:28', views: '2.1w', date: '2026.02.05', videoSrc: null, imageSrc: '/liuxuezhongjierichang.jpg', externalLink: 'https://v.douyin.com/cRMA4llpcXc/', platform: 'Douyin', platformColor: 'bg-black text-white' },
        { title: '《留学国家从夯到拉》', duration: '03:45', views: '7.6k', date: '2026.02.08', videoSrc: null, imageSrc: '/liuxueguojiachonghangdaola.jpg', externalLink: 'https://v.douyin.com/ttN7403glls/', platform: 'Douyin', platformColor: 'bg-black text-white' },
        { title: '《考研没过怎么办》', duration: '04:12', views: '859', date: '2026.02.13', videoSrc: null, imageSrc: '/kaoyanmeiguozenmeban.jpg', externalLink: 'https://v.douyin.com/rrcpY_dHp0c/', platform: 'Douyin', platformColor: 'bg-black text-white' },
        { title: '《糟糕的天气》', duration: '03:20', views: null, date: '放在这里纯粹觉得很好玩', videoSrc: null, imageSrc: '/zaogaodetianqi.jpg', externalLink: 'https://b23.tv/LDPKnBF', platform: 'BILIBILI', platformColor: 'bg-brand-pink' },
        { title: '《武大郎复仇记》', duration: '03:45', views: null, date: '放在这里纯粹觉得很好玩', videoSrc: null, imageSrc: '/wudalangfuchouji.jpg', externalLink: 'https://b23.tv/UPyUneO', platform: 'BILIBILI', platformColor: 'bg-brand-pink' },
      ].map((video, i) => (
        <div key={i} className="neo-card overflow-hidden group">
          <div className="relative aspect-video bg-gray-100 border-b-2 border-black overflow-hidden">
            {video.videoSrc ? (
              <>
                <video 
                  src={video.videoSrc} 
                  controls 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 ${video.platformColor} border-2 border-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {video.platform}
                </div>
              </>
            ) : video.externalLink ? (
              <a href={video.externalLink} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative group">
                <img src={video.imageSrc || `https://picsum.photos/seed/vid${i}/600/400`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                   <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                     <Play size={24} className="text-white fill-white ml-1" />
                   </div>
                </div>
                <div className={`absolute top-3 left-3 ${video.platformColor} border-2 border-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {video.platform}
                </div>
              </a>
            ) : (
              <>
                <img src={video.imageSrc || `https://picsum.photos/seed/vid${i}/600/400`} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <div className={`absolute top-3 left-3 ${video.platformColor} border-2 border-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  {video.platform}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                    暂无播放源
                  </div>
                </div>
              </>
            )}
            <div className="absolute bottom-3 right-3 bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none">
              {video.duration}
            </div>
          </div>
          <div className="p-6 space-y-4">
            <h3 className="font-black text-lg leading-snug line-clamp-2 hover:text-brand-pink cursor-pointer transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center justify-between text-xs font-bold text-gray-500">
              <div className="flex items-center gap-3">
                {video.views && <span>{video.views} 观看</span>}
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
        { id: '001', title: '学习路径规划师', desc: '根据你的目标，定制专属的学习路线图。', status: 'Released', date: '2024.03.10', color: 'bg-brand-yellow', link: '/planner/index.html', buttonText: 'View Product' },
        { id: '002', title: '破工非遗——鄂州雕花剪纸', desc: '调研报告 PPT（发展态势与数字转型之路）', status: 'Report', date: '2026.03.13', color: 'bg-brand-pink', link: encodeURI('/（PPT）破工非遗——鄂州雕花剪纸的发展态势与数字转型之路调查报告.pptx'), buttonText: '下载 PPT', download: true },
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
            <a 
              href={product.link || '#'} 
              target="_blank"
              rel="noopener noreferrer"
              download={product.download || undefined}
              className="neo-button w-full flex items-center justify-center gap-2"
            >
              {product.buttonText || 'View Product'} <ExternalLink size={18} />
            </a>
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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const [isTKModalOpen, setIsTKModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const renderContent = () => {
    switch (activeTab) {
      case '首页': return <HomePage onNavigate={setActiveTab} />;
      case '关于我': return <AboutPage onNavigate={setActiveTab} onBookClick={() => setIsBookModalOpen(true)} onVideoClick={() => setIsVideoModalOpen(true)} onAIClick={() => setIsAIModalOpen(true)} onAdmissionClick={() => setIsAdmissionModalOpen(true)} onStockClick={() => setIsStockModalOpen(true)} onTravelClick={() => setIsTravelModalOpen(true)} onTKClick={() => setIsTKModalOpen(true)} onAIArticleClick={() => setSelectedArticle(articles.find(a => a.title === 'AI 编程初体验'))} onNewMediaClick={() => setSelectedArticle(articles.find(a => a.title === '一个新媒体运营的自我修养'))} onSocialPracticeClick={() => setSelectedArticle(articles.find(a => a.title === '专精与随性之间'))} />;
      case '文章': return <ArticlesPage onNavigate={setActiveTab} onArticleClick={(article) => setSelectedArticle(article)} />;
      case '视频': return <VideosPage />;
      case '产品': return <ProductsPage />;
      default: return <HomePage onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen text-black selection:bg-brand-pink selection:text-white relative bg-[#FFF0F5]">
      <SakuraBackground />
      <div className="relative z-10">
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onContactClick={() => setIsContactOpen(true)}
        />
        
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        <BookModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
        <AIModal isOpen={isAIModalOpen} onClose={() => setIsAIModalOpen(false)} />
        <AdmissionModal isOpen={isAdmissionModalOpen} onClose={() => setIsAdmissionModalOpen(false)} />
        <StockModal isOpen={isStockModalOpen} onClose={() => setIsStockModalOpen(false)} />
        <TravelModal isOpen={isTravelModalOpen} onClose={() => setIsTravelModalOpen(false)} />
        <TKModal isOpen={isTKModalOpen} onClose={() => setIsTKModalOpen(false)} />
        <ArticleModal isOpen={!!selectedArticle} onClose={() => setSelectedArticle(null)} article={selectedArticle} />
        
        <main className="relative">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

        <TearableFooter />
      </div>
    </div>
  );
}
