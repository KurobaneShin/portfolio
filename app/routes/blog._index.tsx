import { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { BlogShell } from "~/components/custom/BlogShell";
import { asLocale, listPosts } from "~/modules/blog.server";
import i18nServer from "~/modules/i18n.server";
import { getMeta } from "~/modules/seo";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [locale, t] = await Promise.all([i18nServer.getLocale(request), i18nServer.getFixedT(request)]);
  return {
    posts: listPosts(asLocale(locale)),
    title: t("blog.title"),
    description: t("blog.description"),
    url: new URL(request.url).origin + "/blog",
  };
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "s-maxage=1, stale-while-revalidate=59, public",
  "CDN-Cache-Control": "public, s-maxage=60",
  "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
});

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  getMeta({
    title: `${data?.title} · Kurobane`,
    description: data?.description,
    canonical: data?.url,
    openGraph: { type: "website", siteName: "Kurobane (Icaro)", images: [{ url: "https://github.com/kurobaneshin.png" }] },
  });

export default function BlogIndex() {
  const { posts, title, description } = useLoaderData<typeof loader>();
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
              <Link to={`/blog/${p.slug}?lng=${p.locale}`} className="group block py-8">
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
