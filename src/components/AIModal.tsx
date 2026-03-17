import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Circle, ArrowDown, Brain, Sparkles, Code2, Bot, Cpu } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose }) => {
  const learningPath = [
    {
      title: "提示词工程 (Prompt Engineering)",
      desc: "学会与 AI 对话，掌握结构化提示词技巧 (CO-STAR, RTF 等)，让 AI 精准输出。",
      status: "completed",
      icon: <Sparkles size={20} />,
      color: "bg-brand-yellow"
    },
    {
      title: "AI 辅助编码 (AI-Assisted Coding)",
      desc: "熟练使用 Cursor, GitHub Copilot 等工具，从零构建 Web 应用，理解基础代码逻辑。",
      status: "current",
      icon: <Code2 size={20} />,
      color: "bg-brand-pink"
    },
    {
      title: "AI Agent 开发 (Agentic Workflow)",
      desc: "学习 LangChain, AutoGen，构建能够自主规划、调用工具的智能体应用。",
      status: "pending",
      icon: <Bot size={20} />,
      color: "bg-brand-blue"
    },
    {
      title: "模型微调与部署 (Fine-tuning & Ops)",
      desc: "掌握本地大模型部署 (Ollama)，LoRA 微调，打造垂直领域的专属模型。",
      status: "pending",
      icon: <Cpu size={20} />,
      color: "bg-brand-green"
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
            className="relative w-full max-w-2xl bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Header */}
            <div className="bg-brand-green p-6 border-b-4 border-black flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 grid-paper opacity-20"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Brain size={28} className="text-black" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">AI 编程学习之路</h2>
                  <p className="font-bold text-xs opacity-80 uppercase tracking-wider">My Learning Roadmap</p>
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
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar bg-[#F0F0F0]">
              <div className="space-y-0">
                {learningPath.map((step, index) => (
                  <div key={index} className="relative pl-8 md:pl-12 pb-8 last:pb-0">
                    {/* Connecting Line */}
                    {index !== learningPath.length - 1 && (
                      <div className="absolute left-[15px] md:left-[23px] top-10 bottom-0 w-1 bg-black/20 dashed-line"></div>
                    )}

                    {/* Status Icon */}
                    <div className={`absolute left-0 top-0 w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-black flex items-center justify-center z-10 ${
                      step.status === 'completed' ? 'bg-green-400' :
                      step.status === 'current' ? 'bg-brand-yellow animate-pulse-slow' :
                      'bg-white'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} className="text-black" /> :
                       step.status === 'current' ? <ArrowDown size={20} className="text-black animate-bounce" /> :
                       <Circle size={16} className="text-gray-300" />}
                    </div>

                    {/* Card */}
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`neo-card p-5 relative ${step.status === 'current' ? 'ring-4 ring-brand-yellow/50' : 'opacity-80 grayscale-[0.3] hover:grayscale-0 hover:opacity-100'}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg border-2 border-black ${step.color} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                            {step.icon}
                          </div>
                          <h3 className="font-black text-lg md:text-xl">{step.title}</h3>
                        </div>
                        {step.status === 'current' && (
                          <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">
                            ING...
                          </div>
                        )}
                        {step.status === 'completed' && (
                          <div className="bg-green-100 text-green-800 border border-green-800 text-[10px] font-bold px-2 py-1 rounded">
                            DONE
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">
                        {step.desc}
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center">
                <p className="font-bold text-gray-600 text-sm">
                  "The best way to predict the future is to invent it."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
