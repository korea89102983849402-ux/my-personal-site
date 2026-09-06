import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  BookOpen, 
  Target, 
  Clock, 
  ChevronRight, 
  ExternalLink, 
  CheckCircle2, 
  Circle,
  Sparkles,
  Layout,
  History,
  Plus,
  Loader2,
  ArrowRight,
  Key,
  Zap,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { generateLearningPath } from "./services/geminiService";
import { LearningPath, SkillNode } from "./types";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const LOADING_MESSAGES = [
  "正在为您查阅全球优质教育资源...",
  "AI 专家正在为您构建最优学习路径...",
  "正在分析学科难点，制定针对性步骤...",
  "正在为您筛选 Bilibili 与 YouTube 的高分教程...",
  "复杂学科需要更精细的规划，请稍候片刻...",
  "正在为您匹配最适合您的学习节奏...",
  "即将为您呈现专业级的技能图谱...",
];

function SkillCard({ skill, index }: { skill: SkillNode; index: number; key?: React.Key }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
            {index + 1}
          </div>
          <div>
            <h4 className="font-bold text-slate-900">{skill.title}</h4>
            <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
              <Clock size={12} /> {skill.estimatedTime}
            </p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight size={20} className="text-slate-400" />
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 space-y-6">
              <p className="text-slate-600 text-sm leading-relaxed">
                {skill.description}
              </p>

              {/* Learning Steps */}
              {skill.learningSteps && skill.learningSteps.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">专业学习步骤</h5>
                  <div className="space-y-2">
                    {skill.learningSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex gap-3 p-3 rounded-xl bg-brand-50/50 border border-brand-100/50">
                        <div className="w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {sIdx + 1}
                        </div>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">推荐资源</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skill.resources && skill.resources.length > 0 ? (
                    skill.resources.map((resource, rIdx) => {
                    const isBili = resource.platform.toLowerCase().includes('bilibili');
                    const isYT = resource.platform.toLowerCase().includes('youtube');
                    const isCoursera = resource.platform.toLowerCase().includes('coursera');
                    
                    let platformColor = "bg-slate-50 text-slate-500";
                    if (isBili) platformColor = "bg-pink-50 text-pink-500";
                    else if (isYT) platformColor = "bg-red-50 text-red-500";
                    else if (isCoursera) platformColor = "bg-blue-50 text-blue-500";

                    return (
                      <a 
                        key={rIdx}
                        href={resource.url.startsWith('http') ? resource.url : `https://www.google.com/search?q=${encodeURIComponent(resource.platform + ' ' + resource.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
                      >
                        <div className={`p-2 rounded-lg shrink-0 ${platformColor}`}>
                          <ExternalLink size={16} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-brand-700">{resource.title}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">{resource.platform}</p>
                        </div>
                      </a>
                    );
                  })
                  ) : (
                    <div className="text-sm text-slate-400 italic">暂无推荐资源</div>
                  )}
                </div>
              </div>

              {/* Sub Skills */}
              {skill.subSkills && skill.subSkills.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">核心知识点</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {skill.subSkills.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <Circle size={12} className="text-brand-500" />
                        <span className="text-xs text-slate-700 font-medium">{sub.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState("3 months");
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState<LearningPath | null>(null);
  const [history, setHistory] = useState<LearningPath[]>([]);
  const [activeTab, setActiveTab] = useState<"generate" | "history">("generate");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [loadingTime, setLoadingTime] = useState(0);
  const [isQuotaExceeded, setIsQuotaExceeded] = useState(false);
  const [dailyRemaining, setDailyRemaining] = useState(3);
  const MAX_DAILY_QUOTA = 3;

  // Load quota from localStorage
  useEffect(() => {
    const savedQuota = localStorage.getItem("daily_quota_remaining");
    const lastReset = localStorage.getItem("daily_quota_last_reset");
    const now = new Date().toDateString();

    if (lastReset !== now) {
      // New day, reset quota
      setDailyRemaining(MAX_DAILY_QUOTA);
      localStorage.setItem("daily_quota_remaining", MAX_DAILY_QUOTA.toString());
      localStorage.setItem("daily_quota_last_reset", now);
    } else if (savedQuota !== null) {
      setDailyRemaining(parseInt(savedQuota));
    }
  }, []);

  const updateQuota = (newVal: number) => {
    setDailyRemaining(newVal);
    localStorage.setItem("daily_quota_remaining", newVal.toString());
  };

  const checkApiKey = async () => {
    if (window.aistudio?.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      // Even if false, we don't force it, but we'll use it to show a hint if 429 occurs
    }
  };

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // After selecting, we assume success and clear quota error
      setIsQuotaExceeded(false);
      setError(null);
    }
  };

  useEffect(() => {
    let interval: any;
    let timer: any;
    if (loading) {
      setLoadingTime(0);
      let i = 0;
      interval = setInterval(() => {
        i = (i + 1) % LOADING_MESSAGES.length;
        setLoadingMessage(LOADING_MESSAGES[i]);
      }, 4000);

      timer = setInterval(() => {
        setLoadingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [loading]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("learning_paths_history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const saveHistory = (newPath: LearningPath) => {
    const updatedHistory = [newPath, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("learning_paths_history", JSON.stringify(updatedHistory));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    if (dailyRemaining <= 0) {
      setError("今日免费额度已用完。作为演示，您可以点击右上角钥匙图标使用自己的 API Key，或等待明天重置。");
      setIsQuotaExceeded(true);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const path = await generateLearningPath(goal, level, duration);
      // Add timestamp and ID
      const newPath = {
        ...path,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      setCurrentPath(newPath);
      
      // Decrement quota on success
      updateQuota(dailyRemaining - 1);

      // Save to LocalStorage
      saveHistory(newPath);
      
    } catch (err: any) {
      console.error("Generation failed", err);
      const errorMsg = (err.message || "").toLowerCase();
      if (
        errorMsg.includes("429") || 
        errorMsg.includes("resource_exhausted") || 
        errorMsg.includes("quota") ||
        errorMsg.includes("exceeded")
      ) {
        setIsQuotaExceeded(true);
        setError("当前公共 API 配额已耗尽。请点击右上角钥匙图标 🔑 选择您自己的 API Key 以继续使用。");
      } else if (errorMsg.includes("not found") || errorMsg.includes("cloud") || errorMsg.includes("project")) {
        setIsQuotaExceeded(true);
        setError(
          "API 调用失败：您的 API Key 可能未关联有效的 Google Cloud 项目或未开启计费。请确保您选择的是一个已开启计费（Paid Project）的 API Key。更多信息请参考：https://ai.google.dev/gemini-api/docs/billing"
        );
      } else {
        setError(errorMsg || "生成失败，请稍后重试。可能是由于网络波动或 AI 响应超时。");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(path => 
    path.goal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <Sparkles size={18} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">学习路径规划师</h1>
          </div>
          <div className="flex items-center gap-4">
            <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab("generate")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'generate' ? 'bg-white shadow-sm text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-2">
                  <Plus size={16} />
                  <span>新建计划</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab("history")}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-brand-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <div className="flex items-center gap-2">
                  <History size={16} />
                  <span>我的路径</span>
                </div>
              </button>
            </nav>
            <button 
              onClick={handleSelectKey}
              className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all"
              title="设置 API Key"
            >
              <Key size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Quota Simulator Widget */}
      <div className="bg-slate-50 border-b border-slate-200 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>系统状态: 正常</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <Zap size={12} className="text-amber-500" />
              <span>当前计划: <span className="text-slate-900 font-bold">免费试用</span></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span>今日剩余额度:</span>
              <div className="flex gap-1">
                {[...Array(MAX_DAILY_QUOTA)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-1.5 rounded-full transition-all ${i < dailyRemaining ? 'bg-brand-500' : 'bg-slate-200'}`} 
                  />
                ))}
              </div>
              <span className="text-slate-900 font-bold ml-1">{dailyRemaining}/{MAX_DAILY_QUOTA}</span>
            </div>
            <button 
              onClick={() => updateQuota(MAX_DAILY_QUOTA)}
              className="text-brand-600 hover:underline text-[10px] uppercase tracking-wider font-bold"
            >
              模拟重置
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "generate" ? (
            <motion.div 
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Hero Section */}
              {!currentPath && (
                <div className="max-w-2xl mx-auto text-center space-y-4 py-12">
                  <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
                    开启你的<span className="text-brand-600">学习之旅</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    输入你的学习目标，AI 将为你拆解技能图谱并推荐最优质的免费资源。
                  </p>
                </div>
              )}

              {/* Input Form */}
              <div className={`max-w-3xl mx-auto transition-all duration-500 ${currentPath ? 'mb-12' : 'py-8'}`}>
                <form onSubmit={handleGenerate} className="glass-card p-6 rounded-2xl space-y-6">
                  {error && (
                    <div className={`p-4 rounded-xl text-sm flex flex-col gap-3 ${isQuotaExceeded ? 'bg-amber-50 border border-amber-100 text-amber-700' : 'bg-red-50 border border-red-100 text-red-600'}`}>
                      <div className="flex items-center gap-2">
                        <AlertCircle size={16} className={isQuotaExceeded ? 'text-amber-500' : 'text-red-500'} />
                        <span className="font-medium">{error}</span>
                      </div>
                      {isQuotaExceeded && (
                        <button 
                          type="button"
                          onClick={handleSelectKey}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition-colors w-fit"
                        >
                          <Key size={14} />
                          选择我的 API Key
                        </button>
                      )}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Target size={16} className="text-brand-600" />
                      你想学习什么？
                    </label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="例如：三个月入门机器学习、精通 React 开发..."
                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-lg"
                      />
                      <button 
                        type="submit"
                        disabled={loading || !goal}
                        className={`absolute right-2 top-2 bottom-2 px-4 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 ${loading ? 'w-auto' : ''}`}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin" size={18} />
                            <span className="text-sm font-medium animate-pulse hidden sm:inline">{loadingMessage}</span>
                          </>
                        ) : (
                          <ArrowRight size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Layout size={16} className="text-brand-600" />
                        当前水平
                      </label>
                      <select 
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                      >
                        <option value="beginner">零基础 / 入门</option>
                        <option value="intermediate">有一定基础</option>
                        <option value="advanced">进阶 / 资深</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Clock size={16} className="text-brand-600" />
                        预期时长
                      </label>
                      <input 
                        type="text" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="例如：3个月"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Loading State */}
              {loading && !currentPath && (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-brand-200 rounded-full blur-2xl opacity-20 animate-pulse" />
                    <Loader2 className="w-16 h-16 text-brand-600 animate-spin relative z-10" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">正在构建您的学习路径</h3>
                  <p className="text-slate-500 mb-8 animate-pulse">{loadingMessage}</p>
                  
                  <div className="w-full max-w-md px-8">
                    <div className="flex justify-between text-xs text-slate-400 mb-2">
                      <span>正在检索实时教育资源...</span>
                      <span>已耗时: {loadingTime}s</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                      <motion.div 
                        className="h-full bg-brand-500"
                        initial={{ width: "0%" }}
                        animate={{ 
                          width: loadingTime < 10 ? "30%" : loadingTime < 25 ? "70%" : "95%" 
                        }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                    <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        提示：为了确保资源（B站/YouTube等）的真实有效，AI 正在进行实时联网搜索。此过程通常需要 <span className="font-bold">20-40 秒</span>，请耐心等待。
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Result Display */}
              {currentPath && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{currentPath.goal}</h3>
                      <p className="text-slate-500 flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1"><Layout size={14}/> {currentPath.level}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {currentPath.duration}</span>
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
                      <Sparkles size={16} />
                      同步到 Notion
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Skill Map */}
                    <div className="lg:col-span-8 space-y-6">
                      {currentPath.skills.map((skill, idx) => (
                        <SkillCard key={skill.id} skill={skill} index={idx} />
                      ))}
                    </div>

                    {/* Sidebar / Stats */}
                    <div className="lg:col-span-4 space-y-6">
                      <div className="glass-card p-6 rounded-2xl sticky top-24">
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <BookOpen size={18} className="text-brand-600" />
                          学习建议
                        </h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                          <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">1</div>
                            <p>建议每天投入 2 小时专注学习，保持节奏。</p>
                          </li>
                          <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">2</div>
                            <p>完成每个模块后，尝试做一个微型项目来巩固知识。</p>
                          </li>
                          <li className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0 mt-0.5">3</div>
                            <p>利用好推荐的 Bilibili 和 YouTube 资源，多看评论区的笔记。</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search Bar for History */}
              <div className="max-w-md mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索已生成的路径..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHistory.length === 0 ? (
                  <div className="col-span-full py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                      {searchQuery ? <Search size={32} /> : <History size={32} />}
                    </div>
                    <p className="text-slate-500">
                      {searchQuery ? `未找到与 "${searchQuery}" 相关的路径` : "还没有生成过学习路径，快去创建一个吧！"}
                    </p>
                    {!searchQuery && (
                      <button 
                        onClick={() => setActiveTab("generate")}
                        className="px-6 py-2 bg-brand-600 text-white rounded-xl font-medium"
                      >
                        立即创建
                      </button>
                    )}
                  </div>
                ) : (
                  filteredHistory.map((path) => (
                    <div 
                      key={path.id} 
                      onClick={() => {
                        setCurrentPath(path);
                        setActiveTab("generate");
                      }}
                      className="glass-card p-6 rounded-2xl hover:border-brand-300 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-brand-50 text-brand-600 rounded-xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
                          <BookOpen size={20} />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                          {new Date(path.createdAt!).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 line-clamp-1">{path.goal}</h4>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Layout size={12}/> {path.level}</span>
                        <span className="flex items-center gap-1"><Clock size={12}/> {path.duration}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2024 学习路径规划师 - 让学习不再迷茫</p>
        </div>
      </footer>
    </div>
  );
}


