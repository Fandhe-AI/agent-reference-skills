---
source: https://developers.cloudflare.com/workers/local-development/wrangler-vs-vite/
---

# Choosing between Wrangler & Vite

Both `wrangler dev` and the Cloudflare Vite plugin provide local development for Workers; choose based on the build tools your project uses.

## Signature / Usage

```sh
# Wrangler
npx wrangler dev
# Cloudflare Vite plugin
npx vite dev
```

| Capability or workflow | Wrangler | Cloudflare Vite plugin |
| --- | --- | --- |
| Standalone JavaScript or TypeScript Workers | Supported | Supported |
| Full-stack and backend Workers | Supported | Supported |
| Local binding simulations via Miniflare | Supported | Supported |
| Remote bindings | Supported | Supported |
| Multi-Worker development | Supported | Supported |
| Frontend and server-side rendering frameworks | Use the framework build output | Integrates with Vite-powered frameworks |
| Build pipeline | Uses Wrangler's bundler or a custom build | Uses Vite transformations, Hot Module Replacement, and plugins |
| Deployment and resource management | Supported | Use Wrangler after `vite build` |
| Rust Workers | Supported | Not supported |
| Python Workers | Use `pywrangler` instead of `wrangler` | Not supported |

## Notes

- Use the Vite plugin when the project already uses Vite or would benefit from its build pipeline; Vite is valid for standalone backend Workers too.
- Use `wrangler dev` when the project does not use Vite or you want a direct CLI workflow; Wrangler also provides deployment and resource management commands.
- You can use the Vite plugin for development and builds while using Wrangler for deployment and other Workers commands.
- Both tools support remote bindings: the Worker runs locally while selected bindings connect to deployed resources.
- For configuration differences when moving an existing project, see "Migrating from wrangler dev" in the Vite plugin docs.

## Related

- [Local development](./overview.md)
- [Supported bindings per development mode](./bindings-per-env.md)
- [Cloudflare Vite plugin](../vite-plugin/README.md)
