import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import IndustryTruth from "@/components/IndustryTruth";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />
      <AuditHero />
      <SocialProofStrip />
      <TruthGateFlow />
      <IndustryTruth />
    </div>
  );
};

export default Index;
