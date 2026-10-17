---
source: https://ui.shadcn.com/docs/installation/next
---

# Next.js

Install and configure shadcn/ui for Next.js.

## Signature / Usage

```bash
npx shadcn@latest init -t next
npx shadcn@latest init -t next --monorepo
npx shadcn@latest add card
```

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Home() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
        <CardDescription>
          Track progress and recent activity for your Next.js app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Your design system is ready. Start building your next component.
      </CardContent>
    </Card>
  )
}
```

## Notes

- Three paths: shadcn/create (`npx shadcn@latest init --preset [CODE] --template next`; the exact command includes options such as `--base`, `--monorepo`, or `--rtl`), the CLI (`init -t next`), or Existing Project.
- Monorepo: run `add` from `apps/web` or from the repo root with `npx shadcn@latest add card -c apps/web`; import from `@workspace/ui/components/card` in `apps/web/app/page.tsx`.
- Existing Project: create with `npx create-next-app@latest` (add `--src-dir` for a `src/` directory; the `@/*` alias then points to `./src/*`), make sure `tsconfig.json` has `"paths": { "@/*": ["./*"] }`, then run `npx shadcn@latest init` and `npx shadcn@latest add button`.
- Import `Button` from `@/components/ui/button` after `npx shadcn@latest add button`.
- Framework APIs themselves are in skill nextjs-app.

## Related

- [Installation](./installation.md)
- [Vite](./vite.md)
