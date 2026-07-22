import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useMission } from "../context/MissionContext";

export default function AiTaskQueue() {
  const { timelineEvents, missionActive, health } = useMission();

  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <Loader2 className={`w-4 h-4 text-[#3b82f6] ${missionActive ? 'animate-spin' : ''}`} />
          AI Engineering Queue
        </h3>
        <span className="text-[10px] bg-[#3b82f6]/20 text-[#3b82f6] font-bold px-2 py-0.5 rounded-full border border-[#3b82f6]/30">
          {missionActive ? 'Mission Active' : 'Idle'}
        </span>
      </div>
      
      <div className="p-2 space-y-1 overflow-y-auto flex-1">
        {timelineEvents.map((task, idx) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={task.id} 
            className={`p-3 rounded-xl border flex items-center justify-between group transition-colors ${
              task.status === "completed" ? "bg-[#0b0f19]/30 border-transparent hover:bg-[#1e293b]/40" :
              task.status === "active" ? "bg-[#3b82f6]/5 border-[#3b82f6]/20 relative overflow-hidden" :
              "bg-transparent border-transparent hover:bg-[#1e293b]/40"
            }`}
          >
            {task.status === "active" && (
              <div 
                className="absolute left-0 top-0 bottom-0 bg-[#3b82f6]/10 z-0 transition-all duration-1000 ease-in-out" 
                style={{ width: `${health.overallProgress}%` }} 
              />
            )}
            
            <div className="flex items-center gap-3 relative z-10">
              {task.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
              {task.status === "active" && <Loader2 className="w-4 h-4 text-[#3b82f6] animate-spin" />}
              {task.status === "queued" && <Circle className="w-4 h-4 text-[#475569]" />}
              
              <div>
                <p className={`text-sm font-medium ${
                  task.status === "completed" ? "text-[#94a3b8] line-through decoration-[#475569]" :
                  task.status === "active" ? "text-white" : "text-[#94a3b8]"
                }`}>
                  {task.title}
                </p>
                {task.status === "active" && (
                  <p className="text-[10px] text-[#3b82f6] mt-0.5 font-medium">
                    In Progress • {health.estimatedCompletion} remaining
                  </p>
                )}
              </div>
            </div>

            {task.time && task.status === "completed" && (
              <span className="text-[10px] text-[#475569] font-medium relative z-10">
                {task.time}
              </span>
            )}
          </motion.div>
        ))}
        {timelineEvents.length === 0 && (
          <div className="text-[#64748b] text-sm text-center py-10">
            Awaiting mission launch...
          </div>
        )}
      </div>
    </div>
  );
}
