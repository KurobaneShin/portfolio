import { marked } from "marked";

// Posts live in app/content/blog/<slug>/<locale>.md and are bundled at build
// time, so there is no filesystem read per request.
const files = import.meta.glob("../content/blog/*/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

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
};

type Post = PostMeta & { html: string };

function parse(path: string, raw: string): Post {
  const [, slug, locale] = path.match(/blog\/([^/]+)\/([^/]+)\.md$/) ?? [];
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!slug || !match) throw new Error(`Bad blog post: ${path}`);
  const fields = Object.fromEntries(
    match[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  return {
    slug,
    locale: locale as Locale,
    title: fields.title,
    description: fields.description,
    date: fields.date,
    tag: fields.tag,
    cover: fields.cover || undefined,
    video: fields.video || undefined,
    html: marked.parse(match[2], { async: false }),
  };
}

const posts = Object.entries(files).map(([path, raw]) => parse(path, raw));

/** The post in the asked locale, or in the other one when it has no translation. */
export function getPost(slug: string, locale: Locale): Post | undefined {
  const same = posts.filter((p) => p.slug === slug);
  return same.find((p) => p.locale === locale) ?? same[0];
}

export function listPosts(locale: Locale): PostMeta[] {
  const slugs = [...new Set(posts.map((p) => p.slug))];
  return slugs
    .map((slug) => getPost(slug, locale)!)
    .map(({ html: _html, ...meta }) => meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function listSlugs(): string[] {
  return [...new Set(posts.map((p) => p.slug))];
}

export const asLocale = (value: string | undefined): Locale => (value === "ptBR" ? "ptBR" : "en");
