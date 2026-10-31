import { Download, Mail, MessageCircle } from "lucide-react";
import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import CopyEmail from "./CopyEmail";

/** WhatsApp wants the number with no spaces, plus or punctuation. */
const whatsappNumber = profile.phoneHref.replace("tel:", "").replace(/\D/g, "");

const links = [
  { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedInIcon, tone: "text-[#0a66c2] dark:text-[#5aa9ff]" },
  { label: "GitHub", href: profile.links.github, icon: GitHubIcon, tone: "text-ink" },
  { label: "WhatsApp", href: `https://wa.me/${whatsappNumber}`, icon: MessageCircle, tone: "text-[#128c4a] dark:text-[#4ade80]" },
];

const chip =
  "inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium text-ink transition-[border-color,translate,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-soft";

/**
 * The one row of direct contact options, beside the form. Every direct route
 * lives here once: email (with copy), LinkedIn, GitHub, WhatsApp and the résumé.
 */
export default function QuickContact() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="eyebrow">Or reach me directly</p>
      <ul className="flex flex-wrap items-center justify-center gap-2" aria-label="Direct contact options">
        <li className="flex items-center gap-1">
          <a href={`mailto:${profile.email}`} className={chip}>
            <Mail className="size-4 text-accent" aria-hidden="true" />
            <span className="hidden sm:inline">{profile.email}</span>
            <span className="sm:hidden">Email</span>
          </a>
          <CopyEmail email={profile.email} />
        </li>
        {links.map(({ label, href, icon: Icon, tone }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer" className={chip}>
              <Icon className={`size-4 ${tone}`} aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
        <li>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cv inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg transition-[background-color,translate] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-soft"
          >
            <Download className="size-4 transition-transform duration-300 group-hover/cv:translate-y-0.5" aria-hidden="true" />
            Résumé
          </a>
        </li>
      </ul>
    </div>
  );
}
