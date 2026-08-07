# Coverage

## Signature / Usage

```bash
vitest run --coverage.enabled
```

```ts
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // or 'istanbul'
    },
  },
})
```

Install the provider package:

```bash
# v8 (default)
npm i -D @vitest/coverage-v8

# istanbul
npm i -D @vitest/coverage-istanbul
```

Or enable via config:

```ts
coverage: {
  enabled: true,
}
```

## Options / Props

| Provider | Description |
|----------|-------------|
| **v8** (default) | Native V8 coverage. Fast. Supports Node.js, Deno, Chromium-based browsers |
| **istanbul** | Source code instrumentation based. Supports all runtimes. Has instrumentation overhead |

Main options:

```ts
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  include: ['src/**/*.{ts,tsx}'],
  exclude: ['src/**/*.d.ts', 'src/types/**'],
  thresholds: {
    lines: 80,
    branches: 70,
    functions: 80,
    statements: 80,
  },
  reportsDirectory: './coverage',
  all: true, // include uncovered files in the report
}
```

## Notes

- Coverage ignore comments:

```ts
/* v8 ignore next */
const result = condition ? 'a' : 'b'

/* v8 ignore start -- @preserve */
// this block is excluded from coverage
/* v8 ignore stop -- @preserve */

/* istanbul ignore if -- @preserve */
if (unlikely) { /* ... */ }
```

## Related

- [Config](./config.md)
- [CLI](./cli.md)
