import type { LoaderFunctionArgs } from "@vercel/remix";
import { listSlugs } from "~/modules/blog.server";

export const loader = ({ request }: LoaderFunctionArgs) => {
  const origin = new URL(request.url).origin;
  const paths = [
    "/",
    "/blog",
    ...listSlugs().flatMap((slug) => [`/blog/${slug}?lng=ptBR`, `/blog/${slug}?lng=en`]),
  ];
  const urls = paths.map((path) => `  <url><loc>${origin}${path.replace(/&/g, "&amp;")}</loc></url>`).join("\n");
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
