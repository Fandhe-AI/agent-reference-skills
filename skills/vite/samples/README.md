# samples

| Name | Description | Path |
|------|-------------|------|
| Backend Integration with the Build Manifest | Serve Vite assets from a traditional backend using a custom entry, dev tags, and `.vite/manifest.json`. | [backend-integration-manifest.md](./backend-integration-manifest.md) |
| Basic Config | Create a typed `vite.config.ts` with the `defineConfig` helper. | [basic-config.md](./basic-config.md) |
| Conditional Config with Env Variables | Branch the config on `command` / `mode` and load `.env*` values into the config with `loadEnv`. | [conditional-env-config.md](./conditional-env-config.md) |
| Custom HMR Events | Send custom events between a plugin on the dev server and client code with `server.ws` and `import.meta.hot`. | [custom-hmr-events.md](./custom-hmr-events.md) |
| Dev Server Proxy | Forward selected request paths from the dev server to another backend with `server.proxy`. | [dev-proxy.md](./dev-proxy.md) |
| Env Variables and Type Augmentation | Expose `VITE_`-prefixed variables from `.env` files and type them via `ImportMetaEnv`. | [env-variables-typing.md](./env-variables-typing.md) |
| Environment API: Per-environment Plugin | Apply a plugin per Environment API environment with `applyToEnvironment` and keep state keyed by `this.environment`. | [environment-api-plugin.md](./environment-api-plugin.md) |
| Deploy to GitHub Pages | Set `base` and deploy the `dist` folder with a GitHub Actions workflow. | [github-pages-deploy.md](./github-pages-deploy.md) |
| Glob Import | Import many modules at once with `import.meta.glob`, lazily or eagerly. | [glob-import.md](./glob-import.md) |
| HMR: accept and dispose | Make a module an HMR boundary and clean up side effects when it is replaced. | [hmr-accept.md](./hmr-accept.md) |
| JavaScript API: createServer, build, preview | Start the dev server, run a build, or start the preview server programmatically. | [javascript-api-server-build.md](./javascript-api-server-build.md) |
| Library Mode | Bundle a browser-oriented library with `build.lib`, externalizing peer dependencies. | [library-mode.md](./library-mode.md) |
| Migrate esbuild Options to Rolldown / Oxc (v7 to v8) | Inspect how Vite v8 converts deprecated `optimizeDeps.esbuildOptions` and `esbuild` options, then write the new options directly. | [migrate-esbuild-to-rolldown-options.md](./migrate-esbuild-to-rolldown-options.md) |
| Module Runner | Create a `ModuleRunner` in the target runtime and import an entry through a transport. | [module-runner.md](./module-runner.md) |
| Multi-Page App | Build several HTML entry points by listing them in the config `input`. | [multi-page-app.md](./multi-page-app.md) |
| Plugin: configureServer Middleware | Add custom middleware to the dev server, before or after the internal middlewares. | [plugin-configure-server.md](./plugin-configure-server.md) |
| Plugin: Transform Custom File Types | Compile a custom file extension to JavaScript with a `transform` hook and a hook filter. | [plugin-transform-custom-file.md](./plugin-transform-custom-file.md) |
| Plugin: transformIndexHtml | Rewrite the HTML entry file from a plugin. | [plugin-transform-index-html.md](./plugin-transform-index-html.md) |
| Plugin: Virtual Module | Expose build-time data to source files through a `virtual:` import using `resolveId` and `load`. | [plugin-virtual-module.md](./plugin-virtual-module.md) |
| SSR Dev Server with Express (Middleware Mode) | Run Vite inside your own Express server in middleware mode and render `index.html` per request. | [ssr-dev-server-express.md](./ssr-dev-server-express.md) |
| SSR Production Build | Produce a client build and an SSR build with separate output directories. | [ssr-production-build.md](./ssr-production-build.md) |
| Web Workers | Import a worker script with the `new Worker(new URL(...))` constructor or a `?worker` query suffix. | [web-workers.md](./web-workers.md) |
