import BrandLogo from './BrandLogo'

const FOOTER_COLUMNS = [
  {
    title: 'Menu',
    links: [
      { label: 'Home', href: '#home' },
      { label: 'Contact', href: '#contact' },
      { label: 'About', href: '#about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: 'mailto:hello@verbilab.ai?subject=Careers' },
      { label: 'hello@verbilab.ai', href: 'mailto:hello@verbilab.ai' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Product Systems', href: '#systems' },
      { label: 'Outcomes', href: '#outcomes' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Industries', href: '#industries' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/verbilab/', external: true },
      { label: 'X', href: 'https://x.com', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="verbilab-footer">
      <p className="footer-watermark" aria-hidden>
        VERBILAB
      </p>

      <div className="footer-columns section-inner">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="footer-col">
            <div className="footer-col-head">
              <span>{col.title}</span>
            </div>
            <ul className="footer-col-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="footer-link"
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom section-inner">
        <div className="footer-brand">
          <BrandLogo className="h-9 w-auto opacity-90" />
          <p className="body-short mt-2">Intelligent solutions. Real results.</p>
        </div>
        <div className="footer-legal">
          <span className="mono-label subtle">© 2026 Verbilab AI</span>
          <span className="footer-legal-divider" aria-hidden />
          <a href="#privacy" className="footer-link footer-link--small">
            Privacy
          </a>
          <span className="footer-legal-divider" aria-hidden />
          <a href="#terms" className="footer-link footer-link--small">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
