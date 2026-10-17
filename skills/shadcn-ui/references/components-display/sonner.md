---
source: https://ui.shadcn.com/docs/components/radix/sonner
---

# Sonner

An opinionated toast component for React, built and maintained by emilkowalski.

## Signature / Usage

```bash
npx shadcn@latest add sonner
```

Manual install dependencies:

```bash
npm install sonner next-themes
```

Add the `Toaster` component:

```tsx
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

```tsx
import { toast } from "sonner"

toast("Event has been created.")
```

Types, description, position:

```tsx
toast.success("Event has been created")
toast.info("Be at the area 10 minutes before the event time")
toast.warning("Event start time cannot be earlier than 8am")
toast.error("Event has not been created")

toast("Event has been created", {
  description: "Monday, January 3rd at 6:00pm",
})

toast("Event has been created", { position: "top-left" })
```

Promise:

```tsx
toast.promise<{ name: string }>(
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Event" }), 2000)
    ),
  {
    loading: "Loading...",
    success: (data) => `${data.name} has been created`,
    error: "Error",
  }
)
```

## Options / Props

The docs have no API table; the rows below list only options observed in official examples. See the [Sonner API Reference](https://sonner.emilkowal.ski/getting-started).

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| description | string | — | Secondary text of the toast. |
| action | `{ label, onClick }` | — | Action button of the toast. |
| position | string | — | One of `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`. |

## Notes

- Radix variant is the canonical source for this page because no Base UI variant of `sonner` exists in the docs; the Base UI equivalent is `toast` (see [toast](./toast.md)). React Aria variant: https://ui.shadcn.com/docs/components/aria/sonner
- `toast` is imported from the `sonner` package, while `Toaster` comes from `@/components/ui/sonner`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [toast](./toast.md)
- [alert](./alert.md)
