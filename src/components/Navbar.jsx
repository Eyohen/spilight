import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const navLinks = [
  { name: 'Platform', to: '/platform' },
  { name: 'Workflow', to: '/workflow' },
  { name: 'Pricing', to: '/pricing' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 w-full items-center justify-between border-b border-white/12 bg-black px-5 shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:px-8 lg:px-10">
        <BrandLogo
          markClassName="h-8 w-8"
          textClassName="text-lg font-semibold tracking-[-0.03em] text-white"
        />

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) => `text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white'
                  : 'text-white hover:text-white/72'
              }`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium text-white transition-colors hover:text-white/72"
          >
            Sign in
          </Link>
          <Link
            to="/waitlist"
            className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 text-sm font-bold text-white transition-colors hover:bg-white/16"
          >
            Request access
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="w-full border-b border-white/10 bg-black/[0.96] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.36)] backdrop-blur-2xl lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) => `block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white ${
                  isActive ? 'bg-white/10 text-white' : 'text-white'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/login"
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              to="/waitlist"
              className="mt-3 flex h-11 items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 text-sm font-bold text-white transition-colors hover:bg-white/16"
              onClick={() => setMobileOpen(false)}
            >
              Request access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
