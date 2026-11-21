export default {
  title: "Kurobane",
  description:
    "Sou o Ícaro, ou Kurobane. Pago as contas construindo e consertando sistemas de bilheteria, financeiro e dados para empresas de saúde, mídia, food-tech, eventos e construção. O resto do tempo vai para um MMO em C++ feito do zero, e eu conto tudo aqui no blog.",
  hire: "Me contrate",
  seeProjects: "Meus Projetos",
  hero: {
    headline: "Construo e conserto sistemas onde erro custa dinheiro.",
    eyebrow: "Ícaro \"Kurobane\" · Sistemas em produção e um MMO em C++",
    available: "Agenda aberta para novos contratos",
    location: "Brasil · UTC−3",
    clientsTitle: "Times que já confiaram no meu código",
    clients: {
      sharecare: { name: "Sharecare", sector: "saúde" },
      cloudkitchens: { name: "CloudKitchens", sector: "food-tech" },
      minhasinscricoes: { name: "MinhasInscrições", sector: "eventos" },
      jveiga: { name: "J. Veiga", sector: "construção" },
    },
  },
  present: "atual",
  langChooser: {
    title: "Selecione Linguagem",
    english: "Inglês",
    portuguese: "Português",
  },
  modeToggle: {
    title: "Tema",
    light: "Claro",
    dark: "Escuro",
  },
  blog: {
    title: "Blog",
    eyebrow: "Anotações da bancada",
    description: "O que eu aprendo fazendo um MMO do zero, entregando sistemas web e trabalhando com agentes de IA. Com os números e com os erros.",
    back: "Todos os posts",
    followTitle: "Acompanhe o meu MMO",
    followText: "Posto um pedaço quase todo dia no X, no Instagram e no LinkedIn: números, animações e os erros também.",
    discuss: "Comente no LinkedIn",
    cta: "Quer esse rigor no seu projeto? Vamos conversar",
    tags: { mmo: "MMO", web: "Web", ia: "IA" },
  },
  nav: {
    blog: "Blog",
    about: "Sobre",
    cases: "Casos",
    projects: "Projetos",
    skills: "Habilidades",
    exp: "Experiência",
    expertise: "Expertise",
    contact: "Contato",
  },
  cases: {
    title: "Projetos em destaque",
    description:
      "Bilheteria de evento grande, financeiro de pagamento, conteúdo de saúde em escala e dados que chegam na mesa da diretoria. Sem achismo nem infra clicada na mão: tudo aqui tem número batendo com a fonte e performance medida antes e depois.",
    media: {
      client: "Grande grupo de mídia · via E-Tech",
      title: "Bilheteria",
      metric: "264 recursos de nuvem validados antes do primeiro deploy",
      detail:
        "API de ingressos em Go no Kubernetes (GKE), orientada a eventos, com Pub/Sub e AMQP atrás de uma interface única e testes de arquitetura validados por mutation testing.",
    },
    sharecare: {
      client: "Sharecare (EUA)",
      title: "Plataforma de conteúdo de saúde",
      metric: "Testes end-to-end 20× mais rápidos",
      detail:
        "256 testes em cerca de 115 s. Eliminei uma renderização duplicada que ocupava 28% do HTML e impedi que falhas passageiras virassem 404 em cache na CDN.",
    },
    cloudkitchens: {
      client: "CloudKitchens LATAM · via E-Tech",
      title: "Dashboards de S&OP e faturamento",
      metric: "Paridade exata com 14 planilhas de faturamento",
      detail:
        "Dashboards portados do Looker com tabelas idênticas byte a byte. Uma correção no faturamento reduziu o valor não cobrado de R$ 17,4 mil para R$ 954.",
    },
    minhasinscricoes: {
      client: "MinhasInscrições · via E-Tech",
      title: "Financeiro de eventos",
      metric: "39 de 40 conferem com o sistema legado (o 40º era bug do legado)",
      detail:
        "Relatórios financeiros e antecipação de recebíveis na AWS (ECS Fargate + Terraform). Encontrei uma tarifa de TED cobrada em dobro nos relatórios de produção.",
    },
    jveiga: {
      client: "J. Veiga · via E-Tech",
      title: "Dados de obra, vendas e caixa",
      metric: "De 6 falhas em 17 dias para recuperação automática",
      detail:
        "Data warehouse no BigQuery integrando Sienge, CV CRM e Prevision, com jobs duráveis e infraestrutura em Terraform. O PPC bate ao décimo com a Prevision.",
    },
    confiou: {
      client: "Confiou (produto próprio)",
      title: "Gestão de contratos",
      metric: "847 testes · Lighthouse 95 mobile / 100 desktop",
      detail:
        "SaaS de contratos com assinatura eletrônica self-hosted e um agente que propõe ações por nível de risco, com aprovação humana em tudo que é irreversível.",
    },
  },
  featured: {
    title: "Projetos em Destaque",
    description: "Alguns projetos recentes, do produto ao deploy.",
  },
  exp: {
    title: "Experiência",
    description:
      "Trabalhei com uma variedade de empresas e clientes, entregando soluções de software de alta qualidade.",
  },
  skills: {
    title: "Minhas Habilidades",
    description:
      "Do frontend à infraestrutura: produto, dados e nuvem no mesmo par de mãos.",
    react:
      "Proficiente na construção de aplicações web modernas e responsivas usando React.",
    node:
      "Experiência no desenvolvimento de aplicações de servidor escaláveis e eficientes com Node.js.",
    go:
      "Habilidade na construção de aplicações de alto desempenho e concorrentes usando a linguagem de programação Go.",
    cloud:
      "Infraestrutura em código com Terraform em GCP, AWS e Cloudflare, Kubernetes e CI/CD, sempre reproduzível e sem cliques no console.",
    data:
      "Pipelines e data warehouses no BigQuery e Postgres, com integrações de ERP e CRM e validação de paridade contra a fonte.",
    performance:
      "Otimização guiada por medição: Core Web Vitals, cache em CDN, consultas e throughput, sempre com números de antes e depois.",
  },
  expertise: {
    title: "Minha expertise",
    description:
      "Eu possuo anos de experiência em um longo leque de tecnologias",
  },
  languages: {
    title: "Linguagens",
    go: { name: "Go", experience: "4 Anos" },
    js: { name: "Javascript", experience: "4 Anos" },
    ts: { name: "Typescript", experience: "3 Anos" },
    php: { name: "PHP", experience: "4 Anos" },
  },
  frontends: {
    title: "Frontends",
    react: { name: "React", experience: "4 Anos" },
    rn: { name: "React native", experience: "4 Anos" },
    vue: { name: "vue", experience: "1 Anos" },
  },
  backends: {
    title: "Backends",
    express: { name: "express", experience: "4 Anos" },
    next: { name: "next.js", experience: "3 Anos" },
    remix: { name: "remix.js", experience: "3 Anos" },
    gofiber: { name: "go-fiber", experience: "2 Anos" },
  },
  libraries: {
    title: "Bibliotecas",
    prisma: { name: "prisma", experience: "3 Anos" },
    typeorm: { name: "typeorm", experience: "3 Anos" },
    trpc: { name: "trpc", experience: "2 Anos" },
    gorm: { name: "gorm", experience: "1 Anos" },
  },
  tools: {
    title: "Ferramentas",
    tailwind: { name: "tailwind css", experience: "2 Anos" },
    node: { name: "node.js", experience: "4 Anos" },
    docker: { name: "docker", experience: "3 Anos" },
    k8: { name: "kubernetes", experience: "1 Anos" },
  },
  databases: {
    title: "Bancos de dados",
    pg: { name: "postgres", experience: "4 Anos" },
    mongo: { name: "mongodb", experience: "1 ano" },
    redis: { name: "redis", experience: "3 anos" },
    mysql: { name: "mysql", experience: "4 anos" },
  },
  touch: {
    title: "Entre em contato",
    description:
      "Eu sempre estou empolgado para novos projetos e oportunidades. Sinta-se livre para entrar em contato!",
    inputs: {
      name: "Nome",
      email: "Email",
      message: "Menssagem",
      submit: "Enviar",
    },
  },
  validations: {
    required: "Obrigatório",
    email: "Email inválido",
  },
};
