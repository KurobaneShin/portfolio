export default {
  title: "Kurobane",
  description:
    "Senior software engineer. I build and fix critical systems (ticketing, finance, content platforms and data) across media, healthcare, food-tech and construction, always with numbers that match the source, measured performance and infrastructure as code.",
  hire: "Hire me",
  seeProjects: "View Projects",
  hero: {
    headline: "Critical systems, with numbers that match the source.",
    eyebrow: "Software engineering · Critical systems",
    available: "Taking on new projects",
    location: "Brazil · UTC−3",
    clientsTitle: "Who I have worked with",
    clients: {
      globo: { name: "Grupo Globo", sector: "media" },
      sharecare: { name: "Sharecare", sector: "healthcare" },
      cloudkitchens: { name: "CloudKitchens", sector: "food-tech" },
      casacor: { name: "CasaCor", sector: "editorial" },
      minhasinscricoes: { name: "MinhasInscrições", sector: "events" },
      jveiga: { name: "J. Veiga", sector: "construction" },
    },
  },
  present: "present",
  langChooser: {
    title: "Select Language",
    english: "english",
    portuguese: "portuguese",
  },
  modeToggle: {
    title: "Toggle theme",
    light: "Light",
    dark: "Dark",
  },
  nav: {
    about: "About",
    cases: "Case studies",
    projects: "Projects",
    skills: "Skills",
    exp: "Experience",
    expertise: "Expertise",
    contact: "Contact",
  },
  cases: {
    title: "Case studies",
    description:
      "I work on systems where mistakes are expensive: ticketing for major events, finance for payment platforms, healthcare content at scale and the data leadership decides on. The method is the same in every industry: every number matches its source, every performance gain is measured before and after, and all infrastructure lives in code.",
    globo: {
      client: "Grupo Globo",
      title: "Ticketing",
      metric: "264 cloud resources validated before the first deploy",
      detail:
        "Event-driven ticketing API in Go on Kubernetes (GKE), with Pub/Sub and AMQP behind a single interface and architecture tests validated by mutation testing.",
    },
    sharecare: {
      client: "Sharecare (US)",
      title: "Healthcare content platform",
      metric: "End-to-end tests 20× faster",
      detail:
        "256 tests in about 115 s. Removed a duplicate server render that made up 28% of the HTML and stopped transient failures from becoming CDN-cached 404s.",
    },
    cloudkitchens: {
      client: "CloudKitchens LATAM",
      title: "S&OP dashboards and billing",
      metric: "Exact parity with 14 billing workbooks",
      detail:
        "Dashboards ported from Looker with byte-identical tables. A billing fix cut the uncharged amount from R$ 17.4k to R$ 954.",
    },
    minhasinscricoes: {
      client: "MinhasInscrições",
      title: "Event finance",
      metric: "39 of 40 match the legacy engine (the 40th was a legacy bug)",
      detail:
        "Financial reports and receivables advances on AWS (ECS Fargate + Terraform). Found a wire-transfer fee charged twice in production reports.",
    },
    jveiga: {
      client: "J. Veiga",
      title: "Construction, sales and cash-flow data",
      metric: "From 6 failures in 17 days to automatic recovery",
      detail:
        "BigQuery data warehouse integrating Sienge, CV CRM and Prevision, with durable jobs and Terraform-managed infrastructure. Schedule KPIs match Prevision to one decimal.",
    },
    confiou: {
      client: "Confiou (own product)",
      title: "Contract management",
      metric: "847 tests · Lighthouse 95 mobile / 100 desktop",
      detail:
        "Contract SaaS with self-hosted e-signing and an agent that proposes actions by risk tier, with human approval for anything irreversible.",
    },
  },
  featured: {
    title: "Featured Projects",
    description: "Some recent projects, from product to deploy.",
  },
  exp: {
    title: "Work Experience",
    description:
      "I have worked with a variety of companies and clients, delivering high-quality software solutions.",
  },
  skills: {
    title: "Skills",
    description:
      "From frontend to infrastructure: product, data and cloud in one pair of hands.",
    react:
      "Proficient in building modern, responsive web applications using React.",
    node:
      "Experienced in developing scalable and efficient server-side applications with Node.js.",
    go:
      "Skilled in building high-performance, concurrent applications using the Go programming language.",
    cloud:
      "Infrastructure as code with Terraform on GCP, AWS and Cloudflare, Kubernetes and CI/CD: reproducible, no console clicking.",
    data:
      "Pipelines and data warehouses on BigQuery and Postgres, with ERP and CRM integrations and parity checks against the source.",
    performance:
      "Measurement-driven optimization: Core Web Vitals, CDN caching, queries and throughput, always with before and after numbers.",
  },
  expertise: {
    title: "My Expertise",
    description: "I have years of experience in a wide range of technologies.",
  },
  languages: {
    title: "Languages",
    go: { name: "Go", experience: "4 Years" },
    js: { name: "Javascript", experience: "4 Years" },
    ts: { name: "Typescript", experience: "3 Years" },
    php: { name: "PHP", experience: "4 Years" },
  },
  frontends: {
    title: "Frontends",
    react: { name: "React", experience: "4 Years" },
    rn: { name: "React native", experience: "4 Years" },
    vue: { name: "vue", experience: "1 Year" },
  },
  backends: {
    title: "Backends",
    express: { name: "express", experience: "4 Years" },
    next: { name: "next.js", experience: "3 Years" },
    remix: { name: "remix.js", experience: "3 Years" },
    gofiber: { name: "go-fiber", experience: "2 Years" },
  },
  libraries: {
    title: "Libraries",
    prisma: { name: "prisma", experience: "3 Years" },
    typeorm: { name: "typeorm", experience: "3 Years" },
    trpc: { name: "trpc", experience: "2 Years" },
    gorm: { name: "gorm", experience: "1 Year" },
  },
  tools: {
    title: "Tools",
    tailwind: { name: "tailwind css", experience: "2 Years" },
    node: { name: "node.js", experience: "4 Years" },
    docker: { name: "docker", experience: "3 Years" },
    k8: { name: "kubernetes", experience: "1 Year" },
  },
  databases: {
    title: "Databases",
    pg: { name: "postgres", experience: "4 Years" },
    mongo: { name: "mongodb", experience: "1 Year" },
    redis: { name: "redis", experience: "3 Years" },
    mysql: { name: "mysql", experience: "4 Years" },
  },
  touch: {
    title: "Get in Touch",
    description:
      "I'm always excited to discuss new projects and opportunities. Feel free to reach out!",
    inputs: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Submit",
    },
  },
  validations: {
    required: "Required",
    email: "Invalid email",
  },
};
