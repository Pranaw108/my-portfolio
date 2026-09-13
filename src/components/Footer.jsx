import { ArrowUp } from "lucide-react";
import { profile } from "../data/profile";
import { prefersReducedMotion } from "../lib/motion";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const iconLink = "grid size-9 place-items-center rounded-full transition-colors hover:bg-bg-soft hover:text-ink";

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
          <span className="mx-2 text-line-strong" aria-hidden="true">/</span>
          {profile.locationShort}
        </p>

        <div className="flex items-center gap-1">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
            <GitHubIcon />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
            <LinkedInIcon />
          </a>
          <span className="mx-2 h-4 w-px bg-line" aria-hidden="true" />
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-1.5 rounded-full px-3 py-2 transition-colors hover:bg-bg-soft hover:text-ink"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
