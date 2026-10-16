# Custom Pool

Provide your own pool runner by passing a `PoolRunnerInitializer` to the `pool` option. Advanced, experimental, very low-level API.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import customPool from './my-custom-pool.ts'

export default defineConfig({
  test: {
    // will run every file with a custom pool by default
    pool: customPool({
      customProperty: true,
    })
  },
})
```

```ts
// my-custom-pool.ts
import type { PoolRunnerInitializer } from 'vitest/node'

export function customPool(customOptions: CustomOptions): PoolRunnerInitializer {
  return {
    name: 'custom-pool',
    createPoolWorker: options => new CustomPoolWorker(options, customOptions),
  }
}
```

```ts
// my-custom-pool.ts
import type { PoolOptions, PoolWorker, WorkerRequest } from 'vitest/node'

class CustomPoolWorker implements PoolWorker {
  name = 'custom-pool'
  private customOptions: CustomOptions

  constructor(options: PoolOptions, customOptions: CustomOptions) {
    this.customOptions = customOptions
  }

  send(message: WorkerRequest): void {
    // Provide way to send your worker a message
  }

  on(event: string, callback: (arg: any) => void): void {
    // Provide way to listen to your workers events, e.g. message, error, exit
  }

  off(event: string, callback: (arg: any) => void): void {
    // Provide way to unsubscribe `on` listeners
  }

  async start() {
    // do something when the worker is started
  }

  async stop() {
    // cleanup the state
  }

  deserialize(data) {
    return data
  }
}
```

Worker file helpers from `vitest/worker`:

```ts
// my-worker.ts
import { init, runBaseTests, setupEnvironment } from 'vitest/worker'

init({
  post: (response) => {
    // Provide way to send this message to CustomPoolRunner's onWorker as message event
  },
  on: (callback) => {
    // Provide a way to listen CustomPoolRunner's "postMessage" calls
  },
  off: (callback) => {
    // Optional, provide a way to remove listeners added by "on" calls
  },
  teardown: () => {
    // Optional, provide a way to teardown worker, e.g. unsubscribe all the `on` listeners
  },
  serialize: (value) => {
    // Optional, provide custom serializer for `post` calls
  },
  deserialize: (value) => {
    // Optional, provide custom deserializer for `on` callbacks
  },
  runTests: (state, traces) => runBaseTests('run', state, traces),
  collectTests: (state, traces) => runBaseTests('collect', state, traces),
  setup: setupEnvironment,
})
```

## Options / Props

Built-in pool runners:

| Name | Description |
|------|-------------|
| `threads` | `node:worker_threads`; isolation via a new worker context |
| `forks` | `node:child_process`; isolation via a new `child_process.fork` process |
| `vmThreads` | `node:worker_threads`; isolation via the `vm` module instead of a new worker context |
| `browser` | Runs tests using browser providers |
| `typescript` | Runs typechecking on tests |

## Notes

- The `name` property of the initializer should be identical to your worker's `name` property.
- To use different pools for different tests, use `test.projects` with a `pool` per project (e.g. a built-in pool name such as `'threads'` in one project and a custom pool initializer imported from your pool package in another).
- Your pool runner controls the worker lifecycle and communication channel, e.g. launching a `node:worker_threads` `Worker` and communicating via `Worker.postMessage` and `parentPort`.
- See the `vitest-pool-example` package for an example implementation.
- Source: Vitest v5.0.5 docs, https://vitest.dev/guide/advanced/pool

## Related

- [Getting Started (Advanced API)](./getting-started.md)
