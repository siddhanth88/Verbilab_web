import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function fadeUp(selector, options = {}) {
  const {
    y = 40,
    duration = 0.9,
    delay = 0,
    stagger = 0,
    start = 'top 82%',
    trigger,
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
      toggleActions: 'play none none none',
    },
  })
}

export function batchFadeUp(selector, options = {}) {
  const { y = 30, stagger = 0.08, start = 'top 85%' } = options

  ScrollTrigger.batch(selector, {
    start,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
        overwrite: true,
      })
    },
    once: true,
  })
}

export function clipReveal(selector, options = {}) {
  const { start = 'top 78%' } = options

  return gsap.utils.toArray(selector).map((el) =>
    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    }),
  )
}
