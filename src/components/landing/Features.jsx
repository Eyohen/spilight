const features = [
  {
    title: 'Instant deploys',
    desc: 'Push to git and go live in seconds, with zero-downtime builds on every commit.',
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
    ),
  },
  {
    title: 'Global edge network',
    desc: 'Your services run close to your users, on infrastructure that scales itself.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c2.4 2.6 2.4 15.4 0 18M12 3c-2.4 2.6-2.4 15.4 0 18" />
      </>
    ),
  },
  {
    title: 'Usage-based pricing',
    desc: 'Pay only for what you use. Transparent bills, no surprise overages.',
    icon: (
      <>
        <path d="M20 12 12 20 4 12V4h8l8 8z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  {
    title: 'Built-in observability',
    desc: 'Logs, metrics, and alerts out of the box, so you always know what is happening.',
    icon: (
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    ),
  },
]

export default function Features() {
  return (
    <section className="section" id="product">
      <div className="container">
        <div className="section-head">
          <h2>Everything you need to ship, nothing you have to manage</h2>
          <p>Spilight handles the infrastructure layer so your team can stay focused on product.</p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D7FF3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {f.icon}
                </svg>
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

