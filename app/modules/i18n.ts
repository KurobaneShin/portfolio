import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";
import * as config from "~/config/i18n";

export type Locale = "en" | "ptBR";

export const asLocale = (value: string | null | undefined): Locale => (value === "ptBR" ? "ptBR" : "en");

// Resources are bundled, so init is synchronous and the same code runs on server and client.
const init = { ...config, initAsync: false };

export const getT = (lng: Locale) => {
  const i18n = createInstance();
  void i18n.init({ ...init, lng });
  return i18n.t;
};

export const createI18n = (lng: Locale) => {
  const i18n = createInstance().use(initReactI18next);
  void i18n.init({ ...init, lng });
  return i18n;
};
