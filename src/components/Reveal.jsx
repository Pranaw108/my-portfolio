import { m } from "framer-motion";
import { EASE } from "../lib/motion";

/** Fades and lifts its children into view once, the first time they scroll on screen. */
export default function Reveal({ as = "div", delay = 0, y = 18, children, ...props }) {
  const Component = m[as];
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...props}
    >
      {children}
    </Component>
  );
}
