# ssr

| Name | Description | Path |
|------|-------------|------|
| Conditional Logic (import.meta.env.SSR) | Branch on SSR vs. client with `import.meta.env.SSR`. | [conditional-logic.md](./conditional-logic.md) |
| Generating Preload Directives | `vite build --ssrManifest` generates an SSR manifest mapping module IDs to chunks and assets, used to render preload directives. | [preload-directives.md](./preload-directives.md) |
| Pre-Rendering / SSG | Routes and data known ahead of time can be pre-rendered to static HTML with the same logic as production SSR (a form of Static-Site Generation). | [prerendering-ssg.md](./prerendering-ssg.md) |
| Setting Up the SSR Dev Server | Run Vite in middleware mode inside your own main server (example with express), then serve transformed HTML and server-rendered markup. | [ssr-dev-server.md](./ssr-dev-server.md) |
| SSR Externals | Dependencies are externalized from Vite's SSR transform module system by default, speeding up dev and build. | [ssr-externals.md](./ssr-externals.md) |
| ssr.* Options | SSR configuration options. Unless noted, applied to both dev and build. | [ssr-options.md](./ssr-options.md) |
| SSR Overview & Source Structure | Vite provides built-in (low-level) support for server-side rendering of front-end frameworks, and a typical SSR app splits its source into universal app code, a client entry, and a server entry. | [ssr-overview.md](./ssr-overview.md) |
| SSR-specific Plugin Logic | Vite passes an extra `ssr` property in the `options` object of `resolveId`, `load`, and `transform` hooks so plugins can transform conditionally for client vs. SSR. | [ssr-plugin-logic.md](./ssr-plugin-logic.md) |
| Building SSR for Production | Produce a client build and an SSR build, then load the SSR output directly with `import()`. | [ssr-production-build.md](./ssr-production-build.md) |
| SSR Target / Bundle / Resolve Conditions / CLI | Choose the SSR build target, bundle everything into one file, customize resolve conditions, and add SSR middlewares to the CLI dev/preview servers. | [ssr-target-bundle.md](./ssr-target-bundle.md) |
