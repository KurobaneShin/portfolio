// Public origin comes from config, never from request headers (Host / X-Forwarded-* are client-controlled).
export const SITE_URL = (process.env.SITE_URL || "https://kurobane.com.br").replace(/\/+$/, "");

export const xmlEscape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
