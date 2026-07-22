# Pagination

A navigation interface enabling users to browse through pages of content, with data-slicing helpers.

## Signature / Usage

```tsx
import { Pagination } from "@ark-ui/react"

const App = () => (
  <Pagination.Root count={100} pageSize={10} siblingCount={1}>
    <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
    <Pagination.Context>
      {(pagination) =>
        pagination.pages.map((page, i) =>
          page.type === "page" ? (
            <Pagination.Item key={i} {...page}>
              {page.value}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis key={i} index={i}>
              &#8230;
            </Pagination.Ellipsis>
          ),
        )
      }
    </Pagination.Context>
    <Pagination.NextTrigger>Next</Pagination.NextTrigger>
  </Pagination.Root>
)
```

## Anatomy

- `Pagination.Root` — container element
- `Pagination.PrevTrigger` — previous page button
- `Pagination.Item` — individual page number button
- `Pagination.NextTrigger` — next page button
- `Pagination.Ellipsis` — indicator for skipped page ranges
- `Pagination.FirstTrigger` / `Pagination.LastTrigger` — optional jump-to-end navigation

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | — | Total data items |
| `defaultPage` | `number` | `1` | Initial page (uncontrolled) |
| `defaultPageSize` | `number` | `10` | Initial items per page |
| `siblingCount` | `number` | `1` | Pages displayed beside active page |
| `boundaryCount` | `number` | `1` | Pages shown at start/end |
| `type` | `"button" \| "link"` | `"button"` | Render mode; `"link"` enables SEO-friendly anchors |

## Notes

- Controlled pagination via `page` prop with `onPageChange` callback.
- `RootProvider` + `usePagination` hook allows accessing state/methods from anywhere in the tree.
- `slice()` method segments a data array based on current page and page size; `setPageSize()` / `pageSize` / `onPageSizeChange` control items per page.
- `type="link"` with `getPageUrl` generates `href` attributes for link-based navigation.
- Programmatic access via `Pagination.Context` or `usePaginationContext`: `page`, `totalPages`, `pageRange`, `goToNextPage()`, `goToPrevPage()`, `goToFirstPage()`, `goToLastPage()`, `slice()`.
- When used via Chakra UI v3, import from `@chakra-ui/react` instead; Chakra adds `size` / `variant` / `colorPalette` props.

## Related

- [Carousel](./carousel.md)
