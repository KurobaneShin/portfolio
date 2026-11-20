import { HeadersFunction, LoaderFunctionArgs, MetaFunction } from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { BlogShell } from "~/components/custom/BlogShell";
import { asLocale, getPost } from "~/modules/blog.server";
import i18nServer from "~/modules/i18n.server";
import { getMeta } from "~/modules/seo";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const locale = asLocale(await i18nServer.getLocale(request));
  const post = getPost(params.slug ?? "", locale);
  if (!post) throw new Response("Not found", { status: 404 });
  const origin = new URL(request.url).origin;
  return { post, origin };
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": "s-maxage=1, stale-while-revalidate=59, public",
  "CDN-Cache-Control": "public, s-maxage=60",
  "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
});

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Not found" }];
  const { post, origin } = data;
  const url = `${origin}/blog/${post.slug}`;
  return [
    ...getMeta({
      title: `${post.title} · Kurobane`,
      description: post.description,
      canonical: `${url}?lng=${post.locale}`,
      openGraph: {
        type: "article",
        siteName: "Kurobane (Icaro)",
        images: [{ url: post.cover ? origin + post.cover : "https://github.com/kurobaneshin.png" }],
      },
    }),
    { tagName: "link", rel: "alternate", hrefLang: "pt-BR", href: `${url}?lng=ptBR` },
    { tagName: "link", rel: "alternate", hrefLang: "en", href: `${url}?lng=en` },
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  return (
    <BlogShell>
      <article className="mx-auto max-w-[720px] px-5 py-16 md:px-10 md:py-24">
        <Link to="/blog" className="eyebrow transition-colors hover:text-signal">← {t("blog.back")}</Link>
        <p className="mt-10 flex gap-3 font-mono text-xs tabular-nums text-muted-foreground">
          <span>{post.date}</span>
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
        <div className="mt-16 border-t pt-8">
          <Link to="/#contact" className="eyebrow transition-colors hover:text-signal">{t("blog.cta")} ↗</Link>
        </div>
      </article>
    </BlogShell>
  );
}
