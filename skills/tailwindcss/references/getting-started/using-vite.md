---
source: https://tailwindcss.com/docs/installation/using-vite
---

# Using Vite

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.

## Signature / Usage

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

## Steps

1. Create your project. Start by creating a new Vite project if you don't have one set up already. The most common approach is to use Create Vite.

```shell
npm create vite@latest my-project
cd my-project
```

2. Install `tailwindcss` and `@tailwindcss/vite` via npm.

```shell
npm install tailwindcss @tailwindcss/vite
```

3. Configure the Vite plugin: add the `@tailwindcss/vite` plugin to your Vite configuration (see Signature / Usage above).

4. Import Tailwind CSS. Add an `@import` to your CSS file that imports Tailwind CSS.

```css
@import "tailwindcss";
```

5. Start your build process. Run your build process with `npm run dev` or whatever command is configured in your `package.json` file.

```shell
npm run dev
```

6. Start using Tailwind in your HTML. Make sure your compiled CSS is included in the `<head>` (your framework might handle this for you), then start using Tailwind's utility classes to style your content.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/style.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## Notes

- Setting up Tailwind with Vite can be a bit different across different build tools; check the framework guides for more specific instructions.
- Migration (v3 → v4): if you use Vite, migrating from the PostCSS plugin to the dedicated Vite plugin is recommended for improved performance and the best developer experience.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/(tabs)/using-vite/page.tsx` (fetched 2026-10-16).

## Related

- [Framework guides](./framework-guides.md)
- [Using PostCSS](./using-postcss.md)
- [Tailwind CLI](./tailwind-cli.md)
- [Upgrade guide](./upgrade-guide.md)
