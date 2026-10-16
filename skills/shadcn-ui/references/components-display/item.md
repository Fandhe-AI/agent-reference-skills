---
source: https://ui.shadcn.com/docs/components/base/item
---

# Item

A versatile flex container for displaying content with media, title, description, and actions. Group items with `ItemGroup` to build a list.

## Signature / Usage

```bash
npx shadcn@latest add item
```

```tsx
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>
```

```text
ItemGroup
└── Item
    ├── ItemHeader
    ├── ItemMedia
    ├── ItemContent
    │   ├── ItemTitle
    │   └── ItemDescription
    ├── ItemActions
    └── ItemFooter
```

## Options / Props

### Item

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size` | `"default" \| "sm" \| "xs"` | `"default"` |
| `render` | `React.ReactElement` | |

### ItemMedia

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

`ItemGroup`, `ItemSeparator`, `ItemContent`, `ItemTitle`, `ItemDescription`, `ItemActions`, `ItemHeader` and `ItemFooter` have no props table in the docs.

## Notes

- Item vs Field: use `Field` for form inputs (checkbox, input, radio, select); use `Item` when you only display a title, description and actions.
- Link rendering uses `render`, e.g. `<Item variant="outline" size="sm" render={<a href="#" />}>`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/item ; React Aria variant: https://ui.shadcn.com/docs/components/aria/item
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [empty](./empty.md)
- [avatar](./avatar.md)
- [card](./card.md)
