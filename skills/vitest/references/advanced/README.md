# advanced

| Name | Description | Path |
|------|-------------|------|
| Custom Benchmark Provider | Replace the built-in Tinybench-based provider that executes `bench` registrations. Experimental, introduced in 5.0.0. | [benchmark-provider.md](./benchmark-provider.md) |
| Custom Pool | Provide your own pool runner by passing a `PoolRunnerInitializer` to the `pool` option. Advanced, experimental, very low-level API. | [custom-pool.md](./custom-pool.md) |
| Extending Reporters | Extend built-in reporters or implement the `Reporter` interface from `vitest/node` to create custom reporters. | [extending-reporters.md](./extending-reporters.md) |
| Getting Started (Advanced API) | Node.js APIs exported from `vitest/node` for running Vitest programmatically. Primarily intended for library authors. | [getting-started.md](./getting-started.md) |
| Running Tests via API | Use `startVitest` or `createVitest` from `vitest/node` to run tests from a Node.js script. Primarily used by library authors. | [running-tests.md](./running-tests.md) |
