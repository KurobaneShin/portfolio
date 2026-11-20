import { createFileRoute } from "@tanstack/react-router";
import { listSlugs } from "~/modules/blog.server";
import { SITE_URL as origin, xmlEscape } from "~/modules/site.server";

const sitemap = () => {
  const paths = [
    "/",
    "/blog",
    ...listSlugs().flatMap((slug) => [`/blog/${slug}?lng=ptBR`, `/blog/${slug}?lng=en`]),
  ];
  const urls = paths.map((path) => `  <url><loc>${xmlEscape(origin)}${xmlEscape(path)}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600",
    },
  });
};

export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: () => sitemap() } },
});
