# Config (next.config.js, TypeScript, ESLint, CLI)

| Name | Description | Path |
|------|-------------|------|
| Build & Output Options | `next.config.js` options controlling build artifacts, output format, and response headers related to the build/serving pipeline. | [build-output.md](./build-output.md) |
| Bundling, Compiler & CSS Options | `next.config.js` options for webpack/Turbopack customization, CSS processing, MDX compilation, package import optimization, and monorepo dependency handling. | [bundling.md](./bundling.md) |
| Caching Options | `next.config.js` options controlling data/render caching: Cache Components, custom cache handlers, cache lifetimes, ISR expiry, and client-side navigation caching. | [caching.md](./caching.md) |
| create-next-app | CLI to scaffold a new Next.js application from the default template or a public GitHub example. | [create-next-app.md](./create-next-app.md) |
| Deployment & Infrastructure Options | `next.config.js` options related to deployment, adapters, and infrastructure-level request handling. | [deployment.md](./deployment.md) |
| Development Environment Options | `next.config.js` options that only affect local development server behavior. | [dev-environment.md](./dev-environment.md) |
| Environment, Build Checks & Diagnostics | `next.config.js` options for bundling environment variables, controlling TypeScript build-error strictness, dev logging, and Web Vitals attribution. | [env-and-checks.md](./env-and-checks.md) |
| ESLint Plugin | Next.js's `eslint-config-next` package catches common issues in a Next.js app, bundling `@next/eslint-plugin-next` plus recommended `eslint-plugin-react` / `eslint-plugin-react-hooks` rule sets. | [eslint.md](./eslint.md) |
| headers, redirects, rewrites | `next.config.js` async functions for setting custom HTTP headers, redirecting request paths, and rewriting (proxying) request paths. All three share the same `source` path-matching syntax and `has` / `missing` conditional matching. | [headers-redirects-rewrites.md](./headers-redirects-rewrites.md) |
| images | Custom configuration for the `next/image` loader, primarily for using an external image optimization provider instead of the built-in Image Optimization API. | [images.md](./images.md) |
| next CLI | The `next` CLI runs the dev server, builds, starts, and inspects a Next.js application. | [next-cli.md](./next-cli.md) |
| next.config.js | `next.config.js` (or `.mjs`/`.ts`) is a Node.js module in the project root that configures a Next.js application via a default export. | [overview.md](./overview.md) |
| React Runtime & Experimental Features | `next.config.js` options that toggle React runtime behavior, Server Actions, and experimental React APIs surfaced through Next.js. | [react-experimental.md](./react-experimental.md) |
| Routing Options | `next.config.js` options that affect URL resolution and route typing. | [routing.md](./routing.md) |
| TypeScript | Next.js provides a TypeScript-first development experience: auto-installed dependencies, a custom IDE plugin/type-checker, and route-aware generated types. | [typescript.md](./typescript.md) |
