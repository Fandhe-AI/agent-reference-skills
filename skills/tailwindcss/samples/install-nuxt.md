---
source: https://tailwindcss.com/docs/installation/framework-guides/nuxt
---

# Tailwind CSS Setup Steps for Nuxt

Install-only variant: the commands, Vite plugin config, and CSS entry needed to enable Tailwind CSS in Nuxt (no demo markup).

```shell
npm create nuxt my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// nuxt.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
```

```css
/* ./app/assets/css/main.css */
@import "tailwindcss";
```

## Notes

- Role split: this page is the setup steps only; `nuxt.md` is the full v4 walkthrough including the `npm run dev` run step and demo markup.
- The URL slug is `nuxt` (source file is `nuxtjs.tsx`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/nuxtjs.tsx` (fetched 2026-10-16).
