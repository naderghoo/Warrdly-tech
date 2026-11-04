// Shim for "cloudflare:sockets" inside the Next.js bundle.
// The real `connect` is provided by the Worker entry (worker.ts), which wrangler bundles natively.
type Connect = (address: unknown, options?: unknown) => unknown;

export const connect: Connect = (address, options) => {
  const real = (globalThis as { __cfConnect?: Connect }).__cfConnect;
  if (!real) throw new Error("cloudflare:sockets is only available on Cloudflare Workers");
  return real(address, options);
};
