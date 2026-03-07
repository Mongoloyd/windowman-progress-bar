import { useState } from "react";
import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import UploadZone from "@/components/UploadZone";
import ScanTheatrics from "@/components/ScanTheatrics";
import GradeReveal from "@/components/GradeReveal";
import IndustryTruth from "@/components/IndustryTruth";
import ProcessSteps from "@/components/ProcessSteps";
import NarrativeProof from "@/components/NarrativeProof";
import ClosingManifesto from "@/components/ClosingManifesto";

const Index = () => {
  const [showUpload, setShowUpload] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [showGradeReveal, setShowGradeReveal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {showGradeReveal ? (
        <>
          <LinearHeader />
          <GradeReveal />
        </>
      ) : (
        <>
          <LinearHeader />
          <AuditHero />
          <SocialProofStrip />
          <TruthGateFlow onLeadCaptured={() => setShowUpload(true)} />
          <UploadZone
            isVisible={showUpload}
            onScanStart={() => {
              console.log("onScanStart fired, setting showScan=true");
              setShowScan(true);
            }}
          />
          <ScanTheatrics
            isActive={showScan}
            onRevealComplete={() => {
              setShowScan(false);
              setShowGradeReveal(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
              console.log({ event: "wm_scan_complete" });
            }}
          />
          <IndustryTruth />
          <ProcessSteps />
          <NarrativeProof />
          <ClosingManifesto />
        </>
      )}
    </div>
  );
};

export default Index;
