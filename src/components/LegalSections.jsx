export default function LegalSections() {
  return (
    <div className="legal-wrap">
      <div className="section-inner legal-compact-inner">
        <div className="legal-grid">
          <article id="privacy" className="legal-card" aria-labelledby="privacy-heading">
            <h2 id="privacy-heading" className="legal-card-title">
              Privacy
            </h2>
            <ul className="legal-list">
              <li>We collect what you submit on the contact form — name, company, email, and message.</li>
              <li>Used only to respond, schedule demos, and improve our services. Never sold.</li>
              <li>Data kept only as long as needed. Protected with standard security measures.</li>
            </ul>
            <p className="legal-card-foot">
              Questions?{' '}
              <a href="mailto:hello@verbilab.ai" className="legal-link">
                hello@verbilab.ai
              </a>
            </p>
          </article>

          <article id="terms" className="legal-card" aria-labelledby="terms-heading">
            <h2 id="terms-heading" className="legal-card-title">
              Terms
            </h2>
            <ul className="legal-list">
              <li>Site content is informational. Enterprise deals use separate contracts.</li>
              <li>Verbilab owns all branding, software, and materials here. No copying without permission.</li>
              <li>Site provided as-is. Governed by applicable law in India.</li>
            </ul>
            <p className="legal-card-foot">
              Questions?{' '}
              <a href="mailto:hello@verbilab.ai" className="legal-link">
                hello@verbilab.ai
              </a>
            </p>
          </article>
        </div>
      </div>
    </div>
  )
}
