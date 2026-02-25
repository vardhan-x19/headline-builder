import { motion } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-cyber opacity-40 blur-3xl" />

      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow mb-8 font-mono text-sm text-primary"
        >
          <Shield className="w-4 h-4" />
          <span>PROJECT PROTOTYPE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl font-black leading-tight mb-6"
        >
          <span className="text-gradient-cyber">Security Risks</span>
          <br />
          <span className="text-foreground">of Cloud Storage</span>
          <br />
          <span className="text-muted-foreground text-3xl md:text-4xl font-medium">
            Direct User File Uploads
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          A systematic study identifying <span className="text-primary font-semibold">6 new vulnerability types</span> across{" "}
          <span className="text-primary font-semibold">28 major websites</span>, discovering{" "}
          <span className="text-primary font-semibold">79 new vulnerabilities</span> in cloud storage upload scenarios.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 font-mono text-xs text-muted-foreground"
        >
          {["IEEE TIFS 2025", "Chen et al.", "Top 500 Alexa", "Google • Reddit • CSDN"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 rounded-md bg-secondary border border-border">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16"
        >
          <ChevronDown className="w-6 h-6 text-primary mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
