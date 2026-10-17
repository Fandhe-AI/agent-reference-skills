---
source: https://tailwindcss.com/docs/installation/framework-guides/nuxt
---

# Install Tailwind CSS with Nuxt

Set up Tailwind CSS v4 in a Nuxt project with the `@tailwindcss/vite` plugin.

```shell
npm create nuxt my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```css
/* ./app/assets/css/main.css */
@import "tailwindcss";
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

```vue
<!-- app.vue -->
<template>
  <h1 class="text-3xl font-bold underline">
    <!-- prettier-ignore -->
    Hello world!
  </h1>
</template>
```

## Notes

- Register the Vite plugin under `vite.plugins` and the stylesheet in the `css` array of `nuxt.config.ts`.
- Start the build with `npm run dev`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/nuxtjs.tsx` (fetched 2026-10-16); the URL slug is `nuxt`.
