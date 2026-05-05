"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/Dialog";

const NAV_LINKS = [
  { label: "Fleet", href: "#fleet" },
  { label: "Booking", href: "#booking" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const id = href.replace("#", "");
      scrollToSection(id);
      setMobileOpen(false);
    },
    [],
  );

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={cn(
            "text-2xl font-light lowercase tracking-wider transition-colors",
            scrolled ? "text-primary" : "text-white",
          )}
        >
          roda
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    "text-xs font-medium uppercase tracking-widest transition-colors",
                    scrolled
                      ? "text-text-muted hover:text-primary"
                      : "text-white/80 hover:text-white",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Book Now */}
        <button
          type="button"
          onClick={() => scrollToSection("booking")}
          className={cn(
            "hidden rounded-full px-5 py-2 text-xs font-medium uppercase tracking-wider transition-all md:inline-flex",
            scrolled
              ? "bg-primary text-white hover:bg-primary-dark"
              : "border border-white/40 text-white hover:border-white hover:bg-white/10",
          )}
        >
          Book Now
        </button>

        {/* Mobile hamburger + dialog */}
        <div className="md:hidden">
          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="Open navigation menu"
                className={cn(
                  "inline-flex items-center justify-center rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  scrolled
                    ? "text-text hover:bg-surface"
                    : "text-white hover:bg-white/10",
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </DialogTrigger>

            <DialogContent className="!left-auto !top-0 !max-w-none !translate-x-0 !translate-y-0 inset-y-0 right-0 h-full w-72 !rounded-none !border-0 bg-primary-dark data-[state=open]:!slide-in-from-right data-[state=closed]:!slide-out-to-right data-[state=open]:!slide-in-from-top-0 data-[state=closed]:!slide-out-to-top-0 data-[state=open]:!zoom-in-100 data-[state=closed]:!zoom-out-100">
              <div className="flex h-full flex-col px-6 py-6">
                {/* Header row with logo + close */}
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-light lowercase tracking-wider text-white">
                    roda
                  </DialogTitle>
                  <DialogClose asChild>
                    <button
                      type="button"
                      aria-label="Close navigation menu"
                      className="rounded-md p-2 text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </DialogClose>
                </div>

                {/* Mobile nav links */}
                <nav className="mt-8" aria-label="Mobile navigation">
                  <ul className="flex flex-col gap-1">
                    {NAV_LINKS.map(({ label, href }) => (
                      <li key={href}>
                        <a
                          href={href}
                          onClick={(e) => handleNavClick(e, href)}
                          className="block rounded-md px-3 py-2.5 text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile Book Now */}
                <div className="mt-auto pt-6">
                  <button
                    type="button"
                    className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                    onClick={() => {
                      scrollToSection("booking");
                      setMobileOpen(false);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
