/* eslint-disable react/prop-types */

const sizeClasses = {
  default: 'max-w-xl',
  wide: 'max-w-5xl',
  full: 'max-w-7xl',
};

const DashboardModal = ({ open, title, description, children, onClose, size = 'default' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/55"
        onClick={onClose}
        aria-label="Close modal"
      />
      <section className={`relative max-h-[92vh] w-full overflow-y-auto rounded-lg border border-black/10 bg-white shadow-2xl ${sizeClasses[size] || sizeClasses.default}`}>
        <div className="flex items-start justify-between gap-4 border-b border-black/10 p-5">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em] text-black">{title}</h2>
            {description ? <p className="mt-1 text-sm leading-6 text-black/52">{description}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-md border border-black/10 text-black/52 transition-colors hover:bg-black hover:text-white"
            aria-label="Close modal"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5">{children}</div>
      </section>
    </div>
  );
};

export default DashboardModal;
