# Config (vitest.config.ts)

Configured via `vitest.config.ts` (or the `test` key in `vite.config.ts`).

## Signature / Usage

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## Options / Props

Core options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `globals` | `boolean` | `false` | Expose `describe`, `it`, `expect`, etc. globally (no import needed) |
| `environment` | `string` | `'node'` | Test environment (`node`, `jsdom`, `happy-dom`, `edge-runtime`) |
| `include` | `string[]` | `['**/*.{test,spec}.{js,ts,jsx,tsx}']` | Glob patterns for test files |
| `exclude` | `string[]` | `['**/node_modules/**', '**/dist/**', ...]` | Exclude patterns |
| `setupFiles` | `string \| string[]` | `[]` | Files run before each test file |
| `globalSetup` | `string \| string[]` | `[]` | Files run once before the whole suite |
| `pool` | `string` | `'forks'` | Worker pool (`threads`, `forks`, `vmThreads`, `vmForks`) |
| `testTimeout` | `number` | `5000` | Default per-test timeout (ms) |
| `hookTimeout` | `number` | `10000` | Default hook timeout (ms) |
| `retry` | `number \| { count?: number, delay?: number, condition?: RegExp }` | `0` | Number of retries for failed tests (object form since 4.1.0; CLI: `--retry <times>`, `--retry.count`, `--retry.delay`, `--retry.condition`) |
| `tags` | `TestTagDefinition[]` | `[]` | Defines all available test tags (since 4.1.0); projects inherit the global tag definitions |
| `strictTags` | `boolean` | `true` | Throw if a test uses a tag not defined in `tags` (since 4.1.0; CLI: `--strict-tags`, `--no-strict-tags`) |
| `taskTitleValueFormatTruncate` | `number` | `40` | Length limit for formatted values interpolated into generated task titles (`test.each` / `test.for`); `0` disables truncation (v5) |
| `reporters` | `string[]` | `['default']` | Reporters (`verbose`, `dot`, `json`, `html`, `junit`, `tap`, `tree`, `blob`, `github-actions`, `minimal`, etc.) |
| `watch` | `boolean` | `true` in dev | Watch mode |
| `passWithNoTests` | `boolean` | `false` | Exit successfully even with no test files |
| `typecheck` | `object` | — | Type test configuration |
| `projects` | `TestProjectConfiguration[]` | `[]` | Run multiple projects in a single process for monorepos, etc. (successor to the old `vitest.workspace.ts`; see [Workspace](./workspace.md)) |
| `clearMocks` | `boolean` | `true` (v5+; `false` in v4) | Calls `vi.clearAllMocks()` before each test (clears mock history, keeps implementations) |
| `sharedViteServer` | `boolean` | `true` (v5+) | Inline projects that do not change the Vite config reuse the declaring config's Vite server (CLI: `--sharedViteServer=false`) |

