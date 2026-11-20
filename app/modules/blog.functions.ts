import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { getPost, listPosts, localesOf } from "~/modules/blog.server";
import { originOf } from "~/modules/origin.server";

const locale = z.enum(["en", "ptBR"]);

export const getBlogIndex = createServerFn()
  .validator(locale)
  .handler(({ data }) => ({ posts: listPosts(data), origin: originOf(getRequest()) }));

export const getBlogPost = createServerFn()
  .validator(z.object({ slug: z.string(), locale }))
  .handler(({ data }) => {
    const post = getPost(data.slug, data.locale);
    if (!post) return null;
    return { post, origin: originOf(getRequest()), locales: localesOf(post.slug) };
  });
