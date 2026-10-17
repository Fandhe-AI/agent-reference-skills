---
source: https://ui.shadcn.com/docs/components/base/skeleton
---

# Skeleton

Use to show a placeholder while content is loading.

## Signature / Usage

```bash
npx shadcn@latest add skeleton
```

```tsx
import { Skeleton } from "@/components/ui/skeleton"

<Skeleton className="h-[20px] w-[100px] rounded-full" />
```

Avatar placeholder:

```tsx
<div className="flex w-fit items-center gap-4">
  <Skeleton className="size-10 shrink-0 rounded-full" />
  <div className="grid gap-2">
    <Skeleton className="h-4 w-[150px]" />
    <Skeleton className="h-4 w-[100px]" />
  </div>
</div>
```

## Notes

- No API table; size and shape are set entirely with utility classes via `className`.
- Official examples: Avatar, Card, Text, Form, Table.
- Radix variant: https://ui.shadcn.com/docs/components/radix/skeleton ; React Aria variant: https://ui.shadcn.com/docs/components/aria/skeleton
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [spinner](./spinner.md)
- [progress](./progress.md)
- [card](./card.md)
