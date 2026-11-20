import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BlogShell } from "~/components/custom/BlogShell";
import { getBlogIndex } from "~/modules/blog.functions";
import { getT } from "~/modules/i18n";
import { getMeta } from "~/modules/seo";
import { AVATAR_URL, ogLocale } from "~/modules/person";

export const Route = createFileRoute("/blog/")({
  loaderDeps: ({ search }) => ({ lng: search.lng }),
  loader: async ({ context: { locale } }) => {
    const t = getT(locale);
    return {
      locale,
      ...(await getBlogIndex({ data: locale })),
      title: t("blog.title"),
      description: t("blog.description"),
    };
  },
  headers: () => ({
    "Cache-Control": "s-maxage=1, stale-while-revalidate=59, public",
    "CDN-Cache-Control": "public, s-maxage=60",
    Vary: "Cookie",
  }),
  head: ({ loaderData: data }) => {
    if (!data) return {};
    const url = `${data.origin}/blog`;
    const { meta, links } = getMeta({
      title: `${data.title} · Kurobane`,
      description: data.description,
      canonical: `${url}?lng=${data.locale}`,
      openGraph: { type: "website", locale: ogLocale(data.locale), siteName: "Kurobane (Icaro)", images: [{ url: AVATAR_URL }] },
    });
    return {
      meta,
      links: [
        ...links,
        { rel: "alternate", hrefLang: "pt-BR", href: `${url}?lng=ptBR` },
        { rel: "alternate", hrefLang: "en", href: `${url}?lng=en` },
        { rel: "alternate", hrefLang: "x-default", href: `${url}?lng=en` },
        { rel: "alternate", type: "application/rss+xml", title: "Kurobane · Blog", href: `${data.origin}/blog/rss.xml?lng=${data.locale}` },
      ],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { posts, title, description } = Route.useLoaderData();
  const { t } = useTranslation();
  return (
    <BlogShell>
      <section className="mx-auto max-w-[860px] px-5 py-16 md:px-10 md:py-24">
        <p className="eyebrow">{t("blog.eyebrow")}</p>
        <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-muted-foreground">{description}</p>
        <ol className="mt-14 divide-y border-y">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} search={{ lng: p.locale }} className="group block py-8">
                <p className="flex gap-3 font-mono text-xs tabular-nums text-muted-foreground">
                  <span>{p.date}</span>
                  <span className="uppercase tracking-[0.18em] group-hover:text-signal">{t(`blog.tags.${p.tag}`)}</span>
                </p>
                <h2 className="mt-3 font-display text-2xl tracking-tight transition-colors group-hover:text-signal md:text-3xl">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">{p.description}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </BlogShell>
  );
}
