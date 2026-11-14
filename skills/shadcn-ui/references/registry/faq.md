---
source: https://ui.shadcn.com/docs/registry/faq
---

# FAQ

Frequently asked questions about running a registry: complex items, Tailwind colors and theme variables, GitHub registry dependencies, pinning and private repositories.

## Signature / Usage

A complex component that installs a page, two components, a hook, a format-date utils and a config file:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/new-york/hello-world/page.tsx",
      "type": "registry:page",
      "target": "app/hello/page.tsx"
    },
    {
      "path": "registry/new-york/hello-world/components/hello-world.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/components/formatted-message.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/hooks/use-hello.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/hello-world/lib/format-date.ts",
      "type": "registry:lib"
    },
    {
      "path": "registry/new-york/hello-world/hello.config.ts",
      "type": "registry:file",
      "target": "~/hello.config.ts"
    }
  ]
}
```

Add a new Tailwind color under `cssVars` with `light` and `dark` keys (the CLI updates the project CSS file; the colors then become utility classes such as `bg-brand` and `text-brand-accent`):

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "oklch(0.205 0.015 18)",
      "brand-accent": "oklch(0.205 0.015 18)"
    },
    "dark": {
      "brand-background": "oklch(0.205 0.015 18)",
      "brand-accent": "oklch(0.205 0.015 18)"
    }
  }
}
```

Add or override a Tailwind theme variable under `cssVars.theme`:

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "theme": {
      "text-base": "3rem",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      "font-heading": "Poppins, sans-serif"
    }
  }
}
```

Depend on an item from a GitHub repository by using the full GitHub item address (a bare name such as `button` always means the built-in shadcn `button` item):

```json
{
  "registryDependencies": ["acme/ui/button"]
}
```

Pin a GitHub registry item with `#ref` (branch, tag or full commit SHA; prefer tags or full commit SHAs for published registries):

```bash
npx shadcn@latest add acme/ui/button#v1.2.0
```

## Notes

- Private `github.com` repositories work as GitHub registry addresses: the CLI uses the GitHub CLI (`gh auth login`) locally, or `GH_TOKEN` / `GITHUB_TOKEN` in CI. GitHub Enterprise hosts are not supported; for custom registry servers with request authentication, use a namespace with authentication. This answer changed in CLI 4.23.0; in 4.22.0 the same FAQ said private repositories were not supported, while the github page of that tag already documented them (the two pages disagreed).
- Official text inconsistency, kept verbatim above: the FAQ says the new colors become `bg-brand` and `text-brand-accent`, but the example defines the keys `brand-background` and `brand-accent`, so the generated utilities follow those key names (for example `bg-brand-background`, `text-brand-accent`); `bg-brand` would need a key named `brand`.
- Source: https://ui.shadcn.com/docs/registry/faq (Markdown twin retrieved 2026-11-14; byte-identical to `apps/v4/content/docs/registry/faq.mdx` at tag `shadcn@4.23.0`).

## Related

- [GitHub Registries](./github.md)
- [Namespaces](./namespace.md)
- [Authentication](./authentication.md)
- [registry-item.json](./registry-item-json.md)
