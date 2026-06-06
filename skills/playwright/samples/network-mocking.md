# Network Mocking

Intercept, mock, or modify network requests and responses.

```typescript
import { test, expect } from '@playwright/test';

test('mock API response', async ({ page }) => {
  const testData = JSON.stringify([{ id: 1, name: 'Mocked Item' }]);

  await page.route('**/api/items', route =>
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: testData,
    })
  );

  await page.goto('/items');
  await expect(page.getByText('Mocked Item')).toBeVisible();
});

test('abort image requests', async ({ page }) => {
  await page.route(/(png|jpeg|jpg)$/, route => route.abort());
  await page.goto('/gallery');
});

test('modify response body', async ({ page }) => {
  await page.route('**/title.html', async route => {
    const response = await route.fetch();
    let body = await response.text();
    body = body.replace('<title>', '<title>My prefix:');
    await route.fulfill({ response, body });
  });
  await page.goto('/title.html');
});

test('wait for specific response', async ({ page }) => {
  await page.goto('/');
  const responsePromise = page.waitForResponse('**/api/fetch_data');
  await page.getByText('Update').click();
  const response = await responsePromise;
  expect(response.status()).toBe(200);
});
```

## Notes

- `page.route()` intercepts only that page; `context.route()` intercepts all pages in the context
- `route.fulfill()` serves a custom response; `route.abort()` cancels the request; `route.continue()` passes through with optional modifications
- Use `route.fetch()` to get the real response and then mutate it before fulfilling
- Register routes before `page.goto()` to ensure interception is active from the start
