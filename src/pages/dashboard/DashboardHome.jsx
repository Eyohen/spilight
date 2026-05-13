import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeployModal from '../../components/dashboard/DeployModal';
import MetricCard from '../../components/dashboard/MetricCard';
import ProjectFormModal from '../../components/dashboard/ProjectFormModal';
import StatusBadge from '../../components/dashboard/StatusBadge';

const stats = [
  { label: 'Running services', value: '12', change: '+2 this week' },
  { label: 'Deployments', value: '148', change: '9 in 24 hours' },
  { label: 'Avg response', value: '84ms', change: '-12ms from last week' },
  { label: 'Monthly usage', value: '$428', change: '62% of budget' },
];

const services = [
  { name: 'api-gateway', project: 'core', status: 'Live', region: 'fra1', deploy: '8m ago' },
  { name: 'web-dashboard', project: 'console', status: 'Live', region: 'iad1', deploy: '27m ago' },
  { name: 'billing-worker', project: 'payments', status: 'Scaling', region: 'fra1', deploy: '1h ago' },
  { name: 'postgres-main', project: 'core', status: 'Healthy', region: 'fra1', deploy: '2d ago' },
];

const activity = [
  'api-gateway promoted release d4f91c2 to production',
  'billing-worker scaled from 2 to 4 replicas',
  'console preview deployed for branch redesign-auth',
  'postgres-main completed automated backup',
];

const DashboardHome = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [deployModalOpen, setDeployModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Overview</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Production dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
            Monitor service health, recent releases, infrastructure usage, and deployment activity across your workspace.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setProjectModalOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 bg-white px-4 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
          >
            New project
          </button>
          <button
            type="button"
            onClick={() => setDeployModalOpen(true)}
            className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-black/80"
          >
            Deploy
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <MetricCard key={stat.label} label={stat.label} value={stat.value} detail={stat.change} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-lg border border-black/10 bg-white">
          <div className="flex items-center justify-between border-b border-black/10 p-5">
            <div>
              <h2 className="text-lg font-semibold tracking-[-0.03em]">Services</h2>
              <p className="mt-1 text-sm text-black/46">Current production runtime state</p>
            </div>
            <Link to="/dashboard/projects" className="text-sm font-bold text-black/58 hover:text-black">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
                <tr>
                  <th className="px-5 py-3 font-bold">Service</th>
                  <th className="px-5 py-3 font-bold">Project</th>
                  <th className="px-5 py-3 font-bold">Status</th>
                  <th className="px-5 py-3 font-bold">Region</th>
                  <th className="px-5 py-3 font-bold">Last deploy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {services.map((service) => (
                  <tr key={service.name}>
                    <td className="px-5 py-4 font-mono text-sm">{service.name}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.project}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={service.status} />
                    </td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.region}</td>
                    <td className="px-5 py-4 text-sm text-black/58">{service.deploy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-black/10 bg-white">
          <div className="border-b border-black/10 p-5">
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Activity</h2>
            <p className="mt-1 text-sm text-black/46">Latest workspace events</p>
          </div>
          <div className="space-y-4 p-5">
            {activity.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-black" />
                <p className="text-sm leading-6 text-black/62">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ProjectFormModal open={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
      <DeployModal open={deployModalOpen} onClose={() => setDeployModalOpen(false)} />
    </div>
  );
};

export default DashboardHome;
