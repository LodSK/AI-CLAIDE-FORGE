import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Package, 
  Search, 
  FileCode2, 
  Image as ImageIcon, 
  FileText, 
  Archive, 
  Download, 
  Clock,
  TerminalSquare,
  ShieldCheck,
  CheckCircle2,
  FileDigit,
  Github
} from "lucide-react";
import { Project } from "../types";
import { ApiService } from "../api";
import { useMission } from "../context/MissionContext";

interface ArtifactsViewProps {
  token: string;
}

export default function ArtifactsView({ token }: ArtifactsViewProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [showGithubModal, setShowGithubModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const { artifacts } = useMission();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const list = await ApiService.listProjects(token);
      setProjects(list);
      if (list.length > 0) setActiveProject(list[0].id);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadZip = () => {
    setShowDownloadModal(true);
    setTimeout(() => setShowDownloadModal(false), 3000);
  };

  const handleGithubPush = () => {
    setShowGithubModal(true);
  };

  const filteredArtifacts = artifacts.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Package className="w-8 h-8 text-emerald-400" />
            AI Artifact Center
          </h1>
          <p className="text-[#94a3b8] mt-2 max-w-2xl">
            Explore, download, and manage generated files, documents, and reports from all missions.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-[#64748b] text-center p-10 animate-pulse">Loading artifacts...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Projects Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Select Project</h3>
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors border ${
                  activeProject === proj.id
                    ? "bg-[#1e293b] border-[#334155] text-white"
                    : "bg-transparent border-transparent text-[#94a3b8] hover:bg-[#141b2d]"
                }`}
              >
                <div className="font-semibold text-sm">{proj.name}</div>
                <div className="text-xs mt-1 text-[#64748b]">
                  {proj.blueprint?.architecture ? "Completed Mission" : "In Progress"}
                </div>
              </button>
            ))}
          </div>

          {/* Artifacts List & Actions */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Download Center & GitHub Actions */}
            <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-6 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h3 className="text-white font-bold mb-1">Download Center</h3>
                <p className="text-[#94a3b8] text-xs">Download full packages or push directly to repositories.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleGithubPush}
                  className="bg-[#1e293b] hover:bg-[#334155] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" /> Push to GitHub
                </button>
                <button 
                  onClick={handleDownloadZip}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors text-sm shadow-lg shadow-emerald-500/20"
                >
                  <Archive className="w-4 h-4" /> Download ZIP Package
                </button>
              </div>
            </div>

            {/* Quality Engine Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileDigit className="w-4 h-4 text-[#3b82f6]" />
                  <span className="text-xs text-[#94a3b8] font-bold uppercase tracking-wider">Total Files</span>
                </div>
                <span className="text-2xl font-bold text-white">42</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TerminalSquare className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-[#94a3b8] font-bold uppercase tracking-wider">Lines of Code</span>
                </div>
                <span className="text-2xl font-bold text-white">8,405</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-[#94a3b8] font-bold uppercase tracking-wider">Quality Score</span>
                </div>
                <span className="text-2xl font-bold text-white">98%</span>
              </div>
              <div className="bg-[#0b0f19] border border-[#1e293b] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-[#94a3b8] font-bold uppercase tracking-wider">Execution Time</span>
                </div>
                <span className="text-2xl font-bold text-white">14m 20s</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 text-[#64748b] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search generated files, reports, logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#141b2d] border border-[#1e293b] text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#3b82f6]/50 focus:ring-1 focus:ring-[#3b82f6]/50 transition-all"
              />
            </div>

            {/* Artifacts Table */}
            <div className="bg-[#141b2d]/50 backdrop-blur-xl border border-[#1e293b] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0e1424] border-b border-[#1e293b]">
                    <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">Artifact Name</th>
                    <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">Type</th>
                    <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">Size</th>
                    <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider">Quality QA</th>
                    <th className="p-4 text-xs font-bold text-[#64748b] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredArtifacts.map((artifact) => (
                    <motion.tr 
                      key={artifact.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-[#1e293b]/50 hover:bg-[#1e293b]/30 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {artifact.type === "code" && <FileCode2 className="w-5 h-5 text-[#3b82f6]" />}
                          {artifact.type === "document" && <FileText className="w-5 h-5 text-purple-400" />}
                          {artifact.type === "image" && <ImageIcon className="w-5 h-5 text-emerald-400" />}
                          {artifact.type === "log" && <TerminalSquare className="w-5 h-5 text-amber-400" />}
                          <span className="text-white font-medium text-sm">{artifact.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs bg-[#1e293b] text-[#94a3b8] px-2 py-1 rounded capitalize">
                          {artifact.type}
                        </span>
                      </td>
                      <td className="p-4 text-[#94a3b8] text-sm">{artifact.size}</td>
                      <td className="p-4">
                        {artifact.status === "passed" ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold bg-emerald-400/10 w-max px-2 py-1 rounded">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-amber-400/10 w-max px-2 py-1 rounded">
                            <ShieldCheck className="w-3.5 h-3.5" /> Warning
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-[#94a3b8] hover:text-white bg-[#1e293b] hover:bg-[#334155] rounded transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* Modals */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0f19]/80 backdrop-blur-sm px-4">
          <div className="bg-[#141b2d] border border-[#1e293b] rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Github className="w-5 h-5" /> GitHub Execution
            </h3>
            <div className="text-[#94a3b8] text-sm mb-6 space-y-2">
              <p>Simulating GitHub push workflow...</p>
              <div className="bg-[#0b0f19] p-3 rounded-xl border border-[#1e293b] font-mono text-xs">
                <div className="text-[#3b82f6]">&gt; Generating secure token...</div>
                <div className="text-emerald-400">&gt; Preparing commit: "feat: mission complete"</div>
                <div className="text-amber-400">&gt; Permission currently unavailable for direct push.</div>
                <div className="text-[#64748b]">&gt; Outputting commit logs to Artifact Center instead.</div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setShowGithubModal(false)} className="bg-[#1e293b] hover:bg-[#334155] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showDownloadModal && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-emerald-500"></div>
            <span className="text-emerald-400 font-bold text-sm">Packaging Project ZIP...</span>
          </div>
        </div>
      )}
    </div>
  );
}
