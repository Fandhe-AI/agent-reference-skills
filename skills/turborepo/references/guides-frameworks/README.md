# guides-frameworks

| Name | Description | Path |
|------|-------------|------|
| Framework Bindings for Libraries | Declare framework APIs used inside a library package as peerDependencies so the consumer's installed framework version is resolved. | [framework-bindings.md](./framework-bindings.md) |
| Next.js | By default, tasks from the root turbo.json are used. App-specific configuration can override this via Package Configurations. | [nextjs.md](./nextjs.md) |
| Nuxt | Nuxt uses Vite internally, so set base in vite.config.ts: | [nuxt.md](./nuxt.md) |
| Rsbuild | Rsbuild uses server.base as the default asset prefix for both development and production, so set server.base in child applications. | [rsbuild.md](./rsbuild.md) |
| SvelteKit | SvelteKit is also Vite-based, so set base in vite.config.ts: | [sveltekit.md](./sveltekit.md) |
| Vite | Use the with-vite-module-federation template for runtime module sharing: | [vite.md](./vite.md) |
