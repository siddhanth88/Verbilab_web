import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Reveal once when scrolling into view — stays visible (no hide on small scroll). */
const REVEAL_ONCE = {
  start: 'top 88%',
  toggleActions: 'play none none none',
}

export function scrollReveal(elements, options = {}) {
  const defaults = {
    y: 40,
    opacity: 0,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.1,
    trigger: null,
    start: REVEAL_ONCE.start,
    once: true,
  }
  const config = { ...defaults, ...options }
  const target = elements?.length ? elements[0] : elements

  return gsap.from(elements, {
    y: config.y,
    opacity: config.opacity,
    duration: config.duration,
    ease: config.ease,
    stagger: config.stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger: config.trigger || target,
      start: config.start,
      toggleActions: config.toggleActions || REVEAL_ONCE.toggleActions,
      once: config.once !== false,
    },
  })
}

export function fadeUp(selector, options = {}) {
  const {
    y = 24,
    duration = 0.85,
    delay = 0,
    stagger = 0,
    start = REVEAL_ONCE.start,
    trigger,
    once = true,
    toggleActions = REVEAL_ONCE.toggleActions,
  } = options

  return gsap.from(selector, {
    opacity: 0,
    y,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: trigger || selector,
      start,
      toggleActions,
      once,
    },
  })
}

export function batchFadeUp(selector, options = {}) {
  const { y = 24, stagger = 0.09, start = 'top 88%' } = options

  ScrollTrigger.batch(selector, {
    start,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y,
        duration: 0.85,
        stagger,
        ease: 'power3.out',
        overwrite: true,
      })
    },
    once: true,
  })
}

export function clipReveal(selector, options = {}) {
  const { start = 'top 80%', trigger } = options

  return gsap.utils.toArray(selector).map((el) =>
    gsap.from(el, {
      y: '100%',
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || el.closest('.cta-section') || el,
        start,
        toggleActions: REVEAL_ONCE.toggleActions,
        once: true,
      },
    }),
  )
}
