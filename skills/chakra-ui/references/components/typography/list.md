# List

A styled list component. Composed of `List.Root` and `List.Item`, with optional `List.Indicator` for custom markers.

## Import

```tsx
import { List } from "@chakra-ui/react"
```

## Usage

```tsx
<List.Root>
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third item</List.Item>
</List.Root>
```

## Props (Root)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"marker" \| "plain"` | `"marker"` | Whether to show list markers |
| `align` | `"center" \| "start" \| "end"` | — | Alignment of list items |
| `colorPalette` | `string` | `"gray"` | Color palette |
| `unstyled` | `boolean` | — | Remove component styles |
| `as` | `React.ElementType` | `ul` | The underlying element (`ul` or `ol`) |

## Notes

- Render as ordered list with `as="ol"`
- Use `List.Indicator` with `asChild` for custom icon markers:
  ```tsx
  <List.Indicator asChild color="green.500">
    <LuCircleCheck />
  </List.Indicator>
  ```
- `variant="plain"` removes default markers (use with `List.Indicator`)
- Supports nested `List.Root` for nested lists

## Related

- [Text](./text.md)
- [Prose](./prose.md)
