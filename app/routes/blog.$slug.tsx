import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { BlogShell } from "~/components/custom/BlogShell";
import { getBlogPost } from "~/modules/blog.functions";
import { AVATAR_URL, htmlLang, ogLocale, person } from "~/modules/person";
import { getMeta, ldJson } from "~/modules/seo";

export const Route = createFileRoute("/blog/$slug")({
  loaderDeps: ({ search }) => ({ lng: search.lng }),
  loader: async ({ params, context: { locale } }) => {
    const data = await getBlogPost({ data: { slug: params.slug, locale } });
    if (!data) throw notFound();
    return data;
  },
  headers: () => ({
    "Cache-Control": "s-maxage=1, stale-while-revalidate=59, public",
    "CDN-Cache-Control": "public, s-maxage=60",
    Vary: "Cookie",
  }),
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }] };
    const { post, origin, locales } = loaderData;
    const url = `${origin}/blog/${post.slug}`;
    const canonical = `${url}?lng=${post.locale}`;
    const image = post.image ?? post.cover;
    const imageUrl = image ? origin + image : AVATAR_URL;
    const { meta, links } = getMeta({
      title: `${post.title} · Kurobane`,
      description: post.description,
      canonical,
      openGraph: {
        type: "article",
        locale: ogLocale(post.locale),
        siteName: "Kurobane (Icaro)",
        images: [post.image ? { url: imageUrl, width: 1200, height: 630, alt: post.title } : { url: imageUrl }],
      },
    });
    return {
      meta: [
        ...meta,
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: post.image ? "summary_large_image" : "summary" },
      ],
      links: [
        ...links,
        ...locales.map((l) => ({ rel: "alternate", hrefLang: htmlLang(l), href: `${url}?lng=${l}` })),
        { rel: "alternate", hrefLang: "x-default", href: `${url}?lng=${locales.includes("en") ? "en" : locales[0]}` },
        { rel: "alternate", type: "application/rss+xml", title: "Kurobane · Blog", href: `${origin}/blog/rss.xml?lng=${post.locale}` },
      ],
      scripts: [
        ldJson({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: htmlLang(post.locale),
          url: canonical,
          mainEntityOfPage: canonical,
          image: imageUrl,
          author: person(origin),
          publisher: person(origin),
          ...(post.video && { video: { "@type": "VideoObject", name: post.title, description: post.description, contentUrl: origin + post.video, thumbnailUrl: imageUrl, uploadDate: post.date } }),
        }),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const { t } = useTranslation();
  return (
    <BlogShell>
      <article className="mx-auto max-w-[720px] px-5 py-16 md:px-10 md:py-24">
        <Link to="/blog" className="eyebrow transition-colors hover:text-signal">← {t("blog.back")}</Link>
        <p className="mt-10 flex gap-3 font-mono text-xs tabular-nums text-muted-foreground">
          <time dateTime={post.date}>{post.date}</time>
          <span className="uppercase tracking-[0.18em]">{t(`blog.tags.${post.tag}`)}</span>
        </p>
        <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight md:text-5xl">{post.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
        {post.video && (
          <video
            className="mx-auto mt-10 w-full max-w-[360px] border"
            src={post.video}
            poster={post.cover}
            controls
            playsInline
            preload="metadata"
          />
        )}
        <div className="blog-prose mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
        <div className="mt-16 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-between">
          {post.linkedin && (
            <a href={post.linkedin} target="_blank" rel="noreferrer" className="eyebrow transition-colors hover:text-signal">
              {t("blog.discuss")} ↗
            </a>
          )}
          <Link to="/" hash="contact" className="eyebrow transition-colors hover:text-signal">{t("blog.cta")} ↗</Link>
        </div>
      </article>
    </BlogShell>
  );
}
