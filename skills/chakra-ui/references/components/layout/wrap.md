# Wrap

A layout component that wraps children and adds consistent spacing between them. Children wrap to the next line when the container is too narrow.

## Import

```tsx
import { Wrap, WrapItem } from "@chakra-ui/react"
```

## Usage

```tsx
<Wrap gap="5">
  <Badge>Badge 1</Badge>
  <Badge>Badge 2</Badge>
  <Badge>Badge 3</Badge>
</Wrap>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `justify` | `SystemStyleObject["justifyContent"]` | — | Shorthand for `justifyContent` |
| `align` | `SystemStyleObject["alignItems"]` | — | Shorthand for `alignItems` |
| `direction` | `SystemStyleObject["flexDirection"]` | — | Shorthand for `flexDirection` |
| `as` | `React.ElementType` | — | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |

Also accepts `gap`, `rowGap`, `columnGap` for spacing control.

## Notes

- Children automatically wrap when they exceed the container width
- Use `WrapItem` to wrap individual children if you need additional styling per item
- Supports responsive `gap` values
- Use `justify="center"` to center-align wrapped items

## Related

- [Flex](./flex.md)
- [SimpleGrid](./simple-grid.md)
- [Stack](./stack.md)
