# Test Environment

Configure the runtime environment for tests (Node, jsdom, happy-dom, edge-runtime).

```ts
// vitest.config.ts — set the default environment for all tests
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom', // 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'
  },
})
```

```ts
// Per-file override using a control comment
// @vitest-environment happy-dom

import { expect, test } from 'vitest'

test('window is defined', () => {
  expect(typeof window).not.toBe('undefined')
})
```

```ts
// vitest.config.ts — different environments per file pattern
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['**/*.dom.test.ts', 'jsdom'],
      ['**/*.node.test.ts', 'node'],
    ],
  },
})
```

## Notes

- `node` is the default; use `jsdom` or `happy-dom` when testing code that requires browser globals (`window`, `document`)
- `happy-dom` is generally faster than `jsdom` but has lower API coverage
- `edge-runtime` emulates the Vercel Edge environment (no Node built-ins)
- Install the required package for each environment: `npm i -D jsdom` / `npm i -D happy-dom`
