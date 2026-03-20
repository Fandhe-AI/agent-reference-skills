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

Other compiler options are ignored by Playwright's internal transformer.

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
