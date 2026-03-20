# Center

A layout component that centers its children both horizontally and vertically using flexbox.

## Import

```tsx
import { Center, Circle, Square } from "@chakra-ui/react"
```

## Usage

```tsx
<Center bg="bg.emphasized" h="100px" maxW="320px">
  <Box>This will be centered</Box>
</Center>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | `div` | The underlying element to render |
| `asChild` | `boolean` | — | Use the provided child element as the default rendered element |
| `inline` | `boolean` | — | If true, renders as `inline-flex` instead of `flex` |

Accepts all Chakra style props.

## Related Components

**Circle** — A centered square box with `border-radius: 9999px`:

```tsx
<Circle size="10" bg="blue.700" color="white">
  <LuPhone />
</Circle>
```

**Square** — A centered box with equal width and height:

```tsx
<Square size="10" bg="purple.700" color="white">
  <LuPhone />
</Square>
```

## Notes

- Use `Circle` for icon containers with rounded appearance
- Use `Square` for icon containers with square appearance
- Both `Circle` and `Square` accept a `size` prop for equal width/height

## Related

- [AbsoluteCenter](./absolute-center.md)
- [Box](./box.md)
- [Flex](./flex.md)
