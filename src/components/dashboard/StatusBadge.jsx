/* eslint-disable react/prop-types */

const styles = {
  Live: 'bg-[#d7ff3e] text-black',
  Healthy: 'bg-[#d7ff3e] text-black',
  Successful: 'bg-babyblue-light text-babyblue-dark',
  Scaling: 'bg-[#efffc0] text-black border border-[#b8da36]',
  Building: 'bg-[#dcf1fb] text-[#2e7d99]',
  Failed: 'bg-[#fbe4e1] text-[#c1503e]',
  Paused: 'bg-[#f2f2f2] text-black/54 border border-black/10',
  Ready: 'bg-[#d7ff3e] text-black',
  Preview: 'bg-white text-black border border-black/15',
  Open: 'border border-yellow-200 bg-yellow-100 text-yellow-900',
  Paid: 'border border-green-200 bg-green-100 text-green-800',
  Draft: 'border border-red-200 bg-red-100 text-red-800',
  Overdue: 'border border-red-200 bg-red-100 text-red-800',
  Void: 'border border-red-200 bg-red-100 text-red-800',
};

const icons = {
  Open: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  ),
  Paid: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Draft: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Overdue: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Void: (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
};

const dotStatuses = new Set(['Successful', 'Failed', 'Building']);

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${styles[status] || styles.Ready}`}>
    {dotStatuses.has(status) && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
    {icons[status]}
    {status}
  </span>
);

export default StatusBadge;
