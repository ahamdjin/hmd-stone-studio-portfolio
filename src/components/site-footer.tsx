import { Link } from "react-router-dom";
import { NAV_LINKS } from "@/components/site-nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#222] bg-black text-white">
      <div className="site-shell py-12">
        <Link to="/" className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity">
          Studio
        </Link>
        <nav aria-label="Footer" className="mt-8 flex flex-col gap-1 sm:flex-row sm:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex h-11 items-center text-sm text-white/70 transition-colors hover:text-white sm:h-auto"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="mt-8 text-sm text-[#666]">
          © {new Date().getFullYear()} Studio
        </p>
      </div>
    </footer>
  );
}
