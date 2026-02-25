import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Lock, FileCheck, RefreshCw, KeyRound } from "lucide-react";

const mitigations = [
  {
    icon: ShieldCheck,
    title: "Enforce Identity Verification",
    desc: "Always verify user identity before dispatching upload credentials. Implement rate limiting on credential requests.",
  },
  {
    icon: KeyRound,
    title: "Minimize Credential Validity",
    desc: "Set short expiration times for upload credentials. Use one-time-use tokens where possible.",
  },
  {
    icon: FileCheck,
    title: "Strict File Policy Enforcement",
    desc: "Restrict file types (whitelist approach), enforce maximum file sizes, and validate Content-Type headers.",
  },
  {
    icon: Lock,
    title: "Prevent Path Traversal & Overwriting",
    desc: "Use unique, server-generated file paths. Never trust client-provided file paths or names.",
  },
  {
    icon: CheckCircle2,
    title: "Secure Callback Verification",
    desc: "Verify callback notification signatures cryptographically. Never trust unsigned or tampered notifications.",
  },
  {
    icon: RefreshCw,
    title: "Synchronize State Across Roles",
    desc: "Ensure web server and cloud storage maintain consistent state regarding uploaded files and user permissions.",
  },
];

const MitigationSection = () => {
  return (
    <section className="py-24 px-6 relative bg-gradient-cyber">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Recommendations</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Proposed <span className="text-gradient-cyber">Mitigations</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Actionable defenses to protect cloud storage upload workflows from the identified vulnerabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mitigations.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-glow transition-all duration-500"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <m.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MitigationSection;
