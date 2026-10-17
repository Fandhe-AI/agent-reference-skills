---
source: https://vite.dev/guide/ssr#ssr-specific-plugin-logic
---

# SSR-specific Plugin Logic

Vite passes an extra `ssr` property in the `options` object of `resolveId`, `load`, and `transform` hooks so plugins can transform conditionally for client vs. SSR.

## Signature / Usage

```js
export function mySSRPlugin() {
  return {
    name: 'my-ssr',
    transform(code, id, options) {
      if (options?.ssr) {
        // perform ssr-specific transform...
      }
    },
  }
}
```

## Notes

- Applies to hooks: `resolveId`, `load`, `transform`. Some frameworks (Vue, Svelte) compile components into different formats for client vs. SSR.
- The options object in `load` and `transform` is optional; Rollup does not currently use this object but may extend these hooks with metadata in the future.
- Before Vite 2.7, this was passed as a positional `ssr` param instead of the `options` object. Outdated posts may show the previous API.
- For per-environment plugin logic, see the Environment API pages (this.environment).

## Related

- [Conditional Logic](./conditional-logic.md)
- [Per-environment Hooks](../environment-api/per-environment-hooks.md)
