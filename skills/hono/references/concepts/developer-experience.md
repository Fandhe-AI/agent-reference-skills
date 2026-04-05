# Developer Experience

Hono is written in TypeScript and prioritizes type-safe application development. Applications can be written for multiple runtimes (Cloudflare Workers, Deno, Bun, Node.js) without transpilation.

## Notes

- **TypeScript-first**: Hono is written in TypeScript; type safety is a built-in feature, not an add-on
- **No transpilation required**: TypeScript code runs directly on supported runtimes (Deno, Bun, Cloudflare Workers)
- **Multi-runtime compatibility**: Write once, deploy to any supported runtime without code changes
- **Type-safe RPC**: When combined with Zod Validator Middleware and the `hc` HTTP client (Hono Stacks), server endpoint types are automatically inferred on the client side
- Developer experience is considered central to application quality — the framework is designed so that correct usage is easy to express and incorrect usage is caught at compile time

## Related

- [Stacks](./stacks.md)
- [Motivation](./motivation.md)
- [Web Standards](./web-standard.md)
