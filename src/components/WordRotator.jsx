import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

/**
 * Cycles through a few words in place. Every word is laid out invisibly in the
 * same grid cell, so the slot is as wide as the longest one and the line never
 * reflows. Decorative only: callers put the full phrase in a visually-hidden
 * span, and this whole element is aria-hidden.
 */
export default function WordRotator({ words, paused = false, interval = 2800, className = "" }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || paused || words.length < 2) return;
    const id = setInterval(() => {
      // Don't advance in a background tab, so it isn't mid-word on return.
      if (!document.hidden) setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [reduce, paused, words.length, interval]);

  return (
    <span aria-hidden="true" className={`inline-grid align-bottom ${className}`}>
      {words.map((word) => (
        <span key={word} className="invisible col-start-1 row-start-1 whitespace-nowrap">
          {word}
        </span>
      ))}
      <span className="col-start-1 row-start-1 overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <AnimatePresence mode="wait" initial={false}>
          <m.span
            key={words[index]}
            className="block whitespace-nowrap"
            initial={{ y: "70%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-70%", opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {words[index]}
          </m.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
