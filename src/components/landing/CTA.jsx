import CircuitLines from './CircuitLines.jsx'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="section cta">
      <div className="container">
        <div className="cta-band">
          <CircuitLines className="cta-circuit" />
          <h2>Ready to ship your next idea?</h2>
          <p>Join thousands of developers building and scaling on Spilight.</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">Start deploying — free</Link>
            <a href="#sales" className="btn btn-ghost btn-lg cta-ghost">Talk to sales</a>
          </div>
        </div>
      </div>
    </section>
  )
}
