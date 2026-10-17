---
source: https://vite.dev/guide/ssr#ssr-externals
---

# SSR Externals

Dependencies are externalized from Vite's SSR transform module system by default, speeding up dev and build.

## Signature / Usage

```js
// vite.config.js
export default defineConfig({
  ssr: {
    noExternal: ['some-dep'], // transform this dependency through Vite
    external: ['linked-dep'], // externalize a linked dependency
  },
})
```

## Notes

- The snippet is illustrative of the options named on the page (`ssr.noExternal`, `ssr.external`); the page itself has no code block for this section.
- A dependency that needs Vite's pipeline (for example because it uses Vite features untranspiled) can be added to `ssr.noExternal`.
- Linked dependencies are not externalized by default, to take advantage of HMR. To test them as if not linked, add them to `ssr.external`.
- Working with aliases: if aliases redirect one package to another, alias the actual `node_modules` packages instead so it works for externalized dependencies. Yarn and pnpm support aliasing via the `npm:` prefix.

## Related

- [ssr.* Options](./ssr-options.md)
- [SSR Target / Bundle](./ssr-target-bundle.md)
