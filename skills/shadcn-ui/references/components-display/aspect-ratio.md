---
source: https://ui.shadcn.com/docs/components/base/aspect-ratio
---

# Aspect Ratio

Displays content within a desired ratio.

## Signature / Usage

```bash
npx shadcn@latest add aspect-ratio
```

Manual install dependency:

```bash
npm install @base-ui/react
```

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio"

<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

## Options / Props

### AspectRatio

| Prop | Type | Default | Required |
| --- | --- | --- | --- |
| `ratio` | `number` | - | Yes |
| `className` | `string` | - | No |

## Notes

- Square: `ratio={1 / 1}`; portrait: `ratio={9 / 16}`.
- More: https://base-ui.com/react/components/aspect-ratio#api-reference
- Radix variant: https://ui.shadcn.com/docs/components/radix/aspect-ratio ; React Aria variant: https://ui.shadcn.com/docs/components/aria/aspect-ratio
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [carousel](./carousel.md)
- [skeleton](./skeleton.md)
