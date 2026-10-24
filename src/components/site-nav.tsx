import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { Sheet, SheetClose, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/our-team", label: "Our Team" },
  { to: "/contact", label: "Contact" },
];

// The footer renders these too, from this one list, so nav and footer cannot drift.
export const NAV_LINKS = links;


/** Past this many pixels the bar goes solid, so page text never runs under it. */
const SOLID_AFTER = 40;

export function SiteNav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  const update = useCallback(() => {
    setScrolled(window.scrollY > SOLID_AFTER);
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      update();
    });
  }, [update]);

  useEffect(() => {
    // Read once straight away — a reload can restore a scrolled position, and
    // the bar must already be solid on the first paint.
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, update]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-[#222]" : ""
      }`}
    >
      {/* The solid backdrop lives on a CHILD layer, never on the nav itself:
          backdrop-filter on an ancestor makes it the containing block for
          fixed descendants, which re-anchors the menu sheet to the bar — the
          off-screen sheet then widens the page and the document scrolls
          sideways (docs/design/mobile-menu.md build note). */}
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 transition-[background-color,backdrop-filter] duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-sm" : ""
        }`}
      />
      {/* Scrim — keeps the links legible over light hero imagery */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/35 to-transparent transition-opacity duration-300 ${
          scrolled ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      <div className="site-shell relative py-5 flex items-center justify-between">
        {/* One line, always: the name truncates rather than wrapping the bar
            or colliding with the links (docs/design/mobile-menu.md rule 1). */}
        <Link
          to="/"
          className="min-w-0 flex-1 truncate text-white text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Studio
        </Link>
        {/* Desktop: links inline. Mobile: they move into the menu sheet —
            a nav that vanished below a breakpoint with no trigger would be
            a broken screen, not a responsive one. */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              aria-current={pathname === link.to ? "page" : undefined}
              className={`text-sm transition-colors ${
                pathname === link.to
                  ? "text-white border-b border-white pb-0.5"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <MobileMenu pathname={pathname} />
      </div>
    </nav>
  );
}

/** The measured motion (docs/design/mobile-menu.md). Inline style, not a
 *  Tailwind class: inline always wins, and Tailwind silently drops ambiguous
 *  ease-[cubic-bezier(...)] classes. */
const SHEET_MOTION = {
  animationDuration: "320ms",
  animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;
const ICON_MOTION = {
  animationDuration: "200ms",
  animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
} as const;

/**
 * ☰ → full-height sheet sliding in from the right, leaving a 64px finger strip
 * of scrim that closes it (as do ✕, the scrim anywhere, and Esc). Scale per
 * docs/design/mobile-menu.md: 54px full-bleed rows, -3px margin, 48px inset
 * inside the row, 28px/600/32 type. Tone follows the site: black sheet,
 * dimming scrim.
 *
 * Built on the vendored Sheet primitive (Radix dialog): the portal renders the
 * sheet at the body root, so no ancestor filter/transform can re-anchor it;
 * Esc, scrim-close, scroll lock, and the focus trap come from Radix. The morph
 * is two halves of one visual button: ☰ lives in the bar and spins out on
 * open; ✕ lives INSIDE the portal (Radix blocks clicks outside the open
 * dialog) positioned exactly over the trigger's spot, and spins in.
 */
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        {/* The ☰ half of the morphing trigger — in the bar's icon spot. */}
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open menu"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center text-white"
          >
            <span
              aria-hidden
              className={`grid place-items-center transition-all [transition-duration:200ms] [transition-timing-function:cubic-bezier(0.4,0,0.6,1)] motion-reduce:transition-none ${
                open ? "-rotate-180 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <Menu size={24} />
            </span>
          </button>
        </SheetTrigger>

        <SheetPortal>
          {/* Scrim — dims the page. Radix closes on click. */}
          <SheetOverlay
            className="z-[55] bg-black/50 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 motion-reduce:animate-none"
            style={SHEET_MOTION}
          />

          {/* The sheet: full height, right-anchored, 64px finger strip left. */}
          <SheetPrimitive.Content
            aria-describedby={undefined}
            className="group fixed inset-y-0 right-0 z-[55] flex w-[calc(100%-64px)] flex-col border-l border-[#222] bg-black text-white outline-none data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right motion-reduce:animate-none"
            style={SHEET_MOTION}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>

            {/* The ✕ half of the morph — fixed over the bar trigger's spot. */}
            <SheetClose
              aria-label="Close menu"
              className="fixed right-2 top-0 flex h-11 w-11 items-center justify-center text-white outline-none"
            >
              <span
                aria-hidden
                className="grid place-items-center motion-reduce:animate-none group-data-[state=open]:animate-in group-data-[state=open]:[--tw-enter-rotate:180deg] group-data-[state=open]:[--tw-enter-opacity:0] group-data-[state=closed]:animate-out group-data-[state=closed]:[--tw-exit-rotate:180deg] group-data-[state=closed]:[--tw-exit-opacity:0]"
                style={ICON_MOTION}
              >
                <X size={24} />
              </span>
            </SheetClose>

            {/* Top zone: 2× the bar, the ✕ floats in its first half. */}
            <div className="h-28 shrink-0" />

            {/* Routes — where you can go. The row is the box: full-bleed, tappable
                edge to edge, inset carried as padding inside it. */}
            <div className="flex flex-col space-y-[-3px]">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.to ? "page" : undefined}
                  className={`flex h-[54px] w-full items-center justify-end px-12 text-[28px] font-semibold leading-8 tracking-tight ${
                    pathname === link.to ? "text-white" : "text-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetPrimitive.Content>
        </SheetPortal>
      </Sheet>
    </div>
  );
}
