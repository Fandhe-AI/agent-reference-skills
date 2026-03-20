# Em

A semantic inline element for emphasized text, renders as `<em>`.

## Import

```tsx
import { Em } from "@chakra-ui/react"
```

## Usage

```tsx
<Text>
  The <Em>design system</Em> is a collection of UI elements
</Text>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `em` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Accepts all Chakra style props.

## Notes

- Renders as `<em>` by default for semantic emphasis
- Accepts all standard Chakra style props for customization

## Related

- [Text](./text.md)
- [Mark](./mark.md)
- [Highlight](./highlight.md)
