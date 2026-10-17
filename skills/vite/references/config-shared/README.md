# config-shared

| Name | Description | Path |
|------|-------------|------|
| appType | Whether the app is a SPA, an MPA, or a custom application. | [app-type.md](./app-type.md) |
| assetsInclude | Additional picomatch patterns to treat as static assets. | [assets-include.md](./assets-include.md) |
| Conditional / Async Config | The config can export a function to decide options by command or mode. | [conditional-async-config.md](./conditional-async-config.md) |
| Configuring Vite (vite.config, defineConfig) | Vite automatically resolves a config file named `vite.config.js` in the project root. | [configuring-vite.md](./configuring-vite.md) |
| css.modules | Configure CSS modules behavior. Options are passed to postcss-modules. | [css-modules-options.md](./css-modules-options.md) |
| css.postcss / css.preprocessorOptions / css.devSourcemap | PostCSS config, pre-processor options, and dev sourcemaps. | [css-postcss-preprocessor-options.md](./css-postcss-preprocessor-options.md) |
| css.transformer / css.lightningcss | Select the CSS processing engine and configure Lightning CSS. | [css-transformer-lightningcss.md](./css-transformer-lightningcss.md) |
| define | Global constant replacements. Entries are defined as globals during dev. | [define.md](./define.md) |
| devtools | Enable Vite DevTools integration for inspecting the dev server and analyzing builds. | [devtools.md](./devtools.md) |
| envDir / envPrefix | Where `.env` files are loaded from, and which env variables are exposed to client code. | [env-dir-prefix.md](./env-dir-prefix.md) |
| Using Environment Variables in Config | Only variables already in `process.env` are available while the config is evaluated. | [env-in-config.md](./env-in-config.md) |
| future | Opt in to future breaking changes to prepare for the next major version of Vite. | [future.md](./future.md) |
| html.cspNonce / html.additionalAssetSources | HTML-related options: CSP nonce placeholder and extra asset sources. | [html-options.md](./html-options.md) |
| input | Entry points of the application, resolved relative to the project root. | [input.md](./input.md) |
| json.namedExports / json.stringify | Options for importing `.json` files. | [json-options.md](./json-options.md) |
| logLevel / customLogger / clearScreen | Console output verbosity, custom logger, and terminal clearing. | [logging-options.md](./logging-options.md) |
| oxc / esbuild (deprecated) | `oxc` configures the Oxc transformer used for JavaScript transformation. | [oxc-esbuild.md](./oxc-esbuild.md) |
| plugins / publicDir / cacheDir | Plugin array, static asset directory, and cache directory. | [plugins-public-cache-dir.md](./plugins-public-cache-dir.md) |
| resolve.alias | Aliases used to replace values in `import` or `require` statements. | [resolve-alias.md](./resolve-alias.md) |
| resolve.* (dedupe, conditions, mainFields, extensions, preserveSymlinks, tsconfigPaths) | Module resolution options other than `resolve.alias`. | [resolve-options.md](./resolve-options.md) |
| root / base / mode | Project root directory, public base path, and mode. | [root-base-mode.md](./root-base-mode.md) |
| tsconfig | Path to the TypeScript configuration file used by Vite. | [tsconfig.md](./tsconfig.md) |
