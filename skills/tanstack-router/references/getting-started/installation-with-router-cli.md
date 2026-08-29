---
source: https://tanstack.com/router/latest/docs/framework/react/installation/with-router-cli
---

# Installation with Router CLI

Standalone CLI for generating the route tree file, recommended primarily for projects not using one of the supported bundlers (Vite/Rspack/Webpack/Esbuild).

## Signature / Usage

```json
// package.json
{
  "scripts": {
    "generate-routes": "tsr generate",
    "watch-routes": "tsr watch",
    "build": "npm run generate-routes && ...",
    "dev": "npm run watch-routes && ..."
  }
}
```

```json
// tsconfig.json (Solid only)
{
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "solid-js"
  }
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `tsr generate` | Generates routes based on `tsr.config.json` |
| `tsr watch` | Watches directories and regenerates routes on file changes |

## Notes

- "The CLI only supports the generation of the route tree file and does not provide any other features"
- Install `@tanstack/router-cli` as a dev dependency
- Default config: `./src/routes` routes directory, `./src/routeTree.gen.ts` output, customizable via `tsr.config.json`
- Ignore the generated `routeTree.gen.ts` in linters/formatters; mark it read-only in VSCode settings

## Related

- [Manual Setup](./installation-manual.md)
- [Esbuild Installation](./installation-with-esbuild.md)
