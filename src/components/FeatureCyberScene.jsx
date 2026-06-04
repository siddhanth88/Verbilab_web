import FeatureCyberCanvas from './FeatureCyberCanvas'
import FeatureIsoCity from './FeatureIsoCity'
import FeatureSceneOverlays from './FeatureSceneOverlays'

export default function FeatureCyberScene({ activeId }) {
  return (
    <div className="cyber-scene">
      <FeatureCyberCanvas />
      <div className="cyber-scene-vignette" aria-hidden />
      <div className="cyber-scene-scanlines" aria-hidden />
      <FeatureIsoCity activeId={activeId} />
      <FeatureSceneOverlays activeId={activeId} />
      <div className="cyber-scene-hud-corners" aria-hidden>
        <span className="cyber-corner tl" />
        <span className="cyber-corner tr" />
        <span className="cyber-corner bl" />
        <span className="cyber-corner br" />
      </div>
    </div>
  )
}
