import { Terminal, ChevronRight, Activity, GitCommit, Settings, Server } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

const TABS = [
  { id: "build", label: "Build Logs", icon: Terminal },
  { id: "ai", label: "AI Logs", icon: Activity },
  { id: "deploy", label: "Deployment", icon: Server },
  { id: "git", label: "Git Activity", icon: GitCommit },
  { id: "system", label: "System", icon: Settings },
];

const LOG_DATA: Record<string, string[]> = {
  build: [
    "[10:22:01] 🚀 Starting production build...",
    "[10:22:02] 📦 Compiling React components...",
    "[10:22:05] ✨ Tailwind CSS injected.",
    "[10:22:08] ⚡ Vite build completed in 6.42s.",
    "[10:22:08] ✔ Build successful. Artifacts generated in /dist."
  ],
  ai: [
    "[AI_ENG] 🧠 Analyzing architecture blueprint...",
    "[AI_ENG] 🔍 Parsing context from Project Memory.",
    "[AI_ENG] ⚙️ Generating authentication controller logic.",
    "[AI_ENG] ✔ Code successfully injected into /server/controllers/AuthController.ts",
    "[AI_ENG] ⏳ Waiting for next instruction..."
  ],
  deploy: [
    "[DEPLOY] ☁️ Initializing Google Cloud Run deploy...",
    "[DEPLOY] 📦 Building Docker image...",
    "[DEPLOY] ⬆️ Pushing to Artifact Registry...",
    "[DEPLOY] 🔄 Rolling out new revision...",
    "[DEPLOY] ✔ Deploy successful. Live at https://ai-forge-prod.run.app"
  ],
  git: [
    "commit 8f3a9b2 (HEAD -> main)",
    "Author: AI Forge <bot@aiforge.dev>",
    "Date:   Tue Jul 21 10:20:00 2026 -0700",
    "",
    "    feat(auth): implement JWT authentication endpoints",
    "",
    "commit 3d2b1a0",
    "    chore: initial project scaffold"
  ],
  system: [
    "SYSTEM: Memory usage at 45%",
    "SYSTEM: WebSocket connection established.",
    "SYSTEM: Database pool initialized (max 10 connections).",
    "SYSTEM: All services reporting healthy status."
  ]
};

export default function DeveloperConsole() {
  const [activeTab, setActiveTab] = useState("build");

  return (
    <div className="bg-[#0b0f19] border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full font-mono text-xs shadow-2xl">
      {/* Console Header */}
      <div className="bg-[#141b2d] border-b border-[#1e293b] flex overflow-x-auto hide-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 whitespace-nowrap transition-colors border-b-2 ${
                isActive 
                  ? "border-[#3b82f6] text-white bg-[#1e293b]/50" 
                  : "border-transparent text-[#64748b] hover:text-[#94a3b8] hover:bg-[#1e293b]/30"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>
      
      {/* Console Output */}
      <div className="p-4 overflow-y-auto flex-1 text-[#a5b4fc] leading-relaxed">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {LOG_DATA[activeTab]?.map((log, i) => (
            <div key={i} className="flex gap-2">
              <span className="text-[#475569] select-none">{">"}</span>
              <span className={
                log.includes("✔") ? "text-emerald-400" :
                log.includes("err") || log.includes("fail") ? "text-red-400" :
                log.includes("[AI_ENG]") ? "text-purple-400" :
                "text-[#94a3b8]"
              }>
                {log}
              </span>
            </div>
          ))}
          {/* Blinking Cursor */}
          <div className="flex gap-2 mt-1">
            <span className="text-[#475569] select-none">{">"}</span>
            <span className="w-2 h-3.5 bg-[#3b82f6] animate-pulse inline-block align-middle" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
