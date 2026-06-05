import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import Lenis from 'lenis'
import { prefersReducedMotion } from './utils/motion'

let lenisRafId

if (!prefersReducedMotion()) {
  const lenis = new Lenis()
  const raf = (time) => {
    lenis.raf(time)
    lenisRafId = requestAnimationFrame(raf)
  }
  lenisRafId = requestAnimationFrame(raf)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
