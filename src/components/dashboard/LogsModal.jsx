/* eslint-disable react/prop-types */

import DashboardModal from './DashboardModal';
import StatusBadge from './StatusBadge';

const buildLogs = [
  '10:42:01  Cloning repository acme/api-gateway',
  '10:42:03  Checking out commit d4f91c2 on branch main',
  '10:42:05  Restored Node.js dependency cache',
  '10:42:12  npm ci completed in 7.2s',
  '10:42:18  Running production build',
  '10:42:31  Build completed successfully',
  '10:42:34  Creating release image',
  '10:42:41  Release image pushed to spilight registry',
  '10:42:43  Health checks passed',
  '10:42:44  Deployment promoted to production',
];

const runtimeLogs = [
  '10:43:02  GET /v1/projects 200 42ms',
  '10:43:04  POST /v1/deployments 201 88ms',
  '10:43:08  GET /health 200 4ms',
  '10:43:11  Worker queue depth stable at 18 jobs',
  '10:43:15  Connected to postgres-main through private network',
  '10:43:20  GET /v1/services/api-gateway 200 37ms',
  '10:43:26  Memory usage 384MB of 1024MB',
  '10:43:31  Autoscaler reports 3 active replicas',
];

const LogsModal = ({ deployment, open, onClose }) => {
  if (!deployment) return null;

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={`${deployment.service} logs`}
      description={`Deployment ${deployment.id} from ${deployment.branch}`}
      size="full"
    >
      <div className="space-y-5">
        <div className="grid gap-3 rounded-lg border border-black/10 bg-[#f7f7f7] p-4 sm:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-black/38">Status</p>
            <div className="mt-2"><StatusBadge status={deployment.status} /></div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-black/38">Author</p>
            <p className="mt-2 text-sm font-medium">{deployment.author}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-black/38">Duration</p>
            <p className="mt-2 text-sm font-medium">{deployment.duration}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-black/38">Region</p>
            <p className="mt-2 text-sm font-medium">fra1</p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <section className="overflow-hidden rounded-lg border border-black/10">
            <div className="border-b border-black/10 bg-white px-4 py-3">
              <h3 className="text-sm font-semibold">Build output</h3>
            </div>
            <div className="max-h-[520px] min-h-[420px] overflow-auto bg-black p-4 font-mono text-xs leading-6 text-white/62">
              {buildLogs.map((line) => (
                <p key={line}><span className="text-white/35">{line.slice(0, 8)}</span>{line.slice(8)}</p>
              ))}
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-black/10">
            <div className="border-b border-black/10 bg-white px-4 py-3">
              <h3 className="text-sm font-semibold">Runtime stream</h3>
            </div>
            <div className="max-h-[520px] min-h-[420px] overflow-auto bg-black p-4 font-mono text-xs leading-6 text-white/62">
              {runtimeLogs.map((line) => (
                <p key={line}><span className="text-white/35">{line.slice(0, 8)}</span>{line.slice(8)}</p>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-black/10 pt-5 sm:flex-row sm:items-center">
          <p className="text-sm text-black/48">Live tail simulation. Backend log streaming can be connected later.</p>
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-md bg-black px-4 text-sm font-bold text-white"
          >
            Close logs
          </button>
        </div>
      </div>
    </DashboardModal>
  );
};

export default LogsModal;
