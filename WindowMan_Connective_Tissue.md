# WINDOWMAN — CONNECTIVE TISSUE & BACKEND
## The 4 Missing Pieces: State · Supabase · Scan Logic · Webhook
## Feed each numbered section to Lovable as one prompt

---

## PIECE 1 — App.tsx + useFunnelStore (Zustand)

```
Install Zustand if not already installed: npm install zustand

Create a new file: src/store/funnelStore.ts

This is the single source of truth for the entire WindowMan funnel.
Every component reads from this store. Nothing is passed via prop-drilling.

---

PASTE THIS EXACT CODE:

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Flow = 'undecided' | 'A' | 'B' | 'C';
export type FunnelScreen =
  | 'hero'
  | 'gate_step_1' | 'gate_step_2' | 'gate_step_3' | 'gate_step_4'
  | 'micro_verdict'
  | 'lead_gate'
  | 'upload'
  | 'scanning'
  | 'otp'
  | 'grade_reveal'
  | 'contractor_match'
  | 'flow_b_baseline'
  | 'flow_c_leverage';

export interface FunnelAnswers {
  windowCount:   string | null;
  projectType:   string | null;
  zipCode:       string | null;
  countyName:    string | null;
  countySlug:    string | null;
  quoteRange:    string | null;
  processStage:  string | null;
}

export interface LeadData {
  firstName:    string;
  email:        string;
  phone:        string;
  phoneVerified: boolean;
  shadowId:     string | null;
  leadId:       string | null;
}

export interface ScanResult {
  grade:         'A' | 'B' | 'C' | 'D' | 'F' | null;
  dollarDelta:   number | null;
  direction:     'above' | 'below' | 'at' | null;
  flagCount:     number;
  leverageCount: number;
  pillarScores: {
    priceFairness:    number;
    finePrint:        number;
    warrantyValue:    number;
    installClarity:   number;
    safetyCode:       number;
  } | null;
  flags: Array<{
    severity: 'CRITICAL' | 'HIGH' | 'LEVERAGE';
    title:    string;
    body:     string;
    script:   string;
  }>;
}

interface FunnelState {
  // Navigation
  currentScreen:    FunnelScreen;
  activeFlow:       Flow;
  sectionsViewed:   Set<FunnelScreen>;

  // User answers from Truth Gate
  answers:          FunnelAnswers;

  // Lead data
  lead:             LeadData;

  // Scan results
  scanResult:       ScanResult;

  // UTM / attribution
  utmSource:        string | null;
  utmCampaign:      string | null;
  utmCounty:        string | null;

  // Actions
  setScreen:        (screen: FunnelScreen) => void;
  setAnswer:        (key: keyof FunnelAnswers, value: string) => void;
  setCounty:        (name: string, slug: string) => void;
  routeFromStep4:   (answer: string) => void;
  setLeadField:     (key: keyof LeadData, value: string | boolean | null) => void;
  setScanResult:    (result: ScanResult) => void;
  markSectionViewed:(screen: FunnelScreen) => void;
  captureUTM:       () => void;
  reset:            () => void;
}

const initialAnswers: FunnelAnswers = {
  windowCount: null, projectType: null, zipCode: null,
  countyName: null, countySlug: null, quoteRange: null, processStage: null,
};
const initialLead: LeadData = {
  firstName: '', email: '', phone: '', phoneVerified: false,
  shadowId: null, leadId: null,
};
const initialScan: ScanResult = {
  grade: null, dollarDelta: null, direction: null,
  flagCount: 0, leverageCount: 0, pillarScores: null, flags: [],
};

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      currentScreen:   'hero',
      activeFlow:      'undecided',
      sectionsViewed:  new Set(),
      answers:         initialAnswers,
      lead:            initialLead,
      scanResult:      initialScan,
      utmSource:       null,
      utmCampaign:     null,
      utmCounty:       null,

      setScreen: (screen) => set({ currentScreen: screen }),

      setAnswer: (key, value) =>
        set((s) => ({ answers: { ...s.answers, [key]: value } })),

      setCounty: (name, slug) =>
        set((s) => ({ answers: { ...s.answers, countyName: name, countySlug: slug } })),

      // THE HIDDEN FORK — Step 4 routes to Flow A, B, or C
      routeFromStep4: (answer) => {
        let flow: Flow = 'A';
        let screen: FunnelScreen = 'micro_verdict';

        if (answer === "I have a written quote from a contractor") {
          flow = 'A';   // Has quote → scan it
          screen = 'micro_verdict';
        } else if (
          answer === "I got a ballpark number but nothing in writing" ||
          answer === "I have a contractor visit coming up"
        ) {
          flow = 'C';   // Pre-quote → leverage mode
          screen = 'flow_c_leverage';
        } else if (answer === "I'm still in the research phase") {
          flow = 'B';   // No quote → baseline tool
          screen = 'flow_b_baseline';
        }

        set((s) => ({
          activeFlow: flow,
          currentScreen: screen,
          answers: { ...s.answers, processStage: answer },
        }));

        // Fire Facebook pixel event for flow routing
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('trackCustom', 'wm_flow_routed', {
            flow,
            county: get().answers.countyName,
            quote_range: get().answers.quoteRange,
          });
        }
      },

      setLeadField: (key, value) =>
        set((s) => ({ lead: { ...s.lead, [key]: value } })),

      setScanResult: (result) => set({ scanResult: result }),

      markSectionViewed: (screen) =>
        set((s) => ({ sectionsViewed: new Set([...s.sectionsViewed, screen]) })),

      captureUTM: () => {
        const p = new URLSearchParams(window.location.search);
        const countyFromUTM = p.get('utm_term') || p.get('county');

        // Map UTM county codes to names
        const countyMap: Record<string, { name: string; slug: string }> = {
          MDA: { name: 'Miami-Dade', slug: 'miami-dade' },
          BRO: { name: 'Broward',    slug: 'broward'    },
          PLB: { name: 'Palm Beach', slug: 'palm-beach' },
          HCO: { name: 'Hillsborough', slug: 'hillsborough' },
          PIN: { name: 'Pinellas',   slug: 'pinellas'   },
          LEE: { name: 'Lee',        slug: 'lee'        },
          COL: { name: 'Collier',    slug: 'collier'    },
          DUV: { name: 'Duval',      slug: 'duval'      },
          ORA: { name: 'Orange',     slug: 'orange'     },
          BRE: { name: 'Brevard',    slug: 'brevard'    },
          SLU: { name: 'St. Lucie',  slug: 'st-lucie'   },
          ESC: { name: 'Escambia',   slug: 'escambia'   },
          SAR: { name: 'Sarasota',   slug: 'sarasota'   },
        };

        const resolved = countyFromUTM ? countyMap[countyFromUTM.toUpperCase()] : null;

        set({
          utmSource:   p.get('utm_source'),
          utmCampaign: p.get('utm_campaign'),
          utmCounty:   countyFromUTM,
          ...(resolved ? { answers: { ...get().answers, countyName: resolved.name, countySlug: resolved.slug } } : {}),
        });
      },

      reset: () => set({
        currentScreen: 'hero',
        activeFlow: 'undecided',
        sectionsViewed: new Set(),
        answers: initialAnswers,
        lead: initialLead,
        scanResult: initialScan,
      }),
    }),
    {
      name: 'wm-funnel',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (s) => ({
        answers:    s.answers,
        lead:       { ...s.lead, phoneVerified: s.lead.phoneVerified },
        utmSource:  s.utmSource,
        utmCampaign:s.utmCampaign,
        utmCounty:  s.utmCounty,
      }),
    }
  )
);
```

