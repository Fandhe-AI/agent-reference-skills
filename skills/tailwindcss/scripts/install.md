---
source: https://tailwindcss.com/docs/installation/using-vite
---

# Install

Installation commands for Tailwind CSS v4 in four flavors: Vite plugin, PostCSS plugin, Tailwind CLI, and Play CDN (source: each tab of the official Installation guide).

## Install with the Vite plugin

Source: https://tailwindcss.com/docs/installation/using-vite

```sh
npm create vite@latest my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

Add `tailwindcss()` from `@tailwindcss/vite` to `plugins` in `vite.config.ts`, and write the following in your CSS.

```css
@import "tailwindcss";
```

```sh
npm run dev
```

If you already have a Vite project, the first two lines are not needed.

## Install with the PostCSS plugin

Source: https://tailwindcss.com/docs/installation/using-postcss

```sh
npm install tailwindcss @tailwindcss/postcss postcss
```

Add `"@tailwindcss/postcss": {}` to `plugins` in `postcss.config.mjs`, write `@import "tailwindcss";` in your CSS, then run your build.

```sh
npm run dev
```

## Install and build with the Tailwind CLI

Source: https://tailwindcss.com/docs/installation/tailwind-cli

```sh
npm install tailwindcss @tailwindcss/cli
```

Write `@import "tailwindcss";` in `src/input.css`, then start the CLI.

```sh
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch
```

See [cli.md](./cli.md) for flag details. The docs state that a standalone executable that works without Node.js is available on GitHub Releases (the docs do not give a download command).

## Load the Play CDN

Source: https://tailwindcss.com/docs/installation/play-cdn

> **Warning**: The Play CDN is for development purposes only and is not intended for production use (as stated in the docs).

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

Custom CSS such as `@theme` can be written inside a `<style>` with `type="text/tailwindcss"`.

```html
<style type="text/tailwindcss">
  @theme {
    --color-clifford: #da373d;
  }
</style>
```
