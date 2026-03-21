// Auto-copied from root report-v2.ts — canonical V2 report types

export type ReportMode = "partial_reveal" | "full";

export type GateState =
  | "otp_required"
  | "otp_submitting"
  | "otp_invalid"
  | "otp_expired"
  | "unlocked";

export interface ReportEnvelope {
  version: "findings_v2";
  mode: ReportMode;
  meta: ReportMeta;
  verdict: VerdictHeader;
  topFindings: Finding[];
  coverageMap: CoverageRow[];
  actionPlan?: ActionPlan;
  evidenceExplorer?: EvidenceExplorer;
  benchmarks?: BenchmarksSection;
  appendix?: AppendixSection;
}

export interface ReportMeta {
  analysisId: string;
  leadId?: string | null;
  generatedAtIso: string;
  rulesetVersion: string;
  countyVersion?: string | null;
  scannerVersion?: string | null;
  render: {
    partialReveal: boolean;
    evidenceBlurred: boolean;
    benchmarksVisible: boolean;
    appendixVisible: boolean;
  };
  trustSignals: {
    documentVerified: boolean;
    multiPageAnalyzed: boolean;
    contractorIdentified: boolean;
    ocrReadQuality: "excellent" | "great" | "good" | "fair" | "limited";
    confidenceBand: "high" | "medium" | "low";
  };
}

export type Grade = "A" | "B" | "C" | "D" | "F";

export type RiskPostureChip =
  | "overpriced"
  | "scope_gaps"
  | "risky_clauses"
  | "warranty_imbalance"
  | "compliance_unclear"
  | "identity_concern"
  | "well_specified"
  | "fair_pricing_visible";

export interface VerdictHeader {
  grade: Grade;
  stanceLine: string;
  postureChips: RiskPostureChip[];
  summaryCounts: {
    critical: number;
    caution: number;
    confirmed: number;
  };
}

export type FindingSeverity = "critical" | "caution" | "confirmed";

export type FindingType =
  | "cost_risk"
  | "scope_risk"
  | "compliance_safety_risk"
  | "contract_fine_print_risk"
  | "warranty_risk"
  | "identity_legitimacy_risk";

export type ImpactReduction = "high" | "medium" | "low";

export interface Finding {
  id: string;
  type: FindingType;
  severity: FindingSeverity;
  title: string;
  whyItMatters: string;
  whatToDo: ActionItem[];
  impactReduction: ImpactReduction;
  evidencePreview: EvidencePreviewItem[];
  evidenceRefs: string[];
  triggeredBySignals: string[];
  coverageDomains: CoverageDomain[];
  previewSafe: boolean;
  sortScore: number;
}

export interface ActionItem {
  id: string;
  label: string;
  priority: "high" | "medium" | "low";
  previewVisible: boolean;
}

export interface EvidencePreviewItem {
  id: string;
  kind: "ocr_text" | "extracted_field" | "benchmark" | "derived_calc" | "missing_from_quote";
  label: string;
  previewVisible: boolean;
  blurredInPreview: boolean;
}

export interface EvidenceExplorer {
  items: EvidenceItem[];
}

export interface EvidenceItem {
  id: string;
  findingId: string;
  kind: "ocr_text" | "extracted_field" | "benchmark" | "derived_calc" | "missing_from_quote";
  label: string;
  sourceText?: string;
  fieldKey?: string;
  fieldValue?: string | number | boolean | null;
  page?: number;
  benchmark?: {
    label: string;
    value: string;
    region?: string;
  };
  previewVisible: boolean;
  blurredInPreview: boolean;
}

export type CoverageDomain =
  | "scope"
  | "compliance"
  | "pricing"
  | "contract"
  | "warranty"
  | "identity";

export type CoverageStatus =
  | "confirmed"
  | "needs_clarification"
  | "not_visible_in_quote";

export interface CoverageRow {
  domain: CoverageDomain;
  status: CoverageStatus;
  linkedFindingIds: string[];
}

export interface ActionPlan {
  renegotiationAsks: ActionItem[];
  contractorQuestions: ActionItem[];
  doNotSignChecklist: ActionItem[];
  nextStepOptions: Array<"renegotiate" | "get_another_quote" | "proceed_carefully">;
}

export interface BenchmarksSection {
  pricePerOpening?: number | null;
  localRange?: {
    low: number;
    high: number;
    unit: "usd_per_opening";
    regionLabel: string;
  } | null;
  marketDeviationPct?: number | null;
  benchmarkConfidence: "high" | "medium" | "low";
  notes: string[];
}

export interface AppendixSection {
  allFindings: Finding[];
  signalAuditTrail: SignalAuditItem[];
  analysisTimestampIso: string;
  rulesetVersion: string;
}

export interface SignalAuditItem {
  key: string;
  status: "present" | "missing" | "unclear" | "negative" | "derived";
  value?: string | number | boolean | null;
  confidence?: number | null;
  evidenceRefs: string[];
}
