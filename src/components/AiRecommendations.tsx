import { Lightbulb, ArrowRight, ShieldAlert, Zap, Box, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const RECOMMENDATIONS = [
  {
    id: 1,
    type: "security",
    title: "Missing Rate Limiting",
    description: "API routes lack rate limiters. Recommend implementing express-rate-limit to prevent abuse.",
    icon: ShieldAlert,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
  },
  {
    id: 2,
    type: "optimization",
    title: "Bundle Optimization",
    description: "Consider dynamically importing heavy components (like Monaco Editor) to reduce initial load time.",
    icon: Zap,
    color: "text-[#3b82f6]",
    bgColor: "bg-[#3b82f6]/10",
    borderColor: "border-[#3b82f6]/20",
  },
  {
    id: 3,
    type: "architecture",
    title: "Testing Coverage",
    description: "No automated tests detected for critical authentication controllers. Recommend generating Jest specs.",
    icon: Box,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
  },
];

export default function AiRecommendations() {
  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-400" />
          AI Recommendations
        </h3>
        <span className="text-[10px] bg-amber-400/10 text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-400/20">
          3 Suggestions
        </span>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 space-y-3">
        {RECOMMENDATIONS.map((rec, idx) => {
          const Icon = rec.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={rec.id} 
              className="bg-[#0b0f19]/50 border border-[#1e293b] p-4 rounded-xl hover:border-[#334155] transition-all group"
            >
              <div className="flex gap-3">
                <div className={`p-2 rounded-lg shrink-0 h-min ${rec.bgColor} ${rec.borderColor} border`}>
                  <Icon className={`w-4 h-4 ${rec.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-3">
                    {rec.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button className="text-[10px] font-bold uppercase tracking-wider text-white bg-[#1e293b] hover:bg-[#334155] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5">
                      Implement <ArrowRight className="w-3 h-3" />
                    </button>
                    <button className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] hover:text-white px-3 py-1.5 rounded-md transition-colors">
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        <div className="pt-2 text-center">
          <p className="text-[10px] text-[#475569] flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3 h-3" /> All other systems optimal
          </p>
        </div>
      </div>
    </div>
  );
}
