---
source: https://ui.shadcn.com/docs/rtl/next
---

# RTL: Next.js

Create a new Next.js project with RTL support.

## Signature / Usage

Create the project with the `--rtl` flag and the `next` template (skip if you used shadcn/create):

```bash
npx shadcn@latest create --template next --rtl
```

This writes `components.json` with `rtl: true`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rtl": true
}
```

Wrap the app with `DirectionProvider` and set `dir` / `lang` on `html` (change `lang="ar"` to your language):

```tsx
// app/layout.tsx
import { DirectionProvider } from "@/components/ui/direction"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <DirectionProvider direction="rtl">{children}</DirectionProvider>
      </body>
    </html>
  )
}
```

Add an RTL font (Noto recommended):

```tsx
import { Noto_Sans_Arabic } from "next/font/google"

import { DirectionProvider } from "@/components/ui/direction"

const fontSans = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={fontSans.variable}>
      <body>
        <DirectionProvider direction="rtl">{children}</DirectionProvider>
      </body>
    </html>
  )
}
```

Then add components; the CLI handles RTL:

```bash
npx shadcn@latest add item
```

## Notes

- For Hebrew, use `Noto_Sans_Hebrew`.
- Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [RTL](./rtl.md)
- [Dark Mode: Next.js](./dark-mode-next.md)
