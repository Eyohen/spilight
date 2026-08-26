import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const inputClass = 'h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d7ff3e]/65 focus:bg-black/35 focus:ring-4 focus:ring-[#d7ff3e]/10';

const eyeIcon = (visible) => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d={visible ? 'M3 3l18 18M10.6 10.6A2 2 0 0012 14a2 2 0 001.4-3.4M9.9 4.9A10.5 10.5 0 0112 4.5c4.8 0 8.8 3.2 10.1 7.5a10.5 10.5 0 01-4.3 5.8M6.2 6.2A10.5 10.5 0 001.9 12c.8 2.7 2.9 4.9 5.5 6' : 'M2 12.3a1 1 0 010-.6C3.4 7.5 7.4 4.5 12 4.5s8.6 3 10 7.2a1 1 0 010 .6c-1.4 4.2-5.4 7.2-10 7.2s-8.6-3-10-7.2z'} />
    {!visible && <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
  </svg>
);

const ResetPasswordPage = () => {
  const { resetPassword } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formState, setFormState] = useState({ loading: false, error: '', done: false });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setFormState({ loading: false, error: 'Passwords do not match.', done: false });
      return;
    }

    setFormState({ loading: true, error: '', done: false });

    try {
      await resetPassword(token, password);
      setFormState({ loading: false, error: '', done: true });
    } catch (error) {
      setFormState({ loading: false, error: error.message, done: false });
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070806] px-5 py-24 text-white sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(215,255,62,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(215,255,62,0.045)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute -left-36 top-1/4 h-[430px] w-[430px] rounded-full bg-[#d7ff3e]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-36 bottom-0 h-[520px] w-[520px] rounded-full bg-white/[0.06] blur-[150px]" />

      <Link to="/" className="absolute left-5 top-6 z-20 flex items-center gap-3 sm:left-8 sm:top-8" aria-label="Spilight home">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-[#d7ff3e]/30 bg-black shadow-[0_0_24px_rgba(215,255,62,0.14)]">
          <svg width="19" height="19" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M20 6 12 18h6l-2 8 10-14h-7l1-6z" fill="#D7FF3E" />
          </svg>
        </span>
        <span className="text-lg font-semibold tracking-[-0.03em]">Spilight</span>
      </Link>

      <Link to="/login" className="absolute right-5 top-7 z-20 text-sm text-white/50 transition hover:text-white sm:right-8 sm:top-10">
        Back to sign in
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[480px] rounded-[28px] border border-white/15 bg-white/[0.075] p-6 shadow-[0_32px_100px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:p-9"
      >
        {!token ? (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-red-400/25 bg-red-400/10 text-red-300">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              </svg>
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.035em]">Invalid reset link</h1>
            <p className="mt-3 text-sm leading-6 text-white/50">This link is missing its reset token. Request a new one to continue.</p>
            <Link to="/forgot-password" className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b]">
              Request a new link
            </Link>
          </div>
        ) : formState.done ? (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#d7ff3e]/25 bg-[#d7ff3e]/10 text-[#d7ff3e] shadow-[0_0_34px_rgba(215,255,62,0.12)]">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.035em]">Password reset</h1>
            <p className="mt-3 text-sm leading-6 text-white/50">Your password has been updated. You can now sign in with your new password.</p>
            <Link to="/login" className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b]">
              Sign in
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7ff3e]/20 bg-[#d7ff3e]/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7ff3e]">
                Account recovery
              </span>
              <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Set a new password</h1>
              <p className="mt-3 text-sm leading-6 text-white/50">Choose a strong password you haven’t used before.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reset-password" className="mb-2 block text-sm font-medium text-white/75">New password</label>
                <div className="relative">
                  <input
                    id="reset-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    minLength="8"
                    required
                    autoFocus
                    className={`${inputClass} pr-12`}
                  />
                  <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {eyeIcon(showPassword)}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="reset-confirm-password" className="mb-2 block text-sm font-medium text-white/75">Confirm new password</label>
                <div className="relative">
                  <input
                    id="reset-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    minLength="8"
                    required
                    className={`${inputClass} pr-12`}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white" aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
                    {eyeIcon(showConfirmPassword)}
                  </button>
                </div>
              </div>

              {formState.error && (
                <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">{formState.error}</p>
              )}

              <button type="submit" disabled={formState.loading} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] shadow-[0_10px_35px_rgba(215,255,62,0.16)] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b] hover:shadow-[0_14px_40px_rgba(215,255,62,0.24)] disabled:cursor-not-allowed disabled:opacity-55">
                {formState.loading ? 'Resetting password…' : 'Reset password'}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-white/45">
              Remembered your password? <Link to="/login" className="font-semibold text-white transition hover:text-[#d7ff3e]">Sign in</Link>
            </p>
          </>
        )}
      </motion.section>
    </main>
  );
};

export default ResetPasswordPage;
