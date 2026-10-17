---
source: https://ui.shadcn.com/docs/components/base/direction
---

# Direction

A provider component that sets the text direction (`ltr` or `rtl`) for your application, needed for right-to-left languages such as Arabic, Hebrew, and Persian.

## Signature / Usage

```bash
npx shadcn@latest add direction
# manual: npm install @base-ui/react
```

```tsx
import { DirectionProvider } from "@/components/ui/direction"

<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

`useDirection` returns the current direction:

```tsx
import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `direction` | `"ltr"` / `"rtl"` | Text direction applied by `DirectionProvider` |

The docs' API Reference link points to Base UI DirectionProvider: https://base-ui.com/react/utils/direction-provider#api-reference

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- Other components' pages carry an RTL section; RTL setup guide is `/docs/rtl`.
- Radix variant (https://ui.shadcn.com/docs/components/radix/direction): installs `radix-ui`, same `DirectionProvider direction="rtl"` usage.
- React Aria variant: https://ui.shadcn.com/docs/components/aria/direction (installs `react-aria-components`).
