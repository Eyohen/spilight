const team = [
  { name: 'Henry D.', role: 'Owner', email: 'henry@acme.com' },
  { name: 'Maya C.', role: 'Developer', email: 'maya@acme.com' },
  { name: 'Ife A.', role: 'Billing', email: 'ife@acme.com' },
];

const DashboardSettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/42">Settings</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-black">Workspace settings</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/54">
          Manage workspace identity, team access, billing preferences, and deployment guardrails.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <section className="rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Workspace profile</h2>
          <form className="mt-6 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">Workspace name</label>
                <input className="h-11 w-full rounded-md border border-black/10 px-3 text-sm outline-none focus:border-black" defaultValue="Acme Production" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-black/70">Default region</label>
                <select className="h-11 w-full rounded-md border border-black/10 bg-white px-3 text-sm outline-none focus:border-black">
                  <option>fra1 - Frankfurt</option>
                  <option>iad1 - Ashburn</option>
                  <option>lhr1 - London</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-black/70">Workspace slug</label>
              <div className="flex h-11 overflow-hidden rounded-md border border-black/10 focus-within:border-black">
                <input className="min-w-0 flex-1 px-3 text-sm outline-none" defaultValue="acme-production" />
                <span className="flex items-center border-l border-black/10 px-3 text-sm text-black/40">.spilight.app</span>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="h-10 rounded-md bg-black px-4 text-sm font-bold text-white">Save changes</button>
            </div>
          </form>
        </section>

        <section className="rounded-lg border border-black/10 bg-white p-5">
          <h2 className="text-lg font-semibold tracking-[-0.03em]">Deployment policy</h2>
          <div className="mt-6 space-y-4">
            {['Require health checks before promotion', 'Allow automatic rollback on failed release', 'Protect production environment'].map((item) => (
              <label key={item} className="flex items-center justify-between gap-4 rounded-md border border-black/10 p-4 text-sm">
                <span>{item}</span>
                <input type="checkbox" defaultChecked className="h-4 w-4" />
              </label>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-black/10 p-5">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.03em]">Team access</h2>
            <p className="mt-1 text-sm text-black/46">Manage roles and access to production resources</p>
          </div>
          <button className="h-10 rounded-md border border-black/10 px-4 text-sm font-bold hover:bg-black hover:text-white">Invite member</button>
        </div>
        <div className="divide-y divide-black/10">
          {team.map((member) => (
            <div key={member.email} className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="mt-1 text-sm text-black/48">{member.email}</p>
              </div>
              <span className="w-fit rounded-full border border-black/10 px-3 py-1 text-xs font-bold">{member.role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardSettingsPage;
