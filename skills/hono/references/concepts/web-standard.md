# Web Standards

Hono is built exclusively on Web Standards — the standardized APIs originally designed for the `fetch` function. By using native HTTP primitives (Request, Response, URL, URLSearchParams, Headers), the same Hono application code runs across multiple runtimes without modification.

## Signature / Usage

```ts
// The same handler runs on Cloudflare Workers, Bun, Deno, etc.
export default {
  fetch(request: Request): Response {
    return new Response("Hello World")
  },
}
```

## Notes

- Core primitives used: `Request`, `Response`, `URL`, `URLSearchParams`, `Headers`
- Supported runtimes: Cloudflare Workers, Deno, Bun, Fastly Compute, AWS Lambda, Node.js, Vercel, Netlify, WASI/WebAssembly
- The [WinterCG](https://wintercg.org/) organization (founded by Cloudflare, Deno, and Shopify) defines the "web-interoperability" standards that Hono follows
- Goal: "the Standard of the Web Standards" — maximum portability with zero runtime-specific code

## Related

- [Motivation](./motivation.md)
- [Routers](./routers.md)
