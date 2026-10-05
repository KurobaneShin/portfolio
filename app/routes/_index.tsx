import {
  HeadersFunction,
  LinksFunction,
  MetaFunction,
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@vercel/remix";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { parseWithZod } from "@conform-to/zod";
import {
  Await,
  Form,
  json,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LangChooser } from "~/components/custom/LangChooser";
import { ModeToggle } from "~/components/custom/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import i18nServer from "~/modules/i18n.server";
import { resend } from "~/modules/resend.server";
import { z } from "zod";
import { useForm } from "@conform-to/react";
import { getMeta } from "~/modules/seo";
import { supabase } from "~/modules/supabase.server";
import { jsonWithError, jsonWithSuccess } from "remix-toast";
import { cachified } from "~/modules/cache.server";
import { ReactNode, Suspense } from "react";
import { FaDatabase, FaDocker, FaLaptopCode, FaNodeJs, FaReact, FaVuejs } from "react-icons/fa";
import { FaGolang, FaTv } from "react-icons/fa6";
import { SiExpress, SiGooglebigquery, SiKubernetes, SiMongodb, SiPrisma, SiRedis, SiTerraform, SiTrpc, SiTypeorm, SiTypescript } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io";
import { DiPhp } from "react-icons/di";
import { RiCodeSSlashLine, RiNextjsFill, RiRemixRunFill, RiSpeedUpFill, RiTailwindCssFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { GrMysql, GrTools } from "react-icons/gr";
import { IoLibrarySharp } from "react-icons/io5";
import { IconType } from "react-icons";

export const links: LinksFunction = () => [
  { rel: "preload", href: "https://github.com/kurobaneshin.png", as: "image" },
  {
    rel: "preload",
    href: "https://avatars.githubusercontent.com/u/47834261?v=4",
    as: "image",
  },
];

export const meta: MetaFunction<typeof loader> = ({ data }) =>
  getMeta({
    title: "Kurobane (Icaro)",
    description: data?.description,
    canonical: "https://portfolio-kurobanes-projects.vercel.app",
    openGraph: {
      type: "website",
      siteName: "Kurobane (Icaro)",
      images: [{
        url: "https://github.com/kurobaneshin.png",
      }],
    },
  });

const contactSchema = z.object({
  email: z.string({ message: "required" }).email({ message: "email" }),
  message: z.string({ message: "required" }),
  name: z.string({ message: "required" }),
});

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=1, stale-while-revalidate=59, public",
    "CDN-Cache-Control": "public, s-maxage=60",
    "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
  };
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const [t, locale] = await Promise.all([
    i18nServer.getFixedT(request),
    i18nServer.getLocale(request),
  ]);

  const projectsQuery = async () => {
    const data = await cachified({
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
    });
    return data;
  };

  const companiesQuery = async () => {
    const data = await cachified({
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
    });
    return data;
  };

  return {
    description: t("description"),
    projectsQuery: projectsQuery(),
    companiesQuery: companiesQuery(),
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: contactSchema });

  if (submission.status !== "success") {
    return json(submission.reply());
  }

  const { name, email, message } = submission.value;

  const from = "kurobane@peropero.site";
  const to = process.env.NODE_ENV !== "production"
    ? "delivered@resend.dev"
    : "icarofdiniz@gmail.com";

  const { error } = await resend.emails.send({
    from,
    to: [
      to,
    ],
    subject: "hire",
    html: `
    <div>
      <h1>Hi, my name is ${name}</h1>
      <p>Email: ${email}</p>
      <p>${message}</p>
    </div>
    `,
  });

  if (error) {
    console.error("resend", error);
    return jsonWithError(
      {},
      { message: "Email not sent", description: "try again later" },
    );
  }

  return jsonWithSuccess(
    {},
    { message: "Email sent", description: "tank you for contacting me" },
  );
};

const CASES = [
  "globo",
  "sharecare",
  "cloudkitchens",
  "minhasinscricoes",
  "jveiga",
  "confiou",
] as const;

const CLIENTS = [
  "globo",
  "sharecare",
  "cloudkitchens",
  "casacor",
  "minhasinscricoes",
  "jveiga",
] as const;

const CAPABILITIES: { key: string; name: string; icon: IconType }[] = [
  { key: "go", name: "Go", icon: FaGolang },
  { key: "node", name: "Node.js", icon: FaNodeJs },
  { key: "react", name: "React", icon: FaReact },
  { key: "cloud", name: "Cloud & IaC", icon: SiTerraform },
  { key: "data", name: "Data", icon: SiGooglebigquery },
  { key: "performance", name: "Performance", icon: RiSpeedUpFill },
];

