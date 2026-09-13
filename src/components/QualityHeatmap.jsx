// Single-hue sequential heatmap of missing values (% of rows) per pollutant and
// source, taken from the air-quality pipeline's data_quality_summary.csv.

const MIN_MIX = 8;
const MAX_MIX = 92;

const fill = (mix) => `color-mix(in oklab, var(--accent) ${mix}%, var(--surface))`;

// Text colour per step keeps every value at ≥4:1 contrast in both themes.
function textClass(mix) {
  if (mix >= 80) return "text-white dark:text-[#1a0d07]";
  if (mix >= 70) return "text-ink dark:text-[#1a0d07]";
  return "text-ink";
}

export default function QualityHeatmap({ data, compact = false }) {
  const max = Math.max(...data.sources.flatMap((s) => s.values));
  const mixFor = (v) => Math.round(MIN_MIX + (v / max) * (MAX_MIX - MIN_MIX));

  return (
    <figure className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-sm font-medium text-ink">Missing values by pollutant</p>
        <p className="font-mono text-[0.7rem] text-muted">% of rows · darker = more missing</p>
      </div>

      <table className="w-full table-fixed border-separate border-spacing-0.5 sm:border-spacing-1">
        <caption className="sr-only">
          Percentage of rows missing each pollutant, per data source, from the pipeline's data-quality report.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[4.6rem] sm:w-24">
              <span className="sr-only">Source</span>
            </th>
            {data.pollutants.map((p) => (
              <th key={p} scope="col" className="pb-1.5 text-center font-mono text-[0.68rem] font-normal text-muted sm:text-xs">
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.sources.map((source) => (
            <tr key={source.name}>
              <th scope="row" className="pr-2 text-left align-middle text-[0.8rem] font-medium text-ink-soft sm:text-sm">
                {source.name}
                {!compact && (
                  <span className="hidden font-mono text-[0.65rem] font-normal whitespace-nowrap text-muted sm:block">
                    {source.rows.toLocaleString("en-US")} rows
                  </span>
                )}
              </th>
              {source.values.map((value, i) => {
                const mix = mixFor(value);
                return (
                  <td
                    key={data.pollutants[i]}
                    title={`${source.full} · ${data.pollutants[i]}: ${value}% missing`}
                    style={{ background: fill(mix) }}
                    className={`h-11 rounded-md text-center font-mono text-[0.68rem] font-medium tabular transition-transform duration-300 hover:scale-[1.06] sm:h-14 sm:rounded-lg sm:text-xs ${textClass(mix)}`}
                  >
                    {value < 1 ? value.toFixed(2) : value.toFixed(1)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-3 font-mono text-[0.68rem] text-muted" aria-hidden="true">
        <span>0%</span>
        <span
          className="h-1.5 flex-1 rounded-full"
          style={{ background: `linear-gradient(to right, ${fill(MIN_MIX)}, ${fill(MAX_MIX)})` }}
        />
        <span>{max.toFixed(1)}%</span>
      </div>
    </figure>
  );
}
