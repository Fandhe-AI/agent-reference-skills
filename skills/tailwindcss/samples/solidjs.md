---
source: https://tailwindcss.com/docs/installation/framework-guides/solidjs
---

# Install Tailwind CSS with SolidJS

Set up Tailwind CSS v4 in a SolidJS Vite project with the `@tailwindcss/vite` plugin.

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

```jsx
// App.jsx
export default function App() {
  return (
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

## Notes

- SolidJS JSX uses `class`, not `className`.
- Start the build with `npm run dev`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/solidjs.tsx` (fetched 2026-10-16).
