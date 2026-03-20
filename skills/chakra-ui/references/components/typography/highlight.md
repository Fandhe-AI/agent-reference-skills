# Highlight

Highlights matching words or phrases within a text string with custom styles.

## Import

```tsx
import { Highlight, useHighlight } from "@chakra-ui/react"
```

## Usage

```tsx
<Highlight
  query="spotlight"
  styles={{ px: "0.5", bg: "orange.subtle", color: "orange.fg" }}
>
  With the Highlight component, you can spotlight words.
</Highlight>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | **required** | The text to search within |
| `query` | `string \| string[]` | **required** | The word(s) to highlight |
| `styles` | `SystemStyleObject` | — | Styles applied to matched text |
| `ignoreCase` | `boolean` | — | Case-insensitive matching |
| `matchAll` | `boolean` | — | Match all instances of the query |
| `exactMatch` | `boolean` | — | Match whole words only |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- Pass an array to `query` to highlight multiple terms simultaneously
- Use `useHighlight()` hook for custom rendering of highlighted chunks
- Highlighted portions render as `<mark>` elements by default
- Use with `Heading` for hero sections with styled keywords

## Related

- [Mark](./mark.md)
- [Heading](./heading.md)
- [Text](./text.md)
