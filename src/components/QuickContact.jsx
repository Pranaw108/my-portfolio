import { Download, Mail, MessageCircle } from "lucide-react";
import { profile } from "../data/profile";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

/** WhatsApp wants the number with no spaces, plus or punctuation. */
const whatsappNumber = profile.phoneHref.replace("tel:", "").replace(/\D/g, "");

const actions = [
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
    tone: "text-accent",
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: LinkedInIcon,
    tone: "text-[#0a66c2]",
    external: true,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${whatsappNumber}`,
    icon: MessageCircle,
    tone: "text-[#25d366]",
    external: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    icon: GitHubIcon,
    tone: "text-ink",
    external: true,
  },
];

/**
 * The fastest routes to a reply, before the form.
 *
 * Someone who just wants an address should not have to fill in four fields to
 * get one. The résumé sits last and is styled as the primary action, because a
 * recruiter is usually after that rather than a project brief.
 */
export default function QuickContact() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {actions.map(({ label, href, icon: Icon, tone, external }) => (
        <a
          key={label}
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="group/quick inline-flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-5 py-3 text-[0.95rem] font-medium text-ink shadow-soft transition-[border-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift"
        >
          <Icon className={`size-4 ${tone}`} aria-hidden="true" />
          {label}
        </a>
      ))}

      <a
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="group/quick inline-flex items-center gap-2.5 rounded-2xl bg-ink px-5 py-3 text-[0.95rem] font-medium text-bg shadow-soft transition-[background-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-ink-soft hover:shadow-lift"
      >
        <Download className="size-4 transition-transform duration-300 group-hover/quick:translate-y-0.5" aria-hidden="true" />
        Résumé
      </a>
    </div>
  );
}
