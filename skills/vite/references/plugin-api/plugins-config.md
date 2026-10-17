---
source: https://vite.dev/guide/api-plugin#plugins-config
---

# Plugins Config

Users add plugins to the project `devDependencies` and configure them with the `plugins` array option.

## Signature / Usage

```js
import rollupPlugin from 'rollup-plugin-feature'
import vitePlugin from 'vite-plugin-feature'

export default defineConfig({
  plugins: [vitePlugin(), rollupPlugin()],
})
```

Presets (one element made of several plugins), flattened internally:

```js
import frameworkDevtools from 'vite-plugin-framework-devtools'
// framework-plugin
import frameworkRefresh from 'vite-plugin-framework-refresh'

export default function framework(config) {
  return [frameworkRefresh(config), frameworkDevtools(config)]
}
```

```js
import { defineConfig } from 'vite'
import framework from 'vite-plugin-framework'

export default defineConfig({
  plugins: [framework()],
})
```

## Notes

- Falsy plugins are ignored, which makes it easy to activate or deactivate plugins.
- `plugins` accepts presets including several plugins as a single element; useful for complex features such as framework integration. The array is flattened internally.

- The upstream example calls `frameworkDevTools` (case mismatch with the import); unified to `frameworkDevtools`.

## Related

- [Plugin Ordering / Conditional Application](./plugin-ordering-conditional.md)
- [Authoring a Plugin / Conventions](./authoring-conventions.md)
