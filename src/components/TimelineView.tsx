import { useState } from "react";
import { CheckCircle2, Circle, Clock, Loader2, PlayCircle, User, FileDigit, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { useMission } from "../context/MissionContext";

export default function TimelineView() {
  const { timelineEvents, missionActive, progress } = useMission();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedEvent = timelineEvents.find(e => e.id === selectedEventId) || timelineEvents[0];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Sidebar Timeline */}
      <div className="w-full lg:w-1/3 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#3b82f6]" />
            Mission Timeline
          </h2>
          <p className="text-sm text-[#94a3b8]">Track engineering progress across the mission lifecycle.</p>
        </div>

        <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6">
          {timelineEvents.length === 0 ? (
            <div className="text-[#64748b] text-sm text-center py-10">
              No events recorded yet. Launch a mission to populate the timeline.
            </div>
          ) : (
            <div className="relative border-l-2 border-[#1e293b] ml-4 space-y-8">
              {timelineEvents.map((evt) => {
                const isSelected = selectedEvent?.id === evt.id;
                
                return (
                  <div 
                    key={evt.id}
                    className="relative cursor-pointer group pl-6"
                    onClick={() => setSelectedEventId(evt.id)}
                  >
                    {/* Status Indicator */}
                    <div className={`absolute -left-[11px] top-1 rounded-full bg-[#0b0f19] p-0.5 border ${
                      evt.status === "completed" ? "border-emerald-500" :
                      evt.status === "in_progress" ? "border-[#3b82f6]" : "border-[#475569]"
                    }`}>
                      {evt.status === "completed" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      {evt.status === "in_progress" && <PlayCircle className="w-4 h-4 text-[#3b82f6]" />}
                      {evt.status === "pending" && <Circle className="w-4 h-4 text-[#475569]" />}
                    </div>

                    <div className={`transition-all ${isSelected ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}>
                      <h3 className={`font-bold text-sm ${
                        evt.status === "completed" ? "text-emerald-400" :
                        evt.status === "in_progress" ? "text-[#3b82f6]" : "text-white"
                      }`}>
                        {evt.stage}
                      </h3>
                      <p className="text-xs text-white font-medium mt-1">
                        {evt.title}
                      </p>
                      <p className="text-[10px] text-[#94a3b8] mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {evt.timestamp}
                      </p>
                    </div>
                  </div>
                );
              })}
              
              {missionActive && progress < 100 && (
                <div className="relative pl-6">
                  <div className="absolute -left-[11px] top-1 rounded-full bg-[#0b0f19] p-0.5 border border-[#3b82f6]">
                    <Loader2 className="w-4 h-4 text-[#3b82f6] animate-spin" />
                  </div>
                  <div className="opacity-100">
                    <h3 className="font-bold text-sm text-[#3b82f6]">
                      Execution in Progress...
                    </h3>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Panel */}
      <div className="w-full lg:w-2/3">
        {selectedEvent ? (
          <motion.div 
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-8 sticky top-24"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#94a3b8] font-bold text-xs uppercase tracking-wider mb-2 block">{selectedEvent.stage} Phase</span>
                <h2 className="text-2xl font-extrabold text-white">{selectedEvent.title}</h2>
                <div className="flex items-center gap-2 mt-3 text-sm">
                  {selectedEvent.status === "completed" && (
                    <span className="text-emerald-500 font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  )}
                  <span className="text-[#94a3b8] font-medium flex items-center gap-1.5 bg-[#1e293b] px-2.5 py-1 rounded-lg border border-[#334155]/50">
                    <User className="w-4 h-4" /> Agent {selectedEvent.agent}
                  </span>
                  <span className="text-[#94a3b8] font-medium flex items-center gap-1.5 bg-[#1e293b] px-2.5 py-1 rounded-lg border border-[#334155]/50">
                    <Clock className="w-4 h-4" /> {selectedEvent.timestamp}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-[#94a3b8] text-sm font-bold uppercase tracking-wider mb-3 border-b border-[#1e293b] pb-2">
                Task Details
              </h3>
              <p className="text-sm text-[#e2e8f0] leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#1e293b]">
              <h3 className="text-[#94a3b8] text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileDigit className="w-4 h-4 text-emerald-400" /> Generated Artifacts
              </h3>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4 text-sm text-[#cbd5e1]">
                Artifact generated and stored in Project Memory.
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-8 flex items-center justify-center h-full text-[#64748b]">
            Select an event to view details
          </div>
        )}
      </div>
    </div>
  );
}
