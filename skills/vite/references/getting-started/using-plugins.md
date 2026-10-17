---
source: https://vite.dev/guide/using-plugins
---

# Using Plugins

Add plugins to the `plugins` array of the Vite config; control order with `enforce` and applicability with `apply`.

## Signature / Usage

```bash
$ npm add -D @vitejs/plugin-legacy
```

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
})
```

Enforcing order:

```js
import image from '@rollup/plugin-image'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...image(),
      enforce: 'pre',
    },
  ],
})
```

Conditional application:

```js
import typescript2 from 'rollup-plugin-typescript2'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...typescript2(),
      apply: 'build',
    },
  ],
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `enforce: 'pre'` | modifier | Invoke plugin before Vite core plugins |
| `enforce` (default) | modifier | Invoke plugin after Vite core plugins |
| `enforce: 'post'` | modifier | Invoke plugin after Vite build plugins |
| `apply` | `'build' \| 'serve'` | Invoke the plugin only during build or serve (default: both) |

## Notes

- Vite plugins are based on Rollup's plugin interface with a few extra Vite-specific options, so Rollup plugins can be used.
- `plugins` also accepts presets bundling several plugins as a single element; the array is flattened internally. Falsy plugins are ignored, which makes toggling easy.
- Before searching for a plugin, check the Features Guide: many cases needing a plugin in a Rollup project are already covered in Vite.
- Community plugins published to npm are listed in the Vite Plugin Registry (`registry.vite.dev/plugins`).
- `enforce` is typically an implementation detail for Vite plugins; it is mainly for compatibility with some Rollup plugins.
- Plugin authoring is covered by the Plugin API guide. Plugin as a term here means a Vite config plugin, not a fastify plugin or a storybook addon.

## Related

- [official-plugins.md](./official-plugins.md)
- [plugin-legacy.md](./plugin-legacy.md)
