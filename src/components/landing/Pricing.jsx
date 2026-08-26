import { Link } from 'react-router-dom'

const plans = [
  {
    tier: 'Hobby',
    price: '$5',
    cycle: '/mo',
    desc: 'For personal projects and weekend builds.',
    cta: 'Start free trial',
    features: [
      '1 active project',
      '512 MB RAM · 1 vCPU',
      '100 GB bandwidth',
      'Community support',
      'Auto SSL & subdomain',
    ],
  },
  {
    tier: 'Essential',
    price: '$20',
    cycle: '/mo',
    desc: 'For small teams shipping to production.',
    cta: 'Get started',
    featured: true,
    badge: 'Most popular',
    features: [
      '5 active projects',
      '2 GB RAM · 2 vCPU',
      '1 TB bandwidth',
      'Email support',
      'Custom domains',
      'Preview environments',
    ],
  },
  {
    tier: 'Pro',
    price: '$45',
    cycle: '/mo',
    desc: 'For production workloads at scale.',
    cta: 'Get started',
    features: [
      'Unlimited projects',
      '8 GB RAM · 4 vCPU',
      '5 TB bandwidth',
      'Priority support',
      'Team roles & permissions',
      'Advanced observability',
    ],
  },
  {
    tier: 'Custom',
    price: 'Custom',
    cycle: '',
    desc: 'For enterprises with specific needs.',
    cta: 'Contact sales',
    features: [
      'Dedicated infrastructure',
      'Custom SLA & uptime guarantee',
      'SSO / SAML',
      'Dedicated support engineer',
      'Volume discounts',
    ],
  },
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <h2>Simple, usage-friendly pricing</h2>
          <p>Start free, upgrade when you need more headroom. Cancel anytime.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((p) => (
            <div className={`price-card ${p.featured ? 'featured' : ''}`} key={p.tier}>
              {p.badge && <span className="price-badge">{p.badge}</span>}
              <div className="price-tier">{p.tier}</div>
              <div className="price-desc">{p.desc}</div>
              <div className="price-amount">
                <span className="num">{p.price}</span>
                {p.cycle && <span className="cycle">{p.cycle}</span>}
              </div>
              <Link to="/signup" className={`btn btn-block ${p.featured ? 'btn-primary' : 'btn-ghost'}`}>
                {p.cta}
              </Link>
              <ul className="price-features" style={{ marginTop: 24 }}>
                {p.features.map((f) => (
                  <li key={f}>
                    <CheckIcon />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
