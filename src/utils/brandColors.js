/** Verbilab logo palette — single source of truth for JS/canvas/SVG/Three.js */
export const BRAND_BLUE = '#5BC0DE'
export const BRAND_BLUE_RGB = '91, 192, 222'
export const BRAND_LIME = '#C1E14F'
export const BRAND_LIME_RGB = '193, 225, 79'
export const BRAND_GREY = '#5A5A5A'
export const BRAND_GREY_RGB = '90, 90, 90'

/** Primary accent — logo sky blue (neon glows, lines, particles) */
export const ACCENT = BRAND_BLUE
export const ACCENT_RGB = BRAND_BLUE_RGB

/** Secondary — logo lime crescent (subtle highlights) */
export const ACCENT_SECONDARY = BRAND_LIME
export const ACCENT_SECONDARY_RGB = BRAND_LIME_RGB

/** Hover / focus — brighter neon blue */
export const ACCENT_INTERACTIVE = '#8FD4EF'
export const ACCENT_INTERACTIVE_RGB = '143, 212, 239'

/** Gradient endpoints */
export const ACCENT_DEEP = '#3DA8C8'
export const ACCENT_NEON = '#7DD8F5'

/** `rgba(91, 192, 222, alpha)` for canvas/SVG */
export function accentAlpha(alpha) {
  return `rgba(${ACCENT_RGB}, ${alpha})`
}

export function secondaryAlpha(alpha) {
  return `rgba(${ACCENT_SECONDARY_RGB}, ${alpha})`
}
