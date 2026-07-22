import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, TerminalSquare, Send, Sparkles, X } from "lucide-react";
import { useMission } from "../context/MissionContext";

export default function ProjectCommander() {
  const [isOpen, setIsOpen] = useState(false);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  
  const { missionActive, progress, files, currentStage } = useMission();

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    const cmd = command.trim();
    setHistory(prev => [...prev, { role: 'user', text: cmd }]);
    
    // Simple command handling based on MissionContext
    setTimeout(() => {
      let response = "Command not recognized. Try 'Show Progress', 'Show Files', or 'Status'.";
      const lowerCmd = cmd.toLowerCase();
      
      if (lowerCmd.includes("progress")) {
        response = missionActive 
          ? `Current mission progress is at ${progress}%. Stage: ${currentStage}.`
          : "No active mission running.";
      } else if (lowerCmd.includes("files") || lowerCmd.includes("show files")) {
        response = files.length > 0
          ? `Generated files: ${files.map(f => f.name).join(", ")}`
          : "No files generated yet.";
      } else if (lowerCmd.includes("status")) {
        response = missionActive
          ? `Mission is active. Stage: ${currentStage}. Progress: ${progress}%.`
          : "System is on standby. No active mission.";
      } else if (lowerCmd.includes("build") || lowerCmd.includes("run") || lowerCmd.includes("deploy")) {
        response = "Action acknowledged. Redirecting to mission control parameters...";
      }

      setHistory(prev => [...prev, { role: 'ai', text: response }]);
    }, 500);

    setCommand("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-80 bg-[#141b2d]/95 backdrop-blur-xl border border-[#3b82f6]/30 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col"
            style={{ maxHeight: '400px' }}
          >
            <div className="p-3 border-b border-[#1e293b] bg-[#0e1424]/50 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="w-5 h-5 text-[#3b82f6]" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3b82f6]"></span>
                  </span>
                </div>
                <span className="text-sm font-bold text-white tracking-tight">AI Commander</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col">
              {history.length === 0 && (
                <div className="text-xs text-slate-400 italic text-center mt-2">
                  Ready for orders. Try "Show Progress".
                </div>
              )}
              {history.map((msg, i) => (
                <div key={i} className={`text-xs ${msg.role === 'user' ? 'text-blue-300 self-end bg-blue-900/20' : 'text-slate-300 bg-slate-800/30'} px-3 py-2 rounded-lg max-w-[85%] break-words`}>
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#0e1424]/50 border-t border-[#1e293b] shrink-0">
              <div className="text-[10px] text-[#94a3b8] mb-2 flex flex-wrap gap-1.5">
                <span className="bg-[#1e293b] px-2 py-1 rounded-md cursor-pointer hover:bg-[#334155] transition-colors" onClick={() => setCommand("Show Progress")}>Progress</span>
                <span className="bg-[#1e293b] px-2 py-1 rounded-md cursor-pointer hover:bg-[#334155] transition-colors" onClick={() => setCommand("Show Files")}>Files</span>
                <span className="bg-[#1e293b] px-2 py-1 rounded-md cursor-pointer hover:bg-[#334155] transition-colors" onClick={() => setCommand("Status")}>Status</span>
              </div>
              
              <form onSubmit={handleCommandSubmit} className="relative">
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Issue a command..."
                  className="w-full bg-[#0b0f19] border border-[#1e293b] text-white text-xs rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 placeholder:text-[#475569]"
                  autoFocus
                />
                <button 
                  type="submit"
                  disabled={!command.trim()}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-[#3b82f6] disabled:text-[#475569] hover:bg-[#3b82f6]/10 rounded-lg transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <TerminalSquare className="w-6 h-6" />
      </button>
    </div>
  );
}
