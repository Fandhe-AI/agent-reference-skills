---
source: https://ui.shadcn.com/docs/installation/manual
---

# Manual Installation

Add dependencies to your project manually.

## Signature / Usage

```bash
npm install shadcn class-variance-authority cn lucide-react tw-animate-css
```

`lib/utils.ts` (components import `cn` directly from the `cn` package; re-export it so your own code has a single import location):

```ts
export { cn } from "cn"
```

`components.json` (project root):

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## Notes

- Step 1: install Tailwind CSS first (components are styled with Tailwind CSS).
- Import aliases, option A: `tsconfig.json` `compilerOptions.paths` `"@/*": ["./*"]` with `baseUrl: "."`.
- Import aliases, option B: `package.json#imports` (`"#components/*": "./src/components/*.tsx"`, `"#lib/*": "./src/lib/*.ts"`, `"#hooks/*": "./src/hooks/*.ts"`) plus `"moduleResolution": "bundler"` and `"resolvePackageJsonImports": true` in `tsconfig.json`. Keep matching alias roots in `components.json`, e.g. `"components": "#components"`, `"utils": "#lib/utils"`, `"ui": "#components/ui"`, `"lib": "#lib"`, `"hooks": "#hooks"`.
- Styles: add to `src/styles/globals.css` the lines below, followed by the full `@theme inline` color/radius mapping, `:root` and `.dark` OKLCH variables (see the theming section of the official docs):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));
```

- The `@` alias is a preference; other aliases can be used.

## Related

- [Installation](./installation.md)
- [Tailwind v4](./tailwind-v4.md)
