import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Cpu, ShieldAlert, Server, BrainCircuit, Network, FileCode2, TestTube2, CheckCircle2, Rocket, Database } from "lucide-react";
import { MISSION_SEQUENCE, MissionEvent } from "./MissionEngine";

export type MissionStage = "idle" | "planning" | "architecture" | "backend" | "frontend" | "database" | "testing" | "security" | "deployment" | "completed";

export interface Artifact {
  id: number;
  name: string;
  type: "code" | "document" | "image" | "log";
  size: string;
  status: "passed" | "warning";
}

export interface TimelineEvent {
  id: string;
  stage: string;
  title: string;
  description: string;
  timestamp: string;
  agent: string;
  status: "completed" | "in_progress" | "pending";
}

export interface ThinkingFeedItem {
  id: number;
  agent: string;
  action: string;
  time: string;
  type: string;
}

export interface Decision {
  id: number;
  title: string;
  reason: string;
  icon: any;
}

export interface MissionHealth {
  overallProgress: number;
  currentStage: string;
  activeAgent: string;
  filesGenerated: number;
  artifactsCount: number;
  decisionsMade: number;
  remainingTasks: number;
  riskLevel: "Low" | "Medium" | "High";
  estimatedCompletion: string;
}

interface MissionContextType {
  missionActive: boolean;
  currentStage: MissionStage;
  progress: number;
  approvalRequired: boolean;
  showSummary: boolean;
  artifacts: Artifact[];
  timelineEvents: TimelineEvent[];
  thinkingFeed: ThinkingFeedItem[];
  decisions: Decision[];
  files: any[]; 
  health: MissionHealth;
  startMission: (name?: string) => void;
  pauseMission: () => void;
  resumeMission: () => void;
  approveMission: () => void;
  dismissSummary: () => void;
  replayMission: () => void;
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export const PIPELINE_STAGES: { id: MissionStage; label: string; icon: any }[] = [
  { id: "planning", label: "Planning", icon: BrainCircuit },
  { id: "architecture", label: "Architecture", icon: Network },
  { id: "backend", label: "Backend", icon: Server },
  { id: "frontend", label: "Frontend", icon: FileCode2 },
  { id: "database", label: "Database", icon: Cpu },
  { id: "testing", label: "Testing", icon: TestTube2 },
  { id: "security", label: "Security Review", icon: ShieldAlert },
  { id: "deployment", label: "Deployment", icon: Rocket },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
];

export const MissionProvider = ({ children }: { children: ReactNode }) => {
  const [missionActive, setMissionActive] = useState(false);
  const [currentStage, setCurrentStage] = useState<MissionStage>("idle");
  const [progress, setProgress] = useState(0);
  const [approvalRequired, setApprovalRequired] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [thinkingFeed, setThinkingFeed] = useState<ThinkingFeedItem[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  
  const [eventIndex, setEventIndex] = useState(0);

  // Derive Health
  const activeAgent = thinkingFeed.length > 0 ? thinkingFeed[0].agent : "None";
  const remainingTasks = MISSION_SEQUENCE.length - eventIndex;
  
  const health: MissionHealth = {
    overallProgress: progress,
    currentStage: currentStage,
    activeAgent: activeAgent,
    filesGenerated: files.length,
    artifactsCount: artifacts.length,
    decisionsMade: decisions.length,
    remainingTasks: remainingTasks > 0 ? remainingTasks : 0,
    riskLevel: progress > 80 ? "Low" : progress > 40 ? "Medium" : "Low",
    estimatedCompletion: currentStage === "completed" ? "Done" : `${Math.max(1, Math.ceil(remainingTasks * 1.5 / 60))} mins`,
  };

  // Event Engine
  useEffect(() => {
    if (missionActive && !approvalRequired && eventIndex < MISSION_SEQUENCE.length) {
      const currentEvent = MISSION_SEQUENCE[eventIndex];
      
      const timer = setTimeout(() => {
        executeEvent(currentEvent);
        setEventIndex(prev => prev + 1);
      }, currentEvent.delayMs);

      return () => clearTimeout(timer);
    }
  }, [missionActive, approvalRequired, eventIndex]);

  const getIconForName = (name: string) => {
    switch (name) {
      case "Network": return Network;
      case "Server": return Server;
      case "Database": return Database;
      default: return Cpu;
    }
  };

  const executeEvent = (event: MissionEvent) => {
    const { type, payload } = event;
    
    switch(type) {
      case "think":
        setThinkingFeed(prev => [{ id: Date.now(), agent: payload.agent, action: payload.action, time: "Just now", type: payload.type }, ...prev]);
        break;
      case "file":
        setFiles(prev => {
          const exists = prev.find(f => f.name === payload.name);
          if (exists) {
            return prev.map(f => f.name === payload.name ? { ...f, content: payload.content } : f);
          }
          return [...prev, { id: payload.name.toLowerCase().replace('.', '-'), name: payload.name, type: "file", content: payload.content }];
        });
        break;
      case "decision":
        setDecisions(prev => [...prev, { id: Date.now(), title: payload.title, reason: payload.reason, icon: getIconForName(payload.iconName) }]);
        break;
      case "artifact":
        setArtifacts(prev => [...prev, { id: Date.now(), name: payload.name, type: payload.type, size: payload.size, status: payload.status }]);
        break;
      case "timeline":
        setTimelineEvents(prev => [...prev, { id: `evt-${Date.now()}`, stage: payload.stage, title: payload.title, description: payload.description, timestamp: "Just now", agent: payload.agent, status: payload.status }]);
        break;
      case "progress":
        setProgress(payload.value);
        break;
      case "stage":
        setCurrentStage(payload.stage as MissionStage);
        break;
      case "approval":
        setApprovalRequired(true);
        break;
      case "complete":
        setShowSummary(true);
        setMissionActive(false);
        break;
    }
  };

  const startMission = (name?: string) => {
    setMissionActive(true);
    setProgress(0);
    setCurrentStage("planning");
    setShowSummary(false);
    setApprovalRequired(false);
    setEventIndex(0);
    
    // Reset state for new mission
    setArtifacts([]);
    setTimelineEvents([]);
    setThinkingFeed([{ id: Date.now(), agent: "Phoenix", action: `started mission: ${name || 'New Mission'}`, time: "Just now", type: "sys" }]);
    setDecisions([]);
    setFiles([{ id: "readme", name: "README.md", type: "file", content: `# ${name || 'New Project'}\n\nGenerated by Phoenix.`}]);
  };

  const pauseMission = () => setMissionActive(false);
  const resumeMission = () => setMissionActive(true);
  const approveMission = () => setApprovalRequired(false);
  const dismissSummary = () => setShowSummary(false);
  
  const replayMission = () => {
    startMission("Replay Mission");
  };

  return (
    <MissionContext.Provider
      value={{
        missionActive,
        currentStage,
        progress,
        approvalRequired,
        showSummary,
        artifacts,
        timelineEvents,
        thinkingFeed,
        decisions,
        files,
        health,
        startMission,
        pauseMission,
        resumeMission,
        approveMission,
        dismissSummary,
        replayMission,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};

export const useMission = () => {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error("useMission must be used within a MissionProvider");
  }
  return context;
};
