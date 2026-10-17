---
source: https://tailwindcss.com/docs/installation/framework-guides/react-router
---

# Tailwind CSS Setup Steps for React Router

Install-only variant: the commands, Vite plugin config, and CSS entry needed to enable Tailwind CSS in React Router (no demo markup).

```shell
npx create-react-router@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
});
```

```css
/* ./app/app.css */
@import "tailwindcss";
```

## Notes

- Role split: this page is the setup steps only; `react-router.md` is the full v4 walkthrough including the `npm run dev` run step and demo markup.
- React Router APIs (routes, loaders, `create-react-router`) live in the react-router skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/react-router.tsx` (fetched 2026-10-16).
