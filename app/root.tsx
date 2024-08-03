import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunctionArgs } from "@vercel/remix";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import clsx from "clsx";
import { themeSessionResolver } from "./sessions";

import "./tailwind.css";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";
import { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { getToast } from "remix-toast";
import { getEnv } from "./env.server";

export const links: LinksFunction = () => [
  {
    rel: "icon",
    href: "/favicon.jpeg",
    type: "image/png",
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com" },
  {
    href:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap",
    rel: "stylesheet",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
    crossOrigin: "use-credentials",
  },
];

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const locale = await i18nServer.getLocale(request);
  const { toast, headers } = await getToast(request);

  headers.append("Set-Cookie", await localeCookie.serialize(locale));
  headers.append("Cache-Control", "public, s-maxage=1");
  headers.append("CDN-Cache-Control", "public, s-maxage=60");
  headers.append("Vercel-CDN-Cache-Control", "public, s-maxage=3600");

  return json(
    {
      theme: getTheme() ?? "light",
      locale,
      toast,
      ENV: getEnv(),
    },
    {
      headers,
    },
  );
}
// All routes will inherit this configuration,
// unless a route overrides the config option
export const config = {
  memory: 1024,
};

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  useEffect(() => {
    if (data.toast) {
      toast(data.toast.message, {
        description: data.toast.description,
      });
    }
  }, [data.toast]);

  return (
    <html lang={data.locale ?? "en"} className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <Toaster />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  useChangeLanguage(data.locale);
  return (
    <>
      <ThemeProvider
        // @ts-expect-error start with light theme
        specifiedTheme={data.theme}
        themeAction="/action/set-theme"
      >
        <App />
      </ThemeProvider>
    </>
  );
}