const STACK: { group: string; icon: IconType; items: { name: string; icon: IconType }[] }[] = [
  {
    group: "languages",
    icon: FaLaptopCode,
    items: [
      { name: "go", icon: FaGolang },
      { name: "ts", icon: SiTypescript },
      { name: "js", icon: IoLogoJavascript },
      { name: "php", icon: DiPhp },
    ],
  },
  {
    group: "frontends",
    icon: FaTv,
    items: [
      { name: "react", icon: FaReact },
      { name: "rn", icon: FaReact },
      { name: "vue", icon: FaVuejs },
    ],
  },
  {
    group: "backends",
    icon: RiCodeSSlashLine,
    items: [
      { name: "express", icon: SiExpress },
      { name: "next", icon: RiNextjsFill },
      { name: "remix", icon: RiRemixRunFill },
      { name: "gofiber", icon: FaGolang },
    ],
  },
  {
    group: "libraries",
    icon: IoLibrarySharp,
    items: [
      { name: "prisma", icon: SiPrisma },
      { name: "typeorm", icon: SiTypeorm },
      { name: "trpc", icon: SiTrpc },
      { name: "gorm", icon: SiTypeorm },
    ],
  },
  {
    group: "tools",
    icon: GrTools,
    items: [
      { name: "tailwind", icon: RiTailwindCssFill },
      { name: "node", icon: FaNodeJs },
      { name: "docker", icon: FaDocker },
      { name: "k8", icon: SiKubernetes },
    ],
  },
  {
    group: "databases",
    icon: FaDatabase,
    items: [
      { name: "pg", icon: BiLogoPostgresql },
      { name: "mongo", icon: SiMongodb },
      { name: "redis", icon: SiRedis },
      { name: "mysql", icon: GrMysql },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

// "2026-08-19" → "2026.08"
const yearMonth = (date: string | null) => date?.slice(0, 7).replace("-", ".");

const hostOf = (link: string) => {
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="grid gap-6 border-t pt-6 md:grid-cols-12 md:gap-8">
      <p className="eyebrow md:col-span-3">
        <span className="text-signal">§ {pad(index)}</span>
      </p>
      <div className="md:col-span-9">
        <h2 className="text-4xl font-light leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}

export default function Index() {
  const { t } = useTranslation();
  const { projectsQuery, companiesQuery } = useLoaderData<typeof loader>();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const navItens = [
    { link: "#cases", name: t("nav.cases") },
    { link: "#projects", name: t("nav.projects") },
    { link: "#skills", name: t("nav.skills") },
    { link: "#experience", name: t("nav.exp") },
    { link: "#expertise", name: t("nav.expertise") },
    { link: "#contact", name: t("nav.contact") },
  ];

  const fieldClass =
    "w-full border-0 border-b border-input bg-transparent px-0 py-3 text-base placeholder:text-muted-foreground/70 focus:border-signal focus:outline-none focus:ring-0 transition-colors";

  const errorsOf = (errors?: string[]) =>
    errors?.map((e) => (
      <p key={e} className="mt-2 flex items-center gap-1 font-mono text-xs text-destructive">
        <XIcon className="h-3 w-3" />
        {t(`validations.${e}`)}
      </p>
    ));

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center px-5 md:px-10">
          <a href="#hero" className="flex items-baseline gap-2">
            <span className="font-display text-xl tracking-tight">{t("title")}</span>
            <span className="eyebrow hidden sm:inline">Ícaro</span>
          </a>
          <nav className="ml-auto flex items-center gap-1">
            <div className="hidden items-center gap-6 pr-4 lg:flex">
              {navItens.map((nv) => (
                <a
                  key={nv.link}
                  href={nv.link}
                  className="eyebrow transition-colors hover:text-foreground"
                >
                  {nv.name}
                </a>
              ))}
            </div>
            <ModeToggle />
            <LangChooser />
            <div className="lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="Menu" className="p-2">
                  <MenuIcon className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navItens.map((nv) => (
                    <DropdownMenuItem key={nv.link} asChild>
                      <a href={nv.link}>{nv.name}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section id="hero" className="relative overflow-hidden">
          <div
            aria-hidden
            className="rule-x pointer-events-none absolute inset-0 opacity-50 [background-size:calc(100%/12)_100%] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          />
          <div className="relative mx-auto grid max-w-[1280px] gap-12 px-5 pb-20 pt-16 md:grid-cols-12 md:px-10 md:pb-28 md:pt-24">
            <div className="md:col-span-8">
              <p className="eyebrow animate-rise">{t("hero.eyebrow")}</p>
              <h1
                className="mt-8 animate-rise text-[2.6rem] font-light leading-[1.02] tracking-[-0.025em] sm:text-6xl lg:text-[5.25rem]"
                style={{ animationDelay: "80ms" }}
              >
                {t("hero.headline")}
              </h1>
              <p
                className="mt-8 max-w-[58ch] animate-rise text-lg leading-relaxed text-muted-foreground"
                style={{ animationDelay: "180ms" }}
              >
                {t("description")}
              </p>
              <div
                className="mt-10 flex animate-rise flex-wrap items-center gap-3"
                style={{ animationDelay: "280ms" }}
              >
                <a
                  href="#contact"
                  className="group inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-signal"
                >
                  {t("hire")}
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#cases"
                  className="inline-flex h-11 items-center border border-foreground/80 px-6 text-sm font-medium transition-colors hover:border-signal hover:text-signal"
                >
                  {t("nav.cases")}
                </a>
              </div>
            </div>

            <aside
              className="animate-rise md:col-span-4 md:pt-2"
              style={{ animationDelay: "360ms" }}
            >
              <div className="flex items-center gap-4 border-y py-4">
                <img
                  src="https://github.com/kurobaneshin.png"
                  width={64}
                  height={64}
                  alt="Kurobane"
                  className="h-16 w-16 object-cover grayscale"
                />
                <div className="space-y-1">
                  <p className="font-display text-lg leading-none">Ícaro Diniz</p>
                  <p className="eyebrow">{t("hero.location")}</p>
                  <p className="flex items-center gap-2 font-mono text-xs text-foreground">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
                    </span>
                    {t("hero.available")}
                  </p>
                </div>
              </div>
              <p className="eyebrow mt-8">{t("hero.clientsTitle")}</p>
              <ul className="mt-4 border-t">
                {CLIENTS.map((k) => (
                  <li key={k}>
                    <a
                      href="#cases"
                      className="group flex items-baseline gap-3 border-b py-3.5 transition-colors"
                    >
                      <span className="font-display text-[1.6rem] font-light leading-none tracking-[-0.01em] transition-colors group-hover:text-signal">
                        {t(`hero.clients.${k}.name`)}
                      </span>
                      <span
                        aria-hidden
                        className="mb-1 flex-1 border-b border-dotted border-muted-foreground/40"
                      />
                      <span className="eyebrow">{t(`hero.clients.${k}.sector`)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Cases: the ledger */}
        <section id="cases" className="mx-auto max-w-[1280px] scroll-mt-14 px-5 py-20 md:px-10 md:py-28">
          <SectionHead index={1} title={t("cases.title")} description={t("cases.description")} />
          <ol className="mt-14 border-b">
            {CASES.map((c, i) => (
              <li key={c}>
                <Reveal delay={i * 0.04}>
                  <article className="group grid gap-4 border-t py-8 transition-colors hover:bg-card md:grid-cols-12 md:gap-8 md:py-10">
                    <p className="font-mono text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-signal md:col-span-1">
                      № {pad(i + 1)}
                    </p>
                    <div className="md:col-span-3">
                      <p className="eyebrow">{t(`cases.${c}.client`)}</p>
                      <h3 className="mt-2 font-sans text-lg font-medium leading-snug">
                        {t(`cases.${c}.title`)}
                      </h3>
                    </div>
                    <div className="md:col-span-8">
                      <p className="font-display text-2xl font-light leading-tight tracking-[-0.01em] sm:text-3xl">
                        {t(`cases.${c}.metric`)}
                      </p>
                      <p className="mt-3 max-w-[64ch] leading-relaxed text-muted-foreground">
                        {t(`cases.${c}.detail`)}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>

        {/* Projects */}
        <section id="projects" className="scroll-mt-14 border-y bg-card">
          <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
            <SectionHead index={2} title={t("featured.title")} description={t("featured.description")} />
            <div className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
              <Suspense fallback={<p className="eyebrow p-6">…</p>}>
                <Await resolve={projectsQuery}>
                  {(projects) =>
                    [...projects].reverse().map((p, i) => (
                      <a
                        key={p.id}
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-[13rem] flex-col border-b border-r p-6 transition-colors hover:bg-background"
                      >
                        <div className="flex items-start justify-between">
                          <span className="font-mono text-xs tabular-nums text-muted-foreground">
                            {pad(i + 1)}
                          </span>
                          <ArrowUpRightIcon className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal" />
                        </div>
                        <h3 className="mt-8 text-2xl font-light tracking-tight">{p.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                        <p className="eyebrow mt-auto pt-6 transition-colors group-hover:text-signal">
                          {hostOf(p.link)}
                        </p>
                      </a>
                    ))}
                </Await>
              </Suspense>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="skills" className="mx-auto max-w-[1280px] scroll-mt-14 px-5 py-20 md:px-10 md:py-28">
          <SectionHead index={3} title={t("skills.title")} description={t("skills.description")} />
          <div className="mt-14 grid gap-px overflow-hidden border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.05} className="bg-background">
                <div className="group h-full p-7">
                  <div className="flex items-center justify-between">
                    <c.icon className="h-6 w-6 text-foreground transition-colors group-hover:text-signal" />
                    <span className="font-mono text-xs tabular-nums text-muted-foreground">{pad(i + 1)}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-light tracking-tight">{c.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(`skills.${c.key}`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="scroll-mt-14 border-t bg-card">
          <div className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
            <SectionHead index={4} title={t("exp.title")} description={t("exp.description")} />
            <ol className="mt-14 border-b">
              <Suspense fallback={<li className="eyebrow py-6">…</li>}>
                <Await resolve={companiesQuery} errorElement={<li className="eyebrow py-6">—</li>}>
                  {(companies) =>
                    [...companies]
                      .sort(
                        (a, b) =>
                          Number(b.end === null) - Number(a.end === null) ||
                          (b.end ?? "").localeCompare(a.end ?? "") ||
                          b.start.localeCompare(a.start),
                      )
                      .map((c) => (
                      <li key={c.id} className="grid gap-4 border-t py-8 md:grid-cols-12 md:gap-8">
                        <p className="font-mono text-xs tabular-nums text-muted-foreground md:col-span-3">
                          {yearMonth(c.start)} — {c.end ? yearMonth(c.end) : (
                            <span className="text-signal">{t("present")}</span>
                          )}
                        </p>
                        <div className="md:col-span-9">
                          <h3 className="text-2xl font-light leading-tight tracking-tight">{c.client}</h3>
                          <p className="eyebrow mt-2">{c.title}</p>
                          {c.items.length > 0 && (
                            <ul className="mt-5 grid gap-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
                              {c.items.map((item, idx) => (
                                <li key={idx} className="grid grid-cols-[1rem_1fr]">
                                  <span aria-hidden className="text-signal">–</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </li>
                    ))}
                </Await>
              </Suspense>
            </ol>
          </div>
        </section>

        {/* Stack */}
        <section id="expertise" className="mx-auto max-w-[1280px] scroll-mt-14 px-5 py-20 md:px-10 md:py-28">
          <SectionHead index={5} title={t("expertise.title")} description={t("expertise.description")} />
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((g) => (
              <Reveal key={g.group}>
                <div className="flex items-center gap-3 border-b pb-3">
                  <g.icon className="h-4 w-4 text-signal" />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.18em]">
                    {t(`${g.group}.title`)}
                  </h3>
                </div>
                <ul className="divide-y">
                  {g.items.map((it) => (
                    <li key={it.name} className="flex items-center gap-3 py-3 text-sm">
                      <it.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{t(`${g.group}.${it.name}.name`)}</span>
                      <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
                        {t(`${g.group}.${it.name}.experience`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-14 border-t bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
            <div className="md:col-span-6">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-primary-foreground/60">
                <span className="text-signal">§ 06</span>
              </p>
              <h2 className="mt-6 text-5xl font-light leading-[1.02] tracking-[-0.025em] lg:text-7xl">
                {t("touch.title")}
              </h2>
              <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-primary-foreground/70">
                {t("touch.description")}
              </p>
            </div>
            <Form
              method="post"
              id={form.id}
              onSubmit={form.onSubmit}
              noValidate
              className="flex flex-col gap-6 md:col-span-5 md:col-start-8 [&_input]:text-primary-foreground [&_textarea]:text-primary-foreground"
            >
              <div>
                <input
                  type="text"
                  placeholder={t("touch.inputs.name")}
                  autoComplete="name"
                  className={`${fieldClass} border-primary-foreground/25 placeholder:text-primary-foreground/45`}
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue}
                />
                {errorsOf(fields.name.errors)}
              </div>
              <div>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder={t("touch.inputs.email")}
                  className={`${fieldClass} border-primary-foreground/25 placeholder:text-primary-foreground/45`}
                  key={fields.email.key}
                  name={fields.email.name}
                  defaultValue={fields.email.initialValue}
                />
                {errorsOf(fields.email.errors)}
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder={t("touch.inputs.message")}
                  className={`${fieldClass} resize-none border-primary-foreground/25 placeholder:text-primary-foreground/45`}
                  key={fields.message.key}
                  name={fields.message.name}
                  defaultValue={fields.message.initialValue}
                />
                {errorsOf(fields.message.errors)}
              </div>
              <button
                type="submit"
                className="group mt-2 inline-flex h-12 items-center justify-between bg-primary-foreground px-6 text-sm font-medium text-primary transition-colors hover:bg-signal hover:text-primary-foreground"
              >
                {t("touch.inputs.submit")}
                <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </Form>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-5 py-6 sm:flex-row sm:items-center md:px-10">
          <p className="eyebrow">
            © {new Date().getFullYear()} Kurobane
          </p>
          <a
            href="https://github.com/KurobaneShin"
            target="_blank"
            rel="noreferrer"
            className="eyebrow transition-colors hover:text-signal sm:ml-auto"
          >
            github.com/KurobaneShin ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
