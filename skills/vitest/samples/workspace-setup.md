# Workspace Setup

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
  test: {
    projects: [
      {
        extends: true,       // inherit root config
        test: {
          name: 'unit',
          include: ['packages/*/src/**/*.test.ts'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          include: ['packages/*/src/**/*.dom.test.ts'],
          environment: 'happy-dom',
        },
      },
    ],
  },
})
```

```bash
# Run all projects
npx vitest

# Run a specific project by name
npx vitest --project unit
npx vitest --project dom
```

## Notes

- Each project must have a unique `name`; Vitest throws an error on duplicates
- `extends: true` merges the root config into the inline project config
- Project configs must be named `vitest.config.*`, `vite.config.*`, or `vitest.<name>.config.*`
- The workspace feature replaces the older `vitest.workspace.ts` file — use `projects` inside `vitest.config.ts` instead
