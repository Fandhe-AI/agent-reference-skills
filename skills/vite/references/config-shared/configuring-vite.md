---
source: https://vite.dev/config/
---

# Configuring Vite (vite.config, defineConfig)

Vite automatically resolves a config file named `vite.config.js` (other JS and TS extensions are also supported) inside the project root when `vite` runs from the command line.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
})
```

Basic form without helper:

```js [vite.config.js]
export default {
  // config options
}
```

Explicit config file (resolved relative to `cwd`):

```bash
vite --config my-config.js
```

Type hints without `defineConfig`:

```js
/** @type {import('vite').UserConfig} */
export default {
  // ...
}
```

```ts
import type { UserConfig } from 'vite'

export default {
  // ...
} satisfies UserConfig
```

Debugging with the native config loader:

```bash
vite --configLoader native
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--config <file>` | CLI option | Config file to use, resolved relative to `cwd`. |
| `--configLoader native` | CLI option | Load the config with the environment's native runtime (e.g. Node 22.18+ for TypeScript) instead of bundling it. |
| `--configLoader bundle` | CLI option | Current default. Bundles the config into a temporary file with Rolldown, writes it to `node_modules/.vite-temp`, and generates an inline source map. |

## Notes

- To use ES modules syntax in the config file, the file must be detected as ESM by Node.js, e.g. `.mjs` or `.js` with `"type": "module"` in the closest `package.json`.
- By default Vite uses Rolldown to bundle the config into a temporary file and load it. `configLoader: 'native'` is planned to become the default in a future major version.
- Config Intellisense: Vite ships with TypeScript typings; `defineConfig` provides intellisense without JSDoc annotations. `vite.config.ts` works with `defineConfig` or the `satisfies` operator.
- The native loader runs the original config file directly, so breakpoints in the config file and in plugin hooks such as `transform` map to the original source. With the bundle loader, add `**/node_modules/.vite-temp/**` to `resolveSourceMapLocations` (in `.vscode/settings.json` for the JavaScript Debug Terminal, or in `.vscode/launch.json` for Run and Debug).
- This page covers Vite's own `vite.config.*`. `vitest.config.ts` and the `test` options belong to the vitest skill; Vite itself is configured here.

## Related

- [Conditional / Async Config](./conditional-async-config.md)
- [Using Environment Variables in Config](./env-in-config.md)
- [root / base / mode](./root-base-mode.md)
