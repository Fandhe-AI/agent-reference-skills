# Custom Benchmark Provider

Replace the built-in Tinybench-based provider that executes `bench` registrations. Experimental, introduced in 5.0.0.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      provider: './benchmark-provider.ts',
    },
  },
})
```

The module must default-export an object implementing `BenchmarkProvider`:

```ts
// benchmark-provider.ts
import type { BenchmarkProvider } from 'vitest'
import { Bench } from 'tinybench'

const provider = {
  async run({ test, config, registrations, options }) {
    const bench = new Bench({
      signal: test.context.signal,
      retainSamples: config.retainSamples,
      ...options,
    })

    for (const { name, fn, fnOpts } of registrations) {
      bench.add(name, fn, fnOpts)
    }

    await bench.run()

    return bench.tasks.map((task) => {
      const result = task.result

      if (result.state === 'errored') {
        throw result.error
      }
      if (result.state !== 'completed') {
        throw new Error(`Benchmark "${task.name}" ended in the "${result.state}" state`)
      }

      return {
        ...result,
        name: task.name,
      }
    })
  },
} satisfies BenchmarkProvider

export default provider
```

## Options / Props

Argument (`group`) passed to `provider.run(group)`:

| Name | Type | Description |
|------|------|-------------|
| `test` | test | The test that registered the benchmarks. `test.context.signal` is aborted when the run is cancelled. |
| `config` | object | Resolved benchmark configuration for the current project. |
| `registrations` | array | Runnable benchmarks in registration order. Each has `name`, `fn`, and optional `fnOpts` (lifecycle hooks, cancellation, async behavior, sample retention). |
| `options` | object | Benchmark run options passed to `.run()` or `bench.compare()`, if any. |

## Notes

- `benchmark.provider` relative paths are resolved from the project root.
- Vitest calls `provider.run(group)` when a registration's `.run()` is called, or once for all runnable registrations passed to `bench.compare()`.
- The provider must honor run and registration options and run every benchmark function and its `beforeAll`, `beforeEach`, `afterEach`, `afterAll` hooks. To fail the test, throw.
- `run` must resolve to one `BenchResult` per runnable registration; results are matched by `name`. A custom engine must convert measurements into the Tinybench-compatible `BenchResult` shape exported by `vitest`.
- Registrations created by `bench.from()` are loaded by Vitest and not passed to the provider.
- Lifetime: the provider module is imported on first use and its default export cached for the worker lifetime. No separate setup/teardown hooks exist; keep worker-scoped state on the provider object.
- If using Tinybench in your provider, add it as a direct dependency.
- Source: Vitest v5.0.5 docs, https://vitest.dev/guide/advanced/benchmark-provider

## Related

- [Getting Started (Advanced API)](./getting-started.md)
