import { marked } from "marked";
import { isLive } from "~/modules/blog.schedule";
import { cached, pickLocale } from "~/modules/content.server";
import { supabase } from "~/modules/supabase.server";

export type Locale = "en" | "ptBR";

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  tag: string;
  cover?: string;
  video?: string;
  image?: string;
  linkedin?: string;
};

type Post = PostMeta & { html: string };

// Published posts live in portfolio.posts; markdown is rendered once per cache refresh, not per request.
const loadPosts = () =>
  cached("posts", async () => {
    const res = await supabase.from("posts").select("*").eq("published", true);
    if (res.error) throw new Error(res.error.message);
    return res.data.map((p): Post & { lang: string } => ({
      slug: p.slug,
      lang: p.lang,
      locale: p.lang as Locale,
      title: p.title,
      description: p.description,
      date: p.published_at,
      tag: p.tag,
      cover: p.cover ?? undefined,
      video: p.video ?? undefined,
      image: p.image ?? undefined,
      linkedin: p.linkedin ?? undefined,
      html: marked.parse(p.body_md, { async: false }),
    }));
  });

const livePosts = async () => (await loadPosts()).filter((p) => isLive(p.date));

/** The post in the asked locale, or in the other one when it has no translation. */
export async function getPost(slug: string, locale: Locale): Promise<Post | undefined> {
  return pickLocale((await livePosts()).filter((p) => p.slug === slug), locale)[0];
}

export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  return pickLocale(await loadPosts(), locale)
    .map(({ html: _html, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function localesOf(slug: string): Promise<Locale[]> {
  return (await livePosts()).filter((p) => p.slug === slug).map((p) => p.locale);
}

export async function listSlugs(): Promise<string[]> {
  return [...new Set((await livePosts()).map((p) => p.slug))];
}

export const asLocale = (value: string | undefined): Locale => (value === "ptBR" ? "ptBR" : "en");
