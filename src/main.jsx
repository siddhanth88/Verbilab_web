import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import { initSmoothScroll } from './utils/scroll'

const cleanupScroll = initSmoothScroll()

if (import.meta.hot) {
  import.meta.hot.dispose(() => cleanupScroll?.())
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
