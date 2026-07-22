import { useState, useEffect } from "react";
import { Users, Activity, CheckCircle2, Circle, Code2, Database, Shield, Server, Bot, MessageSquare, Briefcase, Clock, HeartPulse, Loader2, GitPullRequest } from "lucide-react";
import { motion } from "motion/react";
import { useMission } from "../context/MissionContext";

const BASE_AGENTS = [
  { 
    id: "cto", name: "Ada (CTO Architect)", role: "System Architecture", 
    icon: Bot, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Ada",
    metrics: { efficiency: "98%", accuracy: "100%", tasks: 45 }
  },
  { 
    id: "backend", name: "Turing (Backend)", role: "API & Database", 
    icon: Database, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Turing",
    metrics: { efficiency: "94%", accuracy: "98%", tasks: 128 }
  },
  { 
    id: "frontend", name: "Grace (Frontend)", role: "UI/UX & Components", 
    icon: Code2, color: "text-[#3b82f6]", bg: "bg-[#3b82f6]/10", border: "border-[#3b82f6]/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Grace",
    metrics: { efficiency: "96%", accuracy: "97%", tasks: 210 }
  },
  { 
    id: "qa", name: "Hopper (QA)", role: "Testing & Validation", 
    icon: CheckCircle2, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Hopper",
    metrics: { efficiency: "99%", accuracy: "100%", tasks: 87 }
  },
  { 
    id: "devops", name: "Linus (DevOps)", role: "CI/CD & Deployment", 
    icon: Server, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Linus",
    metrics: { efficiency: "95%", accuracy: "99%", tasks: 62 }
  },
  { 
    id: "security", name: "Mudge (Security)", role: "Vulnerability Scanning", 
    icon: Shield, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20", 
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Mudge",
    metrics: { efficiency: "97%", accuracy: "100%", tasks: 34 }
  },
];

const DEFAULT_CONVERSATION = [
  { agentId: "cto", text: "I've drafted the schema for the multi-agent system. Turing, please set up the data models.", time: "10:02 AM" },
  { agentId: "backend", text: "Understood. Creating the PostgreSQL tables now. Mudge, I need you to review the role-based access logic.", time: "10:04 AM" },
  { agentId: "security", text: "I'm monitoring the PR. Ensure we use strict validation for agent communication payloads.", time: "10:05 AM" },
  { agentId: "frontend", text: "I'll start on the Agent Dashboard UI. Are we sticking to the dark glassmorphism theme?", time: "10:07 AM" },
  { agentId: "cto", text: "Yes, keep the existing premium dark theme. Maintain responsive layouts.", time: "10:08 AM" },
];

const DEFAULT_TIMELINE = [
  { id: 1, title: "Architecture Blueprint Generation", agent: "Ada (CTO)", status: "completed", time: "09:45 AM" },
  { id: 2, title: "Database Schema Implementation", agent: "Turing (Backend)", status: "completed", time: "10:15 AM" },
  { id: 3, title: "Security Audit (Auth Module)", agent: "Mudge (Security)", status: "completed", time: "10:30 AM" },
  { id: 4, title: "Dashboard Component Scaffolding", agent: "Grace (Frontend)", status: "active", time: "10:45 AM" },
  { id: 5, title: "Automated Integration Tests", agent: "Hopper (QA)", status: "queued", time: "Pending" },
  { id: 6, title: "Production Deployment", agent: "Linus (DevOps)", status: "queued", time: "Pending" },
];

function MetricCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-[#0b0f19] border border-[#1e293b] ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">{title}</span>
      </div>
      <div className="text-2xl font-extrabold text-white ml-1">{value}</div>
    </div>
  );
}

