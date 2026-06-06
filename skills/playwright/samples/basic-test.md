# Basic Test

Write a minimal Playwright test with navigation and assertion.

```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

## Notes

- `page.goto()` waits for the page to reach the load state before continuing
- `expect` matchers are async and auto-wait until the condition is met
- `test.describe()` groups related tests; `test.beforeEach()` runs setup before each test in the group
