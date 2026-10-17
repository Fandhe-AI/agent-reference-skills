---
source: https://ui.shadcn.com/docs/components/base/popover
---

# Popover

Displays rich content in a portal, triggered by a button.

## Signature / Usage

```bash
npx shadcn@latest add popover
# manual
npm install @base-ui/react
```

```tsx
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

Composition:

```text
Popover
├── PopoverTrigger
└── PopoverContent
```

## Notes

- The official page has no props table; see the Base UI Popover API reference (https://base-ui.com/react/components/popover#api-reference).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/popover (`asChild`). React Aria variant: https://ui.shadcn.com/docs/components/aria/popover.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Tooltip](./tooltip.md)
- [Hover Card](./hover-card.md)
