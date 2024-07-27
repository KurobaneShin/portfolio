import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

import { parseWithZod } from "@conform-to/zod";
import {
  Await,
  defer,
  Form,
  json,
  Link,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import {
  CodeIcon,
  CodepenIcon,
  Laptop2Icon,
  MenuIcon,
  MoveIcon,
  XIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LangChooser } from "~/components/custom/LangChooser";
import { ModeToggle } from "~/components/custom/ModeToggle";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import i18nServer from "~/modules/i18n.server";
import { resend } from "~/modules/resend.server";
import { z } from "zod";
import { useForm } from "@conform-to/react";
import { getMeta } from "~/modules/seo";
import { supabase } from "~/modules/supabase.server";
import { Suspense } from "react";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);
  const locale = await i18nServer.getLocale(request);
  const projectsQuery = supabase.from("projects")
    .select("*").eq("lang", locale).then((res) => res.error ? [] : res.data);

  const companiesQuery = supabase.from("companies").select("*").eq(
    "lang",
    locale,
  ).order("end", {
    nullsFirst: true,
    ascending: false,
  }).then((res) => res.error ? [] : res.data);

  return defer({
    description: t("description"),
    projectsQuery,
    companiesQuery,
  });
}

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
    console.log("error", error);
    return submission.reply({
      fieldErrors: {
        email: ["error"],
      },
    });
  }

  return {};
};

