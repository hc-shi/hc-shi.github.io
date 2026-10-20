// Programmatic Skill Networks: a skill graph growing a new node.
export function PsnEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <g strokeWidth={1.4} style={{ stroke: "var(--e-soft)" }}>
        <line x1="18" y1="80" x2="34" y2="52" />
        <line x1="48" y1="84" x2="34" y2="52" />
        <line x1="48" y1="84" x2="74" y2="50" />
        <line x1="80" y1="82" x2="74" y2="50" />
        <line x1="112" y1="84" x2="126" y2="52" />
        <line x1="142" y1="80" x2="126" y2="52" />
        <line x1="34" y1="52" x2="54" y2="22" />
        <line x1="74" y1="50" x2="54" y2="22" />
      </g>
      <g strokeWidth={1.6} strokeDasharray="3 3" style={{ stroke: "var(--acc)" }}>
        <line x1="74" y1="50" x2="104" y2="20" />
        <line x1="126" y1="52" x2="104" y2="20" />
      </g>
      <g style={{ fill: "var(--e-ink)" }}>
        <circle cx="18" cy="80" r="3.4" />
        <circle cx="48" cy="84" r="3.4" />
        <circle cx="80" cy="82" r="3.4" />
        <circle cx="112" cy="84" r="3.4" />
        <circle cx="142" cy="80" r="3.4" />
        <circle cx="34" cy="52" r="4.4" />
        <circle cx="74" cy="50" r="4.4" />
        <circle cx="126" cy="52" r="4.4" />
        <circle cx="54" cy="22" r="5.2" />
      </g>
      <circle cx="104" cy="20" r="5.6" strokeWidth={1.8} style={{ fill: "var(--emb)", stroke: "var(--acc)" }} />
      <path d="M101.5 20 h5 M104 17.5 v5" strokeWidth={1.4} style={{ stroke: "var(--acc)" }} />
    </svg>
  );
}
