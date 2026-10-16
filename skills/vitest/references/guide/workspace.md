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

- Config inheritance via `extends`: `extends: true` inherits the root-level config. Since Vitest 5.0 this is the default for inline projects (`extends: false` opts out; arrays such as `setupFiles` are concatenated, not overridden). Projects referenced as config files or directories do not inherit root options. In v4 and earlier, `extends: true` had to be set explicitly.

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

- Vitest 5 (docs at tag `v5.0.5`):
  - A referenced config file that declares its own `projects` provides those nested projects. Merging a root config that defines `projects` into a project config can fail at startup; merge a shared config instead (as in the `mergeConfig` example above).
  - `sharedViteServer` (default `true`; CLI `--sharedViteServer=false`): inline projects that do not change the Vite config reuse the declaring config's Vite server and transform cache. A project gets its own server when it defines Vite options such as `plugins` or `resolve`, has an `extends` that does not point to the declaring config, or sets test options like `alias`, `browser`, `css`, `deps.moduleDirectories`, `deps.optimizer`, `mode`, or `root`. Referenced config files / directories always get their own server. Plugins in a shared config are instantiated once, so their `config` hooks do not see per-project test options. Debug with `DEBUG=vitest:projects`.
  - The `projects` option is not supported inside an inline project configuration.
- Options not available in project-level config:
  - `coverage` — process-wide setting only
  - `reporters` — root level only
  - `resolveSnapshotPath` — the root resolver applies

## Related

- [Config](./config.md)
- [Test Environment](./environment.md)
