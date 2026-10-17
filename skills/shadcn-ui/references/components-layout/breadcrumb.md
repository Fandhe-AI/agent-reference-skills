---
source: https://ui.shadcn.com/docs/components/base/breadcrumb
---

# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Signature / Usage

```bash
npx shadcn@latest add breadcrumb
```

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/" />}>Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink render={<a href="/components" />}>
        Components
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

Also exported: `BreadcrumbEllipsis` (collapsed state). Use the `render` prop on `BreadcrumbLink` for a routing-library link such as Next.js `Link`.

## Options / Props

| Component | Prop | Type | Default |
| --- | --- | --- | --- |
| `Breadcrumb` | `className` | `string` | - |
| `BreadcrumbList` | `className` | `string` | - |
| `BreadcrumbItem` | `className` | `string` | - |
| `BreadcrumbLink` | `className` | `string` | - |
| `BreadcrumbPage` | `className` | `string` | - |
| `BreadcrumbSeparator` | `children` | `React.ReactNode` | - |
| `BreadcrumbSeparator` | `className` | `string` | - |
| `BreadcrumbEllipsis` | `className` | `string` | - |

## Notes

- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).
- No underlying primitive: the docs page has no `links.doc` / Base UI dependency and the manual install has no `npm install` step.
- Radix variant (https://ui.shadcn.com/docs/components/radix/breadcrumb): uses `asChild` on `BreadcrumbLink` instead of `render`.
- React Aria variant (https://ui.shadcn.com/docs/components/aria/breadcrumb): link composition uses `render={(props) => ...}` function form in its examples.
- Custom separator: pass children, e.g. `<BreadcrumbSeparator><DotIcon /></BreadcrumbSeparator>`.

## Related

- [Collapsible](./collapsible.md)
