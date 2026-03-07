import { useState, useEffect, useRef } from "react";
import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import SocialProofStrip from "@/components/SocialProofStrip";
import TruthGateFlow from "@/components/TruthGateFlow";
import UploadZone from "@/components/UploadZone";
import ScanTheatrics from "@/components/ScanTheatrics";
import GradeReveal from "@/components/GradeReveal";
import ContractorMatch from "@/components/ContractorMatch";
import EvidenceLocker from "@/components/EvidenceLocker";
import IndustryTruth from "@/components/IndustryTruth";
import ProcessSteps from "@/components/ProcessSteps";
import NarrativeProof from "@/components/NarrativeProof";
import ClosingManifesto from "@/components/ClosingManifesto";
import StickyRecoveryBar from "@/components/StickyRecoveryBar";

const mockAuditResult = {
  grade: "C",
  dollarDelta: 4800,
  county: "Broward",
  fairPriceLow: 12600,
  fairPriceHigh: 14200,
  firstName: "Maria",
  flags: [
    { id: 1, severity: "red" as const, label: "No Window Brand Specified", detail: "Your contractor can install any brand at any quality level.", tip: "Ask: 'What specific brand and model will you install?'" },
    { id: 2, severity: "amber" as const, label: "Labor Warranty: 1 Year Only", detail: "Industry standard is 2–5 years for this project type.", tip: "Negotiate: Request minimum 3-year labor warranty in writing." },
    { id: 3, severity: "amber" as const, label: "Payment Schedule: 50% Deposit", detail: "Deposits above 40% before work begins carry financial risk.", tip: "Counter with: 30% deposit, 40% at midpoint, 30% on completion." },
    { id: 4, severity: "green" as const, label: "Permit Cost Included", detail: "Permit fees are correctly included in your contract total.", tip: null },
  ],
};

const Index = () => {
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [gradeRevealed, setGradeRevealed] = useState(false);
  const [contractorMatchVisible, setContractorMatchVisible] = useState(false);

  // Recovery bar state
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const [selectedCounty, setSelectedCounty] = useState("your county");
  const [recoveryBarDismissed, setRecoveryBarDismissed] = useState(() =>
    localStorage.getItem("wm_recovery_bar_dismissed") === "true"
  );
  const [scrolledPast70, setScrolledPast70] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(false);

  // 30-second timer
  useEffect(() => {
    const timer = setTimeout(() => setTimeOnPage(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  // Scroll listener for 70%
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.7) setScrolledPast70(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showRecoveryBar =
    scrolledPast70 && !leadCaptured && timeOnPage && !recoveryBarDismissed && !gradeRevealed;

  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />

      {!gradeRevealed && (
        <>
          <AuditHero />
          <SocialProofStrip />
          <TruthGateFlow
            onLeadCaptured={() => setLeadCaptured(true)}
            onStepChange={(step, county) => {
              setStepsCompleted(step);
              setSelectedCounty(county);
            }}
          />
          <UploadZone
            isVisible={leadCaptured}
            onScanStart={() => {
              setFileUploaded(true);
            }}
          />
        </>
      )}

      {fileUploaded && !gradeRevealed && (
        <ScanTheatrics
          isActive={true}
          selectedCounty={mockAuditResult.county}
          onRevealComplete={() => {
            setGradeRevealed(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
            console.log({
              event: "wm_grade_revealed",
              grade: mockAuditResult.grade,
              dollarDelta: mockAuditResult.dollarDelta,
              flagCount: mockAuditResult.flags.length,
            });
          }}
        />
      )}

      {gradeRevealed && (
        <>
          <GradeReveal
            {...mockAuditResult}
            onContractorMatchClick={() => {
              setContractorMatchVisible(true);
              setTimeout(() => {
                document.getElementById("contractor-match")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
          />
          <ContractorMatch
            isVisible={contractorMatchVisible}
            county={mockAuditResult.county}
            grade={mockAuditResult.grade}
            dollarDelta={mockAuditResult.dollarDelta}
          />
          <EvidenceLocker
            grade={mockAuditResult.grade}
            county={mockAuditResult.county}
            dollarDelta={mockAuditResult.dollarDelta}
            firstName={mockAuditResult.firstName}
            redFlagCount={mockAuditResult.flags.filter(f => f.severity === "red").length}
            amberCount={mockAuditResult.flags.filter(f => f.severity === "amber").length}
            greenCount={mockAuditResult.flags.filter(f => f.severity === "green").length}
          />
        </>
      )}

      <IndustryTruth />
      <ProcessSteps />
      <NarrativeProof />
      <ClosingManifesto />

      <StickyRecoveryBar
        stepsCompleted={stepsCompleted}
        county={selectedCounty}
        isVisible={showRecoveryBar}
        onDismiss={() => setRecoveryBarDismissed(true)}
      />
    </div>
  );
};

export default Index;
