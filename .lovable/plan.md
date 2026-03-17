

## SUPABASE_PRODUCTION_EXPORT.SQL — Full Schema Export Plan

### What I Found

I traced all 80+ migrations in the [Window Man Truth Engine](/projects/faf9d037-b00e-4588-a259-0baf63925ffd) project. The database has evolved significantly — the `leads` table alone has had 15+ ALTER TABLE additions across dozens of migrations. Here is what the consolidated, production-ready SQL export will contain.

---

### Scope of the Export

**Extensions:**
- `uuid-ossp` (for `uuid_generate_v4()` compatibility, though `gen_random_uuid()` is used natively)

**Custom Types:**
- `app_role` ENUM (`admin`, `moderator`, `user`)
- `lead_status` ENUM (`new`, `qualifying`, `mql`, `qualified`, `appointment_set`, `sat`, `closed_won`, `closed_lost`, `dead`)

**Utility Functions:**
- `set_updated_at()` — trigger function for auto-updating `updated_at` columns
- `has_role(_user_id uuid, _role app_role)` — SECURITY DEFINER role checker (prevents recursive RLS)
- `cleanup_rate_limits()` — purges rate limit entries older than 1 hour

**Tables (4 core tables for this project's Phase 1-6 roadmap):**

| Table | Columns | RLS |
|-------|---------|-----|
| `leads` | 45+ columns (PII, UTM, click IDs, Meta, geo, device, identity, scoring, AI context) | INSERT open, SELECT/UPDATE/DELETE restricted |
| `quote_files` | 12 columns (session, file metadata, UTM, soft delete) | INSERT open, SELECT/UPDATE/DELETE denied to public |
| `quote_analyses` | 17 columns (scores, analysis_json, dedup hash, session/lead linkage) | INSERT open, SELECT by owner/admin, UPDATE/DELETE service-role only |
| `rate_limits` | 4 columns (identifier, endpoint, created_at) | Service-role only |

**Storage:**
- `quotes` bucket (private, 10MB max, PDF/JPEG/PNG only)
- Service-role full access policy
- Authenticated upload policy

**RLS Policies:** Every table gets explicit `ENABLE ROW LEVEL SECURITY` + granular per-operation policies.

**Triggers:**
- `set_updated_at` on `quote_analyses`
- Indexes on all lookup columns (session_id, lead_id, email, client_id, created_at, etc.)

---

### What is NOT Included (by design)

These are Truth Engine-specific CRM/admin tables that this project does not need:
- `wm_leads`, `wm_sessions`, `wm_events`, `wm_event_log` (CRM warehouse)
- `accounts`, `pending_scans`, `qualification_answers` (Vault signup system)
- `call_agents`, `pending_calls`, `phone_call_logs` (call dispatch system)
- `opportunities`, `deals`, `ad_spend_daily` (sales pipeline)
- `profiles`, `consultations`, `lead_activities` (legacy)
- `webhook_receipts`, `search_index`, `tracking_failed_events` (admin tooling)
- All admin triggers (auto-dispatch calls, CRM sync, search indexing)
- `user_roles` table (included only as a utility dependency for the `has_role` function)

---

### Leads Table — Full Column Inventory

The `leads` table is the most complex. Here is its consolidated shape after all migrations:

**Core:** `id`, `email`, `name`, `first_name`, `last_name`, `phone`, `source_tool`, `session_data`, `chat_history`, `created_at`, `updated_at`
**Auth:** `user_id` (FK to `auth.users`)
**Identity:** `client_id`, `identity_version`, `original_session_id`, `ip_hash`
**Attribution (last-touch):** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`
**Click IDs:** `fbc`, `fbp`, `gclid`, `msclkid`, `gbraid`, `wbraid`, `ttclid`
**Meta Ads:** `meta_placement`, `meta_campaign_id`, `meta_adset_id`, `meta_ad_id`, `meta_site_source_name`, `meta_creative_id`
**Last Non-Direct:** `last_non_direct_utm_source`, `last_non_direct_utm_medium`, `last_non_direct_gclid`, `last_non_direct_fbclid`, `last_non_direct_channel`, `last_non_direct_landing_page`
**Geo:** `city`, `state`, `zip`
**Device:** `device_type`, `referrer`, `landing_page`, `landing_page_url`, `client_user_agent`
**AI Context:** `source_form`, `specific_detail`, `emotional_state`, `urgency_level`, `insurance_carrier`, `window_count`
**Scoring:** `lead_score_total`, `lead_score_last_7d`, `last_activity_at`, `lead_status`, `first_touch`, `last_touch`, `last_evidence`, `source_page`
**Intent:** `intent_score`, `intent_label`

---

### Missing Items You Should Consider Adding

1. **`user_roles` table** — needed as a dependency for `has_role()`. Minimal: `id`, `user_id`, `role` with unique constraint.
2. **`link_quote_analyses_to_lead` function** — retroactively links anonymous scans to a lead after signup. Critical for the Identity Ladder flow.
3. **`handle_new_lead_to_crm` trigger** — the version that links quote_analyses. Without `wm_leads`, a simplified version could fire the $500 CAPI signal instead.

---

### Implementation

I will generate a single `SUPABASE_PRODUCTION_EXPORT.SQL` file at the project root containing all of the above in correct dependency order:

1. Extensions
2. Custom types (`app_role`, `lead_status`)  
3. Utility functions (`set_updated_at`, `has_role`, `cleanup_rate_limits`)
4. `user_roles` table (dependency for `has_role`)
5. `leads` table (full 45+ column version)
6. `quote_files` table
7. `quote_analyses` table
8. `rate_limits` table
9. All RLS policies
10. All indexes
11. All triggers
12. Storage bucket + policies
13. `link_quote_analyses_to_lead` function

Total: ~350 lines of production SQL, fully idempotent with `IF NOT EXISTS` guards.

