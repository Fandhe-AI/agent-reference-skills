---
source: https://ui.shadcn.com/docs/rtl/start
---

# RTL: TanStack Start

Create a new TanStack Start project with RTL support.

## Signature / Usage

```bash
npx shadcn@latest create --template start --rtl
```

This writes `components.json` with `rtl: true`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rtl": true
}
```

Set `dir` / `lang` on `html` and wrap the app with `DirectionProvider` in `src/routes/__root.tsx` (change `lang="ar"` to your language):

```tsx
import { DirectionProvider } from "@/components/ui/direction"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <Meta />
      </head>
      <body>
        <DirectionProvider direction="rtl">{children}</DirectionProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

Font via Fontsource:

```bash
npm install @fontsource-variable/noto-sans-arabic
```

```css
/* src/styles.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/noto-sans-arabic";

@theme inline {
  --font-sans: "Noto Sans Arabic Variable", sans-serif;
}
```

Then add components:

```bash
npx shadcn@latest add item
```

## Notes

- For Hebrew, use `@fontsource-variable/noto-sans-hebrew`.
- Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [RTL](./rtl.md)
- [Dark Mode: TanStack Start](./dark-mode-tanstack-start.md)
