---
source: https://vite.dev/config/shared-options#devtools
---

# devtools

Enable Vite DevTools integration for inspecting the dev server and analyzing builds.

## Signature / Usage

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  devtools: {
    apply: 'serve',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `devtools` | `boolean \| DevToolsConfig` | `false` | Enable devtools integration. `DevToolsConfig` type definitions come from `@vitejs/devtools` once installed. |
| `devtools.apply` | `DevToolsConfig` field (`'serve'` in the example; exact type defined by `@vitejs/devtools`) | both | DevTools runs for both `serve` and `build` by default; use `apply` to limit it to either command. |

## Notes

- Experimental.
- Requires `@vitejs/devtools` installed as a dependency. Install `@vitejs/devtools-vite` to inspect the dev server and `@vitejs/devtools-rolldown` to enable build analysis.
- Plugin `config` hooks cannot change the `devtools` option; set it in the user config.

## Related

- [Configuring Vite](./configuring-vite.md)
