import ButtonLink from "../components/Button";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found — Pranaw Gautam");

  return (
    <section className="container-page flex flex-1 flex-col justify-center pt-36 pb-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 max-w-3xl text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.05em]">
        This page <span className="font-serif font-normal tracking-[-0.02em] text-accent italic">doesn't exist.</span>
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
        The link may be from an older version of this site. Everything now lives on the home page.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink to="/" size="lg">
          Back home
        </ButtonLink>
        <ButtonLink to="/#work" variant="secondary" size="lg">
          See my work
        </ButtonLink>
      </div>
    </section>
  );
}
