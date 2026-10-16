# Improving Performance

Profile the `Duration` breakdown first, then tune isolation, environment, pool, caching, and sharding.

## Signature / Usage

```bash
vitest --no-isolate
vitest --no-file-parallelism
vitest --pool=threads
```

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    isolate: false,
  },
})
```

## Options / Props

`Duration  3.76s (environment 79%, import 13%, transform 6%, tests 1%, setup 1%)` - percentages are relative to the sum of tracked phases, not wall-clock time.

| Phase | Meaning / related option |
|-------|--------------------------|
| `environment` | Creating the test environment (`jsdom`, `happy-dom`) |
| `transform` | Waiting for Vite to resolve/transform modules; see `fsModuleCache` |
| `import` | Evaluating test files and modules (excluding transform wait); isolation re-evaluates shared graphs per file |
| `setup` | Running `setupFiles` |
| `worker` | Preparing the runner in each worker; isolation pays it per file |
| `tests` | Running the tests; little to gain from config changes |

Environment cost configurations:

| Configuration | Environment created | Isolation | Trade-off |
|---------------|---------------------|-----------|-----------|
| `forks` / `threads` + `isolate: true` (default) | once per file | fresh process/thread and environment per file | safest, slowest |
| `pool: 'vmThreads'` | once per worker | fresh VM context and `window` per file | cross-realm `instanceof` edge cases with externalized packages; memory reclaimed less reliably (`vmMemoryLimit`) |
| `isolate: false` | once per worker | none | tests must not depend on clean `window` / module state |

## Notes

- Hints: Vitest prints a hint after the summary when a config change would significantly help (`experimental.diagnostics`); hints never suggest changing explicitly set options. `vitest doctor` measures alternative configurations (including whether tests pass with `isolate: false`).
- Test isolation: each file runs in its own worker (`threads`), child process (`forks`), or VM context (`vmThreads`). Disable with `--no-isolate` / `isolate: false`, or only for some files using `projects` (separate `name`, `include` / `exclude`). `vmThreads` cannot disable isolation; use `threads`. `fileParallelism: false` can improve startup time.
- DOM environments are expensive: `jsdom` roughly 200-500ms per import, `happy-dom` roughly 90-200ms. Prefer `isolate: false` with `threads` if tests tolerate shared state; use `vmThreads` when every file needs a fresh `window`. `happy-dom` is cheaper than `jsdom` everywhere.
- Limit the search directory with `test.dir`.
- Caching: `fsModuleCache` (enabled by default) persists the transform cache across runs; most noticeable when rerunning a few tests with a large module graph.
- Node compile cache: set `NODE_COMPILE_CACHE` to a persistent directory (`NODE_COMPILE_CACHE=node_modules/.cache/node-compile-cache vitest`); `NODE_DISABLE_COMPILE_CACHE=1` disables it. Automatically disabled in workers with the `v8` coverage provider.
- Pool: default `forks` is more compatible but can be slightly slower than `threads` in larger projects.
- Sharding splits test files (not test cases):

```sh
vitest run --reporter=blob --shard=1/3 # 1st machine
vitest run --reporter=blob --shard=2/3 # 2nd machine
vitest run --reporter=blob --shard=3/3 # 3rd machine
vitest run --merge-reports
```

- Set `VITEST_BLOB_LABEL` to label environments in merged reports; upload and restore `attachmentsDir` in the merge job if tests create file attachments.
- On high CPU-count machines the main thread's single Vite server can bottleneck; run several shards with `VITEST_MAX_WORKERS` (e.g. 4 shards x `VITEST_MAX_WORKERS=7` on 32 CPUs), then `vitest run --merge-reports`.

## Related

- [Parallelism](./parallelism.md)
- [Profiling Test Performance](./profiling-test-performance.md)
- [Reporters](./reporters.md)
- [Test Environment](./environment.md)
