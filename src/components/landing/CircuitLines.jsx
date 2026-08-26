/* eslint-disable react/prop-types */
// Decorative animated circuit-board traces. Purely visual, aria-hidden.
export default function CircuitLines({ className = '' }) {
  return (
    <svg
      className={`circuit-overlay ${className}`}
      viewBox="0 0 800 500"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="circuit-line" d="M0 78 H176 V226 H418 V64 H800" />
      <path className="circuit-line slow" d="M0 306 H128 V420 H362 V300 H616 V438 H800" />
      <path className="circuit-line fast" d="M46 0 V138 H262 V0" />
      <path className="circuit-line" d="M800 176 H562 V318 H304 V500" />
      <path className="circuit-line slow" d="M0 470 H90 V360 H210" />

      <circle className="circuit-node" cx="176" cy="78" r="4" />
      <circle className="circuit-node" cx="418" cy="226" r="4" />
      <circle className="circuit-node" cx="128" cy="306" r="4" />
      <circle className="circuit-node" cx="362" cy="420" r="4" />
      <circle className="circuit-node" cx="262" cy="138" r="4" />
      <circle className="circuit-node" cx="562" cy="176" r="4" />
      <circle className="circuit-node" cx="304" cy="318" r="4" />
      <circle className="circuit-node" cx="90" cy="470" r="3.5" />
    </svg>
  )
}