function AgentCard({ agent, index }: { agent: any; index: number; key?: string }) {
  const Icon = agent.icon;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col group hover:border-[#334155] transition-all"
    >
      <div className="p-4 border-b border-[#1e293b] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full bg-[#0b0f19] border border-[#1e293b] p-1" />
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141b2d] ${
              agent.status === "Coding" || agent.status === "Planning" || agent.status === "Deploying" || agent.status === "Testing" ? "bg-[#3b82f6] animate-pulse" :
              agent.status === "Monitoring" ? "bg-cyan-400" : "bg-amber-400"
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">{agent.name}</h3>
            <p className={`text-[10px] uppercase tracking-wider font-bold ${agent.color}`}>{agent.role}</p>
          </div>
        </div>
        <div className={`p-2 rounded-xl ${agent.bg} ${agent.border} border`}>
          <Icon className={`w-4 h-4 ${agent.color}`} />
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col gap-4">
        <div>
          <h4 className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-2">Current Status</h4>
          <div className="flex items-center gap-2 text-sm text-[#cbd5e1] bg-[#0b0f19]/50 px-3 py-1.5 rounded-lg border border-[#1e293b] w-max">
            {agent.status === "Waiting" || agent.status === "Idle" ? <Clock className="w-3.5 h-3.5 text-amber-400" /> : 
             agent.status === "Monitoring" || agent.status === "Completed" ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> :
             <Loader2 className="w-3.5 h-3.5 text-[#3b82f6] animate-spin" />}
            {agent.status}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-2">Recent Activity</h4>
          <p className="text-sm text-[#e2e8f0] truncate">{agent.recentActivity}</p>
        </div>

        <div>
          <h4 className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-2">Task Queue</h4>
          <ul className="space-y-1">
            {agent.taskQueue.map((task: string, i: number) => (
              <li key={i} className="text-xs text-[#94a3b8] flex items-center gap-2">
                <Circle className="w-2 h-2 text-[#475569] fill-current" />
                <span className="truncate">{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-[#1e293b] divide-x divide-[#1e293b] bg-[#0b0f19]/30">
        <div className="p-3 text-center">
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-0.5">Speed</div>
          <div className="text-xs font-bold text-white">{agent.metrics.efficiency}</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-0.5">Accuracy</div>
          <div className="text-xs font-bold text-white">{agent.metrics.accuracy}</div>
        </div>
        <div className="p-3 text-center">
          <div className="text-[10px] text-[#475569] uppercase font-bold tracking-wider mb-0.5">Tasks</div>
          <div className="text-xs font-bold text-white">{agent.metrics.tasks}</div>
        </div>
      </div>
    </motion.div>
  );
}

function AgentConversation({ conversation }: { conversation: any[] }) {
  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#3b82f6]" />
          Agent Swarm Chat
        </h3>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
          <span className="text-[10px] text-[#94a3b8] font-bold uppercase tracking-wider">Live Sync</span>
        </div>
      </div>
      <div className="p-4 overflow-y-auto flex-1 space-y-4">
        {conversation.map((msg, idx) => {
          const agent = BASE_AGENTS.find(a => a.id === msg.agentId || a.name.includes(msg.agentId)) || BASE_AGENTS[0];
          return (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              key={idx} 
              className="flex gap-3"
            >
              <img src={agent.avatar} alt={agent.name} className="w-8 h-8 rounded-full bg-[#0b0f19] border border-[#1e293b] shrink-0 p-0.5" />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-xs font-bold ${agent.color}`}>{agent.name}</span>
                  <span className="text-[10px] text-[#475569] font-medium">{msg.time}</span>
                </div>
                <div className="bg-[#0b0f19]/80 border border-[#1e293b] text-sm text-[#e2e8f0] p-3 rounded-2xl rounded-tl-none inline-block">
                  {msg.text}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function CollaborationTimeline({ timeline }: { timeline: any[] }) {
  return (
    <div className="bg-[#141b2d]/80 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-[#1e293b] bg-[#1e293b]/20 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-purple-400" />
          Collaboration Timeline
        </h3>
      </div>
      <div className="p-6 overflow-y-auto flex-1">
        <div className="relative border-l-2 border-[#1e293b] ml-3 space-y-6">
          {timeline.map((item, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id} 
              className="relative pl-6"
            >
              <div className={`absolute -left-[9px] top-1 rounded-full bg-[#0b0f19] p-0.5 border ${
                item.status === "completed" ? "border-emerald-500" :
                item.status === "active" ? "border-[#3b82f6]" : "border-[#475569]"
              }`}>
                {item.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                {item.status === "active" && <Loader2 className="w-3 h-3 text-[#3b82f6] animate-spin" />}
                {item.status === "queued" && <Circle className="w-3 h-3 text-[#475569]" />}
              </div>
              <div>
                <h4 className={`text-sm font-bold ${
                  item.status === "completed" ? "text-emerald-400" :
                  item.status === "active" ? "text-[#3b82f6]" : "text-white"
                }`}>
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-[#94a3b8] font-semibold bg-[#1e293b] px-2 py-0.5 rounded-md">
                    {item.agent}
                  </span>
                  <span className="text-[10px] text-[#475569] font-medium">
                    {item.time}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AiAgentsView() {
  const { missionActive, currentStage, thinkingFeed, timelineEvents } = useMission();

  // Dynamic agent status mapping
  const agents = BASE_AGENTS.map(agent => {
    let status = "Idle";
    let taskQueue = ["Awaiting assignments"];
    let recentActivity = "Standby";

    if (missionActive) {
      if (currentStage === "completed") {
        status = "Completed";
        recentActivity = "Mission Completed";
        taskQueue = ["None"];
      } else if (agent.id === "cto") {
        if (currentStage === "planning" || currentStage === "architecture") { status = "Planning"; recentActivity = "Designing systems"; taskQueue = ["Requirements", "Architecture"]; }
        else { status = "Monitoring"; recentActivity = "Supervising architecture"; taskQueue = ["Review components"]; }
      } else if (agent.id === "backend") {
        if (currentStage === "backend") { status = "Coding"; recentActivity = "Building API endpoints"; taskQueue = ["Controllers", "Services"]; }
        else if (currentStage === "database") { status = "Coding"; recentActivity = "Configuring schemas"; taskQueue = ["Migrations"]; }
        else { status = "Waiting"; recentActivity = "Standby"; }
      } else if (agent.id === "frontend") {
        if (currentStage === "frontend") { status = "Coding"; recentActivity = "Building UI components"; taskQueue = ["Pages", "State"]; }
        else { status = "Waiting"; recentActivity = "Standby"; }
      } else if (agent.id === "qa") {
        if (currentStage === "testing") { status = "Testing"; recentActivity = "Running test suites"; taskQueue = ["Unit tests", "E2E tests"]; }
        else { status = "Waiting"; recentActivity = "Standby"; }
      } else if (agent.id === "devops") {
        if (currentStage === "deployment") { status = "Deploying"; recentActivity = "Configuring pipelines"; taskQueue = ["Docker build", "Deploy"]; }
        else { status = "Waiting"; recentActivity = "Standby"; }
      } else if (agent.id === "security") {
        if (currentStage === "security") { status = "Testing"; recentActivity = "Performing audits"; taskQueue = ["Dependency check", "Audit Auth"]; }
        else { status = "Waiting"; recentActivity = "Standby"; }
      }
    } else {
      // Fallback defaults
      if (agent.id === "cto") { status = "Planning"; taskQueue = ["Design scalable event system", "Review database schema"]; recentActivity = "Created System Blueprint v2.1"; }
      else if (agent.id === "backend") { status = "Coding"; taskQueue = ["Implement JWT middleware", "Optimize analytical queries"]; recentActivity = "Committed AuthController.ts"; }
      else if (agent.id === "frontend") { status = "Coding"; taskQueue = ["Build Agent Dashboard UI", "Implement glassmorphism cards"]; recentActivity = "Committed AiAgentsView.tsx"; }
      else if (agent.id === "qa") { status = "Waiting"; taskQueue = ["Generate end-to-end tests", "Validate mobile responsiveness"]; recentActivity = "Passed 42/42 unit tests"; }
      else if (agent.id === "devops") { status = "Deploying"; taskQueue = ["Configure Cloud Run instance", "Setup artifact registry"]; recentActivity = "Pushed to production"; }
      else if (agent.id === "security") { status = "Monitoring"; taskQueue = ["Scan dependencies for CVEs", "Audit JWT implementation"]; recentActivity = "Completed static analysis"; }
    }

    return { ...agent, status, taskQueue, recentActivity };
  });

  const conversation = missionActive && thinkingFeed.length > 0
    ? thinkingFeed.map(feed => ({
        agentId: feed.agent,
        text: feed.action,
        time: feed.time,
      }))
    : DEFAULT_CONVERSATION;

  const activeTimeline = missionActive && timelineEvents.length > 0
    ? timelineEvents.map(event => ({
        id: event.id,
        title: event.title,
        agent: event.agent,
        status: event.status,
        time: event.timestamp,
      }))
    : DEFAULT_TIMELINE;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Users className="w-8 h-8 text-[#3b82f6]" />
            Multi-Agent Orchestration
          </h1>
          <p className="text-[#94a3b8] mt-2 max-w-2xl">
            Collaborative AI engineering team working autonomously to build, test, and deploy.
          </p>
        </div>
      </div>

      {/* Agent Dashboard Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard title="Active Tasks" value={missionActive ? 1 : 8} icon={Activity} color="text-[#3b82f6]" />
        <MetricCard title="Completed Tasks" value={missionActive ? timelineEvents.length : "1,204"} icon={CheckCircle2} color="text-emerald-400" />
        <MetricCard title="Current Workload" value={missionActive ? "45%" : "85%"} icon={Briefcase} color="text-purple-400" />
        <MetricCard title="Est. Completion" value={missionActive ? "In Progress" : "1h 15m"} icon={Clock} color="text-amber-400" />
        <MetricCard title="System Health" value="Optimal" icon={HeartPulse} color="text-rose-400" />
      </div>

      {/* Specialized Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent, idx) => (
          <AgentCard key={agent.id} agent={agent} index={idx} />
        ))}
      </div>

      {/* Collaboration & Conversation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
        <AgentConversation conversation={conversation} />
        <CollaborationTimeline timeline={activeTimeline} />
      </div>
    </div>
  );
}
