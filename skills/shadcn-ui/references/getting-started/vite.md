---
source: https://ui.shadcn.com/docs/installation/vite
---

# Vite

Install and configure shadcn/ui for Vite.

## Signature / Usage

```bash
npx shadcn@latest init -t vite
npx shadcn@latest init -t vite --monorepo
npx shadcn@latest add card
```

Existing project setup (`vite.config.ts`):

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

## Notes

- shadcn/create command: `npx shadcn@latest init --preset [CODE] --template vite`.
- Existing Project steps: `npm create vite@latest` (React + TypeScript template); `npm install tailwindcss @tailwindcss/vite`; replace `src/index.css` with `@import "tailwindcss";`; add `baseUrl` and `paths` (`"@/*": ["./src/*"]`) to the `compilerOptions` of both `tsconfig.json` and `tsconfig.app.json`; `npm install -D @types/node`; update `vite.config.ts`; run `npx shadcn@latest init`; then `npx shadcn@latest add button`.
- Monorepo: use `-c apps/web` from the repo root, and import from `@workspace/ui/components/card` in `apps/web/src/App.tsx`.
- Vite itself is not covered by another skill in this repository.

## Related

- [Installation](./installation.md)
- [Next.js](./next.md)
