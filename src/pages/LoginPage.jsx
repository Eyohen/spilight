import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [formState, setFormState] = useState({
    loading: false,
    error: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const updateField = (field) => (event) => {
    setCredentials((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ loading: true, error: '' });

    try {
      await login(credentials);
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (error) {
      setFormState({
        loading: false,
        error: error.message || 'Unable to sign in',
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white lg:grid lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 px-10 py-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute left-20 top-28 h-80 w-80 rounded-full bg-white/10 blur-[110px]" />

        <BrandLogo className="relative" textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />

        <div className="relative max-w-xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white/40">Console access</p>
          <h1 className="text-5xl font-semibold leading-[0.98] tracking-[-0.04em]">
            Return to your production workspace.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-white/56">
            Monitor services, deploy releases, inspect usage, and manage infrastructure from a clean operating surface.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3">
          {['Services live', 'Builds tracked', 'Usage visible'].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-medium text-white/70">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <main className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <BrandLogo className="mb-12 lg:hidden" textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Sign in</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Welcome back.</h2>
          <p className="mt-3 text-sm leading-6 text-white/52">Sign in with your Spilight account to view your workspace.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Email address</label>
              <input
                type="email"
                value={credentials.email}
                onChange={updateField('email')}
                placeholder="name@company.com"
                className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
                autoComplete="email"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={updateField('password')}
                  placeholder="Enter password"
                  className="h-12 w-full rounded-md border border-white/12 bg-white/[0.04] px-4 pr-12 text-sm text-white outline-none placeholder:text-white/28 focus:border-white/40"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/42 transition-colors hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? 'M3 3l18 18M10.584 10.587A2 2 0 0012 14a2 2 0 001.414-3.414M9.88 4.88A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.52 10.52 0 01-4.293 5.774M6.228 6.228A10.477 10.477 0 001.934 12C2.732 14.68 4.788 16.869 7.4 18.04' : 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'} />
                    {!showPassword && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                  </svg>
                </button>
              </div>
            </div>

            {formState.error && (
              <p className="rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white">
                {formState.error}
              </p>
            )}

            <button
              type="submit"
              disabled={formState.loading}
              className="h-12 w-full rounded-md bg-white text-sm font-bold text-black transition-colors hover:bg-white/85 disabled:cursor-not-allowed disabled:bg-white/55"
            >
              {formState.loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/46">
            New to Spilight?{' '}
            <Link to="/signup" className="font-semibold text-white transition-colors hover:text-white/72">
              Create workspace
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;
