---
source: https://vite.dev/guide/api-plugin#rolldown-hooks
---

# Rolldown (Universal) Hooks

During dev, the Vite dev server creates a plugin container that invokes Rolldown Build Hooks the same way Rolldown does. All Rolldown hooks are per-environment hooks.

## Signature / Usage

```js
export default function myPlugin() {
  return {
    name: 'my-plugin',
    resolveId(source, importer, options) {},
    load(id, options) {},
    transform(code, id, options) {},
  }
}
```

### Hook call timing during dev

| When | Hooks |
|------|-------|
| Once on server start | `options`, `buildStart` |
| On each incoming module request | `resolveId`, `load`, `transform` |
| When the server is closed | `buildEnd`, `closeBundle` |

## Notes

- `resolveId`, `load`, `transform` receive an extended `options` parameter with additional Vite-specific properties (see the SSR docs section "SSR-specific Plugin Logic").
- Some `resolveId` calls' `importer` may be an absolute path for a generic `index.html` at root, since the actual importer cannot always be derived with Vite's unbundled dev server pattern. For imports handled within Vite's resolve pipeline, the importer is tracked during import analysis and is correct.
- The `moduleParsed` hook is **not** called during dev, because Vite avoids full AST parses for performance.
- Output Generation Hooks (except `closeBundle`) are **not** called during dev.

## Related

- [Rolldown Plugin Compatibility](./rolldown-compatibility.md)
- [config / configResolved](./hook-config.md)
