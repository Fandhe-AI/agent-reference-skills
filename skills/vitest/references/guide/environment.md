# Test Environment

## Signature / Usage

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

## Options / Props

| Environment | Description |
|-------------|-------------|
| `node` (default) | Node.js environment |
| `jsdom` | Browser API emulation via the jsdom package |
| `happy-dom` | Faster browser API emulation than jsdom (fewer APIs) |
| `edge-runtime` | Vercel Edge Runtime emulation |

## Notes

- Per-file override via a comment at the top of the test file:

```ts
// @vitest-environment jsdom

import { expect, test } from 'vitest'

test('DOM test', () => {
  expect(typeof window).not.toBe('undefined')
})
```

- Glob-based environment assignment (`environmentMatchGlobs`) was removed in v4.0 (source: Migrating to Vitest 4.0 § Deprecated APIs are Removed). The old v3-era snippet is kept for reference only:

```ts
// vitest.config.ts — REMOVED in v4.0, do not use
export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['**/*.dom.test.ts', 'jsdom'],
      ['**/*.node.test.ts', 'node'],
      ['**/*.edge.test.ts', 'edge-runtime'],
    ],
  },
})
```

  Replacement: `test.projects` with a per-project `environment`:

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    projects: [
      { test: { name: 'dom', include: ['**/*.dom.test.ts'], environment: 'jsdom' } },
      { test: { name: 'node', include: ['**/*.node.test.ts'], environment: 'node' } },
      { test: { name: 'edge', include: ['**/*.edge.test.ts'], environment: 'edge-runtime' } },
    ],
  },
})
```

- Custom environment: create a package named `vitest-environment-${name}` or specify a path to a valid JS/TS file. It should export an object with the shape of `Environment` (v5.0.5 docs):

```ts
import type { Environment } from 'vitest/runtime'

export default <Environment>{
  name: 'custom',
  viteEnvironment: 'ssr',
  // optional - set to false when "setupVM" is fast, so vm pools
  // do not transform the import graph while it runs
  prewarmModules: true,
  // optional - only if you support "vmForks" or "vmThreads" pools
  async setupVM() {
    const vm = await import('node:vm')
    const context = vm.createContext()
    return {
      getVmContext() {
        return context
      },
      teardown() {
        // called after all tests with this env have been run
      }
    }
  },
  setup() {
    // custom setup
    return {
      teardown() {
        // called after all tests with this env have been run
      }
    }
  }
}
```

- `transformMode` was replaced by `viteEnvironment` in v4. Vitest requires `viteEnvironment` on the environment object (falls back to the Vitest environment name by default); it should be `ssr`, `client` or any custom Vite environment name, and determines which environment is used to process the file.
- Built-in environments are available through the `vitest/runtime` entry:

```ts
import { builtinEnvironments, populateGlobal } from 'vitest/runtime'

console.log(builtinEnvironments) // { jsdom, happy-dom, node, edge-runtime }
```

- `populateGlobal(global: any, original: any, options: PopulateOptions): PopulateResult` moves properties from an object into the global namespace. `PopulateOptions.bindFunctions` (boolean) controls whether non-class functions are bound to the global namespace. `PopulateResult.keys` is the set of all copied keys; `PopulateResult.originals` is a `Map<string | symbol, PropertyDescriptor>` of property descriptors for keys that might have been overridden, which you can restore with `Object.defineProperty` inside `teardown` (v5: `originals` holds descriptors instead of plain values).
- v5: assignments to `globalThis` / `window` properties in `jsdom` and `happy-dom` now propagate to the underlying window; the `vitest/environments` entrypoint was removed (use `vitest/runtime`) (source: Migrating to Vitest 5.0, tag `v5.0.5`).
- "Environments" exist only when running tests in Node.js; `browser` is not an environment — use Browser Mode through a test project.

## Related

- [Config](./config.md)
- [Workspace](./workspace.md)
