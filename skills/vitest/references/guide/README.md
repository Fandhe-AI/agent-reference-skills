# Guide

| Name | Description | Path |
|------|-------------|------|
| Benchmarking | Benchmarks are defined inside regular `test()` calls with the `bench` fixture from the test context, powered by Tinybench (5.0.0). | [benchmarking.md](./benchmarking.md) |
| CLI Commands | Commands and options for running Vitest from the command line | [cli.md](./cli.md) |
| Common Errors | Causes and fixes for frequent Vitest failures. | [common-errors.md](./common-errors.md) |
| Config (vitest.config.ts) | Configured via `vitest.config.ts` (or the `test` key in `vite.config.ts`). | [config.md](./config.md) |
| Coverage | Code coverage reporting configuration and providers (v8 and istanbul) | [coverage.md](./coverage.md) |
| Debugging | Debug Vitest tests in VS Code, IntelliJ IDEA, or any Node inspector client such as Chrome DevTools. | [debugging.md](./debugging.md) |
| Test Environment | Test runtime environments node, jsdom, happy-dom, and edge-runtime | [environment.md](./environment.md) |
| Extending Matchers | Add custom matchers with `expect.extend` (or Chai's `chai.use`), and type them by augmenting the `Matchers` interface. | [extending-matchers.md](./extending-matchers.md) |
| Test Filtering | Narrow which tests run: by file name, test name, line number, tags, or in-file `.only` / `.skip` / `.todo`. | [filtering.md](./filtering.md) |
| Improving Performance | Profile the `Duration` breakdown first, then tune isolation, environment, pool, caching, and sharding. | [improving-performance.md](./improving-performance.md) |
| In-Source Testing | Write tests inside the implementation file, similar to Rust module tests; tests share the closure and can reach private state. | [in-source.md](./in-source.md) |
| Test Run Lifecycle | Order and scope of the phases of a Vitest run, from initialization to global teardown, and the order of hooks within a test file. | [lifecycle.md](./lifecycle.md) |
| Migrating from Jest | Vitest has a Jest-compatible API; these are the remaining differences. | [migration-jest.md](./migration-jest.md) |
| Migrating from Mocha + Chai + Sinon | Vitest keeps a Mocha-like test structure, bundles Chai assertions, and provides sinon-chai style spy assertions, so most suites migrate with `vi` replacing Sinon. | [migration-mocha.md](./migration-mocha.md) |
| Migrating to Vitest 5.0 | Vitest 5.0 requires Vite >= 6.4.0 and Node.js >= 22.12.0. | [migration-v5.md](./migration-v5.md) |
| Open Telemetry Support | Experimental OpenTelemetry integration that generates spans scoped to each test worker, for debugging performance and behavior inside tests. | [open-telemetry.md](./open-telemetry.md) |
| Parallelism | Two levels: test files run in parallel across workers by default; tests within a file run sequentially unless marked `concurrent`. | [parallelism.md](./parallelism.md) |
| Profiling Test Performance | Find where time goes: runner CPU/heap profiles, main-thread profile, file transform, import durations, and coverage. | [profiling-test-performance.md](./profiling-test-performance.md) |
| Snapshot Testing | Snapshot testing with toMatchSnapshot, toMatchInlineSnapshot, and toMatchFileSnapshot | [snapshot.md](./snapshot.md) |
| Test Annotations | Attach custom messages and files to a test via `context.annotate`; reporters receive them in the `onTestAnnotate` hook. | [test-annotations.md](./test-annotations.md) |
| Test Context | The first argument of every test callback is a test context, inspired by Playwright Fixtures. | [test-context.md](./test-context.md) |
| Test Tags | Tags (since 4.1.0) label tests so you can filter what runs and apply shared options such as `timeout` or `retry` to a category of tests. | [test-tags.md](./test-tags.md) |
| Type Testing | Vitest supports type-level testing via `expectTypeOf` and `assertType`. Files matching `*.test-d.ts` are automatically recognized as type tests | [testing-types.md](./testing-types.md) |
| Vitest UI | Visual interface for exploring test results: a Live UI during watch mode, or a static HTML report for completed runs. | [ui.md](./ui.md) |
| Workspace | Deprecated: standalone `vitest.workspace.ts` is deprecated; migrate to the `test.projects` option in `vitest.config.ts`. | [workspace.md](./workspace.md) |
