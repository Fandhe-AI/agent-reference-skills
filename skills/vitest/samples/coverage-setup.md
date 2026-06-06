# Coverage Setup

Measure code coverage with `@vitest/coverage-v8` or `@vitest/coverage-istanbul`.

```bash
npm i -D @vitest/coverage-v8
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/*.test.ts'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
    },
  },
})
```

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

```ts
// Ignore specific lines from coverage
function riskyPath() {
  /* v8 ignore next 3 -- @preserve */
  if (process.env.NODE_ENV === 'debug') {
    console.log('debug mode')
  }
}
```

## Notes

- `v8` is faster and requires no instrumentation; `istanbul` supports any JS runtime and is more battle-tested
- `reporter: ['text', 'html']` prints a summary in the terminal and writes an HTML report to `coverage/`
- `thresholds` fail the run if coverage drops below the specified percentages — useful in CI
- Use `/* v8 ignore ... */` or `/* istanbul ignore ... */` comments to exclude unreachable branches
