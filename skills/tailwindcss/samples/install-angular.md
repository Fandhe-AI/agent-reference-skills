---
source: https://tailwindcss.com/docs/installation/framework-guides/angular
---

# Tailwind CSS Setup Steps for Angular

Install-only variant: the commands, PostCSS config, and CSS entry needed to enable Tailwind CSS in Angular (no demo markup).

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

## Notes

- Role split: this page is the setup steps only; `angular.md` is the full v4 walkthrough including the `ng serve` run step and demo markup.
- The official guide installs with `--force` because Angular has a peer dependency on `tailwindcss` v3, which causes errors when installing v4 (comment in the guide source).
- The `// .postcssrc.json` line is a filename label; remove it from the actual JSON file.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/framework-guides/angular.tsx` (fetched 2026-10-16).
