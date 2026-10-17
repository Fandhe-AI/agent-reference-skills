---
source: https://tailwindcss.com/docs/installation/framework-guides/astro
---

# Tailwind CSS Setup Steps for Astro

Install-only variant: the commands, Vite plugin config, and CSS entry needed to enable Tailwind CSS in Astro (no demo markup).

```shell
npm create astro@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```js
// astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

```css
/* ./src/styles/global.css */
@import "tailwindcss";
```

## Notes

- Role split: this page is the setup steps only; `astro.md` is the full v4 walkthrough including the `import "../styles/global.css"` page usage and demo markup.
- Import the CSS file in every page or layout that needs it.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/astro.tsx` (fetched 2026-10-16).
