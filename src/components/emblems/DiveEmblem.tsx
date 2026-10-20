// DiVE: rules discovered from demonstrations, verified (one rejected), then evolved into a new rule.
export function DiveEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <marker id="dive-arrow-faint" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" style={{ fill: "var(--faint)" }} />
        </marker>
        <marker id="dive-arrow-acc" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L8 4 L0 8 z" style={{ fill: "var(--acc)" }} />
        </marker>
      </defs>
      <g fontSize={9} fontStyle="italic" textAnchor="middle" style={{ fontFamily: "var(--font-newsreader), Georgia, serif", fill: "var(--faint)" }}>
        <text x="22" y="14">discover</text>
        <text x="74" y="14">verify</text>
        <text x="133" y="14">evolve</text>
      </g>
      <g fill="none" strokeWidth={1.3} strokeLinejoin="round" style={{ stroke: "var(--e-mid)" }}>
        <path d="M6 34 L14 29 L22 35 L30 30 L38 33" />
        <path d="M6 54 L14 49 L22 55 L30 50 L38 53" />
        <path d="M6 74 L14 69 L22 75 L30 70 L38 73" />
      </g>
      <g style={{ fill: "var(--e-mid)" }}>
        <circle cx="38" cy="33" r="1.8" />
        <circle cx="38" cy="53" r="1.8" />
        <circle cx="38" cy="73" r="1.8" />
      </g>
      <line x1="41" y1="53" x2="50" y2="53" strokeWidth={1.3} markerEnd="url(#dive-arrow-faint)" style={{ stroke: "var(--faint)" }} />
      <g strokeWidth={1.2} style={{ fill: "var(--e-card)", stroke: "var(--e-ink)" }}>
        <rect x="53" y="26" width="42" height="15" rx="2.5" />
        <rect x="53" y="45" width="42" height="15" rx="2.5" />
      </g>
      <rect x="53" y="64" width="42" height="15" rx="2.5" strokeWidth={1.2} strokeDasharray="3 2" style={{ fill: "var(--e-card)", stroke: "var(--e-soft)" }} />
      <g strokeWidth={1.4} strokeLinecap="round" style={{ stroke: "var(--e-soft)" }}>
        <line x1="58" y1="31.5" x2="78" y2="31.5" />
        <line x1="58" y1="36" x2="72" y2="36" />
        <line x1="58" y1="50.5" x2="78" y2="50.5" />
        <line x1="58" y1="55" x2="70" y2="55" />
        <line x1="58" y1="69.5" x2="78" y2="69.5" />
        <line x1="58" y1="74" x2="71" y2="74" />
      </g>
      <g fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ stroke: "var(--e-ink)" }}>
        <path d="M83 34 l3 3 l5 -6" />
        <path d="M83 53 l3 3 l5 -6" />
      </g>
      <path d="M84 68.5 l6 6 M90 68.5 l-6 6" strokeWidth={1.4} strokeLinecap="round" style={{ stroke: "var(--e-mid)" }} />
      <line x1="98" y1="43" x2="110" y2="43" strokeWidth={1.5} markerEnd="url(#dive-arrow-acc)" style={{ stroke: "var(--acc)" }} />
      <rect x="113" y="34" width="40" height="18" rx="2.5" strokeWidth={1.6} style={{ fill: "var(--e-card)", stroke: "var(--acc)" }} />
      <g strokeWidth={1.4} strokeLinecap="round" style={{ stroke: "var(--accsoft)" }}>
        <line x1="118" y1="40.5" x2="140" y2="40.5" />
        <line x1="118" y1="45.5" x2="133" y2="45.5" />
      </g>
      <path d="M150 25 v9 M145.5 29.5 h9" strokeWidth={1.6} strokeLinecap="round" style={{ stroke: "var(--acc)" }} />
    </svg>
  );
}
