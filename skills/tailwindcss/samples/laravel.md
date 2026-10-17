---
source: https://tailwindcss.com/docs/installation/framework-guides/laravel
---

# Install Tailwind CSS with Laravel

Set up Tailwind CSS v4 in a Laravel project, using Vite (default) or Laravel Mix.

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
    // (keep the plugins already in your config, e.g. laravel-vite-plugin)
  ],
})
```

```css
/* ./resources/css/app.css */
@import "tailwindcss";

@source "../../vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php";
@source "../../storage/framework/views/*.php";
@source "../**/*.blade.php";
@source "../**/*.js";
```

```html
<!-- app.blade.php -->
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    @vite('resources/css/app.css')
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      <!-- prettier-ignore -->
      Hello world!
    </h1>
  </body>
</html>
```

Laravel Mix variant: install `npm install tailwindcss @tailwindcss/postcss postcss`, then add the plugin and run `npm run watch`.

```js
// webpack.mix.js
mix
  .js("resources/js/app.js", "public/js")
  .postCss("resources/css/app.css", "public/css", [
    require("@tailwindcss/postcss"),
  ]);
```

## Notes

- Start the Vite build with `npm run dev`; the `@source` lines tell Tailwind to scan Blade views and framework pagination views.
- The parenthesized comment in `vite.config.ts` stands for existing plugins that the official guide elides with `// …`.
- With Mix, link the compiled CSS in the head: `<link href="{{ asset('css/app.css') }}" rel="stylesheet" />`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/laravel.tsx` (fetched 2026-10-16).
