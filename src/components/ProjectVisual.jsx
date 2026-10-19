import QualityHeatmap from "./QualityHeatmap";
import SourceBiasChart from "./SourceBiasChart";

function PhoneStack({ project }) {
  const [left, center, right] = [project.gallery[0], project.gallery[1], project.gallery[2]];
  const phone =
    "absolute top-10 w-[34%] max-w-[180px] rounded-[1.4rem] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-white/10 transition-transform duration-700 ease-out-expo sm:top-12";

  return (
    <div className="relative h-full min-h-88 overflow-hidden bg-[#1b120d] sm:min-h-112">
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_100%,rgb(226_85_42/0.35),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(40%_40%_at_20%_10%,rgb(255_186_120/0.12),transparent)]" aria-hidden="true" />
      <img
        src={left.src}
        alt=""
        width={left.w}
        height={left.h}
        loading="lazy"
        decoding="async"
        className={`${phone} left-1/2 translate-x-[-122%] translate-y-8 -rotate-6 opacity-80 group-hover:translate-x-[-132%] group-hover:-rotate-8`}
      />
      <img
        src={right.src}
        alt=""
        width={right.w}
        height={right.h}
        loading="lazy"
        decoding="async"
        className={`${phone} left-1/2 translate-x-[22%] translate-y-8 rotate-6 opacity-80 group-hover:translate-x-[32%] group-hover:rotate-8`}
      />
      <img
        src={center.src}
        alt={`${project.title} app: ${center.caption}`}
        width={center.w}
        height={center.h}
        loading="lazy"
        decoding="async"
        className={`${phone} left-1/2 z-10 w-[38%] max-w-50 -translate-x-1/2 group-hover:-translate-y-2`}
      />
    </div>
  );
}

function DashboardShot({ project }) {
  const { image } = project;
  return (
    <div className="relative flex h-full min-h-64 items-center overflow-hidden bg-[#0b1233] p-5 sm:min-h-96 sm:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_0%,rgb(56_120_255/0.28),transparent)]" aria-hidden="true" />
      <img
        src={image.src}
        srcSet={image.srcSet}
        sizes="(min-width: 1024px) 640px, 92vw"
        width={image.w}
        height={image.h}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        className="relative w-full rounded-lg shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-out-expo group-hover:scale-[1.025]"
      />
    </div>
  );
}

/** A web product in a browser frame, with a second screen layered over the corner. */
function ProductShot({ project }) {
  const { image, inset } = project;
  return (
    <div className="relative flex h-full min-h-64 items-center overflow-hidden bg-[#14112b] p-5 sm:min-h-96 sm:p-10 sm:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(65%_60%_at_20%_0%,rgb(124_92_255/0.35),transparent)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_100%_100%,rgb(56_140_255/0.22),transparent)]" aria-hidden="true" />
      <div className="relative w-full overflow-hidden rounded-xl bg-[#f7f7fb] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.8)] ring-1 ring-white/10 transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
        <div className="flex items-center gap-1.5 border-b border-black/5 bg-white px-3 py-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1024px) 640px, 92vw"
          width={image.w}
          height={image.h}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="w-full"
        />
      </div>
      {inset && (
        <img
          src={inset.src}
          width={inset.w}
          height={inset.h}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute right-4 bottom-4 hidden w-[42%] rounded-lg shadow-[0_24px_48px_-16px_rgb(0_0_0/0.75)] ring-1 ring-white/15 transition-transform duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:-translate-x-1 sm:block"
        />
      )}
    </div>
  );
}

function HeatmapPanel({ project }) {
  return (
    <div className="flex h-full min-h-64 items-center bg-bg-soft p-5 sm:min-h-96 sm:p-10">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-line bg-surface p-4 shadow-soft transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 sm:p-6">
        <QualityHeatmap data={project.dataQuality} />
      </div>
    </div>
  );
}

function SourceBiasPanel({ project }) {
  return (
    <div className="flex h-full min-h-64 items-center bg-bg-soft p-5 sm:min-h-96 sm:p-10">
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-line bg-surface p-4 shadow-soft transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 sm:p-6">
        <SourceBiasChart data={project.sourceBias} />
      </div>
    </div>
  );
}

const visuals = {
  phones: PhoneStack,
  dashboard: DashboardShot,
  product: ProductShot,
  heatmap: HeatmapPanel,
  sourceBias: SourceBiasPanel,
};

export default function ProjectVisual({ project }) {
  const Visual = visuals[project.visual];
  // A project without a known visual renders nothing rather than crashing the page.
  if (!Visual) return null;
  return <Visual project={project} />;
}
