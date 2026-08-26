import CircuitLines from './CircuitLines.jsx'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero container">
      <div className="hero-inner">
        <div>
          <span className="eyebrow">
            <span className="dot-live" />
            Now live in 12 regions
          </span>
          <h1>
            Deploy without limits.
            <br />
            <span className="accent">Ship in seconds, not sprints.</span>
          </h1>
          <p className="lead">
            Spilight is the infrastructure platform for teams who’d rather build product
            than manage servers. Push your code, we handle the rest — builds, scaling,
            networking, and observability.
          </p>
          <div className="hero-ctas">
            <Link to="/signup" className="btn btn-primary btn-lg">Start deploying — free</Link>
            <a href="#docs" className="btn btn-ghost btn-lg">Read the docs</a>
          </div>
          <p className="hero-note">No credit card required · Free hobby tier forever</p>
        </div>

        <div className="hero-visual">
          <CircuitLines className="hero-circuit" />
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
              <span className="terminal-title">spilight — deploy</span>
            </div>
            <div className="terminal-body">
              <p><span className="prompt">$</span>spilight up</p>
              <p className="muted">Building your app...</p>
              <p className="muted">Uploading artifacts...</p>
              <p><span className="accent">✓</span>Deployed to production in 12.4s</p>
              <p><span className="accent">⚡</span>Cold start 42ms · 3 regions synced</p>
              <p className="link">https://api.spilight.app<span className="cursor" /></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
