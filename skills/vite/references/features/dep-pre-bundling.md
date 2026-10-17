---
source: https://vite.dev/guide/dep-pre-bundling
---

# Dependency Pre-Bundling

On first `vite` run, Vite pre-bundles project dependencies before loading the site locally, automatically and transparently. Pre-bundling only applies in development mode.

## Signature / Usage

Linked monorepo dependency that is not exported as ESM, added to `optimizeDeps.include`:

```js
import { defineConfig } from 'vite'

export default defineConfig({
  optimizeDeps: {
    include: ['linked-dep'],
  },
})
```

Smart import analysis lets named imports of CommonJS modules work even if exports are dynamically assigned:

```js
// works as expected
import React, { useState } from 'react'
```

## Notes

- Purposes: (1) CommonJS and UMD compatibility: dev serves all code as native ESM, so CommonJS/UMD dependencies are converted to ESM first. (2) Performance: ESM dependencies with many internal modules are converted into a single module; e.g. `lodash-es` has over 600 internal modules, which would otherwise cause 600+ simultaneous HTTP requests for `import { debounce } from 'lodash-es'`.
- Automatic discovery: if no cache exists, Vite crawls source code, discovers bare imports expecting resolution from `node_modules`, and uses them as pre-bundle entry points (performed with Rolldown). If a new dependency import is encountered after server start, Vite re-runs dep bundling and reloads the page if needed.
- Monorepos: dependencies not resolved from `node_modules` (linked packages) are treated as source code; Vite does not bundle them and analyzes their dependency list instead. This requires the linked dep to be exported as ESM, otherwise add it to `optimizeDeps.include`. After changing a linked dep, restart the dev server with `--force`.
- Customizing: use `optimizeDeps` options to include/exclude dependencies. Typical case: an import created by a plugin transform is not discoverable on the initial scan and causes an immediate re-bundle after server start. Include dependencies that are large (many internal modules) or CommonJS; exclude small dependencies that are already valid ESM so the browser loads them directly.
- Customize Rolldown further with `optimizeDeps.rolldownOptions`, e.g. adding a Rolldown plugin for special files in dependencies or changing the build `target`.

## Related

- [Dependency Caching](./dep-caching.md)
- [optimizeDeps entries / include / exclude](../config-dev/optimize-deps-entries-include-exclude.md)
- [optimizeDeps rolldown options](../config-dev/optimize-deps-rolldown-esbuild-options.md)
