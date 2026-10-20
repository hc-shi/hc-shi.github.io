// Consensus Graph: the image graph aligned with the caption graph; the hallucinated caption node is crossed out.
export function ConsensusEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <rect x="8" y="14" width="58" height="70" rx="5" strokeWidth={1.2} style={{ fill: "var(--e-card)", stroke: "var(--e-soft)" }} />
      <g strokeWidth={1.3} style={{ stroke: "var(--e-mid)" }}>
        <line x1="22" y1="38" x2="50" y2="32" />
        <line x1="22" y1="38" x2="36" y2="68" />
        <line x1="50" y1="32" x2="36" y2="68" />
        <line x1="104" y1="38" x2="132" y2="32" />
        <line x1="104" y1="38" x2="118" y2="68" />
        <line x1="132" y1="32" x2="118" y2="68" />
      </g>
      <line x1="132" y1="32" x2="148" y2="58" strokeWidth={1.2} strokeDasharray="2 2" style={{ stroke: "var(--e-soft)" }} />
      <g fill="none" strokeWidth={1.4} strokeDasharray="3 3" strokeOpacity={.8} style={{ stroke: "var(--acc)" }}>
        <path d="M50 27 C 70 3, 112 3, 132 27" />
        <path d="M36 73 C 58 95, 96 95, 118 73" />
      </g>
      <g style={{ fill: "var(--e-ink)" }}>
        <rect x="18" y="34" width="8" height="8" rx="1.5" />
        <rect x="46" y="28" width="8" height="8" rx="1.5" />
        <rect x="32" y="64" width="8" height="8" rx="1.5" />
      </g>
      <g strokeWidth={1.6} style={{ fill: "var(--e-card)", stroke: "var(--e-ink)" }}>
        <circle cx="104" cy="38" r="4.4" />
        <circle cx="132" cy="32" r="4.4" />
        <circle cx="118" cy="68" r="4.4" />
      </g>
      <circle cx="148" cy="58" r="4.4" strokeWidth={1.2} strokeDasharray="2 1.6" style={{ fill: "var(--e-card)", stroke: "var(--e-mid)" }} />
      <path d="M143.5 53.5 L152.5 62.5 M152.5 53.5 L143.5 62.5" strokeWidth={1.6} style={{ stroke: "var(--acc)" }} />
      <g fontSize={9} fontStyle="italic" textAnchor="middle" style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fill: "var(--faint)" }}>
        <text x="37" y="94">image</text>
        <text x="125" y="94">caption</text>
      </g>
    </svg>
  );
}
