/**
 * Hero — ambient floating tech icons.
 *
 * Behavior:
 *   1. Idle drift: each icon lazily wobbles on x/y + slow rotation. Duration
 *      and delay are randomized per icon so nothing reads as synced.
 *   2. Cursor-proximity glow: rAF-throttled mousemove on the hero container
 *      measures distance from cursor to each icon's screen-space center;
 *      icons within PROXIMITY_RADIUS tween to brighten + scale up + glow,
 *      and ease back out when the cursor leaves that radius.
 *   3. Parallax tilt: the whole layer softly leans a few pixels based on
 *      cursor position across the hero. Layers ("far" / "mid" / "near")
 *      travel at different weights to fake depth.
 *
 * Constraints:
 *   - Runs on desktop/tablet only. The layer is `display:none` below md,
 *     so we bail early if the layer isn't visible.
 *   - Respects `prefers-reduced-motion` — icons render static.
 *   - Fully `pointer-events: none`: proximity is done via cursor coords,
 *     never via `:hover` on the icons themselves.
 *   - Clean up all GSAP tweens + listeners on unload / view transitions.
 */

import { gsap } from "./gsap";

const PROXIMITY_RADIUS = 130; // px
const GLOW_COLOR = "rgba(232, 224, 208, 0.55)"; // matches --color-accent
const PARALLAX_WEIGHT: Record<string, number> = {
  far: 0.02,
  mid: 0.05,
  near: 0.09,
};

interface IconInstance {
  el: HTMLElement;         // outer positioner span
  inner: HTMLElement;      // GSAP transform target
  layer: "far" | "mid" | "near";
  baseOpacity: number;
  rot: number;             // base rotation in deg
  cx: number;              // last-measured viewport center x
  cy: number;              // last-measured viewport center y
  active: boolean;         // currently inside proximity radius
  driftTween?: gsap.core.Tween;
}

let icons: IconInstance[] = [];
let root: HTMLElement | null = null;
let heroSection: HTMLElement | null = null;
let rafPending = false;
let lastMouseX = 0;
let lastMouseY = 0;
let cleanupFns: Array<() => void> = [];
let initialized = false;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function baseOpacityFor(layer: "far" | "mid" | "near"): number {
  // Kept in sync with the CSS layer opacities in FloatingIcons.astro.
  switch (layer) {
    case "far":  return 0.16;
    case "mid":  return 0.28;
    case "near": return 0.4;
  }
}

/** Cache each icon's viewport-space center — cheap to recompute on resize/scroll. */
function measureIcons(): void {
  icons.forEach((ic) => {
    const rect = ic.el.getBoundingClientRect();
    ic.cx = rect.left + rect.width / 2;
    ic.cy = rect.top + rect.height / 2;
  });
}

