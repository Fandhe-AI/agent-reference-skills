---
source: https://tailwindcss.com/docs/installation/framework-guides/laravel
---

# Tailwind CSS Setup Steps for Laravel

Install-only variant: the commands, Vite or Laravel Mix config, and CSS entry needed to enable Tailwind CSS in Laravel (no demo markup).

Using Vite:

```shell
laravel new my-project
cd my-project
npm install tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    // other plugins already in your config (for example the laravel-vite-plugin)
  ],
})
```

Using Laravel Mix:

```shell
npm install tailwindcss @tailwindcss/postcss postcss
```

```js
// webpack.mix.js
mix
  .js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [
    require("@tailwindcss/postcss"),
  ]);
```

Both tabs, CSS entry with explicit sources:

```css
/* ./resources/css/app.css */
@import "tailwindcss";

@source "../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php";
@source "../../storage/framework/views/*.php";
@source "../**/*.blade.php";
@source "../**/*.js";
```

## Notes

- Role split: this page is the setup steps only; `laravel.md` is the full v4 walkthrough including the `@vite` Blade template, `npm run dev` / `npm run watch`, and demo markup.
- `@source` registers extra paths to scan (see the source-detection sample); Laravel's `vendor` and `storage` views are otherwise ignored by default.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/laravel.tsx` (fetched 2026-10-16).
