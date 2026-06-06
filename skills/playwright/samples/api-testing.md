# API Testing

Send HTTP requests and assert responses without a browser UI.

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${process.env.API_TOKEN}`,
    },
  },
});
```

```typescript
// tests/api.spec.ts
import { test, expect } from '@playwright/test';

const USER = 'github-user';
const REPO = 'test-repo';

test.beforeAll(async ({ request }) => {
  const response = await request.post('/user/repos', {
    data: { name: REPO },
  });
  expect(response.ok()).toBeTruthy();
});

test.afterAll(async ({ request }) => {
  const response = await request.delete(`/repos/${USER}/${REPO}`);
  expect(response.ok()).toBeTruthy();
});

test('create and verify issue', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: '[Bug] report 1',
      body: 'Bug description',
    },
  });
  expect(newIssue.ok()).toBeTruthy();

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`);
  expect(await issues.json()).toContainEqual(
    expect.objectContaining({ title: '[Bug] report 1' })
  );
});
```

## Notes

- The `request` fixture is an `APIRequestContext` scoped to the test; use `test.beforeAll` for shared setup
- `response.ok()` checks that the status code is in the 200-299 range
- `baseURL` and `extraHTTPHeaders` in config apply to all `request` fixture calls
- API tests run without a browser context, making them faster than full E2E tests
