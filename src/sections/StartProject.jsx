import { useEffect, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { profile } from "../data/profile";
import { services } from "../data/services";
import { sectionIndex } from "../data/sections";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { Button } from "../components/Button";
import QuickContact from "../components/QuickContact";

const SERVICE_OPTIONS = [...services.map((s) => ({ value: s.id, label: s.title })), { value: "other", label: "Something else" }];

const TIMELINE_OPTIONS = ["Not sure yet", "Within a month", "1–3 months", "Just exploring"];

const EMPTY_FORM = { name: "", email: "", service: "", timeline: "", message: "", company: "" };

// A real person takes longer than this to fill the form; bots submit instantly.
const MIN_FILL_SECONDS = 3;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell me your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "That email address doesn't look right.";
  if (!values.service) errors.service = "Pick the closest match so I know what I'm reading.";
  if (values.message.trim().length < 20) {
    errors.message = "A sentence or two about the problem helps more than a one-liner.";
  }
  return errors;
}

/** Shared input styling — one definition, so every field matches. */
const fieldClasses =
  "w-full rounded-2xl border bg-surface px-4 py-3 text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:outline-none";

function fieldState(hasError) {
  return hasError
    ? `${fieldClasses} border-red-500/60 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`
    : `${fieldClasses} border-line focus:border-accent focus:ring-2 focus:ring-accent/20`;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block text-ink-soft">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default function StartProject() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");
  const mountedAt = useRef(null);
  const statusRef = useRef(null);

  // Set after render, so nothing impure runs during it.
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function update(field) {
    return (event) => {
      setValues((previous) => ({ ...previous, [field]: event.target.value }));
      // Clear a field's error as soon as the person starts fixing it.
      if (errors[field]) {
        setErrors((previous) => {
          const next = { ...previous };
          delete next[field];
          return next;
        });
      }
    };
  }

  /** Prefilled email, used if the form backend isn't configured or is down. */
  function mailtoFallback() {
    const subject = `Project enquiry — ${SERVICE_OPTIONS.find((o) => o.value === values.service)?.label ?? "General"}`;
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.timeline && `Timeline: ${values.timeline}`,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");
    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    // Honeypot: only a bot fills a field no human can see.
    const secondsOnForm = mountedAt.current ? (Date.now() - mountedAt.current) / 1000 : 0;
    if (values.company || secondsOnForm < MIN_FILL_SECONDS) {
      setStatus("error");
      setServerError("That looked automated. If you're a person, email me directly and I'll reply.");
      return;
    }

    setStatus("submitting");
    setServerError("");
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          service: values.service,
          timeline: values.timeline,
          message: values.message,
          secondsOnForm,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Your message didn't send.");
      setStatus("success");
      setValues(EMPTY_FORM);
    } catch (error) {
      setStatus("error");
      setServerError(error.message);
    }
    statusRef.current?.focus();
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24 md:py-32">
      <div className="container-page">
        <SectionHeading
          index={sectionIndex("contact")}
          eyebrow="Start a project"
          title="Have something you want built?"
          titleId="contact-title"
          className="mx-auto text-center"
        >
          Tell me the problem rather than the solution — what should be different once it works. I read every message
          myself and reply within a couple of days.
        </SectionHeading>

        <Reveal className="mt-10 md:mt-12">
          <QuickContact />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl md:mt-12">
          <div className="card overflow-hidden shadow-soft">
            {/* Terminal chrome: this is the one piece of styling borrowed from the
                reference site, because a form that looks like a script someone
                runs suits an engineering portfolio. */}
            <div className="flex items-center gap-3 border-b border-line bg-bg-soft px-5 py-3.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink font-mono text-[0.7rem] text-bg">
                {">_"}
              </span>
              <p className="font-mono text-[0.82rem] text-ink-soft">send_message.sh</p>
              <span className="ml-auto flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-[#ec6a5e]" />
                <span className="size-2.5 rounded-full bg-[#f4bf4f]" />
                <span className="size-2.5 rounded-full bg-[#61c454]" />
              </span>
            </div>
            <div className="p-6 sm:p-8 md:p-10">
            {status === "success" ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                className="flex flex-col items-start gap-4 py-8 text-center sm:items-center"
              >
                <CheckCircle2 className="size-10 text-accent" aria-hidden="true" />
                <h3 className="text-2xl font-semibold tracking-[-0.02em]">Message sent.</h3>
                <p className="max-w-md text-left leading-relaxed text-muted text-pretty sm:text-center">
                  Thanks — it's in my inbox. I'll reply to you within a couple of days. If it's urgent, email me
                  directly at {profile.email}.
                </p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="grid gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field id="name" label="Your name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={update("name")}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={fieldState(errors.name)}
                      placeholder="Jane Sharma"
                    />
                  </Field>

                  <Field id="email" label="Email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={update("email")}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={fieldState(errors.email)}
                      placeholder="jane@company.com"
                    />
                  </Field>

                  <Field id="service" label="What do you need?" error={errors.service}>
                    <select
                      id="service"
                      name="service"
                      value={values.service}
                      onChange={update("service")}
                      aria-invalid={Boolean(errors.service)}
                      aria-describedby={errors.service ? "service-error" : undefined}
                      className={`${fieldState(errors.service)} cursor-pointer`}
                    >
                      <option value="">Choose one…</option>
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="timeline" label="Timeline" hint="Optional">
                    <select
                      id="timeline"
                      name="timeline"
                      value={values.timeline}
                      onChange={update("timeline")}
                      className={`${fieldState(false)} cursor-pointer`}
                    >
                      <option value="">No preference</option>
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field
                  id="message"
                  label="About the project"
                  error={errors.message}
                  hint="What's the problem, who is it for, and what does the data look like today?"
                >
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={values.message}
                    onChange={update("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-hint"}
                    className={`${fieldState(errors.message)} resize-y`}
                    placeholder="We have about two years of order history in Postgres and no idea which customers are about to churn…"
                  />
                </Field>

                {/* Honeypot — off-screen for people, still in the DOM for bots. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={update("company")}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button type="submit" size="lg" disabled={status === "submitting"}>
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        <Send className="size-4" aria-hidden="true" /> Send message
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted">
                    Or email me at{" "}
                    <a href={`mailto:${profile.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      {profile.email}
                    </a>
                  </p>
                </div>

                {status === "error" && (
                  <div
                    ref={statusRef}
                    tabIndex={-1}
                    role="alert"
                    className="flex flex-col gap-3 rounded-2xl border border-red-500/30 bg-red-500/5 p-4 text-[0.95rem]"
                  >
                    <p className="flex items-start gap-2 text-red-700 dark:text-red-300">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span className="text-pretty">{serverError}</span>
                    </p>
                    {/* Never a dead end: hand them a prefilled email instead. */}
                    <a
                      href={mailtoFallback()}
                      className="self-start text-sm font-medium text-accent underline underline-offset-4 hover:text-accent-bright"
                    >
                      Send it as an email instead →
                    </a>
                  </div>
                )}
              </form>
            )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
