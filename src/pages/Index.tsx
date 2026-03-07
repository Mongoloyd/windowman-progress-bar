import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import IndustryTruth from "@/components/IndustryTruth";
import ProcessSteps from "@/components/ProcessSteps";
import NarrativeProof from "@/components/NarrativeProof";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />
      <AuditHero />
      <SocialProofStrip />
      <TruthGateFlow />
      <IndustryTruth />
      <ProcessSteps />
      <NarrativeProof />
    </div>
  );
};

export default Index;
