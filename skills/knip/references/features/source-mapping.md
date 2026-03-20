# Source Mapping

Source: https://knip.dev/features/source-mapping

## Overview

Knip is mostly interested in source code. Analyzing build artifacts hurts performance and leads to false positives. Source mapping resolves this by mapping based on `tsconfig.json` settings.

## Example: package.json

Given `tsconfig.json` with `outDir: "dist"`:

- Files NOT in `outDir` → included as entry files directly
- Files IN `dist` → mapped to source equivalents in `src`

Extension list: js, mjs, cjs, jsx, ts, tsx, mts, cts.

Using `./dist/*.js` means all files matching `./src/**/*.{js,ts}` are added as entry files.

## Example: Monorepo

When importing from `@org/shared` with `"main": "dist/index.js"`:

1. Module resolver locates `dist/index.js`
2. Knip maps to source file using `tsconfig.json` `outDir`
3. If `src/index.ts` exists, uses that instead

### Limitations

- Currently only works based on `tsconfig.json`
- Projects may require compiling artifacts to `outDir` before Knip can apply source mapping
