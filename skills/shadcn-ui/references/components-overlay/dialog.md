---
source: https://ui.shadcn.com/docs/components/base/dialog
---

# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Signature / Usage

```bash
npx shadcn@latest add dialog
# manual
npm install @base-ui/react
```

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

Composition:

```text
Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
```

Custom trigger / close element via the Base UI `render` prop (`DialogClose` is also exported):

```tsx
<DialogTrigger render={<Button variant="outline" />}>Open Dialog</DialogTrigger>
<DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| showCloseButton | boolean | On `DialogContent`. `showCloseButton={false}` hides the default close button. |

The official page has no other props table; see the Base UI Dialog API reference (https://base-ui.com/react/components/dialog#api-reference).

## Notes

- Documented examples: custom close button, no close button, sticky footer (scrollable body with `max-h-[50vh] overflow-y-auto`), scrollable content, RTL (`dir` on `DialogContent`).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/dialog (`npm install radix-ui`, triggers use `asChild`). React Aria variant: https://ui.shadcn.com/docs/components/aria/dialog (`npm install react-aria-components`, underlying doc https://react-aria.adobe.com/Modal).
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Alert Dialog](./alert-dialog.md)
- [Sheet](./sheet.md)
- [Drawer](./drawer.md)
