import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './motion'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

function getNavOffset() {
  const root = document.documentElement
  const raw = getComputedStyle(root).getPropertyValue('--nav-offset').trim()
  if (!raw) return 208

  if (raw.endsWith('rem')) {
    const rem = parseFloat(raw)
    const rootSize = parseFloat(getComputedStyle(root).fontSize) || 16
    return rem * rootSize
  }

  if (raw.endsWith('px')) return parseFloat(raw)
  if (raw.endsWith('in')) return parseFloat(raw) * 96

  const parsed = parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 208
}

function resolveScrollTarget(hash) {
  const nav = getNavOffset()

  if (hash === '#contact') {
    const narrow = window.matchMedia('(max-width: 1023px)').matches
    const target = narrow
      ? document.getElementById('contact-form')
      : document.getElementById('contact')
    if (target) {
      return { target, offset: -(nav + 12) }
    }
  }

  const target = document.querySelector(hash)
  return target ? { target, offset: -nav } : null
}

export function scrollToHash(hash, { immediate = false } = {}) {
  if (!hash || hash === '#') return

  const resolved = resolveScrollTarget(hash)
  if (!resolved) return

  const { target, offset } = resolved

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: immediate ? 0 : 1.1 })
    return
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' })
}

export function initSmoothScroll() {
  if (prefersReducedMotion()) return null

  const lenis = new Lenis({
    lerp: 0.085,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const onTick = (time) => {
    lenis.raf(time * 1000)
  }

  gsap.ticker.add(onTick)
  gsap.ticker.lagSmoothing(0)

  lenisInstance = lenis
  document.documentElement.classList.add('lenis', 'lenis-smooth')

  const onAnchorClick = (e) => {
    const link = e.target.closest('a[href^="#"]')
    if (!link) return

    const hash = link.getAttribute('href')
    if (!hash || hash === '#') return

    const resolved = resolveScrollTarget(hash)
    if (!resolved) return

    e.preventDefault()
    scrollToHash(hash)
  }

  document.addEventListener('click', onAnchorClick)

  return () => {
    document.removeEventListener('click', onAnchorClick)
    gsap.ticker.remove(onTick)
    lenis.destroy()
    lenisInstance = null
    document.documentElement.classList.remove('lenis', 'lenis-smooth')
  }
}

export function getLenis() {
  return lenisInstance
}
