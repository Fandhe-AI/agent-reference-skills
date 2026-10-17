---
source: https://ui.shadcn.com/docs/installation/next
---

# Next.js Init and First Component

Scaffold a Next.js project with the shadcn CLI, add the `card` component, and render it.

```bash
npx shadcn@latest init -t next -n my-app
cd my-app
npx shadcn@latest add card
```

```tsx
// app/page.tsx
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

- Adapted (not in the official docs): project name given with -n (documented init option) and cd my-app added so add card targets the new project.
- For an existing Next.js project (created with `npx create-next-app@latest`), run `npx shadcn@latest init` instead, then `npx shadcn@latest add button`. The `@/*` import alias must exist in `tsconfig.json`.
- With `--monorepo` the command is `npx shadcn@latest init -t next --monorepo`; run `add` from `apps/web` or pass `-c apps/web`, and import from `@workspace/ui/components/card`.
- Components are copied into your project (`components/ui/`). This is distinct from the npm-installed `@ark-ui/react` (skill ark-ui) and `@chakra-ui/react` (skill chakra-ui); Next.js APIs themselves are in skill nextjs-app.
