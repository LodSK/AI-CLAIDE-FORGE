import { Database, LayoutTemplate, Server, Shield, Cloud, Code, GitBranch } from "lucide-react";
import { motion } from "motion/react";
import { useMission } from "../context/MissionContext";

const DEFAULT_DECISIONS = [
  { category: "Frontend Framework", value: "React 19 + Vite", icon: LayoutTemplate, color: "text-blue-400" },
  { category: "Backend Architecture", value: "Node.js (Express)", icon: Server, color: "text-green-400" },
  { category: "Database Engine", value: "PostgreSQL (Supabase)", icon: Database, color: "text-emerald-400" },
  { category: "State & ORM", value: "Drizzle ORM", icon: GitBranch, color: "text-amber-400" },
  { category: "Authentication", value: "JWT Custom Auth", icon: Shield, color: "text-purple-400" },
  { category: "Deployment Target", value: "Google Cloud Run", icon: Cloud, color: "text-cyan-400" },
  { category: "Primary Language", value: "TypeScript", icon: Code, color: "text-blue-500" },
];

export default function ProjectMemory() {
  const { missionActive, decisions } = useMission();

  const displayDecisions = missionActive && decisions.length > 0
    ? decisions.map(d => ({
        category: d.title,
        value: d.reason,
        icon: d.icon || Database,
        color: "text-emerald-400"
      }))
    : DEFAULT_DECISIONS;

  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Database className="w-4 h-4 text-[#a855f7]" />
          Project Memory
        </h3>
        <span className="text-[10px] bg-[#a855f7]/20 text-[#a855f7] font-bold px-2 py-0.5 rounded-full border border-[#a855f7]/30">
          Persistent Context
        </span>
      </div>
      
      <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {displayDecisions.length === 0 && (
           <p className="text-xs text-slate-400 italic">No decisions recorded yet.</p>
        )}
        {displayDecisions.map((decision, idx) => {
          const Icon = decision.icon;
          return (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={idx} 
              className="bg-[#0b0f19]/50 border border-[#1e293b] p-3 rounded-xl flex items-start gap-3 hover:border-[#334155] hover:bg-[#1e293b]/30 transition-all cursor-default group"
            >
              <div className={`p-2 rounded-lg bg-[#141b2d] border border-[#1e293b] group-hover:bg-[#1e293b] transition-colors ${decision.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider mb-0.5">
                  {decision.category}
                </p>
                <p className="text-sm font-semibold text-white leading-tight">
                  {decision.value}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
