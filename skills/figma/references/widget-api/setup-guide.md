# Setup Guide

Steps to configure a Figma widget project from scratch or using the official template.

## Signature / Usage

```bash
# Install typings
npm install --save-dev @figma/widget-typings @figma/plugin-typings

# Watch and compile
# Terminal > Run Build Task > npm: watch  (in VS Code)
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "figma.widget.h",
    "jsxFragmentFactory": "figma.widget.Fragment",
    "target": "es6",
    "strict": true,
    "typeRoots": [
      "./node_modules/@types",
      "./node_modules/@figma"
    ]
  }
}
```

## Options / Props

| Item | Value | Notes |
|------|-------|-------|
| `jsxFactory` | `"figma.widget.h"` | Required for widget JSX |
| `jsxFragmentFactory` | `"figma.widget.Fragment"` | Required for `<>` fragments |
| Widget source | `widget-src/code.tsx` | Edit this file, not the compiled output |
| Compiled output | `dist/code.js` | Auto-generated; referenced by `manifest.json` |

## Notes

- Insert a development widget via **Menu > Widgets > Development > {widget name}** in Figma.
- Editing `dist/code.js` directly is ineffective; always edit the TypeScript source.
- For Fragment support with list `key` props, use the explicit `<Fragment key={...}>` form.

## Related

- [manifest](./manifest.md)
- [overview](./overview.md)