---

Now update App.tsx to use the store and render the correct screen:

```
Replace the contents of src/App.tsx with this:

import { useEffect } from 'react';
import { useFunnelStore } from './store/funnelStore';

import LinearHeader       from './components/LinearHeader';
import AuditHero          from './components/AuditHero';
import DynamicUrgencyStats from './components/DynamicUrgencyStats';
import IndustryTruth      from './components/IndustryTruth';
import TruthGateFlow      from './components/TruthGateFlow';
import NarrativeProof     from './components/NarrativeProof';
import ClosingManifesto   from './components/ClosingManifesto';
import Footer             from './components/Footer';
import UploadZone         from './components/UploadZone';
import ScanTheatrics      from './components/ScanTheatrics';
import OTPGate            from './components/OTPGate';
import GradeReveal        from './components/GradeReveal';
import StickyRecoveryBar  from './components/StickyRecoveryBar';
import ExitIntentModal    from './components/ExitIntentModal';

export default function App() {
  const { currentScreen, captureUTM, answers } = useFunnelStore();

  useEffect(() => {
    captureUTM();
    // Fire page_view pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
      (window as any).fbq('trackCustom', 'wm_page_view', {
        county_prefill: answers.countyName,
      });
    }
  }, []);

  // Full-screen takeover flows — no nav, no footer
  if (currentScreen === 'scanning') return <ScanTheatrics />;
  if (currentScreen === 'otp')      return <OTPGate />;
  if (currentScreen === 'grade_reveal') return (
    <>
      <LinearHeader minimal />
      <GradeReveal />
      <Footer />
    </>
  );

  // Upload screen — has header but no full marketing page
  if (currentScreen === 'upload') return (
    <>
      <LinearHeader minimal />
      <UploadZone />
      <Footer />
    </>
  );

  // Default: full marketing page
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <LinearHeader />
      <main>
        <AuditHero />
        <DynamicUrgencyStats county={answers.countyName || undefined} />
        <IndustryTruth />
        <TruthGateFlow />
        <NarrativeProof />
        <ClosingManifesto />
      </main>
      <Footer />
      <StickyRecoveryBar />
      <ExitIntentModal />
    </div>
  );
}
```

