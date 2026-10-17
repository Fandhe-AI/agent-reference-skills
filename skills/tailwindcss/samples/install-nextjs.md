---
source: https://tailwindcss.com/docs/installation/framework-guides/nextjs
---

# Tailwind CSS Setup Steps for Next.js

Install-only variant: the commands, PostCSS config, and CSS entry needed to enable Tailwind CSS in Next.js (no demo markup).

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

## Notes

- Role split: this page is the setup steps only; `nextjs.md` is the full v4 walkthrough including the `npm run dev` run step and demo markup.
- Next.js APIs (App Router, `create-next-app` options) live in the nextjs-app skill; its `guides/tailwind-v3-css.md` covers Tailwind v3, not v4.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/nextjs.tsx` (fetched 2026-10-16).
