---
source: https://vite.dev/config/#conditional-config
---

# Conditional / Async Config

The config can export a function to decide options by command, mode, SSR build, or preview; it can also be async.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'serve') {
    return {
      // dev specific config
    }
  } else {
    // command === 'build'
    return {
      // build specific config
    }
  }
})
```

Async:

```js
export default defineConfig(async ({ command, mode }) => {
  const data = await asyncFunction()
  return {
    // vite config
  }
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `command` | `'serve' \| 'build'` | `serve` during dev (`vite`, `vite dev`, `vite serve` are aliases); `build` for `vite build`. |
| `mode` | `string` | The mode being used. |
| `isSsrBuild` | optional flag | Distinguishes the kind of `build` command. |
| `isPreview` | optional flag | Distinguishes the kind of `serve` command (previewing the build). |

## Notes

- Some tools that load the Vite config may not support `isSsrBuild` / `isPreview` and will pass `undefined`. Use explicit comparison against `true` and `false`.
- The async function can also be passed through `defineConfig` for intellisense.

## Related

- [Configuring Vite](./configuring-vite.md)
- [Using Environment Variables in Config](./env-in-config.md)
