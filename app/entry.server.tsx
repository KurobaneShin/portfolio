import { createInstance } from "i18next";
import i18nServer from "./modules/i18n.server";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as i18n from "./config/i18n";

import { RemixServer } from "@remix-run/react";
import { type EntryContext, handleRequest } from "@vercel/remix";
import { getEnv, init } from "./env.server";

init();
global.ENV = getEnv();

export default async function (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const instance = createInstance();
  const lng = await i18nServer.getLocale(request);
  const ns = i18nServer.getRouteNamespaces(remixContext);

  await instance.use(initReactI18next).init({
    ...i18n,
    lng,
    ns,
  });

  // eslint-disable-next-line prefer-const
  let remixServer = (
    <I18nextProvider i18n={instance}>
      <RemixServer context={remixContext} url={request.url} />
    </I18nextProvider>
  );
  return handleRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixServer,
  );
}

// export default function handleRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
//   // This is ignored so we can keep it in the template for visibility.  Feel
//   // free to delete this parameter in your app if you're not using it!
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   loadContext: AppLoadContext,
// ) {
//   return isbot(request.headers.get("user-agent") || "")
//     ? handleBotRequest(
//       request,
//       responseStatusCode,
//       responseHeaders,
//       remixContext,
//     )
//     : handleBrowserRequest(
//       request,
//       responseStatusCode,
//       responseHeaders,
//       remixContext,
//     );
// }
//
// async function handleBotRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
// ) {
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <I18nextProvider i18n={instance}>
//         <RemixServer
//           context={remixContext}
//           url={request.url}
//           abortDelay={ABORT_DELAY}
//         />
//       </I18nextProvider>,
//       {
//         onAllReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);
//
//           responseHeaders.set("Content-Type", "text/html");
//
//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             }),
//           );
//
//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       },
//     );
//
//     setTimeout(abort, ABORT_DELAY);
//   });
// }
//
// async function handleBrowserRequest(
//   request: Request,
//   responseStatusCode: number,
//   responseHeaders: Headers,
//   remixContext: EntryContext,
// ) {
//   const instance = createInstance();
//   const lng = await i18nServer.getLocale(request);
//   const ns = i18nServer.getRouteNamespaces(remixContext);
//
//   await instance.use(initReactI18next).init({
//     ...i18n,
//     lng,
//     ns,
//   });
//
//   return new Promise((resolve, reject) => {
//     let shellRendered = false;
//     const { pipe, abort } = renderToPipeableStream(
//       <I18nextProvider i18n={instance}>
//         <RemixServer
//           context={remixContext}
//           url={request.url}
//           abortDelay={ABORT_DELAY}
//         />
//       </I18nextProvider>,
//       {
//         onShellReady() {
//           shellRendered = true;
//           const body = new PassThrough();
//           const stream = createReadableStreamFromReadable(body);
//
//           responseHeaders.set("Content-Type", "text/html");
//
//           resolve(
//             new Response(stream, {
//               headers: responseHeaders,
//               status: responseStatusCode,
//             }),
//           );
//
//           pipe(body);
//         },
//         onShellError(error: unknown) {
//           reject(error);
//         },
//         onError(error: unknown) {
//           responseStatusCode = 500;
//           // Log streaming rendering errors from inside the shell.  Don't log
//           // errors encountered during initial shell rendering since they'll
//           // reject and get logged in handleDocumentRequest.
//           if (shellRendered) {
//             console.error(error);
//           }
//         },
//       },
//     );
//
//     setTimeout(abort, ABORT_DELAY);
//   });
// }
