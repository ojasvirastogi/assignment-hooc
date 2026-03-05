/**
 * Centralized color configuration for the Hooc-AI frontend.
 * All color values used across pages and components are defined here.
 * Import `colors` wherever you need a color value.
 */

export const colors = {
  // ── Brand Reds ────────────────────────────────────────────────────────────
  /** Primary brand red – used for accent text, highlights (#E32C21) */
  primary: "#E32C21",
  /** Alternate brand red (#E10600) */
  primaryAlt: "#E10600",
  /** Darker brand red for footer top bar (#b42318) */
  primaryDark: "#b42318",
  /** Deep brand red for footer body bg (#891919) */
  primaryDeep: "#891919",
  /** Glow / mobile-menu gradient red (#8e1b1b) */
  primaryGlow: "#8e1b1b",
  /** Footer grainy overlay red (#be0000) */
  primaryFooter: "#be0000",
  /** CTA button text hover red (#D6060B) */
  primaryCta: "#D6060B",
  /** Stats section accent red (#E91010) */
  primaryStats: "#E91010",

  // ── Dark Backgrounds ─────────────────────────────────────────────────────
  /** Pure black (#000000) */
  bgBlack: "#000000",
  /** Near-black, almost-black deep bg (#050505) */
  bgDeep: "#050505",
  /** Main dark background used across sections (#0a0a0a) */
  bgDark: "#0a0a0a",
  /** Dark red-tinted bg (#1a0000) */
  bgMid: "#1a0000",
  /** Card bg for carousels and boxes (#1A1A1A) */
  bgCard: "#1A1A1A",
  /** Slightly lighter card bg (#161616) */
  bgCardAlt: "#161616",
  /** Dark teal-tinted bg for service process steps (#0a1619) */
  bgSubtle: "#0a1619",
  /** Dark red-tinted bg for digital-marketing steps (#0f0a0a) */
  bgDarkRed: "#0f0a0a",
  /** Heavy red gradient top for TeamMosaic (#4c0505) */
  bgGradientDeep: "#4c0505",
  /** Dark tinted service section bg for gradients (#1a0a0a) */
  bgServiceGradient: "#1a0a0a",
  /** Dark browser-bar / code bg (#111) */
  bgCodeDark: "#111",

  // ── Light Backgrounds ─────────────────────────────────────────────────────
  /** Light grey bg – Stats section light mode (#EFEFEF) */
  bgLight: "#EFEFEF",
  /** Very light grey – Hero section bg (#f6f6f6) */
  bgHero: "#f6f6f6",

  // ── Text ─────────────────────────────────────────────────────────────────
  /** Pure white text (#ffffff) */
  textWhite: "#ffffff",
  /** Pure black text (#000000) */
  textBlack: "#000000",
  /** Near-black body text (#1a1a1a) */
  textBody: "#1a1a1a",
  /** Muted dark text – light mode stat labels (#444444) */
  textMuted: "#444444",
  /** Subtle grey – dark mode stat labels (#888888) */
  textSubtle: "#888888",

  // ── IndustrySection scroll colors ─────────────────────────────────────────
  /** Scroll trigger text colors (light → dark) */
  industryTextColors: ["#FFFFFF", "#FFFFFF", "#000000", "#000000"] as string[],
  /** Scroll trigger bg colors (dark → light) */
  industryBgColors: ["#000000", "#000000", "#FFFFFF", "#FFFFFF"] as string[],

  // ── Project card Tailwind bg classes ─────────────────────────────────────
  projectLavender: "bg-[#D6B3FF]",
  projectPurple: "bg-[#4c3592]",
  projectDark: "bg-[#2A2A2A]",
} as const;

export type Colors = typeof colors;
