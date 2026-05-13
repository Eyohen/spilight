import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="px-5 py-32 sm:px-8 lg:px-10">
        <section className="mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Privacy</p>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-7xl">
            Privacy policy.
          </h1>
          <p className="mt-7 text-lg leading-8 text-black/58">
            Spilight is currently in private beta. This page will hold the full production privacy policy before public launch.
          </p>
          <div className="mt-10 rounded-lg border border-black/10 bg-[#f5f5f5] p-6">
            <h2 className="text-xl font-semibold tracking-[-0.03em]">Current beta posture</h2>
            <p className="mt-4 text-sm leading-6 text-black/58">
              We only request the information needed to contact early users, provision workspaces, and improve the platform experience during beta access.
            </p>
          </div>
          <Link
            to="/"
            className="mt-8 inline-flex h-11 items-center justify-center rounded-md bg-black px-5 text-sm font-bold text-white transition-colors hover:bg-black/80"
          >
            Back to home
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;
