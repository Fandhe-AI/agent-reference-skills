# Pagination

A navigation component for moving between pages of content.

## Import

```tsx
import { Pagination } from "@chakra-ui/react"
```

## Usage

```tsx
<Pagination.Root count={20} pageSize={2} defaultPage={1}>
  <ButtonGroup variant="ghost" size="sm">
    <Pagination.PrevTrigger asChild>
      <IconButton><LuChevronLeft /></IconButton>
    </Pagination.PrevTrigger>
    <Pagination.Items
      render={(page) => (
        <IconButton variant={{ base: "ghost", _selected: "outline" }}>
          {page.value}
        </IconButton>
      )}
    />
    <Pagination.NextTrigger asChild>
      <IconButton><LuChevronRight /></IconButton>
    </Pagination.NextTrigger>
  </ButtonGroup>
</Pagination.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Total number of data items |
| `pageSize` | `number` | `10` | Controlled number of items per page |
| `defaultPageSize` | `number` | `10` | Initial page size (uncontrolled) |
| `page` | `number` | — | Controlled active page |
| `defaultPage` | `number` | `1` | Initial page (uncontrolled) |
| `siblingCount` | `number` | `1` | Pages shown beside the active page |
| `type` | `'button' \| 'link'` | `"button"` | Trigger element type |
| `getPageUrl` | `(details: PageUrlDetails) => string` | — | Generate href for link type |
| `onPageChange` | `(details: PageChangeDetails) => void` | — | Callback when page changes |
| `onPageSizeChange` | `(details: PageSizeChangeDetails) => void` | — | Callback when page size changes |

### Pagination.Items

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `render` | `(page) => ReactNode` | — | **Required.** Render function for each page item |
| `ellipsis` | `ReactElement` | — | Custom ellipsis element |

### Pagination.PageText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `"short" \| "compact" \| "long"` | — | Display format for page text |

## Notes

- Use `type="link"` with `getPageUrl` to render anchor elements for SEO-friendly pagination
- `Pagination.PageText` with `format="long"` shows a range like "1–10 of 50"
- Use `usePaginationContext()` to access pagination state from descendant components
- `siblingCount` controls how many page numbers appear on either side of the active page

## Related

- [Table](../data-display/table.md)
- [Steps](./steps.md)
