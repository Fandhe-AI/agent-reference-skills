---
source: https://ui.shadcn.com/docs/components/base/toast
---

# Toast

A succinct message that is displayed temporarily (Base UI Toast).

## Signature / Usage

```bash
npx shadcn@latest add toast
```

Manual install dependency:

```bash
npm install @base-ui/react
```

Add the `Toaster` component:

```tsx
import { Toaster } from "@/components/ui/toast"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

```tsx
import { toast } from "@/components/ui/toast"

toast.add({
  title: "Event created",
  description: "Sunday, December 3 at 9:00 AM",
})
```

Action:

```tsx
const id = toast.add({
  title: "Event created",
  actionProps: {
    children: "Undo",
    onClick() {
      toast.close(id)
    },
  },
})
```

Promise:

```tsx
toast.promise(
  new Promise<{ name: string }>((resolve) => {
    window.setTimeout(() => resolve({ name: "Event" }), 2000)
  }),
  {
    loading: "Creating event…",
    success: (data) => `${data.name} created.`,
    error: "Could not create event.",
  }
)
```

## Options / Props

The docs have no API table; the rows below list only options observed in official examples.

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| type | string | — | Renders a status icon; the built-in renderer recognizes `success`, `info`, `warning`, `error`, and `loading`. |
| priority | string | — | The official example passes `"high"` for an error toast. |

See the [Base UI Toast documentation](https://base-ui.com/react/components/toast) for manager options, stacking, swipe dismissal, and the primitive API.

## Notes

- Base UI variant is canonical here. It is a different component from `sonner` (Radix variant, `toast` imported from the `sonner` package); see [sonner](./sonner.md). This page imports `toast` from `@/components/ui/toast`.
- Radix variant: https://ui.shadcn.com/docs/components/radix/toast ; React Aria variant: https://ui.shadcn.com/docs/components/aria/toast
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [sonner](./sonner.md)
- [alert](./alert.md)
