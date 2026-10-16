---
source: https://vite.dev/config/shared-options#css-postcss
---

# css.postcss / css.preprocessorOptions / css.devSourcemap

PostCSS config, pre-processor options (including `additionalData` and worker count), and dev sourcemaps.

## Signature / Usage

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        math: 'parens-division',
      },
      styl: {
        define: {
          $specialColor: new stylus.nodes.RGBA(51, 197, 255, 1),
        },
      },
      scss: {
        additionalData: `$injectedColor: orange;`,
        importers: [
          // ...
        ],
      },
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `css.postcss` | `string \| (postcss.ProcessOptions & { plugins?: postcss.AcceptedPlugin[] })` | project root search | Inline PostCSS config, or a custom directory to search PostCSS config from. |
| `css.preprocessorOptions` | `Record<string, object>` | — | Options passed to CSS pre-processors, keyed by file extension. |
| `css.preprocessorOptions[extension].additionalData` | `string \| ((source: string, filename: string) => (string \| { content: string; map?: SourceMap }))` | — | Inject extra code for each style content. |
| `css.preprocessorMaxWorkers` | `number \| true` | `true` | Maximum threads CSS preprocessors can use. `true` = number of CPUs minus 1; `0` = run in the main thread. |
| `css.devSourcemap` | `boolean` | `false` | Enable sourcemaps during dev. |

## Notes

- `css.postcss` inline config expects the same format as `postcss.config.js`, but `plugins` only supports the array format. Search uses postcss-load-config; config files outside the workspace root (or project root if no workspace is found) are not searched by default. If an inline config is provided, Vite does not search other PostCSS config sources.
- Supported pre-processors: `sass` / `scss` (uses `sass-embedded` if installed, otherwise `sass`; `sass-embedded` recommended for performance), `less`, `styl` / `stylus` (only `define` supported, passed as an object).
- `additionalData`: if it includes actual styles (not just variables), those styles are duplicated in the final bundle. Since the same code is prepended to files in different directories, relative paths do not resolve correctly; use absolute paths or aliases.
- `css.preprocessorMaxWorkers`: depending on the preprocessor options, Vite may run preprocessors on the main thread even if not set to `0`.
- `css.devSourcemap`: Experimental.

## Related

- [css.modules](./css-modules-options.md)
- [CSS](../features/css.md)
- [CSS Pre-processors / Lightning CSS](../features/css-preprocessors-lightningcss.md)
