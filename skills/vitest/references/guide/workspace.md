# Workspace

> **Deprecated**: standalone workspace configuration via `vitest.workspace.ts` is deprecated. Migrate to the `test.projects` option in `vitest.config.ts`.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: ['packages/*'],
  },
})
```

## Options / Props

| Option | Description |
|--------|-------------|
| `projects` | Glob patterns and/or inline project configs; folders matching the glob are treated as individual projects |

## Notes

- Project detection: folders matching the glob pattern are treated as individual projects. A project is recognized even without a config file.
  Recognized config file names: `vitest.config.ts` / `vite.config.js`, `vitest.unit.config.ts` / `vite.e2e.config.js`, `vitest.<name>.config.*`
- Exclusion:

```ts
projects: [
  'packages/*',
  '!packages/excluded',
]
```

- Inline config can be mixed with glob patterns:

```ts
projects: [
  'packages/*',
  {
    extends: true,
    test: {
      name: 'happy-dom',
      environment: 'happy-dom',
      include: ['tests/**/*.browser.test.{ts,js}'],
    },
  },
]
```

- Config inheritance via `extends`: `extends: true` inherits the root-level config.

```ts
{
  extends: true,
  test: {
    name: 'unit',
    include: ['**/*.unit.test.ts'],
  },
}
```

- `mergeConfig`:

```ts
import { defineProject, mergeConfig } from 'vitest/config'
import configShared from '../vitest.shared.js'

export default mergeConfig(
  configShared,
  defineProject({
    test: { environment: 'jsdom' },
  })
)
```

- Running a specific project:

```bash
# single project
npm run test -- --project e2e

# multiple projects
npm run test -- --project e2e --project unit
```

- Options not available in project-level config:
  - `coverage` — process-wide setting only
  - `reporters` — root level only
  - `resolveSnapshotPath` — the root resolver applies

## Related

- [Config](./config.md)
- [Test Environment](./environment.md)
