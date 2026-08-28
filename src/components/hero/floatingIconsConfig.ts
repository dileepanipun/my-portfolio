/**
 * Data-driven layout for the ambient floating tech icons in the hero.
 *
 * Placement is weighted toward the RIGHT half of the hero (portrait sits
 * on the left, headline copy sits center/right). A few icons scatter into
 * the upper-left "sky" above the portrait for balance. No symmetrical grid.
 *
 * Coordinates are % relative to the hero container (0 → 100).
 * Layers control base opacity / blur / parallax weight.
 */

export type FloatingIconLayer = "far" | "mid" | "near";

export interface FloatingIconConfig {
  /** Stable id — matches an SVG raw import key in FloatingIcons.astro */
  id: string;
  /** Display name (used for aria-label / title tooltip) */
  label: string;
  /** X position — % from left of hero */
  x: number;
  /** Y position — % from top of hero */
  y: number;
  /** Base size in px */
  size: number;
  /** Depth layer — controls opacity, blur, parallax weight */
  layer: FloatingIconLayer;
  /** Extra idle-drift stagger offset in seconds */
  driftDelay: number;
  /** Initial rotation in degrees (adds visual variety) */
  rotation?: number;
}

/**
 * 12 icons — chosen to reflect the actual stack. Positions are hand-tuned:
 *   - Right column (x ≥ 60): dense — flanks the headline text.
 *   - Upper-left sky (x ≤ 25, y ≤ 30): a few for balance, above the portrait.
 *   - Nothing in the horizontal band where the H1 sits (roughly y 42-62 & x 30-70).
 */
export const heroFloatingIcons: FloatingIconConfig[] = [
  // ── Upper-right cluster ─────────────────────────────
  { id: "typescript", label: "TypeScript", x: 72, y: 12, size: 36, layer: "near", driftDelay: 0.0, rotation: -4 },
  { id: "angular",    label: "Angular",    x: 88, y: 22, size: 30, layer: "mid",  driftDelay: 0.9, rotation: 6 },
  { id: "tailwindcss",label: "Tailwind CSS", x: 62, y: 26, size: 26, layer: "far", driftDelay: 1.6, rotation: -2 },

  // ── Right edge column ───────────────────────────────
  { id: "javascript", label: "JavaScript", x: 92, y: 45, size: 28, layer: "mid",  driftDelay: 0.4, rotation: 3 },
  { id: "sass",       label: "Sass",       x: 78, y: 58, size: 24, layer: "far",  driftDelay: 2.1, rotation: -6 },
  { id: "git",        label: "Git",        x: 90, y: 72, size: 32, layer: "near", driftDelay: 1.1, rotation: 4 },

  // ── Lower-right anchor ──────────────────────────────
  { id: "docker",     label: "Docker",     x: 70, y: 84, size: 34, layer: "mid",  driftDelay: 0.6, rotation: -3 },
  { id: "github",     label: "GitHub",     x: 84, y: 90, size: 22, layer: "far",  driftDelay: 2.4, rotation: 8 },

  // ── Upper-left sky (above portrait, for balance) ───
  { id: "html5",      label: "HTML5",      x: 24,  y: 14, size: 26, layer: "mid",  driftDelay: 1.4, rotation: 5 },
  { id: "css",        label: "CSS",        x: 32, y: 22, size: 22, layer: "far",  driftDelay: 2.0, rotation: -7 },
  { id: "figma",      label: "Figma",      x: 14, y: 34, size: 28, layer: "near", driftDelay: 0.3, rotation: 2 },

  // ── Center-top drift (single, small, low opacity) ──
  { id: "claude",     label: "Claude",     x: 46, y: 8,  size: 24, layer: "far",  driftDelay: 1.8, rotation: -5 },
];
