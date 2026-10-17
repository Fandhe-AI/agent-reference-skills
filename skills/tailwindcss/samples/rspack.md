---
source: https://tailwindcss.com/docs/installation/framework-guides/rspack
---

# Install Tailwind CSS with Rspack

Set up Tailwind CSS v4 in an Rspack project (React or Vue) with the `@tailwindcss/postcss` plugin and `postcss-loader`.

```shell
npm create rspack@latest
cd my-project  # replace with the project name you entered in the prompt
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
});
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

```jsx
// App.jsx (React)
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

```vue
<!-- App.vue (Vue) -->
<template>
  <h1 class="text-3xl font-bold underline">
    <!-- prettier-ignore -->
    Hello world!
  </h1>
</template>
```

## Notes

- `npm create rspack@latest` prompts for a project name and creates that directory; `cd` into it (`my-project` is a placeholder) before installing. The official guide omits the `cd` step.
- Start the build with `npm run dev`. The official guide links to rspack.dev/guide/tech/css#tailwind-css for PostCSS loader details.
- The `rspack.config.ts` snippet follows the official guide (a fragment with `// ...` placeholders), except that the closing `);` of `defineConfig`, missing in the original, has been added here.
- Rspack itself and its framework APIs are outside this skill; this sample covers only Tailwind setup.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/rspack.tsx` (fetched 2026-10-16).