Coverage options (`test.coverage`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | `'v8' \| 'istanbul'` | `'v8'` | Coverage engine |
| `reporter` | `string[]` | `['text', 'html', 'clover', 'json']` | Output formats |
| `include` | `string[]` | files imported during the test run | Coverage targets (globs matched against paths relative to the project root; v5+) |
| `exclude` | `string[]` | `[]` | Coverage exclusions (matched the same way as `include`) |
| `thresholds` | `object` | — | Minimum coverage ratios (`lines`, `branches`, `functions`, `statements`) |
| `reportsDirectory` | `string` | `'./coverage'` | Output directory |
| `all` | — | removed | Removed in v4.0 (`coverage.all` and `coverage.extensions` removed); reports include only covered files by default. Use `coverage.include` to add uncovered files |

Browser mode options (`test.browser`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `browser.enabled` | `boolean` | `false` | Enable browser mode |
| `browser.headless` | `boolean` | `true` in CI | Headless mode |
| `browser.provider` | `'playwright' \| 'webdriverio' \| 'preview'` | `'preview'` | Browser provider |
| `browser.instances` | `object[]` | — | Browsers to run (e.g. `[{ browser: 'chromium' }]`) |
| `browser.ui` | `boolean` | `true` | Show the browser UI |

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
})
```

## Notes

- Pools:

| Pool | Description |
|------|-------------|
| `threads` | Worker Threads (shared memory, fast) |
| `forks` | Child processes (isolated, suited to native modules) |
| `vmThreads` | Worker Threads + VM isolation |
| `vmForks` | Child processes + VM isolation |

- TypeScript setup for `globals: true`:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

- `setupFiles` vs `globalSetup`: `setupFiles` runs inside the test environment before each file; `globalSetup` runs once in the main Node process before the whole suite.

- Vitest 5 changes (source: Migrating to Vitest 5.0, vitest.dev/guide/migration; docs at tag `v5.1.0`):
  - Requirements: Vite >= 6.4.0 and Node.js >= 22.12.0. Vite is no longer a direct dependency of Vitest but a peer dependency, so Yarn users must run `yarn add -D vite` explicitly.
  - `clearMocks` now defaults to `true`; tests that record mock calls outside the test body are affected. Set `clearMocks: false` to restore the v4 behavior. It can cause problems with concurrent tests, since one finishing test can clear history another is still using.
  - Inline projects now inherit the root config by default (`extends: true`, arrays such as `setupFiles` are concatenated); `extends: false` opts out. A referenced config file that declares its own `projects` provides those nested projects. See [Workspace](./workspace.md).
  - `sharedViteServer` (default `true`): the declaring config runs once, so plugins are instantiated once and their `config` hooks do not run per project. Set `sharedViteServer: false` when a plugin needs per-project instances. Debug with `DEBUG=vitest:projects`.
  - Config files are no longer looked up from parent directories; from a subdirectory pass `--config` explicitly.
  - Coverage `include` / `exclude` match paths relative to the project root (no looser `contains` matching); a pattern without a glob wildcard is treated as a directory (`['src']` equals `['src/**']`). Glob entries in `coverage.thresholds` no longer inherit the top-level `perFile`; set `perFile` on each glob. See [Coverage](./coverage.md).
  - Generated reports and artifacts (attachments, blob, HTML, JSON, JUnit) are written under a single `.vitest` directory at the project root. The `json` and `junit` reporters write to files by default instead of stdout; the `stdout` reporter option restores printing.
  - `VITEST_POOL_ID` and `VITEST_WORKER_ID` are 1-based (previously 0-based).
  - `resolveConfig` returns the resolved Vite config; the Vitest config is at `viteConfig.test`.
  - `coverage.all` was removed in v4.0 (together with `coverage.extensions`); reports include only covered files by default. Define `coverage.include` (and optionally `coverage.exclude`) to include uncovered files (source: Migrating to Vitest 4.0 § "Removed Options `coverage.all` and `coverage.extensions`", tag `v4.1.12`).

- Vitest 5.1 (docs at tag `v5.1.0`):
  - `api`: default port is `51204`, or `23315` in Browser Mode (the 5.0 docs said `63315`); `port: 0` lets the operating system pick a free port.
  - `cache`: besides failed and longer test files first, the results cache now also stores which tests failed and feeds `--last-failed`.
  - `deps.moduleDirectories` (default `['node_modules']`, always includes `node_modules`): Vitest adds a slash before and after each value and checks if the path of a file includes it (`'vendor'` matches every file inside a `vendor` folder; an absolute path matches only files inside that folder). A file inside such a directory is treated as a dependency: `vi.mock` without a factory looks for the mock only in the root `__mocks__` folder; JavaScript files that Node.js can import directly are externalized (not transformed by Vite plugins; `vi.mock` does not apply to the modules they import); string values of `server.deps.inline` / `server.deps.external` are prefixed with these directories. Do not add a directory that contains your own source files (`packages` would also match `packages/app`). A workspace package in a monorepo needs no entry to be mocked by package name.
  - `fakeTimers.fakeNodeBuiltins` (default `false`): also fake timer APIs imported from `node:timers` and `node:timers/promises`.
  - `coverage.ignoreNode` (v8): see [Coverage](./coverage.md).
  - `experimental.vcsProvider` accepts `'git'` (default), `'mtime'` (5.1.0; needs `experimental.recordDependencies`, no Git needed, a dependency without a record is always changed), a custom `VCSProvider`, or a module path. Custom providers receive `options.resolver.getDependencies()` (every file the run's test files depend on, as `{ file, recordedAt? }`) next to `root` and `changedSince`. The `mtime` provider compares file times with the clock of the machine that ran the tests, so a checkout or copy that sets file times in the past is not detected.
  - `experimental.recordDependencies` (default `false`): records every file a test file loads and uses the records for `--changed`, `vitest related`, and `--since-last-run`; stored in `dependencies.json` next to the results cache (no effect if `cache` is disabled). The docs list its version as 5.0.4 in the 5.0.5 tag and 5.1.0 in the 5.1.0 tag.
  - `experimental.traceTimeline` (default `false`): records `expect.poll`, `vi.waitFor`, and `vi.waitUntil` steps and prints them as a timeline under the error of a failed test; no effect in Browser Mode (use `browser.traceView`). With `test.concurrent`, `vi.waitFor` / `vi.waitUntil` are not recorded and global-`expect` polls can land in another test's timeline; use `expect` from the test context.
  - `ui.theme` (5.0.4, experimental): `'auto' | 'light' | 'dark'`, default `'auto'`; color theme of Vitest UI and the Browser Mode UI. It does not enable Vitest UI.
  - Browser: `browser.traceView` (now `mode`-based, default `'failure-only'`), `browser.importMapMocks`, `browser.ui` default `!browser.headless && !isCI`; see Browser Config.
  - Source: https://vitest.dev/config/ (api, cache, deps, faketimers, experimental, ui pages; Vitest v5.1.0)

- Vitest 4 pool rework (source: Migrating to Vitest 4.0 § Pool Rework and Deprecated APIs are Removed, tag `v4.1.12`):
  - `poolOptions` is removed; all previous `poolOptions` are now top-level options.
  - `maxThreads` / `maxForks` are now `maxWorkers`; `VITEST_MAX_THREADS` / `VITEST_MAX_FORKS` are now `VITEST_MAX_WORKERS`.
  - `singleThread` / `singleFork` are now `maxWorkers: 1, isolate: false`.
  - `memoryLimit` of VM pools is renamed to `vmMemoryLimit`; `threads.useAtomics` is removed.
  - Also removed in v4.0: `minWorkers`, `poolMatchGlobs`, `environmentMatchGlobs` (use `projects`), and `deps.inline` / `deps.external` / `deps.fallbackCJS` (use `server.deps.inline` / `server.deps.external` / `server.deps.fallbackCJS`).

## Related

- [CLI](./cli.md)
- [Test Environment](./environment.md)
- [Coverage](./coverage.md)
