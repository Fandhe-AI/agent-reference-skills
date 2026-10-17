---
source: https://ui.shadcn.com/docs/components/base/separator
---

# Separator

Visually or semantically separates content.

## Signature / Usage

```bash
npx shadcn@latest add separator
# manual: npm install @base-ui/react
```

```tsx
import { Separator } from "@/components/ui/separator"

<Separator />
<Separator orientation="vertical" />
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `orientation` | `"vertical"` | Use `orientation="vertical"` for a vertical separator (horizontal by default) |

The docs' API Reference defers to Base UI Separator: https://base-ui.com/react/components/separator#api-reference

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Radix variant (https://ui.shadcn.com/docs/components/radix/separator): installs `radix-ui`; same `orientation` usage.
- React Aria variant: https://ui.shadcn.com/docs/components/aria/separator (installs `react-aria-components`).
