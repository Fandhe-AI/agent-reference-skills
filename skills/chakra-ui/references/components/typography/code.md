# Code

An inline code element for displaying short code snippets within text.

## Import

```tsx
import { Code } from "@chakra-ui/react"
```

## Usage

```tsx
<Code>{`console.log("Hello, world!")`}</Code>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"solid" \| "subtle" \| "outline" \| "surface" \| "plain"` | `"subtle"` | Visual style |
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"sm"` | Font size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `as` | `React.ElementType` | `code` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Variants / Sizes

- `variant="subtle"` — light background (default)
- `variant="solid"` — filled background
- `variant="outline"` — border only
- `variant="surface"` — subtle surface background

## Notes

- For multi-line syntax-highlighted code blocks, use [`CodeBlock`](./code-block.md)
- Supports all color palettes

## Related

- [CodeBlock](./code-block.md)
- [Kbd](./kbd.md)
