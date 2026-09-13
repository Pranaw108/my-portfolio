// Shown while a case-study page loads on a cold visit.
export default function PageSkeleton() {
  const block = "animate-pulse rounded-2xl bg-bg-soft";
  return (
    <div className="container-page pt-32 pb-24 md:pt-40" role="status" aria-label="Loading page">
      <div className={`${block} h-4 w-24`} />
      <div className={`${block} mt-8 h-4 w-48`} />
      <div className={`${block} mt-5 h-16 w-full max-w-2xl`} />
      <div className={`${block} mt-5 h-6 w-full max-w-xl`} />
      <div className={`${block} mt-14 aspect-video w-full rounded-4xl`} />
    </div>
  );
}
