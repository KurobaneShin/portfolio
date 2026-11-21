import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPost, listPosts, localesOf } from "~/modules/blog.server";
import { getCopy } from "~/modules/content.server";
import { SITE_URL } from "~/modules/site.server";

const locale = z.enum(["en", "ptBR"]);

export const getBlogIndex = createServerFn()
  .validator(locale)
  .handler(async ({ data }) => ({
    posts: await listPosts(data),
    copy: await getCopy(data),
    origin: SITE_URL,
  }));

export const getBlogPost = createServerFn()
  .validator(z.object({ slug: z.string(), locale }))
  .handler(async ({ data }) => {
    const post = await getPost(data.slug, data.locale);
    if (!post) return null;
    return { post, copy: await getCopy(data.locale), origin: SITE_URL, locales: await localesOf(post.slug) };
  });
