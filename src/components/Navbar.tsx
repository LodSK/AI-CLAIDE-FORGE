import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ApiService } from "../api";
import { Rocket, Bell, LogOut, Shield, User as UserIcon, CheckCircle, Search } from "lucide-react";
import { User, Notification, UserRole } from "../types";

interface NavbarProps {
  user: Omit<User, "passwordHash">;
  token: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  notificationsVersion: number; // Increment to force refetch of notifications
  onRobotIconClick?: () => void;
  isDeveloperMode: boolean;
  onToggleDeveloperMode: () => void;
  onOpenCommandPalette?: () => void;
}

export default function Navbar({ user, token, activeTab, onTabChange, onLogout, notificationsVersion, onRobotIconClick, isDeveloperMode, onToggleDeveloperMode, onOpenCommandPalette }: NavbarProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const fetchNotifications = async () => {
    try {
      const list = await ApiService.listNotifications(token);
      setNotifications(list);
    } catch (e) {
      console.error("Failed to load notifications", e);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token, notificationsVersion]);

  const handleMarkAsRead = async () => {
    try {
      await ApiService.markNotificationsRead(token);
      // set locally to read
      setNotifications(notifications.map((n) => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="sticky top-0 z-40 bg-[#0e1424]/80 backdrop-blur-md border-b border-[#141b2d] px-6 py-3.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onTabChange("dashboard")}>
          <div className="p-2 bg-[#3b82f6]/10 rounded-lg text-[#3b82f6] border border-[#3b82f6]/20">
            <Rocket className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">AI Forge <span className="text-[#3b82f6] font-medium">OS</span></span>
            {user.role === UserRole.ADMIN && (
              <span className="ml-2 text-[9px] uppercase font-bold text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded border border-[#10b981]/20">
                Admin
              </span>
            )}
          </div>
        </div>

        {onOpenCommandPalette && (
          <button
            onClick={onOpenCommandPalette}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-colors"
            style={{ background: "var(--bg-surface-raised)", border: "1px solid var(--edge)", color: "var(--fg-muted)" }}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search or jump to…</span>
            <span className="kbd ml-2">⌘K</span>
          </button>
        )}

        {/* Dynamic Navigation Tabs (Desk and Tablet layout) */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { id: "dashboard", label: "Home", always: true },
            { id: "my_projects", label: "My Projects", always: true },
            { id: "mission_control", label: "🚀 Mission Control", always: true },
            { id: "artifacts", label: "📦 Artifacts", always: true },
            { id: "forge_flow", label: "Forge Flow", always: true },
            { id: "deployments", label: "Deployments", always: true },
            { id: "timeline", label: "📅 Timeline", dev: true },
            { id: "ai_agents", label: "🤖 AI Team", dev: true },
            { id: "forge_brain", label: "🧠 AI Planner", dev: true },
            { id: "workspace", label: "💻 Build Studio", dev: true },
            { id: "forge_studio", label: "⚙️ Code Gen", dev: true },
            { id: "profile", label: "Profile", always: true },
            { id: "settings", label: "Settings", dev: true },
          ].filter(tab => tab.always || (tab.dev && isDeveloperMode)).map((tab) => {
            const isActive = activeTab === tab.id || (tab.id === "dashboard" && activeTab.startsWith("analytics_")) || (activeTab === "dashboard" && tab.id === "my_projects");
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => onTabChange(tab.id === "my_projects" ? "dashboard" : tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#1e293b] text-white"
                    : "text-[#94a3b8] hover:text-white hover:bg-[#141b2d]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {user.role === UserRole.ADMIN && (
            <button
              id="tab-admin"
              onClick={() => onTabChange("admin")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === "admin"
                  ? "bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30"
                  : "text-[#94a3b8] hover:text-white hover:bg-[#141b2d]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </button>
          )}
        </div>

        {/* User Session Utilities */}
        <div className="flex items-center gap-4">
          {/* Developer Mode Toggle */}
          <div className="flex items-center gap-2 mr-2">
            <span className="text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">Dev Mode</span>
            <button 
              onClick={onToggleDeveloperMode}
              className={`w-8 h-4 rounded-full transition-colors relative flex items-center ${isDeveloperMode ? 'bg-[#3b82f6]' : 'bg-[#1e293b]'}`}
            >
              <span className={`w-3 h-3 bg-white rounded-full absolute transition-all ${isDeveloperMode ? 'right-0.5' : 'left-0.5'}`} />
            </button>
          </div>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              id="notifications-trigger"
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                if (unreadCount > 0) {
                  handleMarkAsRead();
                }
              }}
              className="p-2 hover:bg-[#141b2d] rounded-lg text-[#94a3b8] hover:text-white transition-colors relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            <AnimatePresence>
              {showNotifDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-3 w-80 bg-[#141b2d] border border-[#1e293b] rounded-xl shadow-2xl overflow-hidden z-50 text-left"
                >
                  <div className="p-3 bg-[#0e1424] border-b border-[#1e293b] flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Broadcast Alerts</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] text-[#3b82f6] font-semibold">New Notifications</span>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-[#1e293b]">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-[#475569]">
                        Zero alerts present. Ready to monitor.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className={`p-3 text-xs transition-colors ${notif.read ? "bg-transparent" : "bg-[#1e293b]/30"}`}>
                          <div className="flex gap-2 items-start">
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              notif.type === "success" ? "text-emerald-500" :
                              notif.type === "warning" ? "text-amber-500" : "text-[#3b82f6]"
                            }`} />
                            <div>
                              <p className="font-semibold text-[#e2e8f0] mb-0.5">{notif.title}</p>
                              <p className="text-[11px] text-[#94a3b8] leading-normal">{notif.description}</p>
                              <span className="text-[9px] text-[#475569] block mt-1">
                                {new Date(notif.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User profile identifier */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-[#1e293b]">
            <button
              onClick={onRobotIconClick}
              title="Open AI Assistant"
              className="relative p-0.5 hover:bg-[#3b82f6]/10 rounded-full transition-colors shrink-0 cursor-pointer focus:outline-none"
            >
              <img
                src={user.avatarUrl}
                alt="Avatar"
                className="w-7 h-7 rounded-full bg-[#1e293b] border border-[#3b82f6]/30"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-[#0b0f19] animate-pulse" />
            </button>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-[#475569]">{user.email}</p>
            </div>
            <button
              onClick={onLogout}
              title="Logout session"
              className="p-2 hover:bg-[#141b2d] text-red-400 hover:text-red-300 rounded-lg transition-colors ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
