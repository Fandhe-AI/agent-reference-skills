# Bundling

Due to its internal architecture based on Worker Threads, Pino cannot be bundled without generating additional files that a bundler must ship alongside the main bundle.

## Required Extra Files

A bundler must ensure the following files are also bundled separately:

- `lib/worker.js` from the `thread-stream` dependency
- `file.js`
- `lib/worker.js`
- Any transport used by the user (like `pino-pretty`)

Once generated, the bundler must inject code that sets `__bundlerPathsOverrides` on `globalThis`, mapping required identifiers to the paths of the generated files (relative to the bundle):

```js
// Inject this using your bundle plugin
globalThis.__bundlerPathsOverrides = {
  'thread-stream-worker': pinoWebpackAbsolutePath('./thread-stream-worker.js'),
  'pino/file': pinoWebpackAbsolutePath('./pino-file.js'),
  'pino-worker': pinoWebpackAbsolutePath('./pino-worker.js'),
  'pino-pretty': pinoWebpackAbsolutePath('./pino-pretty.js'),
}
```

`pino/file`, `pino-worker` and `thread-stream-worker` are required identifiers. Other identifiers are possible depending on user configuration (e.g. custom transports).

## Bundler Plugins

| Plugin | Bundler | Description |
|--------|---------|-------------|
| [pino-webpack-plugin](https://github.com/pinojs/pino-webpack-plugin) | Webpack | Automatically configures `__bundlerPathsOverrides`; no manual setup needed |
| [esbuild-plugin-pino](https://github.com/davipon/esbuild-plugin-pino) | esbuild | Generates the extra Pino files needed for bundling |
| [bun-plugin-pino](https://github.com/vktrl/bun-plugin-pino) | Bun | Generates the extra Pino files needed for bundling |

## Notes

- Bundlers other than Webpack (esbuild, Bun, etc.) still require manual configuration of `__bundlerPathsOverrides` unless using the dedicated plugin listed above.
- Any custom transport used by the application must also be added to the overrides map.

## Related

- [Transports](./transports.md)
