---
source: https://ui.shadcn.com/docs/monorepo
---

# Monorepo Setup

Create a Turborepo monorepo with `web` and `ui` workspaces and add components from the app workspace.

```bash
npx shadcn@latest init --monorepo
cd apps/web
npx shadcn@latest add button
```

```json
// apps/web/components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@workspace/ui/lib/utils",
    "ui": "@workspace/ui/components"
  }
}
```

```json
// packages/ui/components.json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@workspace/ui/components",
    "utils": "@workspace/ui/lib/utils",
    "hooks": "@workspace/ui/hooks",
    "lib": "@workspace/ui/lib",
    "ui": "@workspace/ui/components"
  }
}
```

```tsx
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
```

## Notes

- Every workspace needs its own `components.json`, with the same `style`, `iconLibrary` and `baseColor`. For Tailwind CSS v4, leave `tailwind.config` empty.
- Run `add` in the path of your app; the CLI installs `button` under `packages/ui` and updates import paths in `apps/web`. A block such as `login-01` installs its primitives in `packages/ui` and `login-form` in `apps/web/components`.
- The init templates offered are Next.js, Vite, TanStack Start, React Router and Astro. Turborepo itself is in skill turborepo.
- Keep explicit `components.json` aliases for shared workspace imports such as `@workspace/ui/components`; `package.json#imports` (`#...`) works for package-local aliases (see the docs' monorepo page).
