import { useCallback, useEffect, useState } from 'react'
import {
  playUiBlip,
  setAmbientSoundEnabled,
  teardownAmbientSound,
} from '../utils/ambientSound'
import { prefersReducedMotion } from '../utils/motion'

export function useAmbientSound() {
  const [enabled, setEnabled] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    return () => teardownAmbientSound()
  }, [])

  const toggle = useCallback(async () => {
    if (prefersReducedMotion() || busy) return

    setBusy(true)
    const next = !enabled
    const ok = await setAmbientSoundEnabled(next)
    setEnabled(ok)
    if (ok && next) playUiBlip()
    setBusy(false)
  }, [busy, enabled])

  return { enabled, toggle, busy, canUseSound: !prefersReducedMotion() }
}
