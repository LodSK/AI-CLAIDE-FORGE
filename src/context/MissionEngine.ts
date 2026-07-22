export interface MissionEvent {
  id: string;
  delayMs: number; // Time to wait before executing this event
  type: "stage" | "think" | "decision" | "file" | "artifact" | "timeline" | "progress" | "approval" | "complete";
  payload: any;
}

export const MISSION_SEQUENCE: MissionEvent[] = [
  { id: "e1", delayMs: 1000, type: "think", payload: { agent: "Ada", action: "Analyzing mission objectives...", type: "sys" } },
  { id: "e2", delayMs: 1500, type: "think", payload: { agent: "Ada", action: "Structuring data models...", type: "arch" } },
  { id: "e3", delayMs: 1500, type: "file", payload: { name: "Requirements.md", content: "# Project Requirements\n\n- System must handle auth\n- Real-time updates\n- Event-driven architecture" } },
  { id: "e4", delayMs: 1000, type: "artifact", payload: { name: "Requirements.md", type: "document", size: "12 KB", status: "passed" } },
  { id: "e5", delayMs: 1000, type: "timeline", payload: { stage: "Planning", title: "Requirements Finalized", description: "Project specifications have been documented.", agent: "Ada", status: "completed" } },
  { id: "e6", delayMs: 500, type: "progress", payload: { value: 12 } },
  { id: "e7", delayMs: 500, type: "stage", payload: { stage: "architecture" } },
  
  { id: "e8", delayMs: 1500, type: "think", payload: { agent: "Ada", action: "Selecting architecture patterns...", type: "arch" } },
  { id: "e9", delayMs: 1500, type: "decision", payload: { title: "Monolithic Architecture Selected", reason: "Best suited for initial rapid development of this project scope.", iconName: "Network" } },
  { id: "e10", delayMs: 1500, type: "file", payload: { name: "Architecture.md", content: "# System Architecture\n\n1. Node.js backend\n2. React frontend\n3. Postgres DB" } },
  { id: "e11", delayMs: 1000, type: "artifact", payload: { name: "Architecture.md", type: "document", size: "8 KB", status: "passed" } },
  { id: "e12", delayMs: 1000, type: "timeline", payload: { stage: "Architecture", title: "Architecture Blueprint Finalized", description: "Core system architecture and component interactions defined.", agent: "Ada", status: "completed" } },
  { id: "e13", delayMs: 500, type: "progress", payload: { value: 25 } },
  { id: "e14", delayMs: 500, type: "stage", payload: { stage: "backend" } },
  
  { id: "e15", delayMs: 1500, type: "think", payload: { agent: "Turing", action: "Generating server.ts...", type: "code" } },
  { id: "e16", delayMs: 1500, type: "think", payload: { agent: "Turing", action: "Writing routes...", type: "code" } },
  { id: "e17", delayMs: 1500, type: "think", payload: { agent: "Turing", action: "Adding authentication middleware...", type: "code" } },
  { id: "e18", delayMs: 1500, type: "file", payload: { name: "server.ts", content: "import express from 'express';\nimport cors from 'cors';\n\nconst app = express();\napp.use(cors());\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'ok' });\n});\n\napp.listen(3000, () => console.log('Server running...'));" } },
  { id: "e19", delayMs: 1000, type: "decision", payload: { title: "Enabled Redis Caching", reason: "Expected high read traffic requires optimized response times.", iconName: "Server" } },
  { id: "e20", delayMs: 1000, type: "artifact", payload: { name: "server.ts", type: "code", size: "4 KB", status: "passed" } },
  { id: "e21", delayMs: 1000, type: "timeline", payload: { stage: "Backend", title: "Core APIs Built", description: "REST endpoints for primary entities initialized.", agent: "Turing", status: "completed" } },
  { id: "e22", delayMs: 500, type: "progress", payload: { value: 41 } },
  { id: "e23", delayMs: 500, type: "stage", payload: { stage: "frontend" } },

  { id: "e24", delayMs: 1500, type: "think", payload: { agent: "Grace", action: "Waiting for backend API before building login screen...", type: "code" } },
  { id: "e25", delayMs: 1500, type: "think", payload: { agent: "Grace", action: "Generating App.tsx...", type: "code" } },
  { id: "e26", delayMs: 1500, type: "think", payload: { agent: "Grace", action: "Creating UI components...", type: "code" } },
  { id: "e27", delayMs: 1500, type: "file", payload: { name: "App.tsx", content: "import React from 'react';\n\nexport default function App() {\n  return (\n    <div className=\"min-h-screen bg-slate-900 text-white flex items-center justify-center\">\n      <h1 className=\"text-4xl font-bold\">App Interface Loaded</h1>\n    </div>\n  );\n}" } },
  { id: "e28", delayMs: 1000, type: "artifact", payload: { name: "App.tsx", type: "code", size: "6 KB", status: "passed" } },
  { id: "e29", delayMs: 1000, type: "timeline", payload: { stage: "Frontend", title: "UI Components Built", description: "Primary screens and navigation configured.", agent: "Grace", status: "completed" } },
  { id: "e30", delayMs: 500, type: "progress", payload: { value: 63 } },
  { id: "e31", delayMs: 500, type: "stage", payload: { stage: "database" } },

  { id: "e32", delayMs: 1500, type: "think", payload: { agent: "Ada", action: "Generating schema.sql...", type: "db" } },
  { id: "e33", delayMs: 1500, type: "think", payload: { agent: "Ada", action: "Writing table definitions...", type: "db" } },
  { id: "e34", delayMs: 1500, type: "decision", payload: { title: "Selected PostgreSQL", reason: "Financial transactions require strict ACID compliance.", iconName: "Database" } },
  { id: "e35", delayMs: 1500, type: "file", payload: { name: "schema.sql", content: "CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n" } },
  { id: "e36", delayMs: 1000, type: "artifact", payload: { name: "schema.sql", type: "code", size: "2 KB", status: "warning" } },
  { id: "e37", delayMs: 1000, type: "timeline", payload: { stage: "Database", title: "Schema Initialized", description: "Relational tables and indices created.", agent: "Ada", status: "completed" } },
  { id: "e38", delayMs: 500, type: "progress", payload: { value: 75 } },
  { id: "e39", delayMs: 500, type: "stage", payload: { stage: "testing" } },

  { id: "e40", delayMs: 1500, type: "think", payload: { agent: "Hopper", action: "Running regression tests...", type: "test" } },
  { id: "e41", delayMs: 1500, type: "think", payload: { agent: "Hopper", action: "Executing E2E tests...", type: "test" } },
  { id: "e42", delayMs: 1000, type: "timeline", payload: { stage: "Testing", title: "Test Suite Passed", description: "Unit and integration tests executed successfully.", agent: "Hopper", status: "completed" } },
  { id: "e43", delayMs: 500, type: "progress", payload: { value: 87 } },
  { id: "e44", delayMs: 500, type: "stage", payload: { stage: "security" } },

  { id: "e45", delayMs: 1500, type: "think", payload: { agent: "Mudge", action: "Scanning dependencies for vulnerabilities...", type: "sec" } },
  { id: "e46", delayMs: 1500, type: "think", payload: { agent: "Mudge", action: "Detected dependency vulnerability - patching...", type: "sec" } },
  { id: "e47", delayMs: 1500, type: "timeline", payload: { stage: "Security", title: "Security Review Passed", description: "Static analysis and dependency checks passed.", agent: "Mudge", status: "completed" } },
  { id: "e48", delayMs: 500, type: "progress", payload: { value: 92 } },
  { id: "e49", delayMs: 500, type: "stage", payload: { stage: "deployment" } },

  { id: "e50", delayMs: 1500, type: "think", payload: { agent: "Linus", action: "Preparing production container...", type: "ops" } },
  { id: "e51", delayMs: 1500, type: "think", payload: { agent: "Linus", action: "Writing Dockerfile...", type: "ops" } },
  { id: "e52", delayMs: 1500, type: "file", payload: { name: "Dockerfile", content: "FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nCMD [\"npm\", \"start\"]" } },
  { id: "e53", delayMs: 1000, type: "artifact", payload: { name: "DeploymentGuide.md", type: "document", size: "6 KB", status: "passed" } },
  { id: "e54", delayMs: 1000, type: "timeline", payload: { stage: "Deployment", title: "Mission Completed", description: "Project successfully built and deployed.", agent: "Linus", status: "completed" } },
  { id: "e55", delayMs: 500, type: "progress", payload: { value: 100 } },
  { id: "e56", delayMs: 1000, type: "think", payload: { agent: "Phoenix", action: "Mission successfully completed ✓", type: "sys" } },
  { id: "e57", delayMs: 500, type: "stage", payload: { stage: "completed" } },
  { id: "e58", delayMs: 500, type: "complete", payload: {} }
];
