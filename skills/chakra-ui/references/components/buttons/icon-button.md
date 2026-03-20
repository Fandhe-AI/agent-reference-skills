# IconButton

A square button designed to display a single icon.

## Import

```tsx
import { IconButton } from "@chakra-ui/react"
```

## Usage

```tsx
<IconButton aria-label="Search">
  <SearchIcon />
</IconButton>
```

## Props

`IconButton` inherits all `Button` props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aria-label` | `string` | **required** | Accessibility label for screen readers |
| `variant` | `"solid" \| "subtle" \| "surface" \| "outline" \| "ghost" \| "plain"` | `"solid"` | Visual style |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | `"md"` | Button size |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `loading` | `boolean` | `false` | Shows a loading spinner |
| `disabled` | `boolean` | — | Disables the button |

## Notes

- `aria-label` is **required** for accessibility — describes the button's action to screen readers
- Icon is passed as children
- Use `size` to control the square dimensions
- Commonly used for toolbar actions, copy buttons, and nav icons

## Related

- [Button](./button.md)
- [CloseButton](./close-button.md)
