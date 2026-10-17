---
source: https://tailwindcss.com/docs/installation/framework-guides/astro
---

# Install Tailwind CSS with Astro

Set up Tailwind CSS v4 in an Astro project with the `@tailwindcss/vite` plugin.

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

```astro
---
// index.astro
import "../styles/global.css";
---

<h1 class="text-3xl font-bold underline">
  Hello world!
</h1>
```

## Notes

- Import the stylesheet in each page or layout that should receive the styles.
- Start the build with `npm run dev`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/astro.tsx` (fetched 2026-10-16).
