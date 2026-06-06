# Table

Render structured data using the composable Table component with striped and interactive variants.

```tsx
import { Table } from "@chakra-ui/react"

const products = [
  { name: "Laptop",    price: "$999", stock: 12 },
  { name: "Monitor",   price: "$499", stock: 5  },
  { name: "Keyboard",  price: "$129", stock: 34 },
]

export function ProductTable() {
  return (
    <Table.Root size="md" variant="outline" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Price</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Stock</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {products.map((item) => (
          <Table.Row key={item.name}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
            <Table.Cell textAlign="end">{item.stock}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={2} fontWeight="bold">Total</Table.Cell>
          <Table.Cell textAlign="end">{products.reduce((a, p) => a + p.stock, 0)}</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  )
}
```

## Notes

- `variant` options: `"line"` (default), `"outline"`
- `size` options: `"sm"`, `"md"`, `"lg"`
- `striped` adds alternating row background colors
- `interactive` adds hover styles to rows for clickable table scenarios
- `stickyHeader` keeps the header visible when the table scrolls
