# Text

The primary text component. A `<p>` element with Chakra style props.

## Import

```tsx
import { Text } from "@chakra-ui/react"
```

## Usage

```tsx
<Text>Sphinx of black quartz, judge my vow.</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `p` | The underlying element to render (`p`, `span`, `label`, `div`, etc.) |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Accepts all Chakra style props, including `textStyle`, `fontWeight`, `lineClamp`, `truncate`.

## Variants / Sizes

Use `textStyle` prop for size:

```tsx
<Text textStyle="xs">Extra small</Text>
<Text textStyle="sm">Small</Text>
<Text textStyle="md">Medium</Text>
<Text textStyle="lg">Large</Text>
<Text textStyle="xl">XL</Text>
<Text textStyle="2xl">2XL</Text>
```

## Notes

- Use `lineClamp={2}` to truncate text to a specific number of lines
- Use `truncate` prop for single-line ellipsis truncation
- `as="span"` for inline text, `as="label"` for form labels

## Related

- [Heading](./heading.md)
- [Em](./em.md)
- [Mark](./mark.md)
