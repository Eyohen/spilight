import { useState } from 'react'
import { Link } from 'react-router-dom'

function LogoMark() {
  return (
    <span className="logo-mark">
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <path d="M20 6 12 18h6l-2 8 10-14h-7l1-6z" fill="#D7FF3E" />
      </svg>
    </span>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="nav-inner container">
        <a href="#top" className="logo">
          <LogoMark />
          Spilight
          <span className="build-tag mono">v2.4.1</span>
        </a>

        <div className={`nav-menu ${open ? 'open' : ''}`}>
          <nav className="nav-links">
            <a href="#product" onClick={() => setOpen(false)}>Product</a>
            <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
            <a href="#docs" onClick={() => setOpen(false)}>Docs</a>
            <a href="#changelog" onClick={() => setOpen(false)}>Changelog</a>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn btn-ghost" onClick={() => setOpen(false)}>Log in</Link>
            <Link to="/signup" className="btn btn-primary" onClick={() => setOpen(false)}>Start deploying</Link>
          </div>
        </div>

        <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
