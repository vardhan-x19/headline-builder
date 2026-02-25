import { motion } from "framer-motion";
import { Upload, Key, Bell } from "lucide-react";

const stages = [
  {
    icon: Key,
    number: "01",
    title: "Credential Requesting & Dispatching",
    description:
      "The web user requests upload credentials from the web server. The server verifies user identity and dispatches temporary credentials signed with cloud service access keys.",
    details: ["User sends HTTP request for upload credential", "Web server checks user identity & permissions", "Server generates or requests temporary credential", "Credential returned to the user"],
  },
  {
    icon: Upload,
    number: "02",
    title: "File Uploading & Verification",
    description:
      "The user uploads files directly to cloud storage using the credential. The cloud service verifies credential signature, expiration, and policy constraints.",
    details: ["Direct upload from browser to cloud", "Cloud verifies credential signature", "File properties checked against policy", "No user identity check by cloud service"],
  },
  {
    icon: Bell,
    number: "03",
    title: "Callback Notification & Response",
    description:
      "The cloud storage service or client sends a callback notification to the web server with upload results. The server should verify callback signature integrity.",
    details: ["Cloud or client sends callback to web server", "Notification includes file metadata", "Server verifies callback signature", "Server may manage uploaded objects via API"],
  },
];

const WorkflowSection = () => {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-primary tracking-widest uppercase">Scenario Model</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Three-Stage Upload <span className="text-gradient-cyber">Workflow</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            The direct file upload scenario involves three critical stages between the web user, web server, and cloud storage service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative group"
            >
              <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-glow transition-all duration-500">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stage.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-mono text-sm text-primary">{stage.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{stage.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{stage.description}</p>
                <ul className="space-y-2">
                  {stage.details.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
