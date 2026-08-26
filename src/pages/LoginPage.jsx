import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const accountOptions = [
  { id: 'personal', label: 'Personal' },
  { id: 'business', label: 'Business' },
];

const LoginPage = () => {
  const [accountType, setAccountType] = useState('business');
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [formState, setFormState] = useState({ loading: false, error: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const updateField = (field) => (event) => {
    setCredentials((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ loading: true, error: '' });

    try {
      await login({ ...credentials, accountType });
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (error) {
      setFormState({ loading: false, error: error.message || 'Unable to sign in' });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070806] px-5 py-12 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(215,255,62,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(215,255,62,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute -left-36 top-1/4 h-[430px] w-[430px] rounded-full bg-[#d7ff3e]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-[520px] w-[520px] rounded-full bg-white/[0.06] blur-[150px]" />

      <Link
        to="/"
        className="absolute left-5 top-6 z-20 flex items-center gap-3 sm:left-8 sm:top-8"
        aria-label="Spilight home"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#d7ff3e]/30 bg-black shadow-[0_0_24px_rgba(215,255,62,0.14)]">
          <svg width="19" height="19" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M20 6 12 18h6l-2 8 10-14h-7l1-6z" fill="#D7FF3E" />
          </svg>
        </span>
        <span className="text-lg font-semibold tracking-[-0.03em]">Spilight</span>
      </Link>

      <Link to="/" className="absolute right-5 top-7 z-20 text-sm text-white/50 transition hover:text-white sm:right-8 sm:top-10">
        Back to home
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[480px] rounded-[28px] border border-white/15 bg-white/[0.075] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-9"
      >
        <div className="mb-8 text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7ff3e]/20 bg-[#d7ff3e]/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7ff3e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff3e] shadow-[0_0_10px_#d7ff3e]" />
            Secure workspace access
          </span>
          <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">Sign in to manage your deployments and infrastructure.</p>
        </div>

        <div className="mb-7 grid grid-cols-2 rounded-xl border border-white/10 bg-black/30 p-1" role="tablist" aria-label="Account type">
          {accountOptions.map((option) => {
            const selected = accountType === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setAccountType(option.id)}
                className={`relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                  selected
                    ? 'bg-white text-black shadow-[0_5px_20px_rgba(0,0,0,0.3)]'
                    : 'text-white/45 hover:text-white/75'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="mb-2 block text-sm font-medium text-white/75">
              {accountType === 'business' ? 'Work email' : 'Email address'}
            </label>
            <input
              id="login-email"
              type="email"
              value={credentials.email}
              onChange={updateField('email')}
              placeholder={accountType === 'business' ? 'you@company.com' : 'you@example.com'}
              className="h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d7ff3e]/65 focus:bg-black/35 focus:ring-4 focus:ring-[#d7ff3e]/10"
              autoComplete="email"
              required
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="login-password" className="text-sm font-medium text-white/75">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-white/45 transition hover:text-[#d7ff3e]">Forgot password?</Link>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={updateField('password')}
                placeholder="Enter your password"
                className="h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 pr-12 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d7ff3e]/65 focus:bg-black/35 focus:ring-4 focus:ring-[#d7ff3e]/10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={showPassword ? 'M3 3l18 18M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-3.4M9.9 4.9A10.5 10.5 0 0112 4.5c4.8 0 8.8 3.2 10.1 7.5a10.5 10.5 0 01-4.3 5.8M6.2 6.2A10.5 10.5 0 001.9 12c.8 2.7 2.9 4.9 5.5 6' : 'M2 12.3a1 1 0 010-.6C3.4 7.5 7.4 4.5 12 4.5s8.6 3 10 7.2a1 1 0 010 .6c-1.4 4.2-5.4 7.2-10 7.2s-8.6-3-10-7.2z'} />
                  {!showPassword && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                </svg>
              </button>
            </div>
          </div>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-white/50">
            <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/30 accent-[#d7ff3e]" />
            Keep me signed in on this device
          </label>

          {formState.error && (
            <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {formState.error}
            </p>
          )}

          <button
            type="submit"
            disabled={formState.loading}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] shadow-[0_10px_35px_rgba(215,255,62,0.16)] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b] hover:shadow-[0_14px_40px_rgba(215,255,62,0.24)] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {formState.loading ? 'Signing in…' : `Continue to ${accountType === 'business' ? 'business' : 'personal'} workspace`}
          </button>
        </form>

        <div className="my-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.12em] text-white/25">
          <span className="h-px flex-1 bg-white/10" />
          New to Spilight?
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Link
          to="/signup"
          className="flex h-11 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.035] text-sm font-semibold text-white/75 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
        >
          Create an account
        </Link>

        <p className="mt-7 text-center text-xs leading-5 text-white/30">
          Protected by enterprise-grade encryption and secure session management.
        </p>
      </motion.section>
    </main>
  );
};

export default LoginPage;
