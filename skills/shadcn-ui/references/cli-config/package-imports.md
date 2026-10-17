---
source: https://ui.shadcn.com/docs/package-imports
---

# Package Imports

The `shadcn` CLI supports Node.js package imports (`#...` aliases in `package.json`) for installing components, rewriting imports and resolving third-party registries, as an alternative to `compilerOptions.paths`.

## Signature / Usage

```json
{
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  }
}
```

```tsx
import { Button } from "#components/ui/button"
import { cn } from "#lib/utils"
```

App setup (Next.js, Vite, TanStack Start), three files:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "resolvePackageJsonImports": true
  }
}
```

```json
// components.json
{
  "aliases": {
    "components": "#components",
    "ui": "#components/ui",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "#lib/utils"
  }
}
```

Monorepo: app workspace `apps/web/components.json` routes shared files through the UI package:

```json
{
  "aliases": {
    "components": "#components",
    "ui": "@workspace/ui/components",
    "lib": "#lib",
    "hooks": "#hooks",
    "utils": "@workspace/ui/lib/utils"
  }
}
```

The shared package `packages/ui/package.json` exposes install targets with `exports`:

```json
{
  "name": "@workspace/ui",
  "private": true,
  "imports": {
    "#components/*": "./src/components/*.tsx",
    "#lib/*": "./src/lib/*.ts",
    "#hooks/*": "./src/hooks/*.ts"
  },
  "exports": {
    "./globals.css": "./src/styles/globals.css",
    "./components/*": "./src/components/*.tsx",
    "./lib/*": "./src/lib/*.ts",
    "./hooks/*": "./src/hooks/*.ts"
  }
}
```

## Notes

- Specifiers must start with `#`. Use TypeScript 5 or later with `moduleResolution: "bundler"` and `resolvePackageJsonImports: true`. `compilerOptions.paths` is not needed for these aliases.
- If the app has no `src` directory, drop `src/` from the targets (`./components/*.tsx`).
- `ui` (`#components/ui`) is covered by `#components/*`; `utils` (`#lib/utils`) by `#lib/*`, so no separate `#utils` import is needed.
- Target pattern with extension (`./src/components/*.tsx`) generates `#components/ui/button`; without (`./src/components/*`) generates `#components/ui/button.tsx`. For most apps, use the extension in the target.
- In a monorepo use package imports inside each package and package exports for files shared across workspaces; add from `apps/web` and shared UI files import from `@workspace/ui`, app-local files from `#...`.
- Troubleshooting: specifier starts with `#`; `imports` entry is in the nearest `package.json`; `moduleResolution` is `bundler`; `resolvePackageJsonImports` is enabled; the target exists after components are added. If imports still point to `@/...`, make `components.json` use the same `#...` aliases.
- shadcn/ui copy-in components are distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and fandhe-frontend (skill fandhe-frontend). Framework APIs themselves are in skills nextjs-app / tanstack-start.

## Related

- [components.json](./components-json.md)
- [Monorepo](./monorepo.md)
