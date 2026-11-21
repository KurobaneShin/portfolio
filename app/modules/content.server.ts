import { cachified } from "~/modules/cache.server";
import { supabase } from "~/modules/supabase.server";
import type { Locale } from "~/modules/i18n";

// Edits in Supabase show up within about a minute: 60 s fresh, then served stale while refetching.
export const cached = <Value>(key: string, getFreshValue: () => Promise<Value>) =>
  cachified({ key: `content-${key}`, ttl: 1000 * 60, staleWhileRevalidate: 1000 * 60, getFreshValue });

/** One row per slug: the asked locale, or the other one when it has no translation. */
export const pickLocale = <Row extends { slug: string; lang: string }>(rows: Row[], locale: Locale) => {
  const bySlug = new Map<string, Row>();
  for (const row of rows) {
    const best = bySlug.get(row.slug);
    if (!best || (row.lang === locale && best.lang !== locale)) bySlug.set(row.slug, row);
  }
  return [...bySlug.values()];
};

export const getCases = (locale: Locale) =>
  cached("cases", async () => {
    const res = await supabase.from("cases").select("*").eq("visible", true).order("position");
    if (res.error) throw new Error(res.error.message);
    return res.data;
  }).then((rows) => pickLocale(rows, locale).sort((a, b) => a.position - b.position));

export const getClients = (locale: Locale) =>
  cached("clients", async () => {
    const res = await supabase.from("clients").select("*").eq("visible", true).order("position");
    if (res.error) throw new Error(res.error.message);
    return res.data;
  }).then((rows) => pickLocale(rows, locale).sort((a, b) => a.position - b.position));

/** Long-form page copy as { key: value }, falling back to the other locale per key. */
export const getCopy = (locale: Locale) =>
  cached("copy", async () => {
    const res = await supabase.from("site_copy").select("*");
    if (res.error) throw new Error(res.error.message);
    return res.data;
  }).then((rows) => {
    const copy: Record<string, string> = {};
    for (const row of rows) if (row.lang !== locale) copy[row.key] ??= row.value;
    for (const row of rows) if (row.lang === locale) copy[row.key] = row.value;
    return copy;
  });
