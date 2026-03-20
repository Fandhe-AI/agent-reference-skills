# Breadcrumb

A navigation component that shows the user's current location within a hierarchy.

## Import

```tsx
import { Breadcrumb } from "@chakra-ui/react"
```

## Usage

```tsx
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Docs</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>Props</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

## Props

### Root

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"underline" \| "plain"` | `"plain"` | Visual variant |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the component |
| `colorPalette` | `"gray" \| "red" \| ...` | `"gray"` | Color palette |

## Variants / Sizes

- **variant**: `"plain"` (default), `"underline"`
- **size**: `"sm"`, `"md"` (default), `"lg"`

## Notes

- Use `Breadcrumb.CurrentLink` for the last (current page) item — it renders as non-interactive text
- Use `Breadcrumb.Ellipsis` to truncate middle items in long breadcrumb trails
- Custom separators can be passed as children to `Breadcrumb.Separator`
- `Breadcrumb.Link` supports `asChild` to render as any element (e.g., router links)

## Related

- [Steps](./steps.md)
