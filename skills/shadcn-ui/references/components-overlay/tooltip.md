---
source: https://ui.shadcn.com/docs/components/base/tooltip
---

# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Signature / Usage

```bash
npx shadcn@latest add tooltip
# manual
npm install @base-ui/react
```

Add `TooltipProvider` to the root of your app:

```tsx
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

Composition:

```text
Tooltip
├── TooltipTrigger
└── TooltipContent
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| side | `"left" \| "top" \| "bottom" \| "right"` | On `TooltipContent`. Position of the tooltip. |

The official page has no props table; see the Base UI Tooltip API reference (https://base-ui.com/react/components/tooltip#api-reference).

## Notes

- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/tooltip (`npm install radix-ui`). React Aria variant: https://ui.shadcn.com/docs/components/aria/tooltip (underlying doc https://react-aria.adobe.com/Tooltip).
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Popover](./popover.md)
- [Hover Card](./hover-card.md)