Add a `minimal` prop to LinearHeader that hides the ghost "SIGN IN" button
and only shows the logo + CTA. No other changes to LinearHeader.
```

---

## PIECE 2 — Supabase Schema + submitLead Edge Function

```
In Lovable, go to the Supabase panel and run this SQL migration.
Title it: "windowman_core_schema_v1"

---

-- SHADOW PROFILES (created at Step 2, before email is given)
CREATE TABLE IF NOT EXISTS public.shadow_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      TEXT NOT NULL UNIQUE,
  window_count    TEXT,
  project_type    TEXT,
  zip_code        TEXT,
  county_name     TEXT,
  county_slug     TEXT,
  quote_range     TEXT,
  process_stage   TEXT,
  active_flow     TEXT CHECK (active_flow IN ('A','B','C','undecided')),
  utm_source      TEXT,
  utm_campaign    TEXT,
  utm_county      TEXT,
  abandoned_at    TIMESTAMPTZ,
  converted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- LEADS (created when email + phone submitted at Lead Gate)
CREATE TABLE IF NOT EXISTS public.leads (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shadow_id       UUID REFERENCES public.shadow_profiles(id) ON DELETE SET NULL,
  first_name      TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT NOT NULL,
  phone_verified  BOOLEAN DEFAULT false,
  phone_verified_at TIMESTAMPTZ,

  -- Qualification answers (denormalized for fast sales call context)
  window_count    TEXT,
  project_type    TEXT,
  zip_code        TEXT,
  county_name     TEXT,
  quote_range     TEXT,
  process_stage   TEXT,
  active_flow     TEXT,

  -- Priority logic
  -- Tier 1 = Flow B (no quote yet) — call before they shop
  -- Tier 1 = Flow C (contractor visit imminent) — call NOW
  -- Tier 2 = Flow A (has quote) — call within 1 hour
  lead_tier       INTEGER GENERATED ALWAYS AS (
    CASE
      WHEN process_stage = 'I have a contractor visit coming up' THEN 1
      WHEN process_stage = 'I got a ballpark number but nothing in writing' THEN 1
      WHEN process_stage = "I'm still in the research phase" THEN 1
      WHEN process_stage = 'I have a written quote from a contractor' THEN 2
      ELSE 3
    END
  ) STORED,

  -- Scan results (populated after AI analysis)
  grade               TEXT CHECK (grade IN ('A','B','C','D','F','error')),
  dollar_delta        INTEGER,
  delta_direction     TEXT CHECK (delta_direction IN ('above','below','at')),
  flag_count          INTEGER DEFAULT 0,
  top_flag_title      TEXT,
  top_flag_body       TEXT,
  pillar_price        INTEGER,
  pillar_fine_print   INTEGER,
  pillar_warranty     INTEGER,
  pillar_install      INTEGER,
  pillar_safety       INTEGER,

  -- Attribution
  utm_source          TEXT,
  utm_campaign        TEXT,
  utm_county          TEXT,

  -- Status
  status  TEXT DEFAULT 'new'
    CHECK (status IN ('new','called','appointment','closed','dead')),

  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now()
);

