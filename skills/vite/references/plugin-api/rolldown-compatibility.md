---
source: https://vite.dev/guide/api-plugin#rolldown-plugin-compatibility
---

# Rolldown Plugin Compatibility

A fair number of Rolldown / Rollup plugins work directly as a Vite plugin (e.g. `@rollup/plugin-alias`, `@rollup/plugin-json`), but not all, since some hooks do not make sense in an unbundled dev server context.

## Signature / Usage

Augmenting an existing Rolldown / Rollup plugin with Vite-only properties:

```js
import example from 'rolldown-plugin-example'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      ...example(),
      enforce: 'post',
      apply: 'build',
    },
  ],
})
```

## Notes

- A Rolldown / Rollup plugin should just work as a Vite plugin if it: does not use the `moduleParsed` hook; does not rely on Rolldown specific options such as `transform.inject`; does not have strong coupling between bundle-phase hooks and output-phase hooks.
- A plugin that only makes sense for the build phase can be specified under `build.rolldownOptions.plugins`; it works the same as a Vite plugin with `enforce: 'post'` and `apply: 'build'`.

## Related

- [Plugin Ordering / Conditional Application](./plugin-ordering-conditional.md)
- [Rolldown Hooks](./rolldown-hooks.md)
