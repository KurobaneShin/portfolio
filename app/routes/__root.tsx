import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import { z } from "zod";
import { Toaster } from "~/components/ui/sonner";
import { getPublicEnv } from "~/modules/env.functions";
import { createI18n } from "~/modules/i18n";
import { getCookieLocale } from "~/modules/locale";
import { htmlLang } from "~/modules/person";
import { safeJson } from "~/modules/seo";

import stylesHref from "../tailwind.css?url";

export const Route = createRootRoute({
  validateSearch: z.object({ lng: z.enum(["en", "ptBR"]).optional().catch(undefined) }),
  beforeLoad: ({ search }) => ({ locale: search.lng ?? getCookieLocale() }),
  loader: () => getPublicEnv(),
  head: ({ loaderData: env }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "light dark" },
      ...(env?.GOOGLE_SITE_VERIFICATION
        ? [{ name: "google-site-verification", content: env.GOOGLE_SITE_VERIFICATION }]
        : []),
    ],
    links: [
      { rel: "stylesheet", href: stylesHref },
      {
        rel: "icon",
        href: "/favicon.jpeg",
        type: "image/png",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        href:
          "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,300..500;1,6..72,300..400&family=Schibsted+Grotesk:wght@400..600&display=swap",
        rel: "stylesheet",
      },
      {
        rel: "manifest",
        href: "/site.webmanifest",
        crossOrigin: "use-credentials",
      },
    ],
    scripts: [
      ...(env?.UMAMI_SCRIPT_URL && env.UMAMI_WEBSITE_ID
        ? [{ src: env.UMAMI_SCRIPT_URL, defer: true, "data-website-id": env.UMAMI_WEBSITE_ID }]
        : []),
      { children: `window.ENV = ${safeJson(env)}` },
    ],
  }),
  shellComponent: RootDocument,
  component: Outlet,
  notFoundComponent: () => <h1>404</h1>,
});

function RootDocument({ children }: { children: ReactNode }) {
  const locale = Route.useRouteContext({ select: (c) => c.locale });
  const lng = Route.useSearch({ select: (s) => s.lng });
  const i18n = useMemo(() => createI18n(locale), [locale]);

  // Remember an explicit ?lng= choice for later visits to URLs without it.
  useEffect(() => {
    if (lng) {
      document.cookie = `lng=${lng}; path=/; max-age=31536000; samesite=lax${location.protocol === "https:" ? "; secure" : ""}`;
    }
  }, [lng]);

  return (
    <html lang={htmlLang(locale)} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <I18nextProvider i18n={i18n}>
            {children}
            <Toaster />
          </I18nextProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
