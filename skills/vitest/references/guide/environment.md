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

- Glob-based environment assignment:

```ts
// vitest.config.ts
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

- Custom environments can be created via a `vitest-environment-${name}` package or a file path:

```ts
// vitest-environment-custom.ts
export default {
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    // environment setup
    return {
      teardown() {
        // cleanup
      },
    }
  },
}
```

## Related

- [Config](./config.md)
- [Workspace](./workspace.md)
