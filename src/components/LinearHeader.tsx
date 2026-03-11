import "@fontsource/dm-sans/800.css";
import "@fontsource/ibm-plex-mono/400.css";

const LinearHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background animate-header-slide-down">
      <div className="flex items-center justify-between h-14 md:h-16 px-4 md:px-8">
        {/* Logo */}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 18 }}>
          <span className="text-foreground">WINDOW</span>
          <span className="text-primary">MAN</span>
          <sup className="text-muted-foreground text-[10px] font-normal tracking-wider ml-0.5 align-super">
            .PRO
          </sup>
        </div>

        {/* Trust Signal Pill */}
        <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1">
          <span className="w-2 h-2 rounded-full bg-brand-lime animate-pulse-dot shrink-0" />
          <span
            className="text-primary whitespace-nowrap text-[11px]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            4,127 scans this month
          </span>
        </div>
      </div>
    </header>
  );
};

export default LinearHeader;
