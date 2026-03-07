import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface ContractorMatchProps {
  isVisible: boolean;
  grade?: string;
  county?: string;
  dollarDelta?: number;
}

const contractors = [
  {
    letter: "A",
    name: "Apex Window Solutions",
    serving: "Serving {county} County · Est. 2009",
    stars: 5,
    rating: "4.9",
    reviews: 127,
    range: "$11,800 – $13,400",
    badges: ["✓ Fair-market priced", "✓ Brand-specified quotes", "✓ 3yr labor warranty standard"],
    avatarBg: "rgba(0,153,187,0.2)",
    avatarBorder: "rgba(0,153,187,0.4)",
    avatarColor: "#0099BB",
    bestMatch: true,
    id: "Apex",
  },
  {
    letter: "P",
    name: "Premier Impact Windows",
    serving: "Serving {county} & Miami-Dade · Est. 2014",
    stars: 5,
    rating: "4.8",
    reviews: 203,
    range: "$12,200 – $14,100",
    badges: ["✓ Fair-market priced", "✓ 5yr labor warranty", "✓ Permit-included quotes"],
    avatarBg: "rgba(200,149,42,0.2)",
    avatarBorder: "rgba(200,149,42,0.4)",
    avatarColor: "#C8952A",
    bestMatch: false,
    id: "Premier",
  },
  {
    letter: "S",
    name: "SunShield Windows & Doors",
    serving: "Serving {county} County · Est. 2017",
    stars: 4,
    rating: "4.7",
    reviews: 89,
    range: "$11,200 – $13,800",
    badges: ["✓ Fair-market priced", "✓ Brand spec on all quotes", "✓ Permit-included"],
    avatarBg: "rgba(124,58,237,0.2)",
    avatarBorder: "rgba(124,58,237,0.4)",
    avatarColor: "#A78BFA",
    bestMatch: false,
    id: "SunShield",
  },
];

const getSubCopy = (grade: string, county: string) => {
  if (grade === "D" || grade === "F") {
    return `A quote scoring ${grade} is in the bottom tier of what we see in ${county} County. Based on your scope, there is fair-market capacity currently available from contractors we've vetted.`;
  }
  if (grade === "C") {
    return `A ${grade} grade means there's room to negotiate — or find a better starting price. We've matched ${county} homeowners with similar scopes to contractors who came in $2,400 to $5,800 lower.`;
  }
  return `Your quote scored ${grade} — this is a strong result. We're showing you this section because you still deserve to know your full options before you sign.`;
};

const vetItems = [
  "Each contractor submits 10+ sample quotes for our red flag audit before they're listed in our network.",
  "We verify they use brand-specified quotes, standard warranty language, and fair-market deposit structures.",
  "Homeowner feedback scores are updated monthly. Any contractor below 4.6 is removed.",
  "Your contractor never sees your WindowMan grade report unless you choose to share it.",
];

const ContractorMatch = ({
  isVisible,
  grade = "C",
  county = "Broward",
  dollarDelta = 4800,
}: ContractorMatchProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={ref}
      id="contractor-match"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ background: "#0F1F35" }}
      className="py-16 md:py-24 px-4 md:px-8"
    >
      {/* SECTION 1 — MATCH HEADER */}
      <div className="max-w-4xl mx-auto text-center">
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#0099BB", letterSpacing: "0.1em", marginBottom: 20 }}>
          WINDOWMAN VERIFIED NETWORK · {county.toUpperCase()} COUNTY
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 5vw, 44px)", color: "white", fontWeight: 700 }}>
          Your grade is {grade}. Here's what that means for your options.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#D1D5DB", lineHeight: 1.7, maxWidth: 640, margin: "16px auto 0" }}>
          {getSubCopy(grade, county)}
        </p>

        <div className="flex items-center justify-center gap-2.5 mt-5">
          <span className="pulse" style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669", display: "inline-block" }} />
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94A3B8" }}>
            12 homeowners in {county} County currently in contact with verified contractors
          </span>
        </div>
      </div>

      {/* SECTION 2 — CONTRACTOR CARDS */}
      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {contractors.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
            className="relative group"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "24px 22px",
              transition: "all 0.2s ease",
            }}
            whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.09)" }}
          >
            {c.bestMatch && (
              <span style={{ position: "absolute", top: 12, left: 12, background: "#C8952A", borderRadius: 6, padding: "4px 10px", fontFamily: "'DM Mono', monospace", fontSize: 10, color: "white", fontWeight: 700, letterSpacing: "0.06em" }}>
                ★ BEST MATCH
              </span>
            )}

            <div style={{ width: 64, height: 64, borderRadius: "50%", background: c.avatarBg, border: `2px solid ${c.avatarBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginTop: c.bestMatch ? 20 : 0 }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: c.avatarColor }}>{c.letter}</span>
            </div>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "white" }}>{c.name}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8" }}>
              {c.serving.replace("{county}", county)}
            </p>

            <div className="flex items-center gap-1.5 mt-2.5">
              <span style={{ color: "#C8952A", fontSize: 14 }}>{"★".repeat(c.stars)}{"☆".repeat(5 - c.stars)}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#94A3B8" }}>{c.rating} ({c.reviews} reviews)</span>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "16px 0" }} />

            <div className="flex justify-between items-center mb-2">
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6B7280" }}>TYPICAL RANGE FOR YOUR SCOPE</span>
            </div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: "#059669" }}>{c.range}</p>

            <div className="flex flex-wrap gap-2 mt-3">
              {c.badges.map((badge) => (
                <span key={badge} style={{ background: "rgba(5,150,105,0.15)", border: "1px solid rgba(5,150,105,0.3)", borderRadius: 999, padding: "3px 10px", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6EE7B7", fontWeight: 600 }}>
                  {badge}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => console.log({ event: "wm_contractor_intro_requested", contractor: c.id, grade })}
              style={{ width: "100%", marginTop: 20, background: "#C8952A", color: "white", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700, padding: 14, borderRadius: 8, border: "none", cursor: "pointer" }}
            >
              Request Introduction →
            </motion.button>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#6B7280", fontStyle: "italic", textAlign: "center", marginTop: 8 }}>
              No obligation. Introduction only.
            </p>
          </motion.div>
        ))}
      </div>

      {/* SECTION 3 — TRUST BRIDGE */}
      <div className="max-w-4xl mx-auto mt-10" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "32px 28px" }}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="flex flex-col items-center flex-shrink-0">
            <ShieldCheck size={64} color="#059669" strokeWidth={1.5} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 20, fontWeight: 700, color: "white", marginTop: 12, textAlign: "center" }}>
              How WindowMan vets these contractors
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {vetItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#059669", flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#D1D5DB", lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4 — NOT READY BRIDGE */}
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#6B7280", lineHeight: 1.8 }}>
          Not ready to talk to a contractor yet? That's completely fine.
          <br />
          Your grade report is saved in your WindowMan Vault —
          <br />
          come back to it whenever you're ready.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#0099BB", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", marginTop: 8, display: "inline-block" }}
        >
          View my saved report →
        </button>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#4B5563", fontStyle: "italic", marginTop: 16, lineHeight: 1.8, maxWidth: 520, margin: "16px auto 0" }}>
          You are under no obligation to contact anyone.
          <br />
          WindowMan earns a referral fee only if you choose to work with a matched contractor.
        </p>
      </div>
    </motion.div>
  );
};

export default ContractorMatch;
