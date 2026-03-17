-- ============================================================================
-- SUPABASE_PRODUCTION_EXPORT.SQL
-- Window Man — Production Schema Export
-- Generated: 2026-03-17
-- Source: Project wkrcyxcnzhwjtdpmfpaf (consolidated from 80+ migrations)
-- ============================================================================
-- Usage: Run this entire file in a fresh Supabase SQL Editor to recreate
-- the full production environment. All statements use IF NOT EXISTS guards.
-- ============================================================================


-- ============================================================================
-- 1. EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


-- ============================================================================
-- 2. CUSTOM TYPES (ENUMs)
-- ============================================================================

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE public.lead_status AS ENUM (
    'new', 'qualifying', 'mql', 'qualified',
    'appointment_set', 'sat', 'closed_won', 'closed_lost', 'dead'
  );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;


-- ============================================================================
-- 3. UTILITY FUNCTIONS
-- ============================================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Security-definer role checker (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Purge expired rate limit entries
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
AS $$
  DELETE FROM public.rate_limits
  WHERE created_at < now() - interval '1 hour';
$$;

-- Link anonymous quote_analyses to a lead after identity resolution
CREATE OR REPLACE FUNCTION public.link_quote_analyses_to_lead(
  _session_id text,
  _lead_id uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rows_updated integer;
BEGIN
  UPDATE public.quote_analyses
  SET lead_id = _lead_id
  WHERE session_id = _session_id
    AND lead_id IS NULL;

  GET DIAGNOSTICS rows_updated = ROW_COUNT;
  RETURN rows_updated;
END;
$$;


-- ============================================================================
-- 4. USER_ROLES TABLE (dependency for has_role)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_roles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role       public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Admins can read all roles
CREATE POLICY "Admins can read all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can read their own roles
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());


-- ============================================================================
-- 5. LEADS TABLE (45+ columns)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
  -- Core
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                   text,
  name                    text,
  first_name              text,
  last_name               text,
  phone                   text,
  source_tool             text,
  session_data            jsonb,
  chat_history            jsonb,
  created_at              timestamptz NOT NULL DEFAULT now(),
  updated_at              timestamptz NOT NULL DEFAULT now(),

  -- Auth
  user_id                 uuid REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Identity
  client_id               text,
  identity_version        integer DEFAULT 1,
  original_session_id     text,
  ip_hash                 text,

  -- Attribution (last-touch UTM)
  utm_source              text,
  utm_medium              text,
  utm_campaign            text,
  utm_term                text,
  utm_content             text,

  -- Click IDs
  fbc                     text,
  fbp                     text,
  gclid                   text,
  msclkid                 text,
  gbraid                  text,
  wbraid                  text,
  ttclid                  text,

  -- Meta Ads
  meta_placement          text,
  meta_campaign_id        text,
  meta_adset_id           text,
  meta_ad_id              text,
  meta_site_source_name   text,
  meta_creative_id        text,

  -- Last Non-Direct Attribution
  last_non_direct_utm_source    text,
  last_non_direct_utm_medium    text,
  last_non_direct_gclid         text,
  last_non_direct_fbclid        text,
  last_non_direct_channel       text,
  last_non_direct_landing_page  text,

  -- Geo
  city                    text,
  state                   text,
  zip                     text,

  -- Device
  device_type             text,
  referrer                text,
  landing_page            text,
  landing_page_url        text,
  client_user_agent       text,

  -- AI Context
  source_form             text,
  specific_detail         text,
  emotional_state         text,
  urgency_level           text,
  insurance_carrier       text,
  window_count            integer,

  -- Scoring
  lead_score_total        integer DEFAULT 0,
  lead_score_last_7d      integer DEFAULT 0,
  last_activity_at        timestamptz,
  lead_status             public.lead_status DEFAULT 'new',
  first_touch             timestamptz DEFAULT now(),
  last_touch              timestamptz DEFAULT now(),
  last_evidence           timestamptz,
  source_page             text,

  -- Intent
  intent_score            numeric(5,2),
  intent_label            text
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anonymous/public can INSERT (lead capture forms)
CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated users can read their own lead
CREATE POLICY "Users can read own lead"
  ON public.leads FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admins can read all leads
CREATE POLICY "Admins can read all leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update any lead
CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Service role has full access (implicit via bypass, but explicit for clarity)
CREATE POLICY "Service role full access to leads"
  ON public.leads FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ============================================================================
-- 6. QUOTE_FILES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quote_files (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      text NOT NULL,
  lead_id         uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  file_name       text NOT NULL,
  file_path       text NOT NULL,
  file_size       integer,
  mime_type       text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  is_deleted      boolean DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_files ENABLE ROW LEVEL SECURITY;

-- Anonymous can INSERT (upload flow before auth)
CREATE POLICY "Anyone can insert quote_files"
  ON public.quote_files FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only service role can SELECT/UPDATE/DELETE
CREATE POLICY "Service role full access to quote_files"
  ON public.quote_files FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ============================================================================
-- 7. QUOTE_ANALYSES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quote_analyses (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_file_id   uuid NOT NULL REFERENCES public.quote_files(id) ON DELETE CASCADE,
  session_id      text NOT NULL,
  lead_id         uuid REFERENCES public.leads(id) ON DELETE SET NULL,

  -- Scores (0-100 scale)
  safety_score    integer,
  scope_score     integer,
  price_score     integer,
  overall_score   integer,
  grade           text,          -- e.g. 'A', 'B+', 'C-', 'F'

  -- AI Output
  analysis_json   jsonb,
  summary         text,
  red_flags       jsonb,         -- array of flagged items
  recommendations jsonb,         -- array of recommendations

  -- Dedup
  content_hash    text,          -- SHA-256 of uploaded file for dedup

  -- Metadata
  model_version   text DEFAULT 'v1',
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.quote_analyses ENABLE ROW LEVEL SECURITY;

-- Anonymous can INSERT (scan results before auth)
CREATE POLICY "Anyone can insert quote_analyses"
  ON public.quote_analyses FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can read their own analyses (by session_id match or lead ownership)
CREATE POLICY "Users can read own analyses"
  ON public.quote_analyses FOR SELECT
  TO authenticated
  USING (
    lead_id IN (SELECT id FROM public.leads WHERE user_id = auth.uid())
  );

-- Admins can read all analyses
CREATE POLICY "Admins can read all analyses"
  ON public.quote_analyses FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Service role full access
CREATE POLICY "Service role full access to quote_analyses"
  ON public.quote_analyses FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ============================================================================
-- 8. RATE_LIMITS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.rate_limits (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier  text NOT NULL,        -- IP hash or client_id
  endpoint    text NOT NULL,        -- e.g. '/api/scan', '/api/lead'
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can access rate_limits
CREATE POLICY "Service role only on rate_limits"
  ON public.rate_limits FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- ============================================================================
-- 9. INDEXES
-- ============================================================================

-- Leads
CREATE INDEX IF NOT EXISTS idx_leads_email          ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_client_id      ON public.leads (client_id);
CREATE INDEX IF NOT EXISTS idx_leads_user_id        ON public.leads (user_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at     ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_lead_status    ON public.leads (lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_phone          ON public.leads (phone);
CREATE INDEX IF NOT EXISTS idx_leads_ip_hash        ON public.leads (ip_hash);
CREATE INDEX IF NOT EXISTS idx_leads_utm_source     ON public.leads (utm_source);

-- Quote Files
CREATE INDEX IF NOT EXISTS idx_quote_files_session  ON public.quote_files (session_id);
CREATE INDEX IF NOT EXISTS idx_quote_files_lead     ON public.quote_files (lead_id);
CREATE INDEX IF NOT EXISTS idx_quote_files_created  ON public.quote_files (created_at DESC);

-- Quote Analyses
CREATE INDEX IF NOT EXISTS idx_analyses_session     ON public.quote_analyses (session_id);
CREATE INDEX IF NOT EXISTS idx_analyses_lead        ON public.quote_analyses (lead_id);
CREATE INDEX IF NOT EXISTS idx_analyses_file        ON public.quote_analyses (quote_file_id);
CREATE INDEX IF NOT EXISTS idx_analyses_hash        ON public.quote_analyses (content_hash);
CREATE INDEX IF NOT EXISTS idx_analyses_created     ON public.quote_analyses (created_at DESC);

-- Rate Limits
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup   ON public.rate_limits (identifier, endpoint, created_at DESC);

-- User Roles
CREATE INDEX IF NOT EXISTS idx_user_roles_user      ON public.user_roles (user_id);


-- ============================================================================
-- 10. TRIGGERS
-- ============================================================================

-- Auto-update updated_at on quote_analyses
DROP TRIGGER IF EXISTS trg_quote_analyses_updated_at ON public.quote_analyses;
CREATE TRIGGER trg_quote_analyses_updated_at
  BEFORE UPDATE ON public.quote_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Auto-update updated_at on leads
DROP TRIGGER IF EXISTS trg_leads_updated_at ON public.leads;
CREATE TRIGGER trg_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();


-- ============================================================================
-- 11. STORAGE: quotes BUCKET
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'quotes',
  'quotes',
  false,
  10485760,  -- 10MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
)
ON CONFLICT (id) DO NOTHING;

-- Service role: full access to quotes bucket
CREATE POLICY "Service role full access to quotes storage"
  ON storage.objects FOR ALL
  TO service_role
  USING (bucket_id = 'quotes')
  WITH CHECK (bucket_id = 'quotes');

-- Authenticated users: upload to quotes bucket
CREATE POLICY "Authenticated users can upload to quotes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'quotes');

-- Anonymous users: upload to quotes bucket (pre-auth scan flow)
CREATE POLICY "Anonymous users can upload to quotes"
  ON storage.objects FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'quotes');


-- ============================================================================
-- END OF EXPORT
-- ============================================================================
-- Total: 5 tables, 4 functions, 2 triggers, 15 RLS policies,
--        14 indexes, 1 storage bucket, 2 custom types, 1 extension
-- ============================================================================