function startIdleDrift(): void {
  icons.forEach((ic) => {
    // Independent, non-synced wobble. Larger amplitude on "near" for depth cue.
    const amp = ic.layer === "near" ? 12 : ic.layer === "mid" ? 8 : 5;
    const dur = gsap.utils.random(4.5, 7.5);
    const delay = parseFloat(ic.el.dataset.delay ?? "0");

    gsap.set(ic.inner, {
      x: 0,
      y: 0,
      rotation: ic.rot,
      scale: ic.layer === "far" ? 0.78 : ic.layer === "near" ? 1.1 : 1,
      transformOrigin: "50% 50%",
    });

    ic.driftTween = gsap.to(ic.inner, {
      x: `+=${gsap.utils.random(-amp, amp)}`,
      y: `+=${gsap.utils.random(-amp, amp)}`,
      rotation: `+=${gsap.utils.random(-5, 5)}`,
      duration: dur,
      delay,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  });
}

/** Run the proximity + parallax pass — called from an rAF tick. */
function proximityFrame(): void {
  rafPending = false;

  if (!heroSection) return;
  const heroRect = heroSection.getBoundingClientRect();

  // Normalized cursor position within hero (-1..1 on each axis, clamped)
  const nx =
    Math.max(-1, Math.min(1, (lastMouseX - (heroRect.left + heroRect.width / 2)) / (heroRect.width / 2)));
  const ny =
    Math.max(-1, Math.min(1, (lastMouseY - (heroRect.top + heroRect.height / 2)) / (heroRect.height / 2)));

  icons.forEach((ic) => {
    // --- Parallax tilt (subtle, layer-weighted) ---
    const weight = PARALLAX_WEIGHT[ic.layer] ?? 0.05;
    // Max travel: ~15px on near layer. Reads as a soft tilt, not a scene shift.
    const px = -nx * weight * 160;
    const py = -ny * weight * 160;
    gsap.to(ic.el, {
      x: px,
      y: py,
      duration: 0.9,
      ease: "power2.out",
      overwrite: "auto",
    });

    // --- Proximity glow ---
    const dx = lastMouseX - ic.cx;
    const dy = lastMouseY - ic.cy;
    const dist = Math.hypot(dx, dy);
    const isNear = dist < PROXIMITY_RADIUS;

    if (isNear && !ic.active) {
      ic.active = true;
      gsap.to(ic.inner, {
        opacity: 1,
        scale: ic.layer === "far" ? 0.92 : ic.layer === "near" ? 1.25 : 1.15,
        filter: `drop-shadow(0 0 10px ${GLOW_COLOR}) saturate(1)`,
        duration: 0.28,
        ease: "power2.out",
        overwrite: "auto",
      });
    } else if (!isNear && ic.active) {
      ic.active = false;
      const restScale = ic.layer === "far" ? 0.78 : ic.layer === "near" ? 1.1 : 1;
      const restFilter =
        ic.layer === "far"
          ? "blur(1.2px) saturate(0.55) drop-shadow(0 0 0px rgba(0,0,0,0))"
          : "saturate(0.7) drop-shadow(0 0 0px rgba(0,0,0,0))";
      gsap.to(ic.inner, {
        opacity: ic.baseOpacity,
        scale: restScale,
        filter: restFilter,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  });
}

function onMouseMove(e: MouseEvent): void {
  lastMouseX = e.clientX;
  lastMouseY = e.clientY;
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(proximityFrame);
  }
}

function onResize(): void {
  measureIcons();
}

function onScroll(): void {
  // Icon centers move with the page — cheap to recompute.
  measureIcons();
}

/** Public: initialize the floating-icons layer. Safe to call once per page load. */
export function initFloatingIcons(): void {
  if (typeof window === "undefined") return;
  if (initialized) return;

  root = document.querySelector<HTMLElement>("[data-floating-icons-root]");
  if (!root) return;

  // Bail if layer isn't rendered (mobile: display:none via Tailwind md: guard).
  const layerVisible = window.getComputedStyle(root).display !== "none";
  if (!layerVisible) return;

  heroSection = root.closest<HTMLElement>("section") ?? (document.getElementById("top") as HTMLElement | null);
  if (!heroSection) return;

  const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-floating-icon]"));
  if (nodes.length === 0) return;

  icons = nodes.map((el) => {
    const inner = el.querySelector<HTMLElement>(".floating-icon__inner")!;
    const layer = (el.dataset.layer as "far" | "mid" | "near") ?? "mid";
    const rot = parseFloat(el.dataset.rot ?? "0");
    return {
      el,
      inner,
      layer,
      rot,
      baseOpacity: baseOpacityFor(layer),
      cx: 0,
      cy: 0,
      active: false,
    };
  });

  measureIcons();
  initialized = true;

  // Reduced motion: render static, skip all animation and listeners.
  if (prefersReducedMotion()) return;

  startIdleDrift();

  heroSection.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  cleanupFns.push(() => heroSection?.removeEventListener("mousemove", onMouseMove));
  cleanupFns.push(() => window.removeEventListener("resize", onResize));
  cleanupFns.push(() => window.removeEventListener("scroll", onScroll));
}

/** Public: tear down all tweens + listeners. Called before Astro view transitions. */
export function destroyFloatingIcons(): void {
  cleanupFns.forEach((fn) => fn());
  cleanupFns = [];
  icons.forEach((ic) => {
    ic.driftTween?.kill();
    gsap.killTweensOf(ic.inner);
    gsap.killTweensOf(ic.el);
  });
  icons = [];
  root = null;
  heroSection = null;
  rafPending = false;
  initialized = false;
}
