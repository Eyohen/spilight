import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const metrics = [
  { value: '12s', label: 'average deploy start' },
  { value: '99.99%', label: 'edge availability target' },
  { value: '24/7', label: 'runtime monitoring' },
];

const services = [
  { name: 'api-gateway', status: 'Live', cpu: '18%', memory: '384 MB' },
  { name: 'billing-worker', status: 'Scaling', cpu: '41%', memory: '812 MB' },
  { name: 'postgres-main', status: 'Healthy', cpu: '9%', memory: '1.2 GB' },
];

const platformHighlights = [
  {
    title: 'Deploy from Git',
    body: 'Connect a repository once, then ship every branch, preview, worker, and API from the same deployment flow.',
  },
  {
    title: 'Private service networks',
    body: 'Keep databases, internal APIs, queues, and workers off the public internet while teams keep moving fast.',
  },
  {
    title: 'Managed runtime signals',
    body: 'Logs, deploy history, resource usage, health checks, and rollback context stay attached to every service.',
  },
  {
    title: 'Production defaults',
    body: 'Start with practical defaults for regions, builds, secrets, scaling, domains, and promotion policies.',
  },
];

const workflowSteps = [
  'Import repository',
  'Choose runtime',
  'Attach services',
  'Ship release',
];

const reliabilityItems = [
  {
    label: 'Health checks',
    value: 'Required before promotion',
  },
  {
    label: 'Rollbacks',
    value: 'One-click release recovery',
  },
  {
    label: 'Regions',
    value: 'Deploy close to users',
  },
  {
    label: 'Secrets',
    value: 'Scoped by environment',
  },
  {
    label: 'Logs',
    value: 'Build and runtime streams',
  },
  {
    label: 'Usage',
    value: 'Service-level visibility',
  },
];

const teamUseCases = [
  {
    title: 'For product teams',
    body: 'Give engineers a short path from idea to production without spreading deploys across scripts, dashboards, and tribal knowledge.',
  },
  {
    title: 'For platform teams',
    body: 'Standardize runtime patterns, environment controls, and operational guardrails without becoming a bottleneck for every release.',
  },
  {
    title: 'For founders',
    body: 'Launch with infrastructure that can grow from first customer to serious traffic without a rebuild every time the company changes shape.',
  },
];

