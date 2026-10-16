# Parallel and Sequential Test Files

Split the suite into two `projects` so only files sharing an exclusive resource (fixed port, temp directory, database) run one at a time.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'Parallel',
          exclude: ['**/*.sequential.test.ts'],
        },
      },
      {
        test: {
          name: 'Sequential',
          include: ['**/*.sequential.test.ts'],
          fileParallelism: false,
        },
      },
    ],
  },
})
```

Run sequential after parallel with `sequence.groupOrder` (since 3.2.0):

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'Parallel',
          exclude: ['**/*.sequential.test.ts'],
          sequence: { groupOrder: 0 },
        },
      },
      {
        test: {
          name: 'Sequential',
          include: ['**/*.sequential.test.ts'],
          fileParallelism: false,
          sequence: { groupOrder: 1 },
        },
      },
    ],
  },
})
```

## Options / Props

| Scope | Knob | Controls |
| --- | --- | --- |
| Across files | `fileParallelism` | Whether two test files run in parallel workers |
| Within a file | `describe.concurrent` / `test.concurrent` | Whether tests inside one file run concurrently |

## Notes

- The official recipe writes `**.sequential.test.ts`; with Vitest's globber (tinyglobby) a `**` not used as a whole path segment only matches root-level files, so `**/*.sequential.test.ts` is used here.
- `fileParallelism: false` at project level is a shorthand for `maxWorkers: 1`; the two are equivalent.
- By default projects run in parallel with each other, so the sequential project's first file may overlap with parallel files holding the same resource; `sequence.groupOrder` makes the parallel batch finish first.
- `fileParallelism: false` does not make tests inside a file concurrent (sequential by default), and `concurrent` does not affect file scheduling.
- Source: https://vitest.dev/guide/recipes/parallel-sequential (Vitest v5.0.5)

## Related

- [Per-File Isolation Settings](./disable-isolation.md)
- [Workspace / projects](../guide/workspace.md)
- [Config](../guide/config.md)
