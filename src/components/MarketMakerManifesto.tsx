import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Home, Hammer, BarChart3, Check, Scale } from "lucide-react";

const MarketMakerManifesto = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.5, delay },
  });

  return (
    <section style={{ backgroundColor: "#0F1F35" }}>
      <div
        ref={ref}
        className="mx-auto px-4 md:px-8 py-20 md:py-28"
        style={{ maxWidth: 1080 }}
      >
        {/* Eyebrow */}
        <motion.p
          {...fade(0)}
          className="text-center"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: "#0099BB",
            letterSpacing: "0.1em",
            marginBottom: 20,
          }}
        >
          HOW WINDOWMAN ACTUALLY WORKS
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fade(0.05)}
          className="text-center mx-auto"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 46px)",
            color: "#FFFFFF",
            fontWeight: 700,
            maxWidth: 700,
            marginBottom: 14,
          }}
        >
          We keep both sides honest.
        </motion.h2>

        {/* Sub */}
        <motion.p
          {...fade(0.1)}
          className="text-center mx-auto"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            color: "#D1D5DB",
            lineHeight: 1.7,
            maxWidth: 600,
            marginBottom: 56,
          }}
        >
          Most services profit from information asymmetry.
          <br />
          WindowMan profits from eliminating it.
        </motion.p>

        {/* Three-Party Diagram */}
        <motion.div
          {...fade(0.15)}
          className="mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0"
          style={{ maxWidth: 720, marginBottom: 56 }}
        >
          {/* Node 1 — Homeowner */}
          <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(5,150,105,0.15)",
                border: "2px solid rgba(5,150,105,0.4)",
              }}
            >
              <Home size={28} color="#059669" />
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 10,
              }}
            >
              You
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              The homeowner
            </span>
          </div>

          {/* Connector 1 */}
          <div className="flex flex-col items-center flex-1 min-w-[80px] py-2 md:py-0">
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#C8952A",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              your quote + contact info
            </span>
            <div className="hidden md:block w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="md:hidden w-px h-6" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#059669",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              free AI analysis + better price
            </span>
          </div>

          {/* Node 2 — WindowMan */}
          <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "rgba(200,149,42,0.15)",
                border: "2px solid rgba(200,149,42,0.5)",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 18,
                  fontWeight: 900,
                  color: "#C8952A",
                }}
              >
                WM
              </span>
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 10,
              }}
            >
              WindowMan
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              The market maker
            </span>
          </div>

          {/* Connector 2 */}
          <div className="flex flex-col items-center flex-1 min-w-[80px] py-2 md:py-0">
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#C8952A",
                marginBottom: 4,
                textAlign: "center",
              }}
            >
              warm lead + quote intel
            </span>
            <div className="hidden md:block w-full h-px" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="md:hidden w-px h-6" style={{ background: "rgba(255,255,255,0.15)" }} />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 10,
                color: "#059669",
                marginTop: 4,
                textAlign: "center",
              }}
            >
              6–8% on closed sales only
            </span>
          </div>

          {/* Node 3 — Contractor */}
          <div className="flex flex-col items-center" style={{ minWidth: 120 }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(0,153,187,0.15)",
                border: "2px solid rgba(0,153,187,0.4)",
              }}
            >
              <Hammer size={28} color="#0099BB" />
            </div>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 10,
              }}
            >
              The Contractor
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#94A3B8",
              }}
            >
              Vetted. Fair-priced.
            </span>
          </div>
        </motion.div>

        {/* Explanation Blocks */}
        <motion.div
          {...fade(0.25)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          style={{ marginTop: 40 }}
        >
          {/* Block 1 — Homeowners */}
          <div
            style={{
              background: "rgba(5,150,105,0.08)",
              border: "1px solid rgba(5,150,105,0.2)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(5,150,105,0.2)",
              }}
            >
              <Check size={18} color="#059669" strokeWidth={3} />
            </div>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 12,
              }}
            >
              What you get — free
            </h3>
            <ul
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#D1D5DB",
                lineHeight: 1.8,
                marginTop: 12,
                listStyle: "disc",
                paddingLeft: 18,
              }}
            >
              <li>A forensic AI analysis of your quote</li>
              <li>Fair-market benchmarks for your county</li>
              <li>Every red flag identified and explained</li>
              <li>A negotiation script built for your specific situation</li>
              <li>
                An introduction to a contractor who'll beat your price
                <span style={{ color: "#94A3B8" }}> — only if you want it</span>
              </li>
            </ul>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#6B7280",
                fontStyle: "italic",
                marginTop: 14,
              }}
            >
              We earn nothing unless you choose to work with our contractor and they close your project.
            </p>
          </div>

          {/* Block 2 — Business Model */}
          <div
            style={{
              background: "rgba(200,149,42,0.08)",
              border: "1px solid rgba(200,149,42,0.2)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(200,149,42,0.2)",
              }}
            >
              <Scale size={18} color="#C8952A" strokeWidth={2.5} />
            </div>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 12,
              }}
            >
              How we make money
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#D1D5DB",
                lineHeight: 1.8,
                marginTop: 12,
              }}
            >
              WindowMan earns a percentage of the sale — only when a homeowner chooses to work with one of our contractors and the project is completed.
              <br /><br />
              We never charge homeowners. We never charge for the scan. We never get paid for sending a lead.
              <br /><br />
              We only get paid when you get a better price than you would have gotten without us. That's the only model that keeps us honest.
            </p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#6B7280",
                fontStyle: "italic",
                marginTop: 14,
              }}
            >
              If your current quote is already fair, we'll tell you that too.
            </p>
          </div>

          {/* Block 3 — Contractors */}
          <div
            style={{
              background: "rgba(0,153,187,0.08)",
              border: "1px solid rgba(0,153,187,0.2)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(0,153,187,0.2)",
              }}
            >
              <BarChart3 size={18} color="#0099BB" strokeWidth={2.5} />
            </div>
            <h3
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                fontWeight: 700,
                color: "#FFFFFF",
                marginTop: 12,
              }}
            >
              What our contractors receive
            </h3>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#D1D5DB",
                lineHeight: 1.8,
                marginTop: 12,
              }}
            >
              Every homeowner we introduce has already been educated on fair-market pricing. They've seen the red flags in competing quotes. They understand the value of brand specifications and proper warranties.
              <br /><br />
              Our contractors don't walk into cold calls. They walk into conversations that are already halfway won.
            </p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: "#6B7280",
                fontStyle: "italic",
                marginTop: 14,
              }}
            >
              We work with a small number of vetted contractors per county.
            </p>
          </div>
        </motion.div>

        {/* Closing Line */}
        <motion.p
          {...fade(0.35)}
          className="text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            color: "#C8952A",
            fontWeight: 700,
            fontStyle: "italic",
            marginTop: 48,
          }}
        >
          "The industry profits from you not knowing. We profit from you knowing."
        </motion.p>
      </div>
    </section>
  );
};

export default MarketMakerManifesto;
