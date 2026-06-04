import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BrandLogo from './BrandLogo'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Systems', href: '#features' },
  { label: 'Outcomes', href: '#outcomes' },
  { label: 'Industries', href: '#industries' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [sound, setSound] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`nav-premium fixed top-0 z-[800] w-full transition-all duration-300 ${
          scrolled ? 'nav-premium--scrolled' : ''
        }`}
      >
        <div className="nav-premium-inner relative">
          <button
            type="button"
            className="sound-toggle nav-sound shrink-0"
            onClick={() => setSound((s) => !s)}
            aria-label={`Sound ${sound ? 'on' : 'off'}`}
          >
            <span className="sound-bars">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`bar bar-${i} ${sound ? 'active' : ''}`} />
              ))}
            </span>
            <span>SOUND: {sound ? 'ON' : 'OFF'}</span>
          </button>

          <div className="nav-center hidden md:flex">
            <a href="#home" className="nav-logo inline-flex shrink-0 items-center">
              <BrandLogo className="nav-logo-img h-9 w-auto md:h-10" />
            </a>
            <nav className="nav-links">
              {LINKS.map((link) => (
                <a key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <a href="#home" className="nav-logo inline-flex shrink-0 items-center md:hidden">
            <BrandLogo className="h-8 w-auto" />
          </a>

          <a href="#contact" className="btn-premium nav-cta hidden shrink-0 md:inline-flex">
            GET A DEMO
          </a>

          <button
            type="button"
            className="text-[var(--white)] md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[850] flex flex-col bg-[var(--bg)] p-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mb-10 flex justify-end">
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              <BrandLogo className="mb-2 h-10 w-auto" />
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="display-lg !text-3xl"
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="btn-premium mt-4 w-fit">
                GET A DEMO
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
