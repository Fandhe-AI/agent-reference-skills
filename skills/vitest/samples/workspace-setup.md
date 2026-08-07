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
        extends: true,        // inherit root plugins/pool (default: false)
        test: {
          name: 'unit',
          include: ['packages/*/src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
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
- Projects do **not** inherit root-level config by default — set `extends: true` to inherit, or use `mergeConfig` for manual composition
- `coverage`, `reporters`, and `resolveSnapshotPath` cannot be set per-project — configure them once at the root
- Project config files must be named `vitest.config.*`, `vite.config.*`, or `vitest.<name>.config.*`
- Prefer `defineProject` over `defineConfig` in per-project files — it rejects root-only options like `reporters` at the type level
