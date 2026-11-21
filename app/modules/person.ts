// Shared by meta functions (client + server), so it must not live in a .server module.
export const LINKEDIN_URL = "https://www.linkedin.com/in/icaro-diniz-6a90b0218/";
export const GITHUB_URL = "https://github.com/KurobaneShin";
export const X_URL = "https://x.com/Kurobane_";
export const X_HANDLE = "@Kurobane_";
export const INSTAGRAM_URL = "https://www.instagram.com/icaro_diniz_/";

export const SOCIALS = [
  { name: "LinkedIn", url: LINKEDIN_URL },
  { name: "X", url: X_URL },
  { name: "Instagram", url: INSTAGRAM_URL },
  { name: "GitHub", url: GITHUB_URL },
];
export const AVATAR_URL = "https://github.com/kurobaneshin.png";

export const person = (origin: string) => ({
  "@type": "Person",
  name: "Ícaro Diniz",
  alternateName: "Kurobane",
  url: origin,
  image: AVATAR_URL,
  jobTitle: "Software Engineer",
  sameAs: [LINKEDIN_URL, X_URL, INSTAGRAM_URL, GITHUB_URL],
});

export const ogLocale = (locale: string) => (locale === "ptBR" ? "pt_BR" : "en_US");
export const htmlLang = (locale: string) => (locale === "ptBR" ? "pt-BR" : "en");
