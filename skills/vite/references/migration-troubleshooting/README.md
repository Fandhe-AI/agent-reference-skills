# migration-troubleshooting

| Name | Description | Path |
|------|-------------|------|
| Breaking Changes (planned / considering / past) | List of breaking changes in Vite including API deprecations, removals,… | [breaking-changes.md](./breaking-changes.md) |
| HMR hotUpdate Plugin Hook | Plan to deprecate `handleHotUpdate` in favor of the Environment API aware… | [change-hotupdate-hook.md](./change-hotupdate-hook.md) |
| Move to Per-environment APIs | Multiple `ViteDevServer` APIs related to the module graph and module… | [change-per-environment-apis.md](./change-per-environment-apis.md) |
| Shared Plugins during Build | Aligns dev and build plugin pipelines by sharing plugins across… | [change-shared-plugins-during-build.md](./change-shared-plugins-during-build.md) |
| SSR Using ModuleRunner API | `server.ssrLoadModule` has been replaced by importing from a Module Runner… | [change-ssr-using-modulerunner.md](./change-ssr-using-modulerunner.md) |
| this.environment in Hooks | `this.environment` in the plugin context replaces the `options.ssr`… | [change-this-environment-in-hooks.md](./change-this-environment-in-hooks.md) |
| Migration: Advanced (plugin / framework authors) | Breaking changes from v7 expected to affect only a minority of use cases. | [migration-advanced.md](./migration-advanced.md) |
| Build Option & API Removals (manualChunks, BundleError) | Removed `chokidar` watch option, removed object form and deprecated… | [migration-build-api-changes.md](./migration-build-api-changes.md) |
| Minification & CommonJS Interop Changes | JavaScript minification moves to the Oxc Minifier, CSS minification to… | [migration-minify-interop.md](./migration-minify-interop.md) |
| Dependency Optimizer & JS Transforms (Rolldown / Oxc) | The dependency optimizer now uses Rolldown instead of esbuild, and… | [migration-rolldown-oxc.md](./migration-rolldown-oxc.md) |
| Migration from v7 (overview) | Vite 8 uses Rolldown and Oxc based tools instead of esbuild and Rollup… | [migration-v7-overview.md](./migration-v7-overview.md) |
| Performance | Guide to identifying and fixing slow server starts, slow page loads and… | [performance.md](./performance.md) |
| Troubleshooting: Build / Optimized Dependencies | Fixes for CORS errors on `file://` output, case-sensitivity errors… | [troubleshooting-build-deps.md](./troubleshooting-build-deps.md) |
| Troubleshooting: CLI / Config | Fixes for CLI path errors on Windows and "This package is ESM only" errors… | [troubleshooting-cli-config.md](./troubleshooting-cli-config.md) |
| Troubleshooting: Dev Server | Fixes for stalled requests, ENOSPC watcher limits, self-signed certificates… | [troubleshooting-dev-server.md](./troubleshooting-dev-server.md) |
| Troubleshooting: HMR | Causes when HMR does not work, file changes are not detected, or a full… | [troubleshooting-hmr.md](./troubleshooting-hmr.md) |
| Troubleshooting: Performance Bottlenecks / Others | CPU profiling with the Node.js inspector, plus Node.js module… | [troubleshooting-others.md](./troubleshooting-others.md) |
