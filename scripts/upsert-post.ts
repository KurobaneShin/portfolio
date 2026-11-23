import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2]?.replace(/\/$/, "");
if (!dir) throw new Error("usage: bun --env-file=<env> scripts/upsert-post.ts content/blog/<slug>");
const slug = dir.split("/").pop()!;
const url = process.env.SUPABASE_URL!;
const client = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const types: Record<string, string> = { jpg: "image/jpeg", mp4: "video/mp4" };
const media = (p?: string) => (p ? `${url}/storage/v1/object/public/blog/${p.replace(/^\/blog\//, "")}` : null);
const names = readdirSync(dir);

for (const name of names.filter((n) => !n.endsWith(".md"))) {
  const { error } = await client.storage.from("blog").upload(`${slug}/${name}`, readFileSync(join(dir, name)), {
    upsert: true,
    contentType: types[name.split(".").pop()!],
  });
  if (error) throw new Error(`upload ${name}: ${error.message}`);
}

const rows = names
  .filter((n) => n.endsWith(".md"))
  .map((name) => {
    const m = readFileSync(join(dir, name), "utf8").match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) throw new Error(`bad frontmatter: ${name}`);
    const f = Object.fromEntries(
      m[1].split("\n").map((line) => {
        const i = line.indexOf(":");
        return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
      }),
    );
    return {
      slug, lang: name.replace(/\.md$/, ""), title: f.title, description: f.description, published_at: f.date, tag: f.tag,
      image: media(f.image), cover: media(f.cover), video: media(f.video), linkedin: f.linkedin || null, body_md: m[2],
    };
  });
const { error } = await client.schema("portfolio").from("posts").upsert(rows, { onConflict: "slug,lang" });
if (error) throw new Error(error.message);
console.log(slug, rows.map((r) => `${r.lang} ${r.published_at}`).join(", "));
