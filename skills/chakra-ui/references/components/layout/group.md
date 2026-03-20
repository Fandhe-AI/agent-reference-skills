# Group

A layout component that groups child elements together, with optional `attached` mode for visually connecting them.

## Import

```tsx
import { Group } from "@chakra-ui/react"
```

## Usage

```tsx
<Group attached>
  <Button variant="outline">Item 1</Button>
  <Button variant="outline">Item 2</Button>
</Group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attached` | `boolean` | — | Removes the gap and merges borders between children |
| `grow` | `boolean` | — | Makes all children grow to fill available space equally |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

## Notes

- `attached` is useful for button groups, badge groups, and split buttons
- `grow` makes all children expand equally (useful for full-width button groups)
- Works with `Button`, `Badge`, `Input`, and other components

## Related

- [Flex](./flex.md)
- [Stack](./stack.md)
