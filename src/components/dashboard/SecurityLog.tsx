import { Shield, CheckCircle2, AlertTriangle } from "lucide-react";

const checks = [
  { label: "User Identity Verification (V1)", status: "active", desc: "Authentication required before credential dispatch" },
  { label: "Credential Expiration (V2)", status: "active", desc: "Upload tokens expire after single use" },
  { label: "File Type Restriction (V3)", status: "active", desc: "Only approved MIME types accepted" },
  { label: "File Size Limit (V3)", status: "active", desc: "10MB maximum per upload" },
  { label: "Path Sandboxing (V4)", status: "active", desc: "Files stored in user-isolated directories" },
  { label: "Access Control (V5)", status: "active", desc: "RLS policies prevent cross-user file access" },
  { label: "Callback Verification (V6)", status: "info", desc: "Server-side callback signature validation" },
];

const SecurityLog = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Security Status</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Active mitigations based on the 6 vulnerability types (V1–V6) from the research
        </p>
      </div>

      <div className="space-y-3">
        {checks.map((check) => (
          <div key={check.label} className="bg-card border border-border rounded-lg p-4 flex items-start gap-4 hover:border-glow transition-all">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              check.status === "active" ? "bg-accent/10" : "bg-warning/10"
            }`}>
              {check.status === "active" ? (
                <CheckCircle2 className="w-4 h-4 text-accent" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-warning" />
              )}
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">{check.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{check.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="text-foreground font-semibold">Research Reference</h3>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          These security measures implement the mitigations proposed in{" "}
          <span className="text-primary font-mono text-xs">"Understanding the Security Risks of Websites Using Cloud Storage for Direct User File Uploads"</span>{" "}
          (IEEE TIFS 2025, Chen et al.). The system addresses all six vulnerability types V1–V6 identified in the study of 500 Alexa-ranked websites.
        </p>
      </div>
    </div>
  );
};

export default SecurityLog;
