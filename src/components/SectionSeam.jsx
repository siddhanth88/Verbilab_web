/** Compact chapter break between major sections — no content, visual seam only */

export default function SectionSeam() {
  return (
    <div className="section-seam" aria-hidden>
      <div className="section-seam-ceiling scanlines">
        <div className="section-seam-scan" />
      </div>
      <div className="section-seam-frame">
        <div className="section-seam-glow" />
      </div>
    </div>
  )
}
