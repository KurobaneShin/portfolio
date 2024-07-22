import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: "Kurobane" },
    { name: "description", content: data?.description },
  ];
};

import { json, Link } from "@remix-run/react";
import { CodeIcon, CodepenIcon, Laptop2Icon, MoveIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LangChooser } from "~/components/custom/LangChooser";
import { ModeToggle } from "~/components/custom/ModeToggle";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import i18nServer from "~/modules/i18n.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const t = await i18nServer.getFixedT(request);

  return json({ description: t("description") });
}

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to="#" className="flex items-center justify-center">
          <Laptop2Icon className="h-6 w-6" />
          <span className="sr-only">{t("title")}</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ModeToggle />
          <LangChooser />

          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Projects
          </Link>
          <Link
            to="#"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Skills
          </Link>
          <Link
            to="#experience"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Experience
          </Link>
          <Link
            to="#expertise"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Expertise
          </Link>
          <Link
            to="#contact"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section id="hero" className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Kurobane
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("description")}
                </p>
                <div className="space-x-4 mt-6">
                  <Link
                    to="#"
                    className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Hire Me
                  </Link>
                  <Link
                    to="#"
                    className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
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
                  Featured Projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of my latest projects showcasing my skills in
                  React, Node.js, and Go.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <img
                  src="https://github.com/kurobaneshin.png"
                  width={300}
                  height={200}
                  alt="Project 1"
                  className="rounded-lg object-cover"
                />
                <h3 className="text-lg font-bold">Project 1</h3>
                <p className="text-sm text-muted-foreground">
                  A React-based web application with Node.js backend.
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <img
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="Project 2"
                  className="rounded-lg object-cover"
                />
                <h3 className="text-lg font-bold">Project 2</h3>
                <p className="text-sm text-muted-foreground">
                  A Go-based microservice with a React frontend.
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <img
                  src="/placeholder.svg"
                  width={300}
                  height={200}
                  alt="Project 3"
                  className="rounded-lg object-cover"
                />
                <h3 className="text-lg font-bold">Project 3</h3>
                <p className="text-sm text-muted-foreground">
                  A Node.js-based API with a React-powered admin dashboard.
                </p>
              </div>
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
                  My Skills
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have expertise in a variety of technologies, including
                  React, Node.js, and Go.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <CodepenIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">React</h3>
                <p className="text-sm text-muted-foreground">
                  Proficient in building modern, responsive web applications
                  using React.
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <CodepenIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Node.js</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced in developing scalable and efficient server-side
                  applications with Node.js.
                </p>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <MoveIcon className="h-12 w-12" />
                <h3 className="text-lg font-bold">Go</h3>
                <p className="text-sm text-muted-foreground">
                  Skilled in building high-performance, concurrent applications
                  using the Go programming language.
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
                  Work Experience
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I have worked with a variety of companies and clients,
                  delivering high-quality software solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <h3 className="text-lg font-bold">Full-stack Developer</h3>
                <p className="text-sm text-muted-foreground">
                  Acme Inc. | 2020 - Present
                </p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>
                    Developed and maintained a React-based web application with
                    a Node.js backend.
                  </li>
                  <li>
                    Implemented a microservice architecture using Go and Docker.
                  </li>
                  <li>
                    Collaborated with cross-functional teams to deliver
                    high-quality software solutions.
                  </li>
                </ul>
              </div>
              <div className="group grid gap-1 rounded-lg bg-background p-4 shadow-sm transition-all hover:bg-accent hover:text-accent-foreground">
                <h3 className="text-lg font-bold">Software Engineer</h3>
                <p className="text-sm text-muted-foreground">
                  XYZ Corp. | 2018 - 2020
                </p>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>
                    Designed and implemented a scalable API using Node.js and
                    Express.
                  </li>
                  <li>
                    Developed a React-powered admin dashboard for managing the
                    application.
                  </li>
                  <li>
                    Participated in agile development practices and code
                    reviews.
                  </li>
                </ul>
              </div>
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
                My Expertise
              </h2>
              <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I have years of experience in a wide range of technologies.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Languages</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      JavaScript - 7 Years
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      TypeScript - 3 Years
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Frameworks</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">React - 5 Years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Next.js - 2 Years</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Tailwind CSS - 2 Years
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Backends</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">Node.js - 4 Years</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="bg-primary rounded-md p-3 flex items-center justify-center">
                    <CodeIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">Libraries</h3>
                </div>
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">React - 5 Years</p>
                  </div>
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
                  <div className="flex items-center gap-2">
                    <div className="bg-primary rounded-md p-2 flex items-center justify-center">
                      <CodeIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Tailwind CSS - 2 Years
                    </p>
                  </div>
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
                  Get in Touch
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I'm always excited to discuss new projects and opportunities.
                  Feel free to reach out!
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <Input
                    type="text"
                    placeholder="Name"
                    className="max-w-lg flex-1"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="max-w-lg flex-1"
                  />
                  <Textarea placeholder="Message" className="max-w-lg flex-1" />
                  <Button type="submit">Submit</Button>
                </form>
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
