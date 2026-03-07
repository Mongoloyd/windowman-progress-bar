import { useState } from "react";
import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import UploadZone from "@/components/UploadZone";
import ScanTheatrics from "@/components/ScanTheatrics";
import IndustryTruth from "@/components/IndustryTruth";
import ProcessSteps from "@/components/ProcessSteps";
import NarrativeProof from "@/components/NarrativeProof";
import ClosingManifesto from "@/components/ClosingManifesto";

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showScan, setShowScan] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />
      <AuditHero />
      <SocialProofStrip />
      <TruthGateFlow onLeadCaptured={() => setShowUpload(true)} />
      <UploadZone
        isVisible={showUpload}
        onScanStart={() => setShowScan(true)}
      />
      <ScanTheatrics
        isActive={showScan}
        onRevealComplete={() => {
          setShowScan(false);
          console.log({ event: "wm_scan_complete" });
        }}
      />
      <IndustryTruth />
      <ProcessSteps />
      <NarrativeProof />
      <ClosingManifesto />
    </div>
  );
};

export default Index;
