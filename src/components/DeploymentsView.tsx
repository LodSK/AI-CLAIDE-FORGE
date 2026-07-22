import { Network, CheckCircle2, Globe, Server, ArrowUpRight, Loader2, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { useMission } from "../context/MissionContext";

export default function DeploymentsView() {
  const { missionActive, currentStage, progress } = useMission();

  const isDeployed = currentStage === "completed" || progress >= 100;
  const isDeploying = currentStage === "deployment" && progress < 100;

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Globe className="w-8 h-8 text-[#3b82f6]" />
            Deployments
          </h1>
          <p className="text-[#94a3b8] mt-2 max-w-2xl">
            Manage your live applications and environments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {!missionActive && !isDeployed && !isDeploying && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141b2d] border border-[#1e293b] rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Production Environment</h3>
                  <p className="text-[#94a3b8] text-xs">ais-pre-wy5m3c4lmkr76vyuzo3anx-111300990562.europe-west3.run.app</p>
                </div>
              </div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#94a3b8] mb-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Deployed 2 hrs ago
              </div>
              <div className="flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-[#3b82f6]" />
                v1.0.4
              </div>
            </div>

            <button className="w-full bg-[#1e293b] hover:bg-[#334155] text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
              Visit Live Site <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
            </button>
          </motion.div>
        )}

        {(missionActive && !isDeployed && !isDeploying) && (
          <div className="col-span-1 md:col-span-2 text-center py-20 border border-dashed border-[#1e293b] rounded-2xl">
            <Globe className="w-12 h-12 text-slate-500 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-white">No Active Deployments</h3>
            <p className="text-sm text-slate-400 mt-2">The mission is still in progress. The application will be deployed in the final stage.</p>
          </div>
        )}

        {isDeploying && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141b2d] border border-blue-500/50 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent animate-pulse" />
            <div className="flex justify-between items-start mb-4 relative">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Deploying to Production</h3>
                  <p className="text-[#94a3b8] text-xs">Provisioning infrastructure...</p>
                </div>
              </div>
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            </div>

            <div className="w-full bg-[#0b0f19] h-2 rounded-full overflow-hidden border border-[#1e293b] mt-6">
              <div 
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(progress - 86) * (100 / 14)}%` }}
              />
            </div>
          </motion.div>
        )}

        {isDeployed && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141b2d] border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Production Environment</h3>
                  <p className="text-[#94a3b8] text-xs">phoenix-mission.run.app</p>
                </div>
              </div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-[#94a3b8] mb-6">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Deployed just now
              </div>
              <div className="flex items-center gap-1.5">
                <Network className="w-3.5 h-3.5 text-[#3b82f6]" />
                v1.0.0
              </div>
            </div>

            <button className="w-full bg-[#1e293b] hover:bg-[#334155] text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-sm">
              Visit Live Site <ArrowUpRight className="w-4 h-4 text-[#94a3b8]" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
