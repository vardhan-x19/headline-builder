import HeroSection from "@/components/HeroSection";
import WorkflowSection from "@/components/WorkflowSection";
import VulnerabilitiesSection from "@/components/VulnerabilitiesSection";
import ThreatModelSection from "@/components/ThreatModelSection";
import FindingsSection from "@/components/FindingsSection";
import MitigationSection from "@/components/MitigationSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <WorkflowSection />
      <ThreatModelSection />
      <VulnerabilitiesSection />
      <FindingsSection />
      <MitigationSection />
      <FooterSection />
    </div>
  );
};

export default Index;
