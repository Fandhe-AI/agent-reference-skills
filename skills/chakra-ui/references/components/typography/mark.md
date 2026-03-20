# Mark

A semantic inline element for marking or highlighting text, renders as `<mark>`.

## Import

```tsx
import { Mark } from "@chakra-ui/react"
```

## Usage

```tsx
<Text>
  The <Mark variant="subtle">design system</Mark> is a collection of UI elements
</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"subtle" \| "solid" \| "text" \| "plain"` | — | Visual style |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `mark` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

- `variant="subtle"` — light colored background
- `variant="solid"` — solid colored background
- `variant="text"` — colored text only, no background
- `variant="plain"` — no styling applied

## Notes

- Renders as `<mark>` for semantic relevance/search highlighting
- Use with `useHighlight` hook for dynamic text matching

## Related

- [Highlight](./highlight.md)
- [Em](./em.md)
- [Text](./text.md)
