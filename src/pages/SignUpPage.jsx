import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';

const benefits = [
  'Deploy web services and workers',
  'Invite teammates into one workspace',
  'Track releases, usage, and service health',
];

const SignUpPage = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [formState, setFormState] = useState({
    loading: false,
    error: '',
    success: '',
  });

  const updateField = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ loading: true, error: '', success: '' });

    try {
      await register({
        ...formData,
        accountType: 'personal',
      });
      setFormState({
        loading: false,
        error: '',
        success: 'Account created. Check your email to verify your account.',
      });
      setFormData({
        firstName: '',
        email: '',
        phone: '',
        password: '',
      });
    } catch (error) {
      setFormState({
        loading: false,
        error: error.message,
        success: '',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:grid lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 px-10 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute left-16 top-24 h-96 w-96 rounded-full bg-white/10 blur-[120px]" />

        <BrandLogo className="relative" textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />

        <div className="relative max-w-xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/40">Create workspace</p>
          <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em]">
            Start with a clean deployment foundation.
          </h1>
          <div className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-sm text-white/62">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-xs font-bold text-black">✓</span>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <p className="relative max-w-md text-sm leading-6 text-white/42">
          Spilight is built for teams that want practical infrastructure controls without a noisy operations surface.
        </p>
      </section>

      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl"
        >
          <BrandLogo className="mb-12 lg:hidden" textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Sign up</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Create your workspace.</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">Set up the account shell now. Authentication can be connected to the backend later.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">First name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={updateField('firstName')}
                placeholder="Jane"
                autoComplete="given-name"
                required
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={updateField('email')}
                placeholder="jane@company.com"
                autoComplete="email"
                required
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Phone number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={updateField('phone')}
                placeholder="+1 555 000 1234"
                autoComplete="tel"
                required
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={updateField('password')}
                placeholder="Create password"
                autoComplete="new-password"
                required
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
              />
            </div>

            <label className="flex items-start gap-3 text-sm leading-6 text-white/46">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/20 bg-black" />
              <span>
                I agree to Spilight&apos;s terms and{' '}
                <Link to="/privacy" className="font-semibold text-white hover:text-white/72">privacy policy</Link>.
              </span>
            </label>

            {formState.error && (
              <p className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white">
                {formState.error}
              </p>
            )}

            {formState.success && (
              <p className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white">
                {formState.success}
              </p>
            )}

            <button
              type="submit"
              disabled={formState.loading}
              className="h-12 w-full rounded-md bg-white text-sm font-bold text-black transition-colors hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/55"
            >
              {formState.loading ? 'Creating account...' : 'Create workspace'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/46">
            Already have a workspace?{' '}
            <Link to="/login" className="font-semibold text-white transition-colors hover:text-white/72">
              Sign in
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default SignUpPage;
