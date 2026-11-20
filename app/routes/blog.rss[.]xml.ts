import { createFileRoute } from "@tanstack/react-router";
import { listPosts } from "~/modules/blog.server";
import { asLocale } from "~/modules/i18n";
import { SITE_URL as origin, xmlEscape as esc } from "~/modules/site.server";

const rss = (request: Request) => {
  const url = new URL(request.url);
  const locale = asLocale(url.searchParams.get("lng"));
  const items = listPosts(locale)
    .map((p) => {
      const link = `${origin}/blog/${p.slug}?lng=${p.locale}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="true">${esc(link)}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kurobane · Blog</title>
    <link>${origin}/blog?lng=${locale}</link>
    <atom:link href="${origin}/blog/rss.xml?lng=${locale}" rel="self" type="application/rss+xml"/>
    <description>Ícaro Diniz (Kurobane)</description>
    <language>${locale === "ptBR" ? "pt-BR" : "en"}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  });
};

export const Route = createFileRoute("/blog/rss.xml")({
  server: { handlers: { GET: ({ request }) => rss(request) } },
});
