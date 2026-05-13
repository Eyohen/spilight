import { useState } from 'react';
import DeployModal from '../../components/dashboard/DeployModal';
import LogsModal from '../../components/dashboard/LogsModal';
import StatusBadge from '../../components/dashboard/StatusBadge';

const deployments = [
  { id: 'd4f91c2', service: 'api-gateway', branch: 'main', status: 'Live', author: 'Henry', time: '8m ago', duration: '42s' },
  { id: 'a81c03f', service: 'web-dashboard', branch: 'main', status: 'Live', author: 'Maya', time: '27m ago', duration: '1m 12s' },
  { id: 'c7a20aa', service: 'billing-worker', branch: 'queue-scaling', status: 'Preview', author: 'Ife', time: '1h ago', duration: '54s' },
  { id: 'b16d82e', service: 'api-gateway', branch: 'main', status: 'Failed', author: 'Henry', time: '3h ago', duration: '18s' },
];

const DeploymentsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Deployments</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Release history</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
            Track builds, previews, failed releases, and production promotions across services.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-black/80"
        >
          New deployment
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Protected promotion', 'Health checks and rollback windows are enabled for production.'],
          ['Preview branches', 'Every pull request can get isolated runtime and logs.'],
          ['Build cache', 'Recent Node and Docker builds are reusing dependency layers.'],
        ].map(([title, body]) => (
          <article key={title} className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-sm font-semibold">{title}</p>
            <p className="mt-2 text-sm leading-6 text-black/48">{body}</p>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-black/10 bg-white">
        <div className="border-b border-black/10 p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Recent deployments</h2>
        </div>
        <div className="divide-y divide-black/10">
          {deployments.map((deployment) => (
            <article key={deployment.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_160px_120px_120px] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-sm">{deployment.service}</p>
                  <StatusBadge status={deployment.status} />
                </div>
                <p className="mt-2 text-sm text-black/48">
                  {deployment.id} from {deployment.branch} by {deployment.author}
                </p>
              </div>
              <p className="text-sm text-black/54">{deployment.time}</p>
              <p className="text-sm text-black/54">{deployment.duration}</p>
              <div className="flex justify-start gap-2 lg:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLogs(deployment)}
                  className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-bold hover:bg-black hover:text-white"
                >
                  Logs
                </button>
                <button className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-bold hover:bg-black hover:text-white">Rollback</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DeployModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <LogsModal deployment={selectedLogs} open={Boolean(selectedLogs)} onClose={() => setSelectedLogs(null)} />
    </div>
  );
};

export default DeploymentsPage;
