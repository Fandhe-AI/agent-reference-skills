---
source: https://ui.shadcn.com/docs/installation/remix
---

# Remix

Install and configure shadcn/ui for Remix. This guide is for Remix; for React Router, see the React Router guide.

## Signature / Usage

```bash
npx create-remix@latest my-app
npx shadcn@latest init
npx shadcn@latest add button
```

```tsx
import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

## Notes

- The example file is `app/routes/index.tsx`.
- Framework APIs themselves are in skill react-router (React Router v7 / v8 successor of Remix).

## Related

- [React Router](./react-router.md)
