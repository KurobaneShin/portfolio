import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LangChooser } from "./LangChooser";
import { ModeToggle } from "./ModeToggle";
import { SocialLinks } from "./SocialLinks";

export function BlogShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center px-5 md:px-10">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl tracking-tight">{t("title")}</span>
            <span className="eyebrow hidden sm:inline">Ícaro</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Link to="/blog" className="eyebrow pr-4 transition-colors hover:text-foreground">
              {t("nav.blog")}
            </Link>
            <ModeToggle />
            <LangChooser />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center md:px-10">
          <p className="eyebrow">© {new Date().getFullYear()} Kurobane</p>
          <SocialLinks className="sm:ml-auto" />
          <Link to="/" hash="contact" data-umami-event="hire" data-umami-event-place="blog-footer" className="eyebrow transition-colors hover:text-signal sm:ml-5">
            {t("hire")} ↗
          </Link>
        </div>
      </footer>
    </div>
  );
}
