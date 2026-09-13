import { m, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

// A decorative trend line (not data) that draws itself behind the hero.
const LINE =
  "M0 262 C 60 258, 90 236, 140 240 S 220 262, 270 238 S 350 196, 410 206 S 490 238, 540 214 S 620 160, 690 168 S 770 196, 830 170 S 910 118, 970 122 S 1040 136, 1080 100 S 1130 66, 1160 60";
const AREA = `${LINE} L 1160 300 L 0 300 Z`;
const END = { x: 1160, y: 60 };

export default function HeroChart({ className = "" }) {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 300"
      preserveAspectRatio="xMaxYMax slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="1" />
        </linearGradient>
      </defs>

      {[80, 140, 200, 260].map((y) => (
        <line key={y} x1="0" x2="1200" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 6" />
      ))}

      <m.path
        d={AREA}
        fill="url(#hero-area)"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      />
      <m.path
        d={LINE}
        fill="none"
        stroke="url(#hero-line)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.5 }}
      />
      <m.g
        initial={reduce ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: 2.5 }}
        style={{ transformOrigin: `${END.x}px ${END.y}px` }}
      >
        <circle cx={END.x} cy={END.y} r="10" fill="var(--accent)" opacity="0.18" />
        <circle cx={END.x} cy={END.y} r="4.5" fill="var(--accent)" />
      </m.g>
    </svg>
  );
}
