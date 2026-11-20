import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { asLocale } from "./i18n";

// The cookie is written by the browser (see __root), never by the server, so responses stay CDN-cacheable.
const read = (cookie: string | null | undefined) => asLocale(cookie?.match(/(?:^|; )lng=([^;]*)/)?.[1]);

export const getCookieLocale = createIsomorphicFn()
  .server(() => read(getRequestHeader("cookie")))
  .client(() => read(document.cookie));
