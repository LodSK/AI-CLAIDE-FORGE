import { motion } from "motion/react";
import { ArrowRight, BrainCircuit, Code2, Cpu, GitCommit, Rocket, TestTube2, LayoutTemplate, Network, Server } from "lucide-react";
import AiTaskQueue from "./AiTaskQueue";
import ProjectMemory from "./ProjectMemory";
import AiRecommendations from "./AiRecommendations";
import DeveloperConsole from "./DeveloperConsole";
import PhoenixGuide from "./PhoenixGuide";
import ProjectProgressWidget from "./ProjectProgressWidget";
import Tooltip from "./Tooltip";
import { useMission } from "../context/MissionContext";

const SDLC_STAGES = [
  { id: "idea", label: "Idea", description: "Describe your project and goals.", icon: Rocket, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", status: "completed" },
  { id: "brain", label: "AI Planner", description: "Phoenix generates a blueprint for your application.", icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", tab: "forge_brain", status: "completed" },
  { id: "blueprint", label: "Architecture", description: "The blueprint of your application before development begins.", icon: LayoutTemplate, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", status: "completed" },
  { id: "workspace", label: "Build Studio", description: "Where your application is constructed.", icon: Cpu, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", tab: "workspace", status: "completed" },
  { id: "code", label: "Development", description: "AI Agents writing the code.", icon: Code2, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", tab: "forge_studio", status: "active" },
  { id: "test", label: "Testing", description: "Validating the application works correctly.", icon: TestTube2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", status: "queued" },
  { id: "git", label: "Save Progress", description: "Saving your project history securely.", icon: GitCommit, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20", status: "queued" },
  { id: "deploy", label: "Deployment", description: "Publishing your finished project online.", icon: Network, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/20", status: "queued" },
];

interface ForgeFlowViewProps {
  token: string;
  onTabChange: (tab: string) => void;
  isDeveloperMode: boolean;
}

export default function ForgeFlowView({ token, onTabChange, isDeveloperMode }: ForgeFlowViewProps) {
  const { currentStage, progress } = useMission();
  
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header / Beginner Mode Greeting */}
      {!isDeveloperMode && (
        <PhoenixGuide 
          onContinue={() => onTabChange("forge_studio")}
          onReview={() => onTabChange("forge_flow")}
          onAsk={() => onTabChange("forge_brain")}
          onRoadmap={() => {}}
        />
      )}

      {isDeveloperMode && (
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Network className="w-8 h-8 text-[#3b82f6]" />
              Forge Flow Orchestrator
            </h1>
            <p className="text-[#94a3b8] mt-2 max-w-2xl">
              The intelligent nervous system of your engineering process. Monitor the SDLC, track AI tasks, and view dynamic insights.
            </p>
          </div>
        </div>
      )}

      {/* Visual SDLC Pipeline */}
      <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-3xl p-6 overflow-x-auto hide-scrollbar">
        <h3 className="text-white font-bold mb-4 ml-2">{isDeveloperMode ? "Pipeline Status" : "Project Roadmap"}</h3>
        <div className="flex items-center min-w-max px-2 pb-4 pt-2">
          {SDLC_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isLast = idx === SDLC_STAGES.length - 1;
            
            return (
              <div key={stage.id} className="flex items-center">
                {/* Node */}
                <Tooltip content={stage.description}>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex flex-col items-center gap-3 ${(isDeveloperMode && stage.tab) ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
                    onClick={() => (isDeveloperMode && stage.tab) && onTabChange(stage.tab)}
                  >
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-lg relative ${stage.bg} ${stage.border}`}>
                      <Icon className={`w-8 h-8 ${stage.color}`} />
                      {stage.status && (
                        <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#141b2d] ${
                          stage.status === 'completed' ? 'bg-emerald-500' :
                          stage.status === 'active' ? 'bg-[#3b82f6] animate-pulse' :
                          'bg-[#475569]'
                        }`} />
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#e2e8f0] uppercase tracking-wider">
                      {stage.label}
                    </span>
                  </motion.div>
                </Tooltip>
                
                {/* Connector */}
                {!isLast && (
                  <div className="flex flex-col items-center justify-center w-12 sm:w-20 mx-2">
                    <motion.div 
                      className="w-full h-1 bg-[#1e293b] relative rounded-full overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div 
                        className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear", delay: idx * 0.2 }}
                      />
                    </motion.div>
                    <ArrowRight className="w-4 h-4 text-[#475569] mt-2 absolute" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid Layouts */}
      {isDeveloperMode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[800px] lg:h-[600px]">
          {/* Column 1: Task Queue */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex-1 min-h-0">
              <AiTaskQueue />
            </div>
          </div>

          {/* Column 2: Memory & Recommendations */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="flex-1 min-h-0">
              <ProjectMemory />
            </div>
            <div className="flex-1 min-h-0">
              <AiRecommendations />
            </div>
          </div>

          {/* Column 3: Developer Console */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <div className="flex-1 min-h-0">
              <DeveloperConsole />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
          <div className="col-span-1">
            <ProjectProgressWidget />
          </div>
          <div className="col-span-2">
            <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent pointer-events-none" />
              
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 flex flex-col items-center"
              >
                {currentStage === "idle" && (
                  <>
                    <Rocket className="w-12 h-12 text-[#3b82f6] mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Ready to Launch</h3>
                    <p className="text-[#94a3b8] max-w-sm mb-6">
                      Phoenix is ready to build your project. Switch to Developer Mode to start the mission.
                    </p>
                  </>
                )}
                {currentStage === "planning" || currentStage === "architecture" ? (
                  <>
                    <BrainCircuit className="w-16 h-16 text-purple-400 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white mb-2">Planner AI is understanding your project</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Ada is currently analyzing your requirements, generating specifications, and selecting the best architecture.
                    </p>
                  </>
                ) : currentStage === "backend" || currentStage === "database" ? (
                  <>
                    <Server className="w-16 h-16 text-blue-400 mb-4 animate-bounce" />
                    <h3 className="text-2xl font-bold text-white mb-2">Backend AI is generating APIs and Databases</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Turing and Ada are building robust server routes, configuring PostgreSQL, and establishing secure connections.
                    </p>
                  </>
                ) : currentStage === "frontend" ? (
                  <>
                    <Code2 className="w-16 h-16 text-emerald-400 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white mb-2">Frontend AI is building your interface</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Grace is writing React components, connecting to the backend API, and ensuring a beautiful responsive design.
                    </p>
                  </>
                ) : currentStage === "testing" || currentStage === "security" ? (
                  <>
                    <TestTube2 className="w-16 h-16 text-amber-400 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white mb-2">QA AI is testing everything</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Hopper and Mudge are running unit tests, end-to-end regression tests, and scanning for security vulnerabilities.
                    </p>
                  </>
                ) : currentStage === "deployment" ? (
                  <>
                    <Network className="w-16 h-16 text-orange-400 mb-4 animate-pulse" />
                    <h3 className="text-2xl font-bold text-white mb-2">Deployment AI is preparing production</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Linus is configuring Docker containers, setting up CI/CD pipelines, and launching your project to the cloud.
                    </p>
                  </>
                ) : currentStage === "completed" && (
                  <>
                    <Rocket className="w-16 h-16 text-[#3b82f6] mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Mission Accomplished!</h3>
                    <p className="text-[#94a3b8] max-w-md mb-6">
                      Phoenix has successfully built and deployed your application. It is now ready for the world.
                    </p>
                  </>
                )}

                {currentStage !== "idle" && currentStage !== "completed" && (
                  <div className="w-full max-w-xs bg-[#0b0f19] h-2 rounded-full overflow-hidden border border-[#1e293b] mb-6">
                    <motion.div 
                      className="bg-[#3b82f6] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}

                <button 
                  onClick={() => onTabChange("forge_studio")}
                  className="bg-[#1e293b] hover:bg-[#334155] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                >
                  Watch Phoenix Build
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
