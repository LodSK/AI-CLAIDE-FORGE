import { Activity, ArrowRight, Flag } from "lucide-react";
import { useMission } from "../context/MissionContext";

export default function ProjectProgressWidget() {
  const { missionActive, currentStage, health } = useMission();
  
  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-5 flex flex-col justify-between h-full relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82f6]/5 rounded-full blur-2xl" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#3b82f6]/10 rounded-lg text-[#3b82f6] border border-[#3b82f6]/20">
            <Activity className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-white text-sm">Project Progress</h3>
        </div>
        <div className="text-right">
          <span className="text-3xl font-extrabold text-white tracking-tight">{Math.round(health.overallProgress)}<span className="text-xl text-[#64748b]">%</span></span>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        {/* Progress Bar */}
        <div>
          <div className="h-2 w-full bg-[#0b0f19] rounded-full overflow-hidden border border-[#1e293b]">
            <div 
              className="h-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] rounded-full relative transition-all duration-500"
              style={{ width: `${health.overallProgress}%` }}
            >
              {missionActive && <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 animate-pulse rounded-full" />}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-[#0b0f19]/50 border border-[#1e293b] p-3 rounded-xl flex flex-col justify-center">
            <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider mb-1">Current Stage</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${missionActive ? 'bg-amber-400 animate-pulse' : 'bg-[#64748b]'}`} />
              <span className="text-xs font-semibold text-white capitalize">{currentStage}</span>
            </div>
          </div>
          
          <div className="bg-[#0b0f19]/50 border border-[#1e293b] p-3 rounded-xl flex flex-col justify-center">
            <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider mb-1">Remaining Tasks</span>
            <div className="flex items-center gap-1.5">
              <Flag className="w-3 h-3 text-[#3b82f6]" />
              <span className="text-xs font-semibold text-white">{missionActive ? health.remainingTasks : '0'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
