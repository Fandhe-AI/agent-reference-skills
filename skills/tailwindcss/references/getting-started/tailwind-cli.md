---
source: https://tailwindcss.com/docs/installation/tailwind-cli
---

# Tailwind CLI

The simplest and fastest way to get up and running with Tailwind CSS from scratch is with the Tailwind CLI tool. The CLI is also available as a standalone executable (GitHub releases) if you want to use it without installing Node.js.

## Signature / Usage

```shell
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

## Steps

1. Install `tailwindcss` and `@tailwindcss/cli` via npm.

```shell
npm install tailwindcss @tailwindcss/cli
```

2. Import Tailwind in your CSS. Add the `@import "tailwindcss";` import to your main CSS file.

```css
/* src/input.css */
@import "tailwindcss";
```

3. Start the Tailwind CLI build process. Run the CLI tool to scan your source files for classes and build your CSS (see Signature / Usage above).

4. Start using Tailwind in your HTML. Add your compiled CSS file to the `<head>` and start using Tailwind's utility classes to style your content.

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## Notes

- Migration (v3 → v4): in v4 Tailwind CLI lives in a dedicated `@tailwindcss/cli` package. Update build commands from `npx tailwindcss -i input.css -o output.css` to `npx @tailwindcss/cli -i input.css -o output.css`.
- Sharing Tailwind configuration across a monorepo with Turborepo is covered by the turborepo skill; this page covers only Tailwind setup.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/(tabs)/tailwind-cli/page.tsx` (fetched 2026-10-16).

## Related

- [Using Vite](./using-vite.md)
- [Using PostCSS](./using-postcss.md)
- [Upgrade guide](./upgrade-guide.md)
