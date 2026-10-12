import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import AssistantChat from "./AssistantChat";
import { EASE } from "../lib/motion";

const TITLE_ID = "assistant-dialog-title";

/** Everything inside the dialog that can take focus, in tab order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * A floating button that opens the assistant anywhere on the site.
 *
 * A dialog rather than a route, so a visitor keeps their place on the page and
 * can carry on reading after closing it. Escape closes, focus is trapped while
 * open and returns to the button afterwards, and the page behind cannot scroll.
 */
export default function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const launcher = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes, and Tab cycles inside the dialog rather than escaping to the page.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const items = dialog.current?.querySelectorAll(FOCUSABLE);
      if (!items?.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Hold the page still behind the dialog, and give the width back so the
  // layout does not jump when the scrollbar disappears.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  // Send focus back where it came from, so keyboard users are not dropped at
  // the top of the page.
  useEffect(() => {
    if (!open) launcher.current?.focus({ preventScroll: true });
  }, [open]);

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group/ask fixed right-4 bottom-4 z-50 flex cursor-pointer items-center gap-2.5 rounded-full bg-ink py-3 pr-5 pl-3 text-bg shadow-lift transition-[transform,background-color] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-soft active:scale-95 sm:right-6 sm:bottom-6"
      >
        <span className="relative grid size-8 place-items-center rounded-full bg-accent">
          <MessageCircleQuestion className="size-4" aria-hidden="true" />
          {/* A quiet pulse the first time, so the button is noticed without nagging. */}
          <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" aria-hidden="true" />
        </span>
        <span className="text-[0.92rem] font-medium whitespace-nowrap">Ask about Pranaw</span>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-60 flex items-end justify-center p-0 sm:items-center sm:p-6">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={close}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
              aria-hidden="true"
            />

            <m.div
              ref={dialog}
              role="dialog"
              aria-modal="true"
              aria-labelledby={TITLE_ID}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex max-h-[85dvh] w-full max-w-xl flex-col"
            >
              <AssistantChat
                titleId={TITLE_ID}
                onClose={close}
                autoFocus
                className="h-[80dvh] shadow-lift sm:h-[34rem]"
              />
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
