---
source: https://ui.shadcn.com/docs/monorepo
---

# Monorepo

The CLI understands monorepo structure and installs components, dependencies and registry dependencies to the correct workspace paths and handles imports.

## Signature / Usage

```bash
npx shadcn@latest init --monorepo
```

Select a template (Next.js, Vite, TanStack Start, React Router, Astro). This creates two workspaces, `web` and `ui`, with Turborepo as the build system. Add components from the app path:

```bash
cd apps/web
npx shadcn@latest add [COMPONENT]
```

```tsx
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
```

File structure:

```txt
apps
└── web         # Your app goes here.
    ├── app
    │   └── page.tsx
    ├── components
    │   └── login-form.tsx
    ├── components.json
    └── package.json
packages
└── ui          # Your components and dependencies are installed here.
    ├── src
    │   ├── components
    │   │   └── button.tsx
    │   ├── hooks
    │   ├── lib
    │   │   └── utils.ts
    │   └── styles
    │       └── globals.css
    ├── components.json
    └── package.json
package.json
turbo.json
```

`apps/web/components.json`:

```json
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

`packages/ui/components.json`:

```json
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

## Notes

- `npx shadcn@latest add button` installs the button under `packages/ui` and updates import paths in `apps/web`. `add login-01` installs `button`, `label`, `input` and `card` under `packages/ui` and `login-form` under `apps/web/components`.
- Requirements: every workspace has its own `components.json`; each defines the workspace aliases; `style`, `iconLibrary` and `baseColor` are identical in both files; for Tailwind CSS v4 leave the `tailwind` config empty.
- `package.json#imports` suits package-local aliases (e.g. inside `packages/ui`). For shared imports such as `@workspace/ui/components`, keep explicit aliases in `components.json`; the CLI uses them to route files across workspace boundaries. The shared package must export any path another workspace references.
- Package-imports variant: app `package.json` has `imports` (`#components/*` etc.) and depends on `"@workspace/ui": "workspace:*"`; app `components.json` uses `"components": "#components"`, `"ui": "@workspace/ui/components"`, `"utils": "@workspace/ui/lib/utils"`; `packages/ui/components.json` uses `#components`, `#lib`, `#hooks` with `"ui": "#components"` and `package.json` `exports` for `./globals.css`, `./components/*`, `./lib/*`, `./hooks/*`.
- Turborepo itself is covered by skill turborepo. shadcn/ui copy-in components are distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and fandhe-frontend (skill fandhe-frontend).

## Related

- [components.json](./components-json.md)
- [Package Imports](./package-imports.md)
- [shadcn CLI](./cli.md)