-- QUALIFICATION ANSWERS (one row per step — enables per-step abandonment analysis)
CREATE TABLE IF NOT EXISTS public.qualification_answers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shadow_id    UUID REFERENCES public.shadow_profiles(id) ON DELETE CASCADE,
  lead_id      UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  step_number  INTEGER NOT NULL CHECK (step_number BETWEEN 1 AND 4),
  question_key TEXT NOT NULL,
  answer_value TEXT NOT NULL,
  answered_at  TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_leads_county    ON public.leads(county_name);
CREATE INDEX idx_leads_flow      ON public.leads(active_flow);
CREATE INDEX idx_leads_tier      ON public.leads(lead_tier);
CREATE INDEX idx_leads_status    ON public.leads(status);
CREATE INDEX idx_leads_verified  ON public.leads(phone_verified);
CREATE INDEX idx_leads_created   ON public.leads(created_at DESC);
CREATE INDEX idx_shadow_session  ON public.shadow_profiles(session_id);
CREATE INDEX idx_shadow_abandoned ON public.shadow_profiles(abandoned_at)
  WHERE abandoned_at IS NOT NULL;

-- ROW LEVEL SECURITY
ALTER TABLE public.shadow_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qualification_answers ENABLE ROW LEVEL SECURITY;

-- Service role can read/write everything (for edge functions)
CREATE POLICY "service_all_shadow"  ON public.shadow_profiles  FOR ALL USING (true);
CREATE POLICY "service_all_leads"   ON public.leads             FOR ALL USING (true);
CREATE POLICY "service_all_answers" ON public.qualification_answers FOR ALL USING (true);
```

---

Now create the Edge Function. In Lovable, create a new Edge Function named `submit-lead`:

```
Create a Supabase Edge Function at: supabase/functions/submit-lead/index.ts

