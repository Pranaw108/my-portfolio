import { ArrowUpRight, Mail } from "lucide-react";
import { profile } from "../data/profile";
import Reveal from "../components/Reveal";
import ButtonLink from "../components/Button";
import CopyEmail from "../components/CopyEmail";
import { GitHubIcon, LinkedInIcon } from "../components/BrandIcons";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="pb-24 md:pb-32">
      <div className="container-page">
        {/* Always-dark panel, so colours are fixed rather than theme tokens */}
        <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] bg-[#141310] px-6 py-16 text-[#f1eee6] sm:px-12 md:px-16 md:py-24 dark:ring-1 dark:ring-white/10">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -right-32 -bottom-48 size-160 rounded-full bg-[radial-gradient(closest-side,rgb(226_85_42/0.28),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_70%_at_100%_100%,black,transparent)] bg-size-[24px_24px]" />
          </div>

          <p className="eyebrow flex items-center gap-3 text-[#a8a395]">
            <span className="text-[#ff8a5c]">06</span>
            <span className="h-px w-8 bg-white/20" aria-hidden="true" />
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance"
          >
            Got data that should be doing more?{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-[#ff8a5c] italic">Let's talk.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#b9b4a8] text-pretty">
            Whether it's a role, a project or a question about my work — email is the quickest way to reach me.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-[clamp(1.2rem,3.2vw,2rem)] font-medium tracking-[-0.02em] break-all underline decoration-white/20 decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-[#ff8a5c]"
            >
              {profile.email}
            </a>
            <CopyEmail email={profile.email} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${profile.email}`} variant="inverse" size="lg">
              <Mail className="size-4" aria-hidden="true" /> Email me
            </ButtonLink>
            <ButtonLink href={profile.links.linkedin} variant="inverse-outline" size="lg">
              <LinkedInIcon /> LinkedIn
            </ButtonLink>
            <ButtonLink href={profile.links.github} variant="inverse-outline" size="lg">
              <GitHubIcon /> GitHub
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-[#8f8a7e]">Phone</dt>
              <dd className="mt-1.5">
                <a href={profile.phoneHref} className="text-[#e7e3d9] hover:text-white">
                  {profile.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow text-[#8f8a7e]">Location</dt>
              <dd className="mt-1.5 text-[#e7e3d9]">{profile.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-[#8f8a7e]">Résumé</dt>
              <dd className="mt-1.5">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[#e7e3d9] hover:text-white"
                >
                  View PDF
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
