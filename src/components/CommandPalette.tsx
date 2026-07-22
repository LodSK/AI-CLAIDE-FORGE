import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  LayoutDashboard,
  Workflow,
  Rocket,
  Bot,
  BrainCircuit,
  Clock,
  Package,
  Settings,
  User as UserIcon,
  Shield,
  BarChart3,
  Terminal,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

/**
 * ARCHITECTURAL DECISION: Phoenix previously had no unified command surface —
 * navigation was a flat set of Navbar buttons and every new capability meant
 * another icon competing for space in the top bar. An "AI engineering OS"
 * needs a keyboard-first command surface the way VS Code, Linear, and Raycast
 * do: press a shortcut, type intent, act. This component is deliberately
 * generic (Command[] in, onSelect out) so future phases can register real
 * actions here — "generate tests for this file", "rollback last deploy" —
 * without touching this component again.
 */

export interface Command {
  id: string;
  label: string;
  hint?: string;
  group: "Navigate" | "Actions" | "Account";
  icon: React.ElementType;
  keywords?: string;
  perform: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  isDeveloperMode: boolean;
  isAdmin: boolean;
}

export default function CommandPalette({ isOpen, onClose, onNavigate, isDeveloperMode, isAdmin }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = useMemo(() => {
    const go = (tab: string) => () => {
      onNavigate(tab);
      onClose();
    };
    const base: Command[] = [
      { id: "nav-dashboard", label: "Go to Dashboard", group: "Navigate", icon: LayoutDashboard, perform: go("dashboard") },
      { id: "nav-forge-flow", label: "Go to Forge Flow", hint: "Start or resume a build", group: "Navigate", icon: Workflow, perform: go("forge_flow") },
      { id: "nav-mission-control", label: "Go to Mission Control", group: "Navigate", icon: Rocket, perform: go("mission_control") },
      { id: "nav-agents", label: "Go to AI Agents", group: "Navigate", icon: Bot, perform: go("ai_agents") },
      { id: "nav-brain", label: "Go to Forge Brain", hint: "Project memory & context", group: "Navigate", icon: BrainCircuit, perform: go("forge_brain") },
      { id: "nav-timeline", label: "Go to Timeline", group: "Navigate", icon: Clock, perform: go("timeline") },
      { id: "nav-artifacts", label: "Go to Artifacts", group: "Navigate", icon: Package, perform: go("artifacts") },
      { id: "nav-analytics", label: "Go to Analytics", group: "Navigate", icon: BarChart3, perform: go("analytics_overview") },
      { id: "nav-profile", label: "Go to Profile", group: "Account", icon: UserIcon, perform: go("profile") },
      { id: "nav-settings", label: "Go to Settings", group: "Account", icon: Settings, perform: go("settings") },
    ];
    if (isDeveloperMode) {
      base.push({ id: "nav-workspace", label: "Go to Workspace", group: "Navigate", icon: Terminal, keywords: "code editor", perform: go("workspace") });
      base.push({ id: "nav-studio", label: "Go to Forge Studio", group: "Navigate", icon: Terminal, perform: go("forge_studio") });
    }
    if (isAdmin) {
      base.push({ id: "nav-admin", label: "Go to Admin", group: "Account", icon: Shield, perform: go("admin") });
    }
    return base;
  }, [isDeveloperMode, isAdmin, onNavigate, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords?.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[activeIndex]?.perform();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, filtered, activeIndex, onClose]);

  let groupCursor = "";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[14vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl surface-glass rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] overflow-hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b" style={{ borderColor: "var(--edge)" }}>
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: "var(--fg-muted)" }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search actions, go anywhere…"
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--fg-primary)" }}
              />
              <span className="kbd">esc</span>
            </div>

            <div className="max-h-[50vh] overflow-y-auto scrollbar-thin py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm" style={{ color: "var(--fg-muted)" }}>
                  No matching commands.
                </div>
              )}

              {filtered.map((cmd, idx) => {
                const showGroupHeader = cmd.group !== groupCursor;
                groupCursor = cmd.group;
                const Icon = cmd.icon;
                const active = idx === activeIndex;
                return (
                  <div key={cmd.id}>
                    {showGroupHeader && (
                      <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>
                        {cmd.group}
                      </div>
                    )}
                    <button
                      onClick={cmd.perform}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                      style={{
                        background: active ? "var(--accent-soft)" : "transparent",
                      }}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: active ? "var(--accent-strong)" : "var(--fg-secondary)" }} />
                      <span className="flex-1 text-sm font-medium" style={{ color: "var(--fg-primary)" }}>
                        {cmd.label}
                      </span>
                      {cmd.hint && (
                        <span className="text-xs" style={{ color: "var(--fg-muted)" }}>
                          {cmd.hint}
                        </span>
                      )}
                      {active && <CornerDownLeft className="w-3.5 h-3.5" style={{ color: "var(--accent-strong)" }} />}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 px-4 py-2.5 border-t text-[11px]" style={{ borderColor: "var(--edge)", color: "var(--fg-muted)" }}>
              <span className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3" /> <ArrowDown className="w-3 h-3" /> navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3" /> select
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
