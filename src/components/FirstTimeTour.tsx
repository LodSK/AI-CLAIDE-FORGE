import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Network, Rocket, Bot, GitCommit, Settings, Check, X } from "lucide-react";

interface FirstTimeTourProps {
  onComplete: () => void;
}

const TOUR_STEPS = [
  {
    title: "Welcome to AI Forge OS",
    description: "Your intelligent engineering platform. Let's take a quick tour to get you oriented.",
    icon: Network,
    color: "text-[#3b82f6]",
    bg: "bg-[#3b82f6]/10"
  },
  {
    title: "Forge Flow",
    description: "The primary journey. Forge Flow guides you through the entire lifecycle from idea to deployment.",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/10"
  },
  {
    title: "Phoenix AI Guide",
    description: "Your personal AI mentor. Phoenix will help you build your application and answer your questions.",
    icon: Bot,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Project Progress",
    description: "Track your completion percentage, see your current stage, and know what's coming next.",
    icon: GitCommit,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Developer Mode",
    description: "When you are ready for advanced tools like Developer Console and AI Agents, toggle Developer Mode in the top right.",
    icon: Settings,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  }
];

export default function FirstTimeTour({ onComplete }: FirstTimeTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const step = TOUR_STEPS[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0f19]/80 backdrop-blur-sm px-4">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="bg-[#141b2d] border border-[#1e293b] rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
      >
        <button 
          onClick={onComplete}
          className="absolute top-4 right-4 p-2 text-[#64748b] hover:text-white transition-colors rounded-full hover:bg-[#1e293b]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${step.bg} border border-[#1e293b]`}>
            <Icon className={`w-10 h-10 ${step.color}`} />
          </div>

          <h2 className="text-2xl font-extrabold text-white mb-3">
            {step.title}
          </h2>
          <p className="text-[#94a3b8] leading-relaxed mb-8">
            {step.description}
          </p>

          <div className="flex items-center gap-2 mb-8">
            {TOUR_STEPS.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all ${idx === currentStep ? 'w-8 bg-[#3b82f6]' : 'w-2 bg-[#1e293b]'}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#3b82f6]/20"
          >
            {currentStep === TOUR_STEPS.length - 1 ? (
              <>Get Started <Check className="w-5 h-5" /></>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
