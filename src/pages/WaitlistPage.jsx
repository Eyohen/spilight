import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WaitlistPage = () => {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState({ submitted: false, error: '' });

  const submitWaitlist = (event) => {
    event.preventDefault();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailIsValid) {
      setFormState({ submitted: false, error: 'Enter a valid work email to join the waitlist.' });
      return;
    }

    setFormState({ submitted: true, error: '' });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="pt-28">
        <section className="px-5 py-24 text-center sm:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Early access</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
              Help shape the first version of Spilight.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-black/58">
              Join the waitlist for product updates, private beta access, and early workspace invitations.
            </p>

            {formState.submitted ? (
              <div className="mt-10 rounded-lg border border-black/10 bg-black p-6 text-white">
                <h2 className="text-xl font-semibold">You are on the list.</h2>
                <p className="mt-2 text-sm text-white/58">We will send Spilight access updates to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={submitWaitlist} className="mt-10" noValidate>
                <div className="flex flex-col gap-3 rounded-lg border border-black/10 bg-[#f5f5f5] p-3 sm:flex-row">
                  <label className="sr-only" htmlFor="waitlist-email">Work email</label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Work email"
                    className="h-12 flex-1 rounded-md border border-black/10 bg-white px-4 text-sm font-medium text-black outline-none placeholder:text-black/35 focus:border-black"
                  />
                  <button
                    type="submit"
                    className="h-12 rounded-md bg-black px-6 text-sm font-bold text-white transition-colors hover:bg-black/80"
                  >
                    Join waitlist
                  </button>
                </div>
                {formState.error && (
                  <p className="mt-3 text-sm font-semibold text-black">{formState.error}</p>
                )}
              </form>
            )}

            <div className="mt-8 flex justify-center">
              <Link to="/" className="text-sm font-bold text-black/58 transition-colors hover:text-black">
                Back to home
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WaitlistPage;
