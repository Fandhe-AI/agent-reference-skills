---
source: https://tailwindcss.com/docs/installation/framework-guides/solidjs
---

# Tailwind CSS Setup Steps for SolidJS

Install-only variant: the commands, Vite plugin config, and CSS entry needed to enable Tailwind CSS in SolidJS (no demo markup).

```shell
npx degit solidjs/templates/js my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
```

```css
/* ./src/index.css */
@import "tailwindcss";
```

## Notes

- Role split: this page is the setup steps only; `solidjs.md` is the full v4 walkthrough including the `npm run dev` run step and demo markup.
- SolidJS JSX uses `class`, not `className`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/solidjs.tsx` (fetched 2026-10-16).
