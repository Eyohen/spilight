function LogoMark() {
  return (
    <span className="logo-mark">
      <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
        <path d="M20 6 12 18h6l-2 8 10-14h-7l1-6z" fill="#D7FF3E" />
      </svg>
    </span>
  )
}

const columns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Status'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Community', 'Support', 'Guides'],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="logo">
              <LogoMark />
              Spilight
            </a>
            <p>The server platform for teams who’d rather build product than manage infrastructure.</p>
          </div>

          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h4>{col.title}</h4>
              {col.links.map((l) => (
                <a href="#" key={l}>{l}</a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Spilight, Inc. All rights reserved.</span>
          <div className="footer-socials">
            <a href="#" aria-label="X / Twitter">X</a>
            <a href="#" aria-label="GitHub">GitHub</a>
            <a href="#" aria-label="Discord">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
