import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LinearHeader from "@/components/LinearHeader";
import AuditHero from "@/components/AuditHero";
import FlowBEntry from "@/components/FlowBEntry";
import MarketBaselineTool from "@/components/MarketBaselineTool";
import ForensicChecklist from "@/components/ForensicChecklist";
import QuoteWatcher from "@/components/QuoteWatcher";
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
import MarketMakerManifesto from "@/components/MarketMakerManifesto";
import StickyRecoveryBar from "@/components/StickyRecoveryBar";
import InteractiveDemoScan from "@/components/InteractiveDemoScan";
import ExitIntentModal from "@/components/ExitIntentModal";
import ScamConcernImage from "@/components/ScamConcernImage";

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
  // SET TO FALSE BEFORE DEPLOYING TO PRODUCTION
  const IS_DEV_MODE = true;

  // ── Flow mode ──
  const [flowMode, setFlowMode] = useState<'A' | 'B'>('A');

  // ── Flow A state ──
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [gradeRevealed, setGradeRevealed] = useState(false);
  const [contractorMatchVisible, setContractorMatchVisible] = useState(false);

  // ── Flow B state ──
  const [flowBLeadCaptured, setFlowBLeadCaptured] = useState(false);
  const [baselineRevealed, setBaselineRevealed] = useState(false);
  const [quoteWatcherSet, setQuoteWatcherSet] = useState(false);
  const [flowBAnswers, setFlowBAnswers] = useState({
    county: "",
    windowCount: "",
    windowType: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  // ── Recovery bar state ──
  const [powerToolTriggered, setPowerToolTriggered] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const [selectedCounty, setSelectedCounty] = useState("your county");
  const [recoveryBarDismissed, setRecoveryBarDismissed] = useState(() =>
    localStorage.getItem("wm_recovery_bar_dismissed") === "true"
  );
  const [scrolledPast70, setScrolledPast70] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimeOnPage(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent >= 0.7) setScrolledPast70(true);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Recovery bar visibility ──
  const anyLeadCaptured = flowMode === 'A' ? leadCaptured : flowBLeadCaptured;
  const flowBComplete = flowMode === 'B' && quoteWatcherSet;
  const showRecoveryBar =
    IS_DEV_MODE || (scrolledPast70 && !anyLeadCaptured && timeOnPage && !recoveryBarDismissed && !gradeRevealed && !flowBComplete);

  // ── Pending scroll ref for race-condition-safe scrolling ──
  const pendingScrollRef = useRef(false);

  // ── Centralized conversion trigger ──
  const triggerTruthGate = (source: string) => {
    if (gradeRevealed) {
      setGradeRevealed(false);
      setFileUploaded(false);
      setContractorMatchVisible(false);
    }
    if (flowMode !== 'A') {
      setFlowMode('A');
    }
    pendingScrollRef.current = true;
    console.log({ event: 'wm_truth_gate_triggered', source });
  };

  // ── Scroll to truth-gate after render ──
  useEffect(() => {
    if (pendingScrollRef.current && flowMode === 'A' && !gradeRevealed) {
      const el = document.getElementById("truth-gate");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        pendingScrollRef.current = false;
      }
    }
  }, [flowMode, gradeRevealed]);

  // ── Flow A→B / B→A helpers ──
  const switchToFlowA = (triggeredFrom: string) => {
    setFlowMode('A');
    console.log({ event: 'wm_flow_b_to_a_transition', triggeredFrom });
    pendingScrollRef.current = true;
  };

  return (
    <div className="min-h-screen bg-background">
      <LinearHeader />

      {!gradeRevealed && (
        <>
          <AnimatePresence mode="wait">
            {flowMode === 'A' ? (
              <motion.div
                key="flow-a-hero"
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AuditHero
                  onFlowBClick={() => {
                    setFlowMode('B');
                    console.log({ event: 'wm_flow_b_entered' });
                    setTimeout(() => {
                      document.getElementById("flow-b")?.scrollIntoView({ behavior: "smooth" });
                    }, 400);
                  }}
                  onUploadQuote={() => triggerTruthGate('power_tool_demo')}
                  triggerPowerTool={powerToolTriggered}
                  onPowerToolClose={() => setPowerToolTriggered(false)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="flow-b-entry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
              <FlowBEntry
                  onContinueToTool={() => {
                    document.getElementById("market-baseline")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onSwitchToFlowA={() => switchToFlowA('hero_switch')}
                />
                <ScamConcernImage />
                <MarketBaselineTool
                  onStepComplete={(step, answer) => {
                    setStepsCompleted(step);
                  }}
                  onLeadCaptured={(answers) => {
                    setFlowBLeadCaptured(true);
                    setFlowBAnswers(prev => ({ ...prev, ...answers }));
                  }}
                  onBaselineRevealed={() => {
                    setBaselineRevealed(true);
                  }}
                  onChecklistClick={() => {
                    console.log({ event: 'wm_checklist_opened' });
                    document.getElementById("forensic-checklist")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onReminderClick={() => {
                    document.getElementById("quote-watcher")?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
                {flowBLeadCaptured && (
                  <>
                    <ForensicChecklist
                      onUploadQuote={() => switchToFlowA('checklist_cta')}
                      onSetReminder={() => {
                        document.getElementById("quote-watcher")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    />
                    <QuoteWatcher
                      onReminderSet={(date, time) => {
                        setQuoteWatcherSet(true);
                        setFlowBAnswers(prev => ({ ...prev, appointmentDate: date, appointmentTime: time }));
                      }}
                      onSwitchToFlowA={() => switchToFlowA('watcher_link')}
                      onViewChecklist={() => {
                        document.getElementById("forensic-checklist")?.scrollIntoView({ behavior: "smooth" });
                      }}
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {flowMode === 'A' && (
            <>
              <SocialProofStrip />
              <ScamConcernImage />
              <InteractiveDemoScan onScanClick={() => triggerTruthGate('demo_scan')} />
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
            onSecondScan={() => triggerTruthGate('second_opinion_scan')}
            redFlagCount={mockAuditResult.flags.filter(f => f.severity === "red").length}
            amberCount={mockAuditResult.flags.filter(f => f.severity === "amber").length}
            greenCount={mockAuditResult.flags.filter(f => f.severity === "green").length}
          />
        </>
      )}

      <IndustryTruth onScanClick={() => triggerTruthGate('industry_truth')} />
      <MarketMakerManifesto />
      <ProcessSteps onScanClick={() => triggerTruthGate('process_steps')} />
      <NarrativeProof onScanClick={() => triggerTruthGate('narrative_proof')} />
      <ClosingManifesto onScanClick={() => triggerTruthGate('closing_manifesto')} />

      <ExitIntentModal
        stepsCompleted={stepsCompleted}
        flowMode={flowMode as 'A' | 'B' | 'C'}
        leadCaptured={leadCaptured}
        flowBLeadCaptured={flowBLeadCaptured}
        county={selectedCounty}
        answers={{
          windowCount: null,
          projectType: null,
          county: selectedCounty !== "your county" ? selectedCounty : null,
          quoteStage: null,
          firstName: null,
          email: null,
          phone: null,
        }}
        onClose={() => {}}
        onCTAClick={() => {
          setPowerToolTriggered(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <StickyRecoveryBar
        stepsCompleted={stepsCompleted}
        county={selectedCounty}
        isVisible={showRecoveryBar || (IS_DEV_MODE && gradeRevealed)}
        onDismiss={() => setRecoveryBarDismissed(true)}
        flowMode={flowMode}
        flowBLeadCaptured={flowBLeadCaptured}
        quoteWatcherSet={quoteWatcherSet}
        onDemoCTAClick={() => {
          setPowerToolTriggered(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        leadCaptured={leadCaptured}
        isDevMode={IS_DEV_MODE}
        gradeRevealed={gradeRevealed}
        onContractorMatchClick={() => {
          setContractorMatchVisible(true);
          setTimeout(() => {
            document.getElementById("contractor-match")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />
    </div>
  );
};

export default Index;
