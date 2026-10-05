import { useEffect, useState } from 'react'

const SPA_EXACT_ROUTES = new Set(['/privacy', '/terms', '/faq', '/blog', '/lumea-os/privacy-policy'])

export function normalizePath(path = window.location.pathname) {
  const clean = path.replace(/\/+$/, '') || '/'
  return clean
}

export function isSpaRoute(path = window.location.pathname) {
  const normalized = normalizePath(path)
  if (SPA_EXACT_ROUTES.has(normalized)) return true
  if (normalized.startsWith('/blog/') && normalized.length > 6) return true
  return false
}

export function getBlogSlug(path = window.location.pathname) {
  const normalized = normalizePath(path)
  if (!normalized.startsWith('/blog/') || normalized === '/blog') return null
  return normalized.slice(6)
}

export function navigate(path) {
  const next = normalizePath(path)
  if (normalizePath(window.location.pathname) === next) return
  window.history.pushState({}, '', next)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function initClientRouter() {
  if (typeof window !== 'undefined') {
    const boot = normalizePath()
    if (isSpaRoute(boot)) {
      window.history.replaceState({}, '', boot)
    }
  }

  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }

    const link = e.target.closest('a[href]')
    if (!link || link.target === '_blank') return

    const raw = link.getAttribute('href')
    if (!raw || raw.startsWith('mailto:') || raw.startsWith('tel:')) return

    let url
    try {
      url = new URL(raw, window.location.origin)
    } catch {
      return
    }

    if (url.origin !== window.location.origin) return

    const path = normalizePath(url.pathname)
    if (!isSpaRoute(path)) return

    e.preventDefault()
    navigate(path)
  }

  document.addEventListener('click', onClick)
  return () => document.removeEventListener('click', onClick)
}

export function usePathname() {
  const [pathname, setPathname] = useState(() => normalizePath())

  useEffect(() => {
    const onPop = () => setPathname(normalizePath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return pathname
}
