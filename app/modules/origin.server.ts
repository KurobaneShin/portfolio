// Behind a proxy the request URL can say http; trust x-forwarded-proto (the host is kept as received).
export const originOf = (request: Request) => {
  const { host, protocol } = new URL(request.url);
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ?? protocol.slice(0, -1);
  return `${proto}://${host}`;
};
