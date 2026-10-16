# Profiling Test Performance

Find where time goes: runner CPU/heap profiles, main-thread profile, file transform, import durations, and coverage.

## Signature / Usage

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    fileParallelism: false,
    execArgv: [
      '--cpu-prof',
      '--cpu-prof-dir=test-runner-profile',
      '--heap-prof',
      '--heap-prof-dir=test-runner-profile'
    ],
  },
})
```

## Options / Props

Reported time metrics:

| Metric | Meaning |
|--------|---------|
| Transform | Time transforming files |
| Setup | Time running `setupFiles` |
| Import | Time importing test files and dependencies, including collecting tests; excludes dynamic imports inside tests |
| Tests | Time running test cases |
| Environment | Time setting up the test `environment` (e.g. JSDOM) |

## Notes

- Test runner: Node options `--cpu-prof`, `--heap-prof`, `--prof` passed through `execArgv`. `--prof` does not work with `pool: 'threads'`. Output goes to `test-runner-profile/*.cpuprofile` and `*.heapprofile`.
- Main thread (Vite usage, `globalSetup`, Vite plugins): `node --cpu-prof --cpu-prof-dir=main-profile ./node_modules/vitest/vitest.mjs --run`. `vite-plugin-inspect` is recommended for plugin performance.
- File transform: identify unnecessary transforms caused by barrel files; import the specific file instead (`from '../src/utils/formatters'` rather than `'../src/utils'`). Vitest UI Module Info shows how files are transformed.
- File import: enable `experimental.importDurations`:

```ts
export default defineConfig({
  test: {
    experimental: {
      importDurations: {
        print: true,
      },
    },
  },
})
```

  or `vitest --experimental.importDurations.print`. Prints an "Import Duration Breakdown (Top 10)" with Self and Total time. Fixes: import specific entry points (`date-fns/format`), redirect with `resolve.alias`, or bundle dependencies with `deps.optimizer` (`optimizer.ssr` for `node`/`edge`, `optimizer.client` for `jsdom`/`happy-dom`):

```ts
export default defineConfig({
  test: {
    deps: {
      optimizer: {
        ssr: { enabled: true, include: ['date-fns'] },
      },
    },
  },
})
```

- Coverage: `DEBUG=vitest:coverage vitest --run --coverage` logs timings and flags files taking longer than 3s; adjust `coverage.include` / `coverage.exclude` if large built files are picked up.
- Inspect `*.cpuprofile` / `*.heapprofile` with Speedscope, VS Code's profile viewer, or Chrome DevTools Performance and Memory panels.

## Related

- [Improving Performance](./improving-performance.md)
- [Vitest UI](./ui.md)
- [Coverage](./coverage.md)
- [Open Telemetry Support](./open-telemetry.md)
