---
source: https://ui.shadcn.com/docs/components/base/alert-dialog
---

# Alert Dialog

A modal dialog that interrupts the user with important content and expects a response.

## Signature / Usage

```bash
npx shadcn@latest add alert-dialog
# manual
npm install @base-ui/react
```

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="outline" />}>
    Show Dialog
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

Composition:

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| size | `"default" \| "sm"` | `"default"` | On `AlertDialogContent`. Controls the size of the alert dialog. |

## Notes

- `AlertDialogMedia` adds an icon or image to the header. Destructive pattern: `<AlertDialogAction variant="destructive">` and `<AlertDialogCancel variant="outline">`.
- For other components and props, see the Base UI documentation (https://base-ui.com/react/components/alert-dialog#api-reference).
- Base UI is the canonical variant. Radix variant: https://ui.shadcn.com/docs/components/radix/alert-dialog (`asChild` on triggers). React Aria variant: https://ui.shadcn.com/docs/components/aria/alert-dialog.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Dialog](./dialog.md)
