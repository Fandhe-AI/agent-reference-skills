# Benchmarking

Benchmarks are defined inside regular `test()` calls with the `bench` fixture from the test context, powered by Tinybench (5.0.0).

## Signature / Usage

```ts
import { test } from 'vitest'

test('parsing performance', async ({ bench }) => {
  await bench('parse', () => {
    JSON.parse('{"key":"value"}')
  }).run()
})

test('compare JSON libraries', async ({ bench }) => {
  await bench.compare(
    bench('JSON.parse', () => { JSON.parse(input) }),
    bench('custom parser', () => { customParse(input) }),
    { iterations: 100, time: 1000 }, // Tinybench BenchOptions
  )
})
```

## Options / Props

| API | Description |
|-----|-------------|
| `bench(name, fn)` / `bench(name, options, fn)` | Registers a benchmark without running it; `.run()` runs it and returns the result; options are Tinybench `FnOptions` (e.g. `beforeEach`) |
| `bench.compare(...benches, options?)` | Compares benchmarks with interleaved iterations; last argument is Tinybench `BenchOptions` |
| `bench.from(name, source)` | Reads a stored result (path relative to project root, or function returning data/Promise) |
| `{ perProject: true }` | Also collects the result into a cross-project comparison table |
| `{ writeResult: path }` | Writes the result JSON on every successful run; `${projectName}` placeholder supported |
| `toBeFasterThan(other, { delta })` / `toBeSlowerThan(other, { delta })` | Relative assertions; `delta` is the minimum relative difference (e.g. `0.1`) |

## Notes

- The `bench` fixture only works in files matching `benchmark.include` (default `**/*.{bench,benchmark}.?(c|m)[jt]s?(x)`); elsewhere it throws. The filename decides participation.
- Running: plain `vitest` ignores benchmark files; `benchmark.enabled: true` runs them after regular tests in a separate isolated group; `vitest bench` runs only benchmarks (accepts file filters and `-t`). Custom engines: see the Custom Benchmark Provider guide.
- Assert absolute performance with standard matchers, e.g. `expect(result.throughput.mean).toBeGreaterThan(10_000)`. Use `{ retry: 3 }` on the test for noisy benchmarks.
- Stored results: files are overwritten on each successful run (not written if the function throws); commit them from a single designated environment (typically CI). Toggle between writing and comparing with an env var (`VITE_WRITE_BENCH=1 vitest bench`):

```ts
test('compare against the stored baseline', async ({ bench }) => {
  const result = await bench.compare(
    bench('current', { writeResult: './benchmarks/parse.json' }, () => parse(largeInput)),
    bench.from('previous', './benchmarks/parse.json'),
  )
  expect(result.get('current')).toBeFasterThan(result.get('previous'))
})
```

- Stability: benchmarks run in their own project, tests within a file and files themselves run sequentially. Avoid dead code elimination by consuming results; keep object shapes consistent (V8 deoptimization); pre-allocate data in `beforeEach` to reduce GC noise.
- Module runner overhead: exports become getters in Node mode, so store imported functions in a local (`const _parse = parse`), benchmark the built package (`import { parse } from 'my-library'`), or set `experimental.viteModuleRunner: false` for the benchmark project. Warning can be silenced with `benchmark.suppressExportGetterWarnings`. Browser mode has no such overhead.
- Engines: V8 tiering/deoptimization/GC, JavaScriptCore (Bun, Safari) has different thresholds and event loop, browsers may reduce `performance.now()` precision (raise `iterations`) and differ across engines.

## Related

- [Test Context](./test-context.md)
- [Extending Matchers](./extending-matchers.md)
- [Profiling Test Performance](./profiling-test-performance.md)
