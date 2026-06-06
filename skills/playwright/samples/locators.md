# Locators

Find elements using semantic, resilient locator methods.

```typescript
import { test, expect } from '@playwright/test';

test('locator examples', async ({ page }) => {
  await page.goto('https://example.com');

  // By accessibility role
  await page.getByRole('button', { name: 'Sign in' }).click();

  // By label (form controls)
  await page.getByLabel('User Name').fill('John');
  await page.getByLabel('Password').fill('secret-password');

  // By visible text
  await expect(page.getByText('Welcome, John')).toBeVisible();

  // By test id (data-testid attribute)
  await page.getByTestId('directions').click();

  // Chaining: filter a list item by text, then click child button
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Product 2' })
    .getByRole('button', { name: 'Add to cart' })
    .click();

  // Filter by descendant locator
  await page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: 'Product 2' }) })
    .getByRole('button', { name: 'Add to cart' })
    .click();
});
```

## Notes

- Prefer `getByRole` — reflects accessibility semantics and is robust to UI changes
- `getByLabel` targets form controls associated with a label element
- `filter()` narrows a locator set by text or descendant presence
- Chaining locators scopes the inner search to the matched parent element
