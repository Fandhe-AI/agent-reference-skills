# javascript-api

| Name | Description | Path |
|------|-------------|------|
| build | Runs a production build programmatically. | [build.md](./build.md) |
| createServer | Creates a Vite dev server programmatically and returns a `ViteDevServer`. | [create-server.md](./create-server.md) |
| InlineConfig / ResolvedConfig | `InlineConfig` is the config object accepted by the JavaScript APIs; `ResolvedConfig` is the resolved form exposed on servers and to plugins. | [inline-resolved-config.md](./inline-resolved-config.md) |
| loadConfigFromFile | Loads a Vite config file manually with Rolldown. | [load-config-from-file.md](./load-config-from-file.md) |
| loadEnv | Loads `.env` files within `envDir` and merges them with matching variables already in `process.env`. | [load-env.md](./load-env.md) |
| mergeConfig | Deeply merges two Vite configs. | [merge-config.md](./merge-config.md) |
| normalizePath | Normalizes a path to interoperate between Vite plugins. | [normalize-path.md](./normalize-path.md) |
| preprocessCSS | Pre-processes CSS-family files to plain CSS. Experimental. | [preprocess-css.md](./preprocess-css.md) |
| preview / PreviewServer | Starts a server that serves the production build output locally, and returns a `PreviewServer`. | [preview.md](./preview.md) |
| resolveConfig | Resolves an `InlineConfig` into a `ResolvedConfig`. | [resolve-config.md](./resolve-config.md) |
| searchForWorkspaceRoot | Searches for the root of the potential workspace. | [search-for-workspace-root.md](./search-for-workspace-root.md) |
| transformWithOxc / transformWithEsbuild | Transform JavaScript or TypeScript with Oxc Transformer (`transformWithOxc`) or esbuild (`transformWithEsbuild`, deprecated). | [transform-with-oxc-esbuild.md](./transform-with-oxc-esbuild.md) |
| version / rolldownVersion / esbuildVersion / rollupVersion | String constants exported by `vite` describing versions. | [version-constants.md](./version-constants.md) |
| ViteDevServer | The dev server instance returned by `createServer`. | [vite-dev-server.md](./vite-dev-server.md) |
