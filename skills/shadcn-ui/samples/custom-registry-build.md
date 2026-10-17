---
source: https://ui.shadcn.com/docs/registry/getting-started
---

# Custom Registry with shadcn build

Define a `registry.json`, build static registry JSON with `shadcn build`, and install an item from it.

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

```bash
npx shadcn@latest build
npm run dev
npx shadcn@latest add http://localhost:3000/r/button.json
```

Register a namespace and install through it:

```bash
npx shadcn@latest registry add @acme=http://localhost:3000/r/{name}.json
npx shadcn@latest add @acme/button
```

## Notes

- `shadcn build` writes registry JSON to `public/r` by default (e.g. `public/r/button.json`); change it with `--output`.
- The `{name}` placeholder in the namespace template must resolve to an item JSON file; the catalog is served separately at `/r/registry.json`.
- For larger registries, compose a root `registry.json` with `include` of nested `registry.json` files; item file paths are then relative to the declaring file, and `shadcn build` writes a flattened registry.
- To serve at request time instead of building, the docs show `loadRegistry` / `loadRegistryItem` from `shadcn/registry` in Next.js route handlers.
