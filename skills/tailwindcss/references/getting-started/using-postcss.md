---
source: https://tailwindcss.com/docs/installation/using-postcss
---

# Using PostCSS

Installing Tailwind CSS as a PostCSS plugin is the most seamless way to integrate it with frameworks like Next.js and Angular.

## Signature / Usage

```js
// postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  }
}
```

## Steps

1. Install `tailwindcss`, `@tailwindcss/postcss`, and `postcss` via npm.

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

2. Add Tailwind to your PostCSS configuration. Add `@tailwindcss/postcss` to your `postcss.config.mjs` file, or wherever PostCSS is configured in your project (see Signature / Usage above).

3. Import Tailwind CSS. Add an `@import` to your CSS file that imports Tailwind CSS.

```css
@import "tailwindcss";
```

4. Start your build process. Run your build process with `npm run dev` or whatever command is configured in your `package.json` file.

```shell
npm run dev
```

5. Start using Tailwind in your HTML. Make sure your compiled CSS is included in the `<head>` (your framework might handle this for you), then start using Tailwind's utility classes to style your content.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/dist/styles.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## Notes

- Setting up Tailwind with PostCSS can be a bit different across different build tools; check the framework guides for more specific instructions.
- Migration (v3 → v4): in v3 the `tailwindcss` package was a PostCSS plugin; in v4 the PostCSS plugin lives in the dedicated `@tailwindcss/postcss` package. Imports and vendor prefixing are handled automatically, so `postcss-import` and `autoprefixer` can be removed.
- Sharing the Tailwind configuration as a package across a monorepo is covered by the turborepo skill; this page covers only Tailwind setup.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/(tabs)/using-postcss/page.tsx` (fetched 2026-10-16).

## Related

- [Framework guides](./framework-guides.md)
- [Using Vite](./using-vite.md)
- [Upgrade guide](./upgrade-guide.md)
