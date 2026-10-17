---
source: https://ui.shadcn.com/docs/installation/astro
---

# Astro

Install and configure shadcn/ui for Astro.

## Signature / Usage

```bash
npx shadcn@latest init -t astro
npx shadcn@latest init -t astro --monorepo
npx shadcn@latest add card
```

```astro
---
import Layout from "@/layouts/main.astro"
import { Button } from "@/components/ui/button"
---

<Layout>
  <div class="grid h-screen place-items-center content-center">
    <Button>Button</Button>
  </div>
</Layout>
```

## Notes

- shadcn/create command: `npx shadcn@latest init --preset [CODE] --template astro`.
- Existing Project: `npm create astro@latest astro-app -- --template with-tailwindcss --install --add react --git` sets up Tailwind CSS and the React integration. The Tailwind starter loads the global stylesheet through `src/layouts/main.astro`; keep that layout, or make sure your page imports `@/styles/global.css`.
- If the `@/*` alias is not configured, add `"baseUrl": "."` and `"paths": { "@/*": ["./src/*"] }` to `compilerOptions` in `tsconfig.json`, then run `npx shadcn@latest init`.
- Monorepo: import from `@workspace/ui/components/card` in `apps/web/src/pages/index.astro`; `apps/web/src/layouts/main.astro` already imports `@workspace/ui/globals.css`.

## Related

- [Installation](./installation.md)
