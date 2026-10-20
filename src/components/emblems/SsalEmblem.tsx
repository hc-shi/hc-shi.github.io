// SSAL: label propagation over a graph, and an adversarial step that finds a boundary sample to annotate.
export function SsalEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <marker id="ssal-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" style={{ fill: "var(--acc)" }} />
        </marker>
      </defs>
      <path d="M86 4 C 78 30, 96 60, 86 96" fill="none" strokeWidth={1.2} strokeDasharray="3 3" style={{ stroke: "var(--e-soft)" }} />
      <g strokeWidth={1.2} style={{ stroke: "var(--e-faint)" }}>
        <line x1="26" y1="32" x2="48" y2="18" />
        <line x1="26" y1="32" x2="14" y2="56" />
        <line x1="26" y1="32" x2="46" y2="46" />
        <line x1="46" y1="46" x2="60" y2="70" />
        <line x1="14" y1="56" x2="32" y2="78" />
        <line x1="32" y1="78" x2="60" y2="70" />
        <line x1="76" y1="46" x2="46" y2="46" />
        <line x1="76" y1="46" x2="60" y2="70" />
        <line x1="76" y1="46" x2="120" y2="48" />
        <line x1="128" y1="66" x2="120" y2="48" />
        <line x1="128" y1="66" x2="108" y2="82" />
        <line x1="128" y1="66" x2="146" y2="82" />
        <line x1="120" y1="48" x2="112" y2="28" />
        <line x1="120" y1="48" x2="140" y2="40" />
        <line x1="112" y1="28" x2="140" y2="40" />
      </g>
      <g style={{ fill: "var(--e-soft)" }}>
        <circle cx="48" cy="18" r="3" />
        <circle cx="14" cy="56" r="3" />
        <circle cx="46" cy="46" r="3" />
        <circle cx="32" cy="78" r="3" />
        <circle cx="60" cy="70" r="3" />
      </g>
      <circle cx="26" cy="32" r="4.4" style={{ fill: "var(--e-ink)" }} />
      <g strokeWidth={1.3} style={{ fill: "var(--e-card)", stroke: "var(--e-mid)" }}>
        <circle cx="120" cy="48" r="3" />
        <circle cx="112" cy="28" r="3" />
        <circle cx="140" cy="40" r="3" />
        <circle cx="108" cy="82" r="3" />
        <circle cx="146" cy="82" r="3" />
      </g>
      <circle cx="128" cy="66" r="4.4" strokeWidth={1.8} style={{ fill: "var(--e-card)", stroke: "var(--e-ink)" }} />
      <circle cx="76" cy="46" r="7.5" fill="none" strokeWidth={1.4} style={{ stroke: "var(--acc)" }} />
      <circle cx="76" cy="46" r="3" strokeWidth={1.3} style={{ fill: "var(--e-card)", stroke: "var(--e-ink)" }} />
      <line x1="80" y1="44" x2="95" y2="37" strokeWidth={1.5} markerEnd="url(#ssal-arrow)" style={{ stroke: "var(--acc)" }} />
      <text x="70" y="32" fontSize={12} fontStyle="italic" style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fill: "var(--acc)" }}>?</text>
    </svg>
  );
}
