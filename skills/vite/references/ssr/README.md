# ssr

| Name | Description | Path |
|------|-------------|------|
| Conditional Logic (import.meta.env.SSR) | Branch on SSR vs. client with `import.meta.env.SSR`. | [conditional-logic.md](./conditional-logic.md) |
| Generating Preload Directives | `vite build --ssrManifest` generates an SSR manifest mapping mo… | [preload-directives.md](./preload-directives.md) |
| Pre-Rendering / SSG | Routes and data known ahead of time can be pre-rendered to st… | [prerendering-ssg.md](./prerendering-ssg.md) |
| Setting Up the SSR Dev Server | Run Vite in middleware mode inside your own main server (exa… | [ssr-dev-server.md](./ssr-dev-server.md) |
| SSR Externals | Dependencies are externalized from Vite's SSR transform modu… | [ssr-externals.md](./ssr-externals.md) |
| ssr.* Options | SSR configuration options. Unless noted, applied to both dev and build. | [ssr-options.md](./ssr-options.md) |
| SSR Overview & Source Structure | Vite provides built-in (low-level) support for server-side re… | [ssr-overview.md](./ssr-overview.md) |
| SSR-specific Plugin Logic | Vite passes an extra `ssr` property in the `options` object o… | [ssr-plugin-logic.md](./ssr-plugin-logic.md) |
| Building SSR for Production | Produce a client build and an SSR build, then load the SSR output directly with `import()`. | [ssr-production-build.md](./ssr-production-build.md) |
| SSR Target / Bundle / Resolve Conditions / CLI | Choose the SSR build target, bundle everything into one file, c… | [ssr-target-bundle.md](./ssr-target-bundle.md) |
