import type { Metric } from "../about.data";

type MetricGridProps = {
  metrics: readonly Metric[];
  className: string;
};

export default function MetricGrid({ metrics, className }: MetricGridProps) {
  return (
    <dl className={className}>
      {metrics.map((metric) => (
        <div key={metric.id}>
          <dt>{metric.label}</dt>
          <dd>
            <strong>{metric.value}</strong>
            {metric.unit ? <span>{metric.unit}</span> : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}
