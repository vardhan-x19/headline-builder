import { motion } from "framer-motion";
import { Users, Server, Cloud, Skull } from "lucide-react";

const roles = [
  {
    icon: Users,
    name: "Benign User (Bob)",
    desc: "Regular website user who uploads files legitimately through the platform.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Skull,
    name: "Malicious User (Trudy)",
    desc: "Attacker with regular user privileges who intercepts and tampers with HTTP requests.",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: Server,
    name: "Web Server",
    desc: "Manages user authentication, credential dispatch, and callback verification.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Cloud,
    name: "Cloud Storage Service",
    desc: "Stores user files, verifies credentials, and sends callback notifications.",
    color: "text-cyber-purple",
    bgColor: "bg-cyber-purple/10",
  },
];

const attacks = [
  "Intercept HTTP requests for upload credentials",
  "Tamper with upload credential fields (path, filename)",
  "Forge callback notification data packets",
  "Modify file storage paths to target other users",
  "Replay expired or stolen credentials",
  "Upload unrestricted file types and sizes",
];

const ThreatModelSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-destructive tracking-widest uppercase">Threat Model</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Roles & <span className="text-gradient-warning">Attack Vectors</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Four roles interact in the threat model. Trudy, with only regular privileges, can exploit vulnerabilities to compromise the system.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Roles */}
          <div className="space-y-4">
            <h3 className="font-mono text-sm text-primary mb-4 uppercase tracking-wider">Roles</h3>
            {roles.map((role, i) => (
              <motion.div
                key={role.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className={`w-10 h-10 rounded-lg ${role.bgColor} flex items-center justify-center shrink-0`}>
                  <role.icon className={`w-5 h-5 ${role.color}`} />
                </div>
                <div>
                  <h4 className={`font-semibold text-sm ${role.color}`}>{role.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{role.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Attack Vectors */}
          <div>
            <h3 className="font-mono text-sm text-destructive mb-4 uppercase tracking-wider">Attack Capabilities</h3>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-sm text-muted-foreground mb-5">
                Trudy can perform the following actions during a normal file upload operation:
              </p>
              <div className="space-y-3">
                {attacks.map((attack, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-6 h-6 rounded bg-destructive/10 flex items-center justify-center font-mono text-xs text-destructive font-bold shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-secondary-foreground">{attack}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreatModelSection;
