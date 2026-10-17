---
source: https://vite.dev/config/shared-options#resolve-dedupe
---

# resolve.* (dedupe, conditions, mainFields, extensions, preserveSymlinks, tsconfigPaths)

Module resolution options other than `resolve.alias`.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    dedupe: ['react'],
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    tsconfigPaths: true,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `resolve.dedupe` | `string[]` | — | Force listed dependencies to always resolve to the same copy (from project root); for duplicated copies due to hoisting or linked packages in monorepos. |
| `resolve.conditions` | `string[]` | `['module', 'browser', 'development\|production']` (`defaultClientConditions`) | Additional allowed conditions when resolving Conditional Exports. |
| `resolve.mainFields` | `string[]` | `['browser', 'module', 'jsnext:main', 'jsnext']` (`defaultClientMainFields`) | `package.json` fields to try for a package entry point. Lower precedence than conditional exports from `exports`. |
| `resolve.extensions` | `string[]` | `['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']` | Extensions to try for imports that omit extensions. |
| `resolve.preserveSymlinks` | `boolean` | `false` | Determine file identity by the original path (not following symlinks) instead of the real path. |
| `resolve.tsconfigPaths` | `boolean` | `false` | Enable tsconfig `paths` resolution. |

## Notes

- `resolve.conditions` and `resolve.mainFields`: not inherited by environments.
- `resolve.dedupe` for SSR builds: deduplication does not work for ESM build outputs configured from `build.rolldownOptions.output`. Workaround is CJS build outputs until ESM has better plugin support for module loading.
- `resolve.conditions`: `development|production` is replaced with `production` when `process.env.NODE_ENV === 'production'`, otherwise `development`. `import`, `require`, `default` conditions are always applied if requirements are met. The `style` condition is applied when resolving style imports (e.g. `@import 'my-library'`); `sass` / `less` conditions are applied for those pre-processors. Conditions can be nested and should be specified from most specific to least specific.
- `resolve.extensions`: omitting extensions for custom import types (e.g. `.vue`) is not recommended since it can interfere with IDE and type support.
- `resolve.tsconfigPaths`: `paths` only applies to a file matched by a `tsconfig.json` through `files` or `include`. A bare `"src"` or `"**/*"` `include` matches only TS/JS extensions, so list non-JS files (e.g. `"src/**/*.css"`, `"src/**/*.scss"`) explicitly. Not applied inside `.less` files; use a relative path or `resolve.alias` there.

## Related

- [resolve.alias](./resolve-alias.md)
- [tsconfig](./tsconfig.md)
- SSR options
