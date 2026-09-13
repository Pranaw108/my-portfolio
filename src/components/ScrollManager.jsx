import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { prefersReducedMotion } from "../lib/motion";

// Scroll position per history entry, so Back returns you to where you were.
const positions = new Map();

/**
 * - New page: start at the top.
 * - Link with a #hash: scroll to that section (smoothly when staying on the same page).
 * - Back/forward: restore the previous position.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const lastPathname = useRef(pathname);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
  }, []);

  useLayoutEffect(() => {
    let frame = 0;
    const save = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => positions.set(key, window.scrollY));
    };
    window.addEventListener("scroll", save, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", save);
    };
  }, [key]);

  useLayoutEffect(() => {
    const samePage = lastPathname.current === pathname;
    lastPathname.current = pathname;
    const behavior = samePage && !prefersReducedMotion() ? "smooth" : "auto";

    if (navigationType === "POP" && positions.has(key)) {
      window.scrollTo({ top: positions.get(key), behavior: "auto" });
      return;
    }
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior });
  }, [pathname, hash, key, navigationType]);

  return null;
}
