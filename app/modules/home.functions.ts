import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { cachified } from "~/modules/cache.server";
import { getCases, getClients, getCopy } from "~/modules/content.server";
import { supabase } from "~/modules/supabase.server";

const locale = z.enum(["en", "ptBR"]);

export const getProjects = createServerFn()
  .validator(locale)
  .handler(({ data: locale }) =>
    cachified({
      key: `projects-${locale}`,
      ttl: 1000 * 60 * 60 * 24,
      async getFreshValue() {
        const res = await supabase.from("projects")
          .select("*").eq("lang", locale);

        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
      },
    })
  );

export const getCompanies = createServerFn()
  .validator(locale)
  .handler(({ data: locale }) =>
    cachified({
      key: `companies-${locale}`,
      ttl: 1000 * 60 * 60 * 24,
      async getFreshValue() {
        const res = await supabase.from("companies").select("*").eq(
          "lang",
          locale,
        ).order("end", {
          nullsFirst: true,
          ascending: false,
        });

        if (res.error) {
          throw new Error(res.error.message);
        }
        return res.data;
      },
    })
  );

export const getHomeContent = createServerFn()
  .validator(locale)
  .handler(async ({ data: locale }) => ({
    copy: await getCopy(locale),
    cases: await getCases(locale),
    clients: await getClients(locale),
  }));
