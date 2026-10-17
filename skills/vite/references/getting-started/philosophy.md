---
source: https://vite.dev/guide/philosophy
---

# Project Philosophy

Design principles of Vite: lean extendable core, modern web, pragmatic performance, framework building, active ecosystem.

## Signature / Usage

The page has no code examples. It recommends the standard `new Worker` syntax (see the Web Workers section of features):

```js
const worker = new Worker(new URL('./worker.js', import.meta.url))
```

Web workers are encouraged to be written with the `new Worker` syntax to follow modern standards.

## Notes

- Lean Extendable Core: Vite supports the most common patterns out-of-the-box while keeping core lean. Its plugin system is based on a superset of Rollup's plugin API. Its bundler Rolldown maintains compatibility with Rollup's plugin interface, so plugins can often be used across both Vite and plain Rollup projects.
- Pushing the Modern Web: source code can only be written in ESM, with non-ESM dependencies pre-bundled as ESM; web workers should use the `new Worker` syntax; Node.js modules cannot be used in the browser. These patterns may not always be compatible with other build tools.
- Pragmatic Approach to Performance: based on native tools (Oxc toolchain and Rolldown) for intensive tasks, with the rest in JS. Framework plugins tap into Babel when needed to compile user code.
- Building Frameworks on Top of Vite: Vite core is framework agnostic. The JS API and SSR primitives let framework authors build on Vite; backend frameworks such as Ruby and Laravel pair well with it.
- Active Ecosystem: regressions are minimized using vite-ecosystem-ci, which runs the CI of major projects on selected PRs.

## Related

- [why-vite.md](./why-vite.md)
- [overview.md](./overview.md)
