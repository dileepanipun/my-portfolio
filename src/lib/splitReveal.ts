/**
 * Scroll-driven text and block reveals.
 *
 * Author elements with:
 *   data-reveal
 *   data-reveal-kind="fade-up" | "chars" | "words" | "lines"
 *   data-reveal-delay="0"          (optional, in seconds)
 *   data-reveal-stagger="0.035"    (optional, in seconds — for chars/words/lines)
 *
 * Behavior:
 *   - Elements start hidden (opacity:0 via CSS in global.css).
 *   - When they intersect the viewport, GSAP + ScrollTrigger animates them in.
 *   - `chars` / `words` / `lines` variants use split-type to wrap text into spans first.
 *   - Once revealed, animations do not reverse (Apple-style — no "undoing" on scroll up).
 *   - `prefers-reduced-motion` short-circuits everything to a visible, non-animated state.
 */

import { gsap, ScrollTrigger } from "./gsap";
import SplitType from "split-type";

type RevealKind = "fade-up" | "chars" | "words" | "lines";

interface RevealConfig {
  kind: RevealKind;
  delay: number;
  stagger: number;
}

const DEFAULT_DELAY = 0;
const DEFAULT_STAGGER = 0.035;
const REVEAL_EASE = "power3.out";
const REVEAL_DURATION = 0.9;

function getConfig(el: HTMLElement): RevealConfig {
  const kind = (el.dataset.revealKind ?? "fade-up") as RevealKind;
  const delay = parseFloat(el.dataset.revealDelay ?? String(DEFAULT_DELAY));
  const stagger = parseFloat(el.dataset.revealStagger ?? String(DEFAULT_STAGGER));
  return { kind, delay, stagger };
}

function animateFadeUp(el: HTMLElement, cfg: RevealConfig): gsap.core.Tween {
  return gsap.fromTo(
    el,
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: REVEAL_DURATION,
      delay: cfg.delay,
      ease: REVEAL_EASE,
      overwrite: "auto",
    }
  );
}

function animateChars(el: HTMLElement, cfg: RevealConfig): gsap.core.Tween {
  const split = new SplitType(el, { types: "chars", tagName: "span" });
  el.classList.add("reveal-chars");
  const chars = split.chars ?? [];
  gsap.set(el, { opacity: 1 });
  return gsap.fromTo(
    chars,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: REVEAL_DURATION,
      delay: cfg.delay,
      ease: REVEAL_EASE,
      stagger: cfg.stagger,
      overwrite: "auto",
    }
  );
}

function animateWords(el: HTMLElement, cfg: RevealConfig): gsap.core.Tween {
  const split = new SplitType(el, { types: "words", tagName: "span" });
  el.classList.add("reveal-words");
  const words = split.words ?? [];
  gsap.set(el, { opacity: 1 });
  return gsap.fromTo(
    words,
    { y: 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: REVEAL_DURATION,
      delay: cfg.delay,
      ease: REVEAL_EASE,
      stagger: cfg.stagger,
      overwrite: "auto",
    }
  );
}

function animateLines(el: HTMLElement, cfg: RevealConfig): gsap.core.Tween {
  const split = new SplitType(el, { types: "lines", tagName: "span" });
  el.classList.add("reveal-lines");
  const lines = split.lines ?? [];

  // Wrap each line in a clip mask so the line slides up from behind an invisible edge.
  lines.forEach((line) => {
    const wrapper = document.createElement("span");
    wrapper.className = "reveal-mask block";
    wrapper.style.display = "block";
    wrapper.style.overflow = "hidden";
    line.parentNode?.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.set(el, { opacity: 1 });
  return gsap.fromTo(
    lines,
    { yPercent: 110, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: REVEAL_DURATION * 1.1,
      delay: cfg.delay,
      ease: REVEAL_EASE,
      stagger: Math.max(cfg.stagger * 3, 0.08),
      overwrite: "auto",
    }
  );
}

function buildTween(el: HTMLElement, cfg: RevealConfig): gsap.core.Tween {
  switch (cfg.kind) {
    case "chars":
      return animateChars(el, cfg);
    case "words":
      return animateWords(el, cfg);
    case "lines":
      return animateLines(el, cfg);
    case "fade-up":
    default:
      return animateFadeUp(el, cfg);
  }
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function revealAllImmediately(): void {
  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

function isInViewport(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom > 0;
}

async function waitForFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await document.fonts.ready;
  } catch {
    // no-op — best effort only
  }
}

export async function initReveals(): Promise<void> {
  if (typeof window === "undefined") return;

  if (prefersReducedMotion()) {
    revealAllImmediately();
    return;
  }

  // Wait for fonts so split-type measures glyphs accurately.
  await waitForFonts();

  // Give layout one frame to settle after fonts land.
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  const elements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]")
  );

  elements.forEach((el) => {
    const cfg = getConfig(el);

    // If the element is already in view on load (e.g. hero content), play immediately
    // with a short delay stack so the hero reveals as an ordered choreography.
    if (isInViewport(el) && el.closest("#top")) {
      const heroDelayIndex = Array.from(
        el.closest("#top")!.querySelectorAll<HTMLElement>("[data-reveal]")
      ).indexOf(el);
      const stackedCfg: RevealConfig = {
        ...cfg,
        delay: cfg.delay + heroDelayIndex * 0.12,
      };
      buildTween(el, stackedCfg);
      return;
    }

    // Otherwise, tie the reveal to ScrollTrigger.
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => buildTween(el, cfg),
    });
  });

  // Recompute ScrollTrigger positions once images / late assets have loaded.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}
