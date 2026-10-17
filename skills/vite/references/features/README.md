# features

| Name | Description | Path |
|------|-------------|------|
| Build Optimizations | Features applied automatically during build (except the experimental chunk import map), with no explicit configuration needed unless you want to disable them. | [build-optimizations.md](./build-optimizations.md) |
| Client Types (vite/client) | Vite's default types are for its Node.js API. Add `vite/client` to shim the client-side environment. | [client-types.md](./client-types.md) |
| Content Security Policy (CSP) | Deploying a CSP requires certain directives or configs because of Vite's internals. | [content-security-policy.md](./content-security-policy.md) |
| CSS Modules | Any CSS file ending with `.module.css` is considered a CSS modules file. Importing it returns the corresponding module object. | [css-modules.md](./css-modules.md) |
| CSS Pre-processors / Lightning CSS | Vite has built-in support for `.scss`, `.sass`, `.less`, `.styl` and `.stylus` files. Lightning CSS minifies CSS in production builds by default. | [css-preprocessors-lightningcss.md](./css-preprocessors-lightningcss.md) |
| CSS (@import, PostCSS, injection) | Importing `.css` files injects its content to the page via a `<style>` tag with HMR support. | [css.md](./css.md) |
| Dependency Caching | Pre-bundled dependencies are cached on the file system and, in the browser, via strong HTTP cache headers. | [dep-caching.md](./dep-caching.md) |
| Dependency Pre-Bundling | On first `vite` run, Vite pre-bundles project dependencies before loading the site locally, automatically and transparently. | [dep-pre-bundling.md](./dep-pre-bundling.md) |
| Dynamic Import | Vite supports dynamic import with variables, similar to glob import. | [dynamic-import.md](./dynamic-import.md) |
| Frameworks / JSX | All modern frameworks maintain Vite integrations; `.jsx` and `.tsx` files are supported out of the box, transpiled by the Oxc Transformer. | [frameworks-jsx.md](./frameworks-jsx.md) |
| import.meta.glob | Vite supports importing multiple modules from the file system via `import.meta.glob`. Matched files are lazy-loaded via dynamic import by default and split into separate chunks at build. | [glob-import.md](./glob-import.md) |
| Hot Module Replacement | Vite provides an HMR API over native ESM so that frameworks can apply instant, precise updates without reloading the page or losing application state. | [hot-module-replacement.md](./hot-module-replacement.md) |
| HTML | HTML files are the entry points of a Vite project; assets referenced by supported elements are processed and bundled. | [html.md](./html.md) |
| JSON | JSON files can be imported directly. Named imports are also supported. | [json.md](./json.md) |
| License | Vite can generate a file of all dependency licenses used in the build with the `build.license` option. | [license.md](./license.md) |
| npm Dependency Resolving and Pre-Bundling | Vite detects bare module imports in all served source files, pre-bundles them, and rewrites the imports to valid URLs the browser can import. | [npm-dependency-resolving.md](./npm-dependency-resolving.md) |
| Static Assets (feature summary) | Importing a static asset returns the resolved public URL when it is served. Special queries modify how assets are loaded. | [static-assets.md](./static-assets.md) |
| TypeScript | Vite supports importing `.ts` files out of the box. It only transpiles; it does not type check. | [typescript.md](./typescript.md) |
| Web Workers | Vite bundles browser Web Worker scripts, imported either with the `new Worker()` constructor (recommended) or with query suffixes. | [web-workers.md](./web-workers.md) |
| WebAssembly | Vite supports importing pre-compiled `.wasm` files either directly as an ES module, or with `?init` for explicit control over instantiation. | [webassembly.md](./webassembly.md) |
