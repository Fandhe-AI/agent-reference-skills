# In-Source Testing

Write tests inside the implementation file, similar to Rust module tests; tests share the closure and can reach private state.

## Signature / Usage

```ts
// src/index.ts
export function add(...args: number[]) {
  return args.reduce((a, b) => a + b, 0)
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest
  it('add', () => {
    expect(add()).toBe(0)
    expect(add(1)).toBe(1)
    expect(add(1, 2, 3)).toBe(6)
  })
}
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
})
```

## Notes

- Production build: define `import.meta.vitest` as `undefined` so the bundler eliminates the dead code:

```ts
// vite.config.ts
export default defineConfig({
  test: {
    includeSource: ['src/**/*.{js,ts}'],
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
})
```

- Other bundlers: Rolldown `transform.define`, Rollup `@rollup/plugin-replace`, unbuild `replace`, webpack `DefinePlugin`, each with `'import.meta.vitest': 'undefined'`.
- TypeScript: add `"types": ["vitest/importMeta"]` to `compilerOptions` in `tsconfig.json`.
- Assertion functions such as `assert` have a limitation in in-source tests (see the `assert` API docs for workarounds).
- Useful for small utilities, prototyping, and inline assertions; use separate test files for components or E2E tests.
- Source: https://vitest.dev/guide/in-source (Vitest v5.0.5)

## Related

- [Config](./config.md)
- [Test API](../api/test-api.md)
