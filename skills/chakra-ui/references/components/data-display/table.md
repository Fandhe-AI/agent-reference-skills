# Table

A component for displaying tabular data with header, body, and footer sections.

## Import

```tsx
import { Table } from "@chakra-ui/react"
```

## Usage

```tsx
<Table.Root size="sm">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Product</Table.ColumnHeader>
      <Table.ColumnHeader>Category</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {items.map((item) => (
      <Table.Row key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.category}</Table.Cell>
        <Table.Cell textAlign="end">{item.price}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"line" \| "outline"` | `"line"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Cell padding size |
| `striped` | `"true" \| "false"` | — | Alternating row background |
| `interactive` | `"true" \| "false"` | — | Hover highlight on rows |
| `stickyHeader` | `"true" \| "false"` | — | Freeze the header row on scroll |
| `showColumnBorder` | `"true" \| "false"` | — | Show vertical borders between columns |
| `native` | `boolean` | — | Use native HTML elements (`<thead>`, `<tr>`, etc.) instead of compound components |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"line"` (default), `"outline"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- Wrap in `Table.ScrollArea` to enable horizontal scrolling for wide tables
- `Table.ColumnGroup` + `Table.Column` allow setting per-column widths via `htmlWidth`
- `Table.Caption` renders a `<caption>` element; use `captionSide="top"` to position above
- For sticky columns, apply `position: sticky` and z-index via custom CSS on `Table.Cell` / `Table.ColumnHeader`
- `native={true}` enables use with headless table libraries like TanStack Table

## Related

- [DataList](./data-list.md)
- [Pagination](../disclosure/pagination.md)