const pageCards = [
  {
    title: 'Platform',
    body: 'Explore the primitives for apps, workers, databases, networking, and observability.',
    to: '/platform',
  },
  {
    title: 'Workflow',
    body: 'See how Spilight moves code from repository to resilient production service.',
    to: '/workflow',
  },
  {
    title: 'Pricing',
    body: 'Review simple plans designed for solo builders, startup teams, and companies.',
    to: '/pricing',
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-white/10 bg-black pt-28">
          <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
          <div className="absolute left-1/2 top-24 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />

          <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-14 px-5 pb-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="max-w-3xl"
            >
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                Cloud hosting for serious product teams
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-7xl lg:text-[5.6rem]">
                Deploy infrastructure without the operational drag.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62">
                Spilight is a modern hosting platform for deploying apps, workers, and databases with clean workflows, private networking, and production observability from day one.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/waitlist"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-6 text-sm font-bold text-black transition-colors hover:bg-white/85"
                >
                  Request early access
                </Link>
                <Link
                  to="/platform"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white/18 px-6 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Explore platform
                </Link>
              </div>

              <div className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-6">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{metric.value}</p>
                    <p className="mt-2 text-xs leading-5 text-white/48">{metric.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="relative"
            >
              <div className="rounded-lg border border-white/12 bg-white/[0.045] p-3 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="overflow-hidden rounded-md border border-white/12 bg-[#050505]">
                  <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                    </div>
                    <span className="text-xs font-medium text-white/40">spilight.app/projects/core</span>
                  </div>

                  <div className="grid lg:grid-cols-[220px_1fr]">
                    <aside className="hidden border-r border-white/10 bg-white/[0.025] p-4 lg:block">
                      {['Overview', 'Services', 'Deployments', 'Networking', 'Usage'].map((item, index) => (
                        <div
                          key={item}
                          className={`mb-1 rounded-md px-3 py-2 text-sm ${
                            index === 1 ? 'bg-white text-black' : 'text-white/52'
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </aside>

                    <div className="p-5 sm:p-6">
                      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-white/38">Production cluster</p>
                          <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Core services</h2>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 px-3 py-1.5 text-xs text-white/62">
                          <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          All systems normal
                        </span>
                      </div>

                      <div className="grid gap-3">
                        {services.map((service) => (
                          <div key={service.name} className="rounded-md border border-white/10 bg-white/[0.035] p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-mono text-sm text-white">{service.name}</p>
                                <p className="mt-1 text-xs text-white/42">fra1.internal.spilight</p>
                              </div>
                              <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-black">
                                {service.status}
                              </span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded border border-white/10 px-3 py-2">
                                <p className="text-[11px] text-white/38">CPU</p>
                                <p className="mt-1 font-mono text-sm">{service.cpu}</p>
                              </div>
                              <div className="rounded border border-white/10 px-3 py-2">
                                <p className="text-[11px] text-white/38">Memory</p>
                                <p className="mt-1 font-mono text-sm">{service.memory}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-md border border-white/10 bg-black p-4 font-mono text-xs leading-6 text-white/54">
                        <p><span className="text-white">$</span> spilight deploy --service api-gateway</p>
                        <p>Build completed in 12.4s</p>
                        <p>Release promoted to production</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">What you get</p>
                <h2 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                  A deployment platform that keeps the core pieces close together.
                </h2>
                <p className="mt-5 max-w-lg text-base leading-7 text-white/54">
                  Spilight brings the daily infrastructure work into one focused workspace: services, deploys, databases, networks, secrets, logs, and usage.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {platformHighlights.map((item) => (
                  <article key={item.title} className="rounded-lg border border-white/12 bg-white/[0.04] p-6">
                    <div className="mb-5 h-px w-10 bg-white/70" />
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/54">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 text-black sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">How it works</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                The path from repository to running service stays short.
              </h2>
            </div>

            <div className="grid gap-3 lg:grid-cols-4">
              {workflowSteps.map((step, index) => (
                <article key={step} className="relative rounded-lg border border-black/10 bg-white p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-black/35">
                    Step {index + 1}
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">{step}</h3>
                  <p className="mt-4 text-sm leading-6 text-black/56">
                    {index === 0 && 'Bring in the codebase and let Spilight detect the project shape, scripts, and deployment needs.'}
                    {index === 1 && 'Pick a web app, worker, cron, database, or API runtime with production-ready settings.'}
                    {index === 2 && 'Connect private databases, secrets, domains, health checks, and internal service routes.'}
                    {index === 3 && 'Promote the release, watch logs and metrics, then roll back quickly if production needs it.'}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#050505] px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Operational control</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Built for the moment your app has real users.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/54">
                Shipping is only half the job. Spilight keeps release safety, observability, and service health visible so teams can respond without digging through disconnected tools.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reliabilityItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-white/12 bg-white/[0.04] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/34">{item.label}</p>
                  <p className="mt-3 text-lg font-semibold tracking-[-0.03em]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f5f5f5] px-5 py-20 text-black sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Who it is for</p>
                <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                  Useful for teams that want speed without messy infrastructure habits.
                </h2>
              </div>
              <Link
                to="/waitlist"
                className="inline-flex h-11 w-fit items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white transition-colors hover:bg-black/80"
              >
                Request access
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {teamUseCases.map((item) => (
                <article key={item.title} className="rounded-lg border border-black/10 bg-white p-6">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-black/58">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-20 text-black sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Explore Spilight</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                Separate pages for the details that matter.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {pageCards.map((card) => (
                <Link
                  key={card.title}
                  to={card.to}
                  className="group rounded-lg border border-black/10 bg-white p-6 transition-colors hover:bg-black hover:text-white"
                >
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-black/58 group-hover:text-white/58">{card.body}</p>
                  <span className="mt-8 inline-flex text-sm font-bold">Open page</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
