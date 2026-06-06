# Authentication

Authenticate once and reuse the session state across all tests.

```typescript
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');

  // Save storage state (cookies + localStorage) for reuse
  await page.context().storageState({ path: authFile });
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

```typescript
// tests/example.spec.ts — starts already authenticated
import { test, expect } from '@playwright/test';

test('shows dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Notes

- Store `playwright/.auth/` in `.gitignore` to avoid committing credentials
- The `setup` project runs once before `dependencies` projects execute
- For tests that modify server-side state, use per-worker storage state via `testInfo.parallelIndex`
- Use `test.use({ storageState: 'path' })` to specify a role-specific auth file per test
