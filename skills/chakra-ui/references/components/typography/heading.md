# Heading

A semantic heading component that renders `<h2>` by default. Use the `as` prop for different heading levels.

## Import

```tsx
import { Heading } from "@chakra-ui/react"
```

## Usage

```tsx
<Heading>The quick brown fox jumps over the lazy dog</Heading>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl" \| "7xl"` | `"xl"` | Font size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `h2` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Accepts all Chakra style props.

## Variants / Sizes

```tsx
<Heading size="sm">Heading (sm)</Heading>
<Heading size="md">Heading (md)</Heading>
<Heading size="lg">Heading (lg)</Heading>
<Heading size="xl">Heading (xl)</Heading>   {/* default */}
<Heading size="2xl">Heading (2xl)</Heading>
<Heading size="3xl">Heading (3xl)</Heading>
```

## Notes

- Use `as="h1"`, `as="h2"`, etc. to set the semantic heading level independently of visual size
- Supports gradient text via `bgGradient` + `bgClip="text"`
- Combine with `Highlight` for highlighted words in headings

## Related

- [Text](./text.md)
- [Highlight](./highlight.md)
