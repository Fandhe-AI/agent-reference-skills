---
source: https://ui.shadcn.com/docs/components/base/empty
---

# Empty

Use the Empty component to display an empty state.

## Signature / Usage

```bash
npx shadcn@latest add empty
```

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

```text
Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent
```

## Options / Props

### Empty / EmptyHeader / EmptyTitle / EmptyDescription / EmptyContent

| Prop | Type | Default |
| --- | --- | --- |
| `className` | `string` | |

### EmptyMedia

| Prop | Type | Default |
| --- | --- | --- |
| `variant` | `"default" \| "icon"` | `default` |
| `className` | `string` | |

## Notes

- `EmptyMedia` can hold an icon, image, avatar or avatar group; `EmptyContent` can hold buttons, an `InputGroup` or a link.
- Outline: add `border border-dashed` via `className`; background: use `bg-*` utilities.
- In the official example, a `Button` with `render={<a href="#" />}` also sets `nativeButton={false}`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/empty ; React Aria variant: https://ui.shadcn.com/docs/components/aria/empty
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [spinner](./spinner.md)
- [avatar](./avatar.md)
- [item](./item.md)
