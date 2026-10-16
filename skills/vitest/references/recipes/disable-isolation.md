# Per-File Isolation Settings

Use `projects` to apply `isolate: false` to a unit suite while keeping the integration suite isolated.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          // Non-isolated unit tests
          name: 'Unit tests',
          isolate: false,
          exclude: ['**.integration.test.ts'],
        },
      },
      {
        test: {
          // Isolated integration tests
          name: 'Integration tests',
          include: ['**.integration.test.ts'],
        },
      },
    ],
  },
})
```

## Verifying it's safe

Run the suite twice with shuffling to surface inter-file pollution:

```sh
vitest --shuffle --run --project='Unit tests'
vitest --shuffle --run --project='Unit tests'
```

## Notes

- By default every test file runs in its own isolated module graph; isolation costs setup time on every file.
- A file is safe to deisolate when it does not: mutate module-level state (counters, caches, top-level `let`); call `vi.stubGlobal` or `vi.stubEnv`; monkey-patch prototypes (`Date.prototype`, `Array.prototype`, ...); register listeners on `process` or other long-lived emitters; depend on a fresh module instance for `vi.mock` factories.
- If the second shuffled run gives different results, there are order-dependent tests; fix them or keep isolation for that file.
- `isolate` only governs the `threads` and `forks` pools. `vmThreads` and `vmForks` always run isolated.

## Related

- [Parallel and Sequential Test Files](./parallel-sequential.md)
- [Database Transaction per Test](./db-transaction.md)
- [Workspace / projects](../guide/workspace.md)
- [Config](../guide/config.md)
