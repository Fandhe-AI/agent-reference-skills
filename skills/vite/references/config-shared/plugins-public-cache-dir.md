---
source: https://vite.dev/config/shared-options#plugins
---

# plugins / publicDir / cacheDir

Plugin array, static asset directory, and cache directory.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  publicDir: 'public',
  cacheDir: 'node_modules/.vite',
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `plugins` | `(Plugin \| Plugin[] \| Promise<Plugin \| Plugin[]>)[]` | — | Plugins to use. Falsy plugins are ignored and arrays are flattened. A returned promise is resolved before running. |
| `publicDir` | `string \| false` | `"public"` | Directory served as plain static assets: served at `/` during dev, copied to the root of `outDir` during build, always as-is without transform. Absolute path or relative to project root. `false` disables the feature. |
| `cacheDir` | `string` | `"node_modules/.vite"` | Directory for cache files (pre-bundled deps and other cache). Absolute path or relative to project root. Defaults to `.vite` when no `package.json` is detected. |

## Notes

- Use the `--force` flag or delete `cacheDir` manually to regenerate cache files.
- See the Plugin API guide for details on Vite plugins, and The `public` Directory guide for `publicDir`.

## Related

- Authoring conventions
- [Public directory](../assets-env/public-directory.md)
- Dependency caching
