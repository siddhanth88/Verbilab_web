import BrandLogo from './BrandLogo'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-[clamp(1.25rem,4vw,4rem)] py-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <BrandLogo className="h-9 w-auto" />
          <p className="body-short mt-3">Intelligent solutions. Real results.</p>
        </div>
        <p className="mono-label opacity-60">© 2025 Verbilab AI</p>
      </div>
    </footer>
  )
}
