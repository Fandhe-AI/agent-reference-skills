---
source: https://tailwindcss.com/docs/installation/framework-guides/angular
---

# Install Tailwind CSS with Angular

Set up Tailwind CSS v4 in an Angular project with the `@tailwindcss/postcss` plugin.

```shell
ng new my-project --style css
cd my-project
npm install tailwindcss @tailwindcss/postcss postcss --force
```

```json
// .postcssrc.json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

```css
/* ./src/styles.css */
@import "tailwindcss";
```

```html
<!-- app.component.html -->
<h1 class="text-3xl font-bold underline">
  <!-- prettier-ignore -->
  Hello world!
</h1>
```

## Notes

- Run the build with `ng serve`.
- The official guide notes that `--force` is used because Angular has a peer dependency on `tailwindcss` v3, which makes installing v4 error otherwise.
- The `// .postcssrc.json` line is a filename label; remove it from the actual JSON file.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/angular.tsx` (fetched 2026-10-16).
