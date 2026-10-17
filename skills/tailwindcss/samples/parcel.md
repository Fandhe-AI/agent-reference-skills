---
source: https://tailwindcss.com/docs/installation/framework-guides/parcel
---

# Install Tailwind CSS with Parcel

Set up Tailwind CSS v4 in a Parcel project with the `@tailwindcss/postcss` plugin.

```shell
mkdir my-project
cd my-project
npm init -y
npm install parcel
mkdir src
touch src/index.html
npm install tailwindcss @tailwindcss/postcss
```

```json
// .postcssrc
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

```css
/* ./src/index.css */
@import "tailwindcss";
```

```html
<!-- index.html -->
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="./index.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      <!-- prettier-ignore -->
      Hello world!
    </h1>
  </body>
</html>
```

## Notes

- Start the build with `npx parcel src/index.html`.
- The `// .postcssrc` line is a filename label; remove it from the actual JSON file.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/parcel.tsx` (fetched 2026-10-16).
