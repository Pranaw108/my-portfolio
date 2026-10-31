import { m, useReducedMotion } from "framer-motion";
import { EASE } from "../lib/motion";

// The resting "before" state stays readable (mostly opaque, barely offset), so a
// card is never invisible if the in-view trigger does not fire, e.g. in a capture.
const variants = {
  before: { opacity: 0.55, y: 16, scale: 0.97 },
  after: { opacity: 1, y: 0, scale: 1 },
};

/**
 * One cell of a card grid that settles into place when it scrolls into view.
 * The delay follows the column, so a row builds left to right and each card on
 * a phone animates as it arrives rather than all at once off-screen.
 */
export default function BentoItem({ as = "div", index = 0, columns = 3, className = "", children, ...props }) {
  const reduce = useReducedMotion();
  const Component = m[as];
  return (
    <Component
      {...props}
      className={className}
      variants={variants}
      initial={reduce ? false : "before"}
      whileInView="after"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay: (index % columns) * 0.08 }}
    >
      {children}
    </Component>
  );
}
