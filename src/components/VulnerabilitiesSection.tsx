import { motion } from "framer-motion";
import { ShieldAlert, Clock, FileWarning, FileX2, Eye, MessageSquareWarning } from "lucide-react";

const vulnerabilities = [
  {
    id: "V1",
    icon: ShieldAlert,
    title: "Unrestricted Upload Credential Acquisition",
    severity: "Critical",
    severityColor: "text-destructive",
    description: "Web server provides upload credentials without verifying user identity, enabling mass credential harvesting and resource-consumption attacks.",
    impact: "High cloud bills, storage abuse, DoS attacks",
  },
  {
    id: "V2",
    icon: Clock,
    title: "Upload Credentials Validity Flaw",
    severity: "High",
    severityColor: "text-cyber-orange",
    description: "Credentials with excessive validity periods or missing expiration checks allow prolonged unauthorized access and credential reuse.",
    impact: "Extended attack window, credential reuse",
  },
  {
    id: "V3",
    icon: FileWarning,
    title: "Unrestricted File Types & Size",
    severity: "High",
    severityColor: "text-cyber-orange",
    description: "Missing file type and size restrictions in upload policies allow uploading of malicious files (executables, scripts) or excessively large files.",
    impact: "Malware hosting, storage exhaustion",
  },
  {
    id: "V4",
    icon: FileX2,
    title: "File Overwriting",
    severity: "Critical",
    severityColor: "text-destructive",
    description: "Attackers can modify file storage paths to overwrite other users' files in cloud storage, causing data loss or content manipulation.",
    impact: "Data loss, content tampering, user harm",
  },
  {
    id: "V5",
    icon: Eye,
    title: "File Stealing",
    severity: "Critical",
    severityColor: "text-destructive",
    description: "Improper access controls allow attackers to access or download other users' files from cloud storage by manipulating file path parameters.",
    impact: "Privacy breach, data exfiltration",
  },
  {
    id: "V6",
    icon: MessageSquareWarning,
    title: "Callback Notification Spoofing",
    severity: "High",
    severityColor: "text-cyber-orange",
    description: "Missing or improper callback signature verification allows attackers to forge or tamper with upload result notifications to the web server.",
    impact: "Data integrity compromise, fake uploads",
  },
];

const VulnerabilitiesSection = () => {
  return (
    <section className="py-24 px-6 relative bg-gradient-cyber">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-destructive tracking-widest uppercase">Vulnerability Analysis</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-foreground">
            Six New <span className="text-gradient-warning">Vulnerability Types</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Systematic analysis of cloud storage upload interactions reveals six distinct vulnerability categories threatening web security.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vulnerabilities.map((vuln, i) => (
            <motion.div
              key={vuln.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 h-full hover:border-glow transition-all duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <vuln.icon className="w-5 h-5 text-destructive" />
                    </div>
                    <span className="font-mono text-lg font-bold text-primary">{vuln.id}</span>
                  </div>
                  <span className={`font-mono text-xs font-semibold ${vuln.severityColor}`}>
                    {vuln.severity}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{vuln.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{vuln.description}</p>
                <div className="pt-3 border-t border-border">
                  <span className="text-xs font-mono text-muted-foreground">Impact: </span>
                  <span className="text-xs text-foreground">{vuln.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VulnerabilitiesSection;
