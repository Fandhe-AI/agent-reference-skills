---
source: https://ui.shadcn.com/docs/components/base/slider
---

# Slider

An input where the user selects a value from within a given range.

## Signature / Usage

```bash
npx shadcn@latest add slider
```

Manual installation dependency:

```bash
npm install @base-ui/react
```

```tsx
import { Slider } from "@/components/ui/slider"
```

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

Range slider (array with two values):

```tsx
<Slider defaultValue={[25, 50]} max={100} step={5} />
```

## Notes

- Pass an array with two values for a range slider, or multiple values for multiple thumbs.
- The docs page has no props table; see the Base UI Slider API reference: https://base-ui.com/react/components/slider#api-reference
- Radix variant (https://ui.shadcn.com/docs/components/radix/slider) installs `radix-ui` and links to Radix Slider docs. React Aria variant: https://ui.shadcn.com/docs/components/aria/slider.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Switch](./switch.md)
