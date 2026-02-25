import { motion } from "framer-motion";

const stats = [
  { value: "500", label: "Top Alexa Websites Analyzed", suffix: "" },
  { value: "182", label: "Using Cloud Storage (36.4%)", suffix: "" },
  { value: "28", label: "Websites with User Uploads", suffix: "" },
  { value: "79", label: "New Vulnerabilities Found", suffix: "" },
  { value: "100", label: "All 28 Sites Vulnerable", suffix: "%" },
  { value: "6", label: "New Vulnerability Types", suffix: "" },
];

const findings = [
  "All 28 evaluated websites exhibited at least one of the six vulnerability types",
  "V1 (Unrestricted Upload Credential Acquisition) is the most common vulnerability",
  "Google, Reddit, CSDN among the affected major websites that responded positively",
  "Academia awarded bug bounties for the discovered vulnerabilities",
  "Cloud storage services used by 36.4% of the top 500 Alexa websites",
  "Root causes stem from improper access control and missing policy enforcement",
];

const FindingsSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase">Measurement Results</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Key <span className="text-gradient-cyber">Findings</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-5 text-center hover:border-glow transition-all duration-500"
            >
              <div className="text-3xl font-black text-primary font-mono">
                {stat.value}<span className="text-lg">{stat.suffix}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-2 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Findings List */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3">
            {findings.map((finding, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border"
              >
                <span className="font-mono text-xs text-primary font-bold mt-0.5 shrink-0">
                  [{String(i + 1).padStart(2, "0")}]
                </span>
                <p className="text-sm text-secondary-foreground">{finding}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindingsSection;
