---
source: https://tailwindcss.com/docs/installation/framework-guides/react-router
---

# Install Tailwind CSS with React Router

Set up Tailwind CSS v4 in a React Router project with the `@tailwindcss/vite` plugin.

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

```tsx
// home.tsx
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

## Notes

- Start the build with `npm run dev`.
- Framework APIs live in the react-router skill; this sample covers only Tailwind setup.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/react-router.tsx` (fetched 2026-10-16).
