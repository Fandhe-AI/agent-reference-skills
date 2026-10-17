---
source: https://ui.shadcn.com/docs/components/base/card
---

# Card

Displays a card with header, content, and footer.

## Signature / Usage

```bash
npx shadcn@latest add card
```

```tsx
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

## Options / Props

### Card

| Prop | Type | Default |
| --- | --- | --- |
| `size` | `"default" \| "sm"` | `"default"` |
| `className` | `string` | - |

### CardHeader / CardTitle / CardDescription / CardAction / CardContent / CardFooter

`CardAction` places content in the top-right of the header.

| Prop | Type | Default |
| --- | --- | --- |
| `className` | `string` | - |

## Notes

- Spacing: besides `size`, the `--card-spacing` CSS variable controls section gaps and inset, e.g. `<Card className="[--card-spacing:--spacing(6)]">`. Use `-mx-(--card-spacing)` for edge-to-edge content and `-mb-(--card-spacing)` on `CardContent` above a footer.
- Changelog "Spacing Variable": when upgrading an older `Card`, replace hard-coded gap/padding classes in Card root, `CardHeader`, `CardContent` and `CardFooter` with `--card-spacing` (diffs are in the official page; root defaults are `[--card-spacing:--spacing(4)]` and `data-[size=sm]:[--card-spacing:--spacing(3)]`).
- Radix variant: https://ui.shadcn.com/docs/components/radix/card ; React Aria variant: https://ui.shadcn.com/docs/components/aria/card
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [badge](./badge.md)
- [skeleton](./skeleton.md)
- [item](./item.md)
