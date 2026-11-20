import { z } from "zod";

const schema = z.object({
  RESEND_API_KEY: z.string(),
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_URL: z.string(),
  UMAMI_SCRIPT_URL: z.string().url().optional(),
  UMAMI_WEBSITE_ID: z.string().optional(),
  GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

type ValidatedEnvs = z.infer<typeof schema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ValidatedEnvs {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env);

  if (parsed.success === false) {
    const keys = [...new Set(parsed.error.issues.map((i) => i.path.join(".")))];
    throw new Error(`Invalid environment variables: ${keys.join(", ")}`);
  }
}

export function getEnv() {
  return {
    MODE: process.env.NODE_ENV,
    // Public values: they end up in the page anyway.
    UMAMI_SCRIPT_URL: process.env.UMAMI_SCRIPT_URL,
    UMAMI_WEBSITE_ID: process.env.UMAMI_WEBSITE_ID,
    GOOGLE_SITE_VERIFICATION: process.env.GOOGLE_SITE_VERIFICATION,
  };
}

type Env = ReturnType<typeof getEnv>;

declare global {
  var ENV: Env;
  interface Window {
    ENV: Env;
  }
}
