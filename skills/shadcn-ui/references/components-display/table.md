---
source: https://ui.shadcn.com/docs/components/base/table
---

# Table

A responsive table component.

## Signature / Usage

```bash
npx shadcn@latest add table
```

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

```text
Table
├── TableCaption
├── TableHeader
│   └── TableRow
│       └── TableHead
├── TableBody
│   └── TableRow
│       └── TableCell
└── TableFooter
```

## Notes

- `TableFooter` adds a footer row (the demo uses `<TableCell colSpan={3}>Total</TableCell>`).
- The docs have no API table. For sorting, filtering and pagination, combine with `@tanstack/react-table`; see [data-table](./data-table.md).
- Radix variant: https://ui.shadcn.com/docs/components/radix/table ; React Aria variant: https://ui.shadcn.com/docs/components/aria/table
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [data-table](./data-table.md)
- [skeleton](./skeleton.md)
