/**
 * Single import surface for GSAP + ScrollTrigger.
 * Import from here everywhere so the plugin only ever registers once.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
