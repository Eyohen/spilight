import { useState } from 'react';
import ProjectFormModal from '../../components/dashboard/ProjectFormModal';
import StatusBadge from '../../components/dashboard/StatusBadge';

const projects = [
  { name: 'core-platform', services: 5, region: 'fra1', spend: '$218', status: 'Live', updated: '8 minutes ago' },
  { name: 'customer-console', services: 3, region: 'iad1', spend: '$94', status: 'Live', updated: '27 minutes ago' },
  { name: 'payments', services: 2, region: 'fra1', spend: '$76', status: 'Scaling', updated: '1 hour ago' },
  { name: 'observability', services: 2, region: 'lhr1', spend: '$40', status: 'Healthy', updated: '2 hours ago' },
];

const environments = ['Production', 'Staging', 'Preview'];

const ProjectsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Project control</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
            Organize services, environments, regions, and spend around each product boundary.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-black px-4 text-sm font-bold text-white transition-colors hover:bg-black/80"
        >
          New project
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {environments.map((environment) => (
          <article key={environment} className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-sm font-semibold">{environment}</p>
            <p className="mt-2 text-sm leading-6 text-black/48">
              {environment === 'Production' ? '4 live projects with protected promotion rules.' : `${environment} workloads inherit production defaults.`}
            </p>
          </article>
        ))}
      </div>

      <section className="rounded-lg border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Projects</h2>
            <p className="mt-1 text-sm text-black/46">Workspace projects and operational state</p>
          </div>
          <input
            placeholder="Filter projects"
            className="hidden h-10 rounded-md border border-black/10 px-3 text-sm outline-none focus:border-black sm:block"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-black/10 bg-[#fafafa] text-xs uppercase tracking-[0.12em] text-black/40">
              <tr>
                <th className="px-5 py-3 font-bold">Name</th>
                <th className="px-5 py-3 font-bold">Services</th>
                <th className="px-5 py-3 font-bold">Region</th>
                <th className="px-5 py-3 font-bold">Spend</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 font-bold">Updated</th>
                <th className="px-5 py-3 font-bold" />
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {projects.map((project) => (
                <tr key={project.name}>
                  <td className="px-5 py-4 font-mono text-sm">{project.name}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{project.services}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{project.region}</td>
                  <td className="px-5 py-4 text-sm text-black/58">{project.spend}</td>
                  <td className="px-5 py-4"><StatusBadge status={project.status} /></td>
                  <td className="px-5 py-4 text-sm text-black/58">{project.updated}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-bold transition-colors hover:bg-black hover:text-white">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ProjectFormModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default ProjectsPage;
