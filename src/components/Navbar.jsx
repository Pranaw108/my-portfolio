import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { navItems, profile } from "../data/profile";
import useActiveSection from "../hooks/useActiveSection";
import { EASE } from "../lib/motion";
import ThemeToggle from "./ThemeToggle";
import ButtonLink from "./Button";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const SECTION_IDS = navItems.map((item) => item.id);

export default function Navbar() {
  const { pathname } = useLocation();
  const active = useActiveSection(SECTION_IDS, pathname === "/");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        solid ? "border-line bg-bg/85 backdrop-blur-xl backdrop-saturate-150" : "border-transparent"
      }`}
    >
      <nav aria-label="Main" className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" onClick={close} className="group flex items-center gap-3" aria-label="Pranaw Gautam, home">
          <span className="relative grid size-9 place-items-center rounded-[11px] bg-ink font-mono text-[0.78rem] font-semibold tracking-tight text-bg transition-transform duration-300 ease-out-expo group-hover:-rotate-6">
            PG
            <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent-bright ring-2 ring-bg" />
          </span>
          <span className="hidden text-[0.95rem] font-medium tracking-tight sm:block">Pranaw Gautam</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <Link
                  to={`/#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  data-active={isActive || undefined}
                  className="group relative block rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink data-active:text-ink"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out-expo group-hover:scale-x-50 group-data-active:scale-x-100"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href={profile.resume} external variant="secondary" size="sm">
              Résumé
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-bg-soft md:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-300 ease-out-expo ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-300 ease-out-expo ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden bg-bg md:hidden"
          >
            <div className="container-page flex h-full flex-col justify-between overflow-y-auto pt-6 pb-10">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.06 + i * 0.05 }}
                    className="border-b border-line"
                  >
                    <Link
                      to={`/#${item.id}`}
                      onClick={close}
                      className="flex items-baseline justify-between py-4 text-3xl font-semibold tracking-[-0.03em]"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </Link>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-10 space-y-5"
              >
                <ButtonLink href={profile.resume} external variant="primary" size="lg" className="w-full" onClick={close}>
                  <FileText className="size-4" /> View résumé
                </ButtonLink>
                <div className="flex items-center justify-center gap-2 text-muted">
                  <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-full border border-line hover:text-ink">
                    <Mail className="size-[18px]" />
                  </a>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full border border-line hover:text-ink">
                    <LinkedInIcon className="size-[17px]" />
                  </a>
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full border border-line hover:text-ink">
                    <GitHubIcon className="size-[18px]" />
                  </a>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
