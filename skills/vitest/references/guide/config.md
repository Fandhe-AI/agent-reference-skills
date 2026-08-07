# Config (vitest.config.ts)

Configured via `vitest.config.ts` (or the `test` key in `vite.config.ts`).

## Signature / Usage

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
```

## Options / Props

Core options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `globals` | `boolean` | `false` | Expose `describe`, `it`, `expect`, etc. globally (no import needed) |
| `environment` | `string` | `'node'` | Test environment (`node`, `jsdom`, `happy-dom`, `edge-runtime`) |
| `include` | `string[]` | `['**/*.{test,spec}.{js,ts,jsx,tsx}']` | Glob patterns for test files |
| `exclude` | `string[]` | `['**/node_modules/**', '**/dist/**', ...]` | Exclude patterns |
| `setupFiles` | `string \| string[]` | `[]` | Files run before each test file |
| `globalSetup` | `string \| string[]` | `[]` | Files run once before the whole suite |
| `pool` | `string` | `'forks'` | Worker pool (`threads`, `forks`, `vmThreads`, `vmForks`) |
| `testTimeout` | `number` | `5000` | Default per-test timeout (ms) |
| `hookTimeout` | `number` | `10000` | Default hook timeout (ms) |
| `retry` | `number` | `0` | Number of retries for failed tests |
| `reporters` | `string[]` | `['default']` | Reporters (`verbose`, `dot`, `json`, `html`, `junit`, `tap`, `tree`, `blob`, `github-actions`, `minimal`, etc.) |
| `watch` | `boolean` | `true` in dev | Watch mode |
| `passWithNoTests` | `boolean` | `false` | Exit successfully even with no test files |
| `typecheck` | `object` | — | Type test configuration |
| `projects` | `TestProjectConfiguration[]` | `[]` | Run multiple projects in a single process for monorepos, etc. (successor to the old `vitest.workspace.ts`; see [Workspace](./workspace.md)) |

Coverage options (`test.coverage`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `provider` | `'v8' \| 'istanbul'` | `'v8'` | Coverage engine |
| `reporter` | `string[]` | `['text', 'html', 'clover', 'json']` | Output formats |
| `include` | `string[]` | all files | Coverage targets |
| `exclude` | `string[]` | — | Coverage exclusions |
| `thresholds` | `object` | — | Minimum coverage ratios (`lines`, `branches`, `functions`, `statements`) |
| `reportsDirectory` | `string` | `'./coverage'` | Output directory |
| `all` | `boolean` | `false` | Include uncovered files in the report |

Browser mode options (`test.browser`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `browser.enabled` | `boolean` | `false` | Enable browser mode |
| `browser.headless` | `boolean` | `true` in CI | Headless mode |
| `browser.provider` | `'playwright' \| 'webdriverio' \| 'preview'` | `'preview'` | Browser provider |
| `browser.instances` | `object[]` | — | Browsers to run (e.g. `[{ browser: 'chromium' }]`) |
| `browser.ui` | `boolean` | `true` | Show the browser UI |

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
  },
})
```

## Notes

- Pools:

| Pool | Description |
|------|-------------|
| `threads` | Worker Threads (shared memory, fast) |
| `forks` | Child processes (isolated, suited to native modules) |
| `vmThreads` | Worker Threads + VM isolation |
| `vmForks` | Child processes + VM isolation |

- TypeScript setup for `globals: true`:

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

- `setupFiles` vs `globalSetup`: `setupFiles` runs inside the test environment before each file; `globalSetup` runs once in the main Node process before the whole suite.

## Related

- [CLI](./cli.md)
- [Test Environment](./environment.md)
- [Coverage](./coverage.md)
