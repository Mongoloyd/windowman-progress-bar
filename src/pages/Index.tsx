import { useState } from "react";
import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import UploadZone from "@/components/UploadZone";
import IndustryTruth from "@/components/IndustryTruth";
import ProcessSteps from "@/components/ProcessSteps";
import NarrativeProof from "@/components/NarrativeProof";

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />
      <AuditHero />
      <SocialProofStrip />
      <TruthGateFlow onLeadCaptured={() => setShowUpload(true)} />
      <UploadZone isVisible={showUpload} />
      <IndustryTruth />
      <ProcessSteps />
      <NarrativeProof />
    </div>
  );
};

export default Index;
