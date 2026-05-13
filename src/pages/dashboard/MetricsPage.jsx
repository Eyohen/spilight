import MetricCard from '../../components/dashboard/MetricCard';

const metrics = [
  { label: 'Requests', value: '18.4M', detail: '+12.5% from previous period' },
  { label: 'P95 latency', value: '141ms', detail: 'Across production services' },
  { label: 'Error rate', value: '0.08%', detail: 'Below alert threshold' },
  { label: 'Compute hours', value: '2,184', detail: '62% of monthly budget' },
];

const services = [
  { name: 'api-gateway', requests: '9.8M', latency: '88ms', errors: '0.04%', cost: '$164' },
  { name: 'web-dashboard', requests: '5.1M', latency: '121ms', errors: '0.02%', cost: '$96' },
  { name: 'billing-worker', requests: '2.9M', latency: '212ms', errors: '0.11%', cost: '$118' },
  { name: 'postgres-main', requests: '612K', latency: '31ms', errors: '0.00%', cost: '$50' },
];

const bars = [
  { label: 'Compute', value: 62 },
  { label: 'Database', value: 38 },
  { label: 'Egress', value: 24 },
  { label: 'Storage', value: 19 },
];

const MetricsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Metrics</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Usage and health</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
          Review resource consumption, latency, error rates, and infrastructure spend.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} label={metric.label} value={metric.value} detail={metric.detail} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <section className="rounded-lg border border-black/10 bg-white">
          <div className="border-b border-black/10 p-5">
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Service metrics</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
                <tr>
                  <th className="px-5 py-3 font-bold">Service</th>
                  <th className="px-5 py-3 font-bold">Requests</th>
                  <th className="px-5 py-3 font-bold">P95 latency</th>
                  <th className="px-5 py-3 font-bold">Errors</th>
                  <th className="px-5 py-3 font-bold">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {services.map((service) => (
                  <tr key={service.name}>
                    <td className="px-5 py-4 font-mono text-sm">{service.name}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.requests}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.latency}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.errors}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Budget usage</h2>
          <div className="mt-6 space-y-5">
            {bars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{bar.label}</span>
                  <span className="text-black/48">{bar.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-black/10">
                  <div className="h-2 rounded-full bg-black" style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MetricsPage;
