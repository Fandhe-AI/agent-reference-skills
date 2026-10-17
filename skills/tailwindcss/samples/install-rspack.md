---
source: https://tailwindcss.com/docs/installation/framework-guides/rspack
---

# Tailwind CSS Setup Steps for Rspack

Install-only variant: the commands, `postcss-loader` rule, PostCSS config, and CSS entry needed to enable Tailwind CSS in Rspack (no demo markup).

```shell
npm create rspack@latest
npm install tailwindcss @tailwindcss/postcss postcss postcss-loader
```

```ts
// rspack.config.ts
export default defineConfig({
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      // ...
    ],
  },
}
```

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

```css
/* ./src/index.css (React) or ./src/style.css (Vue) */
@import "tailwindcss";
```

## Notes

- Role split: this page is the setup steps only; `rspack.md` is the full v4 walkthrough including the `npm run dev` run step and demo markup.
- The `rspack.config.ts` snippet is verbatim from the guide, so `// ...` marks the surrounding config you already have and the closing `}` of `defineConfig(` lacks `)`; complete it when copying.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/rspack.tsx` (fetched 2026-10-16).
