---
source: https://ui.shadcn.com/docs/registry/getting-started
---

# Getting Started

Set up, build, serve, test and publish your own registry. Any framework that can serve JSON over HTTP works, or a public GitHub repository with a root `registry.json`.

## Signature / Usage

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "A simple button component.",
      "files": [
        {
          "path": "components/ui/button.tsx",
          "type": "registry:ui"
        }
      ]
    }
  ]
}
```

Build static files (default output `public/r`, e.g. `public/r/button.json`; change with `--output`):

```bash
npx shadcn@latest build
```

Dynamic route handlers (producer-side loaders from `shadcn/registry`; install `shadcn` as a runtime dependency):

```ts
import { loadRegistry } from "shadcn/registry"

export async function GET() {
  try {
    const registry = await loadRegistry()

    return Response.json(registry)
  } catch (error) {
    console.error(error)

    return Response.json({ error: "Failed to load registry." }, { status: 500 })
  }
}
```

Test with the same CLI commands consumers use:

```bash
npx shadcn@latest list http://localhost:3000/r/registry.json
npx shadcn@latest search http://localhost:3000/r/registry.json --query button
npx shadcn@latest view http://localhost:3000/r/button.json
npx shadcn@latest add http://localhost:3000/r/button.json
npx shadcn@latest registry add @acme=http://localhost:3000/r/{name}.json
```

## Notes

- Structure: define all items in one root `registry.json`, or use a root `registry.json` with `include` listing nested `registry.json` files. Only the root must define `name` and `homepage`. With `include`, file paths are relative to the `registry.json` that declares the item; `shadcn build` writes a flattened registry without `include`.
- Each item needs `name`, `type`, `title`, `description` and `files`; every file needs `path` and `type`. In a single-file registry, `path` is relative to the project root.
- Use `loadRegistryItem(name)` (and `RegistryItemNotFoundError`) in `app/r/[name].json/route.ts` to serve individual items. Both loaders resolve `include`, so no `shadcn build` is needed.
- Content negotiation: the CLI sends `User-Agent: shadcn` and `Accept: application/vnd.shadcn.v1+json, application/json;q=0.9`, so a registry can be hosted at a domain root and serve HTML to browsers, JSON to the CLI and Markdown to agents (the page shows Next.js `rewrites` and Express examples).
- Namespace templates: `{name}` must resolve to an item JSON file (`@acme/button` resolves to `http://localhost:3000/r/button.json`); the catalog stays at `.../r/registry.json`. Consumers add it with `npx shadcn@latest registry add @acme=https://acme.com/r/{name}.json` or under `registries` in `components.json`.
- Guidelines: nest items under `registry/[STYLE]/[NAME]`; blocks require `name`, `description`, `type`, `files`; list all `registryDependencies` (item addresses such as `button`, `@acme/input-form`, `acme/ui/button`, or a URL) and `dependencies` (`name@version` allowed, e.g. `zod@^3.20.0`); imports should use the `@/registry` path; prefer `components`, `hooks`, `lib` directories.
- Starting point: the `shadcn-ui/registry-template` repository. Open-source namespaces can be submitted to the registry index.

## Related

- [registry.json](./registry-json.md)
- [registry-item.json](./registry-item-json.md)
- [GitHub Registries](./github.md)
- [Namespaces](./namespace.md)
- [Registry Directory (index submission)](./registry-index.md)
- [API Reference](./api-reference.md)
