export default function Tag({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-bg/60 px-2.5 py-1 font-mono text-[0.72rem] leading-none text-ink-soft ${className}`}
    >
      {children}
    </span>
  );
}
