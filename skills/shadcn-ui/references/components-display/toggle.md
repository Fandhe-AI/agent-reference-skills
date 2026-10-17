---
source: https://ui.shadcn.com/docs/components/base/toggle
---

# Toggle

A two-state button that can be either on or off (Base UI Toggle).

## Signature / Usage

```bash
npx shadcn@latest add toggle
```

Manual install dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Toggle } from "@/components/ui/toggle"

<Toggle>Toggle</Toggle>
```

```tsx
<Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
  <BookmarkIcon className="group-aria-pressed/toggle:fill-foreground" />
  Bookmark
</Toggle>
```

## Options / Props

The docs have no API table; the rows below list only props observed in the official examples. See the [Base UI Toggle](https://base-ui.com/react/components/toggle#api-reference) documentation.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| variant | string | — | Observed value: `"outline"`. |
| size | string | — | Observed value: `"sm"`. |

## Notes

- Radix variant: https://ui.shadcn.com/docs/components/radix/toggle ; React Aria variant: https://ui.shadcn.com/docs/components/aria/toggle
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [toggle-group](./toggle-group.md)
