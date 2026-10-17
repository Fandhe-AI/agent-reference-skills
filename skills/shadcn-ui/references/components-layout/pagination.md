---
source: https://ui.shadcn.com/docs/components/base/pagination
---

# Pagination

Pagination with page navigation, next and previous links.

## Signature / Usage

```bash
npx shadcn@latest add pagination
```

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>
        2
      </PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `isActive` (on `PaginationLink`) | `boolean` | Marks the current page |
| `text` (on `PaginationPrevious` / `PaginationNext`) | `string` | Label text (default `"Previous"` / `"Next"`); added for RTL support |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- No underlying primitive: manual install has no `npm install` step. Pagination only renders links; page state and data fetching are yours.
- By default `PaginationLink` renders an `<a />`. For Next.js `<Link />`, edit `pagination.tsx`: import `Link from "next/link"`, change `PaginationLinkProps` to `React.ComponentProps<typeof Link>` and render `<Link>` instead of `<a>`. The docs note CLI updates to automate this were in progress.
- Changelog (RTL Support): when upgrading, add `text = "Previous"` / `text = "Next"` props to `PaginationPrevious` / `PaginationNext` (typed `& { text?: string }`) and render `{text}` in the span.
- Variants: https://ui.shadcn.com/docs/components/radix/pagination, https://ui.shadcn.com/docs/components/aria/pagination
- "Icons Only" pattern (previous/next without page numbers) is suited to data tables with a rows-per-page selector.

## Related

- [Breadcrumb](./breadcrumb.md)
