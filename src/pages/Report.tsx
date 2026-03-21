import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FindingsPageShell } from "@/components/findings-gate/FindingsPageShell";
import { getFixture, type FixtureKey } from "@/lib/report-fixtures";
import type { ReportEnvelope, ReportMode, GateState } from "@/types/report-v2";

export default function Report() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const fixtureParam = searchParams.get("fixture") as FixtureKey | null;
  const modeParam = searchParams.get("mode") as ReportMode | null;
  const gateParam = searchParams.get("gate") as GateState | null;
  const showDev = searchParams.get("dev") === "1";

  const [report, setReport] = useState<ReportEnvelope | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialGateState, setInitialGateState] = useState<GateState>(gateParam || "otp_required");
  const isDemoMode = sessionId === "demo";

  useEffect(() => {
    async function loadReport() {
      setIsLoading(true);
      setError(null);
      try {
        const resolvedMode = modeParam || "partial_reveal";
        if (fixtureParam && fixtureParam in { grade_d: 1, grade_b: 1, demo: 1 }) {
          setReport(getFixture(fixtureParam, resolvedMode));
          setIsLoading(false);
          return;
        }
        if (isDemoMode) {
          setReport(getFixture("demo", resolvedMode));
          setIsLoading(false);
          return;
        }
        // Fallback to Grade D fixture until real data is wired
        setReport(getFixture("grade_d", resolvedMode));
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to load report:", err);
        setError("Something went wrong loading your report.");
        setIsLoading(false);
      }
    }
    loadReport();
  }, [sessionId, fixtureParam, modeParam, isDemoMode]);

  useEffect(() => {
    if (gateParam) setInitialGateState(gateParam);
  }, [gateParam]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 mx-auto rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
          <p className="text-sm text-slate-500">Loading your report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#0A0F1A] flex items-center justify-center">
        <div className="text-center space-y-3 max-w-sm">
          <p className="text-lg font-semibold text-white">Report Not Found</p>
          <p className="text-sm text-slate-400">{error || "We couldn't find a report for this session."}</p>
          <a href="/" className="inline-block mt-4 rounded-lg bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 ring-1 ring-white/10 hover:bg-white/10 transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0F1A]">
      <header className="border-b border-white/5 bg-[#0A0F1A]/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="text-lg font-bold text-white" style={{ letterSpacing: "-0.03em" }}>
              <span className="text-[#1A6FD4]">Window</span>Man
            </a>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 hidden sm:inline">AI Quote Analysis</span>
          </div>
          {isDemoMode && (
            <span className="rounded-md bg-amber-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">Demo Report</span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-wider">
            Report ID: WM-{(sessionId || "demo").slice(0, 8).toUpperCase()}
          </p>
          <p className="text-[11px] text-slate-600">
            {new Date(report.meta.generatedAtIso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
        <FindingsPageShell report={report} isDemoMode={isDemoMode} initialGateState={initialGateState} />
      </main>

      {showDev && <DevControls sessionId={sessionId} searchParams={searchParams} setSearchParams={setSearchParams} />}
    </div>
  );
}

function DevControls({ sessionId, searchParams, setSearchParams }: { sessionId?: string; searchParams: URLSearchParams; setSearchParams: (params: URLSearchParams) => void }) {
  const currentFixture = searchParams.get("fixture") || "grade_d";
  const currentMode = searchParams.get("mode") || "partial_reveal";
  const currentGate = searchParams.get("gate") || "otp_required";

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    next.set(key, value);
    next.set("dev", "1");
    setSearchParams(next);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] rounded-xl bg-slate-950 ring-1 ring-white/10 p-4 shadow-2xl w-72">
      <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-3">Dev Controls</p>
      <div className="mb-3">
        <p className="text-[10px] text-slate-500 mb-1">Fixture</p>
        <div className="flex rounded-lg bg-slate-900 p-0.5 gap-0.5">
          {(["grade_d", "grade_b", "demo"] as const).map((key) => (
            <button key={key} onClick={() => updateParam("fixture", key)} className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${currentFixture === key ? "bg-cyan-500/15 text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>
              {key.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[10px] text-slate-500 mb-1">Mode</p>
        <div className="flex rounded-lg bg-slate-900 p-0.5 gap-0.5">
          {(["partial_reveal", "full"] as ReportMode[]).map((mode) => (
            <button key={mode} onClick={() => updateParam("mode", mode)} className={`flex-1 rounded-md px-2 py-1.5 text-[10px] font-medium transition-colors ${currentMode === mode ? "bg-cyan-500/15 text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}>
              {mode.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <p className="text-[10px] text-slate-500 mb-1">Gate State</p>
        <div className="flex flex-wrap rounded-lg bg-slate-900 p-0.5 gap-0.5">
          {(["otp_required", "otp_submitting", "otp_invalid", "otp_expired", "unlocked"] as GateState[]).map((gate) => (
            <button key={gate} onClick={() => updateParam("gate", gate)} className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${currentGate === gate ? "bg-orange-500/15 text-orange-400" : "text-slate-500 hover:text-slate-300"}`}>
              {gate.replace("otp_", "").replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 pt-2 mt-2">
        <p className="text-[10px] text-slate-600">Session: {sessionId || "none"}</p>
      </div>
    </div>
  );
}
