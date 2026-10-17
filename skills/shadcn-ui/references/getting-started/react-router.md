---
source: https://ui.shadcn.com/docs/installation/react-router
---

# React Router

Install and configure shadcn/ui for React Router.

## Signature / Usage

```bash
npx shadcn@latest init -t react-router
npx shadcn@latest init -t react-router --monorepo
npx shadcn@latest add card
```

```tsx
import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}
```

## Notes

- shadcn/create command: `npx shadcn@latest init --preset [CODE] --template react-router`.
- Existing Project: `npm create react-router@latest` already configures Tailwind CSS and the default `~/*` import alias; for older or custom apps make sure both are configured, then run `npx shadcn@latest init` and `npx shadcn@latest add button`.
- Imports use the `~/components/ui/...` alias; in a monorepo import from `@workspace/ui/components/card` in `apps/web/app/routes/home.tsx`.
- Framework APIs themselves are in skills react-router / tanstack-router. For Remix, see the separate Remix guide.

## Related

- [Remix](./remix.md)
- [Installation](./installation.md)
