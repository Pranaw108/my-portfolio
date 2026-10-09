// Per-source accuracy for the classes that appear in more than one dataset,
// from ml/training/RESULTS.md. The point of the chart is the GAP: a class that
// scores very differently between its sources means the model is partly reading
// which dataset a photo came from, not the disease.
//
// One measure, one hue. Identity comes from the row label, so there is no legend
// and no colour-by-rank — the bar for the weaker source is the same colour.

const BAR_COLOR = "var(--chart-1)";

/** Rows within one class, so a shared label can span them. */
function ClassGroup({ group, isLast }) {
  const spread = Math.max(...group.sources.map((s) => s.accuracy)) - Math.min(...group.sources.map((s) => s.accuracy));

  return (
    <>
      {group.sources.map((source, i) => (
        <tr key={source.short}>
          {i === 0 && (
            <th
              scope="rowgroup"
              rowSpan={group.sources.length}
              className={`py-2 pr-3 align-middle text-left text-[0.8rem] leading-tight font-medium text-ink ${
                isLast ? "" : "border-b border-line"
              }`}
            >
              {group.label}
              {spread >= 0.1 && (
                <span className="mt-0.5 block font-mono text-[0.62rem] font-normal text-accent">
                  {Math.round(spread * 100)} pt gap
                </span>
              )}
            </th>
          )}
          <th
            scope="row"
            className={`py-2 pr-3 text-left font-mono text-[0.62rem] font-normal whitespace-nowrap text-muted ${
              isLast && i === group.sources.length - 1 ? "" : "border-b border-line"
            }`}
          >
            {source.short}
            <span className="ml-1.5 opacity-70">n={source.n}</span>
          </th>
          <td
            className={`py-2 ${isLast && i === group.sources.length - 1 ? "" : "border-b border-line"}`}
            title={`${group.label} · ${source.short}: ${(source.accuracy * 100).toFixed(1)}% accuracy on ${source.n} test images`}
          >
            <div className="flex items-center gap-2">
              {/* Track makes a short bar still legible as "low", not missing. */}
              <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-bg-soft">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out-expo"
                  style={{ width: `${Math.max(source.accuracy * 100, 1.5)}%`, background: BAR_COLOR }}
                />
              </div>
              <span className="w-11 shrink-0 text-right font-mono text-[0.68rem] font-medium tabular text-ink-soft">
                {(source.accuracy * 100).toFixed(1)}%
              </span>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default function SourceBiasChart({ data }) {
  return (
    <figure className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-medium text-ink">Test accuracy by source dataset</p>
        <p className="font-mono text-[0.7rem] text-muted">classes with 2+ sources</p>
      </div>

      <table className="w-full">
        <caption className="sr-only">
          Test-set accuracy for each class that appears in more than one source dataset, with the number of test
          images per source. A large gap between two sources of the same class indicates the model is partly
          learning the source rather than the disease.
        </caption>
        <tbody>
          {data.classes.map((group, i) => (
            <ClassGroup key={group.label} group={group} isLast={i === data.classes.length - 1} />
          ))}
        </tbody>
      </table>

      {data.note && <figcaption className="mt-4 text-[0.78rem] leading-relaxed text-muted text-pretty">{data.note}</figcaption>}
    </figure>
  );
}
