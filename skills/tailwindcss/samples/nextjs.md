---
source: https://tailwindcss.com/docs/installation/framework-guides/nextjs
---

# Install Tailwind CSS with Next.js

Set up Tailwind CSS v4 in a Next.js (App Router) project with the `@tailwindcss/postcss` plugin.

```shell
npx create-next-app@latest my-project --typescript --eslint --app
cd my-project
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

```css
/* ./app/globals.css */
@import "tailwindcss";
```

```tsx
// page.tsx
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
- Framework APIs live in the nextjs-app skill; this sample covers only Tailwind setup. The nextjs-app skill's `guides/tailwind-v3-css.md` covers v3, not v4.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/nextjs.tsx` (fetched 2026-10-16).
