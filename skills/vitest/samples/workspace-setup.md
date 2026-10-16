# Workspace Setup (Projects)

Run tests across multiple packages in a monorepo with a single Vitest process.

```ts
// vitest.config.ts (root)
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      'packages/*',          // auto-discovers vitest.config.* in each package
      '!packages/excluded',  // exclude specific packages
    ],
  },
})
```

```ts
// vitest.config.ts (root) — inline project configs
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    pool: 'threads',
    projects: [
      {
        // inline projects inherit root plugins/pool by default (v5)
        test: {
          name: 'unit',
          include: ['packages/*/src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: false,       // opt out of inheriting the root config
        test: {
          name: { label: 'dom', color: 'green' },
          include: ['packages/*/src/**/*.dom.test.ts'],
          environment: 'happy-dom',
        },
      },
    ],
  },
})
```

```ts
// packages/foo/vitest.config.ts — use defineProject for per-project files
import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'foo',
    environment: 'jsdom',
  },
})
```

```ts
// vitest.config.ts — opt out of sharing the Vite server between inline projects
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    sharedViteServer: false,
    projects: [
      { test: { name: 'unit' } },
      { test: { name: 'integration' } },
    ],
  },
})
```

```bash
# Run all projects
npx vitest

# Run specific projects by name
npx vitest --project unit
npx vitest --project unit --project dom
```

## Notes

- `projects` replaces the deprecated `workspace` config (`vitest.workspace.ts`) since v3.2 — define `test.projects` directly inside `vitest.config.ts` instead
- Each project must have a unique `name` (`string` or `{ label, color }`); Vitest throws an error on duplicates
- v5: inline projects inherit the root config by default (`extends` defaults to `true`) and arrays such as `setupFiles` are concatenated, not overridden; set `extends: false` to opt out. Projects referenced as config files or directories still do **not** inherit — use `mergeConfig` for manual composition
- `sharedViteServer` (default `true`, CLI `--sharedViteServer=false`): inline projects that don't change the Vite config reuse the declaring config's Vite server, so its plugins are instantiated once and their `config` hooks do not run per project. Disable it if a plugin must be re-instantiated per project
- `coverage`, `reporters`, and `resolveSnapshotPath` cannot be set per-project — configure them once at the root
- Prefer `defineProject` over `defineConfig` in per-project files — it rejects root-only options like `reporters` at the type level
