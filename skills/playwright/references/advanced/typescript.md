# TypeScript

Playwright Test has built-in TypeScript support. Tests written in `.ts` files are automatically transformed to JavaScript and executed without any additional configuration.

## Type Checking Caveat

Playwright does **not** perform type checking. Tests run even when non-critical TypeScript compilation errors exist. To enforce type safety, run the TypeScript compiler separately:

```ts
// package.json scripts
{
  "scripts": {
    "test": "npx tsc -p tsconfig.json --noEmit && npx playwright test"
  }
}
```

For development, use watch mode alongside Playwright:

```bash
npx tsc -p tsconfig.json --noEmit -w
```

## Supported tsconfig Options

Playwright reads `tsconfig.json` by traversing the directory structure upward from the test file. Only these `compilerOptions` are recognized:

| Option       | Purpose                                    |
| ------------ | ------------------------------------------ |
| `allowJs`    | Allow JavaScript files in the compilation  |
| `baseUrl`    | Base directory for resolving module names  |
| `paths`      | Map import paths to physical locations     |
| `references` | Project references for composite projects  |
| `extends`    | Inherit from another tsconfig               |
| `jsx`, `jsxFactory`, `jsxFragmentFactory`, `jsxImportSource` | JSX compilation of `.tsx` / `.jsx` files (v1.64) |
| `useDefineForClassFields` | Class field semantics (v1.65); `target` is only used to determine this option |

Other compiler options are ignored by Playwright's internal transformer.

Breaking change in v1.64: Playwright compiles JSX in `.tsx` and `.jsx` files according to the `jsx*` options in `tsconfig.json`. When `jsx` is not specified, or is `preserve` or `react-native`, the automatic runtime from `react/jsx-runtime` is used.

## Specifying tsconfig with --tsconfig

Point Playwright to a specific `tsconfig.json` via the CLI flag:

```bash
npx playwright test --tsconfig=tsconfig.test.json
```

Or set it in `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  tsconfig: './tsconfig.test.json',
});
```

## Path Mapping

Configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@myhelper/*": ["packages/myhelper/*"]
    }
  }
}
```

Use the alias in test files:

```ts
import { test, expect } from '@playwright/test';
import { username, password } from '@myhelper/credentials';

test('login', async ({ page }) => {
  await page.getByLabel('User Name').fill(username);
  await page.getByLabel('Password').fill(password);
});
```

Playwright resolves these paths at transform time, so no additional bundler configuration is needed.

## Manual Compilation

When tests use advanced TypeScript features that Playwright's built-in transformer does not support, pre-compile before running tests.

Create a dedicated `tests/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "moduleResolution": "Node",
    "sourceMap": true,
    "outDir": "../tests-out"
  }
}
```

Configure `package.json` to compile then run:

```json
{
  "scripts": {
    "pretest": "tsc --incremental -p tests/tsconfig.json",
    "test": "playwright test -c tests-out"
  }
}
```

The `--incremental` flag speeds up subsequent compilations. The `-c tests-out` flag tells Playwright to look for tests in the compiled output directory.

## Notes

### Changes in v1.65

- TypeScript class fields follow `useDefineForClassFields` from `tsconfig.json`, the same as `tsc`. When it is not specified, it is enabled for `ES2022` and later targets, and when `target` is not specified. Field initializers then run before the constructor body and cannot access constructor parameter properties; a field initializer that reads a constructor parameter property now fails with a `TypeError`. Move the initialization to the constructor, or disable the option to keep the legacy TypeScript semantics:

```json
{
  "compilerOptions": {
    "useDefineForClassFields": false
  }
}
```

- `.css`, `.less` and `.scss` imports in test files now load as empty modules instead of being removed, so the imported file must exist.
- Bun: the test runner runs under Bun, which transpiles TypeScript itself (no Babel, no compilation cache). Pass the `--bun` flag, because without it `bunx playwright test` runs on Node.js:

```bash
bunx --bun playwright test
```

- Under Bun there is no watch mode (UI mode does not rerun on file changes and `--only-changed` does not follow imports); `--tsconfig` and the JSX options in `tsconfig.json` have no effect and custom ESM loaders are not supported; stack traces lack async frames and API names omit the class name (`click` instead of `locator.click`), which changes some step locations, titles and error messages; test console output does not get into the trace and UI mode.
- Source: https://playwright.dev/docs/test-typescript (microsoft/playwright v1.65.1 `docs/src/test-typescript-js.md`)
- Source: https://playwright.dev/docs/release-notes (microsoft/playwright v1.65.1 `docs/src/release-notes-js.md`)
