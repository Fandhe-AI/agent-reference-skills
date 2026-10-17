---
source: https://vite.dev/guide/api-plugin#config
---

# config / configResolved

Vite-specific hooks (ignored by Rollup) to modify the user config before resolution (`config`) and to read the final resolved config (`configResolved`).

## Signature / Usage

```ts
// config
(config: UserConfig, env: { mode: 'build' | 'serve', command: string, isSsrBuild?: boolean, isPreview?: boolean }) => UserConfig | null | void

// configResolved
(config: ResolvedConfig) => void | Promise<void>
```

```js
// return partial config (recommended)
const partialConfigPlugin = () => ({
  name: 'return-partial',
  config: () => ({
    resolve: {
      alias: {
        foo: 'bar',
      },
    },
  }),
})

// mutate the config directly (use only when merging doesn't work)
const mutateConfigPlugin = () => ({
  name: 'mutate-config',
  config(config, { command }) {
    if (command === 'build') {
      config.root = 'foo'
    }
  },
})
```

```js
const examplePlugin = () => {
  let config

  return {
    name: 'read-config',

    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },

    // use stored config in other hooks
    transform(code, id) {
      if (config.command === 'serve') {
        // dev: plugin invoked by dev server
      } else {
        // build: plugin invoked by Rollup
      }
    },
  }
}
```

## Options / Props

| Hook | Kind | Scope |
|------|------|-------|
| `config` | `async`, `sequential` | Global |
| `configResolved` | `async`, `parallel` | Global |

## Notes

- `config` receives the raw user config (CLI options merged with config file) and the config env exposing `mode` and `command`. It can return a partial config that is deeply merged, or mutate the config directly if default merging cannot achieve the result.
- User plugins are resolved before `config` runs, so injecting other plugins inside the `config` hook has no effect.
- `configResolved` is useful to store the final config and to branch on the command being run. The `command` value is `serve` in dev (in the CLI, `vite`, `vite dev`, and `vite serve` are aliases).

## Related

- [configureServer / configurePreviewServer](./hook-configure-server.md)
- [Plugin Ordering / Conditional Application](./plugin-ordering-conditional.md)
