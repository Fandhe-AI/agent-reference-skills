# Addon migration guide for Storybook 10.0

Migrating addons from Storybook 9.x to 10.0: dependency updates and ESM-only builds, plus optional CSF Factories support.

## Signature / Usage

Dependency updates (peer dependencies must point to `^10.0.0`):

```jsonc
{
  "devDependencies": {
    "@storybook/addon-docs": "next",
    "@storybook/react-vite": "next",
    "storybook": "next",
  },
  "peerDependencies": {
    "storybook": "^10.0.0",
  },
}
```

Supporting earlier versions as well:

```jsonc
{
  "name": "your-storybook-addon",
  "peerDependencies": {
    "storybook": "^9.0.0 || ^10.0.0",
  },
  "devDependencies": {
    "storybook": ">=10.0.0-0 <11.0.0-0", // For local development
  },
}
```

Update `package.json` `exports` to drop CJS:

```diff
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
-      "import": "./dist/index.js",
-      "require": "./dist/index.cjs"
+      "default": "./dist/index.js"
    },
    "./preview": {
-      "types": "./dist/index.d.ts",
-      "import": "./dist/preview.js",
-      "require": "./dist/preview.cjs"
+      "types": "./dist/preview.d.ts",
+      "default": "./dist/preview.js"
    },
-    "./preset": "./dist/preset.cjs",
+    "./preset": "./dist/preset.js",
    "./manager": "./dist/manager.js",
    "./package.json": "./package.json"
  },
```

Top-level `preset.js` becomes ESM:

```diff
-module.exports = require('./dist/preset.cjs');
+export * from './dist/preset.js';
```

Local addon loading (`.storybook/local-preset.ts`, replacing `.storybook/local-preset.cjs`):

```ts
import { fileURLToPath } from 'node:url';

export function previewAnnotations(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../dist/preview.js'))];
}

export function managerEntries(entry = []) {
  return [...entry, fileURLToPath(import.meta.resolve('../dist/manager.js'))];
}

export * from '../dist/preset.js';
```

```diff
- addons: ["@storybook/addon-docs", "./local-preset.cjs"],
+ addons: ["@storybook/addon-docs", import.meta.resolve("./local-preset.ts")],
```

CSF Factories support (`src/index.ts`):

```diff
- // make it work with --isolatedModules
- export default {};
+ import { definePreviewAddon } from "storybook/internal/csf";
+ import addonAnnotations from "./preview";
+
+ export default () => definePreviewAddon(addonAnnotations);
```

## Options / Props

| Change | Detail |
|--------|--------|
| Node target | Moves from Node 20.0 to `node20.19` |
| CJS builds | No longer needed; ESM-only (`format: ["esm"]`, `splitting: true`) |
| `globalManagerPackages` / `globalPreviewPackages` | No longer passed; `external: ["react", "react-dom", "@storybook/icons"]` instead |
| `bundler` config in `package.json` | No longer needs manual typing; prefer `previewEntries` and `managerEntries` over `exportEntries` |
| `tsconfig.json` | `moduleResolution: "bundler"`, `module: "preserve"`, `target: "esnext"`, `lib: ["esnext", "dom", "dom.iterable"]`, `rootDir: "."`, `include: ["src/**/*", "tsup.config.ts"]` |
| Keyword | Default addon keyword changes from `storybook-addons` to `storybook-addon` |

## Notes

- Remove `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-links`, and `@storybook/blocks` from dependencies; they have been empty since Storybook 9 and are no longer published.
- Many `tsup.config.ts` changes are needed; copying the reference file from the `addon-kit` repository is easier.
- `exportEntries` removal: `src/index.ts` moves into `previewEntries` so exports are bundled for browsers and usable with CSF Next. For manager exports (e.g. a sidebar `renderLabel`), create `src/manager-helpers.ts`, add it to `managerEntries`, and add a `"./manager-helpers": "./dist/manager-helpers.js"` export.
- CSF Factories becomes the default way to write stories in Storybook 11; addons must export annotations to be compatible.
- Recommended cleanup script: `"prebuild": "node -e \"fs.rmSync('./dist', { recursive: true, force: true })\""`.
- Release a new major version of your addon alongside Storybook 10; use the `next` tag for experimental testing.
- For migrations from earlier versions, see the Storybook 9.0 addon migration guide; the full list of changes is in `MIGRATION.md` (from version 9.x to 10.0.0).
- Source: https://storybook.js.org/docs/addons/addon-migration-guide (Storybook v10.6.2).

## Related

- [Write an addon](./writing-addons.md)
- [Write a preset addon](./writing-presets.md)
- [Add to the integration catalog](./integration-catalog.md)
