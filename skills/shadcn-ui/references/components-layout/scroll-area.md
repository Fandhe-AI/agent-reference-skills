---
source: https://ui.shadcn.com/docs/components/base/scroll-area
---

# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

## Signature / Usage

```bash
npx shadcn@latest add scroll-area
# manual: npm install @base-ui/react
```

```tsx
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>
```

Horizontal scrolling: add `<ScrollBar orientation="horizontal" />` inside `ScrollArea`.

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- The docs' API Reference defers to Base UI Scroll Area: https://base-ui.com/react/components/scroll-area#api-reference
- Radix variant (https://ui.shadcn.com/docs/components/radix/scroll-area): installs `radix-ui`.
- React Aria variant: https://ui.shadcn.com/docs/components/aria/scroll-area
- RTL example passes `dir` to `ScrollArea`.

## Related

- [Separator](./separator.md)
