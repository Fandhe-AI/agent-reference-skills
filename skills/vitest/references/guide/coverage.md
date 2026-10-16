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
  // all: true, // removed in v4.0 — reports include only covered files; use `include` to add uncovered files
}
```

## Notes

- Vitest 5 (docs at tag `v5.0.5`):
  - `include` / `exclude` are globs matched against paths relative to the project root (no looser `contains` matching). A pattern with no glob wildcard is treated as a directory (`include: ['src']` equals `['src/**']`); including file extensions is recommended. Review existing patterns, since some files may no longer be included. Default `include`: files imported during the test run; default `exclude`: `[]`.
  - Glob entries in `thresholds` no longer inherit the top-level `perFile`; set `perFile: true` on each glob that needs per-file checking. Glob-matched files still count toward the global thresholds.
  - `coverage.autoAttachSubprocess` (Version 5.0.0): type `boolean`, default `false`, providers `'v8'`, CLI `--coverage.autoAttachSubprocess`. "Track coverage of the `node:child_process` and `node:worker_threads` spawned during test run." It has some performance overhead as it uses `NODE_V8_COVERAGE` internally, which makes Node write many files on the file system.
  - `coverage.instrumenter` (experimental, 4.1.5): type `(options: InstrumenterOptions) => CoverageInstrumenter`, providers `'istanbul'`. A factory for a custom instrumenter in place of the default `@vitest/istanbul-lib-instrument`; `InstrumenterOptions` and `CoverageInstrumenter` are exported from `vitest/node`.

```ts
coverage: {
  provider: 'istanbul',
  instrumenter: options => createInstrumenter(options),
}
```

- `coverage.all` and `coverage.extensions` were removed in v4.0. By default only covered files are in the report; define `coverage.include` (then `coverage.exclude` if needed) to include uncovered files (source: Migrating to Vitest 4.0 § "Removed Options `coverage.all` and `coverage.extensions`", tag `v4.1.12`).

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
