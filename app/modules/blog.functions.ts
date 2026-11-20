import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPost, listPosts, localesOf } from "~/modules/blog.server";
import { SITE_URL } from "~/modules/site.server";

const locale = z.enum(["en", "ptBR"]);

export const getBlogIndex = createServerFn()
  .validator(locale)
  .handler(({ data }) => ({ posts: listPosts(data), origin: SITE_URL }));

export const getBlogPost = createServerFn()
  .validator(z.object({ slug: z.string(), locale }))
  .handler(({ data }) => {
    const post = getPost(data.slug, data.locale);
    if (!post) return null;
    return { post, origin: SITE_URL, locales: localesOf(post.slug) };
  });
