import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState({ loading: false, error: '', sent: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ loading: true, error: '', sent: false });

    try {
      await forgotPassword(email);
      setFormState({ loading: false, error: '', sent: true });
    } catch (error) {
      setFormState({ loading: false, error: error.message, sent: false });
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
        {formState.sent ? (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-[#d7ff3e]/25 bg-[#d7ff3e]/10 text-[#d7ff3e] shadow-[0_0_34px_rgba(215,255,62,0.12)]">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.75 10.94 12a1.75 1.75 0 0 0 2.12 0L20 6.75M5.75 19h12.5A1.75 1.75 0 0 0 20 17.25V6.75A1.75 1.75 0 0 0 18.25 5H5.75A1.75 1.75 0 0 0 4 6.75v10.5A1.75 1.75 0 0 0 5.75 19Z" />
              </svg>
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.035em]">Check your inbox</h1>
            <p className="mt-3 text-sm leading-6 text-white/50">
              If an account exists for <span className="font-semibold text-white/80">{email}</span>, we sent a password-reset link. It expires in one hour.
            </p>
            <Link to="/login" className="mt-8 flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b]">
              Return to sign in
            </Link>
            <button type="button" onClick={() => setFormState({ loading: false, error: '', sent: false })} className="mt-4 text-sm font-medium text-white/45 transition hover:text-white">
              Try another email
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 text-center">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7ff3e]/20 bg-[#d7ff3e]/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d7ff3e]">
                Account recovery
              </span>
              <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Forgot your password?</h1>
              <p className="mt-3 text-sm leading-6 text-white/50">Enter your account email and we’ll send you a secure reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="recovery-email" className="mb-2 block text-sm font-medium text-white/75">Email address</label>
                <input
                  id="recovery-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  autoFocus
                  className="h-12 w-full rounded-xl border border-white/12 bg-black/25 px-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#d7ff3e]/65 focus:bg-black/35 focus:ring-4 focus:ring-[#d7ff3e]/10"
                />
              </div>

              {formState.error && (
                <p role="alert" className="rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-100">{formState.error}</p>
              )}

              <button type="submit" disabled={formState.loading} className="flex h-12 w-full items-center justify-center rounded-xl bg-[#d7ff3e] text-sm font-bold text-[#0a0a0a] shadow-[0_10px_35px_rgba(215,255,62,0.16)] transition hover:-translate-y-0.5 hover:bg-[#e1ff6b] hover:shadow-[0_14px_40px_rgba(215,255,62,0.24)] disabled:cursor-not-allowed disabled:opacity-55">
                {formState.loading ? 'Sending reset link…' : 'Send reset link'}
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

export default ForgotPasswordPage;
