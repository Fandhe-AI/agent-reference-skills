---
source: https://ui.shadcn.com/docs/components/base/badge
---

# Badge

Displays a badge or a component that looks like a badge.

## Signature / Usage

```bash
npx shadcn@latest add badge
```

Official usage (the variant value is a placeholder listing the choices):

```tsx
import { Badge } from "@/components/ui/badge"

<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

Adapted (pass one value):

```tsx
<Badge variant="default">Badge</Badge>
```

Icon and link (Base UI `render` prop):

```tsx
<Badge variant="secondary">
  <BadgeCheck data-icon="inline-start" />
  Verified
</Badge>

<Badge render={<a href="#link" />}>
  Open Link <ArrowUpRightIcon data-icon="inline-end" />
</Badge>
```

## Options / Props

### Badge

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `className` | `string` | - |

## Notes

- Use `data-icon="inline-start"` or `data-icon="inline-end"` on an icon or `Spinner` placed inside the badge.
- Colors are customized with classes such as `bg-green-50 dark:bg-green-800`.
- The upstream usage example is a placeholder string listing the choices and is not a valid value; the adapted fence shows the actual usage (pass a single value from the Props table).
- Link rendering uses the Base UI `render` prop in this page's examples.
- Radix variant: https://ui.shadcn.com/docs/components/radix/badge ; React Aria variant: https://ui.shadcn.com/docs/components/aria/badge
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [spinner](./spinner.md)
- [avatar](./avatar.md)
