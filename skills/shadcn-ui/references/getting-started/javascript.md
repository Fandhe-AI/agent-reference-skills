---
source: https://ui.shadcn.com/docs/javascript
---

# JavaScript

How to use shadcn/ui with JavaScript. The project and components are written in TypeScript (recommended), but a JavaScript version is available via the CLI.

## Signature / Usage

Opt out of TypeScript with the `tsx` flag in `components.json`:

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Import aliases via `jsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `tsx` | boolean | `false` in `components.json` makes the CLI emit JavaScript components |

## Related

- [Manual Installation](./manual.md)
