import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Overview', path: '/dashboard' },
  { name: 'Projects', path: '/dashboard/projects' },
  { name: 'Deployments', path: '/dashboard/deployments' },
  { name: 'Metrics', path: '/dashboard/metrics' },
  { name: 'Billing', path: '/dashboard/billing' },
  { name: 'Settings', path: '/dashboard/settings' },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, profile } = useAuth();
  const navigate = useNavigate();

  const displayName = profile?.displayName || [profile?.firstName, profile?.lastName].filter(Boolean).join(' ') || profile?.businessName || 'Workspace';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'SP';

  const signOut = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-white font-['Inter'] text-[#0a0a0a] lg:grid lg:grid-cols-[268px_1fr]">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-[#d7ff3e]/15 bg-[#0a0a0a] text-white shadow-[18px_0_60px_rgba(0,0,0,0.08)] transition-transform duration-200 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-[72px] items-center justify-between border-b border-white/10 px-5">
          <BrandLogo markClassName="h-9 w-9" textClassName="text-lg font-bold tracking-[-0.03em] text-white" />
          <button className="text-white/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#d7ff3e]">Workspace</p>
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.055] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <p className="truncate text-sm font-semibold text-white">{displayName}</p>
            <p className="mt-1 text-xs text-white/55">spilight.app</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `relative flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm font-medium text-white transition-all ${
                isActive ? 'border-[#d7ff3e]/25 bg-[#d7ff3e]/10 shadow-[0_0_22px_rgba(215,255,62,0.06)] after:h-1.5 after:w-1.5 after:rounded-full after:bg-[#d7ff3e] after:shadow-[0_0_8px_#d7ff3e]' : 'border-transparent text-white/75 hover:bg-white/[0.07] hover:text-white'
              }`}
            >
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 rounded-xl border border-[#d7ff3e]/15 bg-[#d7ff3e]/[0.055] p-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d7ff3e] shadow-[0_0_9px_#d7ff3e]" />
              <p className="text-sm font-semibold text-white">Team plan</p>
            </div>
            <p className="text-xs leading-5 text-white/55">12 services running across 3 projects.</p>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center justify-center rounded-lg border border-white/15 px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="relative min-w-0 overflow-hidden bg-white">
        <header className="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-black/[0.08] bg-white/75 px-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-4">
            <button
              className="grid h-10 w-10 place-items-center rounded-md border border-black/10 text-black lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em]">Spilight Console</p>
              <p className="flex items-center gap-1.5 text-xs text-black/45"><span className="h-1.5 w-1.5 rounded-full bg-[#a9cd20]" />Production workspace</p>
            </div>
          </div>

          <div className="hidden w-full max-w-sm items-center rounded-xl border border-black/10 bg-white/65 px-3 py-2 shadow-sm sm:flex">
            <svg className="mr-2 h-4 w-4 text-black/34" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects, services, deployments"
              className="w-full bg-transparent text-sm outline-none placeholder:text-black/34"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/70 text-black/55 shadow-sm transition-colors hover:border-black/20 hover:text-black" aria-label="Notifications">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.454 1.31m5.715 0a3 3 0 11-5.715 0" />
              </svg>
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-black text-sm font-bold text-[#d7ff3e] shadow-[0_8px_24px_rgba(0,0,0,0.18)]">{initials}</div>
          </div>
        </header>

        <main className="relative z-10 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
