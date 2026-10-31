import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Icon button that copies the address; the label is announced when it flips to "Copied". */
export default function CopyEmail({ email, className = "" }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context) — fall back to the mail client.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`grid size-10 place-items-center rounded-full border transition-colors duration-300 ${
        copied ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400" : "border-line bg-surface text-muted hover:border-line-strong hover:text-ink"
      } ${className}`}
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : "Copy email address"}
      </span>
    </button>
  );
}
