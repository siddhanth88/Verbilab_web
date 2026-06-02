import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function fadeUp(selector, options = {}) {
  const {
    y = 30,
    duration = 0.95,
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
    ease: 'expo.out',
    scrollTrigger: {
      trigger: trigger || selector,
      start,
      toggleActions: 'play none none none',
    },
  })
}

export function batchFadeUp(selector, options = {}) {
  const { y = 26, stagger = 0.09, start = 'top 86%' } = options

  ScrollTrigger.batch(selector, {
    start,
    onEnter: (batch) => {
      gsap.from(batch, {
        opacity: 0,
        y,
        duration: 0.9,
        stagger,
        ease: 'expo.out',
        overwrite: true,
      })
    },
    once: true,
  })
}

export function clipReveal(selector, options = {}) {
  const { start = 'top 80%' } = options

  return gsap.utils.toArray(selector).map((el) =>
    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.15,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    }),
  )
}