export default function Index() {
  const { t } = useTranslation();
  const { projectsQuery, companiesQuery } = useLoaderData<typeof loader>();

  const lastResult = useActionData<typeof action>();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: contactSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const langs = ["go", "js", "ts", "php"];
  const frontends = ["react", "rn", "vue"];
  const backends = ["express", "next", "remix", "gofiber"];
  const libraries = ["prisma", "typeorm", "trpc", "gorm"];
  const tools = ["tailwind", "node", "docker", "k8"];
  const databases = ["pg", "mongo", "redis", "mysql"];

  const navItens = [
    {
      link: "#hero",
      name: t("nav.about"),
    },
    {
      link: "#projects",
      name: t("nav.projects"),
    },
    {
      link: "#skills",
      name: t("nav.skills"),
    },
    {
      link: "#experience",
      name: t("nav.exp"),
    },
    {
      link: "#expertise",
      name: t("nav.expertise"),
    },
    {
      link: "#contact",
      name: t("nav.contact"),
    },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="border-b px-4 lg:px-6 h-14 flex items-center sticky top-0 bg-background">
        <Link to="#" className="flex items-center justify-center">
          <Laptop2Icon className="h-6 w-6" />
          <span className="sr-only">{t("title")}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ModeToggle />
          <LangChooser />
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MenuIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navItens.map((nv) => (
                  <DropdownMenuItem key={nv.link}>
                    <Link
                      key={nv.link}
                      prefetch="intent"
                      to={nv.link}
                    >
                      {nv.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden sm:flex sm:gap-6">
            {navItens.map((nv) => (
              <Link
                key={nv.link}
                to={nv.link}
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                {nv.name}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full pt-6 md:py-12 lg:py-16 border-b">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:items-center md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  {t("title")}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("description")}
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    to="#contact"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {t("hire")}
                  </Link>
                  <Link
                    to="#projects"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    {t("seeProjects")}
                  </Link>
                </div>
              </div>
              <div className="flex flex-col  items-start space-y-4">
                <img
                  src="https://github.com/kurobaneshin.png"
                  width={400}
                  height={400}
                  alt="Hero"
                  className="mx-auto aspect-square overflow-hidden rounded-xl obect-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("featured.title")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("featured.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-stretch gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={projectsQuery}>
                  {(projects) =>
                    projects.map((p) => (
                      <Link
                        to={p.link}
                        target="_blank"
                        rel="noreferrer"
                        key={p.id}
                        className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                      >
                        <img
                          src={p.picture}
                          width={300}
                          height={200}
                          alt={p.title}
                          className="rounded-lg object-cover"
                        />
                        <h3 className="text-lg font-bold">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {p.description}
                        </p>
                      </Link>
                    ))}
                </Await>
              </Suspense>
            </div>
          </div>
        </section>
        <section
          id="skills"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("skills.title")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("skills.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <CodepenIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">React</h3>
                <p className="text-sm text-muted-foreground">
                  {t("skills.react")}
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <CodepenIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  {t("skills.node")}
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <MoveIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Go</h3>
                <p className="text-sm text-muted-foreground">
                  {t("skills.go")}
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <MoveIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Blockchain</h3>
                <p className="text-sm text-muted-foreground">
                  {t("skills.blockchain")}
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <MoveIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Solidity</h3>
                <p className="text-sm text-muted-foreground">
                  {t("skills.solidity")}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="experience" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("exp.title")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("exp.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={companiesQuery} errorElement={<div>Error</div>}>
                  {(companies) =>
                    companies.map((c) => (
                      <div
                        key={c.id}
                        className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground"
                      >
                        <h3 className="text-lg font-bold">{c.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {c.client} | {c.start} - {c.end ?? "Present"}
                        </p>
                        <ul className="list-disc pl-4 text-sm text-muted-foreground">
                          {c.items.map((i, idx) => <li key={idx}>{i}</li>)}
                        </ul>
                      </div>
                    ))}
                </Await>
              </Suspense>
            </div>
          </div>
        </section>
        <section
          id="expertise"
          className="border-t bg-background py-12 md:py-16 lg:py-20"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("expertise.title")}
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("expertise.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("languages.title")}
                  </h3>
                </div>
                <div className="grid gap-2 mt-2">
                  {langs.map((l, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`languages.${l}.name`)} -{" "}
                        {t(`languages.${l}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("frontends.title")}
                  </h3>
                </div>
                <div className="grid gap-2 mt-2">
                  {frontends.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`frontends.${f}.name`)} -{" "}
                        {t(`frontends.${f}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("backends.title")}
                  </h3>
                </div>

                <div className="grid gap-2 mt-2">
                  {backends.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`backends.${b}.name`)} -{" "}
                        {t(`backends.${b}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("libraries.title")}
                  </h3>
                </div>
                <div className="grid gap-2 mt-2">
                  {libraries.map((l, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`libraries.${l}.name`)} -{" "}
                        {t(`libraries.${l}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Tools</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  {tools.map((tool, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`tools.${tool}.name`)} -{" "}
                        {t(`tools.${tool}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Databases</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  {databases.map((db, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                        <CodeIcon className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <p className="capitalize text-muted-foreground">
                        {t(`databases.${db}.name`)} -{" "}
                        {t(`databases.${db}.experience`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("touch.title")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("touch.description")}
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Form
                  method="post"
                  id={form.id}
                  onSubmit={form.onSubmit}
                  noValidate
                  className="flex flex-col gap-2"
                >
                  <Input
                    type="text"
                    placeholder={t("touch.inputs.name")}
                    autoComplete="name"
                    className="max-w-lg flex-1"
                    key={fields.name.key}
                    name={fields.name.name}
                    defaultValue={fields.name.initialValue}
                  />
                  {fields.name.errors?.map((e) => (
                    <div
                      className="self-start text-red-500 text-sm flex items-center"
                      key={e}
                    >
                      <XIcon />
                      <p>{t(`validations.${e}`)}</p>
                    </div>
                  ))}
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder={t("touch.inputs.email")}
                    className="max-w-lg flex-1"
                    key={fields.email.key}
                    name={fields.email.name}
                    defaultValue={fields.email.initialValue}
                  />
                  {fields.email.errors?.map((e) => (
                    <div
                      className="self-start text-red-500 text-sm flex items-center"
                      key={e}
                    >
                      <XIcon />
                      <p>{t(`validations.${e}`)}</p>
                    </div>
                  ))}
                  <Textarea
                    placeholder={t("touch.inputs.message")}
                    className="max-w-lg flex-1"
                    key={fields.message.key}
                    name={fields.message.name}
                    defaultValue={fields.message.initialValue}
                  />
                  {fields.message.errors?.map((e) => (
                    <div
                      className="self-start text-red-500 text-sm flex items-center"
                      key={e}
                    >
                      <XIcon />
                      <p>{t(`validations.${e}`)}</p>
                    </div>
                  ))}
                  <Button type="submit">{t("touch.inputs.submit")}</Button>
                </Form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Kurobane. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms
          </Link>
        </nav>
      </footer>
    </div>
  );
}
