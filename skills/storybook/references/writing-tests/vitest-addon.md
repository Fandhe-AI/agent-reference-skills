# Vitest Addon

Transform stories into component tests that run in a real browser environment via Vitest and Playwright.

## Overview

`@storybook/addon-vitest` integrates Storybook with Vitest browser mode. Stories are executed as smoke tests (renders + play function) in Chromium via Playwright. Tests can be run from the Storybook UI or CLI, with watch mode and CI support.

## Setup

### Requirements

- Storybook framework using Vite (`react-vite`, `vue3-vite`, `sveltekit`, or `@storybook/nextjs-vite`)
- Vitest >= 3.0
- MSW >= 2.0 (if used)
- Next.js >= 14.1 (for Next.js projects)

### Automatic installation (recommended)

```bash
npx storybook add @storybook/addon-vitest
```

This installs and registers the addon, inspects your Vite/Vitest setup, configures Vitest with defaults, sets up browser mode with Playwright Chromium, and prompts for Playwright binary installation.

### Manual `vitest.config.ts` example (Vitest 4)

```typescript
import { defineConfig, mergeConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
              storybookScript: 'yarn storybook --no-open',
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              provider: playwright({}),
              headless: true,
              instances: [{ browser: 'chromium' }],
            },
            setupFiles: ['./.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
  }),
);
```

## Usage

**Storybook UI:** Click "Run tests" in the testing widget at the bottom of the sidebar.

**CLI:**

```bash
npm run test-storybook
```

**`package.json` scripts:**

```json
{
  "scripts": {
    "test": "vitest",
    "test-storybook": "vitest --project=storybook"
  }
}
```

### Filter tests by tags

```typescript
// In a story file
const meta = {
  component: Button,
  tags: ['stable'],
} satisfies Meta<typeof Button>;

export const ExperimentalStory: Story = {
  tags: ['!stable', 'experimental'],
};
```

```typescript
// In vitest.config.ts plugin options
storybookTest({
  tags: {
    include: ['test'],
    exclude: ['experimental'],
  },
})
```

## Options / Props

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `configDir` | string | `.storybook` | Storybook config directory |
| `storybookScript` | string | — | Script to run Storybook in watch mode |
| `storybookUrl` | string | `http://localhost:6006` | Storybook hosting URL |
| `tags` | object | `{include: ['test']}` | Story filtering by tags |
| `disableAddonDocs` | boolean | `true` | Disable MDX parsing during tests |

## Notes

- Does **not** require a running Storybook instance to execute tests
- For projects with existing Vitest tests, use separate test projects (Vitest >= 4.0) or workspaces (Vitest 3.x)
- Playwright browser binaries must be installed: `playwright install`

## Related

- [Running in CI](./in-ci.md)
- [Test Coverage](./test-coverage.md)
- [Interaction Testing](./interaction-testing.md)
- [Accessibility Testing](./accessibility-testing.md)
