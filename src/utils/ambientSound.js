import { prefersReducedMotion } from './motion'

const STORAGE_KEY = 'verbilab-sound'

class AmbientSoundEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.nodes = null
    this.running = false
    this.fadeTimer = null
  }

  async start() {
    if (this.running) return true
    if (prefersReducedMotion()) return false

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return false

      this.ctx = new AudioCtx()
      if (this.ctx.state === 'suspended') {
        await this.ctx.resume()
      }

      this.master = this.ctx.createGain()
      this.master.gain.value = 0
      this.master.connect(this.ctx.destination)

      const droneGain = this.ctx.createGain()
      droneGain.gain.value = 0.045

      const oscLow = this.ctx.createOscillator()
      oscLow.type = 'sine'
      oscLow.frequency.value = 52

      const oscMid = this.ctx.createOscillator()
      oscMid.type = 'triangle'
      oscMid.frequency.value = 104

      const oscHigh = this.ctx.createOscillator()
      oscHigh.type = 'sine'
      oscHigh.frequency.value = 156

      const lfo = this.ctx.createOscillator()
      lfo.type = 'sine'
      lfo.frequency.value = 0.08
      const lfoGain = this.ctx.createGain()
      lfoGain.gain.value = 6
      lfo.connect(lfoGain)
      lfoGain.connect(oscLow.frequency)

      const bufferSize = 2 * this.ctx.sampleRate
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      let b0 = 0
      let b1 = 0
      let b2 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.969 * b2 + white * 0.153852
        data[i] = (b0 + b1 + b2) * 0.22
      }

      const noise = this.ctx.createBufferSource()
      noise.buffer = noiseBuffer
      noise.loop = true

      const noiseFilter = this.ctx.createBiquadFilter()
      noiseFilter.type = 'bandpass'
      noiseFilter.frequency.value = 420
      noiseFilter.Q.value = 0.7

      const noiseGain = this.ctx.createGain()
      noiseGain.gain.value = 0.012

      oscLow.connect(droneGain)
      oscMid.connect(droneGain)
      oscHigh.connect(droneGain)
      droneGain.connect(this.master)

      noise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(this.master)

      oscLow.start()
      oscMid.start()
      oscHigh.start()
      lfo.start()
      noise.start()

      const now = this.ctx.currentTime
      this.master.gain.setValueAtTime(0, now)
      this.master.gain.linearRampToValueAtTime(0.42, now + 1.8)

      this.nodes = { oscLow, oscMid, oscHigh, lfo, noise, droneGain, noiseGain }
      this.running = true
      return true
    } catch {
      this.stop()
      return false
    }
  }

  stop() {
    if (this.fadeTimer) {
      clearTimeout(this.fadeTimer)
      this.fadeTimer = null
    }

    if (!this.ctx || !this.master) {
      this.running = false
      return
    }

    const ctx = this.ctx
    const nodes = this.nodes
    const now = ctx.currentTime

    this.master.gain.cancelScheduledValues(now)
    this.master.gain.setValueAtTime(this.master.gain.value, now)
    this.master.gain.linearRampToValueAtTime(0, now + 0.9)

    this.running = false
    this.fadeTimer = setTimeout(() => {
      try {
        nodes?.oscLow?.stop()
        nodes?.oscMid?.stop()
        nodes?.oscHigh?.stop()
        nodes?.lfo?.stop()
        nodes?.noise?.stop()
        ctx.close()
      } catch {
        /* already stopped */
      }
      this.ctx = null
      this.master = null
      this.nodes = null
      this.fadeTimer = null
    }, 950)
  }

  playUiBlip() {
    if (!this.running || !this.ctx || !this.master) return

    try {
      const t = this.ctx.currentTime
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, t)
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.06)
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.018, t + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07)
      osc.connect(gain)
      gain.connect(this.master)
      osc.start(t)
      osc.stop(t + 0.08)
    } catch {
      /* ignore */
    }
  }
}

const engine = new AmbientSoundEngine()

export function isAmbientSoundEnabled() {
  if (prefersReducedMotion()) return false
  return localStorage.getItem(STORAGE_KEY) === 'on'
}

export function setAmbientSoundEnabled(enabled) {
  if (prefersReducedMotion()) {
    localStorage.setItem(STORAGE_KEY, 'off')
    engine.stop()
    return Promise.resolve(false)
  }

  localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off')

  if (enabled) {
    return engine.start().then((ok) => {
      if (!ok) localStorage.setItem(STORAGE_KEY, 'off')
      return ok
    })
  }

  engine.stop()
  return Promise.resolve(false)
}

export function playUiBlip() {
  engine.playUiBlip()
}

export function teardownAmbientSound() {
  engine.stop()
}
