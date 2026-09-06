import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好呀！我是杨桃荔枝煎的 AI 分身，想聊点什么？✨', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simple keyword matching for demo purposes
    // In a real app, this would be an API call to an LLM
    setTimeout(() => {
      const lowerInput = userMsg.text.toLowerCase();
      let response = "这个想法很有趣！我觉得可以尝试一下~ 🤔";

      if (lowerInput.includes('学校') || lowerInput.includes('大学')) {
        response = "我是武汉纺织大学的大三学生哦！主修广告学 🎓";
      } else if (lowerInput.includes('专业') || lowerInput.includes('课程')) {
        response = "我的专业是广告学，还学过市场营销、传媒导论这些硬核课程呢！📚";
      } else if (lowerInput.includes('技能') || lowerInput.includes('会什么')) {
        response = "我会的可多啦！摄影、剪辑不在话下，做饭、书法也能露两手。最近还在钻研 AI 编程呢！💪";
      } else if (lowerInput.includes('股票') || lowerInput.includes('a股') || lowerInput.includes('理财')) {
        response = "哎，别提了...去年8月冲进 A 股，现在已经是资深韭菜了 🌱 哭唧唧...";
      } else if (lowerInput.includes('经历') || lowerInput.includes('工作') || lowerInput.includes('兼职')) {
        response = "我做过新通教育校园大使、英知留学的新媒体运营，还当过 Livehouse 摄影师和信息流广告剪辑师！阅历丰富吧？😎";
      } else if (lowerInput.includes('目标') || lowerInput.includes('未来') || lowerInput.includes('想做')) {
        response = "下一步打算尝试策划和销售岗位，终极目标是成为一名 AI 产品经理！🚀";
      } else if (lowerInput.includes('爱好') || lowerInput.includes('喜欢')) {
        response = "我超级爱吃！梦想是尝遍天下美味 🍲 还有打游戏、听周杰伦的歌也是我的最爱~ 🎵";
      } else if (lowerInput.includes('奖') || lowerInput.includes('荣誉')) {
        response = "嘿嘿，我拿过科创杯的银奖和铜奖哦！🏆";
      } else if (lowerInput.includes('实践') || lowerInput.includes('采访')) {
        response = "参加过好多次暑期社会实践，还被主流媒体采访报道过呢！当时可紧张了 🎤";
      } else if (lowerInput.includes('ai') || lowerInput.includes('编程')) {
        response = "正在努力自学 AI 编程中！希望能用技术改变世界（至少先改变我的发量）💻";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false
      };
      
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Chat Window */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-2xl h-[600px] rounded-[2rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-blue h-20 border-b-4 border-black flex items-center justify-between px-6 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 grid-paper opacity-20"></div>
              <div className="flex items-center gap-4 z-10">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-full overflow-hidden">
                  <img src="/avatar.png" alt="AI Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white" style={{ textShadow: '2px 2px 0px #000' }}>
                    AI 杨桃荔枝煎
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse border border-black"></span>
                    <span className="text-xs font-bold text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white border-2 border-black rounded-full hover:bg-red-100 transition-colors z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-gray-50 space-y-6"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-medium ${
                      msg.isUser 
                        ? 'bg-brand-yellow rounded-tr-none' 
                        : 'bg-white rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t-4 border-black space-y-3">
              {/* Suggestion Chips */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {[
                  "🏫 你是哪个学校的？",
                  "🎨 你会什么技能？",
                  "📈 听说你炒股？",
                  "💼 有工作经历吗？",
                  "🎮 平时喜欢干嘛？",
                  "🚀 未来想做什么？"
                ].map((text, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(text);
                      // Optional: Auto-send on click
                      // handleSend({ preventDefault: () => {} } as any);
                    }}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-100 border-2 border-black rounded-lg text-xs font-bold hover:bg-brand-yellow hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
                  >
                    {text}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex gap-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="说点什么..."
                  className="flex-1 px-6 py-3 bg-gray-100 border-2 border-black rounded-xl focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="px-6 bg-brand-pink border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send size={24} className="text-black" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
