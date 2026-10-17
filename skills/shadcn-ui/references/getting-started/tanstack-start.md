---
source: https://ui.shadcn.com/docs/installation/tanstack
---

# TanStack Start

Install and configure shadcn/ui for TanStack Start.

## Signature / Usage

```bash
npx shadcn@latest init -t start
npx shadcn@latest init -t start --monorepo
npx shadcn@latest add card
```

```tsx
import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Button>Click me</Button>
    </div>
  )
}
```

## Notes

- The CLI template name is `start`; shadcn/create command: `npx shadcn@latest init --preset [CODE] --template start`.
- Existing Project: `npx @tanstack/cli@latest create` (choose TanStack Start, the React framework, and the recommended defaults so Tailwind CSS and the `@/*` import alias are configured). Do not add the `shadcn` add-on when prompted; the `shadcn` CLI configures shadcn/ui afterwards via `npx shadcn@latest init`.
- Monorepo: import from `@workspace/ui/components/card` in `apps/web/src/routes/index.tsx`.
- Framework APIs themselves are in skills tanstack-start / tanstack-router.

## Related

- [TanStack Router](./tanstack-router.md)
- [Installation](./installation.md)
