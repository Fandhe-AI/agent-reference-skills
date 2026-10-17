---
source: https://ui.shadcn.com/docs/installation/tanstack-router
---

# TanStack Router

Install and configure shadcn/ui for TanStack Router.

## Signature / Usage

```bash
npx create-tsrouter-app@latest my-app --template file-router --tailwind --add-ons shadcn
npx shadcn@latest add button
```

```tsx
import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

## Notes

- The example file is `src/routes/index.tsx`.
- Unlike the TanStack Start guide, this project is created with the `shadcn` add-on (`--add-ons shadcn`).
- Framework APIs themselves are in skills tanstack-router / tanstack-start.

## Related

- [TanStack Start](./tanstack-start.md)
