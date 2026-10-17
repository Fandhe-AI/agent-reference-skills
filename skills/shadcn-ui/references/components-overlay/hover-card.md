---
source: https://ui.shadcn.com/docs/components/base/hover-card
---

# Hover Card

For sighted users to preview content available behind a link.

## Signature / Usage

```bash
npx shadcn@latest add hover-card
# manual
npm install @base-ui/react
```

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

Composition:

```text
HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

Trigger delays and positioning:

```tsx
<HoverCard>
  <HoverCardTrigger delay={100} closeDelay={200}>
    Hover
  </HoverCardTrigger>
  <HoverCardContent side="top" align="start">Content</HoverCardContent>
</HoverCard>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| delay | number | On `HoverCardTrigger`. Delay before the card opens. |
| closeDelay | number | On `HoverCardTrigger`. Delay before the card closes. |
| side | string | On `HoverCardContent`. Placement side (e.g. `"top"`). |
| align | string | On `HoverCardContent`. Alignment (e.g. `"start"`). |

The official page has no props table; see the Base UI Hover Card API reference (https://base-ui.com/react/components/hover-card#api-reference).

## Notes

- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/hover-card. React Aria variant: https://ui.shadcn.com/docs/components/aria/hover-card (underlying doc https://react-aria.adobe.com/PreviewTrigger).
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Popover](./popover.md)
- [Tooltip](./tooltip.md)
