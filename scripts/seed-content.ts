// One-shot, idempotent seed: copies the content that used to live in code (blog markdown,
// cases, clients, long-form copy, blog media) into Supabase. It reads the sources from git
// (REV) because they were removed from the tree once the app started reading the database.
//   bun --env-file=<env with SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY> scripts/seed-content.ts
import { createClient } from "@supabase/supabase-js";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const REV = "d8f5fa6";
const LANGS = { en: "en", ptBR: "pt-BR" } as const;
const CASES = ["media", "sharecare", "cloudkitchens", "minhasinscricoes", "jveiga", "confiou"];
const CLIENTS = ["sharecare", "cloudkitchens", "minhasinscricoes", "jveiga"];
const COPY = [
  "description",
  "hero.eyebrow", "hero.headline", "hero.available", "hero.location", "hero.clientsTitle",
  "cases.title", "cases.description",
  "featured.title", "featured.description",
  "exp.title", "exp.description",
  "skills.title", "skills.description",
  "expertise.title", "expertise.description",
  "touch.title", "touch.description",
  "blog.title", "blog.eyebrow", "blog.description", "blog.cta",
];

const url = process.env.SUPABASE_URL!;
const client = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const db = client.schema("portfolio");

const git = (...args: string[]) => {
  const r = Bun.spawnSync(["git", ...args]);
  if (r.exitCode !== 0) throw new Error(`git ${args.join(" ")}: ${r.stderr}`);
  return Buffer.from(r.stdout);
};
const show = (path: string) => git("show", `${REV}:${path}`);
const files = (dir: string) => git("ls-tree", "-r", "--name-only", REV, dir).toString().trim().split("\n");

async function upsert(table: string, rows: object[], onConflict: string) {
  const { error } = await db.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
  console.log(table, rows.length);
}

// Media: public bucket "blog", same path as before (public/blog/<slug>/<file>).
const created = await client.storage.createBucket("blog", { public: true });
if (created.error && !/already exists/i.test(created.error.message)) throw created.error;
const types: Record<string, string> = { jpg: "image/jpeg", mp4: "video/mp4" };
for (const path of files("public/blog")) {
  const key = path.replace(/^public\/blog\//, "");
  const { error } = await client.storage.from("blog").upload(key, show(path), {
    upsert: true,
    contentType: types[key.split(".").pop()!],
  });
  if (error) throw new Error(`upload ${key}: ${error.message}`);
}
const media = (p?: string) => (p ? `${url}/storage/v1/object/public/blog/${p.replace(/^\/blog\//, "")}` : null);

// Posts
const posts = files("app/content/blog").map((path) => {
  const [, slug, lang] = path.match(/blog\/([^/]+)\/([^/]+)\.md$/)!;
  const m = show(path).toString().match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)!;
  const f = Object.fromEntries(
    m[1].split("\n").map((line) => {
      const i = line.indexOf(":");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
  );
  return {
    slug, lang, title: f.title, description: f.description, published_at: f.date, tag: f.tag,
    image: media(f.image), cover: media(f.cover), video: media(f.video),
    linkedin: f.linkedin || null, body_md: m[2],
  };
});
await upsert("posts", posts, "slug,lang");

// Locales: the sources are plain TS objects, load them from git.
const dir = mkdtempSync(join(tmpdir(), "seed-"));
type Tree = { [key: string]: string | Tree };
const locales: Record<string, Tree> = {};
for (const [lang, file] of Object.entries(LANGS)) {
  const p = join(dir, `${file}.ts`);
  writeFileSync(p, show(`app/locales/${file}.ts`));
  locales[lang] = (await import(p)).default;
}
const at = (o: Tree, path: string) => path.split(".").reduce<string | Tree>((a, k) => (a as Tree)[k], o);

await upsert("cases", Object.entries(locales).flatMap(([lang, l]) =>
  CASES.map((slug, position) => ({ slug, lang, position, ...(at(l, `cases.${slug}`) as Tree) }))), "slug,lang");
await upsert("clients", Object.entries(locales).flatMap(([lang, l]) =>
  CLIENTS.map((slug, position) => ({ slug, lang, position, ...(at(l, `hero.clients.${slug}`) as Tree) }))), "slug,lang");
await upsert("site_copy", Object.entries(locales).flatMap(([lang, l]) =>
  COPY.map((key) => ({ key, lang, value: at(l, key) }))), "key,lang");
