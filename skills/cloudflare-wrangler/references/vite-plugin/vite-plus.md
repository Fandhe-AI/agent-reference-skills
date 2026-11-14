---
source: https://developers.cloudflare.com/workers/vite-plugin/vite-plus/
---

# Vite+ on Workers

Use Vite+ (Vite combined with formatting, linting, type checking and testing, via the `vp` command) with the Cloudflare Vite plugin for new Workers and supported Vite-based apps.

## Signature / Usage

Adapted (not in the official docs): the official page has no code block; this lists the commands it names in prose.

```sh
# Create a standalone Worker (named in the official text; follow "Deploy your first Worker")
cf init
# Used alongside the generated Vite+ scripts for checks, formatting and tests
cf dev
cf build
cf deploy
```

## Notes

- The plugin runs your Worker code in the Workers runtime during development; Vite+ provides the project toolchain through the `vp` command.
- New project: to create a standalone Worker with `cf init`, follow https://developers.cloudflare.com/cf/get-started/first-worker/ (the new `cf` CLI is beta and is not covered by this skill). For a framework application, start with the framework guide and preserve framework-specific build steps when adopting Vite+.
- Existing project: follow the Vite+ migration guide (https://viteplus.dev/guide/migrate). If the project does not yet use the Cloudflare Vite plugin, follow the plugin setup guide (`get-started.md`). Keep your framework scripts and Cloudflare deployment command; adopting Vite+ does not require changing your Cloudflare configuration format.
- Vite itself (config, build): see the vite skill; Vitest: see the vitest skill.
- Source: https://developers.cloudflare.com/workers/vite-plugin/vite-plus/ (cloudflare-docs production `34d908a`, fetched 2026-11-14)

## Related

- [overview.md](./overview.md)
- [get-started.md](./get-started.md)
