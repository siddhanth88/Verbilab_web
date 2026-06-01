export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-[clamp(1.5rem,4vw,4rem)] py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl">
            VERBILAB <span className="text-[var(--accent)]">AI</span>
          </p>
          <p className="mt-3 text-sm text-[var(--muted)]">
            Applied AI studio building products that solve real industry problems.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]">Solutions</h4>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a href="#products" className="hover:text-[var(--white)]">
                Call Audit AI
              </a>
            </li>
            <li>Film Intelligence (Coming Soon)</li>
            <li>Comply AI (Coming Soon)</li>
            <li>
              <a href="#contact" className="hover:text-[var(--white)]">
                Book a Demo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]">Company</h4>
          <ul className="space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a href="#about" className="hover:text-[var(--white)]">
                About Us
              </a>
            </li>
            <li>
              <a href="#industries" className="hover:text-[var(--white)]">
                Industries
              </a>
            </li>
            <li>Careers</li>
            <li>Blog / Insights</li>
            <li>
              <a href="#contact" className="hover:text-[var(--white)]">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]">Connect</h4>
          <ul className="mb-6 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <a href="#" className="hover:text-[var(--white)]">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--white)]">
                Twitter/X
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--white)]">
                YouTube
              </a>
            </li>
          </ul>
          <form
            className="flex overflow-hidden rounded-lg border border-[var(--border2)]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Newsletter email"
              className="flex-1 bg-[var(--surface2)] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--muted)]"
            />
            <button
              type="submit"
              className="bg-[var(--accent)] px-4 text-[#050508]"
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col gap-4 border-t border-[var(--border)] pt-8 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>
          © 2025 Verbilab AI. All Rights Reserved. · Privacy Policy · Terms of Use
        </p>
        <p className="italic">Intelligent Solutions. Real Results.</p>
      </div>
    </footer>
  )
}
