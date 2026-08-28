/**
 * Small vanilla-TS controller for the site nav.
 *  - Adds a solid background + bottom border once the user scrolls past the hero.
 *  - Toggles the mobile menu (fade in/out, body-scroll lock).
 *  - Closes the mobile menu when any in-menu link is clicked.
 */
export function initNav(): void {
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!nav || !toggle || !menu) return;

  // --- Sticky nav background swap ---
  const SCROLL_THRESHOLD = 80;
  const applyScrollState = () => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;
    nav.classList.toggle("bg-bg/85", scrolled);
    nav.classList.toggle("backdrop-blur-md", scrolled);
    nav.classList.toggle("border-b", scrolled);
    nav.classList.toggle("border-border", scrolled);
    nav.dataset.navTransparent = scrolled ? "false" : "true";
  };
  applyScrollState();
  window.addEventListener("scroll", applyScrollState, { passive: true });

  // --- Mobile menu ---
  let open = false;
  const setOpen = (next: boolean) => {
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    menu.classList.toggle("opacity-100", open);
    menu.classList.toggle("opacity-0", !open);
    menu.classList.toggle("pointer-events-auto", open);
    menu.classList.toggle("pointer-events-none", !open);
    document.documentElement.style.overflow = open ? "hidden" : "";
  };

  toggle.addEventListener("click", () => setOpen(!open));

  menu.querySelectorAll<HTMLAnchorElement>("[data-mobile-link]").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && open) setOpen(false);
  });
}
