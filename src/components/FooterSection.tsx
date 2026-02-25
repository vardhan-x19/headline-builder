import { Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-primary" />
          <span className="font-mono text-sm text-primary font-semibold">CloudSec Research</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-lg mx-auto">
          Based on "Understanding the Security Risks of Websites Using Cloud Storage for Direct User File Uploads" — IEEE TIFS, Vol. 20, 2025. Chen et al.
        </p>
        <p className="text-xs text-muted-foreground mt-4">
          Project Prototype — Research Visualization
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
