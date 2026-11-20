// Shared by meta functions (client + server), so it must not live in a .server module.
export const LINKEDIN_URL = "https://www.linkedin.com/in/icaro-diniz-6a90b0218/";
export const GITHUB_URL = "https://github.com/KurobaneShin";
export const AVATAR_URL = "https://github.com/kurobaneshin.png";

export const person = (origin: string) => ({
  "@type": "Person",
  name: "Ícaro Diniz",
  alternateName: "Kurobane",
  url: origin,
  image: AVATAR_URL,
  jobTitle: "Software Engineer",
  sameAs: [LINKEDIN_URL, GITHUB_URL],
});

export const ogLocale = (locale: string) => (locale === "ptBR" ? "pt_BR" : "en_US");
export const htmlLang = (locale: string) => (locale === "ptBR" ? "pt-BR" : "en");
