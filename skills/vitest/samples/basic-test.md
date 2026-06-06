# Basic Test

Write and run a minimal Vitest test from scratch.

```ts
// sum.ts
export function sum(a: number, b: number): number {
  return a + b
}

// sum.test.ts
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

```json
// package.json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

## Notes

- `vitest` starts in watch mode by default; `vitest run` executes once and exits
- Test files must include `.test.` or `.spec.` in their filename
- Minimum requirements: Vite ≥ 6.0.0 and Node ≥ 20.0.0
- No config file is needed for basic usage — Vitest reads `vite.config.*` automatically
