import type { LoaderFunctionArgs } from "@vercel/remix";
import { asLocale, listPosts } from "~/modules/blog.server";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const locale = asLocale(url.searchParams.get("lng") ?? undefined);
  const items = listPosts(locale)
    .map((p) => {
      const link = `${url.origin}/blog/${p.slug}?lng=${p.locale}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.description)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kurobane · Blog</title>
    <link>${url.origin}/blog?lng=${locale}</link>
    <atom:link href="${url.origin}/blog/rss.xml?lng=${locale}" rel="self" type="application/rss+xml"/>
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
