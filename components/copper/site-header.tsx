import Link from "next/link";
import { Logo } from "@/components/copper/logo";
import { ModeToggle } from "@/components/copper/mode-toggle";

export function SiteHeader() {
  return (
    <header
      data-testid="site-header"
      className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" aria-label="Copper State Labs home">
          <Logo className="w-32 sm:w-44" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <nav
            aria-label="Main"
            className="flex items-center gap-3 text-xs font-medium sm:gap-6 sm:text-sm"
          >
            <a href="#products" className="hover:text-primary">
              Products
            </a>
            <a href="#plus" className="hover:text-primary">
              <span className="sm:hidden">Plus</span>
              <span className="hidden sm:inline">Copper Plus</span>
            </a>
            <a href="#privacy" className="hover:text-primary">
              Privacy
            </a>
          </nav>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
