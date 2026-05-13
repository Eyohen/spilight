import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Deploy from Git',
    body: 'Connect a repository, choose a service, and ship production workloads without managing servers by hand.',
  },
  {
    title: 'Autoscaling runtimes',
    body: 'Scale web apps, workers, cron jobs, and APIs from quiet launches to enterprise traffic patterns.',
  },
  {
    title: 'Private networking',
    body: 'Keep databases, internal services, and production dependencies isolated on secure project networks.',
  },
  {
    title: 'Managed observability',
    body: 'Logs, deploy history, health checks, and resource signals stay close to the services that need them.',
  },
  {
    title: 'Environment control',
    body: 'Manage secrets, previews, branches, rollbacks, and promotion flows from one clean workspace.',
  },
  {
    title: 'Teams by default',
    body: 'Invite engineers, assign project access, and standardize deployment workflows across your company.',
  },
];

const layers = [
  'Application services',
  'Background workers',
  'Managed databases',
  'Private service mesh',
  'Deployment history',
  'Usage and health insights',
];

const PlatformPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="pt-28">
        <section className="border-b border-black/10 px-5 py-20 sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-7xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Platform</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
                Infrastructure primitives without infrastructure clutter.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-black/58">
                Spilight gives engineering teams the core tools to deploy, connect, monitor, and scale production systems from one minimal workspace.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">
                Built around the pieces modern apps actually need.
              </h2>
              <p className="mt-5 text-base leading-7 text-black/58">
                Start with a web service, add workers and databases, then connect the system through private networking and operational visibility.
              </p>
              <Link
                to="/workflow"
                className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white transition-colors hover:bg-black/80"
              >
                See deployment workflow
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <article key={feature.title} className="rounded-lg border border-black/10 bg-white p-6">
                  <div className="mb-5 h-px w-10 bg-black" />
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-black/58">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-black px-5 py-20 text-white sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Stack</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
                One platform layer for the full deployment surface.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {layers.map((layer) => (
                <div key={layer} className="rounded-lg border border-white/12 bg-white/[0.04] p-5">
                  <p className="font-medium">{layer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PlatformPage;
