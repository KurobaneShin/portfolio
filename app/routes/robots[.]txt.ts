import type { LoaderFunctionArgs } from "@vercel/remix";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const origin = new URL(request.url).origin;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
};
