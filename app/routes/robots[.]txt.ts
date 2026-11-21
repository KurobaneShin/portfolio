import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "~/modules/site.server";

const robots = () => {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
};

export const Route = createFileRoute("/robots.txt")({
  server: { handlers: { GET: () => robots() } },
});
