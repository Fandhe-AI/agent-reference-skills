---
source: https://ui.shadcn.com/docs/components-json
---

# components.json

`components.json` holds your project configuration so the CLI knows how to place and customize components. It is only required when using the CLI (not for copy and paste).

## Signature / Usage

```bash
npx shadcn@latest init
```

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
    "css": "styles/global.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": "tw-"
  },
  "rsc": true,
  "tsx": true,
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json"
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `$schema` | string | `https://ui.shadcn.com/schema.json` |
| `style` | string | Component style. Cannot be changed after initialization. `default` is deprecated; use `new-york`. |
| `tailwind.config` | string | Path to `tailwind.config.js` / `.ts`. For Tailwind CSS v4, leave blank. |
| `tailwind.css` | string | Path to the CSS file that imports Tailwind CSS. |
| `tailwind.baseColor` | `neutral` \| `stone` \| `zinc` \| `mauve` \| `olive` \| `mist` \| `taupe` | Generates default theme tokens. Cannot be changed after initialization. |
| `tailwind.cssVariables` | boolean | `true` generates semantic tokens (`background`, `foreground`, `primary`); `false` uses inline Tailwind color utilities. Cannot be changed after initialization (delete and re-install components to switch). |
| `tailwind.prefix` | string | Prefix for Tailwind utility classes; components are added with it. |
| `rsc` | boolean | Enable React Server Components; CLI adds `use client` to client components when `true`. |
| `tsx` | boolean | `false` adds components as `.jsx` JavaScript. |
| `aliases.utils` | string | Import alias for utility functions. |
| `aliases.components` | string | Import alias for components. |
| `aliases.ui` | string | Import alias (and install location) for `ui` components. |
| `aliases.lib` | string | Import alias for `lib` functions such as `format-date`. |
| `aliases.hooks` | string | Import alias for hooks such as `use-media-query`. |
| `registries` | object | Namespaced registries: `"@name": "<url with {name}>"` or `{ url, headers, params }`. `${VAR_NAME}` is expanded from the environment. |

## Notes

- Aliases can be backed by `compilerOptions.paths` in `tsconfig.json` / `jsconfig.json`, or by `package.json#imports` (requires `moduleResolution: "bundler"` and `resolvePackageJsonImports: true`). Aliases in `components.json` are still required by the CLI. With `paths`, include the `src` directory in aliases when applicable.
- With package imports, the matched `imports` target controls file extensions in generated imports: `"#components/*": "./src/components/*.tsx"` gives `#components/button`; `"./src/components/*"` gives `#components/button.tsx`.
- Namespaced install: `npx shadcn@latest add @v0/dashboard`, `npx shadcn@latest add @acme/header @internal/auth-utils`.
- Private registry example:

```json
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": { "Authorization": "Bearer ${REGISTRY_TOKEN}" },
      "params": { "version": "latest" }
    }
  }
}
```

- shadcn/ui is a copy-in component setup, distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [shadcn CLI](./cli.md)
- [Package Imports](./package-imports.md)
- [Monorepo](./monorepo.md)
