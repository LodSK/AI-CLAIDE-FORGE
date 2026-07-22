import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  CheckCircle2,
  TerminalSquare,
  Network,
  Cpu,
  BrainCircuit,
  TestTube2,
  ShieldAlert,
  Server,
  Activity,
  Play,
  Pause,
  AlertTriangle,
  Lightbulb,
  FileCode2,
  Clock,
  BarChart,
  Bot
} from "lucide-react";
import Tooltip from "./Tooltip";
import { useMission, PIPELINE_STAGES } from "../context/MissionContext";

const AI_TEAM = [
  { role: "CTO", agent: "Ada", status: "Creating Blueprint", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-400/10" },
  { role: "Backend", agent: "Turing", status: "Building APIs", icon: Server, color: "text-blue-400", bg: "bg-blue-400/10" },
  { role: "Frontend", agent: "Grace", status: "Building UI", icon: FileCode2, color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { role: "QA", agent: "Hopper", status: "Running Tests", icon: TestTube2, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { role: "DevOps", agent: "Linus", status: "Preparing Deployment", icon: Network, color: "text-orange-400", bg: "bg-orange-400/10" },
];

export default function MissionControlView() {
  const {
    missionActive,
    currentStage,
    progress,
    approvalRequired,
    showSummary,
    thinkingFeed,
    decisions,
    health,
    startMission,
    pauseMission,
    resumeMission,
    approveMission,
    dismissSummary,
    replayMission
  } = useMission();

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <TerminalSquare className="w-8 h-8 text-[#3b82f6]" />
            Mission Control
          </h1>
          <p className="text-[#94a3b8] mt-2 max-w-2xl">
            Autonomous AI Engineering Command Center. Launch missions and watch Phoenix build.
          </p>
        </div>
        
        {!missionActive && progress === 0 && (
          <button 
            onClick={startMission}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#3b82f6]/20"
          >
            <Rocket className="w-5 h-5" />
            + New Mission
          </button>
        )}
        
        {missionActive && (
          <div className="flex gap-3">
             <button 
              onClick={pauseMission}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-500 border border-amber-500/50 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Pause className="w-4 h-4" /> Pause
            </button>
          </div>
        )}
      </div>

      {/* Live Mission Pipeline */}
      <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 overflow-x-auto hide-scrollbar">
        <h3 className="text-white font-bold mb-6 ml-2 flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#3b82f6]" /> Live Mission Pipeline
        </h3>
        <div className="flex items-center min-w-max px-2 pb-4">
          {PIPELINE_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === PIPELINE_STAGES.length - 1;
            
            const stageIndex = PIPELINE_STAGES.findIndex(s => s.id === currentStage);
            const isCompleted = idx < stageIndex || currentStage === "completed";
            const isActive = stage.id === currentStage;

            return (
              <div key={stage.id} className="flex items-center">
                <div className="flex flex-col items-center gap-3 relative">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' :
                    isActive ? 'bg-[#3b82f6]/20 border-[#3b82f6]/50 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-110' :
                    'bg-[#1e293b]/50 border-[#334155]'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isCompleted ? 'text-emerald-500' :
                      isActive ? 'text-[#3b82f6]' :
                      'text-[#64748b]'
                    }`} />
                    
                    {isActive && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#3b82f6]"></span>
                      </span>
                    )}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    isActive ? 'text-white' : 'text-[#64748b]'
                  }`}>
                    {stage.label}
                  </span>
                </div>
                
                {!isLast && (
                  <div className={`w-12 h-1 mx-2 rounded-full transition-colors duration-500 ${
                    isCompleted ? 'bg-emerald-500/50' : 'bg-[#1e293b]'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Orchestrator Panel */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Parallel Execution / Team */}
          <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6">
             <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" /> Autonomous Task Orchestrator
            </h3>
            
            <div className="space-y-4">
              {AI_TEAM.map((member, idx) => {
                const isWorking = health.activeAgent === member.agent;
                const status = missionActive 
                  ? (isWorking ? "Working..." : "Waiting") 
                  : member.status;
                  
                const agentProgress = isWorking 
                  ? health.overallProgress 
                  : (health.overallProgress > (idx + 1) * 20 ? 100 : 0);

                return (
                <div key={idx} className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${member.bg}`}>
                    <member.icon className={`w-6 h-6 ${member.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-2">
                      <div>
                        <div className="text-white font-bold text-sm flex items-center gap-2">
                          {member.role} 
                          <span className="text-[#64748b] font-medium text-xs">({member.agent})</span>
                        </div>
                        <div className={`text-xs ${isWorking ? 'text-emerald-400 animate-pulse' : 'text-[#94a3b8]'}`}>{status}</div>
                      </div>
                      <span className="text-[#3b82f6] text-xs font-bold">{Math.round(agentProgress)}%</span>
                    </div>
                    
                    <div className="h-1.5 w-full bg-[#1e293b] rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full rounded-full ${member.color.replace('text-', 'bg-')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${agentProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                </div>
              )})}
            </div>
          </div>

          {/* AI Approval System */}
          <AnimatePresence>
            {approvalRequired && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-amber-500/10 border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <AlertTriangle className="w-32 h-32 text-amber-500" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/20 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Human Approval Required</h3>
                  </div>
                  <p className="text-[#e2e8f0] mb-6 max-w-lg">
                    Phoenix has generated the database schema. Do you approve the PostgreSQL structure for the ecommerce module?
                  </p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={approveMission}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Approve & Continue
                    </button>
                    <button className="bg-[#1e293b] hover:bg-[#334155] text-white px-6 py-2.5 rounded-xl font-bold transition-colors">
                      Review Schema
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Mission Health Evaluator */}
          <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm">
              <BarChart className="w-4 h-4 text-[#3b82f6]" /> Mission Health
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-4">
                <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider block mb-1">Est. Completion</span>
                <span className="text-xl font-bold text-white">{missionActive ? health.estimatedCompletion : '--'}</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-4">
                <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider block mb-1">Risk Level</span>
                <span className={`text-xl font-bold ${health.riskLevel === 'Low' ? 'text-emerald-400' : health.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>{missionActive ? health.riskLevel : '--'}</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-4">
                <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider block mb-1">Files Generated</span>
                <span className="text-xl font-bold text-white">{health.filesGenerated}</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl p-4">
                <span className="text-[10px] text-[#64748b] uppercase font-bold tracking-wider block mb-1">Remaining Tasks</span>
                <span className="text-xl font-bold text-white">{missionActive ? health.remainingTasks : '0'}</span>
              </div>
            </div>
          </div>

          {/* Live Terminal */}
          <div className="bg-[#0b0f19] border border-[#1e293b] rounded-3xl p-6 h-[250px] flex flex-col relative overflow-hidden font-mono">
            <h3 className="text-[#94a3b8] font-bold mb-4 flex items-center gap-2 text-sm shrink-0">
              <TerminalSquare className="w-4 h-4" /> Live Execution Terminal
            </h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-1.5 text-xs">
              {missionActive ? (
                <>
                  <div className="text-[#3b82f6]">&gt; Starting Phoenix Execution Engine v2.0</div>
                  {thinkingFeed.slice().reverse().map((feed) => (
                    <div key={`term-${feed.id}`} className={feed.type === 'sys' ? 'text-[#3b82f6]' : feed.type === 'sec' ? 'text-amber-400' : 'text-emerald-400'}>
                      &gt; [{feed.agent.toUpperCase()}] {feed.action}
                    </div>
                  ))}
                  {approvalRequired && <div className="text-rose-400">&gt; PAUSED (Awaiting Human Approval)</div>}
                  <div className="animate-pulse text-[#e2e8f0] inline-block">_</div>
                </>
              ) : (
                <div className="text-[#64748b]">Engine idle. Waiting for mission...</div>
              )}
            </div>
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3b82f6]/5 to-transparent opacity-20 pointer-events-none animate-scanline"></div>
          </div>

          {/* AI Thinking Feed */}
          <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 h-[250px] flex flex-col">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm shrink-0">
              <TerminalSquare className="w-4 h-4 text-emerald-400" /> AI Thinking Feed
            </h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
              {thinkingFeed.map((feed) => (
                <div key={feed.id} className="flex gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-[#e2e8f0]">
                      <span className="font-bold text-white">{feed.agent}</span> {feed.action}
                    </p>
                    <span className="text-xs text-[#64748b]">{feed.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Decision Log */}
          <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 h-[250px] flex flex-col">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm shrink-0">
              <Lightbulb className="w-4 h-4 text-amber-400" /> Autonomous Decisions
            </h3>
            <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4">
              {decisions.map((decision) => (
                <div key={decision.id} className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <decision.icon className="w-3.5 h-3.5 text-[#3b82f6]" />
                    <span className="font-bold text-white text-xs">{decision.title}</span>
                  </div>
                  <p className="text-xs text-[#94a3b8] leading-relaxed pl-5">
                    {decision.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Mission Summary Modal */}
      <AnimatePresence>
        {showSummary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f19]/80 backdrop-blur-sm px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="bg-[#141b2d] border border-[#1e293b] rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
               
               <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">Mission Accomplished</h2>
                    <p className="text-[#94a3b8]">Ecommerce Website has been successfully deployed.</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#0b0f19] rounded-xl p-4 border border-[#1e293b]">
                    <span className="text-3xl font-bold text-white mb-1 block">5</span>
                    <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">Agents Used</span>
                  </div>
                  <div className="bg-[#0b0f19] rounded-xl p-4 border border-[#1e293b]">
                    <span className="text-3xl font-bold text-white mb-1 block">42</span>
                    <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">Files Gen</span>
                  </div>
                  <div className="bg-[#0b0f19] rounded-xl p-4 border border-[#1e293b]">
                    <span className="text-3xl font-bold text-white mb-1 block">108</span>
                    <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">Tests Run</span>
                  </div>
                  <div className="bg-[#0b0f19] rounded-xl p-4 border border-[#1e293b]">
                    <span className="text-3xl font-bold text-emerald-400 mb-1 block">48h</span>
                    <span className="text-[10px] text-[#64748b] font-bold uppercase tracking-wider">Time Saved</span>
                  </div>
               </div>

               <div className="flex justify-end gap-3 relative z-10">
                 <button 
                  onClick={dismissSummary}
                  className="bg-[#1e293b] hover:bg-[#334155] text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
                 >
                   Dismiss
                 </button>
                 <button 
                  onClick={replayMission}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20"
                 >
                   Replay Mission
                 </button>
                 <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-lg shadow-[#3b82f6]/20">
                   View Deployment
                 </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
