import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Bot, Send, Sparkles, X } from "lucide-react";
import { OPENING, ask } from "../lib/assistant";
import { profile } from "../data/profile";
import { EASE } from "../lib/motion";

// Long enough to read as thinking, short enough not to feel like waiting.
const REPLY_DELAY_MS = 420;

/** Renders **bold** and _italic_. The answers are ours, so no HTML is parsed. */
function RichText({ text }) {
  return text.split("\n").map((line, i) =>
    line.trim() === "" ? (
      <span key={i} className="block h-2" />
    ) : (
      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
        {line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={j} className="font-semibold text-ink">{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith("_") && part.endsWith("_")) {
            return <em key={j} className="text-muted">{part.slice(1, -1)}</em>;
          }
          return part;
        })}
      </p>
    ),
  );
}

function AnswerLink({ link }) {
  const classes =
    "inline-flex items-center gap-1 rounded-full border border-line-strong px-3 py-1 text-[0.8rem] font-medium text-accent transition-colors hover:border-accent";
  if (link.to) {
    return (
      <Link to={link.to} className={classes}>
        {link.label}
        <ArrowUpRight className="size-3" aria-hidden="true" />
      </Link>
    );
  }
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={classes}>
      {link.label}
      <ArrowUpRight className="size-3" aria-hidden="true" />
    </a>
  );
}

function Bubble({ message }) {
  const fromVisitor = message.from === "visitor";
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={`flex gap-3 ${fromVisitor ? "justify-end" : ""}`}
    >
      {!fromVisitor && (
        <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
          <Bot className="size-4" aria-hidden="true" />
        </span>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed ${
          fromVisitor ? "bg-ink text-bg" : "border border-line bg-surface text-ink-soft"
        }`}
      >
        <RichText text={message.text} />
        {message.links?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.links.map((link) => (
              <AnswerLink key={link.label} link={link} />
            ))}
          </div>
        )}
      </div>
    </m.div>
  );
}

/**
 * The assistant panel, shared by the page section and the floating launcher.
 *
 * One implementation rather than two, so an answer or a fix can never be right
 * in one place and stale in the other.
 */
export default function AssistantChat({ titleId, onClose, autoFocus = false, className = "" }) {
  const [messages, setMessages] = useState([{ from: "bot", ...OPENING }]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scroller = useRef(null);
  const input = useRef(null);
  const timer = useRef(null);

  const latest = messages[messages.length - 1];
  const chips = latest.from === "bot" ? (latest.chips ?? []) : [];

  // Keep the newest message in view without moving the page itself.
  useEffect(() => {
    const node = scroller.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
    return () => clearTimeout(timer.current);
  }, [autoFocus]);

  function send(question) {
    const text = question.trim();
    if (!text || thinking) return;

    setMessages((previous) => [...previous, { from: "visitor", text }]);
    setDraft("");
    setThinking(true);

    timer.current = setTimeout(() => {
      setMessages((previous) => [...previous, { from: "bot", ...ask(text) }]);
      setThinking(false);
    }, REPLY_DELAY_MS);
  }

  return (
    <div className={`card flex min-h-0 flex-col overflow-hidden ${className}`}>
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-bg">
          <Sparkles className="size-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p id={titleId} className="font-medium">
            Ask about {profile.name.split(" ")[0]}
          </p>
          <p className="flex items-center gap-1.5 text-[0.78rem] text-muted">
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Answers from this site's data
          </p>
        </div>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="grid size-9 cursor-pointer place-items-center rounded-full text-muted transition-colors hover:bg-bg-soft hover:text-ink"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="eyebrow hidden text-muted sm:block">no API, no guessing</span>
        )}
      </header>

      <div
        ref={scroller}
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        <AnimatePresence initial={false}>
          {messages.map((message, i) => (
            <Bubble key={i} message={message} />
          ))}
        </AnimatePresence>

        {thinking && (
          <div className="flex gap-3" aria-hidden="true">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
              <Bot className="size-4" />
            </span>
            <span className="flex items-center gap-1 rounded-2xl border border-line bg-surface px-4 py-3">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className="size-1.5 animate-bounce rounded-full bg-muted"
                  style={{ animationDelay: `${dot * 140}ms` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-line px-5 pt-4">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => send(chip)}
              className="cursor-pointer rounded-full border border-line-strong px-3 py-1.5 text-[0.82rem] text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
        className="flex items-center gap-2 px-5 py-4"
      >
        <label htmlFor={`${titleId}-input`} className="sr-only">
          Ask a question about {profile.name}
        </label>
        <input
          id={`${titleId}-input`}
          ref={input}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={`Ask anything about ${profile.name.split(" ")[0]}…`}
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-bg px-4 text-[0.95rem] text-ink transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim() || thinking}
          aria-label="Send question"
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-ink text-bg transition-[background-color,transform] duration-300 hover:bg-ink-soft active:scale-95 disabled:pointer-events-none disabled:opacity-40"
        >
          <Send className="size-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
