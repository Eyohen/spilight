import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const steps = [
  {
    title: 'Connect your repository',
    body: 'Authorize GitHub, select a repository, and let Spilight inspect the project shape.',
  },
  {
    title: 'Choose the runtime',
    body: 'Create an app, worker, database, or scheduled process with production-ready defaults.',
  },
  {
    title: 'Configure environments',
    body: 'Set secrets, variables, regions, health checks, branches, and preview behavior.',
  },
  {
    title: 'Deploy and observe',
    body: 'Track builds, releases, logs, rollbacks, and resource usage from the service view.',
  },
];

const terminalLines = [
  '$ spilight init',
  'Repository detected: spilight-api',
  'Runtime selected: Node.js service',
  'Private network attached: core',
  'Deployment complete: production',
];

const WorkflowPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4] text-black">
      <Navbar />
      <main className="pt-28">
        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Workflow</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
                From repository to resilient service in minutes.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-black/58">
                Spilight keeps the deployment path short while preserving the controls engineering teams need when software reaches production.
              </p>
            </div>

            <div className="rounded-lg border border-black/10 bg-black p-4 font-mono text-sm leading-7 text-white/58">
              {terminalLines.map((line) => (
                <p key={line} className={line.startsWith('$') ? 'text-white' : ''}>{line}</p>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-lg border border-black/10 p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <h2 className="mt-6 text-xl font-semibold tracking-[-0.03em]">{step.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-black/58">{step.body}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/platform"
                className="inline-flex h-11 items-center justify-center rounded-md border border-black/12 px-5 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
              >
                View platform
              </Link>
              <Link
                to="/waitlist"
                className="inline-flex h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white transition-colors hover:bg-black/80"
              >
                Request access
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WorkflowPage;
