# Benchmark Fixture

Define and compare benchmarks with the `bench` test-context fixture (v5).

```ts
// parser.bench.ts
import { test } from 'vitest'

test('compare JSON libraries', async ({ bench }) => {
  const input = '{"key":"value","nested":{"a":1}}'

  await bench.compare(
    bench('JSON.parse', () => {
      JSON.parse(input)
    }),
    bench('custom parser', () => {
      customParse(input)
    }),
  )
})
```

```bash
vitest bench
```

## Notes

- `bench` is no longer a top-level import from `vitest` in v5; destructure it from the test context inside a regular `test()`. `bench.skip` / `bench.only` / `bench.todo` are removed — use `test.skip` etc.
- `bench(...)` only registers; call `.run()` for a single benchmark or pass several to `bench.compare()`
- The fixture is only available in files matching `benchmark.include` (default `**/*.{bench,benchmark}.?(c|m)[jt]s?(x)`); plain `vitest` ignores them unless `benchmark.enabled: true`
- Options go last in `bench.compare(..., { iterations, time })`, or per benchmark as the second argument of `bench(name, options, fn)`
- Source: https://vitest.dev/guide/benchmarking (Vitest v5.0.5)
