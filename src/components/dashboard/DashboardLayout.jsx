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
    <div className="min-h-screen bg-[#f5f5f5] text-black lg:grid lg:grid-cols-[268px_1fr]">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[268px] flex-col border-r border-white/10 bg-black text-white transition-transform duration-200 lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <BrandLogo textClassName="text-lg font-semibold tracking-[-0.03em] text-white" />
          <button className="text-white/50 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="border-b border-white/10 px-5 py-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/34">Workspace</p>
          <div className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="mt-1 text-xs text-white/42">spilight.app</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-white text-black' : 'text-white/54 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.04] p-3">
            <p className="text-sm font-semibold">Team plan</p>
            <p className="mt-1 text-xs leading-5 text-white/42">12 services running across 3 projects.</p>
          </div>
          <button
            onClick={signOut}
            className="flex w-full items-center justify-center rounded-md border border-white/12 px-3 py-2 text-sm font-semibold text-white/62 transition-colors hover:bg-white/10 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 bg-white/90 px-4 backdrop-blur lg:px-8">
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
              <p className="text-sm font-semibold">Spilight Console</p>
              <p className="text-xs text-black/42">Production workspace</p>
            </div>
          </div>

          <div className="hidden w-full max-w-sm items-center rounded-md border border-black/10 bg-[#f7f7f7] px-3 py-2 sm:flex">
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
            <button className="grid h-10 w-10 place-items-center rounded-md border border-black/10 bg-white text-black/58 transition-colors hover:text-black" aria-label="Notifications">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.454 1.31m5.715 0a3 3 0 11-5.715 0" />
              </svg>
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-md bg-black text-sm font-bold text-white">{initials}</div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
