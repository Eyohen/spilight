import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const plans = [
  {
    name: 'Launch',
    price: '$0',
    description: 'For prototypes, personal apps, and early product experiments.',
    features: ['1 project', 'Web services', 'Basic logs', 'Community support'],
  },
  {
    name: 'Team',
    price: '$29',
    description: 'For startups shipping production workloads with a small team.',
    features: ['Unlimited projects', 'Apps and workers', 'Private networking', 'Team members', 'Usage alerts'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For companies that need stronger controls, support, and deployment governance.',
    features: ['Dedicated support', 'SAML and audit logs', 'Custom regions', 'Advanced security reviews'],
  },
];

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-28">
        <section className="border-b border-white/10 px-5 py-20 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Pricing</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
              Simple hosting plans that scale with the workload.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/58">
              Start lean, invite your team, and move into enterprise controls when your infrastructure footprint needs them.
            </p>
          </motion.div>
        </section>

        <section className="px-5 py-20 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-lg border p-6 ${
                  plan.featured
                    ? 'border-white bg-white text-black'
                    : 'border-white/12 bg-white/[0.04] text-white'
                }`}
              >
                <p className="text-lg font-semibold">{plan.name}</p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="text-5xl font-semibold tracking-[-0.05em]">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className={plan.featured ? 'mb-2 text-black/45' : 'mb-2 text-white/40'}>/month</span>}
                </div>
                <p className={`mt-5 min-h-14 text-sm leading-6 ${plan.featured ? 'text-black/58' : 'text-white/52'}`}>
                  {plan.description}
                </p>
                <Link
                  to="/waitlist"
                  className={`mt-7 flex h-11 items-center justify-center rounded-md text-sm font-bold transition-colors ${
                    plan.featured
                      ? 'bg-black text-white hover:bg-black/80'
                      : 'bg-white text-black hover:bg-white/85'
                  }`}
                >
                  Request access
                </Link>
                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <span className={plan.featured ? 'text-black' : 'text-white'}>✓</span>
                      <span className={plan.featured ? 'text-black/68' : 'text-white/58'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
