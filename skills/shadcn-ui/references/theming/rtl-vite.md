---
source: https://ui.shadcn.com/docs/rtl/vite
---

# RTL: Vite

Create a new Vite project with RTL support.

## Signature / Usage

```bash
npx shadcn@latest create --template vite --rtl
```

This writes `components.json` with `rtl: true`:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rtl": true
}
```

Set `dir` and `lang` on `html` in `index.html` (change `lang="ar"` to your language):

```html
<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Wrap the app with `DirectionProvider` in `src/main.tsx`:

```tsx
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { DirectionProvider } from "@/components/ui/direction"

import App from "./App"

import "./index.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider direction="rtl">
      <App />
    </DirectionProvider>
  </StrictMode>
)
```

Font via Fontsource:

```bash
npm install @fontsource-variable/noto-sans-arabic
```

```css
/* src/index.css */
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
- [Dark Mode: Vite](./dark-mode-vite.md)
