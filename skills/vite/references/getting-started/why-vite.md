---
source: https://vite.dev/guide/why
---

# Why Vite

Rationale and history: unbundled native ESM dev server, ecosystem growth, the Rolldown/Oxc unified toolchain, and future direction.

## Signature / Usage

The page has no code examples. It splits dev work into two parts:

```text
Dependencies  -> pre-bundled once using fast native tooling
Source code   -> served on-demand over native ESM
```

## Notes

- The Origins: bundlers processed the entire application upfront; Vite pre-bundles dependencies (which rarely change) and serves source code on demand over native ESM, so startup is nearly instant. Edits use HMR over native ESM to update just that module.
- Prior art named in the text: Snowpack (unbundled development, dependency pre-bundling), WMR (universal plugin API for dev and build), @web/dev-server (Vite 1.0 server architecture).
- Shipping unbundled ESM to production is still inefficient due to nested-import round trips, so bundling remains necessary for production builds.
- Growing with the Ecosystem: frameworks and tools named as building on Vite include Nuxt, SvelteKit, Astro, React Router, Analog, SolidStart, Vitest, and Storybook; Laravel and Ruby on Rails use it for frontend assets. vite-ecosystem-ci tests major projects against Vite changes.
- A Unified Toolchain: Vite formerly used esbuild (dev) and Rollup (production). Rolldown (Rust, same plugin API, uses Oxc for parse/transform/minify) unifies both.
- Where Vite is Heading: full bundle mode (dev server bundling like production), Environment API (custom environments such as edge runtimes and service workers), and evolving with JavaScript via Oxc and Rolldown.

## Related

- [philosophy.md](./philosophy.md)
- [overview.md](./overview.md)