PASTE THIS EXACT CODE:

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const body = await req.json();
    const {
      firstName, email, phone,
      shadowId, sessionId,
      answers, utmSource, utmCampaign, utmCounty,
    } = body;

    // Determine tier and flow
    const stage = answers?.processStage || '';
    const tier = (
      stage === 'I have a contractor visit coming up' ||
      stage === 'I got a ballpark number but nothing in writing' ||
      stage === "I'm still in the research phase"
    ) ? 1 : 2;

    const flow = (
      stage === 'I have a written quote from a contractor' ? 'A' :
      stage === "I'm still in the research phase" ? 'B' : 'C'
    );

    // 1. Create the lead record
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        shadow_id:     shadowId || null,
        first_name:    firstName,
        email:         email.toLowerCase().trim(),
        phone:         phone.replace(/\D/g, ''),
        window_count:  answers?.windowCount,
        project_type:  answers?.projectType,
        zip_code:      answers?.zipCode,
        county_name:   answers?.countyName,
        quote_range:   answers?.quoteRange,
        process_stage: stage,
        active_flow:   flow,
        utm_source:    utmSource,
        utm_campaign:  utmCampaign,
        utm_county:    utmCounty,
        status:        'new',
      })
      .select()
      .single();

    if (leadError) throw leadError;

    // 2. Update shadow profile as converted
    if (shadowId) {
      await supabase
        .from('shadow_profiles')
        .update({ converted_at: new Date().toISOString() })
        .eq('id', shadowId);
    }

    // 3. Fire webhook to Make.com / AI agent trigger
    const webhookUrl = Deno.env.get('LEAD_WEBHOOK_URL');
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event:       'lead_captured',
          leadId:      lead.id,
          firstName,
          email,
          phone:       phone.replace(/\D/g, ''),
          countyName:  answers?.countyName,
          windowCount: answers?.windowCount,
          projectType: answers?.projectType,
          quoteRange:  answers?.quoteRange,
          processStage: stage,
          flow,
          leadTier:    tier,
          utmSource,
          utmCampaign,
          timestamp:   new Date().toISOString(),
        }),
      });
    }

    return new Response(
      JSON.stringify({ success: true, leadId: lead.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('submit-lead error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
```

---

Also create the Edge Function `create-shadow-profile` at:
supabase/functions/create-shadow-profile/index.ts

This fires at Step 2 completion (before email is captured):

```
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { sessionId, windowCount, projectType, utmSource, utmCampaign } = await req.json();

  const { data, error } = await supabase
    .from('shadow_profiles')
    .upsert({
      session_id:  sessionId,
      window_count: windowCount,
      project_type: projectType,
      utm_source:   utmSource,
      utm_campaign: utmCampaign,
    }, { onConflict: 'session_id' })
    .select('id')
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  return new Response(
    JSON.stringify({ shadowId: data.id }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
```
```

---

## PIECE 3 — ScanTheatrics Complete Logic (with Zustand + mascot pulse)

```
Update src/components/ScanTheatrics.tsx with this complete implementation.
This component reads from useFunnelStore and writes to it on completion.

PASTE THIS CODE:

import { useEffect, useRef, useState } from 'react';
import { useFunnelStore } from '../store/funnelStore';

interface LogLine {
  text:     string;
  type:     'system' | 'ok' | 'flag' | 'verified';
  delay_ms: number;
}

const buildLogLines = (county: string): LogLine[] => [
  { type: 'system',   delay_ms: 0,    text: '$ INITIALIZING FORENSIC PROTOCOL...' },
  { type: 'system',   delay_ms: 900,  text: '$ SECURE HANDSHAKE ESTABLISHED' },
  { type: 'ok',       delay_ms: 1800, text: `■ Accessing ${county.toUpperCase()} COUNTY pricing benchmarks...` },
  { type: 'ok',       delay_ms: 2900, text: '■ Extracting line items and specifications...' },
  { type: 'ok',       delay_ms: 4000, text: '■ Running brand registry check...' },
  { type: 'flag',     delay_ms: 5100, text: '▲ FLAG DETECTED: No window brand specified — substitution risk HIGH' },
  { type: 'ok',       delay_ms: 6200, text: '■ Scanning warranty language...' },
  { type: 'flag',     delay_ms: 7300, text: '▲ FLAG DETECTED: "Permit included" — no dollar amount found' },
  { type: 'ok',       delay_ms: 8400, text: '■ Running NOA compliance verification...' },
  { type: 'verified', delay_ms: 9500, text: '✓ Document authenticity: CONFIRMED' },
  { type: 'ok',       delay_ms: 10600, text: `■ Calculating fair-market delta for ${county.toUpperCase()} COUNTY...` },
  { type: 'flag',     delay_ms: 11700, text: '▲ FLAG DETECTED: Labor warranty 1 year — state minimum is 3' },
  { type: 'system',   delay_ms: 12800, text: '$ COMPUTING FINAL RISK SCORE...' },
];

// Progress phases: (targetPct, durationMs)
const PROGRESS_PHASES: [number, number][] = [
  [40,  6000],
  [79,  18000],
  [99,  34000],
];

export default function ScanTheatrics() {
  const { answers, setScreen } = useFunnelStore();
  const county = answers.countyName || 'Florida';

  const [visibleLines, setVisibleLines]  = useState<LogLine[]>([]);
  const [progress, setProgress]          = useState(0);
  const [phase, setPhase]                = useState(0);       // 0=cobalt→cyan, 1=cobalt→orange
  const [pct, setPct]                    = useState(0);
  const [showAlert, setShowAlert]        = useState(false);
  const [mascotPulse, setMascotPulse]    = useState(false);
  const [frozen, setFrozen]              = useState(false);

  const logRef    = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const addTimer = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
    return t;
  };

  useEffect(() => {
    const lines = buildLogLines(county);

    // Schedule each log line
    lines.forEach((line) => {
      addTimer(() => {
        setVisibleLines((prev) => [...prev, line]);
        if (line.type === 'flag') setShowAlert(true);
        // Auto-scroll
        if (logRef.current) {
          logRef.current.scrollTop = logRef.current.scrollHeight;
        }
      }, line.delay_ms);
    });

    // Progress bar animation
    let currentPct = 0;
    const runPhase = (phaseIdx: number) => {
      if (phaseIdx >= PROGRESS_PHASES.length) return;
      const [target, duration] = PROGRESS_PHASES[phaseIdx];
      const startPct = currentPct;
      const startTime = performance.now();

      if (phaseIdx === 1) setPhase(1); // switch to danger gradient

      const tick = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const newPct = Math.round(startPct + (target - startPct) * progress);
        currentPct = newPct;
        setProgress(newPct);
        setPct(newPct);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          currentPct = target;
          if (target === 99) {
            // FREEZE — the most important 2100ms in the product
            setFrozen(true);
            setMascotPulse(true); // pulse the mascot
            addTimer(() => {
              // White flash
              const flash = document.createElement('div');
              flash.style.cssText = 'position:fixed;inset:0;background:#ffffff;opacity:0.15;z-index:9999;pointer-events:none;transition:opacity 200ms ease;';
              document.body.appendChild(flash);
              setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => {
                  document.body.removeChild(flash);
                  setScreen('otp');
                }, 200);
              }, 80);
            }, 2100);
          } else {
            addTimer(() => runPhase(phaseIdx + 1), 200);
          }
        }
      };
      requestAnimationFrame(tick);
    };

    addTimer(() => runPhase(0), 500);

    // Pixel event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', 'wm_scan_started', { county });
    }

    return () => clearAllTimers();
  }, []);

  const lineColor: Record<LogLine['type'], string> = {
    system:   '#1D4ED8',
    ok:       '#A0B8D8',
    flag:     '#F97316',
    verified: '#10B981',
  };

  const progressGradient = phase === 0
    ? 'linear-gradient(90deg, #1D4ED8, #00D9FF)'
    : 'linear-gradient(90deg, #1D4ED8, #F97316)';

  return (
    <div style={{
      background: '#0A0A0A', minHeight: '100vh', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Terminal window */}
      <div style={{ width: '100%', maxWidth: 680, border: '1px solid #2E3A50' }}>
        {/* Header bar */}
        <div style={{
          height: 36, background: '#111418', borderBottom: '1px solid #1C1C1C',
          display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8,
        }}>
          <div style={{ width: 8, height: 8, background: '#1D4ED8' }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#7D9DBB', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            WINDOWMAN FORENSIC ENGINE v2.1 — <span style={{ color: '#00D9FF' }}>{county.toUpperCase()} COUNTY</span>
          </span>
        </div>

        {/* Log area */}
        <div ref={logRef} style={{
          padding: '14px 14px', minHeight: 220, maxHeight: 280,
          overflowY: 'auto', fontFamily: "'JetBrains Mono',monospace",
          fontSize: 12, lineHeight: 2.0,
        }}>
          {visibleLines.map((line, i) => (
            <div key={i} style={{
              color: lineColor[line.type],
              opacity: line.type === 'system' ? 0.85 : 1,
              animation: 'scanLineIn 0.15s ease forwards',
            }}>
              {line.type === 'ok' && answers.countyName && line.text.includes(answers.countyName.toUpperCase())
                ? <>
                    {line.text.split(answers.countyName.toUpperCase())[0]}
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{answers.countyName.toUpperCase()}</span>
                    {line.text.split(answers.countyName.toUpperCase())[1]}
                  </>
                : line.text
              }
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div style={{ padding: '0 14px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: '#7D9DBB', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              ANALYSIS PROGRESS
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: pct >= 99 ? '#F97316' : '#00D9FF' }}>
              {pct}%
            </span>
          </div>
          <div style={{ height: 3, background: '#2E3A50' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: progressGradient,
              boxShadow: pct >= 40 ? '0 0 8px rgba(0,217,255,0.35)' : 'none',
              transition: 'none',
            }} />
          </div>

          {/* FROZEN STATE — mascot pulse */}
          {frozen && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 10, marginTop: 14,
            }}>
              <div style={{
                width: 36, height: 36,
                background: mascotPulse ? 'rgba(249,115,22,0.20)' : 'rgba(29,78,216,0.15)',
                border: `1px solid ${mascotPulse ? '#F97316' : '#1D4ED8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 14,
                color: mascotPulse ? '#F97316' : '#3B82F6',
                animation: 'mascotPulse 0.6s ease-in-out infinite',
              }}>WM</div>
              <span style={{
                fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
                color: '#F97316', letterSpacing: '0.1em',
                animation: 'textBlink 0.8s ease-in-out infinite',
              }}>
                FINDING IDENTIFIED
              </span>
            </div>
          )}

          {/* Alert line */}
          {showAlert && !frozen && (
            <div style={{
              marginTop: 12, textAlign: 'center',
              fontFamily: "'JetBrains Mono',monospace", fontSize: 10,
              color: '#F97316', letterSpacing: '0.08em',
            }}>
              ⚡ SIGNIFICANT FINDINGS — IDENTITY VERIFICATION REQUIRED
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scanLineIn { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes mascotPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes textBlink { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
```

---

## PIECE 4 — Make.com Webhook (AI Agent Trigger)

This fires from the `submit-lead` Edge Function via the `LEAD_WEBHOOK_URL` env variable.
Set that variable in Supabase: Dashboard → Settings → Edge Functions → Environment Variables.

```
In Make.com: Create a new scenario with a "Custom Webhook" trigger.
Copy the webhook URL Make.com provides.
Set it as LEAD_WEBHOOK_URL in your Supabase Edge Function env vars.

The JSON payload your webhook receives will look exactly like this:

{
  "event": "lead_captured",
  "leadId": "uuid-string",
  "firstName": "Maria",
  "email": "maria@example.com",
  "phone": "9545551234",
  "countyName": "Broward",
  "windowCount": "11-20 windows",
  "projectType": "Full home replacement",
  "quoteRange": "$20,000 – $35,000",
  "processStage": "I have a written quote from a contractor",
  "flow": "A",
  "leadTier": 2,
  "utmSource": "facebook",
  "utmCampaign": "impact_windows_broward",
  "timestamp": "2025-03-19T14:32:11.000Z"
}

In Make.com, after the webhook trigger, add these modules:

MODULE 1 — Filter:
  Continue ONLY if: flow = "A" OR flow = "C"
  (Skip Flow B leads — they haven't been quoted yet, different call script)

MODULE 2 — HTTP (POST to your AI caller / Retell / Vapi / Bland):
  URL: your AI caller's API endpoint
  Body: {
    "call_type": "outbound",
    "phone_number": "{{phone}}",
    "agent_context": {
      "prospect_name": "{{firstName}}",
      "county": "{{countyName}}",
      "window_count": "{{windowCount}}",
      "project_type": "{{projectType}}",
      "quote_range": "{{quoteRange}}",
      "opening_line": "Hi {{firstName}}, this is Pete from WindowMan — you just submitted your impact window quote for review. I have your county data pulled up for {{countyName}} right here. Do you still have the quote nearby?"
    }
  }

MODULE 3 — Supabase (update lead status):
  Table: leads
  Record ID: {{leadId}}
  Update: { "status": "called" }

MODULE 4 (TIER 1 ONLY — separate branch) — SMS via Twilio:
  Filter: leadTier = 1
  To: {{phone}}
  Body: "Hi {{firstName}}, it's Pete from WindowMan. Your contractor quote review is ready — before they arrive, we have your {{countyName}} market baseline ready. Reply YES and I'll send it now. Reply STOP to opt out."

MODULE 5 (FLOW B ONLY — separate branch):
  Filter: flow = "B"
  Wait: 15 minutes (don't call immediately — they're in research mode)
  Then trigger call with different context: "I'm calling because you requested your market baseline for {{countyName}}..."
```

---

## PIECE 5 — Facebook Pixel Event Architecture

```
Create a new file: src/lib/pixel.ts

This is the single place where all pixel events are fired.
Never call fbq() directly in components — always call these functions.

export const px = {
  pageView: () => {
    fbq('track', 'PageView');
  },
  
  // Truth Gate milestones
  step1Complete: (windowCount: string) => {
    fbq('trackCustom', 'wm_step1_complete', { window_count: windowCount });
  },
  step2Complete: (projectType: string) => {
    fbq('trackCustom', 'wm_step2_complete', { project_type: projectType });
  },
  step3Complete: (county: string) => {
    fbq('trackCustom', 'wm_step3_complete', { county });
    fbq('trackCustom', 'wm_county_identified', { county });
  },
  step4Complete: (quoteRange: string, flow: string) => {
    fbq('trackCustom', 'wm_step4_complete', { quote_range: quoteRange, flow });
    fbq('trackCustom', 'wm_flow_routed', { flow });
  },

  // Lead gate
  leadGateViewed: (county: string) => {
    fbq('trackCustom', 'wm_lead_gate_viewed', { county });
    fbq('track', 'Lead'); // Standard Meta lead event — required for optimization
  },
  leadSubmitted: (county: string, flow: string) => {
    fbq('trackCustom', 'wm_lead_submitted', { county, flow });
    fbq('track', 'CompleteRegistration'); // Standard Meta event
  },

  // OTP and verification
  otpStarted: () => {
    fbq('trackCustom', 'wm_otp_started');
  },
  otpVerified: (county: string, flow: string) => {
    fbq('trackCustom', 'wm_otp_verified', { county, flow });
    fbq('track', 'Purchase', { value: 0, currency: 'USD' }); // Use as conversion signal
  },

  // Scan
  scanStarted: (county: string) => {
    fbq('trackCustom', 'wm_scan_started', { county });
  },
  gradeRevealed: (grade: string, dollarDelta: number, county: string) => {
    fbq('trackCustom', 'wm_grade_revealed', { grade, dollar_delta: dollarDelta, county });
  },

  // Post-scan conversion
  contractorMatchRequested: (county: string, grade: string) => {
    fbq('trackCustom', 'wm_contractor_match_requested', { county, grade });
    fbq('track', 'Schedule'); // Standard Meta — schedule = high intent
  },
  flowBBaselineRequested: (county: string) => {
    fbq('trackCustom', 'wm_flow_b_baseline_requested', { county });
  },
  flowBContractorIntroRequested: (county: string) => {
    fbq('trackCustom', 'wm_flow_b_contractor_intro_requested', { county });
    // THIS is your highest-value Flow B signal for lookalike audiences
  },
};

// Type-safe fbq caller — handles the case where fbq hasn't loaded yet
function fbq(event: string, ...args: any[]) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq(event, ...args);
  }
}
```

---

## FINAL ASSEMBLY CHECKLIST

In Lovable, after all pieces are built, verify this execution order fires correctly:

```
USER JOURNEY                          SUPABASE WRITE           PIXEL EVENT
─────────────────────────────────────────────────────────────────────────
Page load                             —                        PageView
Step 2 complete (window count)        create-shadow-profile    wm_step2_complete
Step 3 complete (county)              update shadow            wm_step3_complete
Step 4 complete (quote range)         update shadow            wm_step4_complete + wm_flow_routed
Lead gate submit                      submit-lead edge fn      wm_lead_submitted + CompleteRegistration
Webhook fires → AI caller             —                        —
OTP sent                              —                        wm_otp_started
OTP verified                          update lead.phone_verified wm_otp_verified + Purchase
Scan complete                         —                        wm_scan_started
Grade revealed                        update lead with grade   wm_grade_revealed
Contractor match clicked              update lead status       wm_contractor_match_requested + Schedule
```

Set these environment variables in Supabase before testing:
  SUPABASE_URL                — your project URL
  SUPABASE_SERVICE_ROLE_KEY   — your service role key (NOT anon key)
  LEAD_WEBHOOK_URL            — your Make.com webhook URL
  TWILIO_ACCOUNT_SID          — for OTP (already wired in existing send-otp fn)
  TWILIO_AUTH_TOKEN           — for OTP
  TWILIO_VERIFY_SID           — for OTP
