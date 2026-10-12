import { useEffect, useRef, useState } from "react";

/** True when the visitor asked for reduced motion. Safe when there is no window. */
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Counts up to a number once it scrolls into view.
 *
 * Only used for figures that can be checked — the data volume and repository
 * count come from the projects themselves. Nothing here is a vanity metric like
 * "happy clients", which a reader cannot verify.
 *
 * Anyone who asked for reduced motion gets the final number straight away: the
 * starting value is resolved during initialisation rather than by an effect.
 */
export default function StatCounter({ value, decimals = 0, suffix = "", prefix = "", duration = 1400 }) {
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? value : 0));
  const element = useRef(null);
  const hasRun = useRef(prefersReducedMotion());

  useEffect(() => {
    const node = element.current;
    if (!node || hasRun.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        hasRun.current = true;

        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease out, so the number settles rather than stopping dead.
          setShown(value * (1 - (1 - progress) ** 3));
          if (progress < 1) requestAnimationFrame(step);
          else setShown(value);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = shown.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={element} className="tabular">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
