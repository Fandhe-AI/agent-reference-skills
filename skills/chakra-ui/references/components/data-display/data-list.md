# DataList

A component for displaying key-value pairs in a structured list format.

## Import

```tsx
import { DataList } from "@chakra-ui/react"
```

## Usage

```tsx
<DataList.Root orientation="horizontal">
  <DataList.Item>
    <DataList.ItemLabel>Name</DataList.ItemLabel>
    <DataList.ItemValue>John Doe</DataList.ItemValue>
  </DataList.Item>
  <DataList.Item>
    <DataList.ItemLabel>Email</DataList.ItemLabel>
    <DataList.ItemValue>john@example.com</DataList.ItemValue>
  </DataList.Item>
</DataList.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` | Layout of label/value pairs |
| `variant` | `"subtle" \| "bold"` | `"subtle"` | Visual variant for labels |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"subtle"` (default), `"bold"`
- **orientation**: `"vertical"` (default), `"horizontal"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- `DataList.ItemLabel` is the key; `DataList.ItemValue` is the value
- Use `divideY="1px"` on `DataList.Root` to add horizontal separators between items
- Horizontal orientation places label and value side by side on each row

## Related

- [Table](./table.md)
- [Stat](./stat.md)
