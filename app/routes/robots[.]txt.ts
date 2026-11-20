import { createFileRoute } from "@tanstack/react-router";
import { originOf } from "~/modules/origin.server";

const robots = (request: Request) => {
  const origin = originOf(request);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
};

export const Route = createFileRoute("/robots.txt")({
  server: { handlers: { GET: ({ request }) => robots(request) } },
});
