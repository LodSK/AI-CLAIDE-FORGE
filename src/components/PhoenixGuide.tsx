import { Bot, ArrowRight, Activity, Map, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface PhoenixGuideProps {
  onContinue: () => void;
  onReview: () => void;
  onAsk: () => void;
  onRoadmap: () => void;
  userName?: string;
  projectName?: string;
}

export default function PhoenixGuide({ onContinue, onReview, onAsk, onRoadmap, userName = "Builder", projectName = "AI Forge Platform" }: PhoenixGuideProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#141b2d] to-[#0e1424] border border-[#1e293b] rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row gap-8 items-center shadow-2xl relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b82f6]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

      {/* Avatar & Greeting */}
      <div className="flex items-center gap-6 z-10 w-full md:w-auto">
        <div className="relative shrink-0">
          <div className="w-20 h-20 bg-[#0b0f19] border border-[#3b82f6]/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.15)] relative overflow-hidden">
            <Bot className="w-10 h-10 text-[#3b82f6]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#3b82f6]/20 to-transparent" />
          </div>
          <span className="absolute -bottom-2 -right-2 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-[#141b2d]"></span>
          </span>
        </div>
        
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
            Welcome back, {userName}.
          </h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed">
            You were building <span className="text-[#e2e8f0] font-semibold">{projectName}</span>.<br />
            Development is currently <strong className="text-[#3b82f6]">68%</strong> complete.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-semibold text-amber-400/80 uppercase tracking-wider">Est. 25 mins remaining</span>
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-[#1e293b] to-transparent z-10" />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto flex-1 z-10">
        <button 
          onClick={onContinue}
          className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#3b82f6]/20 group"
        >
          Continue Building
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={onReview}
          className="bg-[#1e293b]/50 hover:bg-[#1e293b] text-[#e2e8f0] border border-[#334155] px-5 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Activity className="w-4 h-4 text-emerald-400" />
          Review Progress
        </button>
        
        <button 
          onClick={onRoadmap}
          className="bg-[#1e293b]/50 hover:bg-[#1e293b] text-[#e2e8f0] border border-[#334155] px-5 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Map className="w-4 h-4 text-purple-400" />
          View Roadmap
        </button>
        
        <button 
          onClick={onAsk}
          className="bg-[#1e293b]/50 hover:bg-[#1e293b] text-[#e2e8f0] border border-[#334155] px-5 py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-amber-400" />
          Ask Phoenix
        </button>
      </div>
    </motion.div>
  );
}
