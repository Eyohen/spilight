import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../lib/api';
import BrandLogo from '../components/BrandLogo';

const statusCopy = {
  loading: {
    eyebrow: 'Email verification',
    title: 'Checking your verification link.',
    detail: 'Hold on while Spilight confirms this email address and prepares your workspace access.',
  },
  success: {
    eyebrow: 'Verified',
    title: 'Your email is verified.',
    detail: 'Your Spilight account is ready. You can now sign in and continue setting up your workspace.',
  },
  error: {
    eyebrow: 'Link issue',
    title: 'We could not verify this link.',
    detail: 'This link may be expired, already replaced, or copied incorrectly. You can sign in or request a fresh verification email.',
  },
};

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Verifying your email address...');
  const verificationStarted = useRef(false);

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }

    verificationStarted.current = true;

    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Verification token is missing from the link.');
        return;
      }

      try {
        const response = await api.get('/auth/verify-email', {
          params: { token },
        });

        setStatus('success');
        setMessage(response.data?.message || 'Email verified successfully. You can login.');
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.message ||
          'We could not verify this email link. It may be invalid or expired.'
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  const copy = statusCopy[status];

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16 sm:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
        <div className="absolute left-1/2 top-20 h-[360px] w-[680px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative w-full max-w-2xl rounded-lg border border-white/12 bg-white/[0.045] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur"
        >
          <div className="rounded-md border border-white/12 bg-[#050505]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <BrandLogo
                markClassName="h-8 w-8"
                textClassName="text-lg font-semibold tracking-[-0.03em] text-white"
              />
              <span className="hidden rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/54 sm:inline-flex">
                Account access
              </span>
            </div>

            <div className="p-6 sm:p-9">
              <div className="mb-8 flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md border border-white/12 bg-white/[0.04] text-white">
                  {status === 'loading' ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  ) : status === 'success' ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                    </svg>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/38">{copy.eyebrow}</p>
                  <h1 className="mt-3 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl">
                    {copy.title}
                  </h1>
                </div>
              </div>

              <p className="max-w-xl text-base leading-7 text-white/58">{copy.detail}</p>

              <div className="mt-8 rounded-md border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm leading-6 text-white/68">{message}</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-white px-5 text-sm font-bold text-black transition-colors hover:bg-white/85"
                >
                  Go to login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-white/18 px-5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Back to sign up
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default VerifyEmailPage;
