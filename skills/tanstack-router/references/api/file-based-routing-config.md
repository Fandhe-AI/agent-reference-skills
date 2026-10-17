---
source: https://tanstack.com/router/latest/docs/api/file-based-routing
---

# File-Based Routing API (generator config)

Configuration options for TanStack Router's file-based routing generator.

## Signature / Usage

```ts
// Example: replace .tsx/.ts extensions with .js in generated imports
import { tanstackRouter } from '@tanstack/router-plugin/vite'

tanstackRouter({
  addExtensions: 'js',
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `routesDirectory` (required) | `string` | `./src/routes` | Path to the directory with route files, relative to cwd. Cannot be empty or `undefined` |
| `generatedRouteTree` (required) | `string` | `./src/routeTree.gen.ts` | Path where the generated route tree is saved, relative to cwd. Cannot be empty or `undefined`. Saved with `.js` instead of `.ts` if `disableTypes` is `true` |
| `virtualRouteConfig` | | `undefined` | Configures the Virtual File Routes feature |
| `routeFilePrefix` | `string` | `` (empty) | Only files starting with this prefix are considered for routing |
| `routeFileIgnorePrefix` | `string` | `-` | Files and directories starting with this prefix are ignored, allowing co-located non-route files (e.g. `-components`) |
| `routeFileIgnorePattern` | regex string | `undefined` | Ignores files/directories matching the pattern, e.g. `.((css\|const).ts)\|test-page` ignores `.css.ts`, `.const.ts` or `test-page` |
| `routeToken` | `string \| { regex, flags? } \| RegExp` | `route` | Identifies the layout route file |
| `indexToken` | `string \| { regex, flags? } \| RegExp` | `index` | Identifies the index route file |
| `quoteStyle` | `'single' \| 'double'` | `single` | Quote style for the generated route tree and newly created route files |
| `semicolons` | `boolean` | `false` | Whether the generated route tree and new route files use semicolons |
| `autoCodeSplitting` | `boolean` | `false` | Automatic code-splitting for non-critical route configuration items. Only available with the TanStack Router Bundler Plugin |
| `disableTypes` | `boolean` | `false` | If `true`, the generated route tree has no types and is written as `.js` |
| `addExtensions` | `boolean \| string` | `false` | `false` strips extensions from import paths (`'./routes/posts'`); `true` keeps original extensions (`'./routes/posts.tsx'`); a string replaces the extension (`'js'` gives `'./routes/posts.js'`) |
| `disableLogging` | `boolean` | `false` | Turns off console logging for route generation |
| `routeTreeFileHeader` | `string[]` | `["/* eslint-disable */", "// @ts-nocheck", "// noinspection JSUnusedGlobalSymbols"]` | Content prepended to the generated route tree file |
| `routeTreeFileFooter` | `string[]` | `[]` | Content appended to the generated route tree file |
| `enableRouteTreeFormatting` | `boolean` | `true` | Formats the generated route tree file; can be time-consuming for large projects |
| `tmpDir` | `string` | `process.env.TSR_TMP_DIR`, else `.tanstack/tmp` | Temp directory used for atomic file writes (temp file created, then renamed). Relative paths resolve against cwd |

## Notes

- The official page's example calls this plugin as `TanStackRouterVite` (without an import); this page uses `tanstackRouter` from `@tanstack/router-plugin/vite` to match the installation guides.
- Do not set `routeFilePrefix`, `routeFileIgnorePrefix`, or `routeFileIgnorePattern` to match any tokens used in the File Naming Conventions guide, or you may run into unexpected behavior.
- `routeToken` examples with equal runtime URL: `src/routes/posts.tsx`, `src/routes/posts.route.tsx`, `src/routes/posts/route.tsx` all map to `/posts`. For `indexToken`: `src/routes/posts.index.tsx` and `src/routes/posts/index.tsx` both map to `/posts/`.
- Regex tokens: in `tsr.config.json` use `{ "routeToken": { "regex": "[a-z]+-layout", "flags": "i" } }`; in code use a native `RegExp` (`routeToken: /[a-z]+-layout/i`). The regex is matched against the entire final segment of the route path (`dashboard.main-layout.tsx` matches; `dashboard.my-layout-extra.tsx` does not). To keep a literal segment that would match a regex `indexToken`, wrap it in square brackets, e.g. `[home-page].tsx`.
- Ignore the generated route tree file in your linter and formatter to avoid conflicts with `quoteStyle` / `semicolons`.
- Next major release (v2) is planned to default `autoCodeSplitting` to `true`.

## Related

- [File-Based Routing](../core-routing/file-based-routing.md)
- [File Naming Conventions](../core-routing/file-naming-conventions.md)
- [Virtual File Routes](../core-routing/virtual-file-routes.md)
- [Installation with Vite](../getting-started/installation-with-vite.md)
- [createFileRoute](./create-file-route.md)
