import { useEffect, useRef, useState } from "react";

/** True when the visitor asked for reduced motion. Safe when there is no window. */
function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Counts up to a real figure once it scrolls into view.
 *
 * The final value is what renders first (server render, no JS, reduced motion,
 * or a stat already on screen). It is only reset to zero while it is still
 * off-screen, so nobody ever sees a "0" that never gets counted.
 */
export default function StatCounter({ value, decimals = 0, suffix = "", prefix = "", duration = 700 }) {
  const [shown, setShown] = useState(value);
  const element = useRef(null);

  useEffect(() => {
    const node = element.current;
    if (!node || prefersReducedMotion() || !("IntersectionObserver" in window)) return;

    let armed = false;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        // Off-screen: safe to park at zero, ready to count when it arrives.
        if (!armed) {
          armed = true;
          setShown(0);
        }
        return;
      }
      observer.disconnect();
      if (!armed) return; // Already visible on load: keep the real value, no flash.

      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        // Ease out, so the number settles rather than stopping dead.
        setShown(progress < 1 ? value * (1 - (1 - progress) ** 3) : value);
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const format = (n) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const formatted = format(shown);
  // Reserve the final width, so the count never nudges anything beside it.
  const finalLength = `${prefix}${format(value)}${suffix}`.length;

  return (
    <span ref={element} className="tabular inline-block" style={{ minWidth: `${finalLength}ch` }}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
