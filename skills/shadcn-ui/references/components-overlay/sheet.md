---
source: https://ui.shadcn.com/docs/components/base/sheet
---

# Sheet

Extends the Dialog component to display content that complements the main content of the screen.

## Signature / Usage

```bash
npx shadcn@latest add sheet
# manual
npm install @base-ui/react
```

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

Composition:

```text
Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    └── SheetFooter
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| side | `"top" \| "right" \| "bottom" \| "left"` | On `SheetContent`. Edge of the screen where the sheet appears. |
| showCloseButton | boolean | On `SheetContent`. `showCloseButton={false}` hides the close button. |

The official page has no props table; see the Base UI Dialog API reference (https://base-ui.com/react/components/dialog#api-reference).

## Notes

- Sheet is built on the Base UI Dialog (`links.doc` points to the Dialog page).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/sheet. React Aria variant: https://ui.shadcn.com/docs/components/aria/sheet.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dialog](./dialog.md)
- [Drawer](./drawer.md)
