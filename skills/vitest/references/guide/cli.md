# CLI Commands

## Signature / Usage

```bash
vitest run --coverage.enabled
```

Filter by filename: `vitest foobar`
Line number targeting (v3+): `vitest basic/foo.test.ts:10`

## Options / Props

Commands:

| Command | Description |
|---------|-------------|
| `vitest` | Default: watch mode in dev, run mode in CI |
| `vitest run` | Single run without watching |
| `vitest watch` | Run in watch mode (alias: `vitest dev`) |
| `vitest bench` | Run benchmark tests only |
| `vitest related <files>` | Run only tests related to the given source files |
| `vitest list` | Print the list of matching tests (v5: test files are parsed statically; `--no-static-parse` runs them instead) |
| `vitest doctor` | v5. Measures how much faster the suite would run under alternative configurations (pool / isolate / `maxWorkers` / environment / `fsModuleCache`) by running it under each, then prints a recommendation |
| `vitest init <name>` | Set up project configuration |
| `vitest typecheck` | Run type tests (not in the v5 command list; see Notes — use `--typecheck`) |

Main flags:

| Flag | Description |
|------|-------------|
| `--run` | Disable watch mode |
| `--reporter <name>` | Specify reporter (`default`, `verbose`, `dot`, `json`, `junit`, `tap`, `tree`, `blob`, `github-actions`, `minimal`, etc.) |
| `--coverage.enabled` | Enable coverage collection |
| `--ui` | Enable the UI |
| `-u` / `--update` | Update snapshots |
| `--changed` | Run only tests related to changed files |
| `--bail <n>` | Stop the run after n test failures |
| `--passWithNoTests` | Exit successfully even with no tests |
| `--globals` | Inject the API into the global scope |
| `--environment <name>` | Specify the runtime environment (default: `node`) |
| `-t` / `--testNamePattern <pattern>` | Run only tests matching the pattern (v5+: matched against the full name with segments joined by ` > `) |
| `-w` / `--watch` | Enable watch mode |
| `--project <name>` | Run only the specified project(s) (repeatable, wildcards supported, `!pattern` to exclude) |
| `--shard <index>/<count>` | Shard the test suite (e.g. `--shard=1/3`) |
| `--tagsFilter <expr>` | Filter tests by tag (`&&`, `\|\|`, `!` supported) |
| `--listTags` | List available tags |
| `--strictTags` | Treat undefined tags as an error |
| `--browser.enabled` | Enable browser mode |

## Notes

- Common usage:

```bash
# single run (for CI)
vitest run

# run with coverage
vitest run --coverage.enabled

# update snapshots
vitest run -u

# specific tests only
vitest run -t "should handle errors"

# only tests related to changed files
vitest run --changed

# lint-staged integration
vitest related src/utils.ts --run

# specific projects only
vitest run --project unit --project e2e

# sharding (CI parallelization)
vitest run --shard=1/3

# filter by tag
vitest run --tagsFilter "unit && !slow"
```

- Vitest 5 changes (source: Migrating to Vitest 5.0; docs at tag `v5.0.5`):
  - `-t` / `testNamePattern` matches the `>`-joined full name: `-t 'math > adds'` replaces `-t 'math adds'`. Matching a single segment or a wildcard like `math.*adds` keeps older patterns working.
  - `vitest bench` still exists (runs only benchmarks, implicitly enables `benchmark.enabled`, accepts filename filters and `-t`), but `bench` is now a fixture on the test context (`test('x', async ({ bench }) => { await bench('parse', fn).run() })`) instead of a top-level export. Removed: `bench.skip` / `bench.only` / `bench.todo` (use the `test` equivalents), the `benchmark.reporters` and `benchmark.outputFile` options, the `benchmark.compare` config and `--compare` flag (use `writeResult` and `bench.from()`), and the `benchmark.outputJson` config and `--outputJson` flag (use `--reporter=json --outputFile=<path>`).
  - Config files are not looked up from parent directories; pass `--config` explicitly from a subdirectory.
  - `--sharedViteServer=false` opts out of sharing the Vite server between inline projects (see [Workspace](./workspace.md)).
  - The `json` and `junit` reporters write to files under `.vitest/` by default instead of stdout.
  - `VITEST_POOL_ID` / `VITEST_WORKER_ID` start at 1.
  - Requires Node.js >= 22.12 and Vite >= 6.4 (Vite is a peer dependency; Yarn users run `yarn add -D vite`).
  - The Vitest UI requires an authenticated URL: open the URL Vitest prints (it includes a `token` query parameter).

- `vitest list` (v5): "Since Vitest 5, `vitest list` parses test files statically instead of running them to collect tests. Pass `--no-static-parse` to run the files instead. Vitest parses test files with limited concurrency, defaulting to `os.availableParallelism()`. You can change it via the `--static-parse-concurrency` option." Also supports `--json[=<file>]` and `--filesOnly`.
- `vitest doctor` (v5): runs the full suite several times under candidate configurations picked from the current config and prints a recommendation, e.g. `Recommendation: pool: 'vmThreads' (-67%)`.

```bash
vitest doctor
```

  The `isolate: false` candidate is validated by running the suite twice with a shuffled file order; failing candidates are reported with an error excerpt. It also probes lower `maxWorkers` values, measures `vmThreads` / `vmForks` for DOM or custom-environment suites, and `environment: 'happy-dom'` for `jsdom` projects when installed. If the suite fails under the current configuration, doctor aborts (it needs a passing baseline). It takes a multiple of a normal run's time.
- `vitest typecheck` is not in the v5.0.5 command list of the CLI guide. Type tests are documented as run by adding the `--typecheck` flag (e.g. `"test": "vitest --typecheck"`); `--typecheck.only` runs only type tests (`*.test-d.ts` by default, see `typecheck.include`) (source: guide/testing-types.md, https://vitest.dev/guide/cli).

- Watch mode keyboard shortcuts:

| Key | Action |
|-----|--------|
| `a` | Rerun all tests |
| `f` | Rerun failed tests only |
| `u` | Update snapshots |
| `p` | Filter by filename |
| `t` | Filter by test name |
| `q` | Quit |

## Related

- [Config](./config.md)
- [Coverage](./coverage.md)
- [Snapshot](./snapshot.md)
