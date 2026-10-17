---
source: https://vite.dev/guide/features#build-optimizations
---

# Build Optimizations

Features applied automatically during build (except the experimental chunk import map), with no explicit configuration needed unless you want to disable them.

## Signature / Usage

Async chunk loading: without optimization, the browser requests and parses async chunk `A` before discovering it needs common chunk `C`, causing an extra round trip:

```
Entry ---> A ---> C
```

Vite rewrites code-split dynamic import calls with a preload step so `C` is fetched in parallel:

```
Entry ---> (A + C)
```

## Notes

- CSS Code Splitting: CSS used by modules in an async chunk is extracted into a separate file, loaded via a `<link>` tag when the async chunk loads; the chunk is only evaluated after the CSS is loaded to avoid FOUC. Disable with `build.cssCodeSplit: false`.
- Preload Directives Generation: Vite generates `<link rel="modulepreload">` directives for entry chunks and their direct imports in the built HTML.
- Async Chunk Loading Optimization: Vite traces all direct imports to eliminate round trips regardless of import depth.
- Chunk Import Map Optimization (Experimental): Vite creates an import map mapping each chunk's ID to its URL and uses the chunk ID in import statements, so updating a chunk only invalidates that chunk and not chunks referencing it (avoids cascading cache invalidation). It currently does not apply to CSS and assets: updating an asset invalidates the chunks referencing it, but the invalidation does not cascade. Enable via `build.chunkImportMap: true`.

## Related

- [build.chunkImportMap](../config-build/build-chunk-import-map.md)
- [build.cssCodeSplit](../config-build/build-css-options.md)
- [Preload directives (SSR)](../ssr/preload-directives.md)
